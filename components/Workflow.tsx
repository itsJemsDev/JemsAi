import Reveal from "@/components/Reveal";
import { container, eyebrow, section, sectionLead, sectionTitle } from "@/components/styles";

const steps = [
  { number: "01", title: "Install", command: "npm install -g jemsai" },
  { number: "02", title: "Initialize", command: "jems-ai init" },
  { number: "03", title: "Add Skills", command: "jems-ai skill install security" },
  { number: "04", title: "Build", command: "jems-ai" },
];

export default function Workflow() {
  return (
    <section className={`${section} border-t border-border/60`}>
      <div className={container}>
        <Reveal className="text-center">
          <p className={eyebrow}>Getting started</p>
          <h2 className={`${sectionTitle} mx-auto max-w-2xl`}>
            Up and running in four steps.
          </h2>
          <p className={`${sectionLead} mx-auto`}>
            Install globally, initialize a project, add your skills, and start
            building.
          </p>
        </Reveal>
        <ol className="mt-8 grid grid-cols-2 gap-3 lg:mt-12 lg:grid-cols-4 lg:gap-4">
          {steps.map((step, index) => (
            <li key={step.number}>
              <Reveal delay={index * 80} className="h-full">
                <div className="flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-colors duration-300 hover:border-border-strong lg:p-6">
                  <span className="font-mono text-sm text-accent">
                    {step.number}
                  </span>
                  <h3 className="mt-4 text-base font-medium text-foreground">
                    {step.title}
                  </h3>
                  <div className="mt-4">
                    <code className="inline-block max-w-full overflow-x-auto whitespace-nowrap rounded-md border border-border bg-surface px-2.5 py-1.5 font-mono text-xs text-secondary">
                      {step.command}
                    </code>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}