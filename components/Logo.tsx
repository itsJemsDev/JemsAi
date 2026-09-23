import Image from "next/image";

type LogoProps = {
  className?: string;
  href?: string;
};

export default function Logo({ className = "", href = "#top" }: LogoProps) {
  return (
    <a
      href={href}
      aria-label="Jems AI — home"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <span className="inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-white transition-[box-shadow,transform] duration-200 group-hover:scale-[1.04] group-hover:shadow-[0_0_0_2px_rgba(216,189,125,0.5)]">
        <Image
          src="/JemsAiLogo.jpg"
          alt=""
          width={1254}
          height={1254}
          priority
          className="h-9 w-9 object-cover"
          aria-hidden
        />
      </span>
      <span className="text-sm font-semibold tracking-[0.12em] text-foreground transition-colors duration-200 group-hover:text-accent">
        JEMS AI
      </span>
    </a>
  );
}