"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { DASHBOARD_NAV_ITEMS } from "./navigation";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const toast = useToast();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await logout();
      toast.info("Signed out successfully.");
      router.replace("/");
    } catch {
      toast.error("Failed to sign out. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <aside
      className="hidden md:flex flex-col w-64 border-r border-neutral-200 bg-white min-h-screen shrink-0 select-none sticky top-0 h-screen"
      aria-label="Dashboard Sidebar Navigation"
    >
      {/* Brand Header */}
      <div className="p-6 border-b border-neutral-200">
        <Link
          href="/dashboard"
          className="inline-block text-xl font-bold tracking-tight text-black focus-visible:outline-2 focus-visible:outline-black"
        >
          DevFolio<span className="text-[#EA6F53]">.</span>
        </Link>
        <div className="mt-1 text-[10px] font-mono uppercase tracking-widest text-neutral-400">
          <span>{"// DEVELOPER_WORKSPACE"}</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav
        className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto"
        aria-label="Main Navigation"
      >
        {DASHBOARD_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center justify-between px-3.5 py-2.5 text-xs transition-colors rounded-none border ${
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
                className={`text-[9px] font-mono tracking-wider transition-colors ${
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

      {/* User Section & Logout Action */}
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
    </aside>
  );
}
