import type { PortfolioData } from "@/types/portfolio";

export const samplePortfolio: PortfolioData = {
  name: "Alex Morgan",
  headline: "Backend engineer — distributed systems and storage",
  bio: "I build the infrastructure that keeps high-throughput systems honest: durable queues, idempotent pipelines, and the plumbing nobody notices when it works. Currently focused on database internals and storage engines. Previously at Stripe and a handful of early-stage startups.",
  avatar: "https://i.pravatar.cc/128?img=12",
  location: "Brooklyn, NY",
  contact: {
    email: "alex@morgan.dev",
    website: "https://morgan.dev",
    github: "alexmorgan",
    linkedin: "alexmorgan",
    twitter: "alexmorgan",
  },
  experience: [
    {
      role: "Staff Engineer",
      company: "Plinth",
      dates: "2023 — Present",
      bullets: [
        "Lead the storage team building a column-oriented OLAP engine in Rust. Took p99 query latency from 1.4s to 240ms on a 12B-row benchmark.",
        "Designed and shipped a write-ahead log with crash-consistent snapshots; eliminated a class of replay bugs that had haunted on-call rotations for two years.",
        "Mentor four engineers and run the team's design-review process.",
      ],
    },
    {
      role: "Senior Software Engineer",
      company: "Stripe",
      dates: "2019 — 2023",
      bullets: [
        "Owned the idempotency layer for the payments API. Served 12k requests/sec at four nines with no customer-visible incidents over the final 18 months.",
        "Migrated 600+ services from a homegrown RPC system to gRPC; wrote the codemod that handled 80% of call sites automatically.",
      ],
    },
    {
      role: "Software Engineer",
      company: "Tidepool (YC W18)",
      dates: "2017 — 2019",
      bullets: [
        "Second engineer. Built the original event pipeline (Kafka + Postgres) that the company still runs today.",
        "Set up the deploy and observability stack from scratch on a budget of three afternoons.",
      ],
    },
  ],
  education: [
    {
      school: "Carnegie Mellon University",
      degree: "B.S. Computer Science",
      dates: "2013 — 2017",
    },
  ],
  skills: [
    "Rust",
    "Go",
    "Python",
    "TypeScript",
    "PostgreSQL",
    "Kafka",
    "Redis",
    "gRPC",
    "Kubernetes",
    "Terraform",
    "AWS",
    "Linux",
    "Distributed systems",
    "Storage engines",
    "Observability",
  ],
  projects: [
    {
      name: "litequeue",
      description:
        "A single-binary durable job queue built on SQLite. Handles 50k jobs/sec on a laptop with exactly-once semantics.",
      link: "https://github.com/alexmorgan/litequeue",
      tech: ["Rust", "SQLite", "Tokio"],
    },
    {
      name: "pgwatch",
      description:
        "Postgres replication-lag monitor with a wire-protocol-level probe. Catches stalls that pg_stat_replication misses.",
      link: "https://github.com/alexmorgan/pgwatch",
      tech: ["Go", "PostgreSQL", "Prometheus"],
    },
    {
      name: "shardmap",
      description:
        "A consistent-hashing library with bounded-load support. Used in production by three companies I know about.",
      link: "https://github.com/alexmorgan/shardmap",
      tech: ["Rust", "no_std"],
    },
    {
      name: "logcat.dev",
      description:
        "A weekly newsletter on database internals and storage research. ~3,200 subscribers.",
      link: "https://logcat.dev",
      tech: ["Writing", "Research"],
    },
  ],
};

export const githubOnlyFixture: PortfolioData = {
  name: "vercel",
  headline: "Developer",
  bio: "Develop. Preview. Ship.",
  avatar: "https://avatars.githubusercontent.com/u/14985020",
  location: undefined,
  contact: {
    website: "https://vercel.com",
    github: "vercel",
    twitter: "vercel",
  },
  experience: [],
  education: [],
  skills: ["TypeScript", "JavaScript", "Go", "Rust", "Python"],
  projects: [
    {
      name: "next.js",
      description:
        "The React Framework for the Web — used by some of the world's largest companies.",
      link: "https://github.com/vercel/next.js",
      tech: ["TypeScript"],
    },
    {
      name: "turborepo",
      description: "Build system optimized for JavaScript and TypeScript, written in Rust.",
      link: "https://github.com/vercel/turborepo",
      tech: ["Rust"],
    },
    {
      name: "ai",
      description: "The AI Toolkit for TypeScript.",
      link: "https://github.com/vercel/ai",
      tech: ["TypeScript"],
    },
  ],
};
