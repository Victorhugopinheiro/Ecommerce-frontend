import type { ReactNode } from "react";

type IconProps = {
  className?: string;
};

type IconBaseProps = IconProps & {
  children: ReactNode;
};

function IconBase({ className, children }: IconBaseProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

export function DeliveryIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M3 7.5h10.5V16H3z" />
      <path d="M13.5 11h3.2L20 14.2V16h-6.5" />
      <circle cx="7" cy="17.5" r="1.4" />
      <circle cx="16.5" cy="17.5" r="1.4" />
    </IconBase>
  );
}

export function ReturnIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M7 7h10.5" />
      <path d="m15 4.5 2.8 2.5L15 9.5" />
      <path d="M17 17H6.5" />
      <path d="m9 14.5-2.8 2.5L9 19.5" />
    </IconBase>
  );
}

export function HeartIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M12 19.2S5.8 15.4 5.8 11.6A3.2 3.2 0 0 1 12 9.1a3.2 3.2 0 0 1 6.2 2.5c0 3.8-6.2 7.6-6.2 7.6z" />
    </IconBase>
  );
}

export function SearchIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <circle cx="11" cy="11" r="6" />
      <path d="m16 16 4 4" />
    </IconBase>
  );
}

export function PersonIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 19.2c1.2-3 3.4-4.4 6.5-4.4s5.3 1.4 6.5 4.4" />
    </IconBase>
  );
}

export function CartIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M5 7h15l-1.6 8.2H7.2L5 7z" />
      <path d="M5 7 4 4H2" />
      <circle cx="9" cy="19" r="1.3" />
      <circle cx="17" cy="19" r="1.3" />
    </IconBase>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </IconBase>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M6 6 18 18" />
      <path d="M18 6 6 18" />
    </IconBase>
  );
}
