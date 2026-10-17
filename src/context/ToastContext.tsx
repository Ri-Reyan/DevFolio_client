"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import {
  HiCheckCircle,
  HiExclamationCircle,
  HiInformationCircle,
  HiXMark,
} from "react-icons/hi2";

export type ToastType = "success" | "error" | "info";

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextType {
  toast: {
    success: (message: string) => void;
    error: (message: string) => void;
    info: (message: string) => void;
  };
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (type: ToastType, message: string) => {
      const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      setToasts((prev) => [...prev, { id, type, message }]);

      setTimeout(() => {
        removeToast(id);
      }, 4500);
    },
    [removeToast],
  );

  const toast = {
    success: (msg: string) => addToast("success", msg),
    error: (msg: string) => addToast("error", msg),
    info: (msg: string) => addToast("info", msg),
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {/* Toast Notification Container */}
      <div
        aria-live="polite"
        className="fixed bottom-4 right-4 z-200 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-3 sm:px-0"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 bg-white border shadow-lg transition-all duration-200 animate-in fade-in slide-in-from-bottom-2 ${
              t.type === "success"
                ? "border-emerald-500/40 text-neutral-900"
                : t.type === "error"
                  ? "border-red-500/40 text-neutral-900"
                  : "border-neutral-300 text-neutral-900"
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {t.type === "success" && (
                <HiCheckCircle className="w-4 h-4 text-emerald-600" />
              )}
              {t.type === "error" && (
                <HiExclamationCircle className="w-4 h-4 text-red-500" />
              )}
              {t.type === "info" && (
                <HiInformationCircle className="w-4 h-4 text-neutral-600" />
              )}
            </div>

            <div className="flex-1 text-xs font-sans leading-relaxed">
              <span className="font-mono text-[10px] uppercase tracking-wider block text-neutral-400 mb-0.5">
                // {t.type}
              </span>
              {t.message}
            </div>

            <button
              type="button"
              onClick={() => removeToast(t.id)}
              className="text-neutral-400 hover:text-black transition-colors shrink-0 p-0.5"
              aria-label="Dismiss toast"
            >
              <HiXMark className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context.toast;
};
