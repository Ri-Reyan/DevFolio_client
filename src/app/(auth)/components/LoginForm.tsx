"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import { HiOutlineEnvelope, HiOutlineLockClosed } from "react-icons/hi2";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { TbArrowRight } from "react-icons/tb";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: replace with real auth (NextAuth, Supabase, etc.)
    setTimeout(() => {
      setIsSubmitting(false);
      alert("✨ Demo: Signed in successfully");
    }, 800);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-page">
      <div className="w-full max-w-110 bg-surface rounded-card border border-edge/60 shadow-soft px-8 pt-10 pb-8 sm:px-8 sm:pb-7">
        {/* ---------- Brand ---------- */}
        <div className="flex items-center justify-center mb-8">
          <span className="text-[1.7rem] font-bold tracking-tight text-ink">
            Dev<span className="text-brand">Folio</span>
          </span>
        </div>

        {/* ---------- Header ---------- */}
        <header className="text-center mb-8">
          <h1 className="text-[1.9rem] font-bold tracking-tight text-ink mb-1.5">
            Welcome back
          </h1>
          <p className="text-[0.95rem] text-ink-muted">
            Sign in to continue to your portfolio
          </p>
        </header>

        {/* ---------- Form ---------- */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-ink mb-2 tracking-tight"
            >
              Email
            </label>
            <div className="relative">
              <HiOutlineEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-subtle pointer-events-none" />
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-11 pr-4 py-3.5 text-[0.95rem] bg-surface text-ink placeholder:text-slate-400 rounded-field border-[1.5px] border-edge shadow-input outline-none transition focus:border-brand focus:ring-[3px] focus:ring-brand/10"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-ink mb-2 tracking-tight"
            >
              Password
            </label>
            <div className="relative">
              <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-subtle pointer-events-none" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-12 py-3.5 text-[0.95rem] bg-surface text-ink placeholder:text-slate-400 rounded-field border-[1.5px] border-edge shadow-input outline-none transition focus:border-brand focus:ring-[3px] focus:ring-brand/10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-subtle hover:text-ink transition-colors"
              >
                {showPassword ? (
                  <FiEyeOff className="w-5 h-5" />
                ) : (
                  <FiEye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Forgot password */}
          <div className="flex justify-end -mt-1">
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-brand hover:text-brand-hover hover:underline transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* Sign In */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-field bg-brand text-white text-[0.95rem] font-semibold tracking-tight shadow-brand transition hover:bg-brand-hover hover:-translate-y-px active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Signing in…
              </>
            ) : (
              <>
                <TbArrowRight className="w-5 h-5" />
                Sign In
              </>
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 text-[0.75rem] font-medium uppercase tracking-widest text-ink-subtle">
            <span className="flex-1 h-px bg-edge" />
            or
            <span className="flex-1 h-px bg-edge" />
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={() => alert("🔗 GitHub OAuth flow would start here")}
            className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-field bg-slate-100 hover:bg-slate-200/80 text-ink text-[0.95rem] font-semibold tracking-tight border-[1.5px] border-edge shadow-input transition hover:-translate-y-px active:translate-y-0"
          >
            <FaGithub className="w-5 h-5" />
            Continue with Google
          </button>

          {/* Github */}
          <button
            type="button"
            onClick={() => alert("🔗 GitHub OAuth flow would start here")}
            className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-field bg-slate-100 hover:bg-slate-200/80 text-ink text-[0.95rem] font-semibold tracking-tight border-[1.5px] border-edge shadow-input transition hover:-translate-y-px active:translate-y-0"
          >
            <FaGoogle className="w-5 h-5" />
            Continue with GitHub
          </button>
        </form>

        {/* ---------- Footer ---------- */}
        <p className="text-center text-sm text-ink-muted mt-7">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-brand hover:text-brand-hover hover:underline transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
