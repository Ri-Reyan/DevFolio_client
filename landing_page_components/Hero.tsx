"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entry Animation for Content
      gsap.from(".hero-animate", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Career Graph Line Drawing Animation with a 1-second pause & smooth curve
      if (pathRef.current) {
        const length = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          duration: 2.5,
          ease: "power2.inOut",
          delay: 1, // Pauses for 1 second before drawing starts
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative hero-geometric-bg overflow-hidden py-16 sm:py-24 lg:py-36 border-b border-[#00000014]"
    >
      {/* Upward Career Growth Graph Visual Background - Fully Responsive */}
      <div className="absolute inset-0 lg:left-auto lg:right-0 bottom-0 w-full lg:w-[65%] h-full opacity-20 sm:opacity-25 pointer-events-none flex items-end justify-end overflow-hidden">
        <svg
          viewBox="0 0 900 450"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
          preserveAspectRatio="none"
        >
          {/* Subtle Grid lines */}
          <line
            x1="0"
            y1="112"
            x2="900"
            y2="112"
            stroke="#000"
            strokeWidth="0.5"
            strokeDasharray="4 4"
          />
          <line
            x1="0"
            y1="225"
            x2="900"
            y2="225"
            stroke="#000"
            strokeWidth="0.5"
            strokeDasharray="4 4"
          />
          <line
            x1="0"
            y1="337"
            x2="900"
            y2="337"
            stroke="#000"
            strokeWidth="0.5"
            strokeDasharray="4 4"
          />

          {/* Enhanced Smooth Upward Career Curve */}
          <path
            ref={pathRef}
            d="M 0 380 C 200 370, 300 280, 450 200 C 600 120, 750 80, 900 30"
            stroke="#ea6f53"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Growth Milestone Nodes */}
          <circle cx="250" cy="300" r="4.5" fill="#231f20" />
          <circle cx="450" cy="200" r="5.5" fill="#231f20" />
          <circle cx="700" cy="100" r="6" fill="#231f20" />
          <circle cx="900" cy="30" r="7" fill="#ea6f53" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <div className="hero-animate inline-block px-3 py-1 mb-6 text-xs font-mono tracking-wider text-orange-700 bg-orange-50 border border-orange-200">
            PROOF-BASED DEVELOPER ECOSYSTEM
          </div>

          <h1 className="hero-animate text-3xl sm:text-6xl lg:text-8xl font-semibold tracking-tighter leading-[1.05] sm:leading-[0.95] text-black mb-6 sm:mb-8">
            Transform the way <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-black via-neutral-800 to-orange-700">
              your career speaks
            </span>
          </h1>

          <p className="hero-animate text-sm sm:text-base md:text-xl text-neutral-600 max-w-2xl font-light leading-relaxed mb-8 sm:mb-10">
            Most developer skills aren’t verified for months. DevFolio proves
            your code through automated performance tests, AST analysis, and
            AI-driven technical scoring.
          </p>

          <div className="hero-animate flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="/register"
              className="px-8 py-4 bg-black text-white text-xs sm:text-sm font-medium tracking-wide text-center hover:bg-neutral-800 transition shadow-lg"
            >
              Get Started Free →
            </Link>
            <Link
              href="#features"
              className="px-8 py-4 bg-white text-black border border-black text-xs sm:text-sm font-medium tracking-wide text-center hover:bg-neutral-100 transition"
            >
              Explore Features
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
