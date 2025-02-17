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

export default function WhoWeAre() {
  return (
    <section id="who-we-are" className="bg-white md:py-24">
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Who We Are Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Main Content */}
        <div className="mb-16">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-5xl font-extrabold text-primary-dark mb-6">
          Who We Are
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
        
          <div>
            <p className="text-primary-dark/80 mb-4 w-full text-center md:text-start ">
              African Ink Publishers Ltd is the fastest-growing publisher, printer, and distributor of African literature.
              Based in Nairobi, Kenya, we take pride in providing an inclusive platform for every writer to share their
              original story and connect with the right audience.
            </p>
            <p className="text-primary-dark/80 mb-4 text-xl text-center md:text-start ">
              <strong className="text-accent-dark">Our Slogan:</strong> The ultimate writer’s guide.
            </p>
            <p className="text-primary-dark/80 w-full text-center md:text-start ">
              We are committed to reviving the reading culture and promoting African heritage through professional publishing,
              printing, and design services.
            </p>

           
          </div>
        </div>
          
         

          {/* Image Section */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1611758498818-bfdeec6dc3de?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Team Image"
              className="rounded-lg shadow-lg"

            />
          </div>
        </div>
      </div>
    </section>
  );
}
