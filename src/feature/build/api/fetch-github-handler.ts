import { NextResponse } from "next/server";
import { z } from "zod";
import {
  fetchGithubPortfolio,
  GithubError,
  normalizeHandle,
} from "@/feature/build/api/github-client";
import { createDraft } from "@/shared/lib/drafts";
import { PortfolioDataSchema } from "@/shared/types/portfolio";

const Body = z.object({ handle: z.string().min(1).max(80) });

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = Body.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "handle is required" }, { status: 400 });
  }

  const handle = normalizeHandle(parsed.data.handle);
  if (!handle) {
    return NextResponse.json(
      { error: "That doesn't look like a valid GitHub handle." },
      { status: 400 },
    );
  }

  try {
    const data = await fetchGithubPortfolio(handle);
    const safe = PortfolioDataSchema.parse(data);
    const draft = createDraft({
      data: safe,
      githubHandle: handle,
    });
    return NextResponse.json({ draftId: draft.id, handle, data: safe });
  } catch (err) {
    if (err instanceof GithubError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("fetch-github failed", err);
    return NextResponse.json(
      { error: "Couldn't parse this GitHub profile reliably." },
      { status: 500 },
    );
  }
}
