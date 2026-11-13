export const promoMessages = [
  {
    id: "shipping",
    text: "Envio grátis para todo o Brasil",
  },
  {
    id: "returns",
    text: "Trocas e devoluções em até 7 dias!",
  },
  {
    id: "installments",
    text: "Parcele suas compras em até 12x!",
  },
] as const;

export const categories = [
  { label: "Todos produtos", href: "/produtos" },
  { label: "Camisetas", href: "/produtos/camisetas" },
  { label: "Agasalhos", href: "/produtos/agasalhos" },
  { label: "Bermudas", href: "/produtos/bermudas" },
] as const;

const nestedCategoryHrefs = [
  "/produtos/camisetas",
  "/produtos/agasalhos",
  "/produtos/bermudas",
] as const;

/**
 * Specific category paths are checked before `/produtos`.
 * A prefix check on `/produtos` first would mark every child as "Todos produtos".
 */
export function getActiveCategoryHref(pathname: string): string | null {
  for (const href of nestedCategoryHrefs) {
    if (pathname === href || pathname.startsWith(`${href}/`)) {
      return href;
    }
  }

  if (pathname === "/produtos") {
    return "/produtos";
  }

  return null;
}

/** Trimmed search text, or `null` when nothing remains. */
export function normalizeSearchTerm(value: string): string | null {
  const term = value.trim();

  if (term.length === 0) {
    return null;
  }

  return term;
}
