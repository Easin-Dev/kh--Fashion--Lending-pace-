"use client";

import React from "react";
import { Heart, Eye, Menu as MenuIcon } from "lucide-react";

// Mock Data for the collection products
const collectionProducts = [
  {
    id: 16,
    name: "Classic Leather Loafers",
    price: 450.0,
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2080&auto=format&fit=crop",
    colors: ["#A52A2A", "#000000"],
    size: "8",
  },
  {
    id: 17,
    name: "Vintage Denim Jacket",
    price: 680.0,
    image:
      "https://images.unsplash.com/photo-1543072252-253c7a269757?q=80&w=1887&auto=format&fit=crop",
    colors: ["#4682B4"],
    size: "L",
  },
  {
    id: 18,
    name: "Silk Neck Scarf",
    price: 120.0,
    image:
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=2069&auto=format&fit=crop",
    colors: ["#FFD700", "#C71585"],
    size: "N/A",
  },
  {
    id: 19,
    name: "Striped Cotton Shirt",
    price: 320.0,
    image:
      "https://images.unsplash.com/photo-1598032895397-b9472444bf23?q=80&w=1887&auto=format&fit=crop",
    colors: ["#FFFFFF", "#0000FF"],
    size: "M",
  },
  {
    id: 20,
    name: "High-Waist Trousers",
    price: 410.0,
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1887&auto=format&fit=crop",
    colors: ["#D2B48C", "#000000"],
    size: "S",
  },
  {
    id: 21,
    name: "Casual Canvas Backpack",
    price: 380.0,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb68c6a62?q=80&w=1887&auto=format&fit=crop",
    colors: ["#8B4513", "#2F4F4F"],
    size: "N/A",
  },
  {
    id: 22,
    name: "Wool Blend Cardigan",
    price: 550.0,
    image:
      "https://images.unsplash.com/photo-1616258734693-b06865239938?q=80&w=1887&auto=format&fit=crop",
    colors: ["#808080", "#F5F5DC"],
    size: "XL",
  },
  {
    id: 23,
    name: "Leather Belt with Buckle",
    price: 180.0,
    image:
      "https://images.unsplash.com/photo-1605733513596-2a78373b18f0?q=80&w=1887&auto=format&fit=crop",
    colors: ["#000000"],
    size: "32",
  },
  {
    id: 24,
    name: "Pleated Midi Skirt",
    price: 490.0,
    image:
      "https://images.unsplash.com/photo-1585487005164-aa98a13a3512?q=80&w=1887&auto=format&fit=crop",
    colors: ["#FFC0CB", "#008080"],
    size: "M",
  },
  {
    id: 25,
    name: "Classic Fedora Hat",
    price: 280.0,
    image:
      "https://images.unsplash.com/photo-1533055642149-52f4a8a53c13?q=80&w=1887&auto=format&fit=crop",
    colors: ["#3D2B1F", "#808080"],
    size: "L",
  },
  {
    id: 26,
    name: "Linen Blend Blazer",
    price: 720.0,
    image:
      "https://images.unsplash.com/photo-1505962942698-967b05592966?q=80&w=1887&auto=format&fit=crop",
    colors: ["#FFFFFF", "#E6E6FA"],
    size: "M",
  },
  {
    id: 27,
    name: "Athletic Jogger Pants",
    price: 340.0,
    image:
      "https://images.unsplash.com/photo-1550928432-4e410b616895?q=80&w=1887&auto=format&fit=crop",
    colors: ["#000000", "#808080"],
    size: "L",
  },
];

// Reusable Product Card Component
function ProductCard({ product }) {
  return (
    <div className="w-full p-3 cursor-pointer">
      <div className="border border-gray-200 rounded-lg overflow-hidden group relative transition-shadow duration-300 hover:shadow-2xl">
        <div className="relative w-full h-80 bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300"
          />
          <div className="absolute inset-0 hover:bg-white/30 hover:backdrop-blur-sm bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center">
            <div className="flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-y-0 translate-y-5">
              <button className="flex items-center justify-center bg-white text-black border border-red-400 text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-red-400 hover:text-white transition-all duration-300">
                <MenuIcon size={16} className="mr-2" />
                SELECT OPTIONS
              </button>
              <div className="flex items-center space-x-4 mt-4 text-sm font-semibold text-gray-700">
                <button className="flex items-center hover:text-red-400 transition-colors">
                  <Eye size={16} className="mr-1" /> QUICKVIEW
                </button>
                <span>|</span>
                <button className="flex items-center hover:text-red-400 transition-colors">
                  <Heart size={16} className="mr-1" /> WISHLIST
                </button>
              </div>
            </div>
          </div>
          {product.isSale && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10">
              SALE
            </div>
          )}
        </div>
        <div className="p-4 text-center bg-white transition-all duration-300">
          <h3 className="text-md font-medium text-gray-700 truncate group-hover:text-red-400 transition-colors">
            {product.name}
          </h3>
          <div className="mt-2">
            <span className="text-lg font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.oldPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>
          <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-300 overflow-hidden mt-2">
            <div className="flex justify-center items-center space-x-2 mt-2">
              {product.colors.map((color) => (
                <span
                  key={color}
                  className="block w-5 h-5 rounded-full border border-gray-300"
                  style={{ backgroundColor: color }}
                ></span>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">SIZE: {product.size}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main BrowseCollections Component
export default function BrowseCollections() {
  return (
    <div className="py-16 bg-white font-montserrat">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className="flex flex-col items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 tracking-wider uppercase">
            Browse our Collections
          </h2>
          <div className="mt-4 text-red-400 text-xl tracking-[0.2em]">
            &#x2727;&#x2727;&#x2727;
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 -m-3">
          {collectionProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
