"use client";

import { useState, FormEvent } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import {
  HiOutlineEnvelope,
  HiOutlineLockClosed,
  HiOutlineUser,
} from "react-icons/hi2";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { TbArrowRight } from "react-icons/tb";
import { useAuth } from "@/context/AuthContext";

const Registration = () => {
  const { setMode } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      alert("✨ Account created successfully! Please sign in.");
      setMode("login");
    }, 800);
  };

  return (
    <div className="w-full">
      {/* Brand & Metadata */}
      <div className="flex items-center justify-between mb-5 sm:mb-6 pb-3 border-b border-neutral-100">
        <span className="text-xl sm:text-2xl font-bold tracking-tight text-black">
          DevFolio<span className="text-[#EA6F53]">.</span>
        </span>
        <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-neutral-400">
          // CANDIDATE_REGISTER
        </span>
      </div>

      {/* Header */}
      <header className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-black mb-1">
          Create an account
        </h1>
        <p className="text-[11px] sm:text-xs text-neutral-500 font-light leading-relaxed">
          Register to build your verified AST-backed developer profile and
          access mock interview arenas.
        </p>
      </header>

      {/* Error Banner */}
      {errorMessage && (
        <div className="mb-4 p-2.5 sm:p-3 bg-red-50 border-l-2 border-red-500 text-[11px] sm:text-xs font-mono text-red-600">
          ERR: {errorMessage}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        {/* Full Name */}
        <div>
          <label
            htmlFor="reg-name"
            className="block text-[11px] sm:text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1"
          >
            Full Name
          </label>
          <div className="relative">
            <HiOutlineUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            <input
              id="reg-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Morgan"
              className="w-full pl-10 pr-3 py-2.5 sm:py-3 text-xs sm:text-sm bg-neutral-50 text-black placeholder:text-neutral-400 rounded-none border border-neutral-200 outline-none transition focus:border-black focus:bg-white"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="reg-email"
            className="block text-[11px] sm:text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1"
          >
            Email Address
          </label>
          <div className="relative">
            <HiOutlineEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            <input
              id="reg-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="developer@domain.com"
              className="w-full pl-10 pr-3 py-2.5 sm:py-3 text-xs sm:text-sm bg-neutral-50 text-black placeholder:text-neutral-400 rounded-none border border-neutral-200 outline-none transition focus:border-black focus:bg-white"
            />
          </div>
        </div>

        {/* Passwords */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
          {/* Password */}
          <div>
            <label
              htmlFor="reg-pass"
              className="block text-[11px] sm:text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <HiOutlineLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              <input
                id="reg-pass"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-9 py-2.5 sm:py-3 text-xs sm:text-sm bg-neutral-50 text-black placeholder:text-neutral-400 rounded-none border border-neutral-200 outline-none transition focus:border-black focus:bg-white"
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

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="reg-confirm-pass"
              className="block text-[11px] sm:text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1"
            >
              Confirm
            </label>
            <div className="relative">
              <HiOutlineLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              <input
                id="reg-confirm-pass"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-3 py-2.5 sm:py-3 text-xs sm:text-sm bg-neutral-50 text-black placeholder:text-neutral-400 rounded-none border border-neutral-200 outline-none transition focus:border-black focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2 py-3 sm:py-3.5 px-4 rounded-none bg-black text-white text-xs font-mono uppercase tracking-wider transition hover:bg-neutral-800 disabled:opacity-70 disabled:cursor-not-allowed mt-1"
        >
          {isSubmitting ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Provisioning…
            </>
          ) : (
            <>
              <span>Create Account</span>
              <TbArrowRight className="w-4 h-4 text-[#EA6F53]" />
            </>
          )}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 py-1 text-[10px] font-mono uppercase tracking-widest text-neutral-400">
          <span className="flex-1 h-px bg-neutral-200" />
          or register with
          <span className="flex-1 h-px bg-neutral-200" />
        </div>

        {/* OAuth Buttons */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => alert("GitHub Registration OAuth")}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-none bg-neutral-50 hover:bg-neutral-100 text-black text-xs font-mono uppercase tracking-wider border border-neutral-200 transition"
          >
            <FaGithub className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>GitHub</span>
          </button>
          <button
            type="button"
            onClick={() => alert("Google Registration OAuth")}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-none bg-neutral-50 hover:bg-neutral-100 text-black text-xs font-mono uppercase tracking-wider border border-neutral-200 transition"
          >
            <FaGoogle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Google</span>
          </button>
        </div>
      </form>

      {/* Switch back to Login */}
      <p className="text-center text-xs text-neutral-500 mt-5 pt-3 border-t border-neutral-100">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => setMode("login")}
          className="font-semibold text-black hover:text-[#EA6F53] underline transition-colors ml-1"
        >
          Sign in
        </button>
      </p>
    </div>
  );
};

export default Registration;
