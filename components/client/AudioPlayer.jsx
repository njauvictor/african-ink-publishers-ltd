"use client";

import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { FaMusic } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const AudioPlayer = ({ book, isLoading, error }) => {
  const router = useRouter();
  const [playing, setPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen">
      <FaMusic className="animate-pulse text-blue-500" size={48} />
    </div>
  );

  if (error) return (
    <div className="text-red-500 text-center p-4">
      Error: {error}
    </div>
  );

  if (!book) return <div className="text-center text-lg font-semibold text-gray-500">Book not found</div>;

  const togglePlay = () => {
    setPlaying(prev => !prev);
  };

  const truncateDescription = (text) => {
    if (!text) return '';
    
    if (isExpanded) {
      return text;
    }

    const words = text.split(' ');
    if (words.length > 85) {
      return words.slice(0, 85).join(' ') + '...';
    }
    return text;
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row max-w-7xl mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg gap-4 mt-8">
      {/* Video Player Section */}
      <div className="flex-shrink-0 md:w-2/3">
        <h1 className='text-2xl font-bold text-primary-dark dark:text-gray-100 mb-4'>Listen to Audio Book</h1>
        <ReactPlayer 
          url={book.audio_url} 
          playing={playing} 
          controls 
          width="100%" 
          height="80%" 
        />
      </div>

      {/* Controls and Description Section */}
      <div className="md:w-1/3 flex flex-col justify-between p-4">
        <div>
          <h1 className="text-2xl font-bold text-primary-dark dark:text-gray-100 mb-2">{book.book_title}</h1>
          <p className="text-lg text-primary-dark dark:text-gray-300 mb-2">by {book.author_name}</p>

          {/* Description with Show More/Less button */}
          <div className="mb-4">
            <p className="text-primary-dark/70 text-sm">
              <span className="font-semibold">Description:</span> <br />
              {truncateDescription(book.description)}
            </p>
            {book.description && book.description.split(' ').length > 50 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-blue-500 text-sm mt-2 hover:text-blue-600 focus:outline-none"
              >
                {isExpanded ? 'Show Less' : 'Show More'}
              </button>
            )}
          </div>
               {/* Control Buttons */}
<div className="flex flex-col md:flex-row justify-between space-y-2 md:space-y-0 md:space-x-4">
  <button 
    onClick={togglePlay}
    className={`text-white py-2 px-4 rounded-lg transition ${playing ? 'bg-gray-500 hover:bg-gray-600' : 'bg-primary-dark hover:bg-primary-dark/80'} flex-1`}
  >
    {playing ? 'Pause' : 'Play'}
  </button>
  <button className="bg-accent-dark px-4 text-white py-3 rounded-lg hover:bg-accent-dark/80 transition flex-1">
    Buy Now
  </button>
</div>
        </div>



      </div>
    </div>
  );
};

export default AudioPlayer;