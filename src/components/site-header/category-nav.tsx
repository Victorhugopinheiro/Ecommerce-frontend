"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories, getActiveCategoryHref } from "@/lib/navigation";

type CategoryLayout = "row" | "stack";

type CategoryNavProps = {
  layout?: CategoryLayout;
  onNavigate?: () => void;
};

const linkClassName =
  "text-xs font-medium tracking-[0.18em] text-header-foreground uppercase outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-promo";

export function CategoryNav({
  layout = "row",
  onNavigate,
}: CategoryNavProps) {
  const pathname = usePathname();

  return (
    <CategoryList
      layout={layout}
      activeHref={getActiveCategoryHref(pathname)}
      onNavigate={onNavigate}
    />
  );
}

export function CategoryNavFallback({
  layout = "row",
}: {
  layout?: CategoryLayout;
}) {
  return <CategoryList layout={layout} activeHref={null} />;
}

function CategoryList({
  layout,
  activeHref,
  onNavigate,
}: {
  layout: CategoryLayout;
  activeHref: string | null;
  onNavigate?: () => void;
}) {
  const listClassName =
    layout === "row"
      ? "flex flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 py-3"
      : "flex flex-col items-stretch gap-1";

  return (
    <nav aria-label="Categorias">
      <ul className={listClassName}>
        {categories.map((category) => {
          const isActive = activeHref === category.href;

          return (
            <li key={category.href}>
              <Link
                href={category.href}
                aria-current={isActive ? "page" : undefined}
                onClick={onNavigate}
                className={`${linkClassName} ${
                  layout === "stack" ? "flex px-2 py-3" : "inline-flex"
                } ${isActive ? "underline decoration-2 underline-offset-8" : ""}`}
              >
                {category.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
