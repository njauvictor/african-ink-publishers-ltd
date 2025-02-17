"use client";

import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRightCircle, 
  ArrowLeftCircle,
  Bookmark,
  X,
  Save,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const ReactReader = dynamic(() => import('react-reader').then(mod => mod.ReactReader), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">Loading reader...</h2>
      </div>
    </div>
  )
});

export default function EpubReader({ book }) {
  const [mounted, setMounted] = useState(false);
  const [location, setLocation] = useState(null);
  const [size, setSize] = useState(100);
  const [selectedText, setSelectedText] = useState('');
  const [notes, setNotes] = useState([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [showNotePopup, setShowNotePopup] = useState(false);
  const [currentChapter, setCurrentChapter] = useState('');
  const [expandedNoteId, setExpandedNoteId] = useState(null);
  const renditionRef = useRef(null);
  const tocRef = useRef(null);
  const selectionRef = useRef(null);
  const [highlights, setHighlights] = useState([]);

  const setupHighlightStyles = () => {
    if (renditionRef.current) {
      renditionRef.current.themes.default({
        '::selection': {
          'background-color': 'rgba(255, 165, 0, 0.3)'
        },
        '.epub-highlight': {
          'background-color': 'rgba(255, 165, 0, 0.3) !important',
          cursor: 'pointer'
        },
        '.epub-highlight.active': {
          'background-color': 'rgba(255, 165, 0, 0.8) !important'
        }
      });
    }
  };

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      if (window) {
        setIsSidebarCollapsed(window.innerWidth < 768);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

 
  useEffect(() => {
    if (mounted && book) {
      const savedHighlights = JSON.parse(localStorage.getItem(`book-${book.id}-highlights`) || '[]');
      setHighlights(savedHighlights);
  
      savedHighlights.forEach(highlight => {
        if (isValidCFI(highlight.cfiRange)) {
          applyHighlight(highlight.cfiRange, highlight); // Reapply existing highlights
        }
      });
    }
  }, [mounted, book]);
  

  useEffect(() => {
    if (renditionRef.current && highlights.length > 0) {
      try {
        renditionRef.current.annotations.remove();
        highlights.forEach(highlight => {
          if (highlight.cfiRange) {
            applyHighlight(highlight.cfiRange, highlight);
          }
        });
      } catch (error) {
        console.warn('Error reapplying highlights:', error);
      }
    }
  }, [highlights]);

  const isValidCFI = (cfi) => {
    if (!cfi || typeof cfi !== 'string') return false;
    try {
      return cfi.startsWith('epubcfi(') && cfi.endsWith(')');
    } catch (error) {
      return false;
    }
  };

  const applyHighlight = (cfiRange, highlight) => {
    if (!renditionRef.current || !isValidCFI(cfiRange)) return;
    
    try {
      renditionRef.current.annotations.add(
        cfiRange,
        {},
        null,
        'epub-highlight',
        {
          'fill': 'rgba(255, 165, 0, 0.5)',
          'onclick': () => handleHighlightClick(highlight)
        }
      );
    } catch (error) {
      console.warn('Error applying highlight:', error);
    }
  };

  const handleLocationChanged = (cfi) => {
    if (!isValidCFI(cfi)) return;
    
    setLocation(cfi);
    localStorage.setItem(`book-${book.id}-location`, cfi);

    if (renditionRef.current && tocRef.current) {
      try {
        const chapter = tocRef.current.find((item) =>
          renditionRef.current.epubcfi.compare(item.href, cfi) >= 0
        );
        if (chapter) {
          setCurrentChapter(chapter.label);
        }
      } catch (error) {
        console.warn('Error updating chapter:', error);
      }
    }
  };

  const handleSelection = (cfiRange, contents) => {
    if (!contents?.window?.getSelection()) return;
    
    const selection = contents.window.getSelection();
    const selectedText = selection.toString().trim();
    
    if (selectedText) {
      setSelectedText(selectedText);
      
      const highlight = {
        id: Date.now().toString(),
        text: selectedText,
        cfiRange,
        timestamp: Date.now()
      };
  
      // Create new highlights array without removing old highlights
      const newHighlights = [...highlights, highlight];
      setHighlights(newHighlights);
      localStorage.setItem(`book-${book.id}-highlights`, JSON.stringify(newHighlights));
      
      applyHighlight(cfiRange, highlight); // Apply the new highlight
      setShowNotePopup(true);
      selectionRef.current = highlight; // Save current selection for note creation
    }
  };
  

  const handleHighlightClick = (highlight) => {
    if (!renditionRef.current || !highlight?.cfiRange) return;
    
    try {
      const elements = renditionRef.current.views().container.querySelectorAll('.epub-highlight');
      elements.forEach(el => el.classList.remove('active'));
      
      const highlightElement = renditionRef.current.views().container.querySelector(`[data-epubcfi="${highlight.cfiRange}"]`);
      if (highlightElement) {
        highlightElement.classList.add('active');
        highlightElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
        
        setTimeout(() => {
          highlightElement.classList.remove('active');
        }, 2000);
      }
    } catch (error) {
      console.warn('Error handling highlight click:', error);
    }
  };

  const illuminateSelection = (cfiRange) => {
    if (!renditionRef.current || !isValidCFI(cfiRange)) return;
    
    try {
      renditionRef.current.display(cfiRange)
        .then(() => {
          setTimeout(() => {
            handleHighlightClick({ cfiRange });
          }, 300);
        })
        .catch(error => {
          console.warn('Error displaying location:', error);
        });
    } catch (error) {
      console.warn('Error illuminating selection:', error);
    }
  };

  const handleAddNote = () => {
    if (!newNoteTitle.trim() || !selectionRef.current) return;

    const newNote = {
      id: Date.now().toString(),
      title: newNoteTitle.trim(),
      content: newNoteContent.trim(),
      selectedText: selectedText,
      cfiRange: selectionRef.current.cfiRange,
      highlightId: selectionRef.current.id,
      timestamp: Date.now()
    };
    
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    localStorage.setItem(`book-${book.id}-notes`, JSON.stringify(updatedNotes));
    
    setNewNoteTitle('');
    setNewNoteContent('');
    setShowNotePopup(false);
    selectionRef.current = null;
  };

  const handleDeleteNote = (noteId) => {
    const noteToDelete = notes.find(note => note.id === noteId);
    if (noteToDelete) {
      const updatedHighlights = highlights.filter(h => h.id !== noteToDelete.highlightId);
      setHighlights(updatedHighlights);
      localStorage.setItem(`book-${book.id}-highlights`, JSON.stringify(updatedHighlights));
    }
    
    const updatedNotes = notes.filter(note => note.id !== noteId);
    setNotes(updatedNotes);
    localStorage.setItem(`book-${book.id}-notes`, JSON.stringify(updatedNotes));
    setExpandedNoteId(null);
  };

  const toggleNoteExpansion = (noteId, note) => {
    if (expandedNoteId === noteId) {
      setExpandedNoteId(null);
    } else {
      setExpandedNoteId(noteId);
      if (note.cfiRange) {
        illuminateSelection(note.cfiRange);
      }
    }
  };

  if (renditionRef.current) {
    renditionRef.current.on('selected', handleSelection);
  }


  if (!mounted) return null;

  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 relative">
        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              <span className="font-medium truncate max-w-[200px]">
                {currentChapter || 'Reading'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => renditionRef.current?.prev()}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    const newSize = Math.max(60, size - 10);
                    setSize(newSize);
                    renditionRef.current?.themes.fontSize(`${newSize}%`);
                  }}
                >
                  <span className="text-sm">A-</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    const newSize = size + 10;
                    setSize(newSize);
                    renditionRef.current?.themes.fontSize(`${newSize}%`);
                  }}
                >
                  <span className="text-sm">A+</span>
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => renditionRef.current?.next()}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Reader */}
        <div className="h-full pt-16">
          <ReactReader
            location={location}
            locationChanged={handleLocationChanged}
            url={book.ebook_url}
            getRendition={(rendition) => {
              renditionRef.current = rendition;
              rendition.on('selected', handleSelection);
              rendition.themes.fontSize(`${size}%`);
              setupHighlightStyles();
              
              // Restore saved highlights
              highlights.forEach(highlight => {
                if (isValidCFI(highlight.cfiRange)) {
                  applyHighlight(highlight.cfiRange, highlight);
                }
              });
            }}
            tocChanged={toc => {
              tocRef.current = toc;
            }}
          />
        </div>
      </div>

      {/* Right Sidebar */}
      <div
        className={`h-full bg-card border-l transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'w-12' : 'w-80'}`}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-20 -translate-x-1/2 bg-background border shadow-sm rounded-full z-20"
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        >
          {isSidebarCollapsed ? (
            <ArrowLeftCircle className="w-4 h-4" />
          ) : (
            <ArrowRightCircle className="w-4 h-4" />
          )}
        </Button>

        {!isSidebarCollapsed && (
          <ScrollArea className="h-full px-4 py-20">
            <div>
              {/* Notes Section */}
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Bookmark className="w-4 h-4" />
                  Notes ({notes.length})
                </h3>
                <div className="space-y-4">
                  {notes.map((note) => (
                    <Card key={note.id} className="p-4 relative group">
                      <div 
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => toggleNoteExpansion(note.id, note)}
                      >
                        <h4 className="font-medium">{note.title}</h4>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteNote(note.id);
                            }}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                          {expandedNoteId === note.id ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </div>
                      {expandedNoteId === note.id && (
                        <div className="mt-2 space-y-2">
                          {note.selectedText && (
                            <div 
                              className="text-sm bg-muted/50 p-2 rounded cursor-pointer hover:bg-muted/70"
                              onClick={() => note.cfiRange && illuminateSelection(note.cfiRange)}
                            >
                              <p className="font-medium text-xs mb-1">Selected Text:</p>
                              <p>{note.selectedText}</p>
                            </div>
                          )}
                          {note.content && (
                            <div className="text-sm">
                              <p className="font-medium text-xs mb-1">Note:</p>
                              <p>{note.content}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        )}
      </div>

      {/* Note Popup */}
      {showNotePopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md p-6 space-y-4">
            <h3 className="text-lg font-semibold">Add Note</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Selected Text:</p>
                <p className="text-sm bg-muted p-2 rounded">{selectedText}</p>
              </div>
              <div className="space-y-3">
                <div>
                  <label htmlFor="noteTitle" className="text-sm font-medium block mb-1">
                    Note Title
                  </label>
                  <Input
                    id="noteTitle"
                    placeholder="Enter a title for your note"
                    value={newNoteTitle}
                    onChange={(e) => setNewNoteTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="noteContent" className="text-sm font-medium block mb-1">
                    Note Content
                  </label>
                  <Textarea
                    id="noteContent"
                    placeholder="Write your note here..."
                    value={newNoteContent}
                    onChange={(e) => setNewNoteContent(e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowNotePopup(false);
                    setNewNoteTitle('');
                    setNewNoteContent('');
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleAddNote}
                  disabled={!newNoteTitle.trim()}
                >
                  Save Note
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
