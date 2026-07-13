import React from "react";
import Link from "next/link";
import { ArrowUpRight, Instagram, Phone, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-charcoal border-t border-line/40 pt-16 pb-8 overflow-hidden">
      {/* Background radial soft light glow */}
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(201,255,61,0.03)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Logo, tagline, and details */}
          <div className="md:col-span-2 space-y-6">
            <Link href="/" className="font-display font-extrabold text-2xl tracking-[0.25em] text-ink hover:text-accent transition-colors duration-300">
              {siteConfig.name}
            </Link>
            <p className="font-body text-ink-dim max-w-sm text-sm leading-relaxed">
              {siteConfig.hero.desc}
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-none bg-void hover:bg-accent border border-line flex items-center justify-center text-ink-dim hover:text-void transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href={`tel:${siteConfig.socials.phone}`}
                className="w-10 h-10 rounded-none bg-void hover:bg-accent border border-line flex items-center justify-center text-ink-dim hover:text-void transition-all duration-300"
                aria-label="Phone"
              >
                <Phone size={18} />
              </a>
              <a
                href={`mailto:${siteConfig.socials.email}`}
                className="w-10 h-10 rounded-none bg-void hover:bg-accent border border-line flex items-center justify-center text-ink-dim hover:text-void transition-all duration-300"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-[0.2em] text-ink">
              Navigation
            </h4>
            <ul className="space-y-2 font-body text-sm">
              {[
                { href: "/about", label: "Our Story" },
                { href: "/menu", label: "Food & Drinks" },
                { href: "/nights", label: "Lineup" },
                { href: "/gallery", label: "Gallery" },
                { href: "/reserve", label: "Reservations" },
                { href: "/contact", label: "Find Us" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-ink-dim hover:text-accent transition-colors duration-300 flex items-center space-x-1 group">
                    <span>{item.label}</span>
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-1 group-hover:translate-x-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours & Schedule */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-[0.2em] text-ink">
              Weekly Nights
            </h4>
            <div className="space-y-3">
              {siteConfig.hours.map((hour, idx) => (
                <div key={idx} className="flex justify-between items-start text-xs border-b border-line/20 pb-2">
                  <div className="font-body text-ink-dim">
                    <span className="font-bold text-ink mr-2">{hour.days}</span>
                    <span>{hour.event}</span>
                  </div>
                  <div className="font-body text-ink-faint text-right">{hour.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="border-t border-line/40 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs font-body text-ink-faint uppercase tracking-wider">
          <div className="flex flex-col md:flex-row items-center md:space-x-4">
            <span>&copy; {currentYear} {siteConfig.name}</span>
            <span className="hidden md:inline">|</span>
            <span>Crafted by Pixora Studios</span>
          </div>
          <div className="flex space-x-6">
            <Link href="/reserve" className="hover:text-accent transition-colors">
              Terms of Entry
            </Link>
            <span>&bull;</span>
            <Link href="/contact" className="hover:text-accent transition-colors">
              Discretion Policy
            </Link>
          </div>
        </div>

        {/* Giant wordmark with subtle gradient-text animation at the very bottom */}
        <div className="mt-12 text-center select-none pointer-events-none opacity-[0.02]">
          <span className="font-display font-extrabold text-[8vw] tracking-[0.3em] uppercase leading-none bg-clip-text text-transparent bg-gradient-to-r from-ink via-accent to-ink bg-[length:200%_auto] animate-[pulse_10s_ease-in-out_infinite]">
            {siteConfig.name}
          </span>
        </div>
      </div>
    </footer>
  );
}
