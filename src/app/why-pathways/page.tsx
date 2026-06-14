import type { Metadata } from "next";
import Link from "next/link";
import {
  Scale,
  Globe,
  Database,
  DollarSign,
  ShieldCheck,
  Eye,
  MessageCircle,
  CheckCircle2,
  XCircle,
  Minus,
} from "lucide-react";
import { CTASection } from "@/components/landing/CTASection";
import { Footer }     from "@/components/Footer";

export const metadata: Metadata = {
  title: "Why Pathways — The smarter way to navigate immigration",
  description:
    "Most people don't need a $5,000 lawyer. They need clear information, in their language, in one place. That's what Pathways is.",
};

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.example.com";

// ── Shared primitives ──────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-semibold tracking-widest uppercase text-green-deep mb-4">
      {children}
    </p>
  );
}

// ── §1 Page Hero ───────────────────────────────────────────────────────────────

function PageHero() {
  return (
    <section
      className="bg-green-deep pt-[calc(72px+5rem)] pb-24 max-md:pt-[calc(60px+3rem)] max-md:pb-16 text-center overflow-hidden relative"
      style={{
        backgroundImage:     "url('/textures/topo-lines.svg')",
        backgroundSize:      "600px 600px",
        backgroundRepeat:    "repeat",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-10 max-md:px-5 relative z-10">
        <p className="text-sm font-semibold tracking-widest uppercase text-white/50 mb-5">
          Why Pathways
        </p>
        <h1
          className="font-display font-normal text-white text-6xl max-md:text-4xl leading-tight tracking-tight mb-6"
          style={{ letterSpacing: "-0.02em", lineHeight: "1.1" }}
        >
          Immigration guidance<br className="max-md:hidden" /> built for real people.
        </h1>
        <p className="text-xl text-white/65 leading-relaxed max-w-[520px] mx-auto mb-10">
          Most people don&apos;t need a $5,000 lawyer. They need clear answers,
          in their language, without the confusion.
        </p>
        <a
          href={`${APP_URL}/auth/login?intent=signup`}
          className="inline-flex items-center gap-2 bg-white text-green-deep font-semibold text-base px-8 py-4 rounded-full min-h-[52px] hover:bg-green-tint active:scale-[0.98] transition-all duration-150 shadow-xl"
        >
          Find My Pathway →
        </a>
      </div>
    </section>
  );
}

// ── §2 The problem ─────────────────────────────────────────────────────────────

const PROBLEMS = [
  {
    icon:  Scale,
    title: "Lawyers cost thousands",
    body:  "The average immigration lawyer charges $3,000–$8,000 CAD for a single application — before government fees. For many families, that's simply not an option.",
  },
  {
    icon:  Globe,
    body:  "Government immigration websites are dense, jargon-heavy, and designed for bureaucrats, not applicants. Finding out whether you qualify takes days of research.",
    title: "Government websites weren't designed for you",
  },
  {
    icon:  MessageCircle,
    title: "Generic AI gets it wrong",
    body:  "Asking ChatGPT about your immigration options feels helpful — until you realise it may have invented the pathway entirely. Immigration decisions are too important to guess.",
  },
];

function ProblemSection() {
  return (
    <section className="py-24 bg-white max-md:py-14">
      <div className="max-w-[1200px] mx-auto px-10 max-md:px-5">
        <div className="max-w-[620px] mb-16 max-md:mb-10">
          <SectionLabel>The Problem</SectionLabel>
          <h2
            className="font-display font-normal text-5xl max-md:text-3xl text-grey-900 leading-tight tracking-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            The system wasn&apos;t built<br className="max-md:hidden" /> with you in mind.
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-1">
          {PROBLEMS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="p-8 rounded-2xl bg-grey-100 border border-grey-200">
              <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center mb-6 shadow-card">
                <Icon size={18} className="text-grey-500" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-lg text-grey-900 mb-3 leading-snug">{title}</h3>
              <p className="text-grey-500 leading-relaxed text-sm">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── §3 How we solve it ─────────────────────────────────────────────────────────

const SOLUTIONS = [
  {
    icon:  Globe,
    label: "Any Language",
    title: "Talk to us the way you think",
    body:  "Our voice AI understands and responds in any language. You don't need to translate your situation — just explain it the way you would to a friend.",
  },
  {
    icon:  Database,
    label: "Retrieval-Based",
    title: "Real pathways, not guesses",
    body:  "We match your profile against a curated, regularly-updated database of immigration pathways. If it appears in your results, it exists — we never generate fictional routes.",
  },
  {
    icon:  DollarSign,
    label: "Accessible Pricing",
    title: "Free to start. Fraction of the cost.",
    body:  "Pathway matching and your personalised checklist are free. Paid plans unlock document generation and expert review — at a fraction of what a lawyer charges.",
  },
];

function SolutionSection() {
  return (
    <section className="py-24 bg-green-tint max-md:py-14">
      <div className="max-w-[1200px] mx-auto px-10 max-md:px-5">
        <div className="mb-16 max-md:mb-10">
          <SectionLabel>Our Approach</SectionLabel>
          <h2
            className="font-display font-normal text-5xl max-md:text-3xl text-grey-900 leading-tight tracking-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            Designed differently,<br className="max-md:hidden" /> from the ground up.
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-1">
          {SOLUTIONS.map(({ icon: Icon, label, title, body }) => (
            <div
              key={title}
              className="p-8 rounded-2xl bg-white border border-grey-100 hover:shadow-green hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="w-10 h-10 rounded-lg bg-green-tint flex items-center justify-center">
                  <Icon size={17} className="text-green-deep" aria-hidden="true" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-green-deep">
                  {label}
                </span>
              </div>
              <h3 className="font-semibold text-lg text-grey-900 mb-3 leading-snug">{title}</h3>
              <p className="text-grey-500 leading-relaxed text-sm">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── §4 Comparison table ────────────────────────────────────────────────────────

type CheckValue = true | false | "partial";

type ComparisonRow = {
  feature: string;
  pathways: CheckValue;
  lawyers: CheckValue;
  diy: CheckValue;
};

const COMPARISON: ComparisonRow[] = [
  { feature: "Understands any language",     pathways: true,      lawyers: "partial", diy: false   },
  { feature: "Available 24/7",               pathways: true,      lawyers: false,     diy: true    },
  { feature: "Retrieval-based accuracy",     pathways: true,      lawyers: true,      diy: false   },
  { feature: "Personalised checklist",       pathways: true,      lawyers: true,      diy: false   },
  { feature: "Document drafting assistance", pathways: true,      lawyers: true,      diy: false   },
  { feature: "Legally binding advice",       pathways: false,     lawyers: true,      diy: false   },
  { feature: "Free to start",                pathways: true,      lawyers: false,     diy: true    },
  { feature: "Affordable full service",      pathways: true,      lawyers: false,     diy: "partial"},
];

function Check({ value }: { value: CheckValue }) {
  if (value === true)
    return <CheckCircle2 size={18} className="text-green-deep mx-auto" aria-label="Yes" />;
  if (value === false)
    return <XCircle size={18} className="text-grey-300 mx-auto" aria-label="No" />;
  return <Minus size={18} className="text-grey-400 mx-auto" aria-label="Partial" />;
}

function ComparisonSection() {
  return (
    <section className="py-24 bg-white max-md:py-14">
      <div className="max-w-[1200px] mx-auto px-10 max-md:px-5">
        <div className="mb-14 max-md:mb-10">
          <SectionLabel>How We Compare</SectionLabel>
          <h2
            className="font-display font-normal text-5xl max-md:text-3xl text-grey-900 leading-tight tracking-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            Pathways vs. the alternatives.
          </h2>
        </div>

        <div className="overflow-x-auto -mx-10 px-10 max-md:-mx-5 max-md:px-5">
          <table className="w-full min-w-[560px] border-collapse">
            <thead>
              <tr>
                <th className="text-left pb-5 text-sm font-semibold text-grey-500 font-sans w-1/2" />
                <th className="text-center pb-5 w-[16%]">
                  <span className="inline-block bg-green-deep text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    Pathways
                  </span>
                </th>
                <th className="text-center pb-5 text-sm font-medium text-grey-500 w-[17%]">
                  Lawyer
                </th>
                <th className="text-center pb-5 text-sm font-medium text-grey-500 w-[17%]">
                  DIY
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row, i) => (
                <tr
                  key={row.feature}
                  className={`border-t border-grey-100 ${i % 2 === 0 ? "bg-white" : "bg-grey-100/40"}`}
                >
                  <td className="py-4 text-sm text-grey-700 font-medium pr-6">
                    {row.feature}
                  </td>
                  <td className="py-4 text-center">
                    <Check value={row.pathways} />
                  </td>
                  <td className="py-4 text-center">
                    <Check value={row.lawyers} />
                  </td>
                  <td className="py-4 text-center">
                    <Check value={row.diy} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-grey-400 mt-6">
          — = partial / depends on situation
        </p>
      </div>
    </section>
  );
}

// ── §5 Principles ──────────────────────────────────────────────────────────────

const PRINCIPLES = [
  {
    icon:  Database,
    title: "Accuracy over confidence",
    body:  "We only surface a pathway when your profile matches the stated eligibility criteria — sourced directly from IRCC and provincial programs. We would rather say \"no result\" than show you something wrong.",
  },
  {
    icon:  Globe,
    title: "Accessible without compromise",
    body:  "Language should never be a barrier to understanding your options. Every feature works in any language — voice, text, and written guidance.",
  },
  {
    icon:  Eye,
    title: "Radical transparency",
    body:  "We show you exactly which program we matched you to and why. No black box. No unexplained scores. You should always understand the reasoning behind your results.",
  },
  {
    icon:  ShieldCheck,
    title: "Honest about what we are",
    body:  "Pathways is a technology platform, not a law firm. We tell you when your situation needs a human expert — and we can help you find a licensed RCIC or immigration lawyer.",
  },
];

function PrinciplesSection() {
  return (
    <section
      className="py-24 max-md:py-14 bg-green-deep"
      style={{
        backgroundImage:     "url('/textures/topo-lines.svg')",
        backgroundSize:      "600px 600px",
        backgroundRepeat:    "repeat",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-10 max-md:px-5">
        <div className="mb-16 max-md:mb-10">
          <p className="text-sm font-semibold tracking-widest uppercase text-white/50 mb-4">
            What We Believe
          </p>
          <h2
            className="font-display font-normal text-5xl max-md:text-3xl text-white leading-tight tracking-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            Our principles.
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
          {PRINCIPLES.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="p-8 rounded-2xl bg-white/[0.06] border border-white/10 hover:bg-white/[0.09] transition-colors duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-5">
                <Icon size={17} className="text-white/70" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-white text-lg mb-3 leading-snug">{title}</h3>
              <p className="text-white/55 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── §6 When to use a lawyer ────────────────────────────────────────────────────

function LawyerSection() {
  const doUse = [
    "You've been refused before",
    "You have a criminal record",
    "You're in a complex sponsorship situation",
    "Your employer needs LMIA support",
    "You're facing a removal order",
  ];
  const dontNeed = [
    "Straightforward Express Entry application",
    "Understanding which pathways you qualify for",
    "Preparing documents and checklists",
    "Drafting personal statements",
    "Tracking your application progress",
  ];

  return (
    <section className="py-24 bg-white max-md:py-14">
      <div className="max-w-[1200px] mx-auto px-10 max-md:px-5">
        <div className="max-w-[620px] mb-16 max-md:mb-10">
          <SectionLabel>Know When to Get Help</SectionLabel>
          <h2
            className="font-display font-normal text-5xl max-md:text-3xl text-grey-900 leading-tight tracking-tight mb-5"
            style={{ letterSpacing: "-0.02em" }}
          >
            We&apos;ll tell you when<br className="max-md:hidden" /> you need a lawyer.
          </h2>
          <p className="text-grey-500 text-lg leading-relaxed">
            Pathways handles the straightforward majority of cases. For situations
            with real legal complexity, we&apos;ll flag it and connect you with someone
            qualified to help.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
          {/* Don't need a lawyer */}
          <div className="p-8 rounded-2xl border border-green-deep/15 bg-green-tint">
            <p className="text-xs font-semibold uppercase tracking-widest text-green-deep mb-6">
              Pathways can help with
            </p>
            <ul className="space-y-3">
              {dontNeed.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-grey-700">
                  <CheckCircle2 size={15} className="text-green-deep shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Do need a lawyer */}
          <div className="p-8 rounded-2xl border border-grey-200 bg-white">
            <p className="text-xs font-semibold uppercase tracking-widest text-grey-500 mb-6">
              Consider a lawyer if
            </p>
            <ul className="space-y-3">
              {doUse.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-grey-500">
                  <Scale size={14} className="text-grey-400 shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-8 text-sm text-grey-400">
          Not sure which category you fall into?{" "}
          <Link href={`${APP_URL}/auth/login?intent=signup`} className="text-green-deep font-medium hover:underline">
            Start with Pathways for free
          </Link>{" "}
          and we&apos;ll tell you.
        </p>
      </div>
    </section>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function WhyPathwaysPage() {
  return (
    <main>
      <PageHero />
      <ProblemSection />
      <SolutionSection />
      <ComparisonSection />
      <PrinciplesSection />
      <LawyerSection />
      <CTASection />
      <Footer />
    </main>
  );
}
