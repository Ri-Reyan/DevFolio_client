"use client";

import { useState, FormEvent } from "react";
import { HiOutlineEnvelope, HiCheckCircle } from "react-icons/hi2";
import { TbArrowRight, TbArrowBackUp } from "react-icons/tb";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

export default function ForgotPassword() {
  const { pendingEmail, forgotPassword, setMode } = useAuth();
  const toast = useToast();

  const [email, setEmail] = useState(pendingEmail || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await forgotPassword(email);
      setIsSent(true);
      toast.success("Password reset instructions sent.");
    } catch (err: any) {
      setErrorMessage(
        err.message || "Failed to process request. Please try again.",
      );
      toast.error(err.message || "Request failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Brand & Metadata */}
      <div className="flex items-center justify-between mb-5 sm:mb-6 pb-3 border-b border-neutral-100">
        <span className="text-xl sm:text-2xl font-bold tracking-tight text-black">
          DevFolio<span className="text-[#EA6F53]">.</span>
        </span>
        <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-neutral-400">
          // RECOVER_ACCESS
        </span>
      </div>

      {isSent ? (
        <div className="text-center py-4 space-y-4">
          <div className="w-12 h-12 bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
            <HiCheckCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-black mb-1">
              Check your inbox
            </h2>
            <p className="text-xs text-neutral-500 font-light leading-relaxed max-w-xs mx-auto">
              If an account with{" "}
              <strong className="text-black font-mono">{email}</strong> exists,
              we have sent a secure password reset link.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setMode("login")}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-none bg-black text-white text-xs font-mono uppercase tracking-wider transition hover:bg-neutral-800 mt-2"
          >
            <span>Return to Sign In</span>
            <TbArrowRight className="w-4 h-4 text-[#EA6F53]" />
          </button>
        </div>
      ) : (
        <>
          <header className="mb-5 sm:mb-6">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-black mb-1">
              Reset your password
            </h1>
            <p className="text-[11px] sm:text-xs text-neutral-500 font-light leading-relaxed">
              Enter your registered email address and we&apos;ll send you a
              single-use link to reset your password.
            </p>
          </header>

          {errorMessage && (
            <div className="mb-4 p-2.5 sm:p-3 bg-red-50 border-l-2 border-red-500 text-[11px] sm:text-xs font-mono text-red-600">
              ERR: {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="reset-email"
                className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5"
              >
                Email Address
              </label>
              <div className="relative">
                <HiOutlineEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                <input
                  id="reset-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="developer@domain.com"
                  disabled={isSubmitting}
                  className="w-full pl-10 pr-3 py-2.5 sm:py-3 text-xs sm:text-sm bg-neutral-50 text-black placeholder:text-neutral-400 rounded-none border border-neutral-200 outline-none transition focus:border-black focus:bg-white disabled:opacity-50"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 py-3 sm:py-3.5 px-4 rounded-none bg-black text-white text-xs font-mono uppercase tracking-wider transition hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  <span>Sending Link…</span>
                </>
              ) : (
                <>
                  <span>Send Reset Link</span>
                  <TbArrowRight className="w-4 h-4 text-[#EA6F53]" />
                </>
              )}
            </button>
          </form>

          <div className="mt-5 pt-3 border-t border-neutral-100 text-center">
            <button
              type="button"
              onClick={() => setMode("login")}
              className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-black transition-colors"
            >
              <TbArrowBackUp className="w-3.5 h-3.5" />
              <span>Back to sign in</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
