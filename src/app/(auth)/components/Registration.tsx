import { useAuth } from "@/context/AuthContext";
import React from "react";

const Registration = () => {
  const { setMode } = useAuth();

  return (
    <div>
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
          Registration component is currently being crafted by teammate. Stay
          tuned!
        </p>

        <button
          onClick={() => setMode("login")}
          className="text-xs font-mono uppercase tracking-wider text-[#EA6F53] hover:underline"
        >
          ← Back to Sign In
        </button>
      </div>
    </div>
  );
};

export default Registration;
