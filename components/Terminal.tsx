import type { ReactNode } from "react";

export type TerminalLine =
  | { kind: "cmd"; value: string }
  | { kind: "ok"; value: string }
  | { kind: "title"; value: string }
  | { kind: "sub"; value: string }
  | { kind: "ready"; value: string };

export const heroTerminalLines: TerminalLine[] = [
  { kind: "cmd", value: "npm install -g jemsai" },
  { kind: "ok", value: "Jems AI installed" },
  { kind: "cmd", value: "jems-ai" },
  { kind: "title", value: "JEMS AI" },
  { kind: "sub", value: "Agent + Skills" },
  { kind: "ok", value: "Laravel Skill" },
  { kind: "ok", value: "Security Skill" },
  { kind: "ok", value: "UI/UX Skill" },
  { kind: "ready", value: "Ready." },
];

function renderLine(line: TerminalLine, index: number): ReactNode {
  switch (line.kind) {
    case "cmd":
      return (
        <span key={index}>
          <span className="text-muted">$ </span>
          <span className="text-foreground">{line.value}</span>
        </span>
      );
    case "ok":
      return (
        <span key={index}>
          <span className="text-accent-strong">✓ </span>
          <span className="text-secondary">{line.value}</span>
        </span>
      );
    case "title":
      return (
        <span key={index}>
          <span className="font-semibold text-foreground">{line.value}</span>
        </span>
      );
    case "sub":
      return (
        <span key={index}>
          <span className="text-secondary">{line.value}</span>
        </span>
      );
    case "ready":
      return (
        <span key={index}>
          <span className="font-medium text-foreground">{line.value}</span>
          <span aria-hidden="true" className="cursor-blink ml-1 text-accent-strong">
            ▍
          </span>
        </span>
      );
  }
}

type TerminalProps = {
  lines?: TerminalLine[];
  label?: string;
  className?: string;
};

export default function Terminal({
  lines = heroTerminalLines,
  label = "Jems",
  className = "",
}: TerminalProps) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-border bg-surface shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_24px_48px_-32px_rgba(0,0,0,0.9)] ${className}`}
    >
      <div className="flex h-11 items-center gap-2 border-b border-border px-4">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-stop-red" />
          <span className="h-3 w-3 rounded-full bg-stop-yellow" />
          <span className="h-3 w-3 rounded-full bg-stop-green" />
        </span>
        <span className="ml-auto font-mono text-xs text-muted">{label}</span>
      </div>
      <pre className="overflow-x-auto px-4 py-5 font-mono text-[13px] leading-6 sm:px-5">
        {lines.map(renderLine)}
      </pre>
    </div>
  );
}