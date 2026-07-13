"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu as MenuIcon, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "./Magnetic";
import { siteConfig } from "@/config/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/menu", label: "Menu" },
  { href: "/nights", label: "Nights" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reserve", label: "Reserve" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Disable scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  // Close mobile menu on path changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 bg-gradient-to-b from-void/90 via-void/50 to-transparent border-b border-line/10 backdrop-blur-md transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 md:h-24 flex items-center justify-between">
          {/* Logo / Brand Wordmark */}
          <Link href="/" className="group flex items-center space-x-1.5 focus:outline-none">
            <span className="font-display font-extrabold text-xl tracking-[0.25em] text-ink group-hover:text-accent transition-colors duration-300">
              {siteConfig.name}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative group py-2 focus:outline-none"
                >
                  <span className={`font-body font-medium text-sm tracking-wider uppercase transition-colors duration-300 ${
                    isActive ? "text-accent" : "text-ink-dim hover:text-ink"
                  }`}>
                    {link.label}
                  </span>
                  <span className={`absolute bottom-0 left-0 h-[1px] bg-accent transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </Link>
              );
            })}
          </nav>

          {/* CTA & Mobile Burger */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:block">
              <Magnetic>
                <Link
                  href="/reserve"
                  className="group flex items-center space-x-2 bg-accent hover:bg-accent-dim text-void font-body font-bold text-xs uppercase tracking-[0.2em] px-6 py-3 rounded-none transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(201,255,61,0.2)]"
                >
                  <span>Reserve Table</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </Link>
              </Magnetic>
            </div>

            {/* Burger Icon */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-ink-dim hover:text-accent focus:outline-none transition-colors duration-300"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 w-full h-full bg-void z-30 flex flex-col justify-between p-8 md:hidden"
          >
            {/* Nav Background Accents */}
            <div className="absolute top-[30vh] left-[10vw] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(201,255,61,0.03)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

            <div className="flex justify-end pt-12">
              {/* Spacer for offset alignment */}
            </div>

            {/* Menu Links */}
            <nav className="flex flex-col space-y-4 pt-10">
              {links.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={link.href}
                      className="group inline-flex items-center space-x-4"
                    >
                      <span className="font-display font-bold text-3xl tracking-widest uppercase text-ink-faint group-hover:text-accent transition-colors duration-300">
                        0{idx + 1}
                      </span>
                      <span className={`font-display font-extrabold text-4xl tracking-wider uppercase transition-colors duration-300 ${
                        isActive ? "text-accent" : "text-ink hover:text-accent"
                      }`}>
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Contact Details & Socials at bottom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="border-t border-line/30 pt-6 flex flex-col space-y-4"
            >
              <div className="flex justify-between items-center text-xs tracking-widest text-ink-dim uppercase">
                <span>{siteConfig.location.name}</span>
                <a href={siteConfig.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors duration-300">
                  Instagram
                </a>
              </div>
              <Link
                href="/reserve"
                className="w-full text-center bg-accent text-void font-body font-bold text-sm uppercase tracking-[0.2em] py-4"
              >
                Book A Table
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
