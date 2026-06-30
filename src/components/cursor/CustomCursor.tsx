"use client";

import { useEffect, useRef, useState } from "react";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]';

const DOT_SIZE = 6;
const RING_SIZE = 32;
const RING_HOVER_SCALE = 1.5;
const RING_CLICK_SCALE = 0.75;
const LERP = 0.3;

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Decide whether to enable (desktop with fine pointer). This runs once,
  // client-only, and the component always renders JSX — we just make it
  // invisible and inert until enabled, which avoids ref-reattach cycles.
  useEffect(() => {
    const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (mql.matches) setEnabled(true);
  }, []);

  // One effect owns the entire pointer pipeline: listeners, rAF loop, and
  // DOM writes. Never toggles based on state other than `enabled`, so refs
  // stay stable.
  useEffect(() => {
    if (!enabled) return;

    const target = { x: -100, y: -100, seen: false };
    const pos = { x: -100, y: -100 };
    let isHover = false;
    let isClicking = false;
    let reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let prevBorder = "";
    let prevBg = "";
    let prevOpacity = "";
    let hoverThrottle = 0;
    let rafId = 0;

    document.body.classList.add("has-custom-cursor");

    const reduceMql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reduceListener = (e: MediaQueryListEvent) => {
      reduce = e.matches;
    };
    reduceMql.addEventListener("change", reduceListener);

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      target.seen = true;
    };
    const onDown = () => {
      isClicking = true;
    };
    const onUp = () => {
      isClicking = false;
    };
    const onLeave = () => {
      target.x = -100;
      target.y = -100;
    };

    const tick = () => {
      const dot = dotRef.current;
      const ring = ringRef.current;

      if (dot) {
        dot.style.transform = `translate3d(${target.x - DOT_SIZE / 2}px, ${target.y - DOT_SIZE / 2}px, 0)`;
      }

      if (reduce) {
        pos.x = target.x;
        pos.y = target.y;
      } else {
        pos.x += (target.x - pos.x) * LERP;
        pos.y += (target.y - pos.y) * LERP;
        if (Math.abs(target.x - pos.x) < 0.3) pos.x = target.x;
        if (Math.abs(target.y - pos.y) < 0.3) pos.y = target.y;
      }

      // Hover detection every other frame (~30Hz)
      if (target.seen && ++hoverThrottle % 2 === 0) {
        const el = document.elementFromPoint(target.x, target.y) as Element | null;
        isHover = Boolean(el?.closest(INTERACTIVE_SELECTOR));
      }

      if (ring) {
        const scale = isClicking
          ? RING_CLICK_SCALE
          : isHover
            ? RING_HOVER_SCALE
            : 1;
        ring.style.transform = `translate3d(${pos.x - RING_SIZE / 2}px, ${pos.y - RING_SIZE / 2}px, 0) scale(${scale})`;

        const border = isHover
          ? "1.5px solid #1500FF"
          : "1.5px solid rgba(9, 9, 11, 0.5)";
        const bg = isHover ? "rgba(21, 0, 255, 0.08)" : "transparent";
        if (prevBorder !== border) {
          ring.style.border = border;
          prevBorder = border;
        }
        if (prevBg !== bg) {
          ring.style.backgroundColor = bg;
          prevBg = bg;
        }
      }

      if (dot) {
        const opacity = isHover ? "0.2" : "1";
        if (prevOpacity !== opacity) {
          dot.style.opacity = opacity;
          prevOpacity = opacity;
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      reduceMql.removeEventListener("change", reduceListener);
      if (rafId) cancelAnimationFrame(rafId);
      document.body.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
        contain: "layout style",
        display: enabled ? "block" : "none",
      }}
    >
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: RING_SIZE,
          height: RING_SIZE,
          borderRadius: "9999px",
          border: "1.5px solid rgba(9, 9, 11, 0.5)",
          backgroundColor: "transparent",
          transition:
            "border-color 150ms ease-out, background-color 150ms ease-out",
          willChange: "transform",
          pointerEvents: "none",
          transform: "translate3d(-100px, -100px, 0)",
          transformOrigin: "center center",
        }}
      />
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: DOT_SIZE,
          height: DOT_SIZE,
          borderRadius: "9999px",
          backgroundColor: "#09090B",
          willChange: "transform",
          pointerEvents: "none",
          transform: "translate3d(-100px, -100px, 0)",
          opacity: 1,
          transition: "opacity 150ms ease-out",
        }}
      />
    </div>
  );
}
