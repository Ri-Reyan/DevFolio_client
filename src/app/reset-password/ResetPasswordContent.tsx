"use client";

import { useState, FormEvent, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  HiOutlineLockClosed,
  HiCheck,
  HiCheckCircle,
  HiExclamationTriangle,
} from "react-icons/hi2";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { TbArrowRight, TbArrowBackUp } from "react-icons/tb";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

export default function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") || "";

  const { resetPassword, openModal } = useAuth();
  const toast = useToast();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Live password validation checklist
  const hasMinLength = password.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const passwordsMatch = password.length > 0 && password === confirmPassword;
  const isFormValid = hasMinLength && hasLetter && hasDigit && passwordsMatch;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const cleanToken = token.trim();
    if (!cleanToken) {
      setErrorMessage("Missing or invalid password reset token.");
      return;
    }

    if (!hasMinLength || !hasLetter || !hasDigit) {
      setErrorMessage(
        "Password must be at least 8 characters with a letter and a digit.",
      );
      return;
    }

    if (!passwordsMatch) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      await resetPassword(cleanToken, password);
      setIsSuccess(true);
      toast.success("Password successfully reset! Please sign in.");
    } catch (err: any) {
      setErrorMessage(
        err.message ||
          "Reset link is invalid or has expired. Please request a new one.",
      );
      toast.error(err.message || "Password reset failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReturnToLogin = () => {
    router.push("/");
    setTimeout(() => {
      openModal("login");
    }, 150);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col justify-between selection:bg-black selection:text-white">
      {/* Top Header */}
      <header className="border-b border-neutral-200/80 bg-white/80 backdrop-blur-md px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg sm:text-xl font-bold tracking-tight text-black flex items-center gap-1.5"
        >
          <span>DevFolio</span>
          <span className="text-[#EA6F53]">.</span>
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-500 hover:text-black transition"
        >
          <TbArrowBackUp className="w-3.5 h-3.5" />
          <span>Return Home</span>
        </Link>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-8">
        <div className="w-full max-w-md bg-white border border-neutral-200 shadow-sm p-6 sm:p-8">
          {/* Card Header & Badge */}
          <div className="flex items-center justify-between mb-5 sm:mb-6 pb-3 border-b border-neutral-100">
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-black">
              DevFolio<span className="text-[#EA6F53]">.</span>
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-neutral-400">
              // RECOVER_ACCESS
            </span>
          </div>

          {/* Scenario 1: Token Missing in URL */}
          {!token ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto">
                <HiExclamationTriangle className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-black mb-1">
                  Missing Reset Token
                </h1>
                <p className="text-xs text-neutral-500 font-light leading-relaxed max-w-xs mx-auto">
                  This recovery link is incomplete or missing its security
                  token. Please check your email or request a new reset link.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  router.push("/");
                  setTimeout(() => openModal("forgot-password"), 150);
                }}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-none bg-black text-white text-xs font-mono uppercase tracking-wider transition hover:bg-neutral-800"
              >
                <span>Request New Link</span>
                <TbArrowRight className="w-4 h-4 text-[#EA6F53]" />
              </button>
            </div>
          ) : isSuccess ? (
            /* Scenario 2: Success Confirmation */
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                <HiCheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-black mb-1">
                  Password Reset Successful
                </h1>
                <p className="text-xs text-neutral-500 font-light leading-relaxed max-w-xs mx-auto">
                  Your password has been securely updated. All previous sessions
                  have been revoked for your security.
                </p>
              </div>
              <button
                type="button"
                onClick={handleReturnToLogin}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-none bg-black text-white text-xs font-mono uppercase tracking-wider transition hover:bg-neutral-800"
              >
                <span>Sign In With New Password</span>
                <TbArrowRight className="w-4 h-4 text-[#EA6F53]" />
              </button>
            </div>
          ) : (
            /* Scenario 3: Password Reset Form */
            <>
              <header className="mb-5 sm:mb-6">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-black mb-1">
                  Set new password
                </h1>
                <p className="text-[11px] sm:text-xs text-neutral-500 font-light leading-relaxed">
                  Enter and confirm a new, strong password for your DevFolio
                  account.
                </p>
              </header>

              {errorMessage && (
                <div className="mb-4 p-2.5 sm:p-3 bg-red-50 border-l-2 border-red-500 text-[11px] sm:text-xs font-mono text-red-600">
                  ERR: {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* New Password */}
                <div>
                  <label
                    htmlFor="new-password"
                    className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <HiOutlineLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                    <input
                      id="new-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      disabled={isSubmitting}
                      className="w-full pl-10 pr-10 py-2.5 bg-neutral-50 border border-neutral-300 rounded-none text-sm text-black placeholder:text-neutral-400 outline-none transition focus:border-black focus:bg-white focus:ring-1 focus:ring-black disabled:opacity-50"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <FiEyeOff className="w-4 h-4" />
                      ) : (
                        <FiEye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <HiOutlineLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                    <input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      disabled={isSubmitting}
                      className="w-full pl-10 pr-10 py-2.5 bg-neutral-50 border border-neutral-300 rounded-none text-sm text-black placeholder:text-neutral-400 outline-none transition focus:border-black focus:bg-white focus:ring-1 focus:ring-black disabled:opacity-50"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? (
                        <FiEyeOff className="w-4 h-4" />
                      ) : (
                        <FiEye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Live Password Criteria Checklist */}
                <div className="p-3 bg-neutral-50 border border-neutral-200 text-xs font-mono space-y-1.5">
                  <span className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-2">
                    // PASSWORD_REQUIREMENTS
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    <div
                      className={`flex items-center gap-1.5 ${
                        hasMinLength ? "text-emerald-600" : "text-neutral-400"
                      }`}
                    >
                      <HiCheck
                        className={`w-3.5 h-3.5 ${
                          hasMinLength ? "text-emerald-500" : "opacity-30"
                        }`}
                      />
                      <span>8+ characters</span>
                    </div>

                    <div
                      className={`flex items-center gap-1.5 ${
                        hasLetter ? "text-emerald-600" : "text-neutral-400"
                      }`}
                    >
                      <HiCheck
                        className={`w-3.5 h-3.5 ${
                          hasLetter ? "text-emerald-500" : "opacity-30"
                        }`}
                      />
                      <span>At least 1 letter</span>
                    </div>

                    <div
                      className={`flex items-center gap-1.5 ${
                        hasDigit ? "text-emerald-600" : "text-neutral-400"
                      }`}
                    >
                      <HiCheck
                        className={`w-3.5 h-3.5 ${
                          hasDigit ? "text-emerald-500" : "opacity-30"
                        }`}
                      />
                      <span>At least 1 number</span>
                    </div>

                    <div
                      className={`flex items-center gap-1.5 ${
                        passwordsMatch ? "text-emerald-600" : "text-neutral-400"
                      }`}
                    >
                      <HiCheck
                        className={`w-3.5 h-3.5 ${
                          passwordsMatch ? "text-emerald-500" : "opacity-30"
                        }`}
                      />
                      <span>Passwords match</span>
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting || !isFormValid}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-none bg-black text-white text-xs font-mono uppercase tracking-wider transition hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed mt-2"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Updating Credentials...</span>
                    </div>
                  ) : (
                    <>
                      <span>Update Password</span>
                      <TbArrowRight className="w-4 h-4 text-[#EA6F53]" />
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200/80 bg-white/50 py-4 px-6 text-center text-xs font-mono text-neutral-400">
        DevFolio AST-Backed Developer Portfolio & Mock Interview Arena · All
        rights reserved.
      </footer>
    </div>
  );
}
