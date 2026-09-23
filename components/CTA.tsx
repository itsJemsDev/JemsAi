import CopyButton from "@/components/CopyButton";
import Reveal from "@/components/Reveal";
import { container, section } from "@/components/styles";

export default function CTA() {
  return (
    <section id="get-started" className={`${section} scroll-mt-20`}>
      <div className={container}>
        <Reveal>
          <div className="cta-glow relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border bg-surface px-6 py-14 text-center sm:px-12 md:py-20">
            <h2 className="text-balance text-3xl font-semibold tracking-[-0.02em] text-foreground sm:text-4xl">
              Build an AI that works your way.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-pretty text-base leading-relaxed text-secondary">
              Install Jems AI and start building with an AI you can extend.
            </p>
            <div className="mx-auto mt-8 flex max-w-md items-center justify-between gap-3 rounded-xl border border-border bg-card py-2.5 pl-4 pr-2">
              <code className="flex min-w-0 items-center gap-2 font-mono text-sm">
                <span aria-hidden="true" className="text-muted">$</span>
                <span className="truncate text-foreground">npm install -g jemsai</span>
              </code>
              <CopyButton text="npm install -g jemsai" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}