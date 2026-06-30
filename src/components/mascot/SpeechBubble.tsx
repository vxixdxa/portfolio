interface SpeechBubbleProps {
  text: string;
  visible: boolean;
}

export function SpeechBubble({ text, visible }: SpeechBubbleProps) {
  return (
    <div
      className="absolute bottom-full right-0 mb-3 pointer-events-none select-none"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(4px)",
        transition: "opacity 200ms ease-out, transform 200ms ease-out",
      }}
      aria-live="polite"
    >
      <div className="relative whitespace-nowrap rounded-2xl border border-border bg-background px-4 py-2 text-body-sm text-primary shadow-sm">
        {text}
        {/* Tail pointing down toward the mascot */}
        <svg
          width="14"
          height="8"
          viewBox="0 0 14 8"
          className="absolute -bottom-2 right-6"
          aria-hidden="true"
        >
          <path
            d="M 0 0 L 7 8 L 14 0 Z"
            fill="#FAFAFA"
            stroke="#E4E4E7"
            strokeWidth="1"
          />
          {/* Cover the top border line so the tail blends with the bubble */}
          <line x1="1" y1="0" x2="13" y2="0" stroke="#FAFAFA" strokeWidth="1.5" />
        </svg>
      </div>
    </div>
  );
}
