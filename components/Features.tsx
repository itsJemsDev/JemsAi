import FeatureCard from "@/components/FeatureCard";
import Parallax from "@/components/Parallax";
import Reveal from "@/components/Reveal";
import {
  BracketsIcon,
  CheckIcon,
  ChipIcon,
  FolderIcon,
  GridPlusIcon,
  LayoutIcon,
  TerminalIcon,
} from "@/components/icons";
import { container, eyebrow, section, sectionLead, sectionTitle } from "@/components/styles";

const features = [
  {
    icon: <TerminalIcon className="h-5 w-5" />,
    title: "Agent Powered",
    description:
      "Jems AI runs on a proven coding-agent engine, so you get agentic workflows out of the box instead of spending months wiring one together yourself.",
  },
  {
    icon: <GridPlusIcon className="h-4.5 w-4.5" />,
    title: "Custom Skills",
    description:
      "Drop-in modules that teach your agent frameworks, security rules, UI/UX standards, and more.",
  },
  {
    icon: <FolderIcon className="h-4.5 w-4.5" />,
    title: "Project Aware",
    description:
      "It reads your repo's architecture, conventions, and workflow before it writes a single line of code.",
  },
  {
    icon: <ChipIcon className="h-4.5 w-4.5" />,
    title: "Model Agnostic",
    description:
      "Swap the model underneath without changing how you work—no lock-in to a single vendor.",
  },
  {
    icon: <BracketsIcon className="h-4.5 w-4.5" />,
    title: "Open Source",
    description:
      "Auditable and self-hostable, so you own your agent end to end with no black boxes.",
  },
  {
    icon: <LayoutIcon className="h-4.5 w-4.5" />,
    title: "Editor Friendly",
    description:
      "Lives in your terminal and IDE, stays keyboard-first, and plugs into the workflow you already have.",
  },
];

const comparisons = [
  {
    label: "Agent engine",
    yours: "Ships built-in",
    roll: "Rebuild from scratch",
  },
  {
    label: "Skills",
    yours: "Batteries included",
    roll: "Write by hand",
  },
  {
    label: "Project context",
    yours: "Reads AGENTS.md",
    roll: "Config by memory",
  },
];

export default function Features() {
  return (
    <section id="features" className={`${section} scroll-mt-20`}>
      <div className={container}>
        <Reveal className="text-center">
          <p className={eyebrow}>Why Jems AI</p>
          <h2 className={`${sectionTitle} mx-auto max-w-2xl`}>
            Your work, wired straight into your AI
            <span className="text-accent">.</span>
          </h2>
          <p className={`${sectionLead} mx-auto`}>
            Jems AI pairs a proven coding-agent engine with skills and project
            context—so it thinks like a teammate who already knows your stack.
          </p>
        </Reveal>

        <div className="relative">
          <Parallax
            speed={-0.1}
            className="pointer-events-none absolute inset-x-0 top-6 -z-10 h-56 bg-accent/[0.04] blur-3xl"
          />
          <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            <Reveal className="h-full col-span-2">
              <FeatureCard
                variant="featured"
                icon={features[0].icon}
                title={features[0].title}
                description={features[0].description}
              />
            </Reveal>
            {features.slice(1).map((feature, index) => (
              <Reveal key={feature.title} delay={index * 60} className="h-full">
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={200} className="mt-12 lg:mt-16">
          <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-muted">
            <span>Compared to rolling your own</span>
          </p>
          <div className="mt-4 overflow-hidden rounded-xl border border-border bg-card">
            <div className="grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {comparisons.map((item) => (
                <div key={item.label} className="p-5 sm:p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                    {item.label}
                  </p>
                  <p className="mt-3 flex items-center gap-2 text-sm font-medium text-foreground">
                    <CheckIcon className="h-4 w-4 shrink-0 text-accent" />
                    {item.yours}
                  </p>
                  <p className="mt-1.5 flex items-center gap-2 text-sm text-muted">
                    <span
                      aria-hidden="true"
                      className="inline-block w-4 text-center text-border-strong"
                    >
                      —
                    </span>
                    {item.roll}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}