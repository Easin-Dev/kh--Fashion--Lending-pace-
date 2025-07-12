"use client";

import React, { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import Papa from "papaparse";

// Mobile-Friendly Product Card Component
function ProductCard({ product }) {
  return (
    <div className="w-full p-3">
      <div className="border border-gray-200 rounded-lg overflow-hidden group transition-shadow duration-300 hover:shadow-xl bg-white flex flex-col h-full">
        <div className="relative w-full h-64 bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.isSale && (
            <div className="absolute top-3 left-3 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10">
              SALE
            </div>
          )}
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-md font-semibold text-gray-800 flex-grow">
            {product.name}
          </h3>

          <div className="flex justify-center items-center space-x-2 mt-3">
            {product.colors &&
              product.colors
                .split(",")
                .map((color) => (
                  <span
                    key={color}
                    className="block w-5 h-5 rounded-full border border-gray-300"
                    style={{ backgroundColor: color.trim() }}
                  ></span>
                ))}
          </div>
          <p className="text-sm text-gray-500 mt-2 text-center">
            SIZE: {product.size}
          </p>

          <div className="mt-4 text-center">
            <span className="text-xl font-bold text-gray-900">
              ${parseFloat(product.price).toFixed(2)}
            </span>
            {product.oldPrice && (
              <span className="ml-2 text-md text-gray-500 line-through">
                ${parseFloat(product.oldPrice).toFixed(2)}
              </span>
            )}
          </div>

          <button className="w-full mt-4 flex items-center justify-center bg-gray-900 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-300">
            <ShoppingCart size={18} className="mr-2" />
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

// Product Grid Component
function ProductGrid({ products }) {
  if (!products || products.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-8">
        No products to display in this category.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// Main FeaturedProducts Component
export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState("featured");
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const GOOGLE_SHEET_URL =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vSWh5BgglMNXqn7_8UaG4jcLtay3VmO937w2PyXCtilxbNQSfBavvcFkdwXYbchfM2KGAm8FQP7vFX8/pub?gid=0&single=true&output=csv";

    Papa.parse(GOOGLE_SHEET_URL, {
      download: true,
      header: true,
      complete: (results) => {
        const formattedData = results.data
          .map((item) => ({
            ...item,
            isSale: item.isSale && item.isSale.toLowerCase() === "true",
          }))
          .filter((item) => item.id); // Filter out empty rows
        setAllProducts(formattedData);
        setLoading(false);
      },
      error: (err) => {
        setError(
          "Failed to load product data. Please check the Google Sheet URL."
        );
        setLoading(false);
        console.error("Error fetching data: ", err);
      },
    });
  }, []);

  const tabs = [
    { id: "featured", label: "Featured" },
    { id: "newArrival", label: "New Arrival" },
    { id: "bestSelling", label: "Best Selling" },
  ];

  const filteredProducts = allProducts.filter((p) => p.category === activeTab);

  if (loading) {
    return <div className="text-center py-12">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap");
        .font-montserrat {
          font-family: "Montserrat", sans-serif;
        }
      `}</style>
      <div className="py-16 bg-gray-50 font-montserrat">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center mb-10">
            <div className="flex justify-center items-center space-x-6 sm:space-x-10">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-xl sm:text-2xl font-semibold tracking-wider pb-2 transition-all duration-300 uppercase ${
                    activeTab === tab.id
                      ? "text-gray-900 border-b-2 border-gray-900"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="mt-4 text-gray-900 text-xl tracking-[0.2em]">
              &#x2727;&#x2727;&#x2727;
            </div>
          </div>
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </>
  );
}
