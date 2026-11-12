"use client";

import { useEffect, useRef, useState } from "react";
import { promoMessages } from "@/lib/navigation";
import { DeliveryIcon, HeartIcon, ReturnIcon } from "./icons";

const promoIcons = {
  shipping: DeliveryIcon,
  returns: ReturnIcon,
  installments: HeartIcon,
} as const;

const rotateMs = 4000;
const desktopQuery = "(min-width: 1024px)";
const reduceMotionQuery = "(prefers-reduced-motion: reduce)";

export function PromoBar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const barRef = useRef<HTMLElement>(null);
  const pointerInsideRef = useRef(false);
  const focusInsideRef = useRef(false);

  useEffect(() => {
    const desktop = window.matchMedia(desktopQuery);
    const reduceMotion = window.matchMedia(reduceMotionQuery);
    const bar = barRef.current;
    let timer: number | undefined;

    const stop = () => {
      if (timer === undefined) {
        return;
      }

      window.clearInterval(timer);
      timer = undefined;
    };

    const canRun = () =>
      !desktop.matches &&
      !reduceMotion.matches &&
      !pointerInsideRef.current &&
      !focusInsideRef.current;

    const start = () => {
      stop();

      if (!canRun()) {
        return;
      }

      timer = window.setInterval(() => {
        setActiveIndex((current) => (current + 1) % promoMessages.length);
      }, rotateMs);
    };

    const onPointerEnter = () => {
      pointerInsideRef.current = true;
      stop();
    };

    const onPointerLeave = () => {
      pointerInsideRef.current = false;
      start();
    };

    const onFocusIn = () => {
      focusInsideRef.current = true;
      stop();
    };

    const onFocusOut = (event: FocusEvent) => {
      const next = event.relatedTarget;

      if (next instanceof Node && bar?.contains(next)) {
        return;
      }

      focusInsideRef.current = false;
      start();
    };

    const onDesktopChange = () => {
      if (desktop.matches) {
        stop();
        return;
      }

      setActiveIndex(0);
      start();
    };

    const onReduceMotionChange = () => {
      if (reduceMotion.matches) {
        stop();
        return;
      }

      start();
    };

    bar?.addEventListener("pointerenter", onPointerEnter);
    bar?.addEventListener("pointerleave", onPointerLeave);
    bar?.addEventListener("focusin", onFocusIn);
    bar?.addEventListener("focusout", onFocusOut);
    desktop.addEventListener("change", onDesktopChange);
    reduceMotion.addEventListener("change", onReduceMotionChange);
    start();

    return () => {
      stop();
      bar?.removeEventListener("pointerenter", onPointerEnter);
      bar?.removeEventListener("pointerleave", onPointerLeave);
      bar?.removeEventListener("focusin", onFocusIn);
      bar?.removeEventListener("focusout", onFocusOut);
      desktop.removeEventListener("change", onDesktopChange);
      reduceMotion.removeEventListener("change", onReduceMotionChange);
    };
  }, []);

  return (
    <section
      ref={barRef}
      id="promo-bar"
      aria-label="Benefícios da loja"
      tabIndex={0}
      className="bg-promo text-promo-foreground outline-none focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white"
    >
      <ul className="promo-list mx-auto min-h-10 w-full max-w-7xl px-4 py-2 lg:px-8">
        {promoMessages.map((message, index) => {
          const Icon = promoIcons[message.id];

          return (
            <li
              key={message.id}
              className="promo-phrase flex items-center gap-2 text-sm font-medium"
              data-active={index === activeIndex ? "true" : "false"}
            >
              <Icon className="size-4 shrink-0" />
              <span>{message.text}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
