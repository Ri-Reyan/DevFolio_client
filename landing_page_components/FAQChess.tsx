"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// চেসবোর্ডের ৮x৮ স্পেসের বিভিন্ন ঘরে নির্দিষ্ট পাওন ডেটা
const chessPawns = [
  {
    position: "B7",
    question: "How does DevFolio verify GitHub repositories?",
    answer:
      "Our backend runs Abstract Syntax Tree (AST) analysis combined with live URL telemetry and code metrics to prove absolute authenticity.",
  },
  {
    position: "C3",
    question: "Is my source code or API keys kept secure?",
    answer:
      "Yes. We only parse structural metadata. No raw secrets or private repository keys are ever stored on our servers.",
  },
  {
    position: "D6",
    question: "How do AI mock interviews score my answers?",
    answer:
      "The AI evaluates your technical explanation in real-time, mapping architectural logic against industry standards and generating radar reports.",
  },
  {
    position: "E2",
    question: "Can I export my verified resume as a PDF?",
    answer:
      "Absolutely. Pro and enterprise tiers allow instant, high-fidelity PDF and Markdown exports optimized for ATS systems.",
  },
  {
    position: "F5",
    question: "How is DevFolio different from regular builders?",
    answer:
      "Traditional resumes rely on unverified text claims. DevFolio provides cryptographic and telemetry-backed proof for every single bullet point.",
  },
  {
    position: "G3",
    question: "What is included in the Phase 1 MVP access?",
    answer:
      "You get automated repo syncing, core AST parsing, 5 AI mock interview sessions, and standard evidence-backed resume generation.",
  },
];

export default function FAQChess() {
  const [activePawn, setActivePawn] = useState<number | null>(null);

  const boardSize = 8;
  const files = ["A", "B", "C", "D", "E", "F", "G", "H"];

  return (
    <section
      id="faqs"
      className="py-16 sm:py-28 lg:py-36 max-w-7xl mx-auto px-4 sm:px-6 border-b border-[#00000014] bg-white overflow-hidden"
    >
      {/* Section Header */}
      <div className="mb-12 sm:mb-16">
        <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
          // TACTICAL FAQ MATRIX
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-semibold tracking-tighter mt-2 text-black">
          The Chessboard <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-black via-neutral-700 to-orange-700">
            Intel Matrix
          </span>
        </h2>
        <p className="text-xs font-mono text-neutral-400 mt-2">
          * Hover or tap tactical pawns to inspect intelligence questions &
          answers.
        </p>
      </div>

      {/* Responsive & Ultra-Minimalist Chessboard Container with horizontal scroll safety on tiny screens */}
      <div className="w-full overflow-x-auto pb-4">
        <div className="min-w-[320px] max-w-4xl mx-auto border border-black bg-black p-px shadow-xl">
          <div className="grid grid-cols-8 gap-px bg-black">
            {Array.from({ length: boardSize * boardSize }).map((_, index) => {
              const row = Math.floor(index / boardSize);
              const col = index % boardSize;
              const squareName = `${files[col]}${boardSize - row}`;

              const pawnItem = chessPawns.find(
                (p) => p.position === squareName,
              );
              const pawnIndex = pawnItem ? chessPawns.indexOf(pawnItem) : -1;
              const isDark = (row + col) % 2 === 1;

              return (
                <div
                  key={squareName}
                  onMouseEnter={() => pawnItem && setActivePawn(pawnIndex)}
                  onMouseLeave={() => setActivePawn(null)}
                  onClick={() =>
                    pawnItem &&
                    setActivePawn(activePawn === pawnIndex ? null : pawnIndex)
                  }
                  className={`relative h-16 sm:h-24 lg:h-36 flex flex-col items-center justify-center p-1 sm:p-3 select-none transition-colors duration-200 cursor-pointer ${
                    isDark
                      ? "bg-neutral-900 text-neutral-300"
                      : "bg-neutral-50 text-neutral-800"
                  }`}
                >
                  {/* Subtle Coordinate Label */}
                  <span className="absolute top-1 left-1 sm:top-2 sm:left-2 text-[8px] sm:text-[10px] font-mono opacity-25">
                    {squareName}
                  </span>

                  {/* Large Minimalist Pawn Node */}
                  {pawnItem ? (
                    <div className="relative flex flex-col items-center group w-full h-full justify-center">
                      {/* Floating Large Pawn Icon */}
                      <motion.span
                        whileHover={{ y: -4, scale: 1.1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                        className="text-2xl sm:text-5xl lg:text-6xl text-orange-600 mb-0.5 sm:mb-2 drop-shadow-xs"
                      >
                        ♟
                      </motion.span>

                      {/* Question Title Label Under Pawn (Hidden on extra small screens, visible on hover/sm+) */}
                      <span className="hidden sm:block text-[9px] sm:text-xs font-mono tracking-tight text-center line-clamp-1 max-w-[90%] text-orange-700 group-hover:text-black font-medium">
                        {pawnItem.question}
                      </span>

                      {/* Chat Box Popup on Hover / Tap */}
                      <AnimatePresence>
                        {activePawn === pawnIndex && (
                          <motion.div
                            initial={{ opacity: 0, y: 12, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute bottom-full mb-3 w-64 sm:w-80 bg-black text-white p-4 sm:p-5 border border-neutral-800 shadow-2xl z-50 pointer-events-none rounded-none text-left"
                          >
                            <div className="flex justify-between items-center font-mono text-[9px] sm:text-[10px] text-orange-400 mb-2 sm:mb-3 border-b border-neutral-800 pb-1 sm:pb-2">
                              <span>PAWN INTEL [{squareName}]</span>
                              <span>RESPONSE CHAT</span>
                            </div>
                            <p className="text-[11px] sm:text-sm font-medium text-white mb-2 leading-snug">
                              Q: {pawnItem.question}
                            </p>
                            <p className="text-[10px] sm:text-xs font-light text-neutral-300 leading-relaxed">
                              A: {pawnItem.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <span className="text-[8px] sm:text-[10px] font-mono opacity-10">
                      ·
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
