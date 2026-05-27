import { Mail, Globe, Github, Linkedin, Twitter, MapPin, ArrowUpRight } from "lucide-react";
import type { PortfolioData } from "@/types/portfolio";

export default function DuskTemplate({ data }: { data: PortfolioData }) {
  const { contact } = data;

  return (
    <div className="min-h-screen font-sans antialiased" style={{ background: "#0d0618", color: "#e8e0f0" }}>
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 h-[600px] w-px" style={{ background: "linear-gradient(to bottom, transparent, #7c3aed33, transparent)" }} />
        <div className="absolute top-0 left-2/4 h-[400px] w-px" style={{ background: "linear-gradient(to bottom, transparent, #a855f744, transparent)" }} />
        <div className="absolute top-0 left-3/4 h-[500px] w-px" style={{ background: "linear-gradient(to bottom, transparent, #7c3aed22, transparent)" }} />
      </div>

      <div className="relative mx-auto max-w-2xl px-6 py-20">
        {/* Hero */}
        <header className="pb-16">
          {data.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.avatar}
              alt={data.name}
              className="h-16 w-16 rounded-full object-cover"
              style={{ boxShadow: "0 0 0 2px #7c3aed44, 0 0 20px #7c3aed22" }}
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full text-xl font-semibold"
              style={{ background: "linear-gradient(135deg, #7c3aed33, #a855f733)", border: "1px solid #7c3aed44" }}>
              {data.name.charAt(0)}
            </div>
          )}

          <h1 className="mt-8 text-5xl font-light tracking-tight" style={{ color: "#f0eaff" }}>
            {data.name}
          </h1>
          <p className="mt-3 text-lg font-light" style={{ color: "#a78bdb" }}>{data.headline}</p>
          {data.location && (
            <p className="mt-3 inline-flex items-center gap-1.5 text-sm" style={{ color: "#7c6a9a" }}>
              <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} />
              {data.location}
            </p>
          )}
          {data.bio && (
            <p className="mt-8 text-[16px] leading-loose" style={{ color: "#c4b5e0" }}>{data.bio}</p>
          )}
        </header>

        {data.experience.length > 0 && (
          <section className="py-12" style={{ borderTop: "1px solid #2d1f4a" }}>
            <h2 className="mb-8 text-[10px] font-semibold tracking-[0.22em] uppercase" style={{ color: "#7c6a9a" }}>
              Experience
            </h2>
            <div className="space-y-10">
              {data.experience.map((job, i) => (
                <div key={i}>
                  <div className="flex items-baseline justify-between gap-4">
                    <div>
                      <span className="font-medium" style={{ color: "#e8e0f0" }}>{job.role}</span>
                      <span className="mx-2" style={{ color: "#4a3a6a" }}>·</span>
                      <span style={{ color: "#a78bdb" }}>{job.company}</span>
                    </div>
                    <span className="shrink-0 text-sm tabular-nums" style={{ color: "#5a4a7a" }}>{job.dates}</span>
                  </div>
                  {job.bullets.length > 0 && (
                    <ul className="mt-4 space-y-2.5">
                      {job.bullets.map((b, j) => (
                        <li key={j} className="flex gap-4 text-sm leading-relaxed" style={{ color: "#b0a0cc" }}>
                          <span aria-hidden className="mt-2 h-px w-4 shrink-0" style={{ background: "#7c3aed55" }} />
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
          <section className="py-12" style={{ borderTop: "1px solid #2d1f4a" }}>
            <h2 className="mb-8 text-[10px] font-semibold tracking-[0.22em] uppercase" style={{ color: "#7c6a9a" }}>
              Projects
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {data.projects.map((p, i) => {
                const inner = (
                  <>
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-medium" style={{ color: "#e8e0f0" }}>{p.name}</span>
                      {p.link && <ArrowUpRight className="h-3.5 w-3.5 shrink-0" style={{ color: "#5a4a7a" }} strokeWidth={1.5} />}
                    </div>
                    {p.description && (
                      <p className="mt-2 text-sm leading-relaxed" style={{ color: "#8a7aaa" }}>{p.description}</p>
                    )}
                    {p.tech.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {p.tech.map((t) => (
                          <span key={t} className="rounded px-2 py-0.5 text-[11px]"
                            style={{ background: "#1e1030", border: "1px solid #3d2a5e", color: "#a78bdb" }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </>
                );
                return p.link ? (
                  <a key={i} href={p.link} target="_blank" rel="noreferrer noopener"
                    className="group block rounded-xl p-5 transition"
                    style={{ background: "#150d25", border: "1px solid #2d1f4a" }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#7c3aed55")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#2d1f4a")}>
                    {inner}
                  </a>
                ) : (
                  <div key={i} className="rounded-xl p-5"
                    style={{ background: "#150d25", border: "1px solid #2d1f4a" }}>
                    {inner}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {data.skills.length > 0 && (
          <section className="py-12" style={{ borderTop: "1px solid #2d1f4a" }}>
            <h2 className="mb-6 text-[10px] font-semibold tracking-[0.22em] uppercase" style={{ color: "#7c6a9a" }}>
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((s) => (
                <span key={s} className="rounded-full px-3 py-1 text-sm"
                  style={{ background: "#150d25", border: "1px solid #2d1f4a", color: "#b0a0cc" }}>
                  {s}
                </span>
              ))}
            </div>
          </section>
        )}

        {data.education.length > 0 && (
          <section className="py-12" style={{ borderTop: "1px solid #2d1f4a" }}>
            <h2 className="mb-6 text-[10px] font-semibold tracking-[0.22em] uppercase" style={{ color: "#7c6a9a" }}>
              Education
            </h2>
            <div className="space-y-4">
              {data.education.map((e, i) => (
                <div key={i} className="flex items-baseline justify-between gap-4">
                  <div>
                    <span className="font-medium" style={{ color: "#e8e0f0" }}>{e.school}</span>
                    <span className="ml-2 text-sm" style={{ color: "#8a7aaa" }}>{e.degree}</span>
                  </div>
                  <span className="shrink-0 text-sm tabular-nums" style={{ color: "#5a4a7a" }}>{e.dates}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="py-10" style={{ borderTop: "1px solid #2d1f4a" }}>
          <div className="flex flex-wrap gap-5">
            {contact.email && (
              <a href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2 text-sm transition"
                style={{ color: "#7c6a9a" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#c4b5e0")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#7c6a9a")}>
                <Mail className="h-4 w-4" strokeWidth={1.5} />
                {contact.email}
              </a>
            )}
            {contact.website && (
              <a href={contact.website} target="_blank" rel="noreferrer noopener"
                className="inline-flex items-center gap-2 text-sm transition"
                style={{ color: "#7c6a9a" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#c4b5e0")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#7c6a9a")}>
                <Globe className="h-4 w-4" strokeWidth={1.5} />
                {contact.website.replace(/^https?:\/\//, "")}
              </a>
            )}
            {contact.github && (
              <a href={`https://github.com/${contact.github}`} target="_blank" rel="noreferrer noopener"
                className="inline-flex items-center gap-2 text-sm transition"
                style={{ color: "#7c6a9a" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#c4b5e0")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#7c6a9a")}>
                <Github className="h-4 w-4" strokeWidth={1.5} />
                {contact.github}
              </a>
            )}
            {contact.linkedin && (
              <a href={`https://linkedin.com/in/${contact.linkedin}`} target="_blank" rel="noreferrer noopener"
                className="inline-flex items-center gap-2 text-sm transition"
                style={{ color: "#7c6a9a" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#c4b5e0")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#7c6a9a")}>
                <Linkedin className="h-4 w-4" strokeWidth={1.5} />
                {contact.linkedin}
              </a>
            )}
            {contact.twitter && (
              <a href={`https://twitter.com/${contact.twitter}`} target="_blank" rel="noreferrer noopener"
                className="inline-flex items-center gap-2 text-sm transition"
                style={{ color: "#7c6a9a" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#c4b5e0")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#7c6a9a")}>
                <Twitter className="h-4 w-4" strokeWidth={1.5} />
                @{contact.twitter}
              </a>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
}
