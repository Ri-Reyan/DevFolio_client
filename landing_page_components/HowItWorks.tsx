"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { step: "01", title: "Connect GitHub", desc: "Sync repositories securely" },
  { step: "02", title: "Input Information", desc: "Target job & metrics" },
  { step: "03", title: "Select Skill Set", desc: "Frameworks & core stack" },
  { step: "04", title: "Resume Track", desc: "Evidence-backed PDF" },
  { step: "05", title: "Interview Track", desc: "Deep AI technical arena" },
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopPathRef = useRef<SVGPathElement>(null);
  const mobilePathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Milestone entrance animation on scroll
      gsap.from(".milestone-node", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Desktop Horizontal Trading Wave SVG Animation
      if (desktopPathRef.current) {
        const length = desktopPathRef.current.getTotalLength();
        gsap.set(desktopPathRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(desktopPathRef.current, {
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "bottom 40%",
            scrub: 1.5,
          },
          ease: "none",
        });
      }

      // Mobile Vertical Top-to-Bottom Wave SVG Animation
      if (mobilePathRef.current) {
        const length = mobilePathRef.current.getTotalLength();
        gsap.set(mobilePathRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(mobilePathRef.current, {
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "bottom 30%",
            scrub: 1.5,
          },
          ease: "none",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="how-it-works"
      className="relative py-20 sm:py-28 lg:py-36 bg-white border-b border-[#00000014] overflow-hidden"
    >
      {/* Background Giant DEVFOLIO Typography */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none">
        <span className="text-[14vw] sm:text-[16vw] font-mono font-bold tracking-tighter text-black">
          DEVFOLIO
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-12 sm:mb-20">
          <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
            // ARCHITECTURAL PIPELINE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-semibold tracking-tighter mt-2 text-black">
            The Proof Journey
          </h2>
        </div>

        {/* ================= DESKTOP VIEW (Horizontal Trading Wave) ================= */}
        <div className="hidden lg:relative lg:w-full lg:h-112.5 lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-0 pointer-events-none">
            <svg
              viewBox="0 0 1000 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <path
                ref={desktopPathRef}
                d="M 0 80 Q 250 320, 500 150 T 1000 280"
                stroke="#ea6f53"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="1000" cy="280" r="4" fill="#ea6f53" />
            </svg>
          </div>

          <div className="grid grid-cols-5 gap-8 relative z-10 my-auto">
            {milestones.map((item, index) => (
              <div
                key={index}
                className="milestone-node group cursor-pointer"
                style={{
                  transform: `translateY(${index * 16}px)`,
                }}
              >
                <div className="flex items-center gap-2 mb-2 font-mono text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-600 group-hover:scale-150 transition-transform"></span>
                  <span className="text-neutral-400 group-hover:text-black font-medium transition-colors">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-black group-hover:text-orange-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-500 font-light mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center relative z-10 font-mono text-[10px] text-neutral-400 tracking-widest pt-8 border-t border-neutral-100">
            <span>INPUT: REPO SYNC</span>
            <span className="text-orange-600 font-medium">
              ● SCROLL-DRIVEN TRADING WAVE ACTIVE
            </span>
            <span>OUTPUT: VERIFIED RESUME</span>
          </div>
        </div>

        {/* ================= MOBILE / TABLET VIEW (Steps on Left, Wider SVG Wave on Right) ================= */}
        <div className="block lg:hidden relative pr-12 sm:pr-16">
          {/* Vertical Wider Top-to-Bottom SVG Wave Line on the Right Side */}
          <div className="absolute right-2 sm:right-4 top-2 bottom-2 w-8 pointer-events-none">
            <svg
              viewBox="0 0 60 800"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <path
                ref={mobilePathRef}
                d="M 10 0 Q 50 200, 10 400 T 10 800"
                stroke="#ea6f53"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>

          {/* Vertical Stacked Milestones */}
          <div className="flex flex-col gap-10 sm:gap-12 relative z-10">
            {milestones.map((item, index) => (
              <div key={index} className="milestone-node group relative">
                {/* Node marker connecting to vertical line on the right */}
                <span className="absolute -right-12 sm:-right-16 top-1.5 w-3 h-3 rounded-full bg-white border-2 border-orange-600 group-hover:bg-orange-600 transition-colors"></span>

                <div className="flex items-center gap-2 mb-1 font-mono text-[11px]">
                  <span className="text-orange-600 font-bold">
                    STEP {item.step}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-semibold tracking-tight text-black group-hover:text-orange-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 font-light mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile Bottom Status */}
          <div className="mt-12 pt-6 border-t border-neutral-100 font-mono text-[10px] text-neutral-400 tracking-wider flex flex-col sm:flex-row justify-between gap-2">
            <span>INPUT: REPO SYNC</span>
            <span className="text-orange-600 font-medium">
              ● VERTICAL PIPELINE ACTIVE
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
