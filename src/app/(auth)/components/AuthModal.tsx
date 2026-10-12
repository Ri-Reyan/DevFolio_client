"use client";

import { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import LoginPage from "./Login";
import { useAuth } from "@/context/AuthContext";

const AuthModal = () => {
  const { isModalOpen, closeModal, mode, setMode } = useAuth();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen, closeModal]);

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={closeModal}
      />

      {/* Modal Dialog Container */}
      <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in-95 duration-150">
        {/* Close Button */}
        <button
          onClick={closeModal}
          aria-label="Close modal"
          className="absolute right-4 top-4 p-1 text-neutral-400 hover:text-black transition z-20"
        >
          <IoClose className="w-5 h-5" />
        </button>

        {/* View Switch: Login OR Registration Placeholder */}
        {mode === "login" ? (
          <LoginPage />
        ) : (
          /* Registration Placeholder (যেখানে টিমমেটের কম্পোনেন্ট বসবে) */
          <div className="w-full bg-white border border-neutral-200 shadow-2xl p-8 sm:p-10 text-center">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-100">
              <span className="text-2xl font-bold tracking-tight text-black">
                DevFolio<span className="text-[#EA6F53]">.</span>
              </span>
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
                // REGISTRATION_SLOT
              </span>
            </div>

            <h2 className="text-xl font-bold tracking-tight text-black mb-2">
              Create an account
            </h2>
            <p className="text-xs text-neutral-500 font-light mb-8 max-w-xs mx-auto">
              Registration component is currently being crafted by teammate.
              Stay tuned!
            </p>

            <button
              onClick={() => setMode("login")}
              className="text-xs font-mono uppercase tracking-wider text-[#EA6F53] hover:underline"
            >
              ← Back to Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
