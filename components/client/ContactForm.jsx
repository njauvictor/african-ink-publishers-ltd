"use client";
import React, { useState, useCallback } from "react";
import { 
  Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, 
  Book, Send, AlertCircle, MessageSquare, User, FileText 
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Memoized SocialLink Component
const SocialLink = React.memo(({ icon: Icon, href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center space-x-2 text-gray-600 hover:text-primary-dark transition-colors duration-300"
    aria-label={label}
  >
    <Icon className="w-5 h-5" />
    <span>{label}</span>
  </a>
));

// Memoized FormField Component
const FormField = React.memo(({ icon: Icon, label, type = "text", name, placeholder, required = true, value, onChange }) => (
  <div className="mb-6">
    <label className="text-gray-700 text-sm font-bold mb-2 flex items-center space-x-2">
      <Icon className="w-4 h-4 text-primary-dark" />
      <span>{label}</span>
    </label>
    {type === "textarea" ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-dark focus:ring-2 focus:ring-primary-dark/20 transition-all duration-300 min-h-[120px]"
        placeholder={placeholder}
        required={required}
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-dark focus:ring-2 focus:ring-primary-dark/20 transition-all duration-300"
        placeholder={placeholder}
        required={required}
      />
    )}
  </div>
));

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    manuscriptTitle: "",
    genre: "",
    wordCount: "",
    message: "",
    preferredPackage: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  // ✅ Optimized input handler
  const handleInputChange = useCallback((e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold text-primary-dark mb-6">Contact Our Publishing Team</h2>
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="h-1 w-20 bg-accent-dark rounded-full"></div>
            <Book className="w-6 h-6 text-accent-dark" />
            <div className="h-1 w-20 bg-accent-dark rounded-full"></div>
          </div>
          <p className="text-primary-dark/80 text-xl">Let's bring your story to life</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-primary-dark mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                <a href="tel:+254700000000" className="flex items-center space-x-4 text-gray-600 hover:text-primary-dark transition-colors duration-300">
                  <Phone className="w-5 h-5 text-primary-dark" />
                  <span>+254 700 000 000</span>
                </a>

                <a href="mailto:contact@publisher.com" className="flex items-center space-x-4 text-gray-600 hover:text-primary-dark transition-colors duration-300">
                  <Mail className="w-5 h-5 text-primary-dark" />
                  <span>contact@publisher.com</span>
                </a>

                <div className="flex items-center space-x-4 text-gray-600">
                  <MapPin className="w-5 h-5 text-primary-dark" />
                  <span>Nairobi, Kenya</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-8 border-t">
                <h4 className="text-lg font-semibold text-primary-dark mb-4">Connect With Us</h4>
                <div className="grid grid-cols-2 gap-4">
                  <SocialLink icon={Facebook} href="#" label="Facebook" />
                  <SocialLink icon={Twitter} href="#" label="Twitter" />
                  <SocialLink icon={Instagram} href="#" label="Instagram" />
                  <SocialLink icon={Linkedin} href="#" label="LinkedIn" />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField icon={User} label="Full Name" name="name" placeholder="Your full name" value={formData.name} onChange={handleInputChange} />
                  <FormField icon={Mail} label="Email Address" type="email" name="email" placeholder="your.email@example.com" value={formData.email} onChange={handleInputChange} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField icon={Phone} label="Phone Number" type="tel" name="phone" placeholder="Your phone number" value={formData.phone} onChange={handleInputChange} />
                  <FormField icon={Book} label="Manuscript Title" name="manuscriptTitle" placeholder="Your book title" value={formData.manuscriptTitle} onChange={handleInputChange} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField icon={FileText} label="Genre" name="genre" placeholder="e.g., Fiction, Non-fiction, Poetry" value={formData.genre} onChange={handleInputChange} />
                  <FormField icon={AlertCircle} label="Word Count" type="number" name="wordCount" placeholder="Approximate word count" value={formData.wordCount} onChange={handleInputChange} />
                </div>

                <FormField icon={MessageSquare} label="Your Message" type="textarea" name="message" placeholder="Tell us about your project..." value={formData.message} onChange={handleInputChange} />

                <div className="flex justify-end">
                  <Button type="submit" loading={isLoading} className="flex items-center space-x-2 px-8 py-3 rounded-lg font-semibold text-white bg-primary-dark hover:bg-primary-dark/90 transition-all duration-300">
                    <Send className="w-5 h-5" />
                    <span>{isLoading ? "Sending..." : "Send Message"}</span>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
