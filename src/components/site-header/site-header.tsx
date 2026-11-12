type SiteHeaderProps = {
  hasItems: boolean;
};

export function SiteHeader({ hasItems }: SiteHeaderProps) {
  return <header className="font-sans" data-has-items={hasItems} />;
}
