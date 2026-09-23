import Logo from "@/components/Logo";
import { FacebookIcon, LinkIcon, TikTokIcon } from "@/components/icons";
import { container } from "@/components/styles";

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    Icon: FacebookIcon,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/",
    Icon: TikTokIcon,
  },
  {
    label: "Links",
    href: "#",
    Icon: LinkIcon,
  },
];

const footerLinks = [
  {
    label: "Documentation",
    href: "https://www.npmjs.com/package/jemsai",
  },
  {
    label: "Skills",
    href: "#skills",
  },
  {
    label: "npm",
    href: "https://www.npmjs.com/package/jemsai",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className={`${container} pt-14`}>
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <Logo />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              An AI coding agent you can extend.
            </p>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-secondary transition-colors duration-200 hover:text-foreground"
                {...(link.href.startsWith("http")
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-border py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-8">
            <span>© 2026 Jems AI</span>
            <span>Built for developers.</span>
          </div>
          <div className="flex items-center gap-3">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white/[0.03] text-secondary transition-colors duration-200 hover:border-border-strong hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}