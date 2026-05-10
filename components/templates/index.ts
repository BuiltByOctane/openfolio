import type { ComponentType } from "react";
import type { PortfolioData, TemplateId } from "@/types/portfolio";

import BeamTemplate from "./BeamTemplate";
import EditorialTemplate from "./EditorialTemplate";
import MarqueeTemplate from "./MarqueeTemplate";
import NotebookTemplate from "./NotebookTemplate";
import TerminalTemplate from "./TerminalTemplate";
import HearthTemplate from "./HearthTemplate";
import BlockTemplate from "./BlockTemplate";

export const TEMPLATES: Record<TemplateId, ComponentType<{ data: PortfolioData }>> = {
  beam: BeamTemplate,
  editorial: EditorialTemplate,
  marquee: MarqueeTemplate,
  notebook: NotebookTemplate,
  terminal: TerminalTemplate,
  hearth: HearthTemplate,
  block: BlockTemplate,
};

export const TEMPLATE_LABELS: Record<TemplateId, string> = {
  beam: "Beam",
  editorial: "Editorial",
  marquee: "Marquee",
  notebook: "Notebook",
  terminal: "Terminal",
  hearth: "Hearth",
  block: "Block",
};

export const TEMPLATE_DESCRIPTIONS: Record<TemplateId, string> = {
  beam: "Dark, tech-minimal. Linear / Vercel feel.",
  editorial: "Serif accents, magazine layout.",
  marquee: "Bold typographic statement, designer flex.",
  notebook: "Document-minimal, Notion-style.",
  terminal: "Monospace dev terminal.",
  hearth: "Warm, indie-blog cream.",
  block: "Brutalist, black-and-vermillion.",
};
