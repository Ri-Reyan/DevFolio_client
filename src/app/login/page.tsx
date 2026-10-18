import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/server-auth";
import LoginCard from "./LoginCard";

export const metadata: Metadata = {
  title: "Sign In — DevFolio",
  description: "Sign in to access your developer command center.",
};

export default async function LoginPage() {
  const session = await getServerSession();

  // Rule F: Authenticated visitor visiting /login is redirected to /dashboard
  if (session.isAuthenticated) {
    redirect("/dashboard");
  }

  return <LoginCard />;
}

