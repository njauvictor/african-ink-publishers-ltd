"use client";

import BannerCard from "./BannerCard";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const Banner = () => {
  const [isPublishingLoading, setIsPublishingLoading] = useState(false);
  const [isLearnMoreLoading, setIsLearnMoreLoading] = useState(false);

  const handleStartPublishing = () => {
    setIsPublishingLoading(true);
    setTimeout(() => setIsPublishingLoading(false), 3000); // Simulate loading
  };

  const handleLearnMore = () => {
    setIsLearnMoreLoading(true);
    setTimeout(() => setIsLearnMoreLoading(false), 3000); // Simulate loading
  };

  return (
    <div className="min-h-screen bg-primary-dark py-12 flex items-center justify-center">
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col md:flex-row-reverse justify-between items-center gap-12">
        {/* Right side - BannerCard */}
        <div className="w-full md:w-1/2 h-full">
          <BannerCard />
        </div>

        {/* Left side */}
    
          
        <div className="w-full md:w-1/2 text-center md:text-left ">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 ">
            We're Your Perfect 
          </h1>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8 ">
           Publishing Partner
          </h1>

          {/* Divider with Sparkles */}
          <div className="flex justify-center md:justify-start space-x-4 mb-6">
            <div className="h-1 w-12 md:w-40 bg-accent-dark rounded-full" />
            <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-accent-dark" />
            <div className="h-1 w-12 md:w-40 bg-accent-dark rounded-full" />
          </div>

          {/* Description */}
          <p className="text-gray-200 mb-6 text-base leading-relaxed">
            Based in Nairobi, Kenya, AfricanInk Publishers Ltd takes pride in providing an inclusive platform for every writer to share their
            original story and connect with the right audience.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-6 mt-8">
            {/* Start Publishing Now Button */}
            <Button
              onClick={handleStartPublishing}
              loading={isPublishingLoading}
              className="px-6 py-4 bg-white text-primary-dark hover:bg-accent-dark hover:text-white rounded-xl font-bold text-lg shadow-lg flex items-center space-x-3 transition-all duration-300"
            >
              <span>Start Publishing Now</span>
              <ArrowRight className="w-5 h-5" />
            </Button>

            {/* Learn More Button */}
            <Button
              onClick={handleLearnMore}
              loading={isLearnMoreLoading}
              className="px-6 py-4 bg-accent-dark hover:bg-white hover:text-primary-dark text-white rounded-xl font-bold text-lg transition-all duration-300"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};