"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { user, isAuthenticated, isLoading, openModal } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !user)) {
      openModal("login");
      router.replace("/login");
    }
  }, [isLoading, isAuthenticated, user, router, openModal]);

  // Loading state while session hydration and token refresh execute
  if (isLoading) {
    return (
      <div
        className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center select-none"
        aria-live="polite"
      >
        <div className="w-full max-w-sm border border-neutral-200 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-xl font-bold tracking-tight text-black">
              DevFolio<span className="text-[#EA6F53]">.</span>
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-50 border border-neutral-200 text-[11px] font-mono uppercase tracking-widest text-neutral-500 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#EA6F53] animate-pulse" />
            <span>{"// VERIFYING_SESSION"}</span>
          </div>

          <p className="text-xs text-neutral-600 font-mono mb-4">
            Hydrating authenticated developer credentials…
          </p>

          {/* Skeleton progress indicator */}
          <div className="w-full bg-neutral-100 h-1 overflow-hidden">
            <div className="bg-black h-full w-1/2 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  // If unauthenticated, render a clean holding state while router redirect finishes
  if (!isAuthenticated || !user) {
    return (
      <div
        className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center select-none"
        aria-live="polite"
      >
        <div className="w-full max-w-sm border border-neutral-200 bg-white p-8 shadow-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-50 border border-neutral-200 text-[11px] font-mono uppercase tracking-widest text-neutral-500 mb-4">
            <span>{"// UNAUTHENTICATED"}</span>
          </div>
          <p className="text-xs text-neutral-600 font-mono mb-2">
            Redirecting to authentication portal…
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
