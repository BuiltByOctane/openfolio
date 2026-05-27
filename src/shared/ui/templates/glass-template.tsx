import { Mail, Globe, Github, Linkedin, Twitter, MapPin, ArrowUpRight } from "lucide-react";
import type { PortfolioData } from "@/shared/types/portfolio";

export default function GlassTemplate({ data }: { data: PortfolioData }) {
  const { contact } = data;

  const contactLinks = [
    contact.email && { href: `mailto:${contact.email}`, label: contact.email, Icon: Mail },
    contact.website && { href: contact.website, label: contact.website.replace(/^https?:\/\//, ""), Icon: Globe },
    contact.github && { href: `https://github.com/${contact.github}`, label: contact.github, Icon: Github },
    contact.linkedin && { href: `https://linkedin.com/in/${contact.linkedin}`, label: contact.linkedin, Icon: Linkedin },
    contact.twitter && { href: `https://twitter.com/${contact.twitter}`, label: `@${contact.twitter}`, Icon: Twitter },
  ].filter(Boolean) as { href: string; label: string; Icon: React.ComponentType<{ className?: string; strokeWidth?: number }> }[];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-950 via-indigo-950 to-slate-900 font-sans text-white antialiased">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute top-1/2 -right-32 h-80 w-80 rounded-full bg-indigo-400/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 py-16">
        <header className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <div className="flex items-start gap-6">
            {data.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={data.avatar}
                alt={data.name}
                className="h-20 w-20 rounded-2xl object-cover ring-2 ring-white/20"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 text-2xl font-semibold text-white/60 ring-2 ring-white/20">
                {data.name.charAt(0)}
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-3xl font-semibold tracking-tight text-white">{data.name}</h1>
              <p className="mt-1 text-violet-300">{data.headline}</p>
              {data.location && (
                <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-white/50">
                  <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} />
                  {data.location}
                </p>
              )}
            </div>
          </div>
          {data.bio && (
            <p className="mt-6 text-[15px] leading-relaxed text-white/70">{data.bio}</p>
          )}
        </header>

        {data.experience.length > 0 && (
          <section className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <h2 className="mb-6 text-xs font-semibold tracking-widest text-violet-400 uppercase">
              Experience
            </h2>
            <div className="space-y-8">
              {data.experience.map((job, i) => (
                <div key={i}>
                  <div className="flex items-baseline justify-between gap-4">
                    <div>
                      <span className="font-medium text-white">{job.role}</span>
                      <span className="ml-2 text-white/40">·</span>
                      <span className="ml-2 text-white/70">{job.company}</span>
                    </div>
                    <span className="shrink-0 text-sm text-white/40">{job.dates}</span>
                  </div>
                  {job.bullets.length > 0 && (
                    <ul className="mt-3 space-y-2">
                      {job.bullets.map((b, j) => (
                        <li key={j} className="flex gap-3 text-sm leading-relaxed text-white/60">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-violet-400" aria-hidden />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.projects.length > 0 && (
          <section className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <h2 className="mb-6 text-xs font-semibold tracking-widest text-violet-400 uppercase">
              Projects
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {data.projects.map((p, i) => {
                const inner = (
                  <>
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-medium text-white">{p.name}</span>
                      {p.link && <ArrowUpRight className="h-4 w-4 shrink-0 text-white/30" strokeWidth={1.5} />}
                    </div>
                    {p.description && (
                      <p className="mt-2 text-sm leading-relaxed text-white/50">{p.description}</p>
                    )}
                    {p.tech.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {p.tech.map((t) => (
                          <span key={t} className="rounded-full border border-violet-400/30 bg-violet-500/10 px-2 py-0.5 text-[11px] text-violet-300">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </>
                );
                return p.link ? (
                  <a key={i} href={p.link} target="_blank" rel="noreferrer noopener"
                    className="group rounded-xl border border-white/10 bg-white/5 p-5 transition hover:border-violet-400/40 hover:bg-white/10">
                    {inner}
                  </a>
                ) : (
                  <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-5">{inner}</div>
                );
              })}
            </div>
          </section>
        )}

        {data.skills.length > 0 && (
          <section className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <h2 className="mb-6 text-xs font-semibold tracking-widest text-violet-400 uppercase">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((s) => (
                <span key={s} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/70">
                  {s}
                </span>
              ))}
            </div>
          </section>
        )}

        {data.education.length > 0 && (
          <section className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <h2 className="mb-6 text-xs font-semibold tracking-widest text-violet-400 uppercase">
              Education
            </h2>
            <div className="space-y-4">
              {data.education.map((e, i) => (
                <div key={i} className="flex items-baseline justify-between gap-4">
                  <div>
                    <span className="font-medium text-white">{e.school}</span>
                    <span className="ml-2 text-sm text-white/50">{e.degree}</span>
                  </div>
                  <span className="shrink-0 text-sm text-white/40">{e.dates}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {contactLinks.length > 0 && (
          <footer className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <div className="flex flex-wrap gap-4">
              {contactLinks.map(({ href, label, Icon }) => (
                <a key={href} href={href} target="_blank" rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-violet-300">
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                  {label}
                </a>
              ))}
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}
