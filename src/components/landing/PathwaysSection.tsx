"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ONBOARDING_URL } from "@/lib/constants";

const CanadaGlobe = dynamic(() => import("./CanadaGlobe"), { ssr: false });

const CANADA_VISAS = ["Express Entry", "Provincial Nominee", "Family Sponsorship", "Study Permit"];

const UPCOMING = [
  { country: "United Kingdom", flag: "🇬🇧", subtitle: "Skilled Worker · Graduate Visa · Innovator Founder" },
  { country: "Australia",      flag: "🇦🇺", subtitle: "SkillSelect · Employer Sponsored · Student Visa"    },
  { country: "Germany",        flag: "🇩🇪", subtitle: "EU Blue Card · Opportunity Card · Skilled Worker"   },
];

export function PathwaysSection() {
  return (
    <section
      id="pathways"
      className="bg-white overflow-hidden"
    >
      {/* Flex: globe takes left half of viewport, content on right */}
      <div className="flex items-center max-md:flex-col">

        {/* ── Left: Globe — 50vw wide, fixed aspect so canvas is never distorted ── */}
        <div
          className="relative flex-shrink-0 max-md:w-full max-md:h-[320px]"
          style={{ width: "50vw", aspectRatio: "1 / 1.1" }}
        >
          <CanadaGlobe />
        </div>

        {/* ── Right: Content ───────────────────────────────────────── */}
        <div
          className="flex-1 flex flex-col justify-center py-20 pr-[max(40px,calc(50vw-600px))] pl-14 max-lg:pl-10 max-md:px-5 max-md:py-12"
        >

          {/* Eyebrow */}
          <p className="text-[10px] font-semibold tracking-widest uppercase text-green-deep/50 mb-4">
            Where We Can Take You
          </p>

          {/* Headline */}
          <h2
            className="font-display font-normal text-5xl max-lg:text-4xl text-grey-900 leading-tight mb-4"
            style={{ letterSpacing: "-0.02em" }}
          >
            Start your journey.
          </h2>

          {/* Subtitle */}
          <p className="text-grey-500 text-base leading-relaxed mb-8 max-w-[360px]">
            Launching with Canada — more destinations coming fast.
          </p>

          {/* ── Canada info block ─────────────────────────────────── */}
          <div className="rounded-2xl p-7 mb-6 relative" style={{ background: "#F2F6F5" }}>

            {/* Available Now badge — top-right corner */}
            <span
              className="absolute top-4 right-4 text-[9px] font-semibold tracking-widest uppercase px-2.5 py-0.5 rounded-full"
              style={{
                color:      "#166534",
                background: "#dcfce7",
                border:     "1px solid #bbf7d0",
              }}
            >
              Available Now
            </span>

            {/* Flag + name */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl leading-none flex-shrink-0" role="img" aria-label="Canada flag">
                🇨🇦
              </span>
              <h3
                className="font-display font-normal text-3xl leading-none"
                style={{ letterSpacing: "-0.02em", color: "#0D4A3A" }}
              >
                Canada
              </h3>
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(13,74,58,0.6)" }}>
              One of the world&apos;s most immigration-friendly countries — with clear,
              structured pathways for skilled workers, families, and students.
            </p>

            {/* Visa pills */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {CANADA_VISAS.map((type) => (
                <span
                  key={type}
                  className="text-[11px] font-medium px-3 py-1.5 rounded-full"
                  style={{
                    color:   "rgba(13,74,58,0.75)",
                    border:  "1px solid rgba(13,74,58,0.2)",
                  }}
                >
                  {type}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-3 gap-3 pt-5 mb-6"
              style={{ borderTop: "1px solid rgba(13,74,58,0.1)" }}
            >
              {[
                { value: "400K+", label: "newcomers / year"   },
                { value: "80+",   label: "pathways"           },
                { value: "#1",    label: "top destination"    },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p
                    className="font-display font-normal text-2xl leading-none mb-1"
                    style={{ letterSpacing: "-0.02em", color: "#0D4A3A" }}
                  >
                    {value}
                  </p>
                  <p className="text-xs" style={{ color: "rgba(13,74,58,0.4)" }}>{label}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href={ONBOARDING_URL}
              className="
                inline-flex items-center gap-2
                text-white font-semibold text-sm
                px-6 py-3 rounded-full
                hover:opacity-90 active:scale-[0.98]
                transition-all duration-150
              "
              style={{ background: "#0D4A3A" }}
            >
              Find my pathway →
            </Link>
          </div>

          {/* ── Coming soon — thin vertical list ─────────────────── */}
          <div>
            <p className="text-[9px] font-semibold tracking-widest uppercase mb-3" style={{ color: "rgba(0,0,0,0.25)" }}>
              Coming Soon
            </p>
            <div style={{ borderTop: "1px solid #f0f0f0" }}>
              {UPCOMING.map(({ country, flag, subtitle }) => (
                <div
                  key={country}
                  className="flex items-center gap-4 py-3.5"
                  style={{ borderBottom: "1px solid #f0f0f0" }}
                >
                  <span className="text-2xl flex-shrink-0" style={{ opacity: 0.55 }} role="img" aria-label={country}>
                    {flag}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-grey-700">{country}</p>
                    <p className="text-xs text-grey-400 truncate">{subtitle}</p>
                  </div>
                  <span
                    className="text-[9px] font-semibold tracking-widest uppercase flex-shrink-0 px-2 py-0.5 rounded-full"
                    style={{
                      color:  "rgba(0,0,0,0.25)",
                      border: "1px solid rgba(0,0,0,0.12)",
                    }}
                  >
                    Soon
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
