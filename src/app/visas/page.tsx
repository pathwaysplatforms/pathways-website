import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/landing/CTASection";
import { Footer }     from "@/components/Footer";
import { ONBOARDING_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Explore Canadian Visa Pathways — Pathways",
  description:
    "Explore every major Canadian immigration pathway — from Express Entry and Provincial Nominee Programs to family sponsorship, study permits, and regional programs.",
};

// ── Types ──────────────────────────────────────────────────────────────────────

type Pathway = {
  name:        string;
  tag:         string;
  tagColor:    string;
  who:         string;
  bullets:     string[];
  timeline:    string;
};

// ── Data ───────────────────────────────────────────────────────────────────────

const ECONOMIC: Pathway[] = [
  {
    name:     "Express Entry",
    tag:      "Economic",
    tagColor: "green",
    who:      "Skilled workers and professionals seeking permanent residence",
    bullets: [
      "Covers Federal Skilled Worker, Federal Skilled Trades, and Canadian Experience Class",
      "Ranked by Comprehensive Ranking System (CRS) score — education, language, work experience, and age",
      "Invitations issued through bi-weekly draws; recent scores range from 470–560",
    ],
    timeline: "6 months (after Invitation to Apply)",
  },
  {
    name:     "Provincial Nominee Program",
    tag:      "Economic",
    tagColor: "green",
    who:      "Workers whose skills match a province's labour market needs",
    bullets: [
      "Each of the 10 provinces and 2 territories runs its own streams with different criteria",
      "Many streams are aligned with Express Entry (adds 600 CRS points if nominated)",
      "Some streams require a job offer; others are expression-of-interest based",
    ],
    timeline: "8–16 months",
  },
  {
    name:     "Start-Up Visa Program",
    tag:      "Economic",
    tagColor: "green",
    who:      "Immigrant entrepreneurs with an innovative, scalable business idea",
    bullets: [
      "Requires a letter of support from a designated Canadian venture capital fund, angel investor group, or business incubator",
      "Must meet language requirements (CLB 5) and have sufficient settlement funds",
      "Business must be incorporated in Canada and you must own 10%+ of voting shares",
    ],
    timeline: "12–16 months",
  },
  {
    name:     "Self-Employed Persons Program",
    tag:      "Economic",
    tagColor: "green",
    who:      "Cultural contributors and world-class athletes planning to be self-employed in Canada",
    bullets: [
      "Must have relevant experience as a self-employed person in cultural activities or athletics",
      "Selection based on points: experience, education, age, language, and adaptability",
      "No job offer required — you are assessed on your ability to be self-employed",
    ],
    timeline: "20–24 months",
  },
];

const WORK: Pathway[] = [
  {
    name:     "LMIA-Based Work Permit",
    tag:      "Work",
    tagColor: "grey",
    who:      "Foreign workers with a Canadian job offer backed by a Labour Market Impact Assessment",
    bullets: [
      "Employer must prove no Canadian worker was available for the role before hiring abroad",
      "Divided into High-Wage and Low-Wage streams with different requirements",
      "Permit is employer-specific and occupation-specific — tied to the LMIA job",
    ],
    timeline: "2–5 months (after employer receives LMIA)",
  },
  {
    name:     "LMIA-Exempt Work Permits",
    tag:      "Work",
    tagColor: "grey",
    who:      "Workers qualifying under international agreements or specific categories",
    bullets: [
      "CUSMA/USMCA: for U.S. and Mexican professionals in listed occupations",
      "Intra-Company Transfer: managers, executives, or specialized knowledge workers",
      "International Experience Canada (IEC): working holiday, young professionals, and co-op",
    ],
    timeline: "1–8 weeks depending on stream",
  },
  {
    name:     "Atlantic Immigration Program",
    tag:      "Work",
    tagColor: "grey",
    who:      "Skilled workers and international graduates with a job offer in Atlantic Canada",
    bullets: [
      "Covers Nova Scotia, New Brunswick, PEI, and Newfoundland & Labrador",
      "Employer must be designated by the Atlantic province to recruit internationally",
      "Pathway leads directly to permanent residence — not just a work permit",
    ],
    timeline: "6–12 months",
  },
];

