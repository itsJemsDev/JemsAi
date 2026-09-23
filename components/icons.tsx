type IconProps = {
  className?: string;
  strokeWidth?: number;
};

function brand(className: string | undefined, children: React.ReactNode) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className ?? "h-4 w-4"}
    >
      {children}
    </svg>
  );
}

function base(
  className: string | undefined,
  strokeWidth: number,
  children: React.ReactNode
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className ?? "h-4 w-4"}
    >
      {children}
    </svg>
  );
}

export function MenuIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return base(className, strokeWidth, (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </>
  ));
}

export function CloseIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return base(className, strokeWidth, (
    <>
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </>
  ));
}

export function FacebookIcon({ className }: IconProps) {
  return brand(className, (
    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.49-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
  ));
}

export function TikTokIcon({ className }: IconProps) {
  return brand(className, (
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1Z" />
  ));
}

export function LinkIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return base(className, strokeWidth, (
    <>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </>
  ));
}

export function CheckIcon({ className, strokeWidth = 2 }: IconProps) {
  return base(className, strokeWidth, <path d="m5 12 5 5L20 7" />);
}

export function CopyIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return base(className, strokeWidth, (
    <>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V5a2 2 0 0 1 2-2h10" />
    </>
  ));
}

export function ExternalIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return base(className, strokeWidth, (
    <>
      <path d="M15 3h6v6" />
      <path d="m10 14 11-11" />
      <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
    </>
  ));
}

export function ArrowRightIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return base(className, strokeWidth, (
    <>
      <path d="M5 12h14" />
      <path d="m14 7 5 5-5 5" />
    </>
  ));
}

export function ArrowDownIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return base(className, strokeWidth, (
    <>
      <path d="M12 4v16" />
      <path d="m7 15 5 5 5-5" />
    </>
  ));
}

export function TerminalIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return base(className, strokeWidth, (
    <>
      <path d="m4 7 5 5-5 5" />
      <path d="M11 17h9" />
      <path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
    </>
  ));
}

export function GridPlusIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return base(className, strokeWidth, (
    <>
      <rect x="3" y="3" width="8" height="8" rx="2" />
      <rect x="13" y="3" width="8" height="8" rx="2" />
      <rect x="3" y="13" width="8" height="8" rx="2" />
      <path d="M17 13v8" />
      <path d="M13 17h8" />
    </>
  ));
}

export function FolderIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return base(className, strokeWidth, (
    <>
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
      <path d="M3 11h18" />
    </>
  ));
}

export function BoltIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return base(className, strokeWidth, <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />);
}

export function BracketsIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return base(className, strokeWidth, (
    <>
      <path d="M8 3H6a2 2 0 0 0-2 2v5L2 12l2 2v5a2 2 0 0 0 2 2h2" />
      <path d="M16 3h2a2 2 0 0 1 2 2v5l2 2-2 2v5a2 2 0 0 1-2 2h-2" />
    </>
  ));
}

export function ShieldIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return base(className, strokeWidth, (
    <>
      <path d="M12 3l7 3v5c0 4.5-2.8 7.7-7 10-4.2-2.3-7-5.5-7-10V6l7-3Z" />
      <path d="m9 11.5 2 2 4-4.5" />
    </>
  ));
}

export function LayoutIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return base(className, strokeWidth, (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 9v11" />
    </>
  ));
}

export function DropletIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return base(className, strokeWidth, (
    <path d="M12 3c4 5 6.5 8.3 6.5 11.5a6.5 6.5 0 1 1-13 0C5.5 11.3 8 8 12 3Z" />
  ));
}

export function ChipIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return base(className, strokeWidth, (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <rect x="10" y="10" width="4" height="4" />
      <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
    </>
  ));
}