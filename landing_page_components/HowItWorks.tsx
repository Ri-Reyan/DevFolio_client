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
  const pathRef = useRef<SVGPathElement>(null);

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

      // SVG Trading Wave ScrollTrigger Draw & Morph Animation
      if (pathRef.current) {
        const length = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "bottom 40%",
            scrub: 1.5, // Smooth synchronization with scroll
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
      className="relative py-28 lg:py-36 bg-white border-b border-[#00000014] overflow-hidden"
    >
      {/* Background Giant DEVFOLIO Typography */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none">
        <span className="text-[16vw] font-mono font-bold tracking-tighter text-black">
          DEVFOLIO
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-20">
          <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
            // ARCHITECTURAL PIPELINE
          </span>
          <h2 className="text-4xl lg:text-6xl font-semibold tracking-tighter mt-2 text-black">
            The Proof Journey
          </h2>
        </div>

        {/* Minimalist Scroll-Driven Trading Wave Area */}
        <div className="relative w-full h-112.5 flex flex-col justify-between">
          {/* Scroll-Triggered Trading Wave SVG */}
          <div className="absolute inset-0 pointer-events-none">
            <svg
              viewBox="0 0 1000 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <path
                ref={pathRef}
                d="M 0 80 Q 250 320, 500 150 T 1000 280"
                stroke="#ea6f53"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="1000" cy="280" r="4" fill="#ea6f53" />
            </svg>
          </div>

          {/* Minimalist Steps Array (Gradual Downward Progressive Layout) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10 my-auto">
            {milestones.map((item, index) => (
              <div
                key={index}
                className="milestone-node group cursor-pointer"
                style={{
                  transform: `translateY(${index * 16}px)`, // Gradual downward step without zig-zag confusion
                }}
              >
                {/* Step indicator */}
                <div className="flex items-center gap-2 mb-2 font-mono text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-600 group-hover:scale-150 transition-transform"></span>
                  <span className="text-neutral-400 group-hover:text-black font-medium transition-colors">
                    {item.step}
                  </span>
                </div>

                {/* Title & Short Description */}
                <h3 className="text-lg font-semibold tracking-tight text-black group-hover:text-orange-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-500 font-light mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Minimal Status */}
          <div className="flex justify-between items-center relative z-10 font-mono text-[10px] text-neutral-400 tracking-widest pt-8 border-t border-neutral-100">
            <span>INPUT: REPO SYNC</span>
            <span className="text-orange-600 font-medium">
              ● SCROLL-DRIVEN TRADING WAVE ACTIVE
            </span>
            <span>OUTPUT: VERIFIED RESUME</span>
          </div>
        </div>
      </div>
    </section>
  );
}