const FAMILY: Pathway[] = [
  {
    name:     "Spousal & Partner Sponsorship",
    tag:      "Family",
    tagColor: "teal",
    who:      "Canadian citizens and permanent residents sponsoring a spouse, common-law, or conjugal partner",
    bullets: [
      "Inland sponsorship available if partner is already in Canada on valid status",
      "Outland sponsorship processed from outside Canada — can be faster in many cases",
      "Sponsor must meet income and admissibility requirements; two-year undertaking applies",
    ],
    timeline: "12 months (inland) · 10–12 months (outland)",
  },
  {
    name:     "Parents & Grandparents Program",
    tag:      "Family",
    tagColor: "teal",
    who:      "Canadians sponsoring parents or grandparents for permanent residence",
    bullets: [
      "Entry via annual lottery (expression of interest); limited spots each year",
      "Sponsor must meet minimum necessary income threshold for the past three years",
      "Super Visa is an alternative: multi-entry visitor visa valid up to 10 years",
    ],
    timeline: "20–36 months (after invitation)",
  },
];

const STUDY: Pathway[] = [
  {
    name:     "Study Permit",
    tag:      "Study",
    tagColor: "teal",
    who:      "International students accepted to a Designated Learning Institution (DLI) in Canada",
    bullets: [
      "Allows study at any DLI; most full-time students can work 24 hours/week off campus",
      "Must demonstrate sufficient funds, ties to home country, and intent to leave if required",
      "Student Direct Stream (SDS) offers faster processing for students from select countries",
    ],
    timeline: "4–12 weeks (SDS: 2–3 weeks)",
  },
  {
    name:     "Post-Graduation Work Permit",
    tag:      "Study",
    tagColor: "teal",
    who:      "International graduates from eligible Canadian post-secondary institutions",
    bullets: [
      "Open work permit — you can work for any employer, anywhere in Canada",
      "Validity matches the length of your study program, up to 3 years",
      "Canadian work experience gained on PGWP counts toward Express Entry (CEC stream)",
    ],
    timeline: "~16 weeks after graduation",
  },
];

const REGIONAL: Pathway[] = [
  {
    name:     "Rural and Northern Immigration Pilot",
    tag:      "Regional",
    tagColor: "green",
    who:      "Skilled workers willing to settle in one of 11 participating smaller communities",
    bullets: [
      "Communities include Sault Ste. Marie, Brandon, North Bay, Vernon, and others",
      "Must have a genuine job offer from an employer in the community",
      "Community recommends candidates to IRCC for permanent residence",
    ],
    timeline: "12–18 months",
  },
  {
    name:     "Agri-Food Pilot",
    tag:      "Regional",
    tagColor: "green",
    who:      "Non-seasonal workers in specific agriculture and food processing industries",
    bullets: [
      "Eligible sectors: meat processing, mushroom/greenhouse growing, livestock raising",
      "Requires 1 year of Canadian work experience in an eligible occupation",
      "Must have a valid job offer from a Canadian agri-food employer",
    ],
    timeline: "12–18 months",
  },
  {
    name:     "Home Care Worker Pilots",
    tag:      "Regional",
    tagColor: "green",
    who:      "Foreign nationals working as home child care providers or home support workers",
    bullets: [
      "Two streams: Home Child Care Provider and Home Support Worker",
      "Requires a valid job offer and language ability at CLB 5 or higher",
      "24 months of Canadian work experience required before applying for PR",
    ],
    timeline: "6–12 months for initial work permit; PR after 24 months of experience",
  },
];

// ── Shared primitives ──────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-semibold tracking-widest uppercase text-green-deep mb-4">
      {children}
    </p>
  );
}

// ── Pathway card ───────────────────────────────────────────────────────────────

