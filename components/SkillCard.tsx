import type { ReactNode } from "react";

type SkillCardProps = {
  icon: ReactNode;
  category: string;
  name: string;
  description: string;
  tags: string[];
};

export default function SkillCard({
  icon,
  category,
  name,
  description,
  tags,
}: SkillCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-card-elevated hover:shadow-[0_12px_40px_-16px_rgba(0,0,0,0.7)]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
        {category}
      </p>
      <div className="mt-4 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-secondary transition-colors duration-300 group-hover:border-accent/30 group-hover:text-accent">
        {icon}
      </div>
      <h3 className="mt-4 text-[15px] font-medium text-foreground">{name}</h3>
      <p className="mt-1 text-sm leading-relaxed text-muted">{description}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <li
            key={tag}
            className="rounded-md border border-border bg-surface px-2 py-0.5 font-mono text-xs text-secondary"
          >
            {tag}
          </li>
        ))}
      </ul>
    </article>
  );
}