import { Suspense } from "react";
import type { Metadata } from "next";
import ResetPasswordContent from "./ResetPasswordContent";

export const metadata: Metadata = {
  title: "Reset Password — DevFolio.",
  description: "Securely reset your DevFolio account password.",
};

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4">
          <div className="text-xs font-mono text-neutral-400 animate-pulse">
            // LOADING_SECURITY_CONTEXT...
          </div>
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
