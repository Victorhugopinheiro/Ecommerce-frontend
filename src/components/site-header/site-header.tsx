import { Suspense } from "react";
import { CategoryNav, CategoryNavFallback } from "./category-nav";
import { MobileMenu } from "./mobile-menu";
import { SearchForm, SearchFormFallback } from "./search-form";

type SiteHeaderProps = {
  hasItems: boolean;
};

export function SiteHeader({ hasItems }: SiteHeaderProps) {
  return (
    <header className="font-sans text-header-foreground">
      <MobileMenu
        hasItems={hasItems}
        search={
          <Suspense fallback={<SearchFormFallback />}>
            <SearchForm />
          </Suspense>
        }
        categories={
          <Suspense fallback={<CategoryNavFallback />}>
            <CategoryNav />
          </Suspense>
        }
      />
    </header>
  );
}
