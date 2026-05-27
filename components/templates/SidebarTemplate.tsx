import { Mail, Globe, Github, Linkedin, Twitter, MapPin } from "lucide-react";
import type { PortfolioData } from "@/types/portfolio";

export default function SidebarTemplate({ data }: { data: PortfolioData }) {
  const { contact } = data;

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row min-h-screen">

          {/* Sidebar */}
          <aside className="md:w-72 shrink-0 bg-slate-800 text-white px-8 py-12">
            {data.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={data.avatar}
                alt={data.name}
                className="h-24 w-24 rounded-full object-cover ring-4 ring-white/20"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-600 text-3xl font-bold text-slate-200">
                {data.name.charAt(0)}
              </div>
            )}

            <h1 className="mt-6 text-2xl font-bold leading-tight text-white">{data.name}</h1>
            <p className="mt-1.5 text-sm text-slate-300">{data.headline}</p>
            {data.location && (
              <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
                <MapPin className="h-3 w-3" strokeWidth={1.5} />
                {data.location}
              </p>
            )}

            {/* Contact */}
            <div className="mt-8">
              <h2 className="mb-3 text-[10px] font-bold tracking-[0.18em] text-slate-400 uppercase">Contact</h2>
              <ul className="space-y-2.5">
                {contact.email && (
                  <li>
                    <a href={`mailto:${contact.email}`}
                      className="flex items-center gap-2 text-xs text-slate-300 hover:text-white break-all">
                      <Mail className="h-3.5 w-3.5 shrink-0 text-slate-400" strokeWidth={1.5} />
                      {contact.email}
                    </a>
                  </li>
                )}
                {contact.website && (
                  <li>
                    <a href={contact.website} target="_blank" rel="noreferrer noopener"
                      className="flex items-center gap-2 text-xs text-slate-300 hover:text-white">
                      <Globe className="h-3.5 w-3.5 shrink-0 text-slate-400" strokeWidth={1.5} />
                      {contact.website.replace(/^https?:\/\//, "")}
                    </a>
                  </li>
                )}
                {contact.github && (
                  <li>
                    <a href={`https://github.com/${contact.github}`} target="_blank" rel="noreferrer noopener"
                      className="flex items-center gap-2 text-xs text-slate-300 hover:text-white">
                      <Github className="h-3.5 w-3.5 shrink-0 text-slate-400" strokeWidth={1.5} />
                      {contact.github}
                    </a>
                  </li>
                )}
                {contact.linkedin && (
                  <li>
                    <a href={`https://linkedin.com/in/${contact.linkedin}`} target="_blank" rel="noreferrer noopener"
                      className="flex items-center gap-2 text-xs text-slate-300 hover:text-white">
                      <Linkedin className="h-3.5 w-3.5 shrink-0 text-slate-400" strokeWidth={1.5} />
                      {contact.linkedin}
                    </a>
                  </li>
                )}
                {contact.twitter && (
                  <li>
                    <a href={`https://twitter.com/${contact.twitter}`} target="_blank" rel="noreferrer noopener"
                      className="flex items-center gap-2 text-xs text-slate-300 hover:text-white">
                      <Twitter className="h-3.5 w-3.5 shrink-0 text-slate-400" strokeWidth={1.5} />
                      @{contact.twitter}
                    </a>
                  </li>
                )}
              </ul>
            </div>

            {/* Skills */}
            {data.skills.length > 0 && (
              <div className="mt-8">
                <h2 className="mb-3 text-[10px] font-bold tracking-[0.18em] text-slate-400 uppercase">Skills</h2>
                <div className="flex flex-wrap gap-1.5">
                  {data.skills.map((s) => (
                    <span key={s}
                      className="rounded bg-slate-700/60 px-2 py-0.5 text-[11px] text-slate-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {data.education.length > 0 && (
              <div className="mt-8">
                <h2 className="mb-3 text-[10px] font-bold tracking-[0.18em] text-slate-400 uppercase">Education</h2>
                <div className="space-y-4">
                  {data.education.map((e, i) => (
                    <div key={i}>
                      <p className="text-xs font-semibold text-slate-200">{e.school}</p>
                      <p className="text-[11px] text-slate-400">{e.degree}</p>
                      <p className="text-[11px] text-slate-500">{e.dates}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>

          {/* Main */}
          <main className="flex-1 px-10 py-12">
            {data.bio && (
              <section>
                <h2 className="text-[11px] font-bold tracking-[0.16em] text-slate-400 uppercase">About</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-700">{data.bio}</p>
              </section>
            )}

            {data.experience.length > 0 && (
              <section className="mt-10">
                <h2 className="text-[11px] font-bold tracking-[0.16em] text-slate-400 uppercase">
                  Experience
                </h2>
                <div className="mt-4 space-y-8">
                  {data.experience.map((job, i) => (
                    <div key={i} className="relative pl-5 before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-slate-800">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="font-semibold text-slate-900">{job.role}</h3>
                        <span className="shrink-0 text-sm text-slate-400">{job.dates}</span>
                      </div>
                      <p className="text-sm text-slate-500">{job.company}</p>
                      {job.bullets.length > 0 && (
                        <ul className="mt-2.5 space-y-1.5">
                          {job.bullets.map((b, j) => (
                            <li key={j} className="flex gap-2 text-sm leading-relaxed text-slate-600">
                              <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-400" />
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
              <section className="mt-10">
                <h2 className="text-[11px] font-bold tracking-[0.16em] text-slate-400 uppercase">
                  Projects
                </h2>
                <div className="mt-4 space-y-5">
                  {data.projects.map((p, i) => (
                    <div key={i} className="rounded-lg border border-slate-200 bg-white p-5">
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="font-semibold text-slate-900">
                          {p.link ? (
                            <a href={p.link} target="_blank" rel="noreferrer noopener"
                              className="hover:text-blue-700 hover:underline">
                              {p.name}
                            </a>
                          ) : p.name}
                        </h3>
                      </div>
                      {p.description && (
                        <p className="mt-1 text-sm leading-relaxed text-slate-600">{p.description}</p>
                      )}
                      {p.tech.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {p.tech.map((t) => (
                            <span key={t}
                              className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] text-slate-500">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
