import { notFound } from "next/navigation";
import { getDraft } from "@/lib/drafts";
import PreviewClient from "./PreviewClient";

export const dynamic = "force-dynamic";

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ draftId: string }>;
}) {
  const { draftId } = await params;
  const draft = getDraft(draftId);
  if (!draft || !draft.githubHandle) notFound();

  return (
    <PreviewClient
      draftId={draftId}
      data={draft.data}
      githubHandle={draft.githubHandle}
    />
  );
}
