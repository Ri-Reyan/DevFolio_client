import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getServerSession } from "@/lib/server-auth";
import LoginCard from "./LoginCard";

export const metadata: Metadata = {
  title: "Sign In — DevFolio",
  description: "Sign in to access your developer command center.",
};

async function LoginAuthCheck() {
  const session = await getServerSession();

  // Rule F: Authenticated visitor visiting /login is redirected to /dashboard
  if (session.isAuthenticated) {
    redirect("/dashboard");
  }

  return null;
}

export default function LoginPage() {
  return (
    <>
      <Suspense fallback={null}>
        <LoginAuthCheck />
      </Suspense>
      <LoginCard />
    </>
  );
}
