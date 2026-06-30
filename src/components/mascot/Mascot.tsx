"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MascotSVG } from "./MascotSVG";
import { SpeechBubble } from "./SpeechBubble";

interface MascotDict {
  label: string;
  greetings: string[];
}

interface MascotProps {
  dict: MascotDict;
}

const EYE_FACTOR = 0.04;
const PUPIL_MAX_X = 2.5;
const PUPIL_MAX_Y = 2;

export function Mascot({ dict }: MascotProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const leftPupilRef = useRef<SVGEllipseElement>(null);
  const rightPupilRef = useRef<SVGEllipseElement>(null);

  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [isBouncing, setIsBouncing] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [hasFinePointer, setHasFinePointer] = useState(false);

  const bubbleTimerRef = useRef<number | null>(null);
  const bounceTimerRef = useRef<number | null>(null);

  // Detect capabilities once on mount
  useEffect(() => {
    const motionMql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerMql = window.matchMedia("(hover: hover) and (pointer: fine)");

    setReduceMotion(motionMql.matches);
    setHasFinePointer(pointerMql.matches);

    const motionListener = (e: MediaQueryListEvent) =>
      setReduceMotion(e.matches);
    const pointerListener = (e: MediaQueryListEvent) =>
      setHasFinePointer(e.matches);

    motionMql.addEventListener("change", motionListener);
    pointerMql.addEventListener("change", pointerListener);

    return () => {
      motionMql.removeEventListener("change", motionListener);
      pointerMql.removeEventListener("change", pointerListener);
    };
  }, []);

  // Eye tracking — ref-based, no React re-renders on mousemove.
  useEffect(() => {
    if (!hasFinePointer || reduceMotion) return;

    const pointer = { x: -1, y: -1, seen: false };
    let rafId: number | null = null;
    const cachedCenter = { x: 0, y: 0 };
    let lastRectTime = 0;

    const handleMove = (e: MouseEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.seen = true;
      if (rafId !== null) return;
      rafId = requestAnimationFrame(tick);
    };

    const tick = () => {
      rafId = null;
      if (!pointer.seen || !wrapperRef.current) return;

      // Re-read mascot center at most every 200ms (cheap, covers scroll/resize
      // without a dedicated listener and without flushing layout every frame)
      const now = performance.now();
      if (now - lastRectTime > 200) {
        const rect = wrapperRef.current.getBoundingClientRect();
        cachedCenter.x = rect.left + rect.width / 2;
        cachedCenter.y = rect.top + rect.height / 2;
        lastRectTime = now;
      }

      const dx = (pointer.x - cachedCenter.x) * EYE_FACTOR;
      const dy = (pointer.y - cachedCenter.y) * EYE_FACTOR;
      const px = Math.max(-PUPIL_MAX_X, Math.min(PUPIL_MAX_X, dx));
      const py = Math.max(-PUPIL_MAX_Y, Math.min(PUPIL_MAX_Y, dy));

      if (leftPupilRef.current) {
        leftPupilRef.current.setAttribute("cx", String(33 + px));
        leftPupilRef.current.setAttribute("cy", String(44 + py));
      }
      if (rightPupilRef.current) {
        rightPupilRef.current.setAttribute("cx", String(49 + px));
        rightPupilRef.current.setAttribute("cy", String(44 + py));
      }
    };

    // Invalidate cached center on scroll / resize so fast scrolls re-sync
    const invalidate = () => {
      lastRectTime = 0;
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("scroll", invalidate, { passive: true });
    window.addEventListener("resize", invalidate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("scroll", invalidate);
      window.removeEventListener("resize", invalidate);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [hasFinePointer, reduceMotion]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (bubbleTimerRef.current) window.clearTimeout(bubbleTimerRef.current);
      if (bounceTimerRef.current) window.clearTimeout(bounceTimerRef.current);
    };
  }, []);

  const handleActivate = useCallback(() => {
    if (!reduceMotion) {
      setIsBouncing(true);
      if (bounceTimerRef.current) window.clearTimeout(bounceTimerRef.current);
      bounceTimerRef.current = window.setTimeout(
        () => setIsBouncing(false),
        500
      );
    }

    setGreetingIndex(Math.floor(Math.random() * dict.greetings.length));
    setBubbleVisible(true);
    if (bubbleTimerRef.current) window.clearTimeout(bubbleTimerRef.current);
    bubbleTimerRef.current = window.setTimeout(
      () => setBubbleVisible(false),
      3000
    );
  }, [reduceMotion, dict.greetings.length]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleActivate();
    }
  };

  return (
    <div
      ref={wrapperRef}
      className="site-mascot fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40"
    >
      <SpeechBubble
        text={dict.greetings[greetingIndex]}
        visible={bubbleVisible}
      />
      <button
        type="button"
        onClick={handleActivate}
        onKeyDown={handleKeyDown}
        aria-label={dict.label}
        data-cursor="hover"
        className={`block rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
          reduceMotion || isBouncing ? "" : "animate-breathe"
        }`}
        style={{
          animation: isBouncing
            ? "pop-bounce 500ms ease-out"
            : reduceMotion
              ? "none"
              : undefined,
        }}
      >
        <MascotSVG
          variant="idle"
          size={56}
          leftPupilRef={leftPupilRef}
          rightPupilRef={rightPupilRef}
        />
      </button>
    </div>
  );
}
