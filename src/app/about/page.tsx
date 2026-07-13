"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/config/site";
import Magnetic from "@/components/Magnetic";
import Reveal from "@/components/Reveal";

export default function AboutPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let pinTrigger: ScrollTrigger | null = null;

    if (!isMobile && !prefersReduced && scrollContainerRef.current) {
      const panels = scrollContainerRef.current.querySelectorAll(".story-panel");

      // Pin the storytelling section and crossfade story stages
      pinTrigger = ScrollTrigger.create({
        trigger: scrollContainerRef.current,
        start: "top top",
        end: `+=${panels.length * 100}%`,
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          const activeIndex = Math.min(
            Math.floor(progress * panels.length),
            panels.length - 1
          );

          panels.forEach((panel, idx) => {
            gsap.to(panel, {
              opacity: idx === activeIndex ? 1 : 0,
              y: idx === activeIndex ? 0 : 20,
              duration: 0.4,
              overwrite: "auto",
            });
          });
        }
      });
    }

    return () => {
      if (pinTrigger) pinTrigger.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  const storyStages = [
    {
      title: "An Oasis of Darkness",
      subtitle: "The Genesis",
      desc: "SOVEREIGN was born out of a stark realization: Patia's nightlife deserved an uncompromised elevation. We parted ways with flashy neon and cluttered menus, turning our focus entirely to absolute architectural precision, dark acoustic luxury, and curated client isolation.",
      img: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=1200",
    },
    {
      title: "Colder, Darker, More Nocturnal",
      subtitle: "The Spatial Philosophy",
      desc: "Our design palette departs from the warm amber-heavy restaurants of the past. Utilizing cold concrete, charcoal tones, hairline borders, and targeted spotlight paths, we constructed a temple that prioritizes room to breathe and understated geometric beauty.",
      img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200",
    },
    {
      title: "For the Discerning Few",
      subtitle: "Our Community",
      desc: "We curate a space specifically calibrated for young entrepreneurs, professionals, and global travelers in Odisha who demand larger-city standards locally. Here, you are free to converse under soft bass, entirely insulated from external clamor.",
      img: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=1200",
    },
  ];

  return (
    <div className="relative w-full">
      {/* HEADER HERO */}
      <section className="relative h-[40vh] flex flex-col justify-center items-center px-6 bg-void border-b border-line/30">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="font-display font-bold text-xs uppercase tracking-[0.25em] text-accent">
            Our Identity
          </span>
          <h1 className="font-display font-extrabold text-4xl md:text-6xl uppercase tracking-wider text-ink">
            The Sovereign Standard
          </h1>
          <p className="font-body text-xs md:text-sm text-ink-dim uppercase tracking-widest max-w-md mx-auto">
            Sound. Craft. Discretion. Done with absolute restraint.
          </p>
        </div>
      </section>

      {/* PINNED STORYTELLING SECTION (Desktop only) */}
      <section
        ref={scrollContainerRef}
        className="relative bg-void h-screen hidden md:block overflow-hidden border-b border-line"
      >
        <div className="absolute inset-0 w-full h-full">
          {storyStages.map((stage, idx) => (
            <div
              key={idx}
              className="story-panel absolute inset-0 w-full h-full flex items-center justify-between px-20 gap-16 opacity-0"
              style={{
                pointerEvents: idx === 0 ? "auto" : "none",
              }}
            >
              {/* Left text panel */}
              <div className="w-1/2 space-y-6">
                <span className="font-display font-bold text-xs uppercase tracking-[0.25em] text-accent">
                  {stage.subtitle}
                </span>
                <h2 className="font-display font-extrabold text-3xl md:text-5xl uppercase tracking-wider text-ink leading-tight">
                  {stage.title}
                </h2>
                <p className="font-body text-sm md:text-base text-ink-dim leading-relaxed max-w-lg">
                  {stage.desc}
                </p>
              </div>

              {/* Right image panel */}
              <div className="w-1/2 relative aspect-[4/3] bg-charcoal border border-line/40 overflow-hidden">
                <Image
                  src={stage.img}
                  alt={stage.title}
                  fill
                  className="object-cover scale-105 animate-[pulse_30s_infinite]"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mobile-only Story list */}
      <section className="bg-void py-16 px-6 border-b border-line md:hidden space-y-16">
        {storyStages.map((stage, idx) => (
          <div key={idx} className="space-y-6">
            <div className="relative aspect-[4/3] w-full border border-line overflow-hidden">
              <Image
                src={stage.img}
                alt={stage.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-3">
              <span className="font-display font-bold text-xs uppercase tracking-[0.2em] text-accent">
                {stage.subtitle}
              </span>
              <h2 className="font-display font-extrabold text-2xl uppercase tracking-wider text-ink">
                {stage.title}
              </h2>
              <p className="font-body text-xs text-ink-dim leading-relaxed">
                {stage.desc}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* FOUNDERS & PHILOSOPHY BLOCK WITH 3D CSS TILT */}
      <section className="bg-charcoal py-24 px-6 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">

          {/* Asymmetric CSS 3D Tilt Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative group w-full max-w-md aspect-[4/5] border border-line overflow-hidden [perspective:1000px]">
              <div className="relative w-full h-full transition-transform duration-500 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(5deg)_rotateX(-5deg)]">
                <Image
                  src="https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&q=80&w=800"
                  alt="Founder Perspective"
                  fill
                  className="object-cover"
                />
                {/* Highlight glare overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          </div>

          {/* Philosophy details */}
          <div className="w-full md:w-1/2 space-y-8">
            <div className="space-y-2">
              <span className="font-display font-bold text-xs uppercase tracking-[0.25em] text-accent">
                The Architects
              </span>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl uppercase tracking-wider text-ink">
                Our Architectural Mind
              </h2>
            </div>

            <p className="font-body text-sm md:text-base text-ink-dim leading-relaxed">
              We look at nightlife through a structural, design-led lens. Sound frequencies are engineered first, cocktail balance is calibrated with strict ratios, and physical boundaries are established to preserve room, anonymity, and ultimate class.
            </p>

            <blockquote className="border-l-2 border-accent pl-6 py-2">
              <p className="font-display font-bold text-sm uppercase tracking-wide text-ink italic">
                &ldquo;A luxury space shouldn&apos;t try to capture your focus. It should clear the clutter so you can discover it yourself.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* THREE PILLARS BLOCK */}
      <section className="bg-void py-24 px-6 border-b border-line">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-2">
            <span className="font-display font-bold text-xs uppercase tracking-[0.25em] text-accent">
              Core Pillars
            </span>
            <h2 className="font-display font-extrabold text-3xl uppercase tracking-wider text-ink">
              Three Words. Uncompromisingly Met.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {siteConfig.pillars.map((pillar, idx) => (
              <Reveal key={idx} delay={idx * 0.15}>
                <div className="group bg-charcoal border border-line/40 p-8 space-y-4 hover:border-accent/40 transition-all duration-500 h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="font-display font-extrabold text-3xl text-ink-faint group-hover:text-accent transition-colors duration-300">
                      0{idx + 1}
                    </span>
                    <h3 className="font-display font-extrabold text-xl uppercase tracking-wider text-ink">
                      {pillar.title}
                    </h3>
                    <p className="font-body text-xs md:text-sm text-ink-dim leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="border-t border-line/20 pt-4 text-[10px] uppercase tracking-widest text-ink-faint">
                    [ SOVEREIGN PILOT ]
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL RESERVE BAND */}
      <section className="bg-charcoal py-24 px-6 text-center space-y-8">
        <h2 className="font-display font-extrabold text-3xl uppercase tracking-wider text-ink">
          Step Beyond The Veil
        </h2>
        <p className="font-body text-xs md:text-sm text-ink-dim max-w-md mx-auto leading-relaxed">
          The sound room awaits. Register your placement with our dispatch and experience nightlife designed for the discerning.
        </p>
        <div className="pt-2">
          <Magnetic>
            <Link
              href="/reserve"
              className="group inline-flex items-center space-x-3 bg-accent text-void font-body font-bold text-xs uppercase tracking-[0.25em] px-8 py-4 hover:bg-accent-dim transition-all duration-300"
            >
              <span>Initialize Booking</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>
          </Magnetic>
        </div>
      </section>
    </div>
  );
}
