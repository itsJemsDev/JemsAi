import type { ReactNode } from "react";

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  variant?: "default" | "featured";
  className?: string;
};

export default function FeatureCard({
  icon,
  title,
  description,
  variant = "default",
  className = "",
}: FeatureCardProps) {
  const featured = variant === "featured";

  return (
    <article
      className={`group relative h-full rounded-xl border p-5 transition-colors duration-300 sm:p-6 ${
        featured
          ? "border-accent/25 bg-accent/[0.04] hover:border-accent/45"
          : "border-border bg-card hover:border-border-strong hover:bg-card-elevated"
      } ${className}`}
    >
      {featured && (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
        />
      )}
      <div
        className={`mb-4 flex items-center justify-center rounded-lg border border-border bg-surface text-secondary transition-colors duration-300 group-hover:text-accent ${
          featured ? "h-11 w-11" : "h-10 w-10"
        }`}
      >
        {icon}
      </div>
      <h3
        className={`font-medium text-foreground ${
          featured ? "text-lg" : "text-base"
        }`}
      >
        {title}
      </h3>
      <p
        className={`mt-2 leading-relaxed text-muted ${
          featured ? "text-[15px]" : "text-sm"
        }`}
      >
        {description}
      </p>
    </article>
  );
}