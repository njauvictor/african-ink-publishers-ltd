"use client";
import React, { useState } from "react";
import { 
  BookOpen, 
  Award, 
  Sparkles,
  ArrowRight,
  Check,
  Rocket
} from 'lucide-react';
import { Button } from "@/components/ui/button"; // Import your Button component

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white rounded-xl p-6 shadow-lg">
    <div className="mb-4 flex items-center space-x-3">
      <div className="p-3 rounded-lg bg-primary-dark/10">
        <Icon className="w-6 h-6 text-primary-dark" />
      </div>
      <h3 className="text-xl font-bold text-primary-dark">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </div>
);

const PublishingCTA = () => {
  const [isStartLoading, setIsStartLoading] = useState(false); // Loading state for "Start Publishing Now"
  const [isLearnMoreLoading, setIsLearnMoreLoading] = useState(false); // Loading state for "Learn More"

  // Simulate loading for the "Start Publishing Now" button
  const handleStartPublishing = () => {
    setIsStartLoading(true);
    setTimeout(() => setIsStartLoading(false), 3000); // Simulate a 3-second loading state
  };

  // Simulate loading for the "Learn More" button
  const handleLearnMore = () => {
    setIsLearnMoreLoading(true);
    setTimeout(() => setIsLearnMoreLoading(false), 3000); // Simulate a 3-second loading state
  };

  return (
    <section className="py-20 bg-primary-light/5">
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Main Content */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-extrabold text-primary-dark mb-6">
            Ready to Publish Your Book?
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

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <FeatureCard 
            icon={BookOpen}
            title="Professional Publishing"
            description="Get your book professionally edited, designed, and published with industry experts."
          />
          <FeatureCard 
            icon={Award}
            title="Quality Guaranteed"
            description="We ensure the highest quality standards for your book's production and distribution."
          />
          <FeatureCard 
            icon={Rocket}
            title="Global Distribution"
            description="Reach readers worldwide through our extensive distribution network."
          />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          {/* Start Publishing Now Button */}
          <Button
            onClick={handleStartPublishing}
            loading={isStartLoading}
            className="px-8 py-6 bg-primary-dark text-white hover:bg-accent-dark rounded-xl font-bold text-lg shadow-lg flex items-center space-x-3"
          >
            <span>Start Publishing Now</span>
            <ArrowRight className="w-5 h-5" />
          </Button>

          {/* Learn More Button */}
          <Button
            onClick={handleLearnMore}
            loading={isLearnMoreLoading}
            className="px-8 py-6 border-2 bg-accent-dark hover:bg-primary-dark text-white rounded-xl font-bold text-lg"
          >
            Learn More
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <p className="text-lg font-bold text-accent-dark mb-4">Trusted by Authors Worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center space-x-2 text-primary-dark">
                <Check className="w-5 h-5" />
                <span className="font-medium">
                  {i === 1 ? "100+ Published Authors" :
                   i === 2 ? "Global Distribution" :
                   i === 3 ? "Professional Team" :
                   "Award-Winning Service"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PublishingCTA;