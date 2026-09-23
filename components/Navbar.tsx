"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "@/components/Logo";
import {
  ArrowRightIcon,
  CloseIcon,
  ExternalIcon,
} from "@/components/icons";
import { container } from "@/components/styles";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Skills", href: "#skills" },
  { label: "Docs", href: "https://www.npmjs.com/package/jemsai" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .filter((link) => link.href.startsWith("#"))
      .map((link) => link.href.slice(1))
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    const onClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [open]);

  const linkClass = (isActive: boolean) =>
    `group relative inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm transition-colors duration-200 ${
      isActive
        ? "bg-white/[0.08] text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
        : "text-secondary hover:bg-white/[0.04] hover:text-foreground"
    }`;

  const underlineClass = (isActive: boolean) =>
    `absolute inset-x-3 bottom-0.5 h-0.5 origin-center rounded-full bg-gradient-to-r from-accent to-accent-strong shadow-[0_0_10px_rgba(216,189,125,0.45)] transition-transform duration-300 ease-out ${
      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
    }`;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)]">
        <nav aria-label="Main" className={`${container} relative`}>
          <div
            className={`relative mt-3 flex h-14 items-center justify-between gap-3 rounded-2xl border px-3 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 motion-reduce:transition-none sm:px-4 md:mt-4 md:h-16 ${
              scrolled || open
                ? "border-border/90 bg-background/85 shadow-[0_16px_40px_-24px_rgba(0,0,0,0.9),0_0_0_1px_rgba(216,189,125,0.07),0_12px_40px_-20px_rgba(233,211,148,0.25)]"
                : "border-border/50 bg-background/50 shadow-[0_8px_32px_-20px_rgba(0,0,0,0.8)]"
            }`}
          >
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-x-0 top-0 h-16 overflow-hidden rounded-t-2xl transition-opacity duration-300 ${
                scrolled || open ? "opacity-100" : "opacity-60"
              }`}
            >
              <div className="h-full w-full bg-[radial-gradient(70%_140%_at_50%_0%,rgba(216,189,125,0.1),transparent_72%)]" />
            </div>

            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent transition-opacity duration-300 ${
                scrolled || open ? "opacity-100" : "opacity-50"
              }`}
            />

            <Logo />

            <div className="relative hidden items-center gap-0.5 md:flex">
              {navLinks.map((link) => {
                const isActive = link.href === active;
                const isExternal = link.href.startsWith("http");
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    className={linkClass(isActive)}
                    {...(isExternal
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                  >
                    {link.label}
                    {isExternal && (
                      <ExternalIcon className="h-3 w-3 opacity-50 transition-opacity duration-200 group-hover:opacity-90" />
                    )}
                    <span
                      aria-hidden="true"
                      className={underlineClass(isActive)}
                    />
                  </a>
                );
              })}
            </div>

            <button
              ref={buttonRef}
              type="button"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-secondary transition-colors duration-200 hover:border-border-strong hover:text-foreground md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              <span
                aria-hidden="true"
                className="relative block h-3.5 w-4 motion-reduce:transition-none"
              >
                <span
                  className={`absolute left-0 block h-0.5 w-full rounded-full bg-current transition-transform duration-300 ease-out motion-reduce:transition-none ${
                    open
                      ? "top-[6px] rotate-45"
                      : "top-0 group-hover:top-[2px]"
                  }`}
                />
                <span
                  className={`absolute left-0 top-[6px] block h-0.5 w-full rounded-full bg-current transition-opacity duration-200 motion-reduce:transition-none ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-0.5 w-full rounded-full bg-current transition-transform duration-300 ease-out motion-reduce:transition-none ${
                    open
                      ? "top-[6px] -rotate-45"
                      : "top-3 group-hover:top-[10px]"
                  }`}
                />
              </span>
            </button>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] overflow-hidden rounded-b-2xl"
            >
              <div
                className="h-full origin-left rounded-r-full bg-gradient-to-r from-accent to-accent-strong shadow-[0_0_10px_rgba(216,189,125,0.6)] transition-transform duration-150 ease-out motion-reduce:transition-none"
                style={{ transform: `scaleX(${progress})` }}
              />
            </div>
          </div>
        </nav>
      </header>

      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        ref={panelRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`fixed inset-y-0 right-0 z-[60] flex w-[min(20rem,88vw)] flex-col border-l border-border bg-background shadow-2xl transition-transform duration-300 ease-out motion-reduce:transition-none md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[radial-gradient(70%_120%_at_50%_0%,rgba(216,189,125,0.14),transparent_70%)]"
        />

        <div className="relative flex h-16 shrink-0 items-center justify-between px-5">
          <div
            className="cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <Logo href="#top" />
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-secondary transition-colors duration-200 hover:border-border-strong hover:text-foreground"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        <nav aria-label="Mobile" className="relative mt-2 flex-1 overflow-y-auto px-3">
          <div className="flex flex-col gap-1">
            {navLinks.map((link, index) => {
              const isActive = link.href === active;
              const isExternal = link.href.startsWith("http");
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "true" : undefined}
                  className={`group relative inline-flex items-center justify-between overflow-hidden rounded-lg px-4 py-3 text-[15px] transition-[color,background-color,opacity,transform] duration-200 motion-reduce:transition-none ${
                    isActive
                      ? "bg-white/[0.08] text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                      : "text-secondary hover:bg-white/[0.04] hover:text-foreground"
                  } ${open ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"}`}
                  style={{ transitionDelay: open ? `${80 + index * 55}ms` : "0ms" }}
                  {...(isExternal
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                >
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-accent to-accent-strong shadow-[0_0_8px_rgba(216,189,125,0.6)]"
                    />
                  )}
                  <span className="ml-0.5">{link.label}</span>
                  {isExternal ? (
                    <ExternalIcon className="h-4 w-4 text-muted transition-colors duration-200 group-hover:text-foreground" />
                  ) : (
                    <ArrowRightIcon className="h-4 w-4 text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-foreground" />
                  )}
                </a>
              );
            })}
          </div>
        </nav>

        <div className="relative shrink-0 px-5 pt-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
          <div
            className={`border-t border-border/70 pt-5 transition-[opacity,transform] duration-300 motion-reduce:transition-none ${
              open
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
            style={{
              transitionDelay: open
                ? `${80 + navLinks.length * 55 + 120}ms`
                : "0ms",
            }}
          >
            <p className="text-center font-mono text-xs text-muted">
              npm install -g jemsai
            </p>
          </div>
        </div>
      </div>
    </>
  );
}