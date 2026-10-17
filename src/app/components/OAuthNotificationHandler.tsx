"use client";

import { useEffect, useRef } from "react";
import { useToast } from "@/context/ToastContext";
import { useAuth } from "@/context/AuthContext";

/**
 * Whitelist mapping of recognized backend OAuth error codes to sanitized user messages.
 * Prevents raw error codes, provider stack traces, or URL injections from being rendered.
 */
const AUTH_ERROR_MESSAGES: Record<string, string> = {
  access_denied: "GitHub authorization was cancelled or denied.",
  oauth_denied: "GitHub authorization was denied by the provider.",
  invalid_state: "Authentication session expired or invalid. Please try again.",
  missing_code: "Missing authorization code from GitHub. Please try again.",
  invalid_action: "Invalid authentication action requested.",
  session_mismatch:
    "Your active session did not match the linking request. Please try again.",
  account_suspended: "Your DevFolio account has been suspended.",
  account_conflict:
    "This GitHub account is already linked to another DevFolio user.",
  user_not_found: "DevFolio user account was not found.",
  unverified_email:
    "Your GitHub account does not have a verified email address.",
  malformed_params: "Invalid authentication request parameters.",
  timeout:
    "GitHub service timed out. Please check your connection and try again.",
  oauth_failed: "GitHub authentication failed. Please try again.",
};

export default function OAuthNotificationHandler() {
  const toast = useToast();
  const { refreshUser } = useAuth();
  const hasProcessedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || hasProcessedRef.current) return;

    const searchParams = new URLSearchParams(window.location.search);
    const githubLink = searchParams.get("github_link");
    const authError = searchParams.get("auth_error");

    // Only process if recognizable OAuth parameters are present
    if (!githubLink && !authError) return;

    hasProcessedRef.current = true;

    // 1. Handle account linking outcome
    if (githubLink === "success") {
      toast.success("GitHub account connected successfully!");
      // Refresh current user session profile data to update GitHub connection UI
      refreshUser();
    }

    // 2. Handle sanitized OAuth error codes
    if (authError) {
      const sanitizedMessage =
        AUTH_ERROR_MESSAGES[authError] ||
        "GitHub authentication failed. Please try again.";
      toast.error(sanitizedMessage);
    }

    // 3. Remove handled OAuth parameters from the address bar without triggering navigation/reload
    searchParams.delete("github_link");
    searchParams.delete("auth_error");

    const remainingQuery = searchParams.toString();
    const cleanUrl =
      window.location.pathname +
      (remainingQuery ? `?${remainingQuery}` : "") +
      window.location.hash;

    window.history.replaceState(null, "", cleanUrl);
  }, [toast, refreshUser]);

  return null;
}
