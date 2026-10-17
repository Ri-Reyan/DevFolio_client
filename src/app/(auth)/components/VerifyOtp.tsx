"use client";

import {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  ClipboardEvent,
} from "react";
import { TbArrowRight, TbArrowBackUp } from "react-icons/tb";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

const OTP_LENGTH = 6;
const EXPIRATION_SECONDS = 600; // 10 minutes (AUTH-04)
const COOLDOWN_SECONDS = 60; // 60 seconds (AUTH-05)

export default function VerifyOtp() {
  const { pendingEmail, verifyOtp, resendOtp, setMode } = useAuth();
  const toast = useToast();

  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [secondsRemaining, setSecondsRemaining] = useState(EXPIRATION_SECONDS);
  const [cooldownRemaining, setCooldownRemaining] = useState(COOLDOWN_SECONDS);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // 10-minute expiration countdown
  useEffect(() => {
    if (secondsRemaining <= 0) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsRemaining]);

  // 60-second resend cooldown countdown
  useEffect(() => {
    if (cooldownRemaining <= 0) return;
    const interval = setInterval(() => {
      setCooldownRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldownRemaining]);

  // Auto-focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleDigitChange = (index: number, val: string) => {
    const char = val.slice(-1);
    if (char && !/^\d$/.test(char)) return;

    const nextDigits = [...digits];
    nextDigits[index] = char;
    setDigits(nextDigits);
    setErrorMessage("");

    // Auto-advance
    if (char && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit if all 6 filled
    if (char && index === OTP_LENGTH - 1 && nextDigits.every((d) => d !== "")) {
      executeVerification(nextDigits.join(""));
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim();
    if (!/^\d{6}$/.test(pasted)) return;

    const newDigits = pasted.split("");
    setDigits(newDigits);
    inputRefs.current[OTP_LENGTH - 1]?.focus();
    executeVerification(pasted);
  };

  const executeVerification = async (codeToVerify: string) => {
    if (codeToVerify.length !== OTP_LENGTH) return;
    setIsVerifying(true);
    setErrorMessage("");

    try {
      await verifyOtp(pendingEmail, codeToVerify);
      toast.success("Email verified! Welcome to DevFolio.");
    } catch (err: any) {
      setErrorMessage(err.message || "Invalid or expired verification code.");
      toast.error(err.message || "Verification failed.");
      // Clear digits for retry
      setDigits(Array(OTP_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (cooldownRemaining > 0 || isResending) return;
    setIsResending(true);
    setErrorMessage("");

    try {
      await resendOtp(pendingEmail);
      toast.success("A fresh verification code has been emailed to you.");
      setCooldownRemaining(COOLDOWN_SECONDS);
      setSecondsRemaining(EXPIRATION_SECONDS);
      setDigits(Array(OTP_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
    } catch (err: any) {
      setErrorMessage(
        err.message || "Could not resend code. Please try again.",
      );
      toast.error(err.message || "Failed to resend OTP.");
    } finally {
      setIsResending(false);
    }
  };

  const isComplete = digits.every((d) => d !== "");

  return (
    <div className="w-full">
      {/* Brand & Metadata */}
      <div className="flex items-center justify-between mb-5 sm:mb-6 pb-3 border-b border-neutral-100">
        <span className="text-xl sm:text-2xl font-bold tracking-tight text-black">
          DevFolio<span className="text-[#EA6F53]">.</span>
        </span>
        <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-neutral-400">
          // VERIFY_SECURITY_CODE
        </span>
      </div>

      {/* Header */}
      <header className="mb-5 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-black mb-1.5">
          Verify your email
        </h1>
        <p className="text-[11px] sm:text-xs text-neutral-500 font-light leading-relaxed">
          We sent a 6-digit verification code to:
        </p>
        <div className="inline-flex items-center gap-1.5 mt-1 px-2.5 py-1 bg-neutral-100 border border-neutral-200 text-xs font-mono text-neutral-800">
          <HiOutlineEnvelope className="w-3.5 h-3.5 text-neutral-500" />
          <span>{pendingEmail || "your email"}</span>
        </div>
      </header>

      {/* Error Banner */}
      {errorMessage && (
        <div className="mb-4 p-2.5 sm:p-3 bg-red-50 border-l-2 border-red-500 text-[11px] sm:text-xs font-mono text-red-600">
          ERR: {errorMessage}
        </div>
      )}

      {/* 6-digit Monospace Input Grid */}
      <div className="my-6">
        <div className="flex justify-between gap-1.5 sm:gap-2">
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleDigitChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              disabled={isVerifying}
              className="w-10 sm:w-12 h-12 sm:h-14 text-center font-mono text-lg sm:text-xl font-bold bg-neutral-50 text-black border border-neutral-300 rounded-none outline-none transition focus:border-black focus:bg-white focus:ring-1 focus:ring-black disabled:opacity-50"
            />
          ))}
        </div>

        {/* Expiry Timer */}
        <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 mt-3 px-0.5">
          <span>
            {secondsRemaining > 0 ? (
              <>
                Expires in:{" "}
                <strong className="text-black">
                  {formatTimer(secondsRemaining)}
                </strong>
              </>
            ) : (
              <span className="text-red-600">
                Code expired. Please request a new code.
              </span>
            )}
          </span>
          <span className="text-neutral-400">// SINGLE_USE</span>
        </div>
      </div>

      {/* Verify Button */}
      <button
        type="button"
        onClick={() => executeVerification(digits.join(""))}
        disabled={!isComplete || isVerifying}
        className="w-full inline-flex items-center justify-center gap-2 py-3 sm:py-3.5 px-4 rounded-none bg-black text-white text-xs font-mono uppercase tracking-wider transition hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
      >
        {isVerifying ? (
          <>
            <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            <span>Verifying…</span>
          </>
        ) : (
          <>
            <span>Confirm & Activate</span>
            <TbArrowRight className="w-4 h-4 text-[#EA6F53]" />
          </>
        )}
      </button>

      {/* Resend Cooldown Section (AUTH-05) */}
      <div className="flex items-center justify-between mt-5 pt-3 border-t border-neutral-100 text-xs">
        <button
          type="button"
          disabled={cooldownRemaining > 0 || isResending}
          onClick={handleResend}
          className="font-mono text-xs text-neutral-700 hover:text-black disabled:text-neutral-400 disabled:cursor-not-allowed underline underline-offset-2 transition-colors"
        >
          {cooldownRemaining > 0
            ? `Resend code (${cooldownRemaining}s)`
            : isResending
              ? "Sending new code…"
              : "Resend verification code"}
        </button>

        <button
          type="button"
          onClick={() => setMode("register")}
          className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-black transition-colors"
        >
          <TbArrowBackUp className="w-3.5 h-3.5" />
          <span>Edit email</span>
        </button>
      </div>
    </div>
  );
}
