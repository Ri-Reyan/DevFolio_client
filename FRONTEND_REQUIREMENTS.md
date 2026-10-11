<div align="center">

# 🎨 DevFolio — Frontend Requirements

**What users see, which pages exist, who can open them, and in what order we build them**

![Doc](https://img.shields.io/badge/doc-requirements-1b8a76?style=for-the-badge)
![Scope](https://img.shields.io/badge/scope-Phase%201%20MVP-0d3b36?style=for-the-badge)
![Audience](https://img.shields.io/badge/audience-frontend%20%2B%20design%20%2B%20QA-blue?style=for-the-badge)
![Source](https://img.shields.io/badge/source-BACKEND__REQUIREMENTS.md-lightgrey?style=for-the-badge)

</div>

> **Reading guide:** This document describes *screens, behaviour and UI states*. It contains no component code, API payloads or database details.
> Business rules are referenced by their backend IDs (e.g. `AUTH-04`) so UI and API stay in sync. Pages have IDs (`P-01`…) for tickets and QA.

---

## 📑 Contents

1. [Overview & UI Objectives](#1-overview--ui-objectives)
2. [User Roles & Page Access Matrix](#2-user-roles--page-access-matrix)
3. [Page-by-Page Functional Breakdown](#3-page-by-page-functional-breakdown)
4. [Key User Journeys & UI State Requirements](#4-key-user-journeys--ui-state-requirements)
5. [Frontend Development Roadmap](#5-frontend-development-roadmap)
6. [Open Questions](#6-open-questions)

---

## 1. Overview & UI Objectives

DevFolio lets a job seeker **prove** their skills through two tracks that share one account:

| Track | What the user does on screen |
|---|---|
| 🧾 **Resume** | Picks 2 GitHub projects + live URLs → watches live progress → reviews AI bullets → exports a PDF |
| 🎤 **Interview** | Picks a technology → answers 10 questions one by one → reads an expertise-percentage report |

### 1.1 UI objectives

| # | Objective | What "good" looks like |
|---|---|---|
| U1 | **Fast first value** | New user goes from landing to a verified, onboarded account in a few minutes, with no dead ends |
| U2 | **Trust through transparency** | Every AI bullet shows where it came from; skipped tests and warnings are always visible, never hidden |
| U3 | **Never lose work** | Onboarding saves per step; long jobs survive a page refresh; answers are never silently dropped |
| U4 | **Calm during waiting** | Slow work (analysis, tests, scoring) always shows progress, stage names and what the user can do meanwhile |
| U5 | **Clear next step** | Every screen, empty state and error tells the user exactly what to do next |
| U6 | **Works on a phone** | All Phase 1 screens are fully usable on a 360 px-wide screen |

### 1.2 Interface scope

| In scope (Phase 1) | Out of scope (later) |
|---|---|
| Landing, legal pages, sign-up/sign-in, OTP, password reset, GitHub sign-in | Voice / avatar interview screens |
| Onboarding, GitHub repo picker, dashboard, settings | Coding-problem editor |
| Resume wizard, live progress, preview/edit, version history, PDF export | DOCX export, template picker, cover letter |
| Interview start, live Q&A, report | Cross-domain "overall" interview |
| Admin panel for interview questions | Billing / plans, public shareable resume |

### 1.3 UX principles

- **One primary action per screen.** Secondary actions are visually quieter.
- **Show limits before they bite.** Daily quota, character counters and cooldown timers are visible *before* the user hits them.
- **Plain language errors.** No error codes shown to users; each maps to a human sentence and a next step (see [§4.3](#43-error--system-message-mapping)).
- **Same pattern everywhere.** One loading style, one empty-state style, one toast style, one confirmation-dialog style.
- **Accessible by default.** Keyboard operable, visible focus, readable contrast, progress changes announced to screen readers.

---

## 2. User Roles & Page Access Matrix

### 2.1 Roles (from backend requirements)

| Role | Lands on after sign-in |
|---|---|
| 👤 **Guest** | — |
| 🙋 **User (unverified)** | Verify-email page |
| ✅ **User (verified)** — onboarding incomplete | Onboarding |
| ✅ **User (verified)** — onboarded | Dashboard |
| 🛡️ **Admin** | Admin panel (Admin uses **only** the admin area plus own settings) |

### 2.2 Access matrix

**Legend:** ✅ allowed · ↪ redirected to the named page · 🚫 "not allowed" page · *Home* = the role's landing page from the table above.

| ID | Page | Route | Guest | Unverified | Verified, not onboarded | Verified, onboarded | Admin |
|---|---|---|:---:|:---:|:---:|:---:|:---:|
| P-01 | Landing | `/` | ✅ | ✅ | ✅ | ✅ | ✅ |
| P-02 | Terms & Privacy | `/terms` `/privacy` | ✅ | ✅ | ✅ | ✅ | ✅ |
| P-03 | Not-found / error | `*` | ✅ | ✅ | ✅ | ✅ | ✅ |
| P-04 | Register | `/register` | ✅ | ↪ Verify | ↪ Home | ↪ Home | ↪ Home |
| P-05 | Login | `/login` | ✅ | ↪ Verify | ↪ Home | ↪ Home | ↪ Home |
| P-06 | Verify email (OTP) | `/verify-email` | ↪ Login | ✅ | ↪ Home | ↪ Home | ↪ Home |
| P-07 | Forgot password | `/forgot-password` | ✅ | ✅ | ✅ | ✅ | ✅ |
| P-08 | Reset password | `/reset-password` | ✅ link | ✅ link | ✅ link | ✅ link | ✅ link |
| P-09 | GitHub return screen | `/auth/github/callback` | ✅ | ✅ | ✅ | ✅ | ✅ |
| P-10 | Onboarding | `/onboarding` | ↪ Login | ↪ Verify | ✅ | ↪ Dashboard | ↪ Admin |
| P-11 | Dashboard | `/dashboard` | ↪ Login | ↪ Verify | ↪ Onboarding | ✅ | ↪ Admin |
| P-12 | GitHub repos | `/github` | ↪ Login | ↪ Verify | ↪ Onboarding | ✅ | 🚫 |
| P-13 | Resume — history | `/resume` | ↪ Login | ↪ Verify | ↪ Onboarding | ✅ | 🚫 |
| P-14 | Resume — new (wizard) | `/resume/new` | ↪ Login | ↪ Verify | ↪ Onboarding | ✅ | 🚫 |
| P-15 | Resume — live progress | `/resume/jobs/:id` | ↪ Login | ↪ Verify | ↪ Onboarding | ✅ | 🚫 |
| P-16 | Resume — preview & edit | `/resume/:id` | ↪ Login | ↪ Verify | ↪ Onboarding | ✅ | 🚫 |
| P-17 | Interview — start & history | `/interview` | ↪ Login | ↪ Verify | ↪ Onboarding | ✅ | 🚫 |
| P-18 | Interview — live session | `/interview/:id` | ↪ Login | ↪ Verify | ↪ Onboarding | ✅ | 🚫 |
| P-19 | Interview — report | `/interview/:id/report` | ↪ Login | ↪ Verify | ↪ Onboarding | ✅ | 🚫 |
| P-20 | Settings | `/settings` | ↪ Login | ↪ Verify | ✅ | ✅ | ✅ (name, avatar & password only) |
| P-21 | Admin — questions | `/admin/questions` | ↪ Login | 🚫 | 🚫 | 🚫 | ✅ |
| P-22 | Admin — question form | `/admin/questions/new` · `/:id` | ↪ Login | 🚫 | 🚫 | 🚫 | ✅ |
| P-23 | Admin — users *(proposed)* | `/admin/users` | ↪ Login | 🚫 | 🚫 | 🚫 | ✅ |

> Opening a page for someone else's data (e.g. another user's resume link) shows the same **not-found** page as a missing page (matches the API behaviour in backend §2.4).

---

## 3. Page-by-Page Functional Breakdown

> The brief mentioned *Doctor Listing / Profiles* — those do not exist in DevFolio. The public area here is Landing + legal pages; the product's real screens are in §3.3.

### 3.1 Public Pages

#### P-01 · Landing page
**Purpose:** explain the product in 10 seconds and drive sign-up.

| Section | Content |
|---|---|
| Hero | One-line promise ("Prove your skills, don't just claim them"), primary CTA **Get started**, secondary **Sign in** |
| Two tracks | Two cards: Resume (proof-based) and Interview (expertise score) with one illustration each |
| How it works | 4 steps: Connect GitHub → Complete profile → Choose a track → Get your result |
| Trust block | "AI never invents facts" explained with a sample bullet showing its evidence |
| Footer | Terms, Privacy, GitHub link |

- Signed-in visitors see the primary CTA change to **Go to dashboard** (or *Continue onboarding* / *Verify email* per state).
- Must load fast and be fully usable on mobile.

#### P-02 · Terms & Privacy
- Plain readable pages. Registration links here (terms acceptance is required — `AUTH-03`).

#### P-03 · Not-found / error page
- Friendly message, a **Back to home** button; never shows technical details. Also used for resources the user does not own.

---

### 3.2 Authentication Views

#### P-04 · Register
| Element | Behaviour |
|---|---|
| Fields | Email, password, "I accept the Terms" checkbox |
| Password help | Live checklist: 8–128 chars, one letter, one digit (`AUTH-02`) |
| Actions | **Create account**, **Continue with GitHub** |
| Success | Go to Verify email, with the email carried over |
| Special case | Already-registered **unverified** email → goes to Verify (a new code is sent, `AUTH-07`); already-registered **verified** email → "Already registered — sign in instead" with a link |

#### P-06 · Verify email (OTP)
| Element | Behaviour |
|---|---|
| Input | 6-digit code, one box per digit, paste-friendly, auto-submit on 6th digit |
| Timers | "Code expires in 10:00" countdown (`AUTH-04`); **Resend** disabled with a 60 s countdown (`AUTH-05`) |
| Feedback | Wrong code → "Wrong code, N attempts left"; after 5 → "Too many attempts, request a new code" |
| Success | Signed in automatically (`AUTH-08`) → Onboarding |
| Also | "Wrong email?" link back to Register |

#### P-05 · Login
| Element | Behaviour |
|---|---|
| Fields | Email, password (show/hide), **Forgot password?** link |
| Actions | **Sign in**, **Continue with GitHub** |
| Errors | One generic "Email or password is incorrect" (`AUTH-13`); after 5 failures show lock message with a live "try again in 14:59" timer |
| Special | Unverified account → sent to Verify (a new code was just emailed, `AUTH-09`); suspended → clear "account suspended" message |
| Success | Redirect to the role's *Home* |

#### P-07 · Forgot password
- Email field → always shows the same confirmation: "If that email exists, we've sent a link" (`AUTH-15`). Resend button with cooldown.

#### P-08 · Reset password
- Opened from email link. Two password fields + strength checklist. Success → "Password changed, sign in again" (all sessions were ended, `AUTH-17`).
- Invalid/expired link → explanation + button to request a new one.

#### P-09 · GitHub return screen
- Short "Connecting to GitHub…" transition. On success → Onboarding or Dashboard (and a repo sync starts, `OAUTH-08`). On failure/cancel → back to Login/Settings with a clear message and a retry button.

---

### 3.3 Signed-in User Views *(added — core product screens)*

#### P-10 · Onboarding (5 steps)
| Step | Content | Notes |
|---|---|---|
| ① Basics | Full name, age (13–100), gender, country | |
| ② Education | 1–5 entries (add/remove) | |
| ③ Experience | 0–10 entries | **Skip** button (`PROF-01`) |
| ④ Skills & languages | Skills as tags (1–30), languages with level (1–8) | |
| ⑤ Expertise | Pick one technology from the offered list | |

- Progress bar + step list; user can go back to any unlocked step.
- **Each step saves on "Next"** and the user resumes at the last unlocked step after leaving (`PROF-02`).
- **Finish** enabled only when ①, ②, ④, ⑤ are done (`PROF-04`); then → Dashboard.
- GitHub connection is offered at the end ("Connect GitHub to build resumes") and can be skipped, but resume features stay locked until connected.

#### P-11 · Dashboard
| Block | Content |
|---|---|
| Header | Greeting, avatar, quick-start buttons: **Build a resume**, **Practice interview** |
| Active work | Banner for an in-progress resume job or interview session with **Continue** |
| Latest resume | The most recent version (title, date, match score if any) and a link to the full history |
| Latest interviews | Up to 2 sessions (technology, %, level, date) |
| Best scores | Best expertise % per technology |
| Quota | "Resume today: 1 of 1 left · Interviews today: 1 of 2 left" (`RES-05`, `INT-04`). A failed or cancelled resume does not use the quota, and an abandoned interview stops counting, so the numbers go back up |

#### P-12 · GitHub repos
- Not connected → connect screen with benefits and **Connect GitHub**.
- Connected → searchable, sortable list (name, description, language, last push, *fork* label). **Sync now** button (disabled with timer during the 60 s cooldown, `GH-03`) and sync status (`Queued / Running / Done / Failed`).
- Empty list → "No public repositories found" with a link to GitHub.

#### P-14 · Resume — new (wizard)
| Step | Content |
|---|---|
| 1. Mode | **Generic** or **Job-tailored** |
| 2. Job description *(tailored only)* | Large text box with live counter (50–10,000 chars, `RES-02`); optional job title and company |
| 3. Projects | Pick **exactly 2** repos (selection counter "1 of 2"); search; forks labelled. With fewer than 2 public repos the wizard is blocked: "You need at least 2 public repositories" (`RES-01`) |
| 4. Live URLs | One **optional** URL per project; inline check that it starts with http/https; helper text "We test this site's performance. Leave it blank to skip the test — your resume won't include performance numbers for that project" (`RES-03`) |
| 5. Review | Summary of choices, quota note, **Generate resume** |

- If an active job exists, the wizard is replaced by a banner linking to that job (`RES-04`).
- Submit is disabled while sending; double-clicks are harmless (`RES-06`).

#### P-15 · Resume — live progress
| Element | Behaviour |
|---|---|
| Overall bar | 0–100 % with a friendly status line |
| Stage list | Project analysis · Performance test (per URL) · Job analysis *(tailored)* · Writing · Verifying — each *Waiting / Running / Done / Skipped / Failed* |
| Warnings | Yellow banner, e.g. "Performance test skipped for *project-x* (site unreachable). Your resume will not include those numbers" (`RES-16`) |
| Cancel | **Cancel** shown until writing starts, then disabled with the reason (`RES-08`) |
| Done | Automatic move to the preview, with a success toast |
| Failed | Plain-language reason + **Try again** (and **Edit inputs**); never a blank screen |
| Refresh-safe | Reloading the page resumes the same live view |

#### P-16 · Resume — preview & edit
| Area | Content |
|---|---|
| Resume view | Paper-style preview of the full resume |
| Bullet controls | Each AI bullet has **Accept · Reject · Edit**; edited bullets get a "written by you" tag (`RES-13`); rejected bullets are greyed and left out of export |
| Evidence | Each bullet has an "evidence" chip that opens what it came from (repo content, test score, or profile) (`RES-10`) |
| Performance numbers | Shown as read-only facts; cannot be typed over |
| Tailored mode | **Match score** (0–100) and **Gap report** panel listing unmet requirements (`RES-12`) |
| Warnings | Same banners as the progress page |
| Actions | **Export PDF**, rename, delete (with confirmation) |

#### P-13 · Resume — history
- List of versions (v1, v2 …), date, title, match score; open, rename, delete. Empty state: "Build your first resume" CTA.

#### P-17 · Interview — start & history
- Technology cards (name, short description, **your expertise** badge). Starting shows "10 questions · text answers".
- Past sessions list: technology, attempt number, %, level, status, date.
- Existing in-progress session for a technology → the card says **Continue** instead of **Start** (`INT-03`).

#### P-18 · Interview — live session
| Element | Behaviour |
|---|---|
| Header | Technology, "Question 4 of 10", progress bar |
| Question | One question at a time, never the answer guide (`INT-08`) |
| Answer box | Text area with counter (max 5,000, `INT-09`); **Submit answer**, **Skip** (confirm: "Skipping scores 0", `INT-10`) |
| After submit | **Instant** move to the next question; a small "scoring in background" note (`INT-12`) |
| Early finish | **Finish early** enabled only after 5 answers, with a confirmation explaining unanswered = 0 (`INT-15`) |
| Last answer | "Scoring your answers…" screen with progress; auto-opens the report when ready |
| Refresh-safe | Reload returns to the current question with any typed draft kept locally |

#### P-19 · Interview — report
| Block | Content |
|---|---|
| Hero | Big expertise % (ring), level label (Beginner/Intermediate/Advanced/Expert) (`INT-19`) |
| Dimensions | Averages for Correctness, Depth, Clarity |
| Per question | Expandable cards: question, your answer, score, feedback, *matched* and *missing* points |
| Topics | Strongest and weakest topics |
| Comparison | vs previous attempt on the same technology (up/down arrow) |
| Partial | Visible **"Partial report"** badge with explanation when some answers could not be scored (`INT-20`) |
| Actions | **Practice again**, back to history |
| Not ready | If opened early: "Still scoring" with progress |

#### P-20 · Settings
| Section | Content |
|---|---|
| Profile | Edit all onboarding data |
| Avatar | Upload JPG/PNG/WEBP up to 2 MB with preview (`PROF-07`) |
| Password | Change password (current + new); GitHub-only accounts see "Set a password" via reset email (`AUTH-19`) |
| GitHub | Connected account name, **Reconnect**, last sync time |
| Sessions | **Log out**, **Log out everywhere** (`AUTH-12`) |

---

### 3.4 Admin Management Views

> Admin sees **only** the admin area and own settings (no resume/interview/GitHub screens).

#### Admin shell
- Separate navigation: **Questions**, *(Users — proposed)*, **Settings**, **Log out**. Clear "Admin" indicator so it never looks like the user app.

#### P-21 · Questions list
| Element | Behaviour |
|---|---|
| Filters | Technology, difficulty, topic, active/inactive, text search |
| Table | Question (truncated), technology, topic, difficulty, status, last edited |
| Row actions | Edit, Activate/Deactivate (confirmation) |
| Toolbar | **Add question**, **Re-index** (refreshes the question search index, `ADM-04`) with a "running / done" message |
| Readiness panel | Per technology: active question count and difficulty spread; warning when under the minimum of 10 (`ADM-03`). Technologies themselves are created by the team in the MVP; admin technology management comes in Phase 1.5 (`ADM-05`) |
| Empty / pagination | Empty state with **Add question**; paged lists |

#### P-22 · Question form (create / edit)
| Field | Rule |
|---|---|
| Technology | Required, active technologies only |
| Topic | Required |
| Difficulty | Easy / Medium / Hard |
| Question text | Required, with character counter |
| Expected key points | 2–8 items, add/remove (`ADM-01`); labelled "Never shown to users" |
| Status | Active toggle |

- Warn on leaving with unsaved changes. After saving, a note suggests running **Re-index**.

#### P-23 · Users *(proposed — Phase 1.5, needs decision D2)*
- Search accounts, view status, **Suspend/Reactivate** and **Promote/Demote** with confirmation dialogs. **No** access to any user's resumes, answers or profile content (privacy rule).

---

## 4. Key User Journeys & UI State Requirements

### 4.1 Journeys (step-by-step UI behaviour)

#### J1 · New user, email sign-up
1. Landing → **Get started** → Register.
2. Submit → Verify email (code sent; resend timer running).
3. Enter code → signed in automatically → Onboarding step ①.
4. Complete steps (skip ③ if desired) → Finish → Dashboard with a "What would you like to do?" prompt.
5. Choose Resume or Interview. If GitHub isn't connected, Resume shows the connect screen first.

#### J2 · New user, GitHub sign-in
1. Landing/Login → **Continue with GitHub** → GitHub consent → return screen (P-09).
2. Account is active immediately (no OTP) → Onboarding.
3. Repos appear in the repo picker as soon as the background sync finishes; until then a "Syncing your repositories…" state is shown.

#### J3 · Returning user, forgot password
1. Login → **Forgot password?** → enter email → generic confirmation.
2. Email link → Reset password → success → Login with a "password changed" notice.

#### J4 · Build a tailored resume
1. Dashboard → **Build a resume** → wizard (mode → JD → 2 projects → live URLs → review).
2. **Generate** → progress page (stages update live; warnings appear as they happen).
3. Done → preview: review bullets (accept/reject/edit), read match score and gaps.
4. **Export PDF** → download; version saved in history (v1, v2…).
5. If it fails → reason + **Try again**; if the user leaves, the dashboard shows the active job banner until it finishes.

#### J5 · Take an interview
1. Interview → choose technology → **Start** (or **Continue**).
2. Answer 10 questions, one at a time (submit/skip); next question appears instantly.
3. Last answer (or **Finish early** after 5) → "Scoring your answers…".
4. Report opens automatically → read breakdown → **Practice again**.

#### J6 · Admin adds a question
1. Login → lands on Admin panel → Questions → **Add question**.
2. Fill form (≥2 key points) → Save → success toast → back to list with the new row highlighted.
3. **Re-index** → "Index updated" message. Readiness panel updates the technology's count.

### 4.2 Global UI state requirements

Every data-driven screen must define all five states:

| State | Requirement |
|---|---|
| **Loading** | Skeleton placeholders shaped like the final content (no blank page, no layout jump) |
| **Empty** | Short explanation + one clear action (e.g. "No resumes yet — Build your first") |
| **Error** | Plain sentence + **Try again**; keeps the user's input |
| **Success** | Toast or inline confirmation; never silent |
| **Disabled / locked** | Always say *why* (e.g. "Finish your profile to unlock", "Available again in 0:42") |

Additional global behaviours:

| Situation | Required behaviour |
|---|---|
| Session expires while using the app | Renew silently; if impossible, go to Login and return the user to where they were, keeping unsaved input where possible |
| Lost connection | Non-blocking "You're offline" banner; submit buttons paused; auto-retry on reconnect |
| Long-running work | Never block the whole screen; user can navigate away and come back (state restored) |
| Unsaved changes | Confirm before leaving forms (onboarding step, JD, question form, bullet edits) |
| Destructive actions | Always a confirmation dialog naming what will be lost (delete resume, deactivate question, log out everywhere) |
| Forms | Inline field errors on blur/submit; first error focused; submit disabled while sending |

### 4.3 Error & system message mapping

| Situation (backend signal) | What the user sees |
|---|---|
| Validation failed | Messages under the exact fields |
| Not signed in / expired | Silent renew → else Login with "Please sign in again" |
| Wrong email/password | "Email or password is incorrect" (always generic) |
| Too many login attempts | Lock message with live countdown |
| Email not verified | Redirect to Verify with "Confirm your email to continue" |
| Account suspended | "Your account is suspended. Contact support." |
| Profile incomplete | Redirect to Onboarding with "Finish your profile to unlock this" |
| Active resume job exists | Banner "You already have a resume in progress" + **View progress** |
| Active interview session exists | **Continue session** instead of Start |
| Daily limit reached | "You've used all N for today. More available at *time*" |
| Rate limited | "Please wait *N* seconds and try again" with timer |
| GitHub not connected | Connect screen with **Connect GitHub** |
| Service temporarily unavailable (AI / GitHub) | "We're having trouble reaching *service*. Try again shortly." + retry; progress pages explain it is retrying automatically |
| Unexpected error | Generic apology + **Try again** + a short reference number for support |

### 4.4 Content & format requirements

- Dates shown in the user's local time; scores as whole numbers (percentages one decimal at most).
- Numbers that come from tests (performance, accessibility, best-practices, SEO) are always labelled with their source and date.
- Text boxes show live character counters and never silently truncate.

---

## 5. Frontend Development Roadmap

> Target: **2 weeks**, running alongside the backend phases. Until an endpoint is ready, screens are built against agreed mock responses so frontend work is never blocked. Task ownership is decided by the team lead.
>
> ⚠️ Your template listed three phases. The product's main screens (onboarding, resume, interview, dashboard) fit none of them, so **Phase 2 below was added** and Admin/Polish were renumbered.

### 5.1 Phase overview

| Phase | Name | Goal | Target | Needs backend |
|---|---|---|---|---|
| **1** | MVP Setup & Public / Auth Views | App foundation + everything a guest can see and do | Days 1–4 | 1A (auth) |
| **2** | Core User Views *(added)* | Onboarding, GitHub, resume flow, interview flow, dashboard, settings | Days 4–11 | 1A, 1B, 1C |
| **3** | Admin Views | Question management for admins | Days 10–12 | 1C (admin) |
| **4** | UI/UX Polish, Responsiveness & Edge Cases | Make it feel finished and safe | Days 12–14 | 1D |

### 5.2 Phase 1 — MVP Setup & Public / Auth Views (Days 1–4)

| Step | Deliverable | Pages / rules |
|---|---|---|
| 1 | Project setup, shared design basics (colours, type, spacing, dark/light decision), base components (buttons, inputs, tags, toasts, dialogs, skeletons) | — |
| 2 | App shell: header/footer, navigation per role, route guards that apply the access matrix and redirects | §2.2 |
| 3 | Session handling: silent renew, sign-in redirects, "return to where I was" | `AUTH-10`–`12` |
| 4 | Global error handling and the message mapping table | §4.3 |
| 5 | Public pages | P-01, P-02, P-03 |
| 6 | Register, Verify (timers, resend), Login (lock timer), Forgot, Reset | P-04 – P-08 |
| 7 | GitHub sign-in return screen | P-09 |

**Exit criteria:** a guest can register, verify, sign in and out, reset a password and use GitHub sign-in; every redirect in the access matrix behaves as written; all auth screens work on mobile.

### 5.3 Phase 2 — Core User Views *(added)* (Days 4–11)

| Sub-phase | Deliverable | Pages / rules |
|---|---|---|
| **2A** (Days 4–7) | Onboarding with per-step save and resume; settings (profile, avatar, password, GitHub, sessions); GitHub repo list with sync status | P-10, P-12, P-20 · `PROF-01`–`07`, `GH-01`–`06` |
| **2B** (Days 6–10) | Resume wizard, live progress (with refresh-safe streaming and fallback), preview/edit with evidence chips, history, PDF export | P-13 – P-16 · `RES-01`–`16` |
| **2C** (Days 9–12) | Interview start/history, live session, scoring wait, report; dashboard | P-17 – P-19, P-11 · `INT-01`–`22`, `DASH-01` |

**Exit criteria:** both tracks work end-to-end for a real user; reloading during a resume job or interview never loses state; quotas, cooldowns and locks are visible and accurate.

### 5.4 Phase 3 — Admin Views (Days 10–12)

| Step | Deliverable | Pages / rules |
|---|---|---|
| 1 | Admin shell with its own navigation and clear admin indicator | §3.4 |
| 2 | Questions list with filters, row actions, readiness panel, re-index | P-21 · `ADM-01`–`04` |
| 3 | Question create/edit form with key-point editor and unsaved-change guard | P-22 |
| 4 | *(After decision D2)* Users page with suspend/promote dialogs | P-23 |

**Exit criteria:** an admin can add a question, deactivate it, see a technology become "ready", and run a re-index — and cannot reach any user-app page.

### 5.5 Phase 4 — UI/UX Polish, Responsiveness & Edge Case Handling (Days 12–14)

| Area | Deliverable |
|---|---|
| **Responsiveness** | Verify every page at 360 / 768 / 1280 px; resume preview and interview chat tuned for phones; tables become cards on small screens |
| **Edge cases** | Walk through every row of §4.3 and §4.2 with real or simulated failures: expired session mid-form, offline, double-submit, job failing at each stage, AI/GitHub down, lock-outs, quota hit, deleting the active resume, opening another user's link |
| **Accessibility** | Keyboard-only run of all journeys, focus order, contrast check, screen-reader announcements for progress and timers |
| **Performance** | Fast landing load, lazy-loaded heavy views (preview, report), no layout jumps |
| **Copy & consistency** | One pass on wording, empty states, toasts and confirmation dialogs |
| **Release** | Production smoke test of both tracks on desktop and phone; README for UI contributors |

**Exit criteria:** every journey in §4.1 passes on desktop and a 360 px phone with no blocking defects; all five UI states exist on every data screen.

---

## 6. Open Questions

| # | Question | Impact | Suggested default |
|---|---|---|---|
| Q1 | ~~Does Admin get a dashboard?~~ | P-11 access | ✅ **Resolved:** no dashboard for Admin. Admin Home is the admin panel; Admin changes only own name, avatar and password |
| Q2 | Should unverified users see Settings (e.g. to fix a wrong email)? | P-20 access | No — send them back to Register to correct the email |
| Q3 | Light/dark mode in MVP? | Design basics (Phase 1) | Light only for MVP; keep colours tokenised so dark mode is easy later |
| Q4 | Language support (English only vs Bangla UI)? | All copy | English only for MVP |
| Q5 | Is GitHub connection mandatory before finishing onboarding? | P-10 | Optional; resume track stays locked until connected |
| Q6 | Admin Users page (P-23) — in MVP or Phase 1.5? | Phase 3 scope | Phase 1.5 (see backend decision D2) |

---

<div align="center">

*DevFolio · Frontend Requirements · v1.2 · derived from BACKEND_REQUIREMENTS.md (Phase 1 MVP)*

</div>
