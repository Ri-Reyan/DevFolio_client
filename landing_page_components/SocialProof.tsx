"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const companies = [
  { name: "Next.js", role: "Framework" },
  { name: "Google", role: "Cloud" },
  { name: "Vercel", role: "Deployment" },
  { name: "Docker", role: "Container" },
  { name: "Stripe", role: "Billing" },
  { name: "GitHub", role: "Source Control" },
  { name: "PostgreSQL", role: "Database" },
  { name: "AWS", role: "Infrastructure" },
  { name: "Prisma", role: "ORM" },
  { name: "Cloudflare", role: "Security" },
];

export default function SocialProof() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="py-12 sm:py-16 border-b border-[#00000014] bg-neutral-50/50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 mb-6 sm:mb-8">
        <p className="text-center text-[11px] sm:text-xs font-mono tracking-widest text-neutral-400 uppercase">
          Trusted by engineers building for top-tier tech ecosystems
        </p>
      </div>

      {/* Draggable & Auto-Scrolling Marquee Container */}
      <div
        className="flex w-full overflow-hidden cursor-grab active:cursor-grabbing select-none relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        {/* Responsive Gradient Fade Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-linear-to-r from-neutral-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-linear-to-l from-neutral-50 to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-8 sm:gap-16 items-center flex-nowrap shrink-0"
          animate={{ x: isHovered ? "0%" : ["0%", "-50%"] }}
          transition={{
            x: isHovered
              ? { duration: 0 }
              : { repeat: Infinity, ease: "linear", duration: 30 },
          }}
          drag="x"
          dragConstraints={{ left: -1000, right: 0 }}
        >
          {/* Render list twice for seamless infinite looping */}
          {[...companies, ...companies].map((company, index) => (
            <div
              key={index}
              className="flex items-center gap-2 sm:gap-2.5 py-2 group shrink-0"
            >
              <span className="font-semibold text-xs sm:text-sm md:text-base tracking-tight text-neutral-600 group-hover:text-black transition-colors">
                {company.name}
              </span>
              <span className="text-[8px] sm:text-[9px] font-mono uppercase px-1.5 py-0.5 bg-neutral-200/60 text-neutral-500 rounded-none">
                {company.role}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
