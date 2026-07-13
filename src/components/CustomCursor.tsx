"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    // Only mount and run for desktop / pointer:fine devices
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsFinePointer(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsFinePointer(e.matches);
    };
    mediaQuery.addEventListener("change", handleMediaChange);

    if (!mediaQuery.matches) {
      return () => {
        mediaQuery.removeEventListener("change", handleMediaChange);
      };
    }

    const mouse = { x: 0, y: 0 };
    const spotlightPos = { x: 0, y: 0 };
    const trailPos = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let rafId: number;

    const tick = () => {
      // Spotlight lerp (faster follow)
      spotlightPos.x += (mouse.x - spotlightPos.x) * 0.15;
      spotlightPos.y += (mouse.y - spotlightPos.y) * 0.15;

      // Trail dot lerp (slower follow)
      trailPos.x += (mouse.x - trailPos.x) * 0.1;
      trailPos.y += (mouse.y - trailPos.y) * 0.1;

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${spotlightPos.x}px, ${spotlightPos.y}px, 0)`;
      }

      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${trailPos.x}px, ${trailPos.y}px, 0)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  if (!isFinePointer) return null;

  return (
    <>
      {/* Soft spotlight radial glow following mouse */}
      <div
        ref={spotlightRef}
        className="fixed top-0 left-0 w-[40vw] h-[40vw] -mt-[20vw] -ml-[20vw] bg-[radial-gradient(circle,rgba(201,255,61,0.06)_0%,rgba(0,0,0,0)_70%)] pointer-events-none z-30"
        style={{ willChange: "transform" }}
      />
      {/* Barely-there lag cursor dot */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 -mt-1.25 -ml-1.25 rounded-full bg-accent pointer-events-none z-50 opacity-60 mix-blend-difference"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
