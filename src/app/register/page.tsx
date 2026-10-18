import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getServerSession } from "@/lib/server-auth";
import RegisterCard from "./RegisterCard";

export const metadata: Metadata = {
  title: "Create Account — DevFolio",
  description: "Join DevFolio to prove your code and engineering skills.",
};

async function RegisterAuthCheck() {
  const session = await getServerSession();

  // Rule F: Authenticated visitor visiting /register is redirected to /dashboard
  if (session.isAuthenticated) {
    redirect("/dashboard");
  }

  return null;
}

export default function RegisterPage() {
  return (
    <>
      <Suspense fallback={null}>
        <RegisterAuthCheck />
      </Suspense>
      <RegisterCard />
    </>
  );
}
