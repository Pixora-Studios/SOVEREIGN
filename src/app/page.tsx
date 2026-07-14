"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/config/site";
import { menuItems } from "@/content/menu";
import SplitTextReveal from "@/components/SplitTextReveal";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import InstagramEmbed from "@/components/InstagramEmbed";
import FAQSection from "@/components/FAQSection";
import SplitType from "split-type";

export default function Home() {
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const nightsSectionRef = useRef<HTMLDivElement>(null);
  const nightsContentRef = useRef<HTMLDivElement>(null);

  // Refs for load choreography
  const heroRef = useRef<HTMLElement>(null);
  const grainRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const bgImageContainerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const wordmarkRef = useRef<HTMLHeadingElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const ctaContainerRef = useRef<HTMLDivElement>(null);
  const statusChipRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  // State for live open status
  const [liveStatusText, setLiveStatusText] = useState("Opens Thursday at 7 PM");

  useEffect(() => {
    // ----------------------------------------------------
    // Determine live status based on site hours config
    // ----------------------------------------------------
    const updateLiveStatus = () => {
      const now = new Date();
      // Adjust to Bhubaneswar time (IST: UTC + 5:30)
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const istTime = new Date(utc + 3600000 * 5.5);
      const day = istTime.getDay(); // 0 = Sun, 1 = Mon, ... 6 = Sat
      const hours = istTime.getHours();

      // siteConfig hours map to Days. Thursday=4, Friday=5, Saturday=6, Sunday=0
      // Closed on Mon (1), Tue (2), Wed (3).
      if (day === 4) { // Thursday
        if (hours >= 19 || hours < 1) {
          setLiveStatusText("Open Tonight · 7 PM – 1 AM");
        } else {
          setLiveStatusText("Opens Tonight at 7 PM");
        }
      } else if (day === 5) { // Friday
        if (hours >= 19 || (hours === 0 || (hours === 1 && istTime.getMinutes() < 30))) {
          setLiveStatusText("Open Tonight · 7 PM – 1:30 AM");
        } else {
          setLiveStatusText("Opens Tonight at 7 PM");
        }
      } else if (day === 6) { // Saturday
        if (hours >= 19 || hours < 2) {
          setLiveStatusText("Open Tonight · 7 PM – 2 AM");
        } else {
          setLiveStatusText("Opens Tonight at 7 PM");
        }
      } else if (day === 0) { // Sunday
        if (hours >= 17) {
          setLiveStatusText("Open Tonight · 5 PM – 12 AM");
        } else {
          setLiveStatusText("Opens Tonight at 5 PM");
        }
      } else {
        // Closed days: Mon, Tue, Wed
        setLiveStatusText("Opens Thursday at 7 PM");
      }
    };

    updateLiveStatus();
    const statusInterval = setInterval(updateLiveStatus, 60000);

    return () => clearInterval(statusInterval);
  }, []);

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let splitWordmark: SplitType | null = null;
    let triggerInstance: ScrollTrigger | null = null;
    let nightsTrigger: ScrollTrigger | null = null;

    // ----------------------------------------------------
    // 1. HERO LOAD CHOREOGRAPHY & SCROLL TRIGGER ANIMATIONS
    // ----------------------------------------------------
    if (!prefersReduced) {
      // Revert any split text first
      if (wordmarkRef.current) {
        splitWordmark = new SplitType(wordmarkRef.current, {
          types: "chars",
          tagName: "span",
        });
      }

      // Initial state settings
      gsap.set([grainRef.current, vignetteRef.current], { opacity: 0 });
      gsap.set(bgImageContainerRef.current, { scale: 1 });
      gsap.set(eyebrowRef.current, { opacity: 0, filter: "blur(12px)", y: -10 });
      if (splitWordmark && splitWordmark.chars) {
        gsap.set(splitWordmark.chars, { y: "120%", opacity: 0, filter: "blur(8px)" });
      }
      gsap.set(quoteRef.current, { opacity: 0, x: -30 });
      gsap.set(ctaContainerRef.current, { opacity: 0, scale: 0.8 });
      gsap.set(statusChipRef.current, { opacity: 0, x: -20 });
      gsap.set(scrollCueRef.current, { opacity: 0, y: 30 });

      const tl = gsap.timeline();

      // 0.0s — Grain + vignette layers fade in
      tl.to([grainRef.current, vignetteRef.current], {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
      }, 0.0);

      // 0.2s — Background image Ken Burns begins (represented by slow continuous drift)
      tl.to(bgImageContainerRef.current, {
        scale: 1.08,
        duration: 30,
        ease: "none",
        repeat: -1,
        yoyo: true,
      }, 0.2);

      // 0.4s — Eyebrow blurs in
      tl.to(eyebrowRef.current, {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      }, 0.4);

      // 0.7s — Wordmark character-reveal begins, staggered
      if (splitWordmark && splitWordmark.chars) {
        tl.to(splitWordmark.chars, {
          y: "0%",
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.0,
          stagger: 0.04,
          ease: "power4.out",
        }, 0.7);
      }

      // 1.3s — Quote + accent line fade/slide in
      tl.to(quoteRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out",
      }, 1.3);

      // 1.5s — CTA button scales in with slight overshoot (spring easing)
      tl.to(ctaContainerRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.0,
        ease: "back.out(1.7)",
      }, 1.5);

      // 1.7s — Live-status chip fades in
      tl.to(statusChipRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out",
      }, 1.7);

      // 1.9s — Scroll cue fades in last
      tl.to(scrollCueRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: "power2.out",
      }, 1.9);

      // Scrubbed opacity fade-out for Scroll Cue group over first 150px of scroll
      if (heroRef.current && scrollCueRef.current) {
        ScrollTrigger.create({
          trigger: heroRef.current,
          start: "top top",
          end: "+=150",
          scrub: true,
          animation: gsap.to(scrollCueRef.current, {
            opacity: 0,
            y: -20,
            ease: "none",
          }),
        });
      }
    } else {
      // Fallback for reduced motion / mobile opacity handling
      gsap.set([grainRef.current, vignetteRef.current, eyebrowRef.current, wordmarkRef.current, quoteRef.current, ctaContainerRef.current, statusChipRef.current, scrollCueRef.current], {
        opacity: 1,
      });
    }

    // ----------------------------------------------------
    // 2. GSAP PINNED HORIZONTAL SCROLL (Desktop Only)
    // ----------------------------------------------------
    if (!isMobile && !prefersReduced && horizontalSectionRef.current && horizontalScrollRef.current) {
      const scrollEl = horizontalScrollRef.current;
      const sections = scrollEl.querySelectorAll(".horizontal-panel");
      const amountToScroll = scrollEl.scrollWidth - window.innerWidth;

      triggerInstance = ScrollTrigger.create({
        trigger: horizontalSectionRef.current,
        pin: true,
        start: "top top",
        end: () => `+=${scrollEl.scrollWidth}`,
        scrub: 1,
        animation: gsap.to(scrollEl, {
          x: -amountToScroll,
          ease: "none",
        }),
        invalidateOnRefresh: true,
      });

      // Stagger zoom animation for the images as we scroll
      sections.forEach((section) => {
        const img = section.querySelector(".zoom-target");
        if (img && triggerInstance) {
          gsap.fromTo(img,
            { scale: 1.15 },
            {
              scale: 1,
              scrollTrigger: {
                trigger: section,
                containerAnimation: triggerInstance.animation,
                start: "left right",
                end: "right left",
                scrub: true,
              }
            }
          );
        }
      });
    }

    // ----------------------------------------------------
    // 3. GSAP NIGHTS PINNED CROSSFADE (Desktop Only)
    // ----------------------------------------------------
    if (!isMobile && !prefersReduced && nightsSectionRef.current && nightsContentRef.current) {
      const slides = nightsContentRef.current.querySelectorAll(".night-slide");

      // Initially, hide all slide images except first
      gsap.set(slides, { opacity: 0 });
      gsap.set(slides[0], { opacity: 1 });

      nightsTrigger = ScrollTrigger.create({
        trigger: nightsSectionRef.current,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          let activeIndex = 0;
          if (progress < 0.25) activeIndex = 0;
          else if (progress < 0.5) activeIndex = 1;
          else if (progress < 0.75) activeIndex = 2;
          else activeIndex = 3;

          slides.forEach((slide, idx) => {
            gsap.to(slide, {
              opacity: idx === activeIndex ? 1 : 0,
              duration: 0.4,
              overwrite: "auto",
            });
          });
        }
      });
    }

    return () => {
      if (triggerInstance) triggerInstance.kill();
      if (nightsTrigger) nightsTrigger.kill();
      if (splitWordmark) splitWordmark.revert();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  // Filter 4 Signature Menu items for the Teaser section
  const signatureItems = menuItems.filter(item => item.signature).slice(0, 4);

  return (
    <div className="relative w-full">
      {/* 1. HERO SECTION (Asymmetric Composition Redesign) */}
      <section
        ref={heroRef}
        className="relative h-[95vh] md:h-screen flex flex-col justify-center px-6 md:px-16 overflow-hidden bg-void"
      >
        {/* BACKGROUND LAYERS */}
        {/* Layer 1: Background image with slow Ken Burns drift container */}
        <div ref={bgImageContainerRef} className="absolute inset-0 z-0 origin-center">
          <Image
            src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=1600"
            alt={`${siteConfig.name} Ambience`}
            fill
            priority
            className="object-cover opacity-35 select-none pointer-events-none"
          />
        </div>

        {/* Layer 1.5: Graded overlay blending #1C160E at center-bottom with --void edges */}
        <div className="absolute inset-0 z-1 bg-[radial-gradient(circle_at_bottom_center,rgba(28,22,14,0.25)_0%,rgba(10,10,11,0.95)_80%)] pointer-events-none" />

        {/* Layer 2: Film grain overlay (using a high-fidelity SVG turbulence filter to prevent 404 and maintain crisp grain) */}
        <div
          ref={grainRef}
          className="absolute inset-0 z-2 pointer-events-none opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />

        {/* Layer 3: Vignette (radial-gradient darkening four corners) */}
        <div
          ref={vignetteRef}
          className="absolute inset-0 z-3 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_40%,rgba(10,10,11,0.9)_100%)]"
        />

        {/* Layer 4: Content layer (asymmetric layout) */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col justify-center h-full">
          {/* Eyebrow - shifted off-center horizontally */}
          <div className="w-full flex justify-center md:justify-start md:pl-[15%] mb-4">
            <span
              ref={eyebrowRef}
              className="block font-display font-bold text-xs md:text-sm tracking-[0.3em] text-accent uppercase select-none"
            >
              {siteConfig.tagline}
            </span>
          </div>

          {/* Sovereign Wordmark - Kept large and centered as the anchor */}
          <div className="w-full text-center overflow-hidden py-1 mb-8">
            <h1
              ref={wordmarkRef}
              className="font-display font-extrabold fluid-hero uppercase tracking-[0.18em] leading-none text-ink mx-auto select-none"
            >
              {siteConfig.name}
            </h1>
          </div>

          {/* Lower Content Group: Asymmetric placement (offset quote + button) */}
          <div className="w-full flex flex-col md:flex-row justify-center md:justify-start md:pl-[12%] items-start gap-8">
            <div className="flex flex-col space-y-8 items-start max-w-xl">
              {/* Pull-quote treatment: offset quote with a thin vertical accent line */}
              <div
                ref={quoteRef}
                className="flex items-stretch space-x-4 pl-1.5 md:pl-2"
              >
                <div className="w-[1px] bg-accent/60 self-stretch flex-shrink-0" />
                <p className="font-body text-xs md:text-sm text-ink-dim tracking-widest uppercase font-medium leading-relaxed">
                  &ldquo;{siteConfig.hero.subhead}&rdquo;
                </p>
              </div>

              {/* Single Hero CTA - Magnetic Button with Spring overshoot */}
              <div ref={ctaContainerRef} className="pt-4 pl-1.5 md:pl-2">
                <Magnetic>
                  <Link
                    href="/reserve"
                    className="group flex items-center space-x-4 bg-accent text-void font-body font-bold text-xs uppercase tracking-[0.25em] px-8 py-4.5 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_4px_30px_rgba(201,255,61,0.25)]"
                  >
                    <span>Descend Into SOVEREIGN</span>
                    <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </Link>
                </Magnetic>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Live-Status Chip in the bottom-left */}
        <div
          ref={statusChipRef}
          className="absolute bottom-8 left-6 md:left-16 z-10 flex items-center space-x-3 bg-charcoal/80 backdrop-blur-md border border-line/50 px-4 py-2"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          <span className="font-display font-bold text-[9px] md:text-xs tracking-widest text-ink uppercase">
            {liveStatusText}
          </span>
        </div>

        {/* Scroll down indicator line ("DESCEND") - scrubbed out over scroll */}
        <div
          ref={scrollCueRef}
          className="absolute bottom-8 right-6 md:right-16 flex flex-col items-center space-y-2 z-10 pointer-events-none select-none opacity-60"
        >
          <span className="font-display font-bold text-[9px] tracking-[0.25em] text-ink-dim uppercase">
            DESCEND
          </span>
          <div className="w-[1px] h-12 bg-line relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-accent animate-[bounce_2s_infinite]" />
          </div>
        </div>
      </section>

      {/* 2. MANIFESTO STRIP */}
      <section className="bg-void py-32 px-6 border-y border-line/30 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <span className="font-display font-bold text-xs uppercase tracking-[0.25em] text-ink-faint">
            Manifesto
          </span>
          <SplitTextReveal
            text="SOVEREIGN states things plainly. No try-hard flash, no tacky neon. A masterfully dark sanctuary forged for Bhubaneswar's modern vanguard."
            className="font-display font-extrabold text-2xl md:text-4xl text-ink uppercase tracking-wide leading-relaxed"
          />
        </div>
      </section>

      {/* 3. SIGNATURE MOMENTS GALLERY (GSAP Pinned Horizontal Scroll on Desktop) */}
      <section
        ref={horizontalSectionRef}
        className="relative bg-charcoal overflow-hidden md:h-screen flex flex-col justify-center"
      >
        <div className="p-6 md:p-12 md:absolute md:top-12 md:left-12 z-20 space-y-2">
          <span className="font-display font-bold text-xs uppercase tracking-[0.25em] text-accent">
            Curated Spaces
          </span>
          <h2 className="font-display font-extrabold text-2xl md:text-3xl uppercase tracking-wider text-ink">
            Signature Enclaves
          </h2>
        </div>

        {/* Horizontal scroll path */}
        <div
          ref={horizontalScrollRef}
          className="flex flex-col md:flex-row gap-6 p-6 md:p-0 md:pl-[30vw] md:h-[60vh] items-stretch md:items-center overflow-x-auto md:overflow-x-visible md:scrollbar-none"
        >
          {[
            {
              title: "The Sound Room",
              desc: "Acoustically soundproofed walls carrying warm low-end frequencies.",
              img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800",
            },
            {
              title: "The Alchemist's Bar",
              desc: "Where slow-infused spirits meet native forest botanicals.",
              img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800",
            },
            {
              title: "The Velvet Salon",
              desc: "Deep, leather-clad retreats prioritizing ultimate discretion.",
              img: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=800",
            },
            {
              title: "The DJ Chancel",
              desc: "Precision layout centering pure acoustic fidelity above all.",
              img: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=800",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="horizontal-panel flex-shrink-0 w-full md:w-[400px] bg-void border border-line/40 p-4 space-y-4 hover:border-accent/40 transition-all duration-500"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover zoom-target transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-extrabold text-sm uppercase tracking-wider text-ink">
                  {item.title}
                </h3>
                <p className="font-body text-xs text-ink-dim leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. THE NIGHTS TEASER (Pinned crossfades on Desktop) */}
      <section
        ref={nightsSectionRef}
        className="relative bg-void h-screen md:flex items-stretch overflow-hidden hidden"
      >
        {/* Left Side Static Content Column */}
        <div className="w-1/2 flex flex-col justify-center p-16 space-y-8 z-20 bg-void/90 border-r border-line">
          <div className="space-y-2">
            <span className="font-display font-bold text-xs uppercase tracking-[0.25em] text-accent">
              Weekly Chronicles
            </span>
            <h2 className="font-display font-extrabold text-4xl uppercase tracking-wider text-ink leading-tight">
              A Ritual for Every Night
            </h2>
            <p className="font-body text-sm text-ink-dim max-w-sm leading-relaxed">
              SOVEREIGN commands distinct weekly rituals. Watch the room morph and crossfade as the weekend reaches peak alignment.
            </p>
          </div>

          <div className="space-y-4">
            {siteConfig.nights.map((night, idx) => (
              <div key={idx} className="flex items-center space-x-4 border-b border-line pb-4 last:border-0">
                <span className="font-display font-bold text-sm tracking-widest text-accent uppercase w-12">
                  {night.day}
                </span>
                <div>
                  <h3 className="font-display font-extrabold text-base text-ink uppercase tracking-wide">
                    {night.title}
                  </h3>
                  <p className="font-body text-[11px] text-ink-faint">
                    {night.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <Magnetic>
              <Link
                href="/nights"
                className="group flex items-center space-x-2 border border-accent hover:bg-accent text-accent hover:text-void font-body font-bold text-xs uppercase tracking-[0.25em] px-6 py-3 transition-all duration-300"
              >
                <span>View Complete Schedule</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </Link>
            </Magnetic>
          </div>
        </div>

        {/* Right Side Visual Crossfading Panels */}
        <div ref={nightsContentRef} className="w-1/2 relative h-full bg-charcoal">
          {siteConfig.nights.map((night, idx) => (
            <div
              key={idx}
              className="night-slide absolute inset-0 w-full h-full flex flex-col justify-end p-12 bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(to top, rgba(10,10,11,0.95) 0%, rgba(10,10,11,0.2) 60%, rgba(10,10,11,0.8) 100%), url(${night.image})`,
              }}
            >
              <div className="space-y-2 z-10 max-w-md">
                <span className="font-display font-bold text-xs uppercase tracking-widest text-accent">
                  {night.vibe}
                </span>
                <h3 className="font-display font-extrabold text-2xl uppercase tracking-wider text-ink">
                  {night.title}
                </h3>
                <p className="font-body text-xs text-ink-dim leading-relaxed">
                  {night.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mobile-only fallback list for Nights */}
      <section className="bg-void border-t border-line/40 py-16 px-6 md:hidden space-y-8">
        <div className="space-y-2">
          <span className="font-display font-bold text-xs uppercase tracking-[0.25em] text-accent">
            Weekly Chronicles
          </span>
          <h2 className="font-display font-extrabold text-2xl uppercase tracking-wider text-ink">
            A Ritual for Every Night
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {siteConfig.nights.map((night, idx) => (
            <div key={idx} className="bg-charcoal border border-line p-5 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-display font-bold text-xs uppercase tracking-widest text-accent">
                  {night.day} &bull; {night.vibe}
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-extrabold text-lg uppercase tracking-wide text-ink">
                  {night.title}
                </h3>
                <p className="font-body text-xs text-ink-dim leading-relaxed">
                  {night.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. MENU TEASER */}
      <section className="bg-charcoal border-y border-line py-24 px-6 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-12 mb-16">
          <div className="space-y-2 max-w-lg">
            <span className="font-display font-bold text-xs uppercase tracking-[0.25em] text-accent">
              Liquid Craft
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl uppercase tracking-wider text-ink leading-tight">
              Calibrated Alcohols & Smoked Accents
            </h2>
            <p className="font-body text-sm text-ink-dim leading-relaxed">
              Previews of our high-caliber mixology. Freshly infused key leaf, double-distilled spirits, and custom charcoal-infused sours.
            </p>
          </div>

          <div>
            <Magnetic>
              <Link
                href="/menu"
                className="group flex items-center space-x-2 bg-accent text-void font-body font-bold text-xs uppercase tracking-[0.25em] px-6 py-4 rounded-none transition-all duration-300"
              >
                <span>Explore Full Menu</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </Link>
            </Magnetic>
          </div>
        </div>

        {/* Teaser items grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          {signatureItems.map((item, idx) => (
            <Reveal key={item.id} delay={idx * 0.1}>
              <div className="group bg-void border border-line/40 p-4 space-y-4 hover:border-accent/30 transition-all duration-500 flex flex-col h-full justify-between">
                <div className="space-y-4">
                  {/* Clip-curtain reveal on image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-2 right-2 bg-void/80 border border-line px-2 py-0.5 text-[8px] uppercase tracking-wider text-accent">
                      {item.dietary}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-display font-extrabold text-sm uppercase tracking-wide text-ink group-hover:text-accent transition-colors">
                        {item.name}
                      </h3>
                      <span className="font-body text-xs text-accent font-bold">
                        ₹{item.price}
                      </span>
                    </div>
                    <p className="font-body text-xs text-ink-dim leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="border-t border-line/20 pt-3 flex items-center justify-between text-[10px] uppercase tracking-widest text-ink-faint">
                  <span>SOVEREIGN SIGNATURE</span>
                  <span>[0{idx + 1}]</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 6. INSTAGRAM STRIP */}
      <section className="bg-void py-24 px-6 border-b border-line">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="font-display font-bold text-xs uppercase tracking-[0.25em] text-accent">
              Social Pulse
            </span>
            <h2 className="font-display font-extrabold text-3xl uppercase tracking-wider text-ink">
              Captured At Sovereign
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <InstagramEmbed url="" />
            <InstagramEmbed url="" />
            <InstagramEmbed url="" />
            <InstagramEmbed url="" />
          </div>
        </div>
      </section>

      {/* 7. FAQ SECTION & AEO BLOCKS */}
      <FAQSection />

      {/* 8. RESERVATION CTA BAND */}
      <section className="bg-void py-32 px-6 relative overflow-hidden">
        {/* Soft green accent flare background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(201,255,61,0.03)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
          <span className="font-display font-bold text-xs uppercase tracking-[0.25em] text-accent">
            Table Reservations
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl uppercase tracking-wider text-ink leading-tight">
            Tables don&apos;t wait long.<br />Neither should you.
          </h2>
          <p className="font-body text-sm md:text-base text-ink-dim max-w-md mx-auto leading-relaxed">
            Ensure your placement under the acoustic arches. Let our gatekeepers coordinate your absolute discretion.
          </p>
          <div className="pt-4">
            <Magnetic>
              <Link
                href="/reserve"
                className="group inline-flex items-center space-x-3 bg-accent text-void font-body font-bold text-xs uppercase tracking-[0.25em] px-10 py-5 hover:bg-accent-dim transition-all duration-300 shadow-[0_4px_30px_rgba(201,255,61,0.1)] hover:shadow-[0_4px_40px_rgba(201,255,61,0.3)]"
              >
                <span>Initiate Reservation</span>
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>
    </div>
  );
}
