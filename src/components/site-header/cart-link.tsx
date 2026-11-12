import Link from "next/link";
import { CartIcon } from "./icons";

const iconLinkClassName =
  "relative inline-flex size-11 items-center justify-center rounded-full text-header-foreground outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-promo";

type CartLinkProps = {
  hasItems: boolean;
  onNavigate?: () => void;
  showLabel?: boolean;
};

export function CartLink({
  hasItems,
  onNavigate,
  showLabel = false,
}: CartLinkProps) {
  const accessibleName = hasItems ? "Carrinho com itens" : "Carrinho";

  return (
    <Link
      href="/carrinho"
      aria-label={accessibleName}
      onClick={onNavigate}
      className={
        showLabel ? `${iconLinkClassName} w-auto gap-2 px-3` : iconLinkClassName
      }
    >
      <span className="relative inline-flex">
        <CartIcon className="size-6" />
        {hasItems ? (
          <span
            aria-hidden="true"
            className="absolute -top-1 -right-1 size-2.5 rounded-full bg-promo ring-2 ring-header"
          />
        ) : null}
      </span>
      {showLabel ? <span className="text-sm font-medium">Carrinho</span> : null}
    </Link>
  );
}
