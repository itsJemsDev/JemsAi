import Image from "next/image";
import Reveal from "@/components/Reveal";
import { ChipIcon, GridPlusIcon } from "@/components/icons";
import { container, eyebrow, section, sectionLead, sectionTitle } from "@/components/styles";

type PillarProps = {
  icon: React.ReactNode;
  term: string;
  description: string;
  highlight?: boolean;
};

function Pillar({ icon, term, description, highlight = false }: PillarProps) {
  return (
    <div
      className={`group relative mx-auto w-full max-w-md rounded-xl border p-5 text-center transition-colors duration-300 ${
        highlight
          ? "border-accent/25 bg-accent/[0.04] hover:border-accent/45"
          : "border-border bg-card hover:border-border-strong hover:bg-card-elevated"
      }`}
    >
      {highlight && (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
        />
      )}
      <div
        className={`mx-auto mb-4 flex items-center justify-center rounded-lg border border-border bg-surface text-secondary transition-colors duration-300 group-hover:text-accent ${
          highlight ? "h-11 w-11" : "h-10 w-10"
        }`}
      >
        {icon}
      </div>
      <h3
        className={`font-mono font-semibold tracking-[0.08em] ${
          highlight ? "text-accent-strong" : "text-foreground"
        }`}
      >
        {term}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
    </div>
  );
}

function Operator({ children }: { children: React.ReactNode }) {
  return (
    <span
      aria-hidden="true"
      className="hidden select-none items-center justify-center font-mono text-xl text-muted md:flex"
    >
      {children}
    </span>
  );
}

export default function Foundation() {
  return (
    <section className={`${section} border-t border-border/60`}>
      <div className={container}>
        <Reveal className="text-center">
          <p className={eyebrow}>Built on a foundation</p>
          <h2 className={`${sectionTitle} mx-auto max-w-2xl`}>
            Powered by a proven core.
          </h2>
          <p className={`${sectionLead} mx-auto`}>
            Most teams burn months wiring an agent from scratch. Jems AI starts
            from an engine that already works and adds the layer that&apos;s
            yours to shape.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-10 md:mt-14">
          <div
            aria-label="Agent Engine plus Jems Skills equals Jems AI"
            className="mx-auto grid w-full max-w-xs grid-cols-1 gap-4 md:flex md:max-w-none md:flex-row md:items-stretch md:gap-5"
          >
            <Pillar
              icon={<ChipIcon className="h-5 w-5" />}
              term="Agent Engine"
              description="A battle-tested core handles planning, tool use, and agentic loops — so you don't rebuild it."
            />
            <Operator>+</Operator>
            <Pillar
              icon={<GridPlusIcon className="h-5 w-5" />}
              term="Jems Skills"
              description="Drop-in modules that teach your agent your frameworks, security rules, and standards."
            />
            <Operator>=</Operator>
            <Pillar
              highlight
              icon={
                <Image
                  src="/JemsAiLogo.jpg"
                  alt=""
                  width={1254}
                  height={1254}
                  priority
                  className="h-11 w-11 rounded-lg object-cover"
                  aria-hidden
                />
              }
              term="Jems AI"
              description="The proven engine plus your layer — ready from day one."
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}