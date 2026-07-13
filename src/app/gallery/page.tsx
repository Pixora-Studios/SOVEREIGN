"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import InstagramEmbed from "@/components/InstagramEmbed";
import Reveal from "@/components/Reveal";

// Hardcoded Pexels / Unsplash gallery assets (No Pinterest, all free commercial use licenses)
const galleryItems = [
  {
    id: "g1",
    img: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=800",
    caption: "The Sovereign Velvet Lounge",
    type: "photo",
  },
  {
    id: "g2",
    img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800",
    caption: "Artisan Obsidian Sour Preparation",
    type: "photo",
  },
  {
    id: "g3",
    type: "instagram",
  },
  {
    id: "g4",
    img: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=800",
    caption: "The Front-Row Acoustic Chancel",
    type: "photo",
  },
  {
    id: "g5",
    img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800",
    caption: "Sovereign Saturdays Mid-Frequency Peak",
    type: "photo",
  },
  {
    id: "g6",
    type: "instagram",
  },
  {
    id: "g7",
    img: "https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&q=80&w=800",
    caption: "Melodic Sundowners Under Custom Ambient Rays",
    type: "photo",
  },
  {
    id: "g8",
    img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800",
    caption: "The Sovereign Spritz Glassware",
    type: "photo",
  },
];

export default function GalleryPage() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <div className="relative w-full pb-24">
      {/* HEADER */}
      <section className="relative bg-void py-16 border-b border-line/30 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="font-display font-bold text-xs uppercase tracking-[0.25em] text-accent">
            Visual Catalog
          </span>
          <h1 className="font-display font-extrabold text-4xl md:text-6xl uppercase tracking-wider text-ink">
            Aesthetic Archive
          </h1>
          <p className="font-body text-xs md:text-sm text-ink-dim uppercase tracking-widest max-w-md mx-auto leading-relaxed">
            A snapshot index of concrete shapes, artisan cocktails, and sensory rituals at Patia, Bhubaneswar.
          </p>
        </div>
      </section>

      {/* ASYMMETRIC MASONRY STYLE GRID */}
      <section className="max-w-7xl mx-auto px-6 mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {galleryItems.map((item, idx) => {
            if (item.type === "instagram") {
              return (
                <div key={item.id} className="lg:col-span-1">
                  <InstagramEmbed url="" />
                </div>
              );
            }

            return (
              <Reveal key={item.id} delay={idx % 4 * 0.1} width="100%">
                <div
                  onClick={() => item.img && setActiveImage(item.img)}
                  className="group relative w-full aspect-[3/4] bg-charcoal border border-line/40 hover:border-accent/40 transition-all duration-500 overflow-hidden cursor-pointer"
                >
                  {/* Image with zoom reveal */}
                  <div className="relative w-full h-full">
                    <Image
                      src={item.img || ""}
                      alt={item.caption || "Gallery Shot"}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                    />

                    {/* Hover detail overlay */}
                    <div className="absolute inset-0 bg-void/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                      <div className="flex justify-end">
                        <span className="w-8 h-8 rounded-full border border-line flex items-center justify-center text-accent">
                          <ZoomIn size={14} />
                        </span>
                      </div>
                      <div className="space-y-1">
                        <span className="font-display font-bold text-[9px] tracking-widest text-accent uppercase">
                          [ CLICK TO OPEN ]
                        </span>
                        <h3 className="font-display font-extrabold text-xs uppercase tracking-wide text-ink">
                          {item.caption}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 bg-void/95 z-50 flex items-center justify-center p-4 cursor-zoom-out"
          >
            {/* Close button */}
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-6 right-6 p-2 text-ink-dim hover:text-accent focus:outline-none transition-colors"
              aria-label="Close Lightbox"
            >
              <X size={24} />
            </button>

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl max-h-[80vh] aspect-[4/3] bg-charcoal border border-line"
              onClick={(e) => e.stopPropagation()} // stop click bubbling
            >
              <Image
                src={activeImage}
                alt="Active Lightbox Media"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
