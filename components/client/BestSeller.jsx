"use client";

import { useEffect, useState } from 'react';
import BookCards from './BookCards';
import { Sparkles } from 'lucide-react';

const BestSeller = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("https://book-store-server-bice.vercel.app/all-books")
      .then((res) => res.json())
      .then((data) => setBooks(data.slice(0, 10))); // Limit to the first 8 books for best sellers
  }, []);

  return (
    <div>
         {/* Main Content */}
         <div className="text-center py-8 md:py-20 ">
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary-dark mb-6">
         Our Best Sellers
          </h2>
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="h-1 w-20 bg-accent-dark rounded-full" />
            <Sparkles className="w-8 h-8 text-accent-dark" />
            <div className="h-1 w-20 bg-accent-dark rounded-full" />
          </div>
      
    
    
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
     
     </div>
     <BookCards books={books} className=" " />
     </div>
    </div>
    
  
  );
};

export default BestSeller;
