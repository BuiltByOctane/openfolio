import type { PortfolioData } from "@/shared/types/portfolio";

type GhUser = {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string | null;
  location: string | null;
  blog: string | null;
  twitter_username: string | null;
  html_url: string;
};

type GhRepo = {
  name: string;
  description: string | null;
  html_url: string;
  fork: boolean;
  stargazers_count: number;
  language: string | null;
  archived: boolean;
};

export class GithubError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "GithubError";
  }
}

function gh(path: string): Promise<Response> {
  return fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "openfolio (https://github.com)",
    },
    // 5-minute cache fits short-lived draft sessions
    next: { revalidate: 300 },
  });
}

export function normalizeHandle(input: string): string | null {
  const cleaned = input
    .trim()
    .replace(/^https?:\/\/(www\.)?github\.com\//i, "")
    .replace(/\/+$/, "")
    .replace(/^@/, "");
  if (!cleaned) return null;
  const first = cleaned.split("/")[0];
  if (!/^[a-zA-Z0-9-]{1,39}$/.test(first)) return null;
  return first.toLowerCase();
}

export async function fetchGithubPortfolio(handle: string): Promise<PortfolioData> {
  const userRes = await gh(`/users/${handle}`);
  if (userRes.status === 404) {
    throw new GithubError(`GitHub user '${handle}' not found.`, 404);
  }
  if (userRes.status === 403) {
    throw new GithubError(
      "GitHub rate limit reached. Try again in a few minutes.",
      403,
    );
  }
  if (!userRes.ok) {
    throw new GithubError(
      `GitHub responded with ${userRes.status}.`,
      userRes.status,
    );
  }
  const user = (await userRes.json()) as GhUser;

  const reposRes = await gh(`/users/${handle}/repos?sort=updated&per_page=100`);
  const repos: GhRepo[] = reposRes.ok ? await reposRes.json() : [];

  const topRepos = repos
    .filter((r) => !r.fork && !r.archived)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6);

  const languageCount = new Map<string, number>();
  for (const r of repos.filter((x) => !x.fork && x.language)) {
    const k = r.language as string;
    languageCount.set(k, (languageCount.get(k) ?? 0) + 1);
  }
  const skills = Array.from(languageCount.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([k]) => k);

  const bio = user.bio?.trim() ?? "";
  const headline = bio.split(/\n/)[0]?.trim() || "Developer";

  const website = sanitizeUrl(user.blog);

  return {
    name: user.name?.trim() || user.login,
    headline,
    bio,
    avatar: user.avatar_url ?? undefined,
    location: user.location ?? undefined,
    contact: {
      website,
      github: user.login,
      twitter: user.twitter_username ?? undefined,
    },
    experience: [],
    education: [],
    skills,
    projects: topRepos.map((r) => ({
      name: r.name,
      description: r.description ?? "",
      link: r.html_url,
      tech: r.language ? [r.language] : [],
    })),
  };
}

function sanitizeUrl(input: string | null | undefined): string | undefined {
  if (!input) return undefined;
  const trimmed = input.trim();
  if (!trimmed) return undefined;
  try {
    const withProto = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    const u = new URL(withProto);
    return u.toString().replace(/\/$/, "");
  } catch {
    return undefined;
  }
}
