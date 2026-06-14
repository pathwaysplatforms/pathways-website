"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { useRef } from "react";

type PathwayCard = {
  country: string;
  flag: string;
  tagline: string;
  visaTypes: string[];
  href: string;
  comingSoon?: boolean;
};

const CARDS: PathwayCard[] = [
  {
    country:   "Canada",
    flag:      "🇨🇦",
    tagline:   "One of the world's most immigration-friendly countries.",
    visaTypes: ["Express Entry", "Provincial Nominee", "Family Sponsorship", "Study Permit"],
    href:      "/pathways/canada",
  },
  {
    country:   "United Kingdom",
    flag:      "🇬🇧",
    tagline:   "Skilled Worker visas, Graduate routes, and more.",
    visaTypes: ["Skilled Worker", "Graduate Visa", "Innovator Founder"],
    href:      "#",
    comingSoon: true,
  },
  {
    country:   "Australia",
    flag:      "🇦🇺",
    tagline:   "Points-based skilled migration and employer sponsorship.",
    visaTypes: ["SkillSelect", "Employer Sponsored", "Student Visa"],
    href:      "#",
    comingSoon: true,
  },
  {
    country:   "Germany",
    flag:      "🇩🇪",
    tagline:   "Opportunity Card, Blue Card, and skilled worker visas.",
    visaTypes: ["EU Blue Card", "Opportunity Card", "Skilled Worker"],
    href:      "#",
    comingSoon: true,
  },
];

function PathwayCardItem({
  country,
  flag,
  tagline,
  visaTypes,
  href,
  comingSoon = false,
}: PathwayCard) {
  return (
    <div
      className={`
        relative flex-shrink-0 w-[300px] rounded-2xl overflow-hidden border
        transition-all duration-300 snap-start
        ${comingSoon
          ? "border-white/10 opacity-60 cursor-not-allowed"
          : "border-white/20 hover:shadow-green hover:-translate-y-1 cursor-pointer"
        }
      `}
    >
      {/* Card header — dark green */}
      <div
        className="bg-green-surface p-6 h-[140px] flex flex-col justify-between"
        style={{
          backgroundImage:  "url('/textures/topo-lines.svg')",
          backgroundSize:   "300px 300px",
          backgroundRepeat: "repeat",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="flex items-start justify-between">
          <span className="text-4xl" role="img" aria-label={country}>
            {flag}
          </span>
          {comingSoon && (
            <Lock size={14} className="text-white/40 mt-1" aria-hidden="true" />
          )}
        </div>
        <div>
          <p className="text-white/60 text-[10px] font-semibold uppercase tracking-widest mb-1">
            {comingSoon ? "Coming Soon" : "Available Now"}
          </p>
          <h3 className="text-white font-display font-normal text-2xl leading-tight">
            {country}
          </h3>
        </div>
      </div>

      {/* Card body — white */}
      <div className="p-6 bg-white">
        <p className="text-grey-500 text-sm mb-4 leading-relaxed">{tagline}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {visaTypes.map((type) => (
            <span
              key={type}
              className="text-xs font-medium text-green-deep bg-green-tint px-3 py-1 rounded-full"
            >
              {type}
            </span>
          ))}
        </div>
        {!comingSoon ? (
          <Link
            href={href}
            className="text-sm font-semibold text-green-deep flex items-center gap-1 hover:gap-2 transition-all duration-200"
          >
            Explore pathways <span aria-hidden="true">→</span>
          </Link>
        ) : (
          <p className="text-xs text-grey-300 font-medium">Notify me when available</p>
        )}
      </div>
    </div>
  );
}

export function PathwaysSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section
      className="py-24 max-md:py-14 bg-green-deep overflow-hidden"
      style={{
        backgroundImage:  "url('/textures/topo-lines.svg')",
        backgroundSize:   "600px 600px",
        backgroundRepeat: "repeat",
        backgroundBlendMode: "overlay",
      }}
    >
      {/* Heading — constrained */}
      <div className="max-w-[1200px] mx-auto px-10 max-md:px-5 mb-12 max-md:mb-8">
        <p className="text-sm font-semibold tracking-widest uppercase text-white/60 mb-4">
          Where We Can Take You
        </p>
        <h2
          className="font-display font-normal text-5xl max-md:text-3xl text-white leading-tight tracking-tight mb-4"
          style={{ letterSpacing: "-0.02em" }}
        >
          Start your journey.
        </h2>
        <p className="text-lg text-white/70 leading-relaxed">
          We&apos;re launching with Canada and expanding fast.
        </p>
      </div>

      {/* Scrollable strip — bleeds to edges */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 px-10 max-md:px-5"
      >
        {CARDS.map((card) => (
          <PathwayCardItem key={card.country} {...card} />
        ))}
        {/* Trailing padding card */}
        <div className="flex-shrink-0 w-5" aria-hidden="true" />
      </div>

    </section>
  );
}
