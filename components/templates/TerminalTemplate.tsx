import { Fragment } from "react";
import type { PortfolioData } from "@/types/portfolio";

const ACCENT = "#00ff9c";

function Prompt({ path = "~", children }: { path?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-2 whitespace-pre">
      <span className="text-zinc-500 select-none">{path}</span>
      <span className="select-none" style={{ color: ACCENT }}>
        $
      </span>
      <span className="text-zinc-200">{children}</span>
    </div>
  );
}

function Block({
  path,
  command,
  children,
  last = false,
}: {
  path?: string;
  command: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <section className={last ? "" : "mb-7 sm:mb-8"}>
      <Prompt path={path}>{command}</Prompt>
      <div className="mt-2 pl-0 sm:pl-5">{children}</div>
    </section>
  );
}

export default function TerminalTemplate({ data }: { data: PortfolioData }) {
  const contactEntries = Object.entries(data.contact).filter(([, v]) => !!v) as [
    string,
    string,
  ][];

  const hrefFor = (k: string, v: string) => {
    if (k === "email") return `mailto:${v}`;
    if (/^https?:/i.test(v)) return v;
    if (k === "twitter") return `https://twitter.com/${v.replace(/^@/, "")}`;
    if (k === "github") return `https://github.com/${v}`;
    if (k === "linkedin") return `https://linkedin.com/in/${v}`;
    return `https://${v}`;
  };

  return (
    <div
      className="min-h-screen w-full bg-zinc-950 px-3 py-4 font-mono text-zinc-100 antialiased sm:px-6 sm:py-10"
      style={{ fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace" }}
    >
      <div className="mx-auto flex w-full max-w-3xl items-start justify-center sm:items-center">
        <div className="w-full">
          <div className="relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]">
            {/* Top bar */}
            <div className="relative flex h-9 items-center border-b border-zinc-800 bg-zinc-900/40 px-3 sm:px-4">
              <div className="flex items-center gap-2">
                <span className="block h-3 w-3 rounded-full border border-black/30 bg-[#ff5f56]" />
                <span className="block h-3 w-3 rounded-full border border-black/30 bg-[#ffbd2e]" />
                <span className="block h-3 w-3 rounded-full border border-black/30 bg-[#27c93f]" />
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 text-xs text-zinc-500 select-none sm:text-[13px]">
                ~/portfolio — zsh
              </div>
            </div>

            <div className="px-4 py-5 text-[13.5px] sm:px-6 sm:py-6 sm:text-sm">
              <Block path="~" command="whoami">
                <div>
                  <div className="text-2xl leading-tight font-medium tracking-tight text-zinc-100 sm:text-3xl">
                    {data.name}
                  </div>
                  <div className="mt-1 text-sm text-zinc-500 sm:text-base">
                    {data.headline}
                  </div>
                  {data.location && (
                    <div className="mt-1 text-xs text-zinc-600 sm:text-sm">
                      <span className="text-zinc-700">loc:</span> {data.location}
                    </div>
                  )}
                </div>
              </Block>

              {data.bio && (
                <Block path="~" command="cat about.md">
                  <p className="max-w-[68ch] text-sm leading-relaxed text-zinc-400 sm:text-[15px]">
                    {data.bio}
                  </p>
                </Block>
              )}

              {data.experience.length > 0 && (
                <Block path="~" command="ls -la ./experience/">
                  <div className="text-sm leading-relaxed sm:text-[14px]">
                    <div className="mb-2 text-zinc-600 select-none">
                      total {data.experience.length}
                    </div>
                    <div className="flex flex-col gap-5">
                      {data.experience.map((r, idx) => (
                        <div key={idx}>
                          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0">
                            <span className="text-zinc-600 tabular-nums">-rw-r--r--</span>
                            <span className="text-zinc-100">
                              {r.role} <span className="text-zinc-600">@</span> {r.company}
                            </span>
                            <span className="ml-auto text-zinc-500 tabular-nums sm:ml-2">
                              {r.dates}
                            </span>
                          </div>
                          {r.bullets.length > 0 && (
                            <ul className="mt-1.5 space-y-1">
                              {r.bullets.map((b, j) => {
                                const isLast = j === r.bullets.length - 1;
                                return (
                                  <li key={j} className="flex gap-2 text-zinc-400">
                                    <span className="shrink-0 text-zinc-700 select-none">
                                      {isLast ? "└─" : "├─"}
                                    </span>
                                    <span className="leading-relaxed">{b}</span>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </Block>
              )}

              {data.education.length > 0 && (
                <Block path="~" command="ls -la ./education/">
                  <div className="flex flex-col gap-1.5 text-sm leading-relaxed">
                    {data.education.map((e, i) => (
                      <div key={i} className="flex flex-wrap items-baseline gap-x-3">
                        <span className="text-zinc-600">-rw-r--r--</span>
                        <span className="text-zinc-100">{e.school}</span>
                        <span className="text-zinc-500">— {e.degree}</span>
                        <span className="ml-auto text-zinc-500 tabular-nums">
                          {e.dates}
                        </span>
                      </div>
                    ))}
                  </div>
                </Block>
              )}

              {data.skills.length > 0 && (
                <Block path="~" command="cat skills.txt">
                  <div className="max-w-[68ch] text-sm leading-loose text-zinc-300">
                    {data.skills.map((s, i) => (
                      <Fragment key={s}>
                        <span className="text-zinc-300">{s}</span>
                        {i < data.skills.length - 1 && (
                          <span className="text-zinc-700">{"  "}</span>
                        )}
                      </Fragment>
                    ))}
                  </div>
                </Block>
              )}

              {data.projects.length > 0 && (
                <Block path="~" command="ls ./projects/">
                  <div className="flex flex-col gap-5 text-sm">
                    {data.projects.map((p, i) => (
                      <div key={i}>
                        <div className="flex flex-wrap items-baseline gap-x-3">
                          <span className="text-zinc-700 select-none">drwxr-xr-x</span>
                          {p.link ? (
                            <a
                              href={p.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium hover:underline"
                              style={{ color: ACCENT }}
                            >
                              {p.name}
                            </a>
                          ) : (
                            <span className="font-medium" style={{ color: ACCENT }}>
                              {p.name}
                            </span>
                          )}
                        </div>
                        {p.description && (
                          <div className="mt-1 max-w-[68ch] pl-0 leading-relaxed text-zinc-400 sm:pl-6">
                            {p.description}
                          </div>
                        )}
                        {p.tech.length > 0 && (
                          <div className="mt-1 pl-0 text-zinc-600 sm:pl-6">
                            [{p.tech.join(", ")}]
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </Block>
              )}

              {contactEntries.length > 0 && (
                <Block path="~" command="cat contact.json">
                  <pre className="text-sm leading-relaxed whitespace-pre-wrap text-zinc-300">
                    {"{\n"}
                    {contactEntries.map(([k, v], i) => {
                      const comma = i < contactEntries.length - 1 ? "," : "";
                      return (
                        <span key={k}>
                          {"  "}
                          <span className="text-zinc-400">&quot;{k}&quot;</span>
                          <span className="text-zinc-600">: </span>
                          <span style={{ color: ACCENT }}>&quot;</span>
                          <a
                            href={hrefFor(k, v)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                            style={{ color: ACCENT }}
                          >
                            {v}
                          </a>
                          <span style={{ color: ACCENT }}>&quot;</span>
                          <span className="text-zinc-600">{comma}</span>
                          {"\n"}
                        </span>
                      );
                    })}
                    {"}"}
                  </pre>
                </Block>
              )}

              <div className="mt-2 flex items-center gap-2">
                <span className="text-zinc-500 select-none">~</span>
                <span className="select-none" style={{ color: ACCENT }}>
                  $
                </span>
                <span
                  className="inline-block h-4 w-2 bg-zinc-100 align-text-bottom"
                  aria-hidden
                />
              </div>
            </div>

            <div className="flex h-7 items-center justify-between border-t border-zinc-800 bg-zinc-900/40 px-3 text-[11px] text-zinc-600 select-none sm:px-4">
              <div className="flex items-center gap-3">
                <span className="text-zinc-500">[zsh]</span>
                <span className="hidden sm:inline">utf-8</span>
                <span className="hidden sm:inline">main *</span>
              </div>
              <div className="tabular-nums">
                © {new Date().getFullYear()} {data.name}
              </div>
            </div>
          </div>

          <div className="mt-3 text-center text-[11px] text-zinc-700 select-none">
            press <span className="text-zinc-500">↑</span> for history ·{" "}
            <span className="text-zinc-500">ctrl-c</span> to exit
          </div>
        </div>
      </div>
    </div>
  );
}
