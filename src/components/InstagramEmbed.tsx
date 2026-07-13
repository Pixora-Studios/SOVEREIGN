"use client";

import React from "react";
import { siteConfig } from "@/config/site";

interface InstagramEmbedProps {
  url?: string;
}

export default function InstagramEmbed({ url = "" }: InstagramEmbedProps) {
  return (
    <div className="relative group w-full aspect-square bg-void border border-line flex flex-col justify-center items-center p-6 hover:border-accent/40 transition-all duration-500 overflow-hidden">
      {/* Background radial soft light glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,255,61,0.02)_0%,rgba(0,0,0,0)_80%)] group-hover:bg-[radial-gradient(circle_at_center,rgba(201,255,61,0.04)_0%,rgba(0,0,0,0)_80%)] transition-all duration-500" />

      {/* Visual wire frame style design */}
      <div className="absolute top-4 left-4 right-4 bottom-4 border border-line/30 group-hover:border-accent/10 transition-colors duration-500 pointer-events-none" />

      <div className="text-center space-y-4 z-10">
        <span className="font-display font-bold text-xs uppercase tracking-[0.25em] text-accent block">
          {siteConfig.instagramPlaceholder.tag}
        </span>
        <h3 className="font-display font-extrabold text-lg uppercase tracking-wider text-ink">
          {siteConfig.instagramPlaceholder.message}
        </h3>
        {url && (
          <span className="hidden">{url}</span>
        )}
        <p className="font-body text-[11px] text-ink-faint max-w-[200px] mx-auto leading-relaxed">
          Embed content arrives once live accounts are wired up by the developers.
        </p>
      </div>

      <div className="absolute bottom-6 right-6 opacity-40 group-hover:opacity-100 group-hover:text-accent transition-all duration-300">
        <span className="font-display font-bold text-[10px] tracking-widest uppercase">
          [ COMING SOON ]
        </span>
      </div>
    </div>
  );
}
