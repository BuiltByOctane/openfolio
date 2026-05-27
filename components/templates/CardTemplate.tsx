import { Mail, Globe, Github, Linkedin, Twitter, MapPin, ArrowUpRight, Briefcase, GraduationCap, Wrench } from "lucide-react";
import type { PortfolioData } from "@/types/portfolio";

const ACCENT_COLORS = [
  "bg-rose-100 text-rose-700",
  "bg-sky-100 text-sky-700",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-700",
  "bg-violet-100 text-violet-700",
  "bg-orange-100 text-orange-700",
];

export default function CardTemplate({ data }: { data: PortfolioData }) {
  const { contact } = data;
  const hasContact = !!(contact.email || contact.website || contact.github || contact.linkedin || contact.twitter);

  return (
    <div className="min-h-screen bg-neutral-100 font-sans antialiased">
      <div className="mx-auto max-w-4xl px-5 py-12">

        {/* Identity card */}
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <div className="flex items-start justify-between gap-6">
            <div className="flex items-start gap-5">
              {data.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={data.avatar}
                  alt={data.name}
                  className="h-16 w-16 rounded-2xl object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-200 text-2xl font-bold text-neutral-500">
                  {data.name.charAt(0)}
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-neutral-900">{data.name}</h1>
                <p className="mt-0.5 text-neutral-500">{data.headline}</p>
                {data.location && (
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-neutral-400">
                    <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} />
                    {data.location}
                  </p>
                )}
              </div>
            </div>
          </div>
          {data.bio && (
            <p className="mt-6 text-[15px] leading-relaxed text-neutral-600">{data.bio}</p>
          )}
          {hasContact && (
            <div className="mt-6 flex flex-wrap gap-3">
              {contact.email && (
                <a href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1.5 text-sm text-neutral-600 hover:bg-neutral-200">
                  <Mail className="h-3.5 w-3.5" strokeWidth={1.5} />
                  {contact.email}
                </a>
              )}
              {contact.github && (
                <a href={`https://github.com/${contact.github}`} target="_blank" rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1.5 text-sm text-neutral-600 hover:bg-neutral-200">
                  <Github className="h-3.5 w-3.5" strokeWidth={1.5} />
                  {contact.github}
                </a>
              )}
              {contact.linkedin && (
                <a href={`https://linkedin.com/in/${contact.linkedin}`} target="_blank" rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1.5 text-sm text-neutral-600 hover:bg-neutral-200">
                  <Linkedin className="h-3.5 w-3.5" strokeWidth={1.5} />
                  {contact.linkedin}
                </a>
              )}
              {contact.twitter && (
                <a href={`https://twitter.com/${contact.twitter}`} target="_blank" rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1.5 text-sm text-neutral-600 hover:bg-neutral-200">
                  <Twitter className="h-3.5 w-3.5" strokeWidth={1.5} />
                  @{contact.twitter}
                </a>
              )}
              {contact.website && (
                <a href={contact.website} target="_blank" rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1.5 text-sm text-neutral-600 hover:bg-neutral-200">
                  <Globe className="h-3.5 w-3.5" strokeWidth={1.5} />
                  {contact.website.replace(/^https?:\/\//, "")}
                </a>
              )}
            </div>
          )}
        </div>

        {/* Bento grid */}
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">

          {data.experience.length > 0 && (
            <div className="rounded-3xl bg-white p-7 shadow-sm md:col-span-2">
              <div className="mb-5 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100">
                  <Briefcase className="h-4 w-4 text-blue-600" strokeWidth={1.75} />
                </div>
                <h2 className="text-sm font-semibold text-neutral-900">Experience</h2>
              </div>
              <div className="divide-y divide-neutral-100">
                {data.experience.map((job, i) => (
                  <div key={i} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-neutral-900">{job.role}</p>
                        <p className="text-sm text-neutral-500">{job.company}</p>
                      </div>
                      <span className="shrink-0 rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs text-neutral-500">
                        {job.dates}
                      </span>
                    </div>
                    {job.bullets.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {job.bullets.map((b, j) => (
                          <li key={j} className="flex gap-2 text-sm leading-relaxed text-neutral-600">
                            <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-neutral-300" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.projects.length > 0 && (
            <>
              {data.projects.map((p, i) => (
                <div key={i} className="group rounded-3xl bg-white p-6 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-neutral-900">{p.name}</p>
                      {p.description && (
                        <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">{p.description}</p>
                      )}
                    </div>
                    {p.link && (
                      <a href={p.link} target="_blank" rel="noreferrer noopener"
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200">
                        <ArrowUpRight className="h-4 w-4 text-neutral-500" strokeWidth={1.75} />
                      </a>
                    )}
                  </div>
                  {p.tech.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.tech.map((t, ti) => (
                        <span key={t} className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${ACCENT_COLORS[(i + ti) % ACCENT_COLORS.length]}`}>
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </>
          )}

          {data.skills.length > 0 && (
            <div className="rounded-3xl bg-white p-7 shadow-sm">
              <div className="mb-5 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100">
                  <Wrench className="h-4 w-4 text-emerald-600" strokeWidth={1.75} />
                </div>
                <h2 className="text-sm font-semibold text-neutral-900">Skills</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((s, i) => (
                  <span key={s} className={`rounded-full px-3 py-1 text-sm font-medium ${ACCENT_COLORS[i % ACCENT_COLORS.length]}`}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {data.education.length > 0 && (
            <div className="rounded-3xl bg-white p-7 shadow-sm">
              <div className="mb-5 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100">
                  <GraduationCap className="h-4 w-4 text-amber-600" strokeWidth={1.75} />
                </div>
                <h2 className="text-sm font-semibold text-neutral-900">Education</h2>
              </div>
              <div className="space-y-4">
                {data.education.map((e, i) => (
                  <div key={i}>
                    <p className="font-semibold text-neutral-900 text-sm">{e.school}</p>
                    <p className="text-sm text-neutral-500">{e.degree}</p>
                    <p className="text-xs text-neutral-400 mt-0.5">{e.dates}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-neutral-400">
          © {new Date().getFullYear()} {data.name}
        </p>
      </div>
    </div>
  );
}
