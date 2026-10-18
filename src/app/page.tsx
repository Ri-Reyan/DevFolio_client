import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getServerSession } from "@/lib/server-auth";
import FAQChess from "../../landing_page_components/FAQChess";
import Footer from "../../landing_page_components/Footer";
import Hero from "../../landing_page_components/Hero";
import HowItWorks from "../../landing_page_components/HowItWorks";
import Navbar from "../../landing_page_components/Navbar";
import Pricing from "../../landing_page_components/Pricing";
import ProblemSolution from "../../landing_page_components/ProblemSolution";
import SocialProof from "../../landing_page_components/SocialProof";
import ClientAuthRedirect from "./components/ClientAuthRedirect";

async function AuthRedirectCheck() {
  const session = await getServerSession();

  // Rule B: Authenticated visitor visiting / is redirected to /dashboard without rendering landing page
  if (session.isAuthenticated) {
    redirect("/dashboard");
  }

  return null;
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-[#231f20] font-sans antialiased selection:bg-black selection:text-white">
      <Suspense fallback={null}>
        <AuthRedirectCheck />
      </Suspense>
      <Suspense fallback={null}>
        <ClientAuthRedirect />
      </Suspense>
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
