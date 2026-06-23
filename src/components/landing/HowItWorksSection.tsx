"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, LayoutList, FileCheck, FilePen } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ── Mockups ────────────────────────────────────────────────────────────────────

function VoiceMockup() {
  return (
    <div className="bg-green-tint rounded-3xl p-8 flex items-center justify-center h-full min-h-[220px]">
      <div className="bg-white rounded-2xl shadow-card-md p-6 w-full max-w-[400px]">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-full bg-green-deep flex items-center justify-center shrink-0">
            <Mic size={14} className="text-white" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold text-grey-900">Pathways AI</p>
            <p className="text-xs text-grey-500">Listening…</p>
          </div>
          <div className="ml-auto flex gap-[3px] items-end h-5">
            {[3, 6, 10, 7, 4, 9, 6, 3].map((h, i) => (
              <span key={i} className="w-[3px] rounded-full bg-green-deep/40" style={{ height: `${h * 2}px` }} />
            ))}
          </div>
        </div>
        <div className="space-y-2.5">
          {["Where are you currently living?", "What is your highest level of education?"].map((q, i) => (
            <div key={i} className={`text-xs px-3 py-2 rounded-xl ${i === 0 ? "bg-green-deep text-white" : "bg-grey-100 text-grey-700"}`}>{q}</div>
          ))}
          <div className="flex gap-[2px] items-center mt-1 pl-1">
            {[4, 7, 5, 9, 6, 8, 4, 6, 3].map((h, i) => (
              <span key={i} className="w-[3px] rounded-full bg-green-deep animate-pulse" style={{ height: `${h * 2}px`, animationDelay: `${i * 80}ms` }} />
            ))}
            <span className="text-[10px] text-grey-400 ml-2">Responding…</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PathwayMatchMockup() {
  const cards = [
    { name: "Express Entry", match: "Strong Match", pct: "92" },
    { name: "Ontario Immigrant Nominee", match: "Good Match", pct: "78" },
  ];
  return (
    <div className="bg-green-tint rounded-3xl p-8 flex items-center justify-center h-full min-h-[220px]">
      <div className="w-full max-w-[400px] space-y-3">
        {cards.map((c, i) => (
          <div key={c.name} className={`bg-white rounded-2xl shadow-card-md overflow-hidden ${i === 1 ? "opacity-70 scale-[0.97] origin-bottom" : ""}`}>
            <div className="bg-green-deep px-5 py-3 flex items-center justify-between">
              <span className="text-white text-sm font-semibold">{c.name}</span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-green-light/80">🇨🇦 Canada</span>
            </div>
            <div className="px-5 py-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-grey-400 mb-0.5">Match</p>
                <p className="text-sm font-semibold text-grey-900">{c.match}</p>
              </div>
              <div className="w-12 h-12 rounded-full border-[3px] border-green-deep flex items-center justify-center">
                <span className="text-xs font-bold text-green-deep">{c.pct}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChecklistMockup() {
  const items = [
    { label: "Language test (IELTS/TEF)", done: true },
    { label: "Educational credential assessment", done: true },
    { label: "Police clearance certificate", done: false },
    { label: "Proof of funds", done: false },
  ];
  return (
    <div className="bg-green-tint rounded-3xl p-8 flex items-center justify-center h-full min-h-[220px]">
      <div className="bg-white rounded-2xl shadow-card-md p-6 w-full max-w-[400px]">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-semibold text-grey-900">Your Checklist</p>
          <span className="text-xs font-semibold text-green-deep bg-green-tint px-2 py-0.5 rounded-full">2 / 4 done</span>
        </div>
        <div className="w-full bg-grey-100 rounded-full h-1.5 mb-5">
          <div className="bg-green-deep h-1.5 rounded-full" style={{ width: "50%" }} />
        </div>
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.label} className="flex items-center gap-3">
              <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${item.done ? "bg-green-deep border-green-deep" : "border-grey-300"}`}>
                {item.done && (
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none" aria-hidden="true">
                    <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <span className={`text-xs leading-snug ${item.done ? "line-through text-grey-300" : "text-grey-700"}`}>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function DocumentMockup() {
  return (
    <div className="bg-green-tint rounded-3xl p-8 flex items-center justify-center h-full min-h-[220px]">
      <div className="bg-white rounded-2xl shadow-card-md p-6 w-full max-w-[400px]">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-semibold text-grey-900">Personal Statement</p>
          <span className="flex items-center gap-1.5 text-[10px] font-semibold text-green-deep bg-green-tint px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-deep animate-pulse" />
            Generating
          </span>
        </div>
        <div className="space-y-2">
          {[100, 90, 100, 75, 100, 60].map((w, i) => (
            <div key={i} className="h-2 bg-grey-100 rounded-full overflow-hidden" style={{ width: `${w}%` }}>
              <div className="h-full bg-green-deep/20 rounded-full animate-pulse" style={{ animationDelay: `${i * 120}ms` }} />
            </div>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-2 text-xs text-grey-400">
          <FilePen size={12} aria-hidden="true" />
          Draft ready in a few seconds…
        </div>
      </div>
    </div>
  );
}

// ── Types & data ───────────────────────────────────────────────────────────────

interface StepDef {
  num:     string;
  icon:    LucideIcon;
  heading: string;
  body:    string;
  visual:  React.ReactNode;
}

const STEPS: StepDef[] = [
  {
    num:     "01",
    icon:    Mic,
    heading: "Tell us about yourself",
    body:    "Speak naturally in your own language. Our AI voice assistant asks the right questions to understand your background, goals, and situation — no forms, no jargon.",
    visual:  <VoiceMockup />,
  },
  {
    num:     "02",
    icon:    LayoutList,
    heading: "Get your matched pathways",
    body:    "Based on your profile, we surface the visa pathways you actually qualify for — retrieved directly from our verified database, not generated by AI. Accurate, reliable, and clear.",
    visual:  <PathwayMatchMockup />,
  },
  {
    num:     "03",
    icon:    FileCheck,
    heading: "Get your personalised checklist",
    body:    "Every pathway comes with a step-by-step checklist built around your specific profile. Know exactly what documents you need, what forms to fill, and in what order.",
    visual:  <ChecklistMockup />,
  },
  {
    num:     "04",
    icon:    FilePen,
    heading: "We help you build your application",
    body:    "Generate the documents you need, draft your personal statements, and track your progress — all in one place. Pathways stays with you until you're approved.",
    visual:  <DocumentMockup />,
  },
];

const STEP_COUNT = STEPS.length;

// Fraction of each step's scroll window used for the slide transition.
// 0.35 = transition takes 35% of the step's allotted scroll distance.
const T = 0.35;

function stepTranslateY(i: number, raw: number, h: number): number {
  const local = raw - i; // position of raw relative to this step's origin

  // Last step never exits — stays locked once it arrives
  if (i === STEP_COUNT - 1) {
    if (local >= 0) return 0;
    if (local < -T) return h;
    return Math.round((1 - (local + T) / T) * h);
  }

  if (local < -T) return h;      // far ahead — parked below
  if (local >= 1) return -h;     // far behind — parked above

  if (local < 0) {
    // Entering from below: local goes -T → 0
    return Math.round((1 - (local + T) / T) * h);
  }

  if (local <= 1 - T) {
    // Locked in place
    return 0;
  }

  // Exiting upward: local goes (1-T) → 1
  return Math.round(-((local - (1 - T)) / T) * h);
}

// ── Section ────────────────────────────────────────────────────────────────────

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);
  const [rawProgress, setRawProgress] = useState(0);
  const [panelH, setPanelH]           = useState(600);

  // Measure panel height, update on resize
  useEffect(() => {
    const el = rightRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setPanelH(entry.contentRect.height));
    ro.observe(el);
    setPanelH(el.clientHeight);
    return () => ro.disconnect();
  }, []);

  // Scroll-drive rawProgress
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const scrolled = -top;
      const total    = height - window.innerHeight;
      if (scrolled <= 0)      { setRawProgress(0);          return; }
      if (scrolled >= total)  { setRawProgress(STEP_COUNT); return; }
      setRawProgress((scrolled / total) * STEP_COUNT);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeDot = Math.min(STEP_COUNT - 1, Math.max(0, Math.floor(rawProgress)));

  return (
    <div id="how-it-works">

      {/* ── Desktop: scroll-driven sticky experience ─────────────────────── */}
      <section
        ref={sectionRef}
        className="bg-white max-md:hidden"
        style={{ height: `${(STEP_COUNT + 1) * 100}vh` }}
        aria-label="How It Works"
      >
        {/* Sticky panel — clears the 68px fixed nav */}
        <div
          className="sticky top-0 overflow-hidden"
          style={{ height: "calc(100vh)", paddingTop: "calc(68px + 4rem)", paddingBottom: "3rem" }}
        >
          <div className="max-w-[1280px] mx-auto px-10 h-full flex items-stretch gap-20">

            {/* ── Left: headline ──────────────────────────────────────── */}
            <div className="w-[380px] shrink-0 flex flex-col justify-start pt-12">
              <p className="text-[10px] font-semibold tracking-widest uppercase text-green-deep mb-5">
                How It Works
              </p>
              <h2
                className="font-display font-normal text-grey-900 leading-[1.05] mb-6"
                style={{ fontSize: "clamp(2.6rem, 4vw, 3.75rem)", letterSpacing: "-0.025em" }}
              >
                From conversation to application, in minutes.
              </h2>
              <p className="text-lg text-grey-500 leading-relaxed">
                No confusing forms. No legal jargon. Just tell us about yourself.
              </p>

              {/* Step progress dots */}
              <div className="flex items-center gap-2 mt-10">
                {STEPS.map((_, i) => (
                  <div
                    key={i}
                    className="h-1 rounded-full transition-all duration-300 ease-out"
                    style={{
                      width:      i === activeDot ? "2rem" : "0.375rem",
                      background: i === activeDot ? "#0D4A3A" : "rgba(13,74,58,0.18)",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* ── Right: scroll-driven step panels ───────────────────── */}
            <div
              ref={rightRef}
              className="flex-1 relative min-w-0"
              style={{ overflow: "clip" }}
            >
              {STEPS.map((step, i) => {
                const ty = stepTranslateY(i, rawProgress, panelH);
                return (
                  <div
                    key={step.num}
                    className="absolute inset-0 flex flex-col"
                    aria-hidden={i !== activeDot}
                    style={{
                      transform:  `translateY(${ty}px)`,
                      willChange: "transform",
                    }}
                  >
                    {/* Step header */}
                    <div className="shrink-0 flex items-center gap-3 mb-4">
                      <span className="text-xs font-semibold tracking-widest uppercase text-green-deep/40">{step.num}</span>
                      <div className="w-8 h-8 rounded-full bg-green-tint flex items-center justify-center shrink-0">
                        <step.icon size={14} className="text-green-deep" aria-hidden="true" />
                      </div>
                    </div>

                    <h3
                      className="shrink-0 font-display font-normal text-3xl text-grey-900 mb-3 leading-tight"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {step.heading}
                    </h3>

                    <p className="shrink-0 text-base text-grey-500 leading-relaxed mb-5 max-w-[540px]">
                      {step.body}
                    </p>

                    {/* Visual — height capped so the mockup doesn't overwhelm */}
                    <div style={{ height: "clamp(200px, 36vh, 320px)" }} className="[&>div]:h-full [&>div]:min-h-0">
                      {step.visual}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* ── Mobile: stacked ──────────────────────────────────────────────── */}
      <section className="hidden max-md:block bg-white py-14 px-5" aria-label="How It Works">
        <p className="text-[10px] font-semibold tracking-widest uppercase text-green-deep mb-4">
          How It Works
        </p>
        <h2
          className="font-display font-normal text-4xl text-grey-900 leading-tight mb-3"
          style={{ letterSpacing: "-0.025em" }}
        >
          From conversation to application, in minutes.
        </h2>
        <p className="text-base text-grey-500 leading-relaxed mb-12">
          No confusing forms. No legal jargon. Just tell us about yourself.
        </p>
        <div className="space-y-12">
          {STEPS.map((step) => (
            <div key={step.num}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-semibold tracking-widest uppercase text-green-deep/40">{step.num}</span>
                <div className="w-8 h-8 rounded-full bg-green-tint flex items-center justify-center shrink-0">
                  <step.icon size={14} className="text-green-deep" aria-hidden="true" />
                </div>
              </div>
              <h3 className="font-display font-normal text-2xl text-grey-900 mb-3 leading-tight" style={{ letterSpacing: "-0.01em" }}>
                {step.heading}
              </h3>
              <p className="text-sm text-grey-500 leading-relaxed mb-5">{step.body}</p>
              {step.visual}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
