interface LoadingIndicatorProps {
  label?: string;
  fullscreen?: boolean;
}

export function LoadingIndicator({
  label,
  fullscreen = true,
}: LoadingIndicatorProps) {
  const wrapperClass = fullscreen
    ? "fixed inset-0 z-[60] flex flex-col items-center justify-center gap-4 bg-background/70 backdrop-blur-sm"
    : "flex flex-col items-center justify-center gap-4 py-24";

  return (
    <div
      className={wrapperClass}
      role="status"
      aria-live="polite"
      style={{
        opacity: 0,
        animation: "fade-in-up 200ms ease-out 150ms forwards",
      }}
    >
      <div className="flex items-end gap-2" aria-hidden="true">
        <span
          className="h-2 w-2 rounded-full bg-accent animate-bounce-dot"
          style={{ animationDelay: "0ms" }}
        />
        <span
          className="h-2 w-2 rounded-full bg-accent animate-bounce-dot"
          style={{ animationDelay: "160ms" }}
        />
        <span
          className="h-2 w-2 rounded-full bg-accent animate-bounce-dot"
          style={{ animationDelay: "320ms" }}
        />
      </div>
      {label && (
        <span className="text-caption uppercase tracking-wider text-muted-fg">
          {label}
        </span>
      )}
    </div>
  );
}
