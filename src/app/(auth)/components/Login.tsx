"use client";

import { useState, FormEvent } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import { HiOutlineEnvelope, HiOutlineLockClosed } from "react-icons/hi2";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { TbArrowRight } from "react-icons/tb";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { setMode } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Connect backend API
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Signed in successfully!");
    }, 800);
  };

  return (
    <div className="w-full bg-white border border-neutral-200 shadow-2xl p-8 sm:p-10">
      {/* Brand & Metadata */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-100">
        <span className="text-2xl font-bold tracking-tight text-black">
          DevFolio<span className="text-[#EA6F53]">.</span>
        </span>
        <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
          // IDENTITY_ACCESS
        </span>
      </div>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-black mb-1.5">
          Welcome back
        </h1>
      </header>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-2"
          >
            Email Address
          </label>
          <div className="relative">
            <HiOutlineEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="developer@domain.com"
              className="w-full pl-11 pr-4 py-3 text-sm bg-neutral-50 text-black placeholder:text-neutral-400 rounded-none border border-neutral-200 outline-none transition focus:border-black focus:bg-white"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-2"
          >
            Password
          </label>
          <div className="relative">
            <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full pl-11 pr-12 py-3 text-sm bg-neutral-50 text-black placeholder:text-neutral-400 rounded-none border border-neutral-200 outline-none transition focus:border-black focus:bg-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black transition-colors"
            >
              {showPassword ? (
                <FiEyeOff className="w-4 h-4" />
              ) : (
                <FiEye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Forgot password */}
        <div className="flex justify-end -mt-1">
          <button
            type="button"
            className="text-xs font-mono text-neutral-500 hover:text-[#EA6F53] transition-colors"
          >
            Forgot password?
          </button>
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-none bg-black text-white text-xs font-mono uppercase tracking-wider transition hover:bg-neutral-800 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Verifying credentials…
            </>
          ) : (
            <>
              <span>Sign In</span>
              <TbArrowRight className="w-4 h-4 text-[#EA6F53]" />
            </>
          )}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-neutral-400 pt-1">
          <span className="flex-1 h-px bg-neutral-200" />
          or continue with
          <span className="flex-1 h-px bg-neutral-200" />
        </div>

        {/* OAuth Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => alert("GitHub OAuth Flow")}
            className="w-full inline-flex items-center justify-center gap-2.5 py-3 px-4 rounded-none bg-neutral-50 hover:bg-neutral-100 text-black text-xs font-mono uppercase tracking-wider border border-neutral-200 transition"
          >
            <FaGithub className="w-4 h-4" />
            GitHub
          </button>
          <button
            type="button"
            onClick={() => alert("Google OAuth Flow")}
            className="w-full inline-flex items-center justify-center gap-2.5 py-3 px-4 rounded-none bg-neutral-50 hover:bg-neutral-100 text-black text-xs font-mono uppercase tracking-wider border border-neutral-200 transition"
          >
            <FaGoogle className="w-4 h-4" />
            Google
          </button>
        </div>
      </form>

      {/* Switch to Register */}
      <p className="text-center text-xs text-neutral-500 mt-8 pt-4 border-t border-neutral-100">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={() => setMode("register")}
          className="font-semibold text-black hover:text-[#EA6F53] underline transition-colors ml-1"
        >
          Sign up
        </button>
      </p>
    </div>
  );
}
