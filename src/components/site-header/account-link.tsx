import Link from "next/link";
import { PersonIcon } from "./icons";

const iconLinkClassName =
  "inline-flex size-11 items-center justify-center rounded-full text-header-foreground outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-promo";

type AccountLinkProps = {
  onNavigate?: () => void;
  showLabel?: boolean;
};

export function AccountLink({
  onNavigate,
  showLabel = false,
}: AccountLinkProps) {
  return (
    <Link
      href="/conta"
      aria-label={showLabel ? undefined : "Conta"}
      onClick={onNavigate}
      className={
        showLabel ? `${iconLinkClassName} w-auto gap-2 px-3` : iconLinkClassName
      }
    >
      <PersonIcon className="size-6" />
      {showLabel ? <span className="text-sm font-medium">Conta</span> : null}
    </Link>
  );
}
