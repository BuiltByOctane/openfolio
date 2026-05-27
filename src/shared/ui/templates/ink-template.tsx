import { Mail, Globe, Github, Linkedin, Twitter, MapPin } from "lucide-react";
import type { PortfolioData } from "@/shared/types/portfolio";

export default function InkTemplate({ data }: { data: PortfolioData }) {
  const { contact } = data;
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-white font-sans text-black antialiased">
      <div className="mx-auto max-w-2xl px-6 py-16 sm:py-24">

        <header className="border-b-4 border-black pb-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="text-6xl font-black leading-none tracking-tighter sm:text-8xl">
                {data.name}
              </h1>
              <p className="mt-3 text-lg font-medium text-neutral-600">{data.headline}</p>
            </div>
            {data.avatar && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={data.avatar}
                alt={data.name}
                className="h-20 w-20 shrink-0 rounded-sm object-cover grayscale"
              />
            )}
          </div>
          {data.location && (
            <p className="mt-4 flex items-center gap-1.5 text-sm text-neutral-500">
              <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} />
              {data.location}
            </p>
          )}
          {data.bio && (
            <p className="mt-6 text-[17px] leading-relaxed text-neutral-700">{data.bio}</p>
          )}
        </header>

        {data.experience.length > 0 && (
          <section className="mt-12">
            <h2 className="border-b-2 border-black pb-2 text-[11px] font-black tracking-[0.2em] uppercase">
              Work History
            </h2>
            <div className="mt-6 space-y-8">
              {data.experience.map((job, i) => (
                <div key={i} className="grid grid-cols-[1fr_auto] gap-x-6">
                  <div>
                    <h3 className="text-lg font-bold leading-tight">{job.role}</h3>
                    <p className="text-base font-medium text-neutral-600">{job.company}</p>
                    {job.bullets.length > 0 && (
                      <ul className="mt-3 space-y-1.5">
                        {job.bullets.map((b, j) => (
                          <li key={j} className="flex gap-3 text-sm leading-relaxed text-neutral-700">
                            <span aria-hidden className="shrink-0 font-black">—</span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <span className="text-sm font-medium tabular-nums text-neutral-500 text-right">
                    {job.dates}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.projects.length > 0 && (
          <section className="mt-12">
            <h2 className="border-b-2 border-black pb-2 text-[11px] font-black tracking-[0.2em] uppercase">
              Projects
            </h2>
            <div className="mt-6 space-y-6">
              {data.projects.map((p, i) => (
                <div key={i}>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-lg font-bold">
                      {p.link ? (
                        <a href={p.link} target="_blank" rel="noreferrer noopener"
                          className="underline decoration-2 underline-offset-2 hover:no-underline">
                          {p.name}
                        </a>
                      ) : p.name}
                    </h3>
                  </div>
                  {p.description && (
                    <p className="mt-1 text-sm leading-relaxed text-neutral-700">{p.description}</p>
                  )}
                  {p.tech.length > 0 && (
                    <p className="mt-2 text-xs font-medium text-neutral-500 uppercase tracking-wide">
                      {p.tech.join(" · ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="mt-12 grid gap-12 sm:grid-cols-2">
          {data.skills.length > 0 && (
            <section>
              <h2 className="border-b-2 border-black pb-2 text-[11px] font-black tracking-[0.2em] uppercase">
                Skills
              </h2>
              <ul className="mt-4 space-y-1">
                {data.skills.map((s) => (
                  <li key={s} className="flex items-center gap-2 text-sm text-neutral-700">
                    <span aria-hidden className="font-black text-black">·</span>
                    {s}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {data.education.length > 0 && (
            <section>
              <h2 className="border-b-2 border-black pb-2 text-[11px] font-black tracking-[0.2em] uppercase">
                Education
              </h2>
              <div className="mt-4 space-y-4">
                {data.education.map((e, i) => (
                  <div key={i}>
                    <p className="font-bold text-sm">{e.school}</p>
                    <p className="text-sm text-neutral-600">{e.degree}</p>
                    <p className="text-xs text-neutral-500">{e.dates}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <footer className="mt-16 border-t-4 border-black pt-6">
          <div className="flex flex-wrap items-center gap-4">
            {contact.email && (
              <a href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-700 underline decoration-1 underline-offset-2 hover:text-black hover:decoration-2">
                <Mail className="h-3.5 w-3.5" strokeWidth={2} />
                {contact.email}
              </a>
            )}
            {contact.website && (
              <a href={contact.website} target="_blank" rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-700 underline decoration-1 underline-offset-2 hover:text-black hover:decoration-2">
                <Globe className="h-3.5 w-3.5" strokeWidth={2} />
                {contact.website.replace(/^https?:\/\//, "")}
              </a>
            )}
            {contact.github && (
              <a href={`https://github.com/${contact.github}`} target="_blank" rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-700 underline decoration-1 underline-offset-2 hover:text-black hover:decoration-2">
                <Github className="h-3.5 w-3.5" strokeWidth={2} />
                {contact.github}
              </a>
            )}
            {contact.linkedin && (
              <a href={`https://linkedin.com/in/${contact.linkedin}`} target="_blank" rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-700 underline decoration-1 underline-offset-2 hover:text-black hover:decoration-2">
                <Linkedin className="h-3.5 w-3.5" strokeWidth={2} />
                {contact.linkedin}
              </a>
            )}
            {contact.twitter && (
              <a href={`https://twitter.com/${contact.twitter}`} target="_blank" rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-700 underline decoration-1 underline-offset-2 hover:text-black hover:decoration-2">
                <Twitter className="h-3.5 w-3.5" strokeWidth={2} />
                @{contact.twitter}
              </a>
            )}
          </div>
          <p className="mt-4 text-xs text-neutral-400">© {year} {data.name}</p>
        </footer>
      </div>
    </div>
  );
}
