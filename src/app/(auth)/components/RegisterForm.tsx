"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import {
  HiOutlineEnvelope,
  HiOutlineLockClosed,
  HiOutlineUser,
} from "react-icons/hi2";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { TbArrowRight } from "react-icons/tb";
import { redirect } from "next/navigation";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    // Static demo: no API integration.
    setTimeout(() => {
      setIsSubmitting(false);
      alert("✨ Demo: Account created successfully");
    }, 800);

    redirect("/login");
  };

  const inputClass =
    "w-full pl-11 pr-4 py-3.5 text-[0.95rem] bg-surface text-ink placeholder:text-slate-400 rounded-field border-[1.5px] border-edge shadow-input outline-none transition focus:border-brand focus:ring-[3px] focus:ring-brand/10";

  const labelClass =
    "block text-sm font-medium text-ink mb-2 tracking-tight";

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-page">
      <div className="w-full max-w-110 bg-surface rounded-card border border-edge/60 shadow-soft px-8 pt-10 pb-8 sm:px-8 sm:pb-7">
        {/* Brand */}
        <div className="flex items-center justify-center mb-8">
          <span className="text-[1.7rem] font-bold tracking-tight text-ink">
            Dev<span className="text-brand">Folio</span>
          </span>
        </div>

        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-[1.9rem] font-bold tracking-tight text-ink mb-1.5">
            Create an account
          </h1>
          <p className="text-[0.95rem] text-ink-muted">
            Start building your developer portfolio
          </p>
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className={labelClass}>
              Full name
            </label>
            <div className="relative">
              <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-subtle pointer-events-none" />
              <input
                id="name"
                type="text"
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className={inputClass}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className={labelClass}>
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
                className={inputClass}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className={labelClass}>
              Password
            </label>
            <div className="relative">
              <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-subtle pointer-events-none" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className={`${inputClass} pr-12`}
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

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className={labelClass}>
              Confirm password
            </label>
            <div className="relative">
              <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-subtle pointer-events-none" />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                minLength={8}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                className={`${inputClass} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((s) => !s)}
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-subtle hover:text-ink transition-colors"
              >
                {showConfirmPassword ? (
                  <FiEyeOff className="w-5 h-5" />
                ) : (
                  <FiEye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Create Account */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-field bg-black text-white text-[0.95rem] font-semibold tracking-tight shadow-md transition hover:bg-gray-800 hover:-translate-y-px active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Creating account…
              </>
            ) : (
              <>
                <TbArrowRight className="w-5 h-5" />
                Create Account
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-ink-muted mt-7">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-brand hover:text-brand-hover hover:underline transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
