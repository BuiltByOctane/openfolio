import type { ComponentType } from "react";
import type { PortfolioData, TemplateId } from "@/types/portfolio";

import BeamTemplate from "./BeamTemplate";
import EditorialTemplate from "./EditorialTemplate";
import MarqueeTemplate from "./MarqueeTemplate";
import NotebookTemplate from "./NotebookTemplate";
import TerminalTemplate from "./TerminalTemplate";
import HearthTemplate from "./HearthTemplate";
import BlockTemplate from "./BlockTemplate";
import GlassTemplate from "./GlassTemplate";
import InkTemplate from "./InkTemplate";
import DuskTemplate from "./DuskTemplate";
import CardTemplate from "./CardTemplate";

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
