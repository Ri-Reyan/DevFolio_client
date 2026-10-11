"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-animate", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative hero-geometric-bg overflow-hidden py-20 lg:py-36 border-b border-[#00000014]"
    >
      {/* Decorative Geometric Lines */}
      <div className="absolute right-6 lg:right-12 top-16 hidden sm:block opacity-25 pointer-events-none">
        <svg
          width="250"
          height="250"
          lg:width="350"
          lg:height="350"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="0" y1="0" x2="400" y2="400" stroke="#000" strokeWidth="1" />
          <line x1="400" y1="0" x2="0" y2="400" stroke="#000" strokeWidth="1" />
          <circle
            cx="200"
            cy="200"
            r="80"
            stroke="#000"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <div className="hero-animate inline-block px-3 py-1 mb-6 text-xs font-mono tracking-wider text-orange-700 bg-orange-50 border border-orange-200">
            PROOF-BASED DEVELOPER ECOSYSTEM
          </div>

          <h1 className="hero-animate text-4xl sm:text-6xl lg:text-8xl font-semibold tracking-tighter leading-[0.95] text-black mb-8">
            Transform the way <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-black via-neutral-800 to-orange-700">
              your career speaks
            </span>
          </h1>

          <p className="hero-animate text-base md:text-xl text-neutral-600 max-w-2xl font-light leading-relaxed mb-10">
            Most developer skills aren’t verified for months. DevFolio proves
            your code through automated performance tests, AST analysis, and
            AI-driven technical scoring.
          </p>

          <div className="hero-animate flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="/register"
              className="px-8 py-4 bg-black text-white text-sm font-medium tracking-wide text-center hover:bg-neutral-800 transition shadow-lg"
            >
              Get Started Free →
            </Link>
            <Link
              href="#features"
              className="px-8 py-4 bg-white text-black border border-black text-sm font-medium tracking-wide text-center hover:bg-neutral-100 transition"
            >
              Explore Features
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
