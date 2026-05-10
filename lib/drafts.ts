import type { PortfolioData } from "@/types/portfolio";
import { randomUUID } from "crypto";

export type Draft = {
  id: string;
  data: PortfolioData;
  githubHandle: string;
  createdAt: number;
};

const TTL_MS = 30 * 60 * 1000; // 30 minutes

declare global {
  var __openfolio_drafts: Map<string, Draft> | undefined;
}

function store(): Map<string, Draft> {
  if (!globalThis.__openfolio_drafts) {
    globalThis.__openfolio_drafts = new Map();
  }
  return globalThis.__openfolio_drafts;
}

function sweep() {
  const now = Date.now();
  const s = store();
  for (const [id, d] of s.entries()) {
    if (now - d.createdAt > TTL_MS) s.delete(id);
  }
}

export function createDraft(input: Omit<Draft, "id" | "createdAt">): Draft {
  sweep();
  const id = randomUUID();
  const draft: Draft = { id, createdAt: Date.now(), ...input };
  store().set(id, draft);
  return draft;
}

export function getDraft(id: string): Draft | null {
  sweep();
  return store().get(id) ?? null;
}

export function deleteDraft(id: string) {
  store().delete(id);
}
