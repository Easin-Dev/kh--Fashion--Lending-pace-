"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, ShoppingBag, ChevronDown, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Updated navLinks for single-page navigation
  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Featured", href: "#featured" },
    // { name: "Collections", href: "#collections" },
    { name: "Reviews", href: "#reviews" },
    { name: "Contact", href: "#contact" },
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    // Added classes for sticky behavior, background, and shadow
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm shadow-md font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#home" className="flex items-center cursor-pointer">
              <Image
                src="https://i.ibb.co/nsGrcB7N/km-fashion-high-resolution-logo-transparent.png"
                alt="KH Fashion Logo"
                width={180}
                height={48}
                className="h-10 w-auto sm:h-12"
                priority
              />
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex lg:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-black text-sm font-semibold transition-colors duration-200 flex items-center cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-black cursor-pointer">
              <Search className="h-6 w-6" />
            </button>
            <button className="text-gray-600 hover:text-black cursor-pointer">
              <ShoppingBag className="h-6 w-6" />
            </button>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-black cursor-pointer"
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
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white/95 border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleLinkClick} // Close menu on click
                className="text-gray-700 hover:bg-gray-100 hover:text-black block px-3 py-2 rounded-md text-base font-semibold cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
