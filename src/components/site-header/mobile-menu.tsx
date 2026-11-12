"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AccountLink } from "./account-link";
import { BrandMark } from "./brand-mark";
import { CartLink } from "./cart-link";
import { CategoryNav, CategoryNavFallback } from "./category-nav";
import { CloseIcon, MenuIcon } from "./icons";
import { PromoBar } from "./promo-bar";
import { SearchForm, SearchFormFallback } from "./search-form";

const desktopQuery = "(min-width: 1024px)";

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(", ");

type MobileMenuProps = {
  hasItems: boolean;
  search: ReactNode;
  categories: ReactNode;
};

export function MobileMenu({ hasItems, search, categories }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef(true);
  const wasOpenRef = useRef(false);

  const closeMenu = useCallback((restoreFocus = true) => {
    restoreFocusRef.current = restoreFocus;
    setIsOpen(false);
  }, []);

  const close = useCallback(() => {
    closeMenu(true);
  }, [closeMenu]);

  const toggle = useCallback(() => {
    setIsOpen((current) => {
      if (current) {
        restoreFocusRef.current = true;
      }

      return !current;
    });
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia(desktopQuery);

    const onChange = () => {
      if (desktop.matches) {
        closeMenu(false);
      }
    };

    desktop.addEventListener("change", onChange);

    return () => desktop.removeEventListener("change", onChange);
  }, [closeMenu]);

  useEffect(() => {
    const page = document.getElementById("page-content");

    if (!page) {
      return;
    }

    if (isOpen) {
      page.setAttribute("inert", "");
    } else {
      page.removeAttribute("inert");
    }

    return () => page.removeAttribute("inert");
  }, [isOpen]);

  useEffect(() => {
    if (wasOpenRef.current && !isOpen && restoreFocusRef.current) {
      buttonRef.current?.focus();
    }

    wasOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    let frame = 0;
    let attempts = 0;

    const focusSearch = () => {
      const input = panelRef.current?.querySelector("input");

      if (input instanceof HTMLInputElement) {
        input.focus();
        return;
      }

      attempts += 1;

      if (attempts < 10) {
        frame = window.requestAnimationFrame(focusSearch);
      }
    };

    frame = window.requestAnimationFrame(focusSearch);

    return () => window.cancelAnimationFrame(frame);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (panelRef.current?.contains(target)) {
        return;
      }

      if (buttonRef.current?.contains(target)) {
        return;
      }

      if (document.getElementById("brand-mark")?.contains(target)) {
        return;
      }

      close();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusable = getFocusable(buttonRef.current, panelRef.current);

      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey) {
        if (active === first) {
          event.preventDefault();
          last?.focus();
        }

        return;
      }

      if (active === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [close, isOpen]);

  return (
    <>
      <PromoBar inert={isOpen} />
      <div className="bg-header">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-4 py-4 lg:gap-8 lg:px-8">
          <BrandMark
            tabIndex={isOpen ? -1 : undefined}
            onNavigate={isOpen ? close : undefined}
          />
          <div className="hidden min-w-0 flex-1 lg:block">{search}</div>
          <div className="hidden shrink-0 items-center lg:flex">
            <AccountLink />
            <CartLink hasItems={hasItems} />
          </div>
          <button
            ref={buttonRef}
            type="button"
            className="ms-auto inline-flex size-11 shrink-0 items-center justify-center rounded-full text-header-foreground outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-promo lg:hidden"
            aria-expanded={isOpen}
            aria-controls={menuId}
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            onClick={toggle}
          >
            {isOpen ? (
              <CloseIcon className="size-6" />
            ) : (
              <MenuIcon className="size-6" />
            )}
          </button>
        </div>
        <div className="hidden lg:block">{categories}</div>
        <div
          id={menuId}
          ref={panelRef}
          hidden={!isOpen}
          className="border-t border-white/15 px-4 py-5 lg:hidden"
        >
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
            <Suspense fallback={<SearchFormFallback />}>
              <SearchForm onValidSearch={close} />
            </Suspense>
            <Suspense fallback={<CategoryNavFallback layout="stack" />}>
              <CategoryNav layout="stack" onNavigate={close} />
            </Suspense>
            <div className="flex flex-wrap items-center gap-2">
              <AccountLink showLabel onNavigate={close} />
              <CartLink hasItems={hasItems} showLabel onNavigate={close} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function getFocusable(
  button: HTMLButtonElement | null,
  panel: HTMLDivElement | null,
) {
  const elements: HTMLElement[] = [];

  if (button && isVisible(button)) {
    elements.push(button);
  }

  if (!panel) {
    return elements;
  }

  const nodes = panel.querySelectorAll<HTMLElement>(focusableSelector);

  for (const node of nodes) {
    if (node.tabIndex === -1 || !isVisible(node)) {
      continue;
    }

    elements.push(node);
  }

  return elements;
}

function isVisible(element: HTMLElement) {
  return element.getClientRects().length > 0;
}
