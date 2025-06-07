// src/app/page.tsx
"use client"; // This is a Client Component

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // For App Router redirection

export default function HomePage() {
  const { data: sessionData, status } = useSession();
  const router = useRouter();

  // If user is authenticated, redirect them to the dashboard
  if (status === "authenticated") {
    router.push("/dashboard");
    return null; // Don't render anything while redirecting
  }

  // If not authenticated, show login options
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Your <span className="text-[hsl(280,100%,70%)]">Dream</span> Garage
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
            href="https://create.t3.gg/en/usage/first-steps"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">First Steps →</h3>
            <div className="text-lg">
              Just the basics - Everything you need to know to set up your
              database and authentication.
            </div>
          </Link>
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
            href="https://create.t3.gg/en/usage/next-steps"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">Next Steps →</h3>
            <div className="text-lg">
              Learn more about CVA, project structure, and configuring your app.
            </div>
          </Link>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl text-white">
            {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
          </p>
          <button
            className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            onClick={sessionData ? () => signOut() : () => signIn()}
          >
            {sessionData ? "Sign out" : "Sign in with Discord / Google / etc."}
          </button>
        </div>
      </div>
    </main>
  );
}
