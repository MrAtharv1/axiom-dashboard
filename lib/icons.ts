import {
  Layers,
  Network,
  Brain,
  Zap,
  Code2,
  Database,
  Globe,
  Shield,
  Cpu,
  GitBranch,
  Terminal,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  Layers,
  Network,
  Brain,
  Zap,
  Code2,
  Database,
  Globe,
  Shield,
  Cpu,
  GitBranch,
  Terminal,
  Workflow,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Code2;
}

export const categoryColors: Record<string, { text: string; bg: string; border: string }> = {
  Engineering: {
    text: "text-ice",
    bg: "bg-ice/10",
    border: "border-ice/20",
  },
  Architecture: {
    text: "text-mint",
    bg: "bg-mint/10",
    border: "border-mint/20",
  },
  "AI/ML": {
    text: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/20",
  },
  Design: {
    text: "text-rose",
    bg: "bg-rose/10",
    border: "border-rose/20",
  },
};

export function getCategoryStyle(category: string | null) {
  return (
    categoryColors[category ?? ""] ?? {
      text: "text-platinum-400",
      bg: "bg-platinum-400/10",
      border: "border-platinum-400/20",
    }
  );
}
