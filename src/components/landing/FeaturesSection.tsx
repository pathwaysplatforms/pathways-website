"use client";

import { useState, useCallback } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

// ── Layout constants ──────────────────────────────────────────────────────────

const PANEL_W  = "calc(100vw - max(40px, calc(50vw - 600px)))";
const SLIDE_GAP = 20;
// 2 rows of different heights → compact, staggered edges where row-spans cross
const ROW_TPL  = "175px 165px";

// ── Data ──────────────────────────────────────────────────────────────────────

type Card = {
  id: string;
  col: string;
  row: string;
  title: string;
  stat: string;
  statLabel: string;
};

type Group = { headline: string; sub: string; cards: Card[] };

// Slide 1 stagger: row break hits cols 1-2 and col 4; col 3 is continuous
// Slide 2 stagger: row break hits cols 2, 3-4; col 1 is continuous
// → every horizontal edge sits at a different column position per slide
const GROUPS: Group[] = [
  {
    headline: "Precision matched to you.",
    sub: "Real-time pathway matching with verified data, in any language.",
    cards: [
      { id: "match",    col: "1 / span 2", row: "1",          title: "Pathway Matching",        stat: "92%",  statLabel: "average accuracy"       },
      { id: "lang",     col: "3",           row: "1 / span 2", title: "Any Language",            stat: "50+",  statLabel: "languages"              },
      { id: "speed",    col: "4",           row: "1",          title: "Instant Results",         stat: "<3s",  statLabel: "to full assessment"     },
      { id: "verified", col: "1",           row: "2",          title: "Verified Data",           stat: "100%", statLabel: "expert-reviewed"         },
      { id: "paths",    col: "2",           row: "2",          title: "Active Pathways",         stat: "80+",  statLabel: "immigration routes"      },
      { id: "countries",col: "4",           row: "2",          title: "Countries",               stat: "4",    statLabel: "destinations & growing" },
    ],
  },
  {
    headline: "Built to get you there.",
    sub: "Document generation, enterprise-grade security, and flexible scale.",
    cards: [
      { id: "docs",    col: "1",           row: "1 / span 2", title: "Document Generation",    stat: "~30s", statLabel: "avg draft time"         },
      { id: "sec",     col: "2",           row: "1",          title: "Bank-Level Security",    stat: "256‑bit", statLabel: "encryption"          },
      { id: "free",    col: "3 / span 2",  row: "1",          title: "Free to Start",          stat: "$0",   statLabel: "to get matched"         },
      { id: "teams",   col: "2",           row: "2",          title: "For Everyone",           stat: "1→1K+",statLabel: "users supported"        },
      { id: "live",    col: "3",           row: "2",          title: "Always Current",         stat: "Live", statLabel: "pathway updates"        },
      { id: "approval",col: "4",           row: "2",          title: "Approval Support",       stat: "89%",  statLabel: "success rate"           },
    ],
  },
];

// ── Image placeholder ─────────────────────────────────────────────────────────

function ImagePlaceholder() {
  return (
    <div
      className="flex-1 min-h-0 flex items-center justify-center"
      style={{
        background:      "#f2f5f3",
        backgroundImage: "radial-gradient(rgba(0,0,0,0.055) 1px, transparent 1px)",
        backgroundSize:  "14px 14px",
      }}
    >
      {/* Image frame icon */}
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(0,0,0,0.18)"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    </div>
  );
}

// ── Card ──────────────────────────────────────────────────────────────────────

function BentoCard({ card }: { card: Card }) {
  const isWide = card.col.includes("span 2");
  const isTall = card.row.includes("span 2");

  return (
    <div className="rounded-2xl overflow-hidden h-full flex flex-col bg-white border border-grey-100 shadow-sm">
      <ImagePlaceholder />

      {/* Content strip at the bottom */}
      <div className="shrink-0 px-4 py-3 border-t border-grey-100">
        <p className="text-[9px] font-semibold tracking-widest uppercase text-grey-400 leading-none mb-1.5">
          {card.title}
        </p>
        <div className="flex items-baseline gap-2">
          <span
            className="font-display text-grey-900 leading-none"
            style={{
              fontSize:      isWide || isTall ? "clamp(1.5rem, 2.5vw, 2.2rem)" : "clamp(1.25rem, 2vw, 1.75rem)",
              letterSpacing: "-0.03em",
            }}
          >
            {card.stat}
          </span>
          <span className="text-[10px] text-grey-400">{card.statLabel}</span>
        </div>
      </div>
    </div>
  );
}

// ── Bento grid ────────────────────────────────────────────────────────────────

function BentoGrid({ group }: { group: Group }) {
  return (
    <div
      className="grid gap-4"
      style={{ gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: ROW_TPL }}
    >
      {group.cards.map((card) => (
        <div
          key={card.id}
          className="min-w-0"
          style={{ gridColumn: card.col, gridRow: card.row }}
        >
          <BentoCard card={card} />
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

      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="max-w-[1280px] mx-auto px-10 max-md:px-5 mb-8">
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

      {/* ── Bento track (desktop) ──────────────────────────────── */}
      <div
        className="relative max-md:hidden"
        style={{ marginLeft: "max(40px, calc(50vw - 600px))" }}
      >
        <div
          className="flex"
          style={{
            gap:        `${SLIDE_GAP}px`,
            transform:
              active === 0
                ? "translateX(0)"
                : `translateX(calc(-1 * (${PANEL_W}) - ${SLIDE_GAP}px))`,
            transition:  "transform 0.65s cubic-bezier(0.77, 0, 0.175, 1)",
            willChange:  "transform",
          }}
        >
          {GROUPS.map((group, i) => (
            <div key={i} style={{ width: PANEL_W, flexShrink: 0 }}>
              <BentoGrid group={group} />
            </div>
          ))}
        </div>

        {/* Right-fade hint toward next slide */}
        <div
          aria-hidden="true"
          className="absolute right-0 inset-y-0 w-20 pointer-events-none transition-opacity duration-500"
          style={{
            background: "linear-gradient(to right, transparent, #F2F6F5)",
            opacity: active < GROUPS.length - 1 ? 1 : 0,
          }}
        />
      </div>

      {/* ── Mobile ──────────────────────────────────────────────── */}
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
          {GROUPS[active].cards.map((card) => <BentoCard key={card.id} card={card} />)}
        </div>
      </div>

    </section>
  );
}
