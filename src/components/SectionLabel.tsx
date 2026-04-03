interface SectionLabelProps {
  children: React.ReactNode;
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <span className="inline-block text-caption text-muted-fg uppercase tracking-[0.15em] border-b border-border pb-2">
      {children}
    </span>
  );
}
