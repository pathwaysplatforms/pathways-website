import {
  Globe,
  Zap,
  ListChecks,
  FileText,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const FEATURES: Feature[] = [
  {
    icon: Globe,
    title: "Any Language",
    description:
      "Speak to Pathways in your native language. Our voice AI understands and responds in over 50 languages.",
  },
  {
    icon: Zap,
    title: "Instant Pathway Matching",
    description:
      "Your profile is matched against our verified pathway database in seconds. No waiting, no ambiguity.",
  },
  {
    icon: ListChecks,
    title: "Personalised Checklists",
    description:
      "Every checklist is built around your specific situation — not a generic template copied from a government website.",
  },
  {
    icon: FileText,
    title: "Document Generation",
    description:
      "Draft personal statements, cover letters, and supporting documents with AI assistance. You review and approve.",
  },
  {
    icon: ShieldCheck,
    title: "Bank-Level Security",
    description:
      "Your data is encrypted at rest and in transit. We never share your information with third parties.",
  },
  {
    icon: Users,
    title: "Built for Individuals & Teams",
    description:
      "Whether you're applying alone or an employer sponsoring international hires — Pathways scales with you.",
  },
];

function FeatureCard({ icon: Icon, title, description }: Feature) {
  return (
    <div className="p-8 rounded-2xl bg-white border border-grey-100 hover:shadow-green hover:-translate-y-1 transition-all duration-300">
      <div className="w-12 h-12 rounded-xl bg-green-tint flex items-center justify-center mb-6">
        <Icon size={20} className="text-green-deep" aria-hidden="true" />
      </div>
      <h3 className="font-semibold text-xl text-grey-900 mb-3">{title}</h3>
      <p className="text-grey-500 leading-relaxed text-base">{description}</p>
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section className="py-24 bg-green-tint max-md:py-14">
      <div className="max-w-[1200px] mx-auto px-10 max-md:px-5">

        {/* Left-aligned heading */}
        <div className="mb-14 max-md:mb-10">
          <p className="text-sm font-semibold tracking-widest uppercase text-green-deep mb-4">
            The Platform
          </p>
          <h2
            className="font-display font-normal text-5xl max-md:text-3xl text-grey-900 leading-tight tracking-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            Everything you need,<br />
            nothing you don&apos;t.
          </h2>
        </div>

        {/* 3-col desktop / 2-col tablet / 1-col mobile */}
        <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>

      </div>
    </section>
  );
}
