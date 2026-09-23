"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "@/components/icons";

type CopyButtonProps = {
  text: string;
  label?: string;
  className?: string;
};

export default function CopyButton({
  text,
  label,
  className,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const node = document.createElement("textarea");
      node.value = text;
      node.setAttribute("readonly", "");
      node.style.position = "fixed";
      node.style.opacity = "0";
      document.body.appendChild(node);
      node.select();
      document.execCommand("copy");
      document.body.removeChild(node);
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy ${text}`}
      className={
        className ??
        "inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 text-xs font-medium text-secondary transition-colors duration-200 hover:border-border-strong hover:text-foreground"
      }
    >
      {copied ? (
        <CheckIcon className="h-3.5 w-3.5 text-accent-strong" strokeWidth={2} />
      ) : (
        <CopyIcon className="h-3.5 w-3.5" />
      )}
      <span className="min-w-[3ch] text-left">
        {copied ? "Copied" : label ?? "Copy"}
      </span>
      <span aria-live="polite" className="sr-only">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </button>
  );
}