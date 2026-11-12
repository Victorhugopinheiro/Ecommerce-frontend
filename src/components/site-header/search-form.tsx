"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useId } from "react";
import { normalizeSearchTerm } from "@/lib/navigation";
import { SearchIcon } from "./icons";

const fieldClassName =
  "h-11 w-full rounded-full bg-search pe-12 ps-5 text-sm text-search-foreground outline-none placeholder:text-search-placeholder focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-promo";

type SearchFormProps = {
  onValidSearch?: () => void;
};

export function SearchForm({ onValidSearch }: SearchFormProps) {
  const inputId = useId();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const termFromUrl =
    pathname === "/buscar" ? (searchParams.get("q") ?? "") : "";

  function handleAction(formData: FormData) {
    const term = normalizeSearchTerm(String(formData.get("q") ?? ""));

    if (!term) {
      return;
    }

    router.push(`/buscar?q=${encodeURIComponent(term)}`);
    onValidSearch?.();
  }

  return (
    <form action={handleAction} role="search" className="relative w-full">
      <label htmlFor={inputId} className="sr-only">
        Buscar produtos
      </label>
      <input
        key={termFromUrl}
        id={inputId}
        name="q"
        defaultValue={termFromUrl}
        placeholder="Buscar produtos..."
        className={fieldClassName}
      />
      <button
        type="submit"
        aria-label="Buscar"
        className="absolute top-1 right-1 flex size-9 items-center justify-center rounded-full text-search-foreground outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-promo"
      >
        <SearchIcon className="size-5" />
      </button>
    </form>
  );
}

export function SearchFormFallback() {
  return (
    <div
      aria-hidden="true"
      className="flex h-11 w-full items-center rounded-full bg-search pe-12 ps-5 text-sm text-search-placeholder"
    >
      Buscar produtos...
    </div>
  );
}
