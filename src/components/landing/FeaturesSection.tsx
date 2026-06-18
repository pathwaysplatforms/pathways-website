"use client";

import { useState, useCallback } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

// ── Layout constants ──────────────────────────────────────────────────────────

// Slide panel: from content left-edge to screen right edge
const PANEL_W = "calc(100vw - max(40px, calc(50vw - 560px)))";
const SLIDE_GAP = 20;

// 4 rows × 145px + 3 gaps × 16px = 628px total bento height
const GRID_ROWS = "repeat(4, 145px)";

// ── Data ──────────────────────────────────────────────────────────────────────

type Card = {
  id: string;
  dark: boolean;
  col: string;
  row: string;
  title: string;
  body: string;
  stat: string;
  statLabel: string;
};

type Group = {
  headline: string;
  sub: string;
  gridCols: string;
  cards: Card[];
};

// Non-aligned horizontal edges per slide:
// Slide 1 — col-2 cards break at row 2, col-3 cards break at row 3 → staggered
// Slide 2 — col-1 cards break at row 2, col-2 cards break at row 3 → staggered
const GROUPS: Group[] = [
  {
    headline: "Precision matched to you.",
    sub: "Instant pathway matching and personalised guidance, in any language.",
    gridCols: "5fr 3fr 3fr",
    cards: [
      {
        id: "matching",
        dark: true,
        col: "1",
        row: "1 / span 4",
        title: "Pathway Matching",
        body: "Your profile scored against our verified database in seconds — ranked results you can act on today.",
        stat: "92%",
        statLabel: "average accuracy",
      },
      {
        id: "language",
        dark: false,
        col: "2",
        row: "1 / span 2",      // ends at row-2 boundary
        title: "Any Language",
        body: "Voice or text in 50+ languages.",
        stat: "50+",
        statLabel: "languages",
      },
      {
        id: "checklist",
        dark: false,
        col: "3",
        row: "1 / span 3",      // ends at row-3 boundary
        title: "Personalised Checklists",
        body: "Not a template. Every checklist is built around your exact profile and chosen pathway.",
        stat: "0",
        statLabel: "generic templates",
      },
      {
        id: "speed",
        dark: false,
        col: "2",
        row: "3 / span 2",
        title: "Instant Results",
        body: "Full assessment in seconds.",
        stat: "<3s",
        statLabel: "to full assessment",
      },
      {
        id: "verified",
        dark: false,
        col: "3",
        row: "4",               // single row
        title: "Verified Data",
        body: "",
        stat: "100%",
        statLabel: "expert-verified pathways",
      },
    ],
  },
  {
    headline: "Built to get you there.",
    sub: "Document generation, enterprise-grade security, and flexible scale.",
    gridCols: "3fr 3fr 5fr",
    cards: [
      {
        id: "security",
        dark: false,
        col: "1",
        row: "1 / span 2",      // ends at row-2 boundary
        title: "Bank-Level Security",
        body: "End-to-end encryption at rest and in transit.",
        stat: "256‑bit",
        statLabel: "encryption",
      },
      {
        id: "free",
        dark: false,
        col: "2",
        row: "1 / span 3",      // ends at row-3 boundary
        title: "Free to Start",
        body: "Full pathway matching and your personalised checklist, no card required.",
        stat: "$0",
        statLabel: "to get matched",
      },
      {
        id: "teams",
        dark: false,
        col: "1",
        row: "3 / span 2",
        title: "For Everyone",
        body: "Individuals, families, or employers.",
        stat: "1→1K+",
        statLabel: "users supported",
      },
      {
        id: "updates",
        dark: false,
        col: "2",
        row: "4",               // single row
        title: "Always Current",
        body: "",
        stat: "Live",
        statLabel: "pathway updates",
      },
      {
        id: "docs",
        dark: true,
        col: "3",
        row: "1 / span 4",
        title: "Document Generation",
        body: "AI drafts your personal statements and supporting documents. You review and approve before anything is submitted.",
        stat: "~30s",
        statLabel: "average draft time",
      },
    ],
  },
];

// ── Decorative visuals ────────────────────────────────────────────────────────

