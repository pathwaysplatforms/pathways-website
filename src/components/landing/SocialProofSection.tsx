"use client";

import { useEffect, useRef, useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

type NumericStat = { kind: "numeric"; to: number; suffix: string; label: string };
type TextStat    = { kind: "text";    display: string;             label: string };
type Stat        = NumericStat | TextStat;

const STATS: Stat[] = [
  { kind: "numeric", to: 2400, suffix: "+", label: "Applications Started"   },
  { kind: "numeric", to: 50,   suffix: "+", label: "Visa Pathways Available" },
  { kind: "numeric", to: 40,   suffix: "+", label: "Countries Supported"     },
  { kind: "text",    display: "Any",        label: "Language Supported"      },
];

// ── Hooks ─────────────────────────────────────────────────────────────────────

function useOnScreen(ref: React.RefObject<HTMLElement>, threshold = 0.4): boolean {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return visible;
}

function CountUp({
  to,
  suffix = "",
  duration = 1200,
  started,
}: {
  to: number;
  suffix?: string;
  duration?: number;
  started: boolean;
}) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!started) return;
    cancelAnimationFrame(rafRef.current);
    const startTime = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.round(eased * to));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [to, duration, started]);

  const formatted = count >= 1000 ? count.toLocaleString("en-CA") : String(count);
  return <>{formatted}{suffix}</>;
}

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * Social Proof Bar — landing-page-spec.md §2
 *
 * bg-green-light strip with 4 stats that count up when the section enters
 * the viewport. Desktop: single row with dividers. Mobile: 2×2 grid.
 */
export function SocialProofSection() {
  const ref     = useRef<HTMLElement>(null!);
  const started = useOnScreen(ref);

  return (
    <section
      ref={ref}
      aria-label="Social proof statistics"
      className="bg-white border-y border-grey-200 py-24 max-md:py-14"
    >
      <div className="max-w-[1280px] mx-auto px-10 max-md:px-5">

        {/* Desktop: flex row with pipe dividers — Mobile: 2×2 grid */}
        <div className="flex justify-center items-center max-md:grid max-md:grid-cols-2 max-md:gap-y-8">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`
                text-center px-12 max-lg:px-8 max-md:px-4
                ${i > 0 ? "border-l border-green-deep/10 max-md:border-l-0" : ""}
              `}
            >
              <p
                className="font-display text-6xl max-md:text-5xl font-normal tracking-tight text-grey-900 mb-2"
                style={{ letterSpacing: "-0.02em" }}
                aria-live={started ? "polite" : undefined}
              >
                {stat.kind === "numeric" ? (
                  <CountUp
                    to={stat.to}
                    suffix={stat.suffix}
                    started={started}
                  />
                ) : (
                  stat.display
                )}
              </p>
              <p className="text-sm font-medium uppercase tracking-widest text-grey-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
