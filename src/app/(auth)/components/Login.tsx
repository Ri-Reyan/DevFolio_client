"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa6";
import { HiOutlineEnvelope, HiOutlineLockClosed } from "react-icons/hi2";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { TbArrowRight } from "react-icons/tb";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { getGitHubAuthUrl } from "@/lib/api";

export default function LoginPage() {
  const { login, setMode, setPendingEmail } = useAuth();
  const toast = useToast();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGitHubRedirecting, setIsGitHubRedirecting] = useState(false);
  const [lockoutSeconds, setLockoutSeconds] = useState(0);

  // Lockout countdown timer
  useEffect(() => {
    if (lockoutSeconds <= 0) return;
    const interval = setInterval(() => {
      setLockoutSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutSeconds]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (lockoutSeconds > 0) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await login(email, password);
      toast.success("Welcome back to DevFolio!");
      router.push("/dashboard");
    } catch (err: any) {
      // If unverified account (AUTH-09)
      if (
        err.statusCode === 403 &&
        err.message?.includes("Confirm your email")
      ) {
        toast.info("Your email is unverified. We've sent you a fresh code.");
        setPendingEmail(email);
        setMode("verify-otp");
        return;
      }

      // If account locked (AUTH-13)
      if (err.statusCode === 429 && err.message?.includes("locked")) {
        setLockoutSeconds(900); // 15 minutes
      }

      setErrorMessage(err.message || "Invalid email or password.");
      toast.error(err.message || "Sign in failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatLockoutTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full">
      {/* Brand & Metadata */}
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-neutral-100">
        <span className="text-xl sm:text-2xl font-bold tracking-tight text-black">
          DevFolio<span className="text-[#EA6F53]">.</span>
        </span>
        <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-neutral-400">
          // IDENTITY_ACCESS
        </span>
      </div>

      {/* Header */}
      <header className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-black mb-1">
          Welcome back
        </h1>
        <p className="text-xs text-neutral-500 font-light">
          Sign in to access your telemetry and interview arena.
        </p>
      </header>

      {/* Lockout Banner */}
      {lockoutSeconds > 0 && (
        <div className="mb-4 p-3 bg-amber-50 border-l-2 border-amber-500 text-xs font-mono text-amber-800">
          ACCOUNT LOCKED: Too many failed login attempts. Try again in{" "}
          <strong className="text-black">
            {formatLockoutTimer(lockoutSeconds)}
          </strong>
          .
        </div>
      )}

      {/* Error Banner */}
      {errorMessage && lockoutSeconds === 0 && (
        <div className="mb-4 p-2.5 sm:p-3 bg-red-50 border-l-2 border-red-500 text-[11px] sm:text-xs font-mono text-red-600">
          ERR: {errorMessage}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label
            htmlFor="login-email"
            className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5"
          >
            Email Address
          </label>
          <div className="relative">
            <HiOutlineEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            <input
              id="login-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="developer@domain.com"
              disabled={lockoutSeconds > 0 || isSubmitting}
              className="w-full pl-10 pr-3 py-2.5 sm:py-3 text-xs sm:text-sm bg-neutral-50 text-black placeholder:text-neutral-400 rounded-none border border-neutral-200 outline-none transition focus:border-black focus:bg-white disabled:opacity-50"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="login-password"
              className="block text-xs font-mono uppercase tracking-wider text-neutral-700"
            >
              Password
            </label>
            <button
              type="button"
              onClick={() => {
                setPendingEmail(email);
                setMode("forgot-password");
              }}
              className="text-[11px] font-mono text-neutral-500 hover:text-black underline underline-offset-2 transition-colors"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <HiOutlineLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              disabled={lockoutSeconds > 0 || isSubmitting}
              className="w-full pl-10 pr-9 py-2.5 sm:py-3 text-xs sm:text-sm bg-neutral-50 text-black placeholder:text-neutral-400 rounded-none border border-neutral-200 outline-none transition focus:border-black focus:bg-white disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black transition-colors"
            >
              {showPassword ? (
                <FiEyeOff className="w-4 h-4" />
              ) : (
                <FiEye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || lockoutSeconds > 0}
          className="w-full inline-flex items-center justify-center gap-2 py-3 sm:py-3.5 px-4 rounded-none bg-black text-white text-xs font-mono uppercase tracking-wider transition hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          {isSubmitting ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              <span>Authenticating…</span>
            </>
          ) : (
            <>
              <span>Sign In</span>
              <TbArrowRight className="w-4 h-4 text-[#EA6F53]" />
            </>
          )}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 py-1 text-[10px] font-mono uppercase tracking-widest text-neutral-400">
          <span className="flex-1 h-px bg-neutral-200" />
          or continue with
          <span className="flex-1 h-px bg-neutral-200" />
        </div>

        {/* OAuth Buttons */}
        <div>
          <button
            type="button"
            onClick={() => {
              if (isGitHubRedirecting || isSubmitting || lockoutSeconds > 0)
                return;
              setIsGitHubRedirecting(true);
              window.location.assign(getGitHubAuthUrl());
            }}
            disabled={isGitHubRedirecting || isSubmitting || lockoutSeconds > 0}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-none bg-neutral-50 hover:bg-neutral-100 text-black text-xs font-mono uppercase tracking-wider border border-neutral-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Continue with GitHub"
          >
            {isGitHubRedirecting ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-black/40 border-t-black rounded-full animate-spin" />
                <span>Redirecting to GitHub…</span>
              </>
            ) : (
              <>
                <FaGithub className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Continue with GitHub</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Switch to Register */}
      <p className="text-center text-xs text-neutral-500 mt-6 pt-3 border-t border-neutral-100">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={() => setMode("register")}
          className="font-semibold text-black hover:text-[#EA6F53] underline transition-colors ml-1"
        >
          Create account
        </button>
      </p>
    </div>
  );
}
