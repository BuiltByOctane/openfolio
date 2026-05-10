import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";

export default function Home() {
  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-16">
      <header className="flex items-baseline justify-between">
        <span className="font-mono text-xs tracking-widest text-neutral-500 uppercase">
          openfolio
        </span>
        <span className="hidden font-mono text-xs tracking-widest text-neutral-400 uppercase sm:inline">
          v1 — beta
        </span>
      </header>

      <main className="mt-24 flex-1">
        <h1 className="text-4xl leading-tight font-medium tracking-tight text-neutral-900 sm:text-5xl">
          A portfolio from your GitHub. <br />
          <span className="text-neutral-500">No editing. Regenerate to change.</span>
        </h1>
        <p className="mt-6 max-w-prose text-base leading-relaxed text-neutral-600">
          Paste a GitHub URL. Pick one of seven templates. Get a hosted page at
          openfolio/yourname. The whole point is that there&apos;s nothing to fiddle
          with — your words and your work, rendered.
        </p>

        <div className="mt-12">
          <Link
            href="/build/github"
            className="group block max-w-sm rounded-lg border border-neutral-200 bg-white p-6 transition hover:border-neutral-900 hover:shadow-sm"
          >
            <div className="flex items-center gap-3">
              <Github className="h-5 w-5 text-neutral-900" strokeWidth={1.75} />
              <h2 className="text-base font-medium">Use my GitHub</h2>
            </div>
            <p className="mt-3 text-sm text-neutral-600">
              Paste a profile URL. We fetch your bio, top repos, and primary languages.
            </p>
            <p className="mt-6 inline-flex items-center gap-1 text-sm text-neutral-900 underline decoration-neutral-300 underline-offset-4 group-hover:decoration-neutral-900">
              Continue <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
        </div>

        <p className="mt-10 text-xs text-neutral-500">
          GitHub handles are first-come-first-served.
        </p>
      </main>

      <footer className="mt-16 flex items-center justify-between font-mono text-xs tracking-widest text-neutral-400 uppercase">
        <span>© {new Date().getFullYear()} openfolio</span>
        <span className="hidden sm:inline">no cookies / no trackers</span>
      </footer>
    </div>
  );
}
