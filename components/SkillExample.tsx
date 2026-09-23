import CodeBlock from "@/components/CodeBlock";
import Reveal from "@/components/Reveal";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import {
  container,
  eyebrow,
  section,
  secondaryBtn,
  sectionTitle,
} from "@/components/styles";

export const skillMarkdown = `---
name: project-conventions
description: Respect the conventions of any codebase
---

# Project Conventions

Inspect the existing architecture
before modifying code.

Preserve existing conventions.

Do not modify the database
unless explicitly requested.`;

const benefits = [
  "One markdown file. No runtime, no config.",
  "Auto-discovered from your skills folder.",
  "Composable for any framework or workflow.",
  "Shareable and versionable through git.",
];

export default function SkillExample() {
  return (
    <section className={`${section} border-t border-border/60`}>
      <div className={container}>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className={eyebrow}>Custom skills</p>
            <h2 className={`${sectionTitle} max-w-xl`}>
              A skill is just a file.
            </h2>
            <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-secondary">
              Skills are simple, portable, and extensible — written the way you
              already write code.
            </p>
            <ul className="mt-8 space-y-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent/40 text-accent">
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  <span className="text-sm leading-relaxed text-foreground">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
            <a href="#skills-install" className={`${secondaryBtn} mt-8`}>
              Create your own skills
              <ArrowRightIcon className="h-4 w-4" />
            </a>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-3xl bg-accent/[0.05] blur-2xl"
              />
              <div className="relative">
                <CodeBlock
                  filename="skills/project-conventions/SKILL.md"
                  copyText={skillMarkdown}
                >
                  <span className="text-muted">---</span>
                  {"\n"}
                  <span className="text-accent">name:</span>
                  <span className="text-foreground"> project-conventions</span>
                  {"\n"}
                  <span className="text-accent">description:</span>
                  <span className="text-foreground"> Respect the conventions of any codebase</span>
                  {"\n"}
                  <span className="text-muted">---</span>
                  {"\n\n"}
                  <span className="font-medium text-foreground"># Project Conventions</span>
                  {"\n\n"}
                  <span className="text-secondary">Inspect the existing architecture</span>
                  {"\n"}
                  <span className="text-secondary">before modifying code.</span>
                  {"\n\n"}
                  <span className="text-secondary">Preserve existing conventions.</span>
                  {"\n\n"}
                  <span className="text-secondary">Do not modify the database</span>
                  {"\n"}
                  <span className="text-secondary">unless explicitly requested.</span>
                </CodeBlock>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}