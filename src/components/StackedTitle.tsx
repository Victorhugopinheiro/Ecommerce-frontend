import { cn } from "cn";

interface StackedTitleProps {
  /** Top line, solid white. */
  title: string;
  /** Bottom line, solid highlight pink, locked tight under the title. */
  highlight: string;
  /** Drops the display chip and centers the two lines on each other. */
  bare?: boolean;
  className?: string;
}

export default function StackedTitle({
  title,
  highlight,
  bare = false,
  className,
}: StackedTitleProps) {
  return (
    <h2
      className={cn(
        "flex w-fit flex-col font-[family-name:var(--font-geist-sans)] text-5xl font-black uppercase leading-[0.8] tracking-tight text-white md:text-6xl",
        bare ? "items-center" : "items-start bg-display px-3 py-2",
        className,
      )}
    >
      <span>{title}</span>
      <span className="text-highlight">{highlight}</span>
    </h2>
  );
}
