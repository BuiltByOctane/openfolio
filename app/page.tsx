import Link from "next/link";
import {
  ArrowRight,
  Bug,
  FileText,
  Github,
  Heart,
  Palette,
  Sparkles,
} from "lucide-react";

const CONTRIBUTE_AREAS: Array<{
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  detail: string;
}> = [
  {
    icon: Sparkles,
    title: "New features",
    detail:
      "GitHub parser improvements, custom domains, analytics opt-in, OG image generator.",
  },
  {
    icon: Palette,
    title: "New template themes",
    detail:
      "Design a portfolio template. One file in components/templates, then registered in the picker.",
  },
  {
    icon: Bug,
    title: "Bugs & polish",
    detail:
      "Edge cases in parsing, layout breaks, a11y fixes, performance wins.",
  },
  {
    icon: FileText,
    title: "Docs & examples",
    detail:
      "Better README, template authoring guide, screenshots, recorded demos.",
  },
  {
    icon: Heart,
    title: "Spread the word",
    detail:
      "Use openfolio for your portfolio, share the link, file feedback issues.",
  },
];

const REPO_URL = "https://github.com/delbingeorge/openfolio";

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
          <span className="text-neutral-500">
            No editing. Regenerate to change.
          </span>
        </h1>
        <p className="mt-6 max-w-prose text-base leading-relaxed text-neutral-600">
          Paste a GitHub URL. Pick one of seven templates. Get a hosted page at
          openfolio/yourname. The whole point is that there&apos;s nothing to
          fiddle with — your words and your work, rendered.
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
              Paste a profile URL. We fetch your bio, top repos, and primary
              languages.
            </p>
            <p className="mt-6 inline-flex items-center gap-1 text-sm text-neutral-900 underline decoration-neutral-300 underline-offset-4 group-hover:decoration-neutral-900">
              Continue <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
        </div>

        <section id="contribute" className="mt-24">
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl font-medium tracking-tight text-neutral-900">
              Contribute
            </h2>
            <span className="font-mono text-xs tracking-widest text-neutral-400 uppercase">
              open source
            </span>
          </div>
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-neutral-600">
            Openfolio is open source and built in the open. Anyone can ship a
            template, fix a bug, or improve the GitHub parser. Pick something
            below or open an issue with your idea.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {CONTRIBUTE_AREAS.map(({ icon: Icon, title, detail }) => (
              <li
                key={title}
                className="rounded-lg border border-neutral-200 bg-white p-4 transition hover:border-neutral-900 hover:shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-neutral-900" strokeWidth={1.75} />
                  <h3 className="text-sm font-medium text-neutral-900">
                    {title}
                  </h3>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                  {detail}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-neutral-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-black"
            >
              <Github className="h-4 w-4" strokeWidth={1.75} />
              Star on GitHub
            </a>
            <a
              href={`${REPO_URL}/blob/main/CONTRIBUTING.md`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-neutral-700 underline decoration-neutral-300 underline-offset-4 hover:text-neutral-900 hover:decoration-neutral-900"
            >
              Read CONTRIBUTING.md <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <a
              href={`${REPO_URL}/issues/new/choose`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-neutral-700 underline decoration-neutral-300 underline-offset-4 hover:text-neutral-900 hover:decoration-neutral-900"
            >
              Open an issue <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </section>
      </main>

      <footer className="mt-16 flex items-center justify-between font-mono text-xs tracking-widest text-neutral-400 uppercase">
        <span>
          © {new Date().getFullYear()} openfolio · by{" "}
          <a
            href="https://octane.team"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 hover:text-neutral-900"
          >
            octane oss
          </a>
        </span>
        <span className="hidden sm:inline">no cookies / no trackers</span>
      </footer>
    </div>
  );
}
