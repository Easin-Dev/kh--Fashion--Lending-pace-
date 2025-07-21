"use client";

import React, { useState, useEffect } from "react";
import { ShoppingCart, Loader, AlertCircle } from "lucide-react";

// Mobile-Friendly Product Card Component
function ProductCard({ product }) {
  // Ensure price is a number before formatting
  const price = parseFloat(product.price);
  const oldPrice = product.oldPrice ? parseFloat(product.oldPrice) : null;

  return (
    <div className="w-full p-3">
      <div className="border border-gray-200 rounded-lg overflow-hidden group transition-shadow duration-300 hover:shadow-xl bg-white flex flex-col h-full">
        <div className="relative w-full h-64 bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/600x400/eee/ccc?text=Image+Not+Found";
            }}
          />
          {product.isSale && product.isSale.toLowerCase() === "true" && (
            <div className="absolute top-3 left-3 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10">
              SALE
            </div>
          )}
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-md font-semibold text-gray-800 flex-grow min-h-[40px]">
            {product.name}
          </h3>

          <div className="flex justify-center items-center space-x-2 mt-3 min-h-[20px]">
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
              {!isNaN(price) ? `$${price.toFixed(2)}` : "N/A"}
            </span>
            {oldPrice && !isNaN(oldPrice) && (
              <span className="ml-2 text-md text-gray-500 line-through">
                ${oldPrice.toFixed(2)}
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <ProductCard key={product.id || index} product={product} />
      ))}
    </div>
  );
}

// Main FeaturedProducts Component
export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState("featured");
  const [products, setProducts] = useState({
    featured: [],
    newArrival: [],
    trending: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const sheetId = "1gx6lIxx5ojiql0jEUwJR6HWLEtr6mz7XbrJ3Ta5w2co";
        const urls = {
          featured: `https://opensheet.elk.sh/${sheetId}/featured`,
          newArrival: `https://opensheet.elk.sh/${sheetId}/newArrival`,
          trending: `https://opensheet.elk.sh/${sheetId}/trending`,
        };

        const responses = await Promise.all([
          fetch(urls.featured),
          fetch(urls.newArrival),
          fetch(urls.trending),
        ]);

        if (responses.some((res) => !res.ok)) {
          throw new Error("Network response was not ok");
        }

        const data = await Promise.all(responses.map((res) => res.json()));

        setProducts({
          featured: data[0],
          newArrival: data[1],
          trending: data[2],
        });
      } catch (err) {
        setError(
          "Failed to load product data. Please check your Google Sheet and links."
        );
        console.error("Error fetching data: ", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setVisibleCount(8); // Reset visible count when tab changes
  };

  const tabs = [
    { id: "featured", label: "Featured" },
    { id: "newArrival", label: "New Arrival" },
    { id: "trending", label: "Trending" }, // "Best Selling" changed to "Trending"
  ];

  const currentProducts = products[activeTab] || [];
  const visibleProducts = currentProducts.slice(0, visibleCount);

  if (loading) {
    return (
      <div className="text-center py-20 flex flex-col items-center justify-center">
        <Loader className="animate-spin h-12 w-12 text-gray-500" />
        <p className="mt-4 text-lg text-gray-600">Loading Products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 flex flex-col items-center justify-center bg-red-50 p-8 rounded-lg">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <p className="mt-4 text-lg text-red-700 font-semibold">{error}</p>
      </div>
    );
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
                  onClick={() => handleTabClick(tab.id)}
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
          <ProductGrid products={visibleProducts} />
          {currentProducts.length > visibleCount && (
            <div className="text-center mt-10">
              <button
                onClick={() => setVisibleCount(currentProducts.length)}
                className="bg-gray-900 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-700 transition-colors duration-300"
              >
                See More
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
