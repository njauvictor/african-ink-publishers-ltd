"use client";

import { ShoppingCart, Menu, X, User, LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthProvider"; // Import the useAuth hook

const LOGO_URL = "https://res.cloudinary.com/dcxqwes9x/image/upload/v1738484393/AfricanInk-logo_uomuh0.webp";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logOut } = useAuth(); // Use the useAuth hook to get user and logOut

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Books", href: "/books" },
    { label: "Publish", href: "/publish" },
    { label: "Blog", href: "/blog" },    
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <div className="relative h-14 w-[220px]">
                <Image
                  src={LOGO_URL}
                  alt="African Ink Publishers"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-primary-dark/90 hover:text-accent-dark px-3 py-2 rounded-md text-md font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link
              href="/cart"
              className="relative text-primary-dark hover:text-accent-dark p-2"
            >
              <ShoppingCart className="h-6 w-6" />
            </Link>
            {user ? (
              <>
                <Link
                  href="/account"
                  className="text-primary-dark hover:text-accent-dark p-2"
                >
                  <User className="h-6 w-6" />
                </Link>
                <Button
                  onClick={logOut}
                  className="bg-[#57170A] hover:bg-[#8B2B13]"
                  
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Button
                asChild
                className="bg-[#57170A] hover:bg-[#8B2B13]"
              >
                <Link href="/login" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-primary-dark hover:text-accent-dark p-2"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-primary-dark hover:text-accent-dark block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center justify-around px-5">
              <Link
                href="/cart"
                className="relative text-primary-dark hover:text-accent-dark p-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart className="h-6 w-6" />
              </Link>
              {user ? (
                <>
                  <Link
                    href="/account"
                    className="text-primary-dark hover:text-accent-dark p-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-6 w-6" />
                  </Link>
                  <Button
                    onClick={logOut}
                    className="bg-[#57170A] hover:bg-[#8B2B13]"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button
                  asChild
                  className="bg-[#57170A] hover:bg-[#8B2B13]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link href="/login" className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}