function MatchingVisual() {
  return (
    <div className="mt-auto pt-6 space-y-2.5">
      {[
        { label: "Express Entry", pct: 92 },
        { label: "Ontario Nominee", pct: 78 },
        { label: "Atlantic Pilot", pct: 61 },
      ].map(({ label, pct }) => (
        <div key={label} className="flex items-center gap-2.5">
          <span className="text-white/25 text-[11px] w-24 shrink-0 truncate">{label}</span>
          <div className="flex-1 h-[3px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ width: `${pct}%`, background: "rgba(52,211,153,0.55)" }}
            />
          </div>
          <span className="text-white/30 text-[11px] w-6 text-right tabular-nums">{pct}%</span>
        </div>
      ))}
    </div>
  );
}

function DocVisual() {
  return (
    <div className="mt-auto pt-6">
      <div className="rounded-xl bg-white/[0.04] border border-white/[0.07] p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/70 animate-pulse" />
          <span className="text-white/25 text-[11px]">Generating personal statement…</span>
        </div>
        <div className="space-y-1.5">
          {[100, 88, 100, 74, 95, 63, 85, 70].map((w, i) => (
            <div
              key={i}
              className="h-[5px] rounded-full animate-pulse"
              style={{
                width: `${w}%`,
                background: "rgba(255,255,255,0.09)",
                animationDelay: `${i * 100}ms`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Card variants ─────────────────────────────────────────────────────────────

// Infer display size from CSS row value
function rowCount(row: string): number {
  const m = row.match(/span\s+(\d)/);
  return m ? parseInt(m[1]) : 1;
}

function DarkCard({ card }: { card: Card }) {
  return (
    <div
      className="rounded-2xl p-7 h-full flex flex-col overflow-hidden"
      style={{
        background: "#081f16",
        backgroundImage: "url('/textures/topo-lines.svg')",
        backgroundSize: "480px 480px",
        backgroundRepeat: "repeat",
        backgroundBlendMode: "soft-light",
      }}
    >
      <p className="text-[10px] font-semibold tracking-widest uppercase text-white/30 mb-4">
        {card.title}
      </p>
      <p
        className="font-display text-white font-normal leading-snug"
        style={{ fontSize: "clamp(1.3rem, 2vw, 1.8rem)", letterSpacing: "-0.02em" }}
      >
        {card.body}
      </p>
      <div className="mt-5 flex items-end gap-2">
        <p
          className="font-display text-white/90 leading-none"
          style={{ fontSize: "clamp(2.5rem, 4vw, 3.8rem)", letterSpacing: "-0.03em" }}
        >
          {card.stat}
        </p>
        <p className="text-white/30 text-xs pb-1">{card.statLabel}</p>
      </div>
      {card.id === "matching" && <MatchingVisual />}
      {card.id === "docs" && <DocVisual />}
    </div>
  );
}

function LightCard({ card }: { card: Card }) {
  const rows = rowCount(card.row);
  const isSmall = rows === 1;

  return (
    <div className="rounded-2xl px-6 py-5 h-full flex flex-col bg-white border border-grey-100">
      <p className="text-[9px] font-semibold tracking-widest uppercase text-grey-400 mb-auto leading-none">
        {card.title}
      </p>
      <div className={isSmall ? "mt-2" : "mt-4"}>
        <p
          className="font-display text-grey-900 leading-none"
          style={{
            fontSize: isSmall
              ? "clamp(1.5rem, 2.5vw, 2.2rem)"
              : "clamp(1.8rem, 3vw, 3rem)",
            letterSpacing: "-0.03em",
          }}
        >
          {card.stat}
        </p>
        <p className="text-[10px] text-grey-400 mt-1">{card.statLabel}</p>
      </div>
      {!isSmall && card.body && (
        <p className="text-xs text-grey-500 leading-relaxed mt-3">{card.body}</p>
      )}
    </div>
  );
}

// ── Bento grid ────────────────────────────────────────────────────────────────

function BentoGrid({ group }: { group: Group }) {
  return (
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: group.gridCols,
        gridTemplateRows: GRID_ROWS,
      }}
    >
      {group.cards.map((card) => (
        <div
          key={card.id}
          className="min-w-0"
          style={{ gridColumn: card.col, gridRow: card.row }}
        >
          {card.dark ? <DarkCard card={card} /> : <LightCard card={card} />}
        </div>
      ))}
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export function FeaturesSection() {
  const [active, setActive] = useState(0);

  const prev = useCallback(() => setActive((a) => Math.max(0, a - 1)), []);
  const next = useCallback(() => setActive((a) => Math.min(GROUPS.length - 1, a + 1)), []);

  return (
    <section className="py-24 bg-green-tint overflow-hidden max-md:py-16">

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="max-w-[1200px] mx-auto px-10 max-md:px-5 mb-8">
        <div className="flex items-end justify-between gap-8 max-md:flex-col max-md:items-start max-md:gap-6">

          <div>
            <p className="text-[10px] font-semibold tracking-widest uppercase text-green-deep mb-3">
              The Platform
            </p>
            <h2
              key={active}
              className="font-display font-normal text-5xl max-md:text-3xl text-grey-900 leading-tight animate-fade-in"
              style={{ letterSpacing: "-0.02em" }}
            >
              {GROUPS[active].headline}
            </h2>
            <p
              key={`sub-${active}`}
              className="text-grey-500 text-base mt-2 max-w-sm leading-relaxed animate-fade-in"
            >
              {GROUPS[active].sub}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1.5 mr-1">
              {GROUPS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Go to section ${i + 1}`}
                  className={`h-1.5 rounded-full bg-green-deep transition-all duration-300 ${
                    i === active ? "w-5 opacity-70" : "w-1.5 opacity-20 hover:opacity-40"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={prev}
              disabled={active === 0}
              aria-label="Previous features"
              className="w-9 h-9 rounded-full border border-grey-200 bg-white flex items-center justify-center text-grey-700 hover:border-green-deep hover:text-green-deep disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-150"
            >
              <ArrowLeft size={15} aria-hidden="true" />
            </button>
            <button
              onClick={next}
              disabled={active === GROUPS.length - 1}
              aria-label="Next features"
              className="w-9 h-9 rounded-full bg-green-deep text-white flex items-center justify-center hover:bg-green-muted disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-150"
            >
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          </div>

        </div>
      </div>

      {/* ── Bento track (desktop) ───────────────────────────────────── */}
      <div
        className="relative max-md:hidden"
        style={{ marginLeft: "max(40px, calc(50vw - 560px))" }}
      >
        <div
          className="flex"
          style={{
            gap: `${SLIDE_GAP}px`,
            transform:
              active === 0
                ? "translateX(0)"
                : `translateX(calc(-1 * (${PANEL_W}) - ${SLIDE_GAP}px))`,
            transition: "transform 0.65s cubic-bezier(0.77, 0, 0.175, 1)",
            willChange: "transform",
          }}
        >
          {GROUPS.map((group, i) => (
            <div key={i} style={{ width: PANEL_W, flexShrink: 0 }}>
              <BentoGrid group={group} />
            </div>
          ))}
        </div>

        {/* Right-fade hint on slide 1 */}
        <div
          aria-hidden="true"
          className="absolute right-0 inset-y-0 w-20 pointer-events-none transition-opacity duration-500"
          style={{
            background: "linear-gradient(to right, transparent, #F2F6F5)",
            opacity: active === 0 ? 1 : 0,
          }}
        />
      </div>

      {/* ── Mobile ──────────────────────────────────────────────────── */}
      <div className="hidden max-md:block px-5">
        <div className="flex p-1 rounded-full bg-white border border-grey-100 mb-5">
          {GROUPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex-1 py-2 px-3 rounded-full text-sm font-medium transition-all duration-200 ${
                i === active ? "bg-green-deep text-white shadow-sm" : "text-grey-500 hover:text-grey-700"
              }`}
            >
              {i === 0 ? "For You" : "Your Application"}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {GROUPS[active].cards.map((card) =>
            card.dark
              ? <DarkCard key={card.id} card={card} />
              : <LightCard key={card.id} card={card} />
          )}
        </div>
      </div>

    </section>
  );
}
