import { ArrowLeft, MessageSquareCode } from "lucide-react";
import Link from "next/link";

export default function InterviewPage() {
  return (
    <div className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
          <span>{"// TRACK_02_INTERVIEW"}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-black">
          AI Technical Interview Arena
        </h1>
        <p className="text-sm text-neutral-600 leading-relaxed font-light max-w-2xl">
          Evaluate technical competence and architecture decision-making through
          domain-specific interview simulations evaluated by AI.
        </p>
      </div>

      {/* Consistent Placeholder Container */}
      <div className="bg-white border border-neutral-200 p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-6 shadow-xs">
        <div className="w-12 h-12 border border-neutral-200 bg-neutral-50 flex items-center justify-center mx-auto text-black">
          <MessageSquareCode className="w-6 h-6 text-[#EA6F53]" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-neutral-100 border border-neutral-200 text-[10px] font-mono uppercase tracking-widest text-neutral-500">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EA6F53]" />
            <span>{"// ARENA_STAGED"}</span>
          </div>
          <h2 className="text-lg font-bold text-black">
            Interview Arena & Scoring Pipeline
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-xl mx-auto font-light">
            Interactive multi-turn technical sessions, real-time code and
            reasoning questions, and comprehensive score breakdowns will be
            available in this workspace.
          </p>
        </div>

        <div className="pt-4 border-t border-neutral-100">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors focus-visible:outline-2 focus-visible:outline-black"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