function PathwayCard({ pathway }: { pathway: Pathway }) {
  const tagStyles: Record<string, string> = {
    green: "bg-green-tint text-green-deep border-green-deep/20",
    grey:  "bg-grey-100 text-grey-700 border-grey-200",
    teal:  "bg-green-light text-green-deep border-green-deep/15",
  };

  return (
    <div className="bg-white rounded-2xl border border-grey-100 p-8 flex flex-col hover:shadow-green hover:-translate-y-0.5 transition-all duration-300">

      {/* Tag */}
      <span
        className={`self-start text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full border mb-5 ${tagStyles[pathway.tagColor]}`}
      >
        {pathway.tag}
      </span>

      {/* Name */}
      <h3
        className="font-display font-normal text-2xl text-grey-900 mb-2 leading-tight"
        style={{ letterSpacing: "-0.015em" }}
      >
        {pathway.name}
      </h3>

      {/* Who it's for */}
      <p className="text-sm text-grey-500 leading-relaxed mb-5">
        {pathway.who}
      </p>

      {/* Bullets */}
      <ul className="space-y-2.5 mb-6 flex-1">
        {pathway.bullets.map((b, i) => (
          <li key={i} className="flex gap-3 text-sm text-grey-700 leading-relaxed">
            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-green-deep/40 shrink-0" aria-hidden="true" />
            {b}
          </li>
        ))}
      </ul>

      {/* Timeline */}
      <div
        className="flex items-center gap-2 pt-5 mb-6"
        style={{ borderTop: "1px solid #f0f0f0" }}
      >
        <span className="text-[10px] font-semibold tracking-widest uppercase text-grey-400">
          Typical timeline
        </span>
        <span className="text-sm font-semibold text-green-deep ml-auto">
          {pathway.timeline}
        </span>
      </div>

      {/* CTA */}
      <Link
        href={ONBOARDING_URL}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-deep hover:underline underline-offset-2 transition-colors"
      >
        Check my eligibility →
      </Link>
    </div>
  );
}

// ── Section block ──────────────────────────────────────────────────────────────

