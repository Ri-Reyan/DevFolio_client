"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isAnnual, setIsAnnual] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".pricing-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="py-28 lg:py-36 max-w-7xl mx-auto px-6 border-b border-[#00000014]"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">
            // INVEST IN PROOF
          </span>
          <h2 className="text-4xl lg:text-6xl font-semibold tracking-tighter mt-3 text-black">
            Simple, transparent <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-black via-neutral-700 to-orange-700">
              value for developers
            </span>
          </h2>
        </div>

        {/* Monthly / Annual Toggle Switch */}
        <div className="flex items-center gap-3 bg-neutral-100 p-1 border border-neutral-200 w-fit">
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-4 py-2 text-xs font-mono uppercase transition-colors ${
              !isAnnual
                ? "bg-black text-white"
                : "text-neutral-600 hover:text-black"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-4 py-2 text-xs font-mono uppercase transition-colors ${
              isAnnual
                ? "bg-black text-white"
                : "text-neutral-600 hover:text-black"
            }`}
          >
            Annual <span className="text-[10px] text-orange-400">(-20%)</span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {/* Tier 1: Starter / Free */}
        <div className="pricing-card p-8 border border-black bg-white flex flex-col justify-between transition-all duration-100 hover:bg-neutral-50">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                Explorer
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-neutral-100 border border-neutral-200">
                Phase 1 MVP
              </span>
            </div>
            <div className="mb-6">
              <span className="text-5xl font-semibold tracking-tight">$0</span>
              <span className="text-neutral-500 text-sm ml-1">/ forever</span>
            </div>
            <p className="text-neutral-600 text-sm mb-8 font-light">
              Perfect for students and junior developers starting their
              proof-of-work journey.
            </p>
            <ul className="space-y-3 text-sm text-neutral-700 font-light mb-8">
              <li className="flex items-center gap-2">✓ 3 Resumes per day</li>
              <li className="flex items-center gap-2">
                ✓ 5 AI Mock Interviews
              </li>
              <li className="flex items-center gap-2">
                ✓ Standard GitHub Sync
              </li>
              <li className="flex items-center gap-2 text-neutral-400">
                ✕ Custom Domain Export
              </li>
            </ul>
          </div>
          <Link
            href="/register"
            className="w-full py-4 border border-black text-black text-xs font-mono uppercase tracking-widest text-center hover:bg-black hover:text-white transition-colors"
          >
            Get Started Free
          </Link>
        </div>

        {/* Tier 2: Pro (Elevated / Highlighted Tracebit Style) */}
        <div className="pricing-card p-8 border-2 border-black bg-black text-white flex flex-col justify-between relative shadow-2xl lg:-translate-y-4">
          <div className="absolute -top-3 right-6 bg-[#ea6f53] text-white text-[10px] font-mono uppercase px-3 py-1 tracking-widest">
            Most Popular
          </div>
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-orange-400">
                Professional
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-neutral-300">
                Unlimited Proof
              </span>
            </div>
            <div className="mb-6">
              <span className="text-5xl font-semibold tracking-tight">
                {isAnnual ? "$12" : "$15"}
              </span>
              <span className="text-neutral-400 text-sm ml-1">/ month</span>
            </div>
            <p className="text-neutral-300 text-sm mb-8 font-light">
              Designed for serious developers aiming at top-tier tech roles and
              freelance scaling.
            </p>
            <ul className="space-y-3 text-sm text-neutral-200 font-light mb-8">
              <li className="flex items-center gap-2">
                ✓ Unlimited Tailored Resumes
              </li>
              <li className="flex items-center gap-2">
                ✓ Unlimited Interview Arena
              </li>
              <li className="flex items-center gap-2">
                ✓ Advanced AST Code Telemetry
              </li>
              <li className="flex items-center gap-2">
                ✓ Priority PDF & Markdown Export
              </li>
            </ul>
          </div>
          <Link
            href="/register"
            className="w-full py-4 bg-white text-black text-xs font-mono uppercase tracking-widest text-center hover:bg-neutral-200 transition-colors"
          >
            Claim Pro Access
          </Link>
        </div>

        {/* Tier 3: Enterprise / Team */}
        <div className="pricing-card p-8 border border-black bg-white flex flex-col justify-between transition-all duration-100 hover:bg-neutral-50">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                Recruiter / Team
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-neutral-100 border border-neutral-200">
                Agency
              </span>
            </div>
            <div className="mb-6">
              <span className="text-5xl font-semibold tracking-tight">
                Custom
              </span>
              <span className="text-neutral-500 text-sm ml-1">
                / organization
              </span>
            </div>
            <p className="text-neutral-600 text-sm mb-8 font-light">
              For bootcamps, hiring teams, and engineering agencies verifying
              candidate skills at scale.
            </p>
            <ul className="space-y-3 text-sm text-neutral-700 font-light mb-8">
              <li className="flex items-center gap-2">
                ✓ Team Workspace Analytics
              </li>
              <li className="flex items-center gap-2">
                ✓ Custom Skill Assessment Gates
              </li>
              <li className="flex items-center gap-2">
                ✓ Dedicated ATS Integration
              </li>
              <li className="flex items-center gap-2">
                ✓ 24/7 Priority Support
              </li>
            </ul>
          </div>
          <Link
            href="/contact"
            className="w-full py-4 border border-black text-black text-xs font-mono uppercase tracking-widest text-center hover:bg-black hover:text-white transition-colors"
          >
            Contact Sales
          </Link>
        </div>
      </div>
    </section>
  );
}
