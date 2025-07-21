"use client";

import React, { useState, useEffect } from "react";
import { Loader, AlertCircle } from "lucide-react";

// Main ScreenshotSlider Component
export default function ScreenshotSlider() {
  const [screenshots, setScreenshots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScreenshots = async () => {
      try {
        const response = await fetch(
          "https://opensheet.elk.sh/1gx6lIxx5ojiql0jEUwJR6HWLEtr6mz7XbrJ3Ta5w2co/testimonials"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch testimonials data.");
        }
        const data = await response.json();
        // Filter out any rows that might be empty
        setScreenshots(data.filter((item) => item.id && item.image));
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchScreenshots();
  }, []);

  return (
    <>
      <style jsx global>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
      <div className="py-16 bg-gray-50 font-montserrat">
        <div className="container mx-auto px-6">
          {/* Section Title */}
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 tracking-wider uppercase">
              What Our Customers Say
            </h2>
            <div className="mt-4 text-gray-900 text-xl tracking-[0.2em]">
              &#x2727;&#x2727;&#x2727;
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center h-80">
            <Loader className="animate-spin h-12 w-12 text-gray-500" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex flex-col items-center justify-center h-80 bg-red-50 text-red-600 p-8 rounded-lg">
            <AlertCircle className="h-12 w-12" />
            <p className="mt-4 font-semibold">Error: {error}</p>
          </div>
        )}

        {/* Marquee Container - Renders only when data is successfully loaded */}
        {!loading && !error && screenshots.length > 0 && (
          <div className="w-full overflow-x-hidden group">
            <div className="flex animate-[marquee_80s_linear_infinite] group-hover:[animation-play-state:paused]">
              {/* Render screenshots twice for the seamless loop */}
              {screenshots.map((screenshot) => (
                <div
                  key={`first-${screenshot.id}`}
                  className="flex-shrink-0 p-4"
                  style={{ width: "auto" }}
                >
                  <img
                    src={screenshot.image}
                    alt={`Customer review ${screenshot.id}`}
                    className="h-80 w-auto rounded-lg shadow-lg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://placehold.co/400x320/eee/ccc?text=Image+Error";
                    }}
                  />
                </div>
              ))}
              {screenshots.map((screenshot) => (
                <div
                  key={`second-${screenshot.id}`}
                  className="flex-shrink-0 p-4"
                  style={{ width: "auto" }}
                >
                  <img
                    src={screenshot.image}
                    alt={`Customer review ${screenshot.id}`}
                    className="h-80 w-auto rounded-lg shadow-lg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://placehold.co/400x320/eee/ccc?text=Image+Error";
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
