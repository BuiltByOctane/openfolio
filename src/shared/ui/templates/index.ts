import type { ComponentType } from "react";
import type { PortfolioData, TemplateId } from "@/shared/types/portfolio";

import BeamTemplate from "./beam-template";
import EditorialTemplate from "./editorial-template";
import MarqueeTemplate from "./marquee-template";
import NotebookTemplate from "./notebook-template";
import TerminalTemplate from "./terminal-template";
import HearthTemplate from "./hearth-template";
import BlockTemplate from "./block-template";
import GlassTemplate from "./glass-template";
import InkTemplate from "./ink-template";
import DuskTemplate from "./dusk-template";
import CardTemplate from "./card-template";

export const TEMPLATES: Record<TemplateId, ComponentType<{ data: PortfolioData }>> = {
  beam: BeamTemplate,
  editorial: EditorialTemplate,
  marquee: MarqueeTemplate,
  notebook: NotebookTemplate,
  terminal: TerminalTemplate,
  hearth: HearthTemplate,
  block: BlockTemplate,
  glass: GlassTemplate,
  ink: InkTemplate,
  dusk: DuskTemplate,
  card: CardTemplate,
};

export const TEMPLATE_LABELS: Record<TemplateId, string> = {
  beam: "Beam",
  editorial: "Editorial",
  marquee: "Marquee",
  notebook: "Notebook",
  terminal: "Terminal",
  hearth: "Hearth",
  block: "Block",
  glass: "Glass",
  ink: "Ink",
  dusk: "Dusk",
  card: "Card",
};

export const TEMPLATE_DESCRIPTIONS: Record<TemplateId, string> = {
  beam: "Dark, tech-minimal. Linear / Vercel feel.",
  editorial: "Serif accents, magazine layout.",
  marquee: "Bold typographic statement, designer flex.",
  notebook: "Document-minimal, Notion-style.",
  terminal: "Monospace dev terminal.",
  hearth: "Warm, indie-blog cream.",
  block: "Brutalist, black-and-vermillion.",
  glass: "Frosted glass cards on deep violet gradient.",
  ink: "High-contrast print. Bold newspaper typography.",
  dusk: "Dark purple ethereal. Subtle vertical grid.",
  card: "Bento grid cards. Colorful, modern dashboard.",
};
