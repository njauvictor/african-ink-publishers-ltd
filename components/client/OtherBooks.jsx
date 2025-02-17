"use client";

import React, { useEffect, useState } from 'react'
import BookCards from '../client/BookCards';

import { Sparkles } from 'lucide-react';
const OtherBooks = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch("https://book-store-server-bice.vercel.app/all-books").then(res => res.json()).then(data => setBooks(data.slice(5, 12)))
    }, [])

    return (
        <div>
        {/* Main Content */}
        <div className="mb-16 text-center mt-24">
         <h2 className="text-5xl font-extrabold text-primary-dark mb-6">
        Other Books
         </h2>
         <div className="flex items-center justify-center space-x-4 ">
           <div className="h-1 w-20 bg-accent-dark rounded-full" />
           <Sparkles className="w-8 h-8 text-accent-dark" />
           <div className="h-1 w-20 bg-accent-dark rounded-full" />
         </div>
     
   
   
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    
    </div>
    <BookCards books={books} className=" " />
    </div>
   </div>
    )
}

export default OtherBooks