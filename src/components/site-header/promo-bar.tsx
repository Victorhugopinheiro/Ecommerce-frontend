import { promoMessages } from "@/lib/navigation";
import { DeliveryIcon, HeartIcon, ReturnIcon } from "./icons";

const promoIcons = {
  shipping: DeliveryIcon,
  returns: ReturnIcon,
  installments: HeartIcon,
} as const;

export function PromoBar() {
  return (
    <section
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
              data-active={index === 0 ? "true" : "false"}
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
