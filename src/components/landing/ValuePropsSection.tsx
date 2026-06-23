import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import { ONBOARDING_URL } from "@/lib/constants";

// ── Matching flow mockup ──────────────────────────────────────────────────────

function MatchingMockup() {
  const options = [
    { label: "Work & skilled immigration", selected: true  },
    { label: "Study permit",               selected: false },
    { label: "Family sponsorship",         selected: false },
  ];

  return (
    <div className="relative flex justify-center items-center h-full">
      {/* Background fill */}
      <div className="absolute inset-0 rounded-3xl bg-[#F2F6F5]" aria-hidden="true" />

      <div className="relative z-10 py-10 px-6 w-full max-w-[340px] mx-auto">
        <div className="bg-white rounded-2xl shadow-card-lg overflow-hidden">
          {/* Top bar */}
          <div className="px-4 py-3 border-b border-grey-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-green-deep flex items-center justify-center shrink-0">
                <span className="text-white" style={{ fontFamily: "var(--pw-font-display)", fontSize: "9px" }}>P</span>
              </div>
              <span className="text-[11px] font-semibold text-grey-900">Pathways Assistant</span>
            </div>
            <span className="text-[9px] font-semibold tracking-widest uppercase text-green-deep/50">Step 2 of 4</span>
          </div>

          {/* Body */}
          <div className="px-4 pt-4 pb-4">
            <p className="text-xs font-semibold text-grey-900 mb-3 leading-snug">
              What&apos;s your main reason for moving to Canada?
            </p>
            <div className="space-y-1.5 mb-4">
              {options.map((opt) => (
                <div
                  key={opt.label}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-[11px] ${
                    opt.selected ? "bg-green-deep text-white" : "bg-grey-100 text-grey-700"
                  }`}
                >
                  <span>{opt.label}</span>
                  {opt.selected && (
                    <div className="w-3.5 h-3.5 rounded-full bg-white/20 flex items-center justify-center">
                      <Check size={8} aria-hidden="true" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button className="w-full bg-green-deep text-white text-[11px] font-semibold py-2.5 rounded-lg flex items-center justify-center gap-1">
              Continue <ChevronRight size={11} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Result badge */}
        <div className="mt-3 bg-white rounded-xl shadow-card-md px-3 py-2.5 flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-green-light flex items-center justify-center shrink-0">
            <Check size={12} className="text-green-deep" aria-hidden="true" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-grey-900">3 pathways matched</p>
            <p className="text-[10px] text-grey-500">Express Entry · PNP · Atlantic Immigration</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Document check mockup ─────────────────────────────────────────────────────

function DocumentMockup() {
  const docs = [
    { label: "Passport Copy",     done: true  },
    { label: "Passport Photo",    done: true  },
    { label: "Bank Statement",    done: true  },
    { label: "Cover Letter",      done: true  },
    { label: "Employment Letter", done: false },
  ];

  return (
    <div className="relative flex items-center justify-center h-full py-8">
      {/* Glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(74,173,130,0.12) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 w-full max-w-[300px] mx-auto space-y-2.5">
        <div
          className="rounded-2xl p-5"
          style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <Check size={11} className="text-white" aria-hidden="true" />
            </div>
            <span className="text-xs font-semibold text-white">Document Check</span>
          </div>

          <div className="space-y-2 mb-4">
            {docs.map((doc) => (
              <div key={doc.label} className="flex items-center justify-between">
                <span className={`text-xs ${doc.done ? "text-white/75" : "text-white/35"}`}>{doc.label}</span>
                {doc.done ? (
                  <div className="w-4 h-4 rounded-full bg-emerald-400/20 flex items-center justify-center flex-shrink-0">
                    <Check size={9} className="text-emerald-400" aria-hidden="true" />
                  </div>
                ) : (
                  <div className="w-4 h-4 rounded-full border border-white/20 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10">
            <div className="flex justify-between mb-1.5">
              <p className="text-[10px] text-white/40">4 of 5 verified</p>
              <p className="text-[10px] text-white/40">80%</p>
            </div>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400/60 rounded-full" style={{ width: "80%" }} />
            </div>
          </div>
        </div>

        <div
          className="rounded-xl px-4 py-2.5 flex items-center gap-2.5"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" aria-hidden="true" />
          <p className="text-[11px] text-white/50">Application ready — 1 document remaining</p>
        </div>
      </div>
    </div>
  );
}

// ── Section 1: Visa matching — white ─────────────────────────────────────────

export function VisaMatchSection() {
  return (
    <section className="bg-white py-16 max-md:py-12">
      <div className="max-w-[1280px] mx-auto px-10 max-md:px-5">
        <div className="grid grid-cols-2 gap-12 items-center max-md:grid-cols-1 max-md:gap-10">

          {/* Text */}
          <div>
            <p className="text-[10px] font-semibold tracking-widest uppercase text-grey-500 mb-4">
              Your Pathway in Minutes
            </p>
            <h2 className="font-display font-normal text-5xl max-lg:text-4xl leading-tight text-grey-900 mb-4" style={{ letterSpacing: "-0.025em" }}>
              Find out which Canadian visa you need.
            </h2>
            <p className="text-grey-500 text-base leading-relaxed mb-7 max-w-[420px]">
              Answer a few questions about your background, goals, and timeline.
              We&apos;ll instantly match you to the right pathway and hand you
              a personalised checklist to get started.
            </p>

            <div className="flex items-center gap-3 flex-wrap mb-4">
              <Link
                href={ONBOARDING_URL}
                className="inline-flex items-center gap-1.5 bg-grey-900 text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-grey-700 active:scale-[0.98] transition-all duration-150"
              >
                Get started
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-1.5 text-grey-700 font-semibold text-sm px-6 py-3 rounded-full border border-grey-300 hover:bg-grey-100 transition-all duration-150"
              >
                See how it works
              </a>
            </div>

            <p className="text-xs text-grey-400">
              Free to start&ensp;·&ensp;Takes less than 5 minutes&ensp;·&ensp;No lawyer needed
            </p>
          </div>

          {/* Mockup */}
          <div className="min-h-[320px]">
            <MatchingMockup />
          </div>

        </div>
      </div>
    </section>
  );
}

// ── Section 2: Apply with confidence — black ──────────────────────────────────

export function ApplyConfidenceSection() {
  return (
    <section className="py-16 max-md:py-12" style={{ background: "#111111" }}>
      <div className="max-w-[1280px] mx-auto px-10 max-md:px-5">
        <div className="grid grid-cols-2 gap-12 items-center max-md:grid-cols-1 max-md:gap-10">

          {/* Mockup */}
          <div className="min-h-[320px]">
            <DocumentMockup />
          </div>

          {/* Text */}
          <div>
            <p className="text-[10px] font-semibold tracking-widest uppercase text-white/35 mb-4">
              Every Document, Verified
            </p>
            <h2 className="font-display font-normal text-5xl max-lg:text-4xl leading-tight text-white mb-4" style={{ letterSpacing: "-0.025em" }}>
              Apply for your visa with confidence.
            </h2>
            <p className="text-white/55 text-base leading-relaxed mb-7 max-w-[420px]">
              We generate your application documents, check every detail, and
              guide you through each submission step. Our system catches errors
              before they reach the government — so your application goes in
              right, the first time.
            </p>

            <div className="flex items-center gap-3 flex-wrap">
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-1.5 text-white font-semibold text-sm px-6 py-3 rounded-full border border-white/25 hover:bg-white/10 transition-all duration-150"
              >
                See how it works
              </a>
              <Link
                href={ONBOARDING_URL}
                className="inline-flex items-center gap-1.5 bg-white text-grey-900 font-semibold text-sm px-6 py-3 rounded-full hover:bg-grey-100 active:scale-[0.98] transition-all duration-150"
              >
                Get started →
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
