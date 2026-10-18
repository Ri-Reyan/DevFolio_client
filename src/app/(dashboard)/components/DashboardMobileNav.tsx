"use client";

import { LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { DASHBOARD_NAV_ITEMS } from "./navigation";

export default function DashboardMobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const toast = useToast();

  // Close drawer on route change
  useEffect(() => {
    if (pathname) {
      setIsOpen(false);
    }
  }, [pathname]);

  // Lock body scroll and register Escape key listener when drawer is open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await logout();
      setIsOpen(false);
      toast.info("Signed out successfully.");
      router.replace("/");
    } catch {
      toast.error("Failed to sign out. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="md:hidden sticky top-0 z-40 bg-white border-b border-neutral-200">
      {/* Top Mobile Bar */}
      <div className="flex items-center justify-between px-4 h-14">
        <Link
          href="/dashboard"
          className="text-lg font-bold tracking-tight text-black focus-visible:outline-2 focus-visible:outline-black"
        >
          DevFolio<span className="text-[#EA6F53]">.</span>
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="p-2 text-neutral-600 hover:text-black hover:bg-neutral-100 border border-neutral-200 transition-colors focus-visible:outline-2 focus-visible:outline-black"
          aria-label="Open navigation menu"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation-drawer"
        >
          <Menu className="w-5 h-5 text-black" />
        </button>
      </div>

      {/* Drawer Overlay & Content */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div
            id="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Drawer"
            className="relative w-full max-w-xs bg-white h-full flex flex-col border-r border-neutral-200 shadow-2xl z-10 overflow-y-auto"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-200">
              <div>
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-bold tracking-tight text-black focus-visible:outline-2 focus-visible:outline-black"
                >
                  DevFolio<span className="text-[#EA6F53]">.</span>
                </Link>
                <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                  <span>{"// NAVIGATION"}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-neutral-600 hover:text-black hover:bg-neutral-100 border border-neutral-200 transition-colors focus-visible:outline-2 focus-visible:outline-black"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5 text-black" />
              </button>
            </div>

            {/* Navigation Items */}
            <nav
              className="flex-1 p-3 space-y-1"
              aria-label="Mobile Navigation"
            >
              {DASHBOARD_NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/dashboard" &&
                    pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`group flex items-center justify-between px-3.5 py-2.5 text-xs transition-colors border ${
                      isActive
                        ? "bg-black text-white border-black font-medium"
                        : "text-neutral-600 hover:text-black hover:bg-neutral-100 border-transparent"
                    } focus-visible:outline-2 focus-visible:outline-black`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive
                            ? "text-[#EA6F53]"
                            : "text-neutral-500 group-hover:text-black"
                        }`}
                      />
                      <span className="truncate">{item.name}</span>
                    </div>
                    <span
                      className={`text-[9px] font-mono tracking-wider ${
                        isActive
                          ? "text-neutral-300"
                          : "text-neutral-400 group-hover:text-neutral-600"
                      }`}
                    >
                      {item.tag}
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* User Profile & Logout */}
            <div className="p-4 border-t border-neutral-200 bg-neutral-50/50 space-y-3">
              {user && (
                <div className="p-2.5 bg-white border border-neutral-200">
                  <div className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 mb-0.5">
                    <span>{"// ACTIVE_USER"}</span>
                  </div>
                  <div className="text-xs font-semibold text-black truncate">
                    {user.fullName || "Developer"}
                  </div>
                  <div className="text-[11px] text-neutral-500 font-mono truncate">
                    {user.email}
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-mono text-neutral-600 hover:text-red-600 hover:bg-red-50 border border-neutral-200 hover:border-red-200 transition-colors disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-black"
                aria-label="Sign out of DevFolio"
              >
                <div className="flex items-center gap-2">
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{isLoggingOut ? "Signing out…" : "Sign Out"}</span>
                </div>
                <span className="text-[9px] text-neutral-400 uppercase tracking-wider">
                  <span>{"// EXIT"}</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
