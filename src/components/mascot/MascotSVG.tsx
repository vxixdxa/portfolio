import type { Ref } from "react";

interface MascotSVGProps {
  variant?: "idle" | "lost";
  size?: number;
  className?: string;
  /** Receives the left pupil element after mount (idle variant only). */
  leftPupilRef?: Ref<SVGEllipseElement>;
  /** Receives the right pupil element after mount (idle variant only). */
  rightPupilRef?: Ref<SVGEllipseElement>;
}

/**
 * Stickie — a sticky-note character pinned to the page.
 *
 * The body is a dog-eared paper rectangle. A #1500FF pin at the top-center
 * holds it in place (idle) — in the lost variant the pin is missing and the
 * paper tilts askew. A small blue "signature" squiggle near the bottom
 * anchors the designer-portfolio identity without needing a face antenna.
 *
 * viewBox is 80x80. Body occupies roughly (20,22) → (62,74).
 */
export function MascotSVG({
  variant = "idle",
  size = 64,
  className = "",
  leftPupilRef,
  rightPupilRef,
}: MascotSVGProps) {
  const isLost = variant === "lost";

  return (
    <svg
      viewBox="0 0 80 80"
      width={size}
      height={size}
      className={className}
      role="presentation"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Pin (idle only) — the blue brand dot */}
      {!isLost && (
        <g>
          <circle
            cx="40"
            cy="17"
            r="3"
            fill="#1500FF"
            stroke="#09090B"
            strokeWidth="1"
          />
          {/* Tiny highlight on the pin head */}
          <circle cx="39" cy="16" r="0.8" fill="#FFFFFF" opacity="0.5" />
          {/* Pin shadow / insertion line */}
          <line
            x1="40"
            y1="20"
            x2="40"
            y2="22"
            stroke="#09090B"
            strokeWidth="0.9"
            opacity="0.5"
          />
        </g>
      )}

      {/* Paper body — tilts in lost variant */}
      <g
        transform={isLost ? "rotate(-8 40 48)" : undefined}
        style={{ transition: "transform 400ms ease-out" }}
      >
        {/* Main sheet with dog-eared top-right corner */}
        <path
          d="M 20 22 L 54 22 L 62 30 L 62 72 Q 62 74 60 74 L 22 74 Q 20 74 20 72 Z"
          fill="#FAFAFA"
          stroke="#09090B"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Folded corner triangle (slightly darker) */}
        <path
          d="M 54 22 L 54 30 L 62 30"
          fill="#E4E4E7"
          stroke="#09090B"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Cheeks — soft mint */}
        <ellipse
          cx="28"
          cy="52"
          rx="3.8"
          ry="2.3"
          fill="#E8F5E9"
          opacity="0.95"
        />
        <ellipse
          cx="54"
          cy="52"
          rx="3.8"
          ry="2.3"
          fill="#E8F5E9"
          opacity="0.95"
        />

        {/* Eyes */}
        {isLost ? (
          <g
            stroke="#09090B"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
          >
            {/* Closed / resting arcs */}
            <path d="M 29 44 Q 33 47 37 44" />
            <path d="M 45 44 Q 49 47 53 44" />
          </g>
        ) : (
          <g fill="#09090B">
            <ellipse ref={leftPupilRef} cx="33" cy="44" rx="2" ry="2.5" />
            <ellipse ref={rightPupilRef} cx="49" cy="44" rx="2" ry="2.5" />
          </g>
        )}

        {/* Mouth — tiny smile (idle) or flat line (lost) */}
        {isLost ? (
          <line
            x1="36"
            y1="60"
            x2="46"
            y2="60"
            stroke="#09090B"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.55"
          />
        ) : (
          <path
            d="M 36 58 Q 41 61 46 58"
            stroke="#09090B"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />
        )}

        {/* Signature squiggle — #1500FF brand accent (idle) or crossed (lost) */}
        {isLost ? (
          <g
            stroke="#1500FF"
            strokeWidth="1.3"
            strokeLinecap="round"
            fill="none"
            opacity="0.5"
          >
            <line x1="28" y1="66" x2="46" y2="70" />
            <line x1="28" y1="70" x2="46" y2="66" />
          </g>
        ) : (
          <path
            d="M 28 68 Q 31 65 34 68 T 40 68 T 46 68"
            stroke="#1500FF"
            strokeWidth="1.3"
            fill="none"
            strokeLinecap="round"
            opacity="0.85"
          />
        )}
      </g>
    </svg>
  );
}
