"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button"; // Import your Button component
import { Sparkles } from "lucide-react";
import { useState } from "react"; // For handling loading state

const packages = [
  {
    name: "InkStarter",
    description: "Perfect for first-time authors looking for a simple and affordable way to publish. Includes basic editing and proofreading services.",
    price: "KES 150,000",
    features: [
      "Professional Editing & Proofreading",
      "Custom Cover Design",
      "ISBN & Copyright Registration",
      "Print-on-Demand Services",
      "Basic Marketing Support (Social Media & Email Campaigns)",
      "Distribution to Local Bookstores",
      "Author Copies (10 Copies)",
    ],
  },
  {
    name: "InkPro",
    description: "Ideal for authors seeking a comprehensive publishing experience with added marketing support.",
    price: "KES 300,000",
    features: [
      "Everything in InkStarter",
      "Advanced Editorial Review",
      "Custom Interior Layout Design",
      "Global Distribution (Print & E-book)",
      "Dedicated Marketing Campaign (Including Book Launch Event)",
      "Author Copies (25 Copies)",
      "Author Website Setup (Basic)",
      "Media Kit Creation",
    ],
  },
  {
    name: "InkElite",
    description: "For authors who want the ultimate publishing experience with premium services.",
    price: "KES 450,000",
    features: [
      "Everything in InkPro",
      "Audiobook Production",
      "Author Website Setup (Advanced with E-commerce)",
      "Personalized Author Branding (Logo, Business Cards, etc.)",
      "Priority Support & Consultancy",
      "Author Copies (50 Copies)",
      "International Book Fair Representation",
      "PR & Media Exposure (Interviews, Features, etc.)",
    ],
  },
];

export default function Packages() {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          {/* Main Content */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-extrabold text-primary-dark mb-6">
              Our Publishing Packages
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
        </motion.div>

        {/* Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {packages.map((pkg, index) => (
            <PackageCard key={index} {...pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Package Card Component
function PackageCard({ name, description, price, features }) {
  const [isLoading, setIsLoading] = useState(false); // Loading state for the button

  // Simulate loading when the button is clicked
  const handleChoosePlan = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000); // Simulate a 3-second loading state
  };

  return (
    <motion.div
      className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-bold text-primary-dark mb-4">{name}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <p className="text-2xl font-extrabold text-primary-dark mb-6">{price}</p>

      <ul className="space-y-4 mb-8">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center">
            <Check className="w-5 h-5 text-primary-dark mr-2" />
            {feature}
          </li>
        ))}
      </ul>

      {/* Button with Spinner Effect */}
      <Button
        onClick={handleChoosePlan}
        loading={isLoading}
        className="w-full bg-accent-dark hover:bg-primary-dark/90 transition-all duration-300"
      >
        Choose Plan
      </Button>
    </motion.div>
  );
}