interface Feature {
  name: string;
  desc: string;
}

const FEATURES: Feature[] = [
  {
    name: "Voice AI Intake",
    desc: "Natural-language onboarding in any language — conversational, no forms required.",
  },
  {
    name: "Multilingual NLP",
    desc: "Context-aware interpretation across 50+ languages with full session retention.",
  },
  {
    name: "Retrieval Matching",
    desc: "Profiles matched against a verified IRCC pathway database — zero hallucinations.",
  },
  {
    name: "CRS Modelling",
    desc: "Simulate Express Entry score changes and surface optimal improvement strategies.",
  },
  {
    name: "Adaptive Checklist",
    desc: "Document requirements dynamically sequenced for your exact pathway and profile.",
  },
  {
    name: "AI Document Drafting",
    desc: "Generate personal statements, IRCC forms, and cover letters on demand.",
  },
  {
    name: "Row-Level Encryption",
    desc: "Per-user data isolation with AES-256 at rest and TLS in transit.",
  },
  {
    name: "Application Tracking",
    desc: "Real-time IRCC status sync with intelligent proactive notifications.",
  },
];

export function KeyFeaturesSection() {
  return (
    <section className="bg-black py-20 max-md:py-12">
      <div className="max-w-[1280px] mx-auto px-10 max-md:px-5">

        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="flex items-end justify-between gap-10 mb-14 max-md:flex-col max-md:items-start max-md:gap-3 max-md:mb-10">
          <div>
            <p
              className="text-[10px] font-semibold tracking-widest uppercase mb-4"
              style={{ color: "rgba(74,222,128,0.55)" }}
            >
              Platform
            </p>
            <h2
              className="font-display font-normal text-white leading-tight"
              style={{ fontSize: "clamp(1.9rem, 2.8vw, 2.5rem)", letterSpacing: "-0.025em" }}
            >
              Technical capabilities.
            </h2>
          </div>
          <p className="text-sm text-white/35 max-w-[260px] leading-relaxed text-right max-md:text-left max-md:max-w-none">
            The infrastructure behind every pathway match and application.
          </p>
        </div>

        {/* ── Feature grid ───────────────────────────────────────────── */}
        <div className="grid grid-cols-4 gap-x-12 gap-y-0 max-lg:grid-cols-2 max-md:grid-cols-2 max-sm:grid-cols-1">
          {FEATURES.map((f) => (
            <div
              key={f.name}
              className="border-t border-white/[0.08] pt-7 pb-10"
            >
              <p className="text-sm font-semibold text-white mb-2 leading-snug">
                {f.name}
              </p>
              <p className="text-[13px] text-white/40 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Closing rule */}
        <div className="border-t border-white/[0.08]" />

      </div>
    </section>
  );
}
