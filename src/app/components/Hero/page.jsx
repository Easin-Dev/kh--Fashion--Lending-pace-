"use client";

import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";

// স্লাইডারের ডেটা
const slides = [
  {
    leftImage:
      "https://scontent.fjsr12-1.fna.fbcdn.net/v/t39.30808-6/472915726_122191542884128317_3871593462846501589_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_ohc=MmB8t6VXFOEQ7kNvwG5BlIS&_nc_oc=AdkkJkOvwFpGcLglZJjdoSCeG4bs6I73GWpX-ZVvBMzElHB9h0JiMeiOvfrDZp0FxAA&_nc_zt=23&_nc_ht=scontent.fjsr12-1.fna&_nc_gid=dhydmCmcKTbvmRy2hbGNuw&oh=00_AfS9aN0-BGvxabuG7DxmKpb5pI-s8DGQbo9hV-6O1Ruwvw&oe=6877B8B0",
    rightImage:
      "https://scontent.fjsr12-1.fna.fbcdn.net/v/t39.30808-6/473318922_122191542866128317_2926669780370830446_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_ohc=cWvZHk7P3fMQ7kNvwF_S6U0&_nc_oc=AdmU-UC-gw8MhNH1p8ITbFzJBjIVKTOdHQ4BgTDrhV94szv0Ng0awRv3cyYiU_TlRwM&_nc_zt=23&_nc_ht=scontent.fjsr12-1.fna&_nc_gid=7UeK3r3SyTKGI7l5SYdEHQ&oh=00_AfQIOboIlcLQpQIOgQd6AzPuFSOS__-A0knzOMcJIy2NyA&oe=6877DEDF",
    title: "New Arrivals",
    subtitle: "FASHION COLLECTION",
  },
  {
    leftImage:
      "https://scontent.fjsr12-1.fna.fbcdn.net/v/t39.30808-6/472906927_122191542668128317_4933919390336722227_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=rkA6zhNwE_8Q7kNvwE4wcmX&_nc_oc=AdnNHxH1XFzGCUCCqH2wqYG7BxYer1JZC9ioFvgO0PTqf9oW8lEcculu1wo38s7v3qk&_nc_zt=23&_nc_ht=scontent.fjsr12-1.fna&_nc_gid=ugFFyntJcPEV9CsPWQrCLg&oh=00_AfTYVoW7UDZsmhLZZUfTOBhixvU84ACjfcdrg0gcMONWWg&oe=6877BACD",
    rightImage:
      "https://scontent.fjsr12-1.fna.fbcdn.net/v/t39.30808-6/472869695_122191542680128317_7607595954014579717_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=bU-4rHgmRcMQ7kNvwF_-9qr&_nc_oc=AdmS_m21PqVNUFzKbOItQ2RG7hHQXHHYI6agPl08qsqkHJd6216rMW3CrjtmX0Xkd7o&_nc_zt=23&_nc_ht=scontent.fjsr12-1.fna&_nc_gid=gsa0WJ8EefIanH5_FFexyw&oh=00_AfQPZanGPKOwJfsADamttMZJpGrUJNVq6aN9Sx1ludz9Uw&oe=6877BFEC",
    title: "Men's Style",
    subtitle: "AUTUMN EDIT",
  },
  {
    leftImage:
      "https://scontent.fjsr12-1.fna.fbcdn.net/v/t39.30808-6/471262463_122188723604128317_7144042145808486997_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=LzHU_zhRw9cQ7kNvwFQJ1B8&_nc_oc=AdlvwaswH1z8nlfrp9TAW-3WcNfpZWIAWdxGjG-5cpt_2lC_Ycwhbh9zWC03-_cO-yk&_nc_zt=23&_nc_ht=scontent.fjsr12-1.fna&_nc_gid=nf2o4N7cwQQ7Ie7yGBDiEA&oh=00_AfT5C6pglMV3zm80IK84SR_R_sPto-wfD_ZNDBNJVO5Fxw&oe=6877E718",
    rightImage:
      "https://scontent.fjsr12-1.fna.fbcdn.net/v/t39.30808-6/471481842_122188723592128317_649438020445097225_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_ohc=5vVUkZazzDcQ7kNvwHN_4nU&_nc_oc=AdnbvUEZyeacvTX1bie1-2DGlJO5UXDArhO_hU5ixedklvu3Y7uKFD0IcYFTclQmnNY&_nc_zt=23&_nc_ht=scontent.fjsr12-1.fna&_nc_gid=Xo2b6RZKwGgcmPIqBDD7sw&oh=00_AfS56LSw2x4CwvzHcRSogJDuZFHpy8M7kkFNpMN1O8LJzg&oe=6877C521",
    title: "Accessorize",
    subtitle: "JEWELRY & SHOES",
  },
];

export default function HeroSlider() {
  // Autoplay প্লাগইন সহ Embla Carousel হুক ব্যবহার করা হয়েছে
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // স্লাইডার কন্ট্রোলের জন্য ফাংশন
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

  // অটো-প্লে চালু বা বন্ধ করার ফাংশন
  const toggleAutoplay = useCallback(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const newIsPlaying = !isPlaying;
    if (newIsPlaying) autoplay.play();
    else autoplay.stop();

    setIsPlaying(newIsPlaying);
  }, [emblaApi, isPlaying]);

  // বর্তমান স্লাইড ইনডেক্স ট্র্যাক করার জন্য useEffect
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  return (
    <div className="relative w-full">
      {/* "Dancing Script" ফন্ট লোড করার জন্য */}
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
                {/* বাম পাশের ছবি (ডেস্কটপ) */}
                <div className="relative h-full w-full col-span-1 hidden md:block">
                  <Image
                    src={slide.leftImage}
                    alt="Fashion model left"
                    layout="fill"
                    objectFit="cover"
                    priority={index === 0}
                  />
                </div>

                {/* মাঝখানের টেক্সট */}
                <div className="relative h-full w-full col-span-1 bg-black flex flex-col items-center justify-center text-white p-8 text-center">
                  {/* মোবাইলের জন্য ব্যাকগ্রাউন্ড ছবি */}
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
                    <button className="mt-8 bg-white text-black font-bold py-3 px-8 hover:bg-gray-200 transition-colors duration-300 cursor-pointer">
                      SHOP NOW
                    </button>
                  </div>
                </div>

                {/* ডান পাশের ছবি (ডেস্কটপ) */}
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

      {/* স্লাইডার কন্ট্রোল */}
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
