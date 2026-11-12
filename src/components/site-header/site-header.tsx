import { Suspense } from "react";
import { AccountLink } from "./account-link";
import { BrandMark } from "./brand-mark";
import { CartLink } from "./cart-link";
import { CategoryNav, CategoryNavFallback } from "./category-nav";
import { PromoBar } from "./promo-bar";
import { SearchForm, SearchFormFallback } from "./search-form";

type SiteHeaderProps = {
  hasItems: boolean;
};

export function SiteHeader({ hasItems }: SiteHeaderProps) {
  return (
    <header className="font-sans text-header-foreground">
      <PromoBar />
      <div className="bg-header">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-4 py-4 sm:gap-6 lg:px-8">
          <BrandMark />
          <div className="min-w-0 flex-1">
            <Suspense fallback={<SearchFormFallback />}>
              <SearchForm />
            </Suspense>
          </div>
          <div className="flex shrink-0 items-center">
            <AccountLink />
            <CartLink hasItems={hasItems} />
          </div>
        </div>
        <Suspense fallback={<CategoryNavFallback />}>
          <CategoryNav />
        </Suspense>
      </div>
    </header>
  );
}
