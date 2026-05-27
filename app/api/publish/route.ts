import { NextResponse } from "next/server";
import { z } from "zod";
import { getDraft, deleteDraft } from "@/lib/drafts";
import { saveProfile } from "@/lib/profiles";
import { TemplateIdSchema, isValidSlug } from "@/types/portfolio";

const Body = z.object({
  draftId: z.string().min(1),
  templateId: TemplateIdSchema,
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = Body.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }
  const { draftId, templateId } = parsed.data;

  const draft = getDraft(draftId);
  if (!draft) {
    return NextResponse.json(
      { error: "Draft expired. Start over." },
      { status: 404 },
    );
  }

  const slug = draft.githubHandle.toLowerCase();
  if (!isValidSlug(slug)) {
    return NextResponse.json(
      { error: `'${slug}' isn't a publishable slug.` },
      { status: 400 },
    );
  }

  try {
    saveProfile({ slug, templateId, data: draft.data });
  } catch (err) {
    console.error("publish error", err);
    return NextResponse.json({ error: "Couldn't save profile." }, { status: 500 });
  }

  deleteDraft(draftId);
  return NextResponse.json({ slug });
}
