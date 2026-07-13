"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, Compass, DollarSign } from "lucide-react";
import { siteConfig } from "@/config/site";
import Reveal from "@/components/Reveal";

export default function NightsPage() {
  return (
    <div className="relative w-full pb-24">
      {/* HEADER MOMENT */}
      <section className="relative bg-void py-16 border-b border-line/30 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="font-display font-bold text-xs uppercase tracking-[0.25em] text-accent">
            Calendar & Rituals
          </span>
          <h1 className="font-display font-extrabold text-4xl md:text-6xl uppercase tracking-wider text-ink">
            The Weekly Lineup
          </h1>
          <p className="font-body text-xs md:text-sm text-ink-dim uppercase tracking-widest max-w-md mx-auto leading-relaxed">
            Four weekly chapters. Curated electronic sound, customized tempos, and peak community energy.
          </p>
        </div>
      </section>

      {/* FULL WEEKLY LIST CARDS */}
      <section className="max-w-7xl mx-auto px-6 mt-16 space-y-12">
        {siteConfig.nights.map((night) => (
          <Reveal key={night.id} width="100%">
            <div className="group bg-charcoal border border-line/40 hover:border-accent/30 transition-all duration-500 flex flex-col md:flex-row overflow-hidden">

              {/* Card visual mask/clip image column */}
              <div className="relative w-full md:w-[45%] aspect-[16/10] md:aspect-auto min-h-[300px] overflow-hidden bg-void">
                <Image
                  src={night.image}
                  alt={night.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[1000ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal md:from-transparent via-transparent to-transparent" />

                {/* Visual day badge */}
                <div className="absolute top-6 left-6 bg-accent text-void font-display font-extrabold text-lg uppercase tracking-wider w-16 h-16 flex items-center justify-center shadow-lg">
                  {night.day}
                </div>
              </div>

              {/* Card Details Column */}
              <div className="p-8 md:p-12 flex-1 flex flex-col justify-between space-y-8">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="font-display font-bold text-xs uppercase tracking-widest text-accent block">
                      {night.subtitle}
                    </span>
                    <h2 className="font-display font-extrabold text-2xl md:text-3xl uppercase tracking-wider text-ink group-hover:text-accent transition-colors duration-300">
                      {night.title}
                    </h2>
                  </div>

                  <p className="font-body text-xs md:text-sm text-ink-dim leading-relaxed max-w-xl">
                    {night.desc}
                  </p>
                </div>

                {/* Micro Metadata Info Strip */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-line/20 pt-6">
                  <div className="flex items-center space-x-2 text-xs font-body text-ink-faint">
                    <Clock size={14} className="text-accent/60" />
                    <span>{night.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs font-body text-ink-faint">
                    <Compass size={14} className="text-accent/60" />
                    <span>{night.vibe}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs font-body text-ink-faint">
                    <DollarSign size={14} className="text-accent/60" />
                    <span>{night.cover}</span>
                  </div>
                </div>

                {/* Interactive Expand Hover Layer Element */}
                <div className="flex items-center justify-between pt-4 border-t border-line/10">
                  <span className="font-display font-bold text-[10px] tracking-[0.2em] text-ink-faint group-hover:text-accent transition-colors">
                    [ DOOR POLICY & Smart Casual ATTIRE ENFORCED ]
                  </span>
                  <Link href="/reserve" className="group/btn inline-flex items-center space-x-1.5 text-xs text-ink hover:text-accent font-body font-bold uppercase tracking-wider">
                    <span>Secure Table</span>
                    <ArrowUpRight size={14} className="transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>

              </div>
            </div>
          </Reveal>
        ))}
      </section>

      {/* ADDITIONAL ACCENTS BLOCK */}
      <section className="bg-charcoal border-y border-line py-20 px-6 mt-24 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <span className="font-display font-bold text-xs uppercase tracking-[0.25em] text-accent">
            Special Occasions & Festivals
          </span>
          <h2 className="font-display font-extrabold text-3xl uppercase tracking-wider text-ink">
            Upcoming Showcases
          </h2>
          <p className="font-body text-xs md:text-sm text-ink-dim leading-relaxed">
            Beyond our weekly chapters, we host international modular synthesis curators, global electronic record label takeovers, and intimate vinyl showcases. Check back periodically as special bookings arrive under the Sovereign catalog.
          </p>
        </div>
      </section>
    </div>
  );
}
