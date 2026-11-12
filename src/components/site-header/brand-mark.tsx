import Link from "next/link";

type BrandMarkProps = {
  onNavigate?: () => void;
};

export function BrandMark({ onNavigate }: BrandMarkProps) {
  return (
    <Link
      id="brand-mark"
      href="/"
      aria-label="Caverna do Nerd"
      onClick={onNavigate}
      className="inline-flex shrink-0 rounded-sm outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-promo"
    >
      <svg viewBox="0 0 168 52" aria-hidden="true" className="h-11 w-auto">
        <text
          x="1"
          y="23"
          fill="#1a9f45"
          stroke="#000000"
          strokeWidth="1.6"
          paintOrder="stroke fill"
          fontFamily="Arial Black, Impact, sans-serif"
          fontSize="24"
          letterSpacing="0.5"
        >
          CAVERNA
        </text>
        <text
          x="36"
          y="46"
          fill="#1a9f45"
          stroke="#000000"
          strokeWidth="1.6"
          paintOrder="stroke fill"
          fontFamily="Arial Black, Impact, sans-serif"
          fontSize="20"
          letterSpacing="1.4"
        >
          DO NERD
        </text>
      </svg>
    </Link>
  );
}
