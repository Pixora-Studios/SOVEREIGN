"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calendar as CalendarIcon, Clock, ArrowUpRight, CheckCircle2, ChevronRight, Phone, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";
import Magnetic from "@/components/Magnetic";

const reservationSchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  phone: z.string().min(10, "Valid phone number is required (min 10 digits)."),
  email: z.string().email("Please provide a valid email address."),
  date: z.string().min(1, "Please select a target date."),
  time: z.string().min(1, "Please select an evening time slot."),
  partySize: z.number().min(1).max(20, "For parties larger than 20, contact us directly."),
  occasion: z.string().optional(),
  requests: z.string().optional(),
});

type ReservationFormValues = z.infer<typeof reservationSchema>;

const timeSlots = [
  "07:00 PM",
  "07:30 PM",
  "08:00 PM",
  "08:30 PM",
  "09:00 PM",
  "09:30 PM",
  "10:00 PM",
  "10:30 PM",
  "11:00 PM",
  "11:30 PM",
  "12:00 AM",
];

const occasions = [
  "Just a night out",
  "Birthday celebration",
  "Anniversary",
  "Bachelor / Bachelorette party",
  "Corporate dinner",
  "Other celebration",
];

export default function ReservePage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      date: "",
      time: "",
      partySize: 2,
      occasion: "Just a night out",
      requests: "",
    },
  });

  const selectedPartySize = watch("partySize");

  const onSubmit = async (data: ReservationFormValues) => {
    // Artificial latency for premium feel
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Reservation Request initiated:", data);

    // TODO: Wire to email or dispatch notification service later on Pixora servers
    setIsSubmitted(true);
  };

  // Prevent selecting past dates (min date = today)
  const todayString = new Date().toISOString().split("T")[0];

  return (
    <div className="relative w-full pb-24">
      {/* HEADER SECTION */}
      <section className="relative bg-void py-16 border-b border-line/30 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="font-display font-bold text-xs uppercase tracking-[0.25em] text-accent">
            Secure Placement
          </span>
          <h1 className="font-display font-extrabold text-4xl md:text-6xl uppercase tracking-wider text-ink">
            Table Reservations
          </h1>
          <p className="font-body text-xs md:text-sm text-ink-dim uppercase tracking-widest max-w-md mx-auto leading-relaxed">
            Register your coordinates with our dispatch. Tables are limited, and priorities are managed with discretion.
          </p>
        </div>
      </section>

      {/* CORE SPLIT SCREEN */}
      <section className="max-w-7xl mx-auto px-6 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* LEFT COLUMN: FORM PANEL (7 cols) */}
          <div className="lg:col-span-7 bg-charcoal border border-line/40 p-8 md:p-12 relative overflow-hidden">
            {/* Ambient accent background */}
            <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(201,255,61,0.02)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="reservation-form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6 relative z-10"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                    {/* Phone Number */}
                    <div className="space-y-2">
                      <label className="block font-display font-bold text-[10px] uppercase tracking-widest text-ink">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        {...register("phone")}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full bg-void border border-line text-ink font-body text-xs uppercase tracking-widest px-4 py-3 focus:outline-none focus:border-accent/60 transition-colors"
                      />
                      {errors.phone && (
                        <p className="text-[10px] text-nonveg font-bold tracking-wider uppercase">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Email Address */}
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

                    {/* Party Size Stepper */}
                    <div className="space-y-2">
                      <label className="block font-display font-bold text-[10px] uppercase tracking-widest text-ink">
                        Party Size * (current: {selectedPartySize})
                      </label>
                      <div className="flex items-center bg-void border border-line">
                        <button
                          type="button"
                          onClick={() => setValue("partySize", Math.max(1, selectedPartySize - 1))}
                          className="px-4 py-3 text-ink-dim hover:text-accent font-bold"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          readOnly
                          value={selectedPartySize}
                          className="w-full bg-transparent border-0 text-center text-ink font-body text-xs uppercase tracking-widest focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setValue("partySize", Math.min(20, selectedPartySize + 1))}
                          className="px-4 py-3 text-ink-dim hover:text-accent font-bold"
                        >
                          +
                        </button>
                      </div>
                      {selectedPartySize >= 20 && (
                        <p className="text-[10px] text-accent font-bold tracking-wider uppercase">
                          * Larger party? Contact us directly.
                        </p>
                      )}
                      {errors.partySize && (
                        <p className="text-[10px] text-nonveg font-bold tracking-wider uppercase">
                          {errors.partySize.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Target Date */}
                    <div className="space-y-2">
                      <label className="block font-display font-bold text-[10px] uppercase tracking-widest text-ink">
                        Target Date *
                      </label>
                      <div className="relative flex items-center bg-void border border-line">
                        <CalendarIcon size={14} className="absolute left-4 text-ink-faint" />
                        <input
                          type="date"
                          min={todayString}
                          {...register("date")}
                          className="w-full bg-transparent text-ink font-body text-xs uppercase tracking-widest pl-10 pr-4 py-3 focus:outline-none [color-scheme:dark]"
                        />
                      </div>
                      {errors.date && (
                        <p className="text-[10px] text-nonveg font-bold tracking-wider uppercase">
                          {errors.date.message}
                        </p>
                      )}
                    </div>

                    {/* Time Slot Selection */}
                    <div className="space-y-2">
                      <label className="block font-display font-bold text-[10px] uppercase tracking-widest text-ink">
                        Preferred Evening Slot *
                      </label>
                      <div className="relative flex items-center bg-void border border-line">
                        <Clock size={14} className="absolute left-4 text-ink-faint" />
                        <select
                          {...register("time")}
                          className="w-full bg-transparent text-ink font-body text-xs uppercase tracking-widest pl-10 pr-4 py-3 focus:outline-none cursor-pointer appearance-none"
                        >
                          <option value="" className="bg-charcoal text-ink-faint">Select Slot</option>
                          {timeSlots.map((slot) => (
                            <option key={slot} value={slot} className="bg-charcoal text-ink">
                              {slot}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.time && (
                        <p className="text-[10px] text-nonveg font-bold tracking-wider uppercase">
                          {errors.time.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Occasions */}
                    <div className="space-y-2">
                      <label className="block font-display font-bold text-[10px] uppercase tracking-widest text-ink">
                        Special Occasion
                      </label>
                      <select
                        {...register("occasion")}
                        className="w-full bg-void border border-line text-ink font-body text-xs uppercase tracking-widest px-4 py-3 focus:outline-none cursor-pointer"
                      >
                        {occasions.map((occ) => (
                          <option key={occ} value={occ} className="bg-charcoal text-ink">
                            {occ}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Special Requests */}
                    <div className="space-y-2">
                      <label className="block font-display font-bold text-[10px] uppercase tracking-widest text-ink">
                        Acoustic / Seating Requests
                      </label>
                      <input
                        type="text"
                        {...register("requests")}
                        placeholder="e.g. Near main console, quiet niche"
                        className="w-full bg-void border border-line text-ink font-body text-xs uppercase tracking-widest px-4 py-3 focus:outline-none focus:border-accent/60 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <Magnetic>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group flex items-center space-x-3 bg-accent text-void font-body font-bold text-xs uppercase tracking-[0.25em] px-8 py-4 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span>{isSubmitting ? "Transmitting..." : "Transmit Request"}</span>
                        <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                    </Magnetic>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="reservation-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="text-center py-16 space-y-6 relative z-10"
                >
                  <div className="flex justify-center text-accent">
                    {/* Animated Draw checkmark */}
                    <CheckCircle2 size={64} className="animate-[pulse_2s_infinite]" />
                  </div>

                  <div className="space-y-2">
                    <h2 className="font-display font-extrabold text-2xl uppercase tracking-wider text-ink">
                      Coordinates Logged
                    </h2>
                    <p className="font-body text-xs md:text-sm text-ink-dim max-w-sm mx-auto leading-relaxed">
                      Your table reservation transmission is registered locally. Our concierge will reach out to confirm your placement shortly.
                    </p>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-3 border border-line text-ink-dim hover:text-accent hover:border-accent/40 font-body font-bold text-[10px] uppercase tracking-widest transition-colors duration-300"
                    >
                      Log Another Request
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT COLUMN: FALLBACK CONTACTS & POLICIES (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Quick Contact Box */}
            <div className="bg-charcoal border border-line/40 p-8 space-y-6">
              <h3 className="font-display font-extrabold text-lg uppercase tracking-wider text-ink border-b border-line pb-3">
                Concierge Dispatch
              </h3>

              <p className="font-body text-xs text-ink-dim leading-relaxed">
                For immediate support, private box bookings, or large group (20+) alignment, contact our dispatch desks directly.
              </p>

              <div className="space-y-4 pt-2">
                <a
                  href={siteConfig.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-void border border-line hover:border-accent/40 group transition-all duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <MessageSquare size={16} className="text-accent" />
                    <span className="font-body font-bold text-xs uppercase tracking-widest text-ink">
                      WhatsApp Dispatch
                    </span>
                  </div>
                  <ChevronRight size={14} className="text-ink-faint group-hover:text-accent transform group-hover:translate-x-0.5 transition-all" />
                </a>

                <a
                  href={`tel:${siteConfig.socials.phone}`}
                  className="flex items-center justify-between p-4 bg-void border border-line hover:border-accent/40 group transition-all duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <Phone size={16} className="text-accent" />
                    <span className="font-body font-bold text-xs uppercase tracking-widest text-ink">
                      Direct Voice Desk
                    </span>
                  </div>
                  <ChevronRight size={14} className="text-ink-faint group-hover:text-accent transform group-hover:translate-x-0.5 transition-all" />
                </a>
              </div>
            </div>

            {/* Entry Guidelines Policies */}
            <div className="bg-charcoal border border-line/40 p-8 space-y-4">
              <h4 className="font-display font-bold text-xs uppercase tracking-[0.2em] text-accent">
                Terms of Entrance
              </h4>
              <ul className="space-y-3 font-body text-xs text-ink-dim leading-relaxed list-none">
                <li className="flex items-start space-x-2">
                  <span className="text-accent font-bold mt-0.5">&bull;</span>
                  <span>Strict age gate of 21 and above. Valid electronic or physical ID is required at the chancel.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-accent font-bold mt-0.5">&bull;</span>
                  <span>Smart casual attire only. Open sandals, slippers, crop tops, or active sportswear are strictly prohibited.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-accent font-bold mt-0.5">&bull;</span>
                  <span>Camera covers may be applied at the door to respect client anonymity and maintain spatial discretion.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
