"use client";

import { useState } from "react";
import Image from "next/image";

export function VehicleGallery({ mainImage, altText }: { mainImage: string, altText: string }) {
  // Use primary image then simulate extra thumbnails using Unsplash auto-queries
  const images = [
    mainImage,
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&q=80"
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="space-y-4">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-100 border border-slate-200">
        <Image
          src={images[activeIndex]}
          alt={altText}
          fill
          className="object-cover transition-all duration-500 hover:scale-105"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      
      <div className="grid grid-cols-4 gap-4">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`relative aspect-video overflow-hidden rounded-xl border-2 transition-all ${
              activeIndex === idx ? "border-blue-600 ring-2 ring-blue-600/20 ring-offset-1" : "border-transparent opacity-70 hover:opacity-100"
            }`}
          >
            <Image
              src={img}
              alt={`${altText} thumbnail ${idx + 1}`}
              fill
              className="object-cover"
              sizes="20vw"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
