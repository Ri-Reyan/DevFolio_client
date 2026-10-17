"use client";

import { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import LoginPage from "./Login";
import Registration from "./Registration";
import VerifyOtp from "./VerifyOtp";
import ForgotPassword from "./ForgotPassword";
import { useAuth } from "@/context/AuthContext";

const AuthModal = () => {
  const { isModalOpen, closeModal, mode } = useAuth();

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

  const getTerminalHeader = () => {
    switch (mode) {
      case "login":
        return "// IDENTITY_AUTH";
      case "register":
        return "// CANDIDATE_REGISTER";
      case "verify-otp":
        return "// VERIFY_SECURITY_CODE";
      case "forgot-password":
        return "// RECOVER_ACCESS";
      default:
        return "// AUTH";
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex flex-col justify-start sm:justify-center items-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs overflow-y-auto">
      {/* Backdrop Area */}
      <div className="fixed inset-0 -z-10" onClick={closeModal} />

      {/* Main Card Wrapper */}
      <div className="w-full max-w-md bg-white border border-neutral-200 shadow-2xl my-auto relative">
        {/* Top Header Action Bar with Static Close Button */}
        <div className="flex items-center justify-between px-6 pt-5 pb-2 border-b border-neutral-100">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
            {getTerminalHeader()}
          </span>
          <button
            type="button"
            onClick={closeModal}
            aria-label="Close modal"
            className="p-1.5 text-neutral-600 hover:text-black hover:bg-neutral-100 border border-neutral-200 transition"
          >
            <IoClose className="w-5 h-5 text-black" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8 pt-4">
          {mode === "login" && <LoginPage />}
          {mode === "register" && <Registration />}
          {mode === "verify-otp" && <VerifyOtp />}
          {mode === "forgot-password" && <ForgotPassword />}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
