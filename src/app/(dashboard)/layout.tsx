import type { Metadata } from "next";
import type { ReactNode } from "react";
import AuthGuard from "./components/AuthGuard";
import DashboardMobileNav from "./components/DashboardMobileNav";
import DashboardSidebar from "./components/DashboardSidebar";

export const metadata: Metadata = {
  title: "DevFolio Dashboard — Engineer Command Center",
  description:
    "Evidence-backed developer workspace for resume generation, AI technical interviews, and profile management.",
};

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-neutral-50/50 flex flex-col md:flex-row antialiased selection:bg-black selection:text-white">
        {/* Mobile Navigation Header & Slide-over Drawer */}
        <DashboardMobileNav />

        {/* Persistent Desktop Sidebar */}
        <DashboardSidebar />

        {/* Main Content Body */}
        <main className="flex-1 min-w-0 flex flex-col min-h-screen overflow-x-hidden">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
