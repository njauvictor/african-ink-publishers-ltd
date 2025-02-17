"use client";

import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import  getCategoryRecommendations  from '@/lib/recommendations'; // A modified API call for category-based recommendations

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e";

export default function RecommendationSection({ category, limit = 4 }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState({});

  useEffect(() => {
    loadCategoryRecommendations();
  }, [category]);

  async function loadCategoryRecommendations() {
    try {
      const recommendations = await getCategoryRecommendations(category, limit); // Fetch books by category
      setBooks(recommendations);
    } catch (error) {
      console.error('Error loading category recommendations:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleImageError = (bookId) => {
    setImageError(prev => ({ ...prev, [bookId]: true }));
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-[400px] bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (books.length === 0) {
    return <div>No books found for this category.</div>;
  }

  return (
    <section>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Books in {category} Category</h2>
        <Button
          asChild
          variant="ghost"
          className="text-[#57170A] hover:text-[#8B2B13]"
        >
          <Link href="/books" className="flex items-center">
            View All <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {books.map((book) => (
          <motion.div
            key={book.id}
            variants={fadeIn}
            initial="initial"
            animate="animate"
            whileHover={{ y: -10 }}
          >
            <Card className="h-full">
              <Link href={`/books/${book.id}`}>
                <div className="relative h-[300px]">
                  <Image
                    src={imageError[book.id] ? FALLBACK_IMAGE : book.cover_image}
                    alt={book.title}
                    layout="fill"
                    className="object-cover rounded-t-lg"
                    onError={() => handleImageError(book.id)}
                  />
                  {book.is_bestseller && (
                    <div className="absolute top-2 right-2 bg-[#57170A] text-white px-3 py-1 rounded-full text-sm">
                      Best Seller
                    </div>
                  )}
                </div>
              </Link>
              <div className="pt-4">
                <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
                <p className="text-gray-600 mb-2">{book.author}</p>
                {book.special_offer_price ? (
                  <div className="flex items-baseline gap-2">
                    <p className="text-[#57170A] font-bold">
                      KES {book.special_offer_price.toLocaleString()}
                    </p>
                    <p className="text-gray-500 text-sm line-through">
                      KES {book.original_price.toLocaleString()}
                    </p>
                  </div>
                ) : (
                  <p className="text-[#57170A] font-bold">
                    KES {book.price.toLocaleString()}
                  </p>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
