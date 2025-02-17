"use client";

import React, { useState } from 'react';
import { Check, Package } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import ContactForm from '@/components/client/ContactForm';
import Packages from '@/components/client/Packages';

const PackageCard = ({ title, price, description, features, isPopular }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      className={`relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300
        ${isPopular ? 'border-2 border-blue-600' : 'border border-gray-200'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isPopular && (
        <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          Popular Choice
        </div>
      )}
      
      <div className="p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-600 mb-6 h-16">{description}</p>
        <div className="mb-8">
          <p className="text-4xl font-bold text-gray-900">{price.kes}</p>
          <p className="text-gray-600">{price.usd}</p>
        </div>
        
        <ul className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <motion.li 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center text-gray-700"
            >
              <Check className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
              <span>{feature}</span>
            </motion.li>
          ))}
        </ul>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors
            ${isHovered ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white'}`}
        >
          Choose Plan
        </motion.button>
      </div>
    </motion.div>
  );
};

const PublishingPackages = () => {
  const packages = [
    {
      title: "InkStarter",
      price: {
        kes: "KES 150,000",
        usd: "$1,100"
      },
      description: "Perfect for first-time authors looking for a simple and affordable way to publish.",
      features: [
        "Professional Editing & Proofreading",
        "Custom Cover Design",
        "ISBN & Copyright Registration",
        "Print-on-Demand Services",
        "Basic Marketing Support",
        "Distribution to Local Bookstores",
        "Author Copies (10 Copies)"
      ],
      isPopular: false
    },
    {
      title: "InkPro",
      price: {
        kes: "KES 300,000",
        usd: "$2,200"
      },
      description: "Ideal for authors seeking a comprehensive publishing experience with added marketing support.",
      features: [
        "Everything in InkStarter",
        "Advanced Editorial Review",
        "Custom Interior Layout Design",
        "Global Distribution (Print & E-book)",
        "Dedicated Marketing Campaign",
        "Author Copies (25 Copies)",
        "Author Website Setup (Basic)",
        "Media Kit Creation"
      ],
      isPopular: true
    },
    {
      title: "InkElite",
      price: {
        kes: "KES 450,000",
        usd: "$3,300"
      },
      description: "For authors who want the ultimate publishing experience with premium services.",
      features: [
        "Everything in InkPro",
        "Audiobook Production",
        "Advanced Author Website with E-commerce",
        "Personalized Author Branding",
        "Priority Support & Consultancy",
        "Author Copies (50 Copies)",
        "International Book Fair Representation",
        "PR & Media Exposure"
      ],
      isPopular: false
    }
  ];

  return (
    <>
    {/* Hero Section */}
    <section className="hidden md:block bg-primary-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Publish Your Book with African Ink</h1>
          <p className="text-xl mb-8">
            Whether you're a first-time author or an experienced writer, we offer tailored publishing packages to bring your story to life. Choose from our flexible plans and join a community that celebrates African literature.
          </p>
          <Button variant="secondary" className="bg-white text-primary-dark hover:bg-gray-100">
            Get Started
          </Button>
        </div>
      </section>

     <Packages />

      {/* SEO-Rich Content Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary-dark mb-8 text-center">Why Publish with African Ink?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Column 1 */}
            <div className="prose prose-lg text-gray-700">
              <p className="mb-6">
                At <strong>African Ink Publishers Ltd</strong>, we are committed to empowering African authors and amplifying their voices. Our publishing packages are designed to cater to writers at every stage of their journey, from first-time authors to seasoned professionals. With our <strong>InkStarter</strong>, <strong>InkPro</strong>, and <strong>InkElite</strong> plans, you can choose the level of support that best suits your needs.
              </p>
              <p className="mb-6">
                Our <strong>professional editing and design services</strong> ensure that your book meets the highest standards of quality. From custom cover designs to advanced editorial reviews, we take care of every detail so you can focus on your writing. Our <strong>Print-on-Demand</strong> services eliminate the need for large print runs, saving you money and storage space.
              </p>
              <p className="mb-6">
                We understand that marketing is crucial for an author’s success. That’s why we offer <strong>dedicated marketing campaigns</strong> and <strong>global distribution</strong> for your book. Whether you’re targeting local readers or a global audience, we have the tools and expertise to help you reach your goals.
              </p>
              <p className="mb-6">
                For authors looking for the ultimate publishing experience, our <strong>InkElite</strong> package includes <strong>audiobook production</strong>, <strong>author website setup</strong>, and <strong>personalized branding</strong>. With African Ink, you’re not just publishing a book—you’re building a legacy.
              </p>
            </div>

            {/* Column 2 */}
            <div className="prose prose-lg text-gray-700">
              <p className="mb-6">
                Our team of publishing experts is here to guide you every step of the way. From <strong>ISBN and copyright registration</strong> to <strong>post-publishing support</strong>, we provide comprehensive services to ensure your success. We also offer <strong>flexible payment plans</strong> to make publishing accessible to everyone.
              </p>
              <p className="mb-6">
                At African Ink, we believe in the power of storytelling to inspire and transform. By publishing with us, you become part of a thriving community of African writers and readers. Our <strong>author-friendly agreements</strong> ensure fair royalties and transparent contracts, making us one of the most trusted names in the industry.
              </p>
              <p className="mb-6">
                Whether you’re publishing a novel, a children’s book, or an academic text, we have the expertise to bring your vision to life. Our <strong>thriving literary community</strong> connects you with like-minded writers and readers, fostering collaboration and growth.
              </p>
              <p className="mb-6">
                Join us today and take the first step toward sharing your story with the world. With African Ink Publishers Ltd, your book will not only be published—it will be celebrated.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ContactForm />

    </>

  );
};

export default PublishingPackages;