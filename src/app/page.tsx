import Link from "next/link";
import Navbar from "../../landing_page_components/Navbar";
import Hero from "../../landing_page_components/Hero";
import SocialProof from "../../landing_page_components/SocialProof";
import ProblemSolution from "../../landing_page_components/ProblemSolution";
import Footer from "../../landing_page_components/Footer";
import Pricing from "../../landing_page_components/Pricing";
import HowItWorks from "../../landing_page_components/HowItWorks";

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
      <Pricing />
      <HowItWorks />
      <Footer />
    </div>
  );
}
