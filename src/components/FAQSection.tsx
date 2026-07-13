import React from "react";
import { siteConfig } from "@/config/site";

export default function FAQSection() {
  return (
    <section className="bg-charcoal border-y border-line py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <span className="font-display font-bold text-xs uppercase tracking-[0.25em] text-accent">
            Discretion & Entry
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl uppercase tracking-wider text-ink">
            Frequently Answered Concerns
          </h2>
          <p className="font-body text-sm text-ink-dim max-w-lg mx-auto">
            Transparent expectations for those seeking our sanctuary in Patia, Bhubaneswar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          {siteConfig.aeoFaqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-void/50 border border-line/40 p-6 flex flex-col justify-between hover:border-accent/30 transition-all duration-300"
            >
              <div className="space-y-3">
                <h3 className="font-display font-extrabold text-lg text-ink tracking-wide">
                  {faq.q}
                </h3>
                <p className="font-body text-xs md:text-sm text-ink-dim leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
