# 📋 DevFolio Client — Implementation & UI/UX Tracker

This document tracks all frontend components, user authentication workflows, state management, design tokens, and pages implemented in **`DevFolio_client`**.

---

## 🎨 UI/UX Design System & Foundations

- **Aesthetic**: Minimalist developer-centric aesthetic with monospace metadata accents, sharp borders, clean contrast, and high-visibility status indicators.
- **Brand Colors**:
  - Primary Dark: `#000000`, `#171717`, `#231f20`
  - Neutral Backgrounds: `#ffffff`, `#fafafa`, `#f7f7f8`
  - Accent Color: `#EA6F53` (DevFolio dot accent)
  - Success: `#059669` (Emerald 600), `#ecfdf5`
  - Destructive: `#dc2626` (Red 600), `#fef2f2`
  - Warning / Lockout: `#d97706` (Amber 600), `#fffbeb`
- **Typography**: Inter/Geist Sans for primary content; monospace (`font-mono`) for terminal headers, codes, timers, and metadata.

---

## 🧩 Component & Feature Inventory

### 1. Global State & Services

- **`src/lib/api.ts`**:
  - Centralized fetch client configured with `credentials: "include"` for HttpOnly `rt` cookies.
  - In-memory `accessToken` storage.
  - Automatic silent refresh mechanism on HTTP 401 responses.
  - Standardized error extraction (status code, message, error details).
- **`src/context/AuthContext.tsx`**:
  - State: `user`, `isAuthenticated`, `isLoading`, `isModalOpen`, `mode`, `pendingEmail`.
  - Modes: `"login" | "register" | "verify-otp" | "forgot-password"`.
  - Actions: `register`, `verifyOtp`, `resendOtp`, `login`, `logout`, `forgotPassword`, `refreshUser`.
  - User model updated with `githubAccount?: { id?: string; githubId?: string; login: string } | null`.
  - Automatic silent session hydration on initial application mount via `api.refreshToken()` + `GET /api/v1/auth/me`.
- **`src/context/ToastContext.tsx`**:
  - Custom notification system (`toast.success`, `toast.error`, `toast.info`).
  - Terminal-style metadata badge (`// success`, `// error`, `// info`).
  - Smooth animation, auto-dismissal (4.5s), manual close action, and screen-reader accessibility.
- **`src/app/components/OAuthNotificationHandler.tsx`**:
  - Global listener parsing OAuth callback parameters (`github_link=success`, `auth_error`).
  - Whitelist mapping of backend error codes to sanitized messages.
  - Triggers `refreshUser()` on link success to update connected status.
  - Cleans query parameters via `window.history.replaceState` without full reload.

---

### 2. Modal Views & Navigation Components

| Component                | Responsibility                         | Key Features                                                                                                                                                                                                                                                                            |
| ------------------------ | -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`AuthModal.tsx`**      | Unified authentication modal container | Dynamic terminal header (`// CANDIDATE_REGISTER`, `// VERIFY_SECURITY_CODE`, `// IDENTITY_AUTH`, `// RECOVER_ACCESS`), keyboard ESC dismiss, backdrop lock.                                                                                                                             |
| **`Registration.tsx`**   | New candidate registration form        | Full name, email, password, confirm password, live password criteria checklist (8+ chars, letter, digit), Terms of Service checkbox (`AUTH-03`), auto-switches to OTP verification on submit, "Continue with GitHub" OAuth redirect.                                                    |
| **`VerifyOtp.tsx`**      | 6-digit OTP verification screen        | 6 individual monospace input boxes, auto-focus next on type, backspace navigation, clipboard paste support, 10m expiry timer, 60s resend cooldown timer (`AUTH-05`), "Edit email" option.                                                                                               |
| **`Login.tsx`**          | Identity authentication form           | Email, password (toggle visibility), automatic redirect to OTP if account is unverified (`AUTH-09`), live 15m countdown if locked out (`AUTH-13`), forgot password link, "Continue with GitHub" button with loading state.                                                              |
| **`ForgotPassword.tsx`** | Password recovery request form         | Email input, single-click request dispatch, confirmation card with "Check your inbox" notice, return to sign in.                                                                                                                                                                        |
| **`Navbar.tsx`**         | Desktop & Mobile Navigation Header     | Brand logo, navigation links, Sign In / Get Started actions for guests, Authenticated user popover menu showing user details and GitHub integration status badge (`CONNECTED` with `@login` handle vs `NOT LINKED` with "Connect GitHub" action triggering `/api/v1/auth/github/link`). |

---

### 3. Dashboard Shell & Workspace Routing

