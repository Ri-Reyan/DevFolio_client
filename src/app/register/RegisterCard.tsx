"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Registration from "../(auth)/components/Registration";
import VerifyOtp from "../(auth)/components/VerifyOtp";

export default function RegisterCard() {
  const { isAuthenticated, user, isLoading, mode, setMode } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (mode !== "verify-otp") {
      setMode("register");
    }
  }, [mode, setMode]);

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      router.replace("/dashboard");
    }
  }, [isLoading, isAuthenticated, user, router]);

  return (
    <div className="min-h-screen bg-neutral-50/50 flex flex-col justify-center items-center p-4 selection:bg-black selection:text-white">
      <div className="w-full max-w-md bg-white border border-neutral-200 shadow-xl relative">
        <div className="flex items-center justify-between px-6 pt-5 pb-2 border-b border-neutral-100">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
            {mode === "verify-otp"
              ? "// VERIFY_SECURITY_CODE"
              : "// CANDIDATE_REGISTER"}
          </span>
          <Link
            href="/"
            className="text-xs font-mono text-neutral-500 hover:text-black transition"
          >
            ← Home
          </Link>
        </div>
        <div className="p-6 sm:p-8 pt-4">
          {mode === "verify-otp" ? <VerifyOtp /> : <Registration />}
        </div>
      </div>
    </div>
  );
}
