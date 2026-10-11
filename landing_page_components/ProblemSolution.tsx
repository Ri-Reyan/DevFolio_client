"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProblemSolution() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.3,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="py-16 sm:py-24 max-w-7xl mx-auto px-6 border-b border-[#00000014]"
    >
      <div className="mb-12 sm:mb-16">
        <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
          // PARADIGM SHIFT
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mt-2 mb-4 text-black">
          Claims vs. Absolute Proof
        </h2>
        <p className="text-neutral-600 max-w-xl text-sm md:text-base font-light leading-relaxed">
          Stop relying on inflated bullet points. Let your actual GitHub commits
          and automated code telemetry speak for you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
        {/* Card 1 */}
        <div className="feature-card p-6 sm:p-8 border border-black bg-white flex flex-col justify-between shadow-xs">
          <div>
            <span className="text-[10px] sm:text-xs font-mono text-red-600 bg-red-50 px-2 py-1 border border-red-200">
              THE OLD WAY
            </span>
            <h3 className="text-xl sm:text-2xl font-semibold mt-4 mb-3 tracking-tight">
              Exaggerated Resumes
            </h3>
            <p className="text-neutral-600 text-xs sm:text-sm font-light leading-relaxed">
              Manually written bullet points with zero proof. Recruiters spend
              seconds guessing if you actually built the backend architecture or
              just copied tutorials.
            </p>
          </div>
          <div className="mt-8 pt-6 border-t border-neutral-200 text-[11px] sm:text-xs text-neutral-400 font-mono">
            ❌ High Hallucination Rate · Zero Verification
          </div>
        </div>

        {/* Card 2 */}
        <div className="feature-card p-6 sm:p-8 border border-black bg-black text-white flex flex-col justify-between shadow-xl">
          <div>
            <span className="text-[10px] sm:text-xs font-mono text-orange-400 bg-neutral-900 px-2 py-1 border border-neutral-800">
              DEVFOLIO ENGINE
            </span>
            <h3 className="text-xl sm:text-2xl font-semibold mt-4 mb-3 tracking-tight">
              Evidence-Backed Code
            </h3>
            <p className="text-neutral-300 text-xs sm:text-sm font-light leading-relaxed">
              AST parsing + Live URL performance testing + LLM context mapping.
              Every bullet point is anchored directly to your repository commits
              and metrics.
            </p>
          </div>
          <div className="mt-8 pt-6 border-t border-neutral-800 text-[11px] sm:text-xs text-orange-400 font-mono">
            ✓ Verified Repos · Zero Hallucination · Cryptographic Proof
          </div>
        </div>
      </div>
    </section>
  );
}
