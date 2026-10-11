import Link from "next/link";
import Navbar from "../../landing_page_components/Navbar";
import Hero from "../../landing_page_components/Hero";
import SocialProof from "../../landing_page_components/SocialProof";
import ProblemSolution from "../../landing_page_components/ProblemSolution";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-[#231f20] font-sans antialiased selection:bg-black selection:text-white">
      {/* Top Announcement Bar */}
      <div className="bg-[#231f20] text-white text-xs py-2 px-4 text-center tracking-wide font-medium flex justify-center items-center gap-6">
        <span>🚀 Phase 1 MVP Live</span>
        <span className="hidden md:inline">•</span>
        <Link
          href="/register"
          className="underline hover:text-orange-400 transition"
        >
          Build your verified developer resume today →
        </Link>
      </div>

      <Navbar />
      <Hero />
      <SocialProof />
      <ProblemSolution />

      {/* Footer */}
      <footer className="bg-black text-white py-16 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <span className="text-xl font-bold tracking-tight">
              DevFolio<span className="text-orange-500">.</span>
            </span>
            <p className="text-xs text-neutral-400 mt-1">
              Prove your skills, don't just claim them.
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm text-neutral-400">
            <Link href="/terms" className="hover:text-white transition">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-white transition">
              Privacy
            </Link>
            <span className="text-neutral-600">© 2026 DevFolio</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
