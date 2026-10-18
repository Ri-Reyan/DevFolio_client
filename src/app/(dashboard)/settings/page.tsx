"use client";

import {
  AlertTriangle,
  Check,
  Eye,
  EyeOff,
  KeyRound,
  Lock,
  LogOut,
  ShieldCheck,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { FaGithub } from "react-icons/fa6";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { api } from "@/lib/api";

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const toast = useToast();
  const router = useRouter();

  // Password Change Form State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // Session Management State
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isRevokingAll, setIsRevokingAll] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  // Live Password Criteria Verification
  const hasMinLength = newPassword.length >= 8 && newPassword.length <= 128;
  const hasLetter = /[a-zA-Z]/.test(newPassword);
  const hasDigit = /[0-9]/.test(newPassword);
  const passwordsMatch =
    newPassword.length > 0 && newPassword === confirmPassword;
  const isFormValid =
    hasMinLength &&
    hasLetter &&
    hasDigit &&
    passwordsMatch &&
    currentPassword.trim().length > 0;

  const handleChangePassword = async (e: FormEvent) => {
    e.preventDefault();
    setPasswordError("");

    if (!currentPassword) {
      setPasswordError("Current password is required.");
      return;
    }

    if (!hasMinLength || !hasLetter || !hasDigit) {
      setPasswordError(
        "New password must be at least 8 characters and contain at least one letter and one number.",
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirmation do not match.");
      return;
    }

    if (currentPassword === newPassword) {
      setPasswordError("New password must be different from current password.");
      return;
    }

    setIsChangingPassword(true);
    try {
      const res = await api.post("/auth/change-password", {
        currentPassword,
        newPassword,
      });

      if (res.success) {
        toast.success(
          res.message ||
            "Password updated successfully. Other active sessions revoked.",
        );
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err: unknown) {
      const msg =
        err && typeof err === "object" && "message" in err
          ? String((err as { message: unknown }).message)
          : "Failed to change password. Please check your current password.";
      setPasswordError(msg);
      toast.error(msg);
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleSignOutCurrent = async () => {
    if (isSigningOut) return;
    setIsSigningOut(true);
    try {
      await logout(false);
      toast.info("Signed out successfully.");
      router.replace("/");
    } catch {
      toast.error("Failed to sign out. Please try again.");
    } finally {
      setIsSigningOut(false);
    }
  };

  const handleSignOutEverywhere = async () => {
    if (isRevokingAll) return;
    setIsRevokingAll(true);
    try {
      await logout(true);
      setIsConfirmModalOpen(false);
      toast.info("All active sessions across all devices have been revoked.");
      router.replace("/");
    } catch {
      toast.error("Failed to revoke sessions. Please try again.");
    } finally {
      setIsRevokingAll(false);
    }
  };

  return (
    <div className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full space-y-8">
      {/* Top Header */}
      <div className="border-b border-neutral-200 pb-6 space-y-1">
        <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
          <span>{"// ACCOUNT_SETTINGS"}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-black">
          Account & Security Settings
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
          Manage your authentication credentials, session security, and account
          preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Account Overview & Integrations */}
        <div className="lg:col-span-1 space-y-6">
          {/* Identity Card */}
          <section className="bg-white border border-neutral-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
              <ShieldCheck className="w-4 h-4 text-[#EA6F53]" />
              <h2 className="text-xs font-mono uppercase tracking-widest text-black font-semibold">
                Account Identity
              </h2>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div>
                <span className="text-neutral-400 block text-[10px] uppercase">
                  EMAIL:
                </span>
                <span className="font-semibold text-black break-all">
                  {user?.email}
                </span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px] uppercase">
                  FULL_NAME:
                </span>
                <span className="font-semibold text-black">
                  {user?.fullName || "Not specified"}
                </span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px] uppercase">
                  ROLE:
                </span>
                <span className="font-semibold text-black uppercase">
                  {user?.role}
                </span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px] uppercase">
                  ACCOUNT_STATUS:
                </span>
                <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-600 uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {user?.status}
                </span>
              </div>
            </div>
          </section>

          {/* Connected GitHub Account */}
          <section className="bg-white border border-neutral-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
              <FaGithub className="w-4 h-4 text-black" />
              <h2 className="text-xs font-mono uppercase tracking-widest text-black font-semibold">
                OAuth Connection
              </h2>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 font-mono text-[10px] uppercase">
                  PROVIDER
                </span>
                <span className="font-mono text-black font-semibold">
                  GitHub
                </span>
              </div>

              {user?.githubAccount?.login ? (
                <div className="p-3 bg-neutral-50 border border-neutral-200 flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-xs text-black">
                    <FaGithub className="w-3.5 h-3.5" />
                    <span>@{user.githubAccount.login}</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-600 font-medium">
                    Verified
                  </span>
                </div>
              ) : (
                <div className="p-3 bg-neutral-50 border border-neutral-200 text-neutral-500 font-mono text-[11px]">
                  No GitHub account linked yet.
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Column: Password Change & Session Controls */}
        <div className="lg:col-span-2 space-y-8">
          {/* Section 1: Password Change Form */}
          <section className="bg-white border border-neutral-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
              <KeyRound className="w-4 h-4 text-[#EA6F53]" />
              <h2 className="text-xs font-mono uppercase tracking-widest text-black font-semibold">
                Change Password
              </h2>
            </div>

            <form
              onSubmit={handleChangePassword}
              className="space-y-4 max-w-lg"
            >
              {passwordError && (
                <div className="p-3 border border-red-200 bg-red-50 text-red-700 text-xs font-mono">
                  {passwordError}
                </div>
              )}

              {/* Current Password */}
              <div>
                <label
                  htmlFor="field-currentPassword"
                  className="block text-neutral-500 font-mono text-[10px] uppercase mb-1"
                >
                  Current Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="field-currentPassword"
                    type={showCurrent ? "text" : "password"}
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter existing password"
                    className="w-full px-3 py-2 pr-10 border border-neutral-300 focus:border-black focus:outline-none transition-colors text-xs font-sans"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black transition-colors"
                    aria-label={showCurrent ? "Hide password" : "Show password"}
                  >
                    {showCurrent ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label
                  htmlFor="field-newPassword"
                  className="block text-neutral-500 font-mono text-[10px] uppercase mb-1"
                >
                  New Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="field-newPassword"
                    type={showNew ? "text" : "password"}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new strong password"
                    className="w-full px-3 py-2 pr-10 border border-neutral-300 focus:border-black focus:outline-none transition-colors text-xs font-sans"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black transition-colors"
                    aria-label={showNew ? "Hide password" : "Show password"}
                  >
                    {showNew ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div>
                <label
                  htmlFor="field-confirmPassword"
                  className="block text-neutral-500 font-mono text-[10px] uppercase mb-1"
                >
                  Confirm New Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="field-confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    className="w-full px-3 py-2 pr-10 border border-neutral-300 focus:border-black focus:outline-none transition-colors text-xs font-sans"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black transition-colors"
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                  >
                    {showConfirm ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Live Password Strength Criteria */}
              <div className="p-3 bg-neutral-50 border border-neutral-200 space-y-1.5 text-[11px] font-mono">
                <div className="text-[10px] text-neutral-400 uppercase tracking-wider mb-1">
                  PASSWORD REQUIREMENTS
                </div>
                <div className="flex items-center gap-2">
                  {hasMinLength ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <span className="w-3.5 h-3.5 rounded-full border border-neutral-300 inline-block" />
                  )}
                  <span
                    className={
                      hasMinLength ? "text-neutral-800" : "text-neutral-500"
                    }
                  >
                    8 to 128 characters
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {hasLetter ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <span className="w-3.5 h-3.5 rounded-full border border-neutral-300 inline-block" />
                  )}
                  <span
                    className={
                      hasLetter ? "text-neutral-800" : "text-neutral-500"
                    }
                  >
                    At least one letter
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {hasDigit ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <span className="w-3.5 h-3.5 rounded-full border border-neutral-300 inline-block" />
                  )}
                  <span
                    className={
                      hasDigit ? "text-neutral-800" : "text-neutral-500"
                    }
                  >
                    At least one numeric digit
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {passwordsMatch ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <span className="w-3.5 h-3.5 rounded-full border border-neutral-300 inline-block" />
                  )}
                  <span
                    className={
                      passwordsMatch ? "text-neutral-800" : "text-neutral-500"
                    }
                  >
                    Passwords match
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={!isFormValid || isChangingPassword}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-black shadow-xs"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>
                  {isChangingPassword
                    ? "Updating Password…"
                    : "Update Password"}
                </span>
              </button>
            </form>
          </section>

          {/* Section 2: Session Management */}
          <section className="bg-white border border-neutral-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
              <LogOut className="w-4 h-4 text-[#EA6F53]" />
              <h2 className="text-xs font-mono uppercase tracking-widest text-black font-semibold">
                Active Session Management
              </h2>
            </div>

            <div className="space-y-4">
              {/* Current Session */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-neutral-200 bg-neutral-50/50">
                <div className="space-y-0.5">
                  <div className="text-xs font-semibold text-black">
                    Current Device Session
                  </div>
                  <div className="text-[11px] text-neutral-500 font-mono">
                    Signed in as {user?.email}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSignOutCurrent}
                  disabled={isSigningOut}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-neutral-300 hover:border-black bg-white text-black text-xs font-mono uppercase tracking-wider transition-colors disabled:opacity-50 shrink-0"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{isSigningOut ? "Signing out…" : "Sign Out"}</span>
                </button>
              </div>

              {/* Global Revocation */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-red-200/80 bg-red-50/30">
                <div className="space-y-0.5">
                  <div className="text-xs font-semibold text-black">
                    Global Session Revocation
                  </div>
                  <div className="text-[11px] text-neutral-500 font-mono">
                    Revoke active refresh credentials across all other browsers
                    and devices.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsConfirmModalOpen(true)}
                  disabled={isRevokingAll}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-red-300 bg-white text-red-600 hover:bg-red-50 text-xs font-mono uppercase tracking-wider transition-colors disabled:opacity-50 shrink-0"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Sign Out Everywhere</span>
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Confirmation Modal for Global Revocation */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-dialog-title"
            className="w-full max-w-md bg-white border border-neutral-200 shadow-2xl p-6 sm:p-8 space-y-6"
          >
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="w-5 h-5" />
                <h3
                  id="confirm-dialog-title"
                  className="text-xs font-mono uppercase font-bold tracking-wider"
                >
                  Confirm Global Revocation
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsConfirmModalOpen(false)}
                className="text-neutral-400 hover:text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-neutral-600 leading-relaxed font-light">
              <p>
                Are you sure you want to revoke all active sessions? You will be
                signed out from all devices and browsers, requiring fresh
                credentials to sign in.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-neutral-100">
              <button
                type="button"
                onClick={() => setIsConfirmModalOpen(false)}
                className="px-4 py-2 border border-neutral-300 hover:border-black text-xs font-mono uppercase transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSignOutEverywhere}
                disabled={isRevokingAll}
                className="px-5 py-2 bg-red-600 text-white text-xs font-mono uppercase tracking-wider hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {isRevokingAll ? "Revoking…" : "Revoke All Sessions"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
