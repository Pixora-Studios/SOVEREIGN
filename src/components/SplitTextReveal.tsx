"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";

interface SplitTextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}

export default function SplitTextReveal({
  text,
  className = "",
  as: Component = "h2",
}: SplitTextRevealProps) {
  const textRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    // Check for prefers-reduced-motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      gsap.set(el, { opacity: 1 });
      return;
    }

    // Split text into words (or characters for H1/brand names)
    const isMainTitle = Component === "h1";
    const split = new SplitType(el, {
      types: isMainTitle ? "chars,words" : "words",
      tagName: "span",
    });

    const targets = isMainTitle ? split.chars : split.words;

    gsap.set(targets, {
      y: "110%",
      opacity: 0,
    });

    const anim = gsap.to(targets, {
      y: "0%",
      opacity: 1,
      duration: 1.2,
      stagger: isMainTitle ? 0.05 : 0.03,
      ease: "power4.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      anim.kill();
      if (anim.scrollTrigger) {
        anim.scrollTrigger.kill();
      }
      split.revert();
    };
  }, [Component, text]);

  // Clean elements cast to React element render safely
  const elementRef = textRef as unknown as React.RefObject<HTMLParagraphElement>;

  return (
    <Component
      ref={elementRef}
      className={`inline-block overflow-hidden py-1 ${className}`}
      style={{ opacity: 1 }}
    >
      {text}
    </Component>
  );
}
