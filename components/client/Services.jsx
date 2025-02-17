"use client";

import { useEffect } from "react";
import Link from "next/link";
import { 
  BookOpen, 
  Award, 
  Sparkles,
  ArrowRight,
  Check,
  Rocket
} from 'lucide-react';

export default function Services() {
  return (
    <section className="bg-gray-50 py-16">
    <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
 
        {/* Main Content */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-primary-dark mb-6">
           Our Publishing Services
          </h2>
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="h-1 w-20 bg-accent-dark rounded-full" />
            <Sparkles className="w-8 h-8 text-accent-dark" />
            <div className="h-1 w-20 bg-accent-dark rounded-full" />
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your manuscript into a professionally published book. Start your publishing journey today.
          </p>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-primary-dark mb-4">Book Publishing</h3>
          <p className="text-gray-700 text-lg">
            Full-service publishing including editorial, design, ISBN, printing, marketing, and
            distribution.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-primary-dark mb-4">Printing Services</h3>
          <p className="text-gray-700 text-lg">
            High-quality book printing with various binding options and color solutions.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-primary-dark mb-4">Design Services</h3>
          <p className="text-gray-700 text-lg">
            Professional design for books, covers, and marketing materials.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-primary-dark mb-4">ISBN & Copyright</h3>
          <p className="text-gray-700 text-lg">
            Assistance with ISBN and copyright applications for authors.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-primary-dark mb-4">Marketing & Sales</h3>
          <p className="text-gray-700 text-lg">
            Strategic marketing and global distribution for books.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-primary-dark mb-4">Consultancy</h3>
          <p className="text-gray-700 text-lg">
            Expert advice on publishing, literature, and long-term growth.
          </p>
        </div>
      </div>
    </div>
  </section>
  );
}
