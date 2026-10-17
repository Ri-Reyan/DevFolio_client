"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub } from "react-icons/fa6";
import { HiOutlineUser, HiChevronDown } from "react-icons/hi2";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { getGitHubLinkUrl } from "@/lib/api";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isConnectingGitHub, setIsConnectingGitHub] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  const { user, isAuthenticated, openModal, logout } = useAuth();
  const toast = useToast();

  // Close account dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(e.target as Node)
      ) {
        setIsAccountMenuOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsAccountMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleConnectGitHub = () => {
    if (isConnectingGitHub) return;
    setIsConnectingGitHub(true);
    window.location.assign(getGitHubLinkUrl());
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsAccountMenuOpen(false);
      setIsOpen(false);
      toast.info("Signed out successfully.");
    } catch {
      toast.error("Failed to sign out. Please try again.");
    }
  };

  return (
    <header className="border-b border-[#00000014] bg-white/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="text-lg sm:text-xl font-bold tracking-tight text-black"
          >
            DevFolio<span className="text-[#EA6F53]">.</span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600">
          <a href="#features" className="hover:text-black transition">
            Features
          </a>
          <a href="#tracks" className="hover:text-black transition">
            Tracks
          </a>
          <a href="#how-it-works" className="hover:text-black transition">
            How it works
          </a>
          <a href="#faqs" className="hover:text-black transition">
            FAQ Matrix
          </a>
          <a href="#pricing" className="hover:text-black transition">
            Pricing
          </a>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated && user ? (
            <div className="relative" ref={accountMenuRef}>
              <button
                type="button"
                onClick={() => setIsAccountMenuOpen((prev) => !prev)}
                className="flex items-center gap-2.5 px-3 py-1.5 border border-neutral-200 hover:border-black transition bg-white text-xs font-mono uppercase tracking-wider"
                aria-expanded={isAccountMenuOpen}
                aria-haspopup="true"
                aria-label="User account and integrations menu"
              >
                <span className="w-5 h-5 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700">
                  <HiOutlineUser className="w-3.5 h-3.5" />
                </span>
                <span className="max-w-32.5 truncate text-black font-medium">
                  {user.fullName || user.email.split("@")[0]}
                </span>
                {user.githubAccount && (
                  <FaGithub className="w-3 h-3 text-neutral-600 ml-0.5" />
                )}
                <HiChevronDown
                  className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${
                    isAccountMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Account & Integrations Dropdown Panel */}
              <AnimatePresence>
                {isAccountMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-80 bg-white border border-neutral-200 shadow-xl p-4 text-left z-50"
                  >
                    {/* Header */}
                    <div className="pb-3 border-b border-neutral-100">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
                        // ACCOUNT_PROFILE
                      </div>
                      <div className="text-sm font-bold text-black truncate">
                        {user.fullName || "Developer"}
                      </div>
                      <div className="text-xs text-neutral-500 font-mono truncate">
                        {user.email}
                      </div>
                    </div>

                    {/* Dashboard Navigation Shortcut */}
                    <div className="py-2 border-b border-neutral-100">
                      <Link
                        href="/dashboard"
                        onClick={() => setIsAccountMenuOpen(false)}
                        className="w-full flex items-center justify-between text-xs font-mono text-black hover:text-[#EA6F53] transition py-1"
                      >
                        <span className="font-semibold">Go to Dashboard</span>
                        <span className="text-[10px] text-neutral-400">→</span>
                      </Link>
                    </div>

                    {/* GitHub Integration Section */}
                    <div className="py-3 border-b border-neutral-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                          // GITHUB_INTEGRATION
                        </span>
                        {user.githubAccount?.login ? (
                          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            CONNECTED
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-neutral-500 bg-neutral-100 px-2 py-0.5 border border-neutral-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                            NOT LINKED
                          </span>
                        )}
                      </div>

                      {user.githubAccount?.login ? (
                        <div className="flex items-center justify-between p-2.5 bg-neutral-50 border border-neutral-200">
                          <div className="flex items-center gap-2">
                            <FaGithub className="w-4 h-4 text-black" />
                            <span className="text-xs font-mono font-medium text-black">
                              @{user.githubAccount.login}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-neutral-500">
                            Verified
                          </span>
                        </div>
                      ) : (
                        <div className="space-y-2.5">
                          <p className="text-[11px] text-neutral-500 leading-relaxed font-light">
                            Connect your GitHub account to verify telemetry,
                            repositories, and AST analysis. You will be
                            redirected to GitHub to authorize the connection.
                          </p>
                          <button
                            type="button"
                            onClick={handleConnectGitHub}
                            disabled={isConnectingGitHub}
                            className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Connect GitHub account"
                          >
                            {isConnectingGitHub ? (
                              <>
                                <span className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                <span>Redirecting to GitHub…</span>
                              </>
                            ) : (
                              <>
                                <FaGithub className="w-3.5 h-3.5" />
                                <span>Connect GitHub</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Sign Out */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full text-left text-xs font-mono text-neutral-600 hover:text-red-600 transition py-1.5 flex items-center justify-between"
                      >
                        <span>Sign Out</span>
                        <span className="text-[10px] text-neutral-400">
                          // DISCONNECT
                        </span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <button
                onClick={() => openModal("login")}
                className="text-sm font-medium px-4 py-2 hover:opacity-75 transition"
              >
                Sign in
              </button>
              <button
                onClick={() => openModal("register")}
                className="text-sm font-medium bg-black text-white px-5 py-2.5 rounded-none hover:bg-neutral-800 transition shadow-sm"
              >
                Get Started
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <span
            className={`w-6 h-0.5 bg-black transition-transform duration-200 ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-black transition-opacity duration-200 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-black transition-transform duration-200 ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-neutral-200 bg-white px-6 py-6 flex flex-col gap-4 shadow-xl"
          >
            <nav className="flex flex-col gap-4 text-base font-medium text-neutral-700">
              <a
                href="#features"
                onClick={() => setIsOpen(false)}
                className="hover:text-black transition py-1 border-b border-neutral-100"
              >
                Features
              </a>
              <a
                href="#tracks"
                onClick={() => setIsOpen(false)}
                className="hover:text-black transition py-1 border-b border-neutral-100"
              >
                Tracks
              </a>
              <a
                href="#how-it-works"
                onClick={() => setIsOpen(false)}
                className="hover:text-black transition py-1 border-b border-neutral-100"
              >
                How it works
              </a>
              <a
                href="#faqs"
                onClick={() => setIsOpen(false)}
                className="hover:text-black transition py-1 border-b border-neutral-100"
              >
                FAQ Matrix
              </a>
              <a
                href="#pricing"
                onClick={() => setIsOpen(false)}
                className="hover:text-black transition py-1 border-b border-neutral-100"
              >
                Pricing
              </a>
            </nav>

            <div className="flex flex-col gap-3 pt-4 border-t border-neutral-200">
              {isAuthenticated && user ? (
                <div className="space-y-4">
                  <div className="p-3 bg-neutral-50 border border-neutral-200">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                      // AUTHENTICATED_SESSION
                    </div>
                    <div className="text-sm font-semibold text-black truncate">
                      {user.fullName || "Developer"}
                    </div>
                    <div className="text-xs text-neutral-500 font-mono truncate">
                      {user.email}
                    </div>

                    <div className="mt-3 pt-3 border-t border-neutral-200/60">
                      <Link
                        href="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="w-full flex items-center justify-between text-xs font-mono font-semibold text-black hover:text-[#EA6F53] transition py-1"
                      >
                        <span>Go to Dashboard</span>
                        <span className="text-[10px] text-neutral-400">→</span>
                      </Link>
                    </div>

                    <div className="mt-3 pt-3 border-t border-neutral-200/60">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono uppercase text-neutral-400">
                          GitHub
                        </span>
                        {user.githubAccount?.login ? (
                          <span className="text-[10px] font-mono text-emerald-700">
                            CONNECTED
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono text-neutral-400">
                            NOT LINKED
                          </span>
                        )}
                      </div>

                      {user.githubAccount?.login ? (
                        <div className="flex items-center gap-2 text-xs font-mono text-black">
                          <FaGithub className="w-3.5 h-3.5" />
                          <span>@{user.githubAccount.login}</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={handleConnectGitHub}
                          disabled={isConnectingGitHub}
                          className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition disabled:opacity-50"
                        >
                          {isConnectingGitHub ? (
                            <span>Redirecting…</span>
                          ) : (
                            <>
                              <FaGithub className="w-3.5 h-3.5" />
                              <span>Connect GitHub</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full text-center text-xs font-mono text-red-600 border border-red-200 py-2 hover:bg-red-50 transition"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => {
                      openModal("login");
                      setIsOpen(false);
                    }}
                    className="text-sm font-medium px-4 py-2 hover:opacity-75 transition"
                  >
                    Sign in
                  </button>
                  <button
                    onClick={() => {
                      openModal("register");
                      setIsOpen(false);
                    }}
                    className="text-sm font-medium bg-black text-white px-5 py-2.5 rounded-none hover:bg-neutral-800 transition shadow-sm"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
