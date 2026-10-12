"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { openModal } = useAuth();

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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
