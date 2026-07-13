"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowUpRight, CheckCircle2, MapPin, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";
import Magnetic from "@/components/Magnetic";

const contactSchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  email: z.string().email("Please provide a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    // Artificial latency for premium feel
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Contact submission initiated:", data);

    // TODO: Wire to notification or backend servers later
    setIsSubmitted(true);
  };

  return (
    <div className="relative w-full pb-24">
      {/* HEADER SECTION */}
      <section className="relative bg-void py-16 border-b border-line/30 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="font-display font-bold text-xs uppercase tracking-[0.25em] text-accent">
            Find Us
          </span>
          <h1 className="font-display font-extrabold text-4xl md:text-6xl uppercase tracking-wider text-ink">
            Coordinates & Contact
          </h1>
          <p className="font-body text-xs md:text-sm text-ink-dim uppercase tracking-widest max-w-md mx-auto leading-relaxed">
            Locate our physical space or transmit general inquiries directly to our reception desks.
          </p>
        </div>
      </section>

      {/* SPLIT SECTION */}
      <section className="max-w-7xl mx-auto px-6 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* LEFT: INFO & STYLED GOOGLE MAP (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Styled Embedded Google Map */}
            <div className="relative aspect-[16/10] w-full border border-line bg-charcoal overflow-hidden group">
              <iframe
                title="Sovereign Patia Map Location"
                src={siteConfig.location.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(1) invert(0.9) contrast(1.2)" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Soft overlay borders/masks to match dark theme */}
              <div className="absolute inset-0 map-overlay pointer-events-none" />

              <div className="absolute bottom-4 left-4 bg-void/90 border border-line px-3 py-1.5 text-[9px] uppercase tracking-widest text-accent font-bold">
                LAT: {siteConfig.location.lat} &bull; LNG: {siteConfig.location.lng}
              </div>
            </div>

            {/* Quick Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Address */}
              <div className="bg-charcoal border border-line/40 p-6 space-y-2 flex flex-col justify-between">
                <div className="space-y-2">
                  <MapPin size={16} className="text-accent" />
                  <h4 className="font-display font-bold text-xs uppercase tracking-widest text-ink">
                    Physical Space
                  </h4>
                  <p className="font-body text-xs text-ink-dim leading-relaxed">
                    {siteConfig.location.address}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-charcoal border border-line/40 p-6 space-y-2 flex flex-col justify-between">
                <div className="space-y-2">
                  <Clock size={16} className="text-accent" />
                  <h4 className="font-display font-bold text-xs uppercase tracking-widest text-ink">
                    Weekly Hours
                  </h4>
                  <div className="space-y-1 font-body text-xs text-ink-dim">
                    {siteConfig.hours.map((h, i) => (
                      <div key={i} className="flex justify-between">
                        <span className="font-bold">{h.days}:</span>
                        <span>{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: CONTACT FORM (5 cols) */}
          <div className="lg:col-span-5 bg-charcoal border border-line/40 p-8 md:p-10 relative overflow-hidden">
            {/* Soft accent glow backdrop */}
            <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(201,255,61,0.02)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6 relative z-10"
                >
                  <h3 className="font-display font-extrabold text-lg uppercase tracking-wider text-ink border-b border-line pb-3">
                    Transmit Message
                  </h3>

                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="block font-display font-bold text-[10px] uppercase tracking-widest text-ink">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      {...register("fullName")}
                      placeholder="e.g. Aditya Verma"
                      className="w-full bg-void border border-line text-ink font-body text-xs uppercase tracking-widest px-4 py-3 focus:outline-none focus:border-accent/60 transition-colors"
                    />
                    {errors.fullName && (
                      <p className="text-[10px] text-nonveg font-bold tracking-wider uppercase">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="block font-display font-bold text-[10px] uppercase tracking-widest text-ink">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      placeholder="e.g. aditya@domain.com"
                      className="w-full bg-void border border-line text-ink font-body text-xs uppercase tracking-widest px-4 py-3 focus:outline-none focus:border-accent/60 transition-colors"
                    />
                    {errors.email && (
                      <p className="text-[10px] text-nonveg font-bold tracking-wider uppercase">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="block font-display font-bold text-[10px] uppercase tracking-widest text-ink">
                      Message *
                    </label>
                    <textarea
                      rows={4}
                      {...register("message")}
                      placeholder="Specify your inquiry details..."
                      className="w-full bg-void border border-line text-ink font-body text-xs uppercase tracking-widest px-4 py-3 focus:outline-none focus:border-accent/60 transition-colors resize-none"
                    />
                    {errors.message && (
                      <p className="text-[10px] text-nonveg font-bold tracking-wider uppercase">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <div className="pt-2">
                    <Magnetic>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group flex items-center space-x-3 bg-accent text-void font-body font-bold text-xs uppercase tracking-[0.25em] px-8 py-4 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span>{isSubmitting ? "Transmitting..." : "Send Message"}</span>
                        <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                    </Magnetic>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="text-center py-12 space-y-6 relative z-10"
                >
                  <div className="flex justify-center text-accent">
                    <CheckCircle2 size={48} className="animate-[pulse_2s_infinite]" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display font-extrabold text-lg uppercase tracking-wider text-ink">
                      Message Dispatched
                    </h3>
                    <p className="font-body text-xs text-ink-dim leading-relaxed max-w-xs mx-auto">
                      Your transmission was captured locally. Our management office will contact you regarding your inquiry shortly.
                    </p>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-5 py-2.5 border border-line text-ink-dim hover:text-accent hover:border-accent/40 font-body font-bold text-[9px] uppercase tracking-widest transition-colors duration-300"
                    >
                      New Message
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>
    </div>
  );
}
