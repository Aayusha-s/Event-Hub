"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import AuthShell from "@/components/AuthShell";
import Button from "@/components/Button";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const login = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setBusy(true);
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (result?.error) {
      setError("Invalid email or password.");
      setBusy(false);
      return;
    }
    const profile = await fetch("/api/users/me").then((response) =>
      response.ok ? response.json() : null,
    );
    const destinations: Record<string, string> = {
      admin: "/admin/dashboard",
      ticket_checker: "/ticket-checker",
      organizer: "/organizerdashboard",
      attendee: "/userdashboard",
      vendor: "/vendordashboard",
    };
    router.replace(
      searchParams.get("callbackUrl") ??
        destinations[profile?.data?.role] ??
        "/",
    );
    router.refresh();
  };
  const oauth = async (provider: "google" | "github") => {
    setError("");
    const result = await signIn(provider, {
      callbackUrl: searchParams.get("callbackUrl") ?? "/",
    });
    if (result?.error) setError("Unable to sign in with this provider.");
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to discover, attend, and manage your next experience."
      footer={
        <>
          New to Vivnt?{" "}
          <Link
            href="/signup"
            className="font-semibold text-brown-dark hover:underline"
          >
            Create an account
          </Link>
        </>
      }
    >
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => void oauth("google")}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-border px-4 py-3 font-semibold transition hover:bg-surface-hover"
        >
          <span className="font-bold text-red-500">G</span> Continue with Google
        </button>
        <button
          type="button"
          onClick={() => void oauth("github")}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-border px-4 py-3 font-semibold transition hover:bg-surface-hover"
        >
          <span className="text-lg">GH</span> Continue with GitHub
        </button>
      </div>
      <div className="my-7 flex items-center gap-3 text-xs uppercase tracking-widest text-text-muted">
        <span className="h-px flex-1 bg-divider" />
        or email
        <span className="h-px flex-1 bg-divider" />
      </div>
      <form onSubmit={login} className="space-y-5">
        <label className="block text-sm font-semibold">
          Email
          <div className="mt-2 flex items-center gap-3 rounded-xl border border-border px-4 py-3 focus-within:border-brown-normal">
            <Mail size={18} className="text-text-muted" />
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full bg-transparent focus:outline-none focus:ring-0 focus:ring-offset-0 rounded-none "
              placeholder="you@example.com"
            />
          </div>
        </label>
        <label className="block text-sm font-semibold">
          Password
          <div className="mt-2 flex items-center gap-3 rounded-xl border border-border px-4 py-3 focus-within:border-brown-normal">
            <Lock size={18} className="text-text-muted" />
            <input
              required
              minLength={8}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full bg-transparent focus:outline-none focus:ring-0 focus:ring-offset-0 rounded-none"
              placeholder="Your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </label>
        <div className="text-right">
          <Link
            href="/forgot-password"
            className="text-sm font-semibold text-brown-dark hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}
        <Button
          text={busy ? "Signing in..." : "Sign in"}
          type="submit"
          variant="cta"
          className="w-full"
          disabled={busy}
        />
      </form>
    </AuthShell>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<main className="p-10 text-center">Loading...</main>}>
      <LoginForm />
    </Suspense>
  );
}
