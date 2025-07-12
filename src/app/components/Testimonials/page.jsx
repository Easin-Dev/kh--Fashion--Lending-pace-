"use client";

import React from "react";

// Mock data for testimonial screenshots
// আপনার আসল স্ক্রিনশটের URL দিয়ে এগুলো পরিবর্তন করুন
const reviewScreenshots = [
  {
    id: 1,
    src: "https://scontent.fjsr12-1.fna.fbcdn.net/v/t39.30808-6/473049432_122191589528128317_1129703573583801659_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=QBAQGhu4jcUQ7kNvwF-HofE&_nc_oc=AdmyrsZcfkO-J3oH3LHbJruOqchGPoIQWtf6j-FxfMT35ceizArTybNnCYcBGPvcXHM&_nc_zt=23&_nc_ht=scontent.fjsr12-1.fna&_nc_gid=aa5W9lTxnIzncEtBLDrKNQ&oh=00_AfRc74tKQ0tQqALkesOXqDTJqIDCU2Br5vy00gbiHCKXUg&oe=6877CC01",
    alt: "Customer review screenshot 1",
  },
  {
    id: 2,
    src: "https://scontent.fjsr12-1.fna.fbcdn.net/v/t39.30808-6/473049432_122191589528128317_1129703573583801659_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=QBAQGhu4jcUQ7kNvwF-HofE&_nc_oc=AdmyrsZcfkO-J3oH3LHbJruOqchGPoIQWtf6j-FxfMT35ceizArTybNnCYcBGPvcXHM&_nc_zt=23&_nc_ht=scontent.fjsr12-1.fna&_nc_gid=aa5W9lTxnIzncEtBLDrKNQ&oh=00_AfRc74tKQ0tQqALkesOXqDTJqIDCU2Br5vy00gbiHCKXUg&oe=6877CC01",
    alt: "Customer review screenshot 2",
  },
  {
    id: 3,
    src: "https://scontent.fjsr12-1.fna.fbcdn.net/v/t39.30808-6/473049432_122191589528128317_1129703573583801659_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=QBAQGhu4jcUQ7kNvwF-HofE&_nc_oc=AdmyrsZcfkO-J3oH3LHbJruOqchGPoIQWtf6j-FxfMT35ceizArTybNnCYcBGPvcXHM&_nc_zt=23&_nc_ht=scontent.fjsr12-1.fna&_nc_gid=aa5W9lTxnIzncEtBLDrKNQ&oh=00_AfRc74tKQ0tQqALkesOXqDTJqIDCU2Br5vy00gbiHCKXUg&oe=6877CC01",
    alt: "Customer review screenshot 3",
  },
  {
    id: 4,
    src: "https://scontent.fjsr12-1.fna.fbcdn.net/v/t39.30808-6/473049432_122191589528128317_1129703573583801659_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=QBAQGhu4jcUQ7kNvwF-HofE&_nc_oc=AdmyrsZcfkO-J3oH3LHbJruOqchGPoIQWtf6j-FxfMT35ceizArTybNnCYcBGPvcXHM&_nc_zt=23&_nc_ht=scontent.fjsr12-1.fna&_nc_gid=aa5W9lTxnIzncEtBLDrKNQ&oh=00_AfRc74tKQ0tQqALkesOXqDTJqIDCU2Br5vy00gbiHCKXUg&oe=6877CC01",
    alt: "Customer review screenshot 4",
  },
  {
    id: 5,
    src: "https://scontent.fjsr12-1.fna.fbcdn.net/v/t39.30808-6/473115559_122191603160128317_3656163620576375152_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=ATK0s26e-FkQ7kNvwGwp3Wd&_nc_oc=AdkaIMEkrE5Lq4DQLiSmcG_9lxLaCVeeR0MBcRiIJgoonAx2WqKGJL1wJNhXgWATQ0k&_nc_zt=23&_nc_ht=scontent.fjsr12-1.fna&_nc_gid=pwqCrzbyzIeb04UcxRhqzg&oh=00_AfTm5I1-y3_Jzi7CCPQ30jSJ36uWzM7fTEf22FodYW5crw&oe=6877E78E",
    alt: "Customer review screenshot 5",
  },
  {
    id: 6,
    src: "https://scontent.fjsr12-1.fna.fbcdn.net/v/t39.30808-6/473115559_122191603160128317_3656163620576375152_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=ATK0s26e-FkQ7kNvwGwp3Wd&_nc_oc=AdkaIMEkrE5Lq4DQLiSmcG_9lxLaCVeeR0MBcRiIJgoonAx2WqKGJL1wJNhXgWATQ0k&_nc_zt=23&_nc_ht=scontent.fjsr12-1.fna&_nc_gid=pwqCrzbyzIeb04UcxRhqzg&oh=00_AfTm5I1-y3_Jzi7CCPQ30jSJ36uWzM7fTEf22FodYW5crw&oe=6877E78E",
    alt: "Customer review screenshot 6",
  },
];

// Main ScreenshotSlider Component
export default function ScreenshotSlider() {
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

        {/* Marquee Container */}
        <div className="w-full overflow-x-hidden group">
          <div className="flex animate-[marquee_80s_linear_infinite] group-hover:[animation-play-state:paused]">
            {/* Render screenshots twice for the seamless loop */}
            {reviewScreenshots.map((screenshot) => (
              <div
                key={`first-${screenshot.id}`}
                className="flex-shrink-0 p-4"
                style={{ width: "auto" }}
              >
                <img
                  src={screenshot.src}
                  alt={screenshot.alt}
                  className="h-80 w-auto rounded-lg shadow-lg"
                />
              </div>
            ))}
            {reviewScreenshots.map((screenshot) => (
              <div
                key={`second-${screenshot.id}`}
                className="flex-shrink-0 p-4"
                style={{ width: "auto" }}
              >
                <img
                  src={screenshot.src}
                  alt={screenshot.alt}
                  className="h-80 w-auto rounded-lg shadow-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
