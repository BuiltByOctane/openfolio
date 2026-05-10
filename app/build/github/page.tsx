"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Github, Loader2 } from "lucide-react";
import Link from "next/link";

export default function BuildFromGithubPage() {
  const router = useRouter();
  const [handle, setHandle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const res = await fetch("/api/fetch-github", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ handle }),
      });
      const json: { error?: string; draftId?: string } = await res.json();
      if (!res.ok || !json.draftId) {
        setError(json.error ?? "Something went wrong.");
        return;
      }
      router.push(`/build/preview/${json.draftId}`);
    });
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-6 py-16">
      <Link
        href="/"
        className="text-xs text-neutral-500 underline decoration-neutral-300 underline-offset-4 hover:text-neutral-900"
      >
        ← back
      </Link>

      <div className="mt-8 flex items-center gap-3">
        <Github className="h-5 w-5" strokeWidth={1.75} />
        <h1 className="text-2xl font-medium tracking-tight">Use your GitHub</h1>
      </div>
      <p className="mt-2 text-sm text-neutral-600">
        Paste a GitHub URL or username. We fetch your profile, top repos and
        languages.
      </p>

      <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-3">
        <label htmlFor="handle" className="text-xs tracking-widest text-neutral-500 uppercase">
          GitHub handle
        </label>
        <div className="flex items-center gap-2 rounded-md border border-neutral-300 bg-white pl-3 transition focus-within:border-neutral-900">
          <span className="text-sm text-neutral-400">github.com/</span>
          <input
            id="handle"
            type="text"
            autoComplete="off"
            autoFocus
            disabled={pending}
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder="vercel"
            className="flex-1 bg-transparent py-2.5 pr-3 text-sm placeholder:text-neutral-300 focus:outline-none"
          />
        </div>
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
        <button
          type="submit"
          disabled={pending || !handle.trim()}
          className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-black disabled:opacity-50"
        >
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Fetching…
            </>
          ) : (
            <>
              Continue <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
        <p className="mt-2 text-xs text-neutral-500">
          We use the public GitHub API. No login needed. First-come-first-served on the handle.
        </p>
      </form>
    </div>
  );
}