function PathwayGroup({
  label,
  heading,
  sub,
  pathways,
  tint,
}: {
  label:    string;
  heading:  string;
  sub:      string;
  pathways: Pathway[];
  tint:     boolean;
}) {
  return (
    <section className={`py-24 max-md:py-14 ${tint ? "bg-green-tint" : "bg-white"}`}>
      <div className="max-w-[1280px] mx-auto px-10 max-md:px-5">
        <div className="mb-14 max-md:mb-10">
          <SectionLabel>{label}</SectionLabel>
          <h2
            className="font-display font-normal text-5xl max-md:text-3xl text-grey-900 leading-tight mb-4"
            style={{ letterSpacing: "-0.02em" }}
          >
            {heading}
          </h2>
          <p className="text-grey-500 text-lg max-w-[540px] leading-relaxed">{sub}</p>
        </div>
        <div className={`grid gap-6 ${pathways.length === 2 ? "grid-cols-2 max-lg:grid-cols-1" : "grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1"}`}>
          {pathways.map((p) => <PathwayCard key={p.name} pathway={p} />)}
        </div>
      </div>
    </section>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function ExploreVisasPage() {
  return (
    <main>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="bg-green-deep pt-[calc(72px+5rem)] pb-24 max-md:pt-[calc(60px+3rem)] max-md:pb-16 text-center overflow-hidden relative">

        {/* ── Dot grid pattern ──────────────────────────────────────── */}
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="ev-dots" width="28" height="28" patternUnits="userSpaceOnUse">
                <circle cx="14" cy="14" r="1.3" fill="white" opacity="0.18"/>
              </pattern>
              <radialGradient id="ev-center" cx="50%" cy="42%" r="55%">
                <stop offset="0%"   stopColor="white" stopOpacity="0.07"/>
                <stop offset="100%" stopColor="white" stopOpacity="0"/>
              </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#ev-dots)"/>
            <rect width="100%" height="100%" fill="url(#ev-center)"/>
          </svg>
        </div>

        <div className="max-w-[1280px] mx-auto px-10 max-md:px-5 relative z-10">
          <p className="text-sm font-semibold tracking-widest uppercase text-white/50 mb-5">
            Immigration Pathways
          </p>
          <h1
            className="font-display font-normal text-white text-6xl max-md:text-4xl leading-tight mb-6"
            style={{ letterSpacing: "-0.02em", lineHeight: "1.1" }}
          >
            Every path to Canada,<br className="max-md:hidden" /> explained simply.
          </h1>
          <p className="text-xl text-white/65 leading-relaxed max-w-[540px] mx-auto mb-10">
            Canada offers over 100 immigration programs. Here are the major pathways —
            what they are, who they&apos;re for, and how long they take.
          </p>
          <Link
            href={ONBOARDING_URL}
            className="inline-flex items-center gap-2 bg-white text-green-deep font-semibold text-base px-8 py-4 rounded-full min-h-[52px] hover:bg-green-tint active:scale-[0.98] transition-all duration-150 shadow-xl"
          >
            Find my pathway →
          </Link>
        </div>
      </section>

      {/* ── Intro strip ───────────────────────────────────────────────── */}
      <section className="py-16 bg-white border-b border-grey-100 max-md:py-10">
        <div className="max-w-[1280px] mx-auto px-10 max-md:px-5">
          <div className="grid grid-cols-3 gap-10 max-md:grid-cols-1 max-md:gap-6">
            {[
              { n: "100+", label: "Active immigration programs across federal and provincial levels" },
              { n: "401K+", label: "Newcomers welcomed by Canada as permanent residents each year" },
              { n: "6 mo",  label: "Typical processing time for Express Entry after receiving an ITA" },
            ].map(({ n, label }) => (
              <div key={n} className="flex items-start gap-5">
                <span
                  className="font-display text-4xl text-green-deep leading-none shrink-0"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  {n}
                </span>
                <p className="text-grey-500 text-sm leading-relaxed pt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pathway groups ────────────────────────────────────────────── */}
      <PathwayGroup
        label="Economic Immigration"
        heading="Come for your skills."
        sub="Canada's main permanent residence streams for skilled workers, entrepreneurs, and self-employed individuals."
        pathways={ECONOMIC}
        tint={false}
      />

      <PathwayGroup
        label="Work Permits"
        heading="Come to work first."
        sub="Temporary work authorisations that often serve as stepping stones to permanent residence."
        pathways={WORK}
        tint={true}
      />

      <PathwayGroup
        label="Family Sponsorship"
        heading="Come to be together."
        sub="Canadian citizens and permanent residents can sponsor close family members for permanent residence."
        pathways={FAMILY}
        tint={false}
      />

      <PathwayGroup
        label="Study Programs"
        heading="Come to learn."
        sub="Study permits and post-graduation options that open the door to long-term immigration pathways."
        pathways={STUDY}
        tint={true}
      />

      <PathwayGroup
        label="Regional & Specialty"
        heading="Come where you&apos;re needed."
        sub="Targeted programs designed to address specific labour needs in regions and industries across Canada."
        pathways={REGIONAL}
        tint={false}
      />

      {/* ── Help finding the right path ───────────────────────────────── */}
      <section className="py-24 bg-green-tint max-md:py-14">
        <div className="max-w-[1280px] mx-auto px-10 max-md:px-5 text-center">
          <SectionLabel>Not Sure Where to Start?</SectionLabel>
          <h2
            className="font-display font-normal text-5xl max-md:text-3xl text-grey-900 leading-tight mb-5"
            style={{ letterSpacing: "-0.02em" }}
          >
            Pathways finds the right program for you.
          </h2>
          <p className="text-grey-500 text-lg max-w-[500px] mx-auto leading-relaxed mb-8">
            Instead of reading through every program yourself, just tell us about your background.
            We&apos;ll match you to the pathways you actually qualify for — in minutes.
          </p>
          <Link
            href={ONBOARDING_URL}
            className="inline-flex items-center gap-2 bg-green-deep text-white font-semibold text-base px-8 py-4 rounded-full min-h-[52px] hover:bg-green-muted active:scale-[0.98] transition-all duration-150 shadow-green"
          >
            Check my eligibility — it&apos;s free →
          </Link>
          <p className="mt-5 text-sm text-grey-400">
            No sign-up required for your first match.
          </p>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}
