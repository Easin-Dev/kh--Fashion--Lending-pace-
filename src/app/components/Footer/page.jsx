"use client";

import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 font-montserrat">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About Section */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            {/* Logo */}
            <img 
              src="https://i.ibb.co/5h84XN10/kh-fashion-high-resolution-logo-transparent.png" 
              alt="KH Fashion Logo" 
              className="h-12 bg-white p-2 rounded-md" // Added white background for visibility
            />
            <p className="mt-4 text-sm">
              KH Fashion is your one-stop shop for the latest trends and timeless classics. We believe in quality, style, and affordability.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shop</a></li>
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Column 3: Help & Info */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider">Help & Info</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Track Your Order</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider">Newsletter</h3>
            <p className="mt-4 text-sm">Subscribe to get the latest on sales, new releases and more.</p>
            <form className="mt-4 flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-gray-800 text-gray-300 px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-r-md transition-colors">
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-center sm:text-left">
            &copy; {new Date().getFullYear()} KH Fashion. All Rights Reserved.
          </p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
            <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
            <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
            <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
