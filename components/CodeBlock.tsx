import type { ReactNode } from "react";
import CopyButton from "@/components/CopyButton";

type CodeBlockProps = {
  filename?: string;
  copyText: string;
  children: ReactNode;
  className?: string;
};

export default function CodeBlock({
  filename,
  copyText,
  children,
  className = "",
}: CodeBlockProps) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-border bg-surface shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ${className}`}
    >
      <div className="flex h-11 items-center justify-between gap-3 border-b border-border px-4">
        <span className="font-mono text-xs text-muted">{filename}</span>
        <CopyButton text={copyText} label="" />
      </div>
      <pre className="overflow-x-auto py-4 font-mono text-[13px] leading-6">
        {children}
      </pre>
    </div>
  );
}