| Component / Route            | Responsibility                        | Key Features                                                                                                                                                                                                                                   |
| ---------------------------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`(dashboard)/layout.tsx`** | Shared authenticated layout           | Enforces `AuthGuard` protection across all dashboard subroutes, integrates desktop sidebar and mobile navigation drawer.                                                                                                                       |
| **`AuthGuard.tsx`**          | Route protection component            | Displays terminal-style loading indicator during session hydration, admits authenticated users (`isAuthenticated && !!user`), redirects guests to `/` with `openModal("login")`, zero token leakage.                                           |
| **`DashboardSidebar.tsx`**   | Persistent desktop navigation sidebar | Brand logo, active route highlighting via `usePathname()`, metadata tags, user identity card, and secure sign-out trigger with toast feedback.                                                                                                 |
| **`DashboardMobileNav.tsx`** | Mobile header & accessible drawer     | Responsive top bar with hamburger button, backdrop overlay, escape key handling, body scroll locking, and accessible ARIA attributes.                                                                                                          |
| **`navigation.ts`**          | Single source of truth for nav items  | Configures items, Lucide icons, routes, and terminal tags for Dashboard, Resume, Interview, Profile, and Settings.                                                                                                                             |
| **`/dashboard`**             | Command center overview               | Personalized greeting (`user.fullName`), terminal tags, and two prominent feature cards (Resume and Interview) linking directly to respective tracks.                                                                                          |
| **`/resume`**                | Resume track placeholder              | Meaningful heading, feature description, and consistent placeholder state (`// PIPELINE_STAGED`).                                                                                                                                              |
| **`/interview`**             | Interview track placeholder           | Meaningful heading, feature description, and consistent placeholder state (`// ARENA_STAGED`).                                                                                                                                                 |
| **`/profile`**               | Developer Profile Management          | Full editing for Basic Info, Skills (max 30, deduplicated), Education (add/edit/delete, 1-5 entries), Languages (proficiency level, 1-8 entries), Core Technology dropdown, GitHub link status, and dynamic 6-section completion progress bar. |
| **`/settings`**              | Account & Security Settings           | Password change form with Argon2 verification and live strength criteria, global and local session revocation with confirmation modal dialog, and account overview.                                                                            |

---

## 📂 Client File Directory

```
DevFolio_client/
├── landing_page_components/
│   └── Navbar.tsx               # Desktop & mobile navbar with GitHub integration popover & Dashboard link
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   └── components/
│   │   │       ├── AuthModal.tsx        # Master authentication modal container
│   │   │       ├── ForgotPassword.tsx   # Password reset request form
│   │   │       ├── Login.tsx            # Sign in form with lockout & GitHub OAuth action
│   │   │       ├── Registration.tsx     # Sign up form with terms checkbox & GitHub OAuth action
│   │   │       └── VerifyOtp.tsx        # 6-box OTP entry with countdown & resend cooldown
│   │   ├── (dashboard)/
│   │   │   ├── components/
│   │   │   │   ├── AuthGuard.tsx          # Session guard, loading shell, unauthenticated redirect
│   │   │   │   ├── DashboardMobileNav.tsx # Mobile top bar + accessible drawer + escape listener
│   │   │   │   ├── DashboardSidebar.tsx   # Persistent desktop sidebar + active route styling
│   │   │   │   └── navigation.ts          # Central nav config (Dashboard, Resume, Interview, Profile, Settings)
│   │   │   ├── dashboard/page.tsx         # Overview page with personalized greeting & 2 feature cards
│   │   │   ├── interview/page.tsx         # AI Technical Interview Arena placeholder
│   │   │   ├── layout.tsx                 # Shared authenticated shell layout
│   │   │   ├── profile/page.tsx           # Developer profile placeholder & identity details
│   │   │   ├── resume/page.tsx            # Evidence-backed resume builder placeholder
│   │   │   └── settings/page.tsx          # Account settings & session revocation placeholder
│   │   ├── components/
│   │   │   └── OAuthNotificationHandler.tsx # Notification & address bar sanitization handler
│   │   ├── reset-password/
│   │   │   ├── ResetPasswordContent.tsx # Reset password form, live checklist & token handler
│   │   │   └── page.tsx                 # Suspense boundary & SEO metadata wrapper
│   │   ├── globals.css                  # Global Tailwind utility rules
│   │   ├── layout.tsx                   # Root layout with ToastProvider, AuthProvider, and OAuthNotificationHandler
│   │   └── page.tsx                     # Landing page with interactive hero, pricing, FAQs
│   ├── context/
│   │   ├── AuthContext.tsx              # React Context for authentication state & actions
│   │   └── ToastContext.tsx             # Custom toast notification system
│   └── lib/
│       └── api.ts                       # Fetch wrapper with Bearer token, refresh handling & OAuth URLs
└── package.json
```

---

## 🧪 Verification & Build Status

- **TypeScript Compilation**: `npx tsc --noEmit` $\rightarrow$ **0 errors**.
- **Biome Linter Check**: `npx @biomejs/biome check src/app/(dashboard)` $\rightarrow$ **10 files checked, 0 errors**.
- **Zero Browser Storage Leakage**: Verified zero usage of `localStorage` or `sessionStorage`. All tokens handled via HttpOnly cookies and ephemeral memory.
