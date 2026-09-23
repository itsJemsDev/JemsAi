import CopyButton from "@/components/CopyButton";
import Parallax from "@/components/Parallax";
import Reveal from "@/components/Reveal";
import Terminal, { heroTerminalLines } from "@/components/Terminal";
import {
  badge,
  headingAccent,
} from "@/components/styles";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-24 pt-32 sm:pt-44 md:pb-32">
      <div aria-hidden="true" className="absolute inset-0">
        <Parallax speed={-0.16} className="hero-grid absolute inset-x-0 top-0 h-[560px]" />
        <Parallax speed={-0.2} className="hero-orb hero-orb--a -left-32 top-6 h-[26rem] w-[26rem]" />
        <Parallax speed={-0.22} className="hero-orb hero-orb--b -right-32 top-28 h-[22rem] w-[22rem]" />
        <Parallax speed={-0.1} className="hero-glow pointer-events-none absolute inset-x-0 top-0 h-[520px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 text-center sm:px-8">
        <p className={`${badge} animate-rise`} style={{ animationDelay: "0ms" }}>
          <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-strong opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Open-source AI coding agent
        </p>

        <h1
          className="animate-rise mx-auto mt-6 max-w-4xl text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-6xl md:text-7xl"
          style={{ animationDelay: "80ms" }}
        >
          <span className="block">
            Your <span className={headingAccent}>AI</span>
            <span className="text-accent">.</span>
          </span>
          <span className="block">
            Your <span className={headingAccent}>Skills</span>
            <span className="text-accent">.</span>
          </span>
          <span className="block">
            Your <span className={headingAccent}>Workflow</span>
            <span className="text-accent">.</span>
          </span>
        </h1>

        <p
          className="animate-rise mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-secondary sm:text-lg"
          style={{ animationDelay: "160ms" }}
        >
          Jems AI is an AI coding agent that lets you extend your AI with your
          own skills, context, and developer workflows.
        </p>

        <div
          className="animate-rise mx-auto mt-6 flex max-w-md items-center justify-between gap-3 rounded-xl border border-border bg-card py-2.5 pl-4 pr-2"
          style={{ animationDelay: "280ms" }}
        >
          <code className="flex min-w-0 items-center gap-2 font-mono text-sm">
            <span aria-hidden="true" className="text-muted">$</span>
            <span className="truncate text-foreground">npm install -g jemsai</span>
          </code>
          <div className="flex items-center justify-end">
            <CopyButton text="npm install -g jemsai" />
          </div>
        </div>
        <p
          className="animate-rise mt-3 font-mono text-xs text-muted"
          style={{ animationDelay: "320ms" }}
        >
          package v0.2.0 · open source
        </p>

        <div className="animate-rise mx-auto mt-10 max-w-2xl md:mt-14" style={{ animationDelay: "360ms" }}>
          <Reveal delay={80}>
            <Parallax speed={0.06} limit={40} className="relative">
              <div
                aria-hidden="true"
                className="absolute inset-x-8 -top-8 h-24 rounded-full bg-[radial-gradient(60%_100%_at_50%_50%,rgba(216,189,125,0.14),transparent_70%)] blur-xl"
              />
              <Terminal label="jems" lines={heroTerminalLines} />
            </Parallax>
          </Reveal>
        </div>
      </div>
    </section>
  );
}