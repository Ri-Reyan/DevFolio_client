import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";
import AuthModal from "./(auth)/components/AuthModal";
import OAuthNotificationHandler from "./components/OAuthNotificationHandler";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevFolio. — Prove Your Skills, Don't Just Claim Them",
  description:
    "An evidence-backed developer resume generator and AI interview arena. Prove your code through AST analysis, performance telemetry, and technical scoring.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ToastProvider>
          <AuthProvider>
            <AuthModal />
            <OAuthNotificationHandler />
            {children}
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
