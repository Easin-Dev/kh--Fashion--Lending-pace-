"use client";

import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  ArrowLeft,
  ArrowRight,
  Pause,
  Play,
  Loader,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

export default function HeroSlider() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch(
          "https://opensheet.elk.sh/1gx6lIxx5ojiql0jEUwJR6HWLEtr6mz7XbrJ3Ta5w2co/hero"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch hero slider data.");
        }
        const data = await response.json();

        // Map the fetched data to the format the slider expects
        const formattedSlides = data.map((item) => ({
          leftImage: item.image,
          rightImage: item.image, // Using the same image for both sides
          title: item.title,
          subtitle: item.description,
        }));

        setSlides(formattedSlides);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const toggleAutoplay = useCallback(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;
    const newIsPlaying = !isPlaying;
    if (newIsPlaying) autoplay.play();
    else autoplay.stop();
    setIsPlaying(newIsPlaying);
  }, [emblaApi, isPlaying]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[550px] bg-gray-100">
        <Loader className="animate-spin h-12 w-12 text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[550px] bg-red-50 text-red-600">
        <AlertCircle className="h-12 w-12" />
        <p className="mt-4 font-semibold">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap");
      `}</style>

      <div
        className="bg-gray-200 overflow-hidden cursor-grab active:cursor-grabbing"
        ref={emblaRef}
      >
        <div className="flex">
          {slides.map((slide, index) => (
            <div
              className="flex-shrink-0 w-full min-w-full relative h-[300px] sm:h-[400px] md:h-[550px]"
              key={index}
            >
              <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-3">
                <div className="relative h-full w-full col-span-1 hidden md:block">
                  <Image
                    src={slide.leftImage}
                    alt="Fashion model left"
                    layout="fill"
                    objectFit="cover"
                    priority={index === 0}
                  />
                </div>
                <div className="relative h-full w-full col-span-1 bg-black flex flex-col items-center justify-center text-white p-8 text-center">
                  <div className="md:hidden absolute inset-0 z-0">
                    <Image
                      src={slide.leftImage}
                      alt="Fashion model background"
                      layout="fill"
                      objectFit="cover"
                      className="opacity-30"
                    />
                  </div>
                  <div className="relative z-10">
                    <h2
                      className="text-3xl sm:text-4xl md:text-5xl text-yellow-400"
                      style={{ fontFamily: "'Dancing Script', cursive" }}
                    >
                      {slide.title}
                    </h2>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-wider mt-2">
                      {slide.subtitle}
                    </h1>
                    <Link
                      href="/#featured"
                      className="mt-12 bg-white text-black font-bold py-2 px-8
                      hover:bg-gray-200 transition-colors duration-300
                      cursor-pointer"
                    >
                      SHOP NOW
                    </Link>
                  </div>
                </div>
                <div className="relative h-full w-full col-span-1 hidden md:block">
                  <Image
                    src={slide.rightImage}
                    alt="Fashion model right"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white w-full flex items-center justify-center space-x-4 py-4 border-t border-gray-200 shadow-sm">
        <button
          onClick={scrollPrev}
          className="text-gray-700 hover:text-black cursor-pointer"
        >
          <ArrowLeft size={20} />
        </button>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className="cursor-pointer"
          >
            <div
              className={`w-2.5 h-2.5 border border-gray-800 rounded-full transition-colors ${
                index === selectedIndex ? "bg-gray-800" : "bg-white"
              }`}
            ></div>
          </button>
        ))}
        <button
          onClick={toggleAutoplay}
          className="text-gray-700 hover:text-black cursor-pointer"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button
          onClick={scrollNext}
          className="text-gray-700 hover:text-black cursor-pointer"
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
