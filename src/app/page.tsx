import Link from "next/link";
import Navbar from "../../landing_page_components/Navbar";
import Hero from "../../landing_page_components/Hero";
import SocialProof from "../../landing_page_components/SocialProof";
import ProblemSolution from "../../landing_page_components/ProblemSolution";
import Footer from "../../landing_page_components/Footer";
import Pricing from "../../landing_page_components/Pricing";
import HowItWorks from "../../landing_page_components/HowItWorks";
import FAQChess from "../../landing_page_components/FAQChess";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-[#231f20] font-sans antialiased selection:bg-black selection:text-white">
      <Navbar />
      <Hero />
      <SocialProof />
      <ProblemSolution />
      <Pricing />
      <HowItWorks />
      <FAQChess />
      <Footer />
    </div>
  );
}
