import Reveal from "@/components/Reveal";
import Terminal, { type TerminalLine } from "@/components/Terminal";
import { container, eyebrow, section, sectionLead, sectionTitle } from "@/components/styles";

const installLines: TerminalLine[] = [
  { kind: "cmd", value: "jems-ai skill install security" },
  { kind: "ok", value: "Security skill installed" },
  { kind: "cmd", value: "jems-ai skill create my-skill" },
];

export default function SkillInstall() {
  return (
    <section id="skills-install" className={`${section} scroll-mt-20 border-t border-border/60`}>
      <div className={container}>
        <Reveal className="text-center">
          <p className={eyebrow}>SKILL SYSTEM</p>
          <h2 className={`${sectionTitle} mx-auto max-w-2xl`}>
            Install skills, or build your own.
          </h2>
          <p className={`${sectionLead} mx-auto`}>
            Install a skill for any framework, domain, or workflow. There is no
            separate runtime to configure.
          </p>
        </Reveal>
        <Reveal delay={100} className="mx-auto mt-8 max-w-xl">
          <Terminal lines={installLines} label="jems-ai" />
        </Reveal>
        <Reveal delay={200} className="mt-5 text-center">
          <p className="font-mono text-sm text-accent-strong">
            Create your own skills.
          </p>
        </Reveal>
      </div>
    </section>
  );
}