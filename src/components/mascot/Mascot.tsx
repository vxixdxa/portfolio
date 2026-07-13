"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { SpeechBubble } from "./SpeechBubble";

type Context = "home" | "about" | "project" | "general";

interface MascotDict {
  label: string;
  hint: string;
  greetings: Record<Context, string[]>;
  easterEgg: string[];
}

interface MascotProps {
  dict: MascotDict;
}

// Number of clicks before the mascot starts replying with easter-egg lines.
const EASTER_EGG_AFTER = 5;
// Idle time with no interaction before the mascot wiggles to draw attention.
const IDLE_NUDGE_MS = 18000;

export function Mascot({ dict }: MascotProps) {
  const pathname = usePathname();

  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [bubbleText, setBubbleText] = useState("");
  const [isBouncing, setIsBouncing] = useState(false);
  const [attention, setAttention] = useState(false);
  const [sparkKey, setSparkKey] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  const clickCountRef = useRef(0);
  const lastGreetingRef = useRef("");

  const bubbleTimerRef = useRef<number | null>(null);
  const bounceTimerRef = useRef<number | null>(null);
  const attentionTimerRef = useRef<number | null>(null);
  const idleTimerRef = useRef<number | null>(null);

  // Which set of lines fits the current page.
  const context = useMemo<Context>(() => {
    const section = pathname.split("/").filter(Boolean)[1];
    if (!section) return "home";
    if (section === "about") return "about";
    if (section === "projects") return "project";
    return "general";
  }, [pathname]);

  useEffect(() => {
    const motionMql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(motionMql.matches);
    const listener = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    motionMql.addEventListener("change", listener);
    return () => motionMql.removeEventListener("change", listener);
  }, []);

  const showBubble = useCallback((text: string, ms = 3000) => {
    setBubbleText(text);
    setBubbleVisible(true);
    if (bubbleTimerRef.current) window.clearTimeout(bubbleTimerRef.current);
    bubbleTimerRef.current = window.setTimeout(() => setBubbleVisible(false), ms);
  }, []);

  const pickGreeting = useCallback(() => {
    const pool =
      clickCountRef.current >= EASTER_EGG_AFTER
        ? dict.easterEgg
        : dict.greetings[context] ?? dict.greetings.general;

    let text = pool[Math.floor(Math.random() * pool.length)];
    let guard = 0;
    while (pool.length > 1 && text === lastGreetingRef.current && guard < 6) {
      text = pool[Math.floor(Math.random() * pool.length)];
      guard += 1;
    }
    lastGreetingRef.current = text;
    return text;
  }, [dict, context]);

  // Schedule (and reschedule) the idle attention nudge.
  const scheduleIdleNudge = useCallback(() => {
    if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
    if (reduceMotion) return;
    idleTimerRef.current = window.setTimeout(() => {
      setAttention(true);
      if (attentionTimerRef.current) window.clearTimeout(attentionTimerRef.current);
      attentionTimerRef.current = window.setTimeout(() => setAttention(false), 1000);
      scheduleIdleNudge();
    }, IDLE_NUDGE_MS);
  }, [reduceMotion]);

  const handleActivate = useCallback(() => {
    clickCountRef.current += 1;

    if (!reduceMotion) {
      setIsBouncing(true);
      if (bounceTimerRef.current) window.clearTimeout(bounceTimerRef.current);
      bounceTimerRef.current = window.setTimeout(() => setIsBouncing(false), 500);
      setSparkKey((k) => k + 1);
    }

    showBubble(pickGreeting(), 3000);
    scheduleIdleNudge();
  }, [reduceMotion, showBubble, pickGreeting, scheduleIdleNudge]);

  // First-visit hint + start the idle nudge loop.
  useEffect(() => {
    let hintTimer: number | undefined;
    let greeted = true;
    try {
      greeted = localStorage.getItem("mascot-greeted") === "1";
    } catch {
      /* localStorage unavailable — skip the hint */
    }

    if (!greeted) {
      hintTimer = window.setTimeout(() => {
        showBubble(dict.hint, 4000);
        setAttention(true);
        window.setTimeout(() => setAttention(false), 1000);
        try {
          localStorage.setItem("mascot-greeted", "1");
        } catch {
          /* ignore */
        }
      }, 4000);
    }

    scheduleIdleNudge();

    return () => {
      if (hintTimer) window.clearTimeout(hintTimer);
    };
    // Run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      [bubbleTimerRef, bounceTimerRef, attentionTimerRef, idleTimerRef].forEach(
        (t) => {
          if (t.current) window.clearTimeout(t.current);
        }
      );
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleActivate();
    }
  };

  const buttonAnimation = reduceMotion
    ? "none"
    : isBouncing
      ? "pop-bounce 500ms ease-out"
      : attention
        ? "wiggle 0.5s ease-in-out 2"
        : undefined;

  const breathing = !reduceMotion && !isBouncing && !attention;

  return (
    <div className="site-mascot fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40">
      <SpeechBubble text={bubbleText} visible={bubbleVisible} />

      {/* Inspiration spark on click */}
      {!reduceMotion && sparkKey > 0 && (
        <span
          key={sparkKey}
          aria-hidden="true"
          className="animate-heart-float pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 0 L11.8 8.2 L20 10 L11.8 11.8 L10 20 L8.2 11.8 L0 10 L8.2 8.2 Z"
              fill="#1500FF"
            />
          </svg>
        </span>
      )}

      <button
        type="button"
        onClick={handleActivate}
        onKeyDown={handleKeyDown}
        aria-label={dict.label}
        data-cursor="hover"
        className={`block rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
          breathing ? "animate-breathe" : ""
        }`}
        style={{ animation: buttonAnimation }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/mascot.png"
          alt=""
          aria-hidden="true"
          draggable={false}
          className="block h-[60px] w-auto select-none"
        />
      </button>
    </div>
  );
}
