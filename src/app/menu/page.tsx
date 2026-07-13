"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { menuItems } from "@/content/menu";

const categories = [
  { id: "all", label: "All" },
  { id: "cocktails", label: "Cocktails" },
  { id: "spirits", label: "Spirits & Shots" },
  { id: "small-plates", label: "Small Plates" },
  { id: "mains", label: "Mains" },
  { id: "desserts", label: "Desserts" },
  { id: "non-alcoholic", label: "Non-Alcoholic" },
];

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDiet, setSelectedDiet] = useState<"all" | "veg" | "non-veg" | "vegan">("all");

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Category filter
      const categoryMatch = selectedCategory === "all" || item.category === selectedCategory;
      // Dietary filter
      const dietMatch = selectedDiet === "all" || item.dietary === selectedDiet;
      // Search query filter
      const searchMatch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      return categoryMatch && dietMatch && searchMatch;
    });
  }, [selectedCategory, selectedDiet, searchQuery]);

  return (
    <div className="relative w-full pb-24">
      {/* HEADER SECTION */}
      <section className="relative bg-void py-16 border-b border-line/30 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="font-display font-bold text-xs uppercase tracking-[0.25em] text-accent">
            Food & Liquid
          </span>
          <h1 className="font-display font-extrabold text-4xl md:text-6xl uppercase tracking-wider text-ink">
            The Refined Menu
          </h1>
          <p className="font-body text-xs md:text-sm text-ink-dim uppercase tracking-widest max-w-md mx-auto leading-relaxed">
            Smoky signatures, house-made ferments, and highly curated single malts.
          </p>
        </div>
      </section>

      {/* FILTER SYSTEM & SEARCH CONTROLS */}
      <section className="bg-charcoal border-b border-line py-8 px-6 sticky top-20 md:top-24 z-20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          {/* Categories Filters List */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none scroll-smooth">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 px-4 py-2 font-display font-bold text-xs uppercase tracking-wider border transition-all duration-300 rounded-none ${
                  selectedCategory === cat.id
                    ? "border-accent bg-accent text-void font-extrabold"
                    : "border-line text-ink-dim hover:text-ink hover:border-ink-dim/40"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input and Diet Filter */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
            {/* Search Bar */}
            <div className="relative flex items-center bg-void border border-line">
              <Search size={14} className="absolute left-4 text-ink-faint" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search signatures..."
                className="w-full md:w-60 bg-transparent text-ink placeholder:text-ink-faint font-body text-xs uppercase tracking-widest pl-10 pr-4 py-3 border-0 focus:outline-none focus:ring-1 focus:ring-accent/40"
              />
            </div>

            {/* Diet Dropdown Filter Chips */}
            <div className="flex items-center gap-1 border border-line p-1 bg-void">
              {(["all", "veg", "non-veg", "vegan"] as const).map((diet) => (
                <button
                  key={diet}
                  onClick={() => setSelectedDiet(diet)}
                  className={`px-3 py-1.5 font-display font-bold text-[10px] uppercase tracking-wider transition-all duration-300 ${
                    selectedDiet === diet
                      ? "bg-accent/10 text-accent font-extrabold"
                      : "text-ink-faint hover:text-ink-dim"
                  }`}
                >
                  {diet === "all" ? "All" : diet}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED ITEMS LIST GRID */}
      <section className="max-w-7xl mx-auto px-6 mt-12">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="group bg-charcoal border border-line/40 p-4 space-y-4 hover:border-accent/30 transition-all duration-500 flex flex-col justify-between h-full"
              >
                <div className="space-y-4">
                  {/* Photo area */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden border border-line/10 bg-void">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Diet tag dot overlay */}
                    <div className="absolute top-3 right-3 flex items-center space-x-1.5 bg-void/90 border border-line/40 px-2.5 py-1 text-[8px] tracking-[0.15em] uppercase text-ink-dim font-bold">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          backgroundColor:
                            item.dietary === "veg"
                              ? "#3DDC84"
                              : item.dietary === "non-veg"
                              ? "#E23E3E"
                              : "#C9FF3D", // vegan signature accent
                        }}
                      />
                      <span>{item.dietary}</span>
                    </div>
                  </div>

                  {/* Copy Area */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-display font-extrabold text-base uppercase tracking-wider text-ink group-hover:text-accent transition-colors duration-300">
                        {item.name}
                      </h3>
                      <span className="font-body text-sm font-extrabold text-accent flex-shrink-0">
                        ₹{item.price}
                      </span>
                    </div>
                    <p className="font-body text-xs text-ink-dim leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="border-t border-line/20 pt-3 flex items-center justify-between text-[9px] uppercase tracking-widest text-ink-faint">
                  <span>Category: {item.category}</span>
                  {item.signature && (
                    <span className="text-accent bg-accent/10 px-1.5 py-0.5 border border-accent/20">
                      SIGNATURE
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty Search Handler */}
        {filteredItems.length === 0 && (
          <div className="text-center py-24 space-y-4">
            <span className="font-display font-extrabold text-lg text-ink-dim block uppercase">
              No matching elements
            </span>
            <p className="font-body text-xs text-ink-faint max-w-xs mx-auto leading-relaxed">
              We couldn&apos;t find any signatures matching your keyword. Try adjusting filters or resetting categories.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
