"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type ParallaxProps = {
  children?: ReactNode;
  className?: string;
  speed?: number;
  limit?: number;
  style?: CSSProperties;
  ariaHidden?: boolean;
};

export default function Parallax({
  children,
  className = "",
  speed = -0.12,
  limit = 60,
  style,
  ariaHidden,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const shifted = (center - window.innerHeight / 2) * speed;
      const offset = Math.max(-limit, Math.min(limit, shifted));
      node.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [speed, limit]);

  return (
    <div
      ref={ref}
      aria-hidden={ariaHidden}
      className={className}
      style={{ ...style, willChange: "transform" }}
    >
      {children}
    </div>
  );
}