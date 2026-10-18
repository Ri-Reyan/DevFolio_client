"use client";

import {
  ArrowRight,
  FileText,
  MessageSquareCode,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function DashboardOverviewPage() {
  const { user } = useAuth();
  const displayName = user?.fullName?.trim() || "Developer";

  return (
    <div className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full space-y-8">
      {/* Overview Welcome Banner */}
      <section className="bg-white border border-neutral-200 p-6 sm:p-8 relative overflow-hidden shadow-xs">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-neutral-100 border border-neutral-200 text-[10px] font-mono uppercase tracking-widest text-neutral-500">
            <Sparkles className="w-3 h-3 text-[#EA6F53]" />
            <span>{"// DEVELOPER_COMMAND_CENTER"}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-black">
            Welcome back, {displayName}
          </h1>

          <p className="text-sm text-neutral-600 leading-relaxed font-light">
            Welcome to your DevFolio command center. Select an engineering track
            below to construct evidence-backed resumes from verified code or
            evaluate your skills in the technical interview arena.
          </p>
        </div>
      </section>

      {/* Prominent Feature Cards Grid */}
      <section aria-label="Core Engineering Tracks">
        <div className="mb-4">
          <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400">
            <span>{"// AVAILABLE_TRACKS"}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card 1: Resume Track */}
          <div className="flex flex-col justify-between bg-white border border-neutral-200 p-6 sm:p-8 hover:border-black transition-colors group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                  <span>{"// TRACK_01_RESUME"}</span>
                </span>
                <div className="w-10 h-10 border border-neutral-200 bg-neutral-50 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-colors">
                  <FileText className="w-5 h-5" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-black mb-1.5">
                  Resume Builder
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                  Transform verified GitHub repositories, AST metrics, and live
                  performance telemetry into an evidence-backed engineering
                  resume with audit-proof bullet points.
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-neutral-100">
              <Link
                href="/resume"
                className="inline-flex items-center justify-between w-full px-4 py-2.5 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors focus-visible:outline-2 focus-visible:outline-black"
              >
                <span>Launch Resume Builder</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Card 2: Interview Track */}
          <div className="flex flex-col justify-between bg-white border border-neutral-200 p-6 sm:p-8 hover:border-black transition-colors group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                  <span>{"// TRACK_02_INTERVIEW"}</span>
                </span>
                <div className="w-10 h-10 border border-neutral-200 bg-neutral-50 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-colors">
                  <MessageSquareCode className="w-5 h-5" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-black mb-1.5">
                  Technical Interview Arena
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                  Practice domain-specific technical questions, evaluate
                  architecture reasoning, and generate verified skill benchmarks
                  through multi-stage AI assessment.
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-neutral-100">
              <Link
                href="/interview"
                className="inline-flex items-center justify-between w-full px-4 py-2.5 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors focus-visible:outline-2 focus-visible:outline-black"
              >
                <span>Enter Interview Arena</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
