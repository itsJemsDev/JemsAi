import Image from "next/image";
import Reveal from "@/components/Reveal";
import { ArrowDownIcon, ChipIcon, FolderIcon, GridPlusIcon } from "@/components/icons";
import { container, eyebrow, section, sectionLead, sectionTitle } from "@/components/styles";

type NodeProps = {
  variant?: "top" | "branch" | "engine" | "external";
  icon?: React.ReactNode;
  children: React.ReactNode;
};

function Node({ variant = "branch", icon, children }: NodeProps) {
  const variants = {
    top: "border-accent/40 bg-card text-foreground font-mono font-semibold tracking-[0.12em]",
    branch:
      "border-border bg-card text-foreground text-sm font-medium transition-colors duration-300 hover:border-border-strong",
    engine:
      "border-border-strong bg-surface text-foreground font-mono font-semibold tracking-[0.08em]",
    external: "border-dashed border-border bg-surface text-secondary font-mono",
  };
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 ${variants[variant]}`}
    >
      {variant === "top" ? (
        <Image
          src="/JemsAiLogo.jpg"
          alt=""
          width={1254}
          height={1254}
          className="h-9 w-9 rounded-lg object-cover"
          aria-hidden
        />
      ) : null}
      {icon}
      {children}
    </div>
  );
}

const branches = [
  {
    name: "Skills",
    icon: <GridPlusIcon className="h-4 w-4" />,
    description:
      "Drop-in modules that teach your agent frameworks, conventions, and standards.",
  },
  {
    name: "Context",
    icon: <FolderIcon className="h-4 w-4" />,
    description: "Project context keeps the agent aligned with your codebase.",
  },
  {
    name: "Tools",
    icon: <ChipIcon className="h-4 w-4" />,
    description: "Filesystem, shell, and model callbacks the agent acts through.",
  },
];

export default function Architecture() {
  return (
    <section className={`${section} border-t border-border/60`}>
      <div className={container}>
        <Reveal className="text-center">
          <p className={eyebrow}>Architecture</p>
          <h2 className={`${sectionTitle} mx-auto max-w-2xl`}>
            A layer you control.
          </h2>
          <p className={`${sectionLead} mx-auto`}>
            Jems AI sits on top of a proven coding-agent engine. Skills,
            context, and tools feed the core agent.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-10 md:mt-16">
          <div className="mx-auto max-w-xl">
            <div className="flex justify-center">
              <Node variant="top">JEMS AI</Node>
            </div>

            <div aria-hidden="true" className="mx-auto h-6 w-px bg-border" />

            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute left-0 right-0 top-0 h-px bg-border"
              />
              <div className="grid gap-6 sm:grid-cols-3 sm:gap-4">
                {branches.map((branch) => (
                  <div
                    key={branch.name}
                    className="flex flex-col items-center gap-3 text-center"
                  >
                    <div aria-hidden="true" className="h-6 w-px bg-border" />
                    <Node icon={branch.icon}>{branch.name}</Node>
                    <p className="px-2 text-sm leading-relaxed text-muted">
                      {branch.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div aria-hidden="true" className="relative mt-6">
              <div
                aria-hidden="true"
                className="absolute left-0 right-0 top-0 h-px bg-border"
              />
              <div aria-hidden="true" className="mx-auto h-7 w-px bg-border" />
            </div>

            <div className="flex justify-center">
              <Node variant="engine">Agent Engine</Node>
            </div>

            <div
              aria-hidden="true"
              className="flex flex-col items-center gap-2 text-muted"
            >
              <div aria-hidden="true" className="h-6 w-px bg-border" />
              <ArrowDownIcon className="h-4 w-4" />
            </div>

            <div className="flex justify-center">
              <Node variant="external">LLM</Node>
            </div>
          </div>
        </Reveal>

        <Reveal delay={200} className="mx-auto mt-10 max-w-2xl md:mt-16">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                You own the inputs
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-secondary">
                Skills, context, and tools are yours to shape — add a skill to
                teach a framework, point the agent at your repo, connect the
                tools you already rely on.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                It powers the engine
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-secondary">
                A proven coding-agent engine orchestrates those inputs, while a
                model-agnostic layer keeps the LLM swappable — so nothing locks
                you in.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}