import Link from "next/link";
import { ONBOARDING_URL } from "@/lib/constants";

const CANADA_VISAS = ["Express Entry", "Provincial Nominee", "Family Sponsorship", "Study Permit"];

const UPCOMING = [
  { country: "United Kingdom", flag: "🇬🇧", subtitle: "Skilled Worker · Graduate Visa · Innovator Founder" },
  { country: "Australia",      flag: "🇦🇺", subtitle: "SkillSelect · Employer Sponsored · Student Visa"   },
  { country: "Germany",        flag: "🇩🇪", subtitle: "EU Blue Card · Opportunity Card · Skilled Worker"  },
];

export function PathwaysSection() {
  return (
    <section
      id="pathways"
      className="py-28 max-md:py-16"
      style={{
        background: "#E8F0EE",
        // Subtle dot grid — different from the topo-line pattern used elsewhere
        backgroundImage:
          "radial-gradient(rgba(13,74,58,0.18) 1.5px, transparent 1.5px)",
        backgroundSize: "22px 22px",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-10 max-md:px-5">

        {/* Heading */}
        <div className="mb-10">
          <p className="text-xs font-semibold tracking-widest uppercase text-green-deep/60 mb-4">
            Where We Can Take You
          </p>
          <h2
            className="font-display font-normal text-5xl max-md:text-3xl text-green-deep leading-tight mb-3"
            style={{ letterSpacing: "-0.02em" }}
          >
            Start your journey.
          </h2>
          <p className="text-green-deep/60 text-lg leading-relaxed">
            Launching with Canada — more destinations coming fast.
          </p>
        </div>

        {/* ── Canada hero card ─────────────────────────────────── */}
        <div
          className="rounded-3xl overflow-hidden mb-3"
          style={{
            background: "#0a3526",
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.04) 1.5px, transparent 1.5px)",
            backgroundSize: "22px 22px",
          }}
        >
          <div className="grid grid-cols-[1fr_auto] max-md:grid-cols-1">

            {/* Left: content */}
            <div className="p-10 max-md:p-8">
              <div className="flex items-center gap-3 mb-7">
                <span className="text-6xl max-md:text-5xl leading-none" role="img" aria-label="Canada">
                  🇨🇦
                </span>
                <div>
                  <span className="inline-block text-[10px] font-semibold tracking-widest uppercase text-emerald-400/75 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-1 rounded-full mb-1">
                    Available Now
                  </span>
                  <h3
                    className="text-white font-display font-normal text-4xl max-md:text-3xl leading-none"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    Canada
                  </h3>
                </div>
              </div>

              <p className="text-white/60 text-base leading-relaxed mb-7 max-w-md">
                One of the world&apos;s most immigration-friendly countries — with clear,
                structured pathways for skilled workers, families, and students.
              </p>

              {/* Visa chips */}
              <div className="flex flex-wrap gap-2 mb-8">
                {CANADA_VISAS.map((type) => (
                  <span
                    key={type}
                    className="text-xs font-medium text-white/75 border border-white/20 px-3 py-1.5 rounded-full"
                  >
                    {type}
                  </span>
                ))}
              </div>

              <Link
                href={ONBOARDING_URL}
                className="
                  inline-flex items-center gap-2
                  bg-white text-green-deep font-semibold text-sm
                  px-6 py-3 rounded-full
                  hover:bg-green-tint active:scale-[0.98]
                  transition-all duration-150 shadow-lg
                "
              >
                Find my pathway →
              </Link>
            </div>

            {/* Right: stats — desktop only */}
            <div className="p-10 flex flex-col justify-center gap-8 border-l border-white/10 max-md:hidden min-w-[220px]">
              {[
                { value: "400K+", label: "newcomers per year"   },
                { value: "80+",   label: "immigration pathways" },
                { value: "#1",    label: "top-rated destination"},
              ].map(({ value, label }) => (
                <div key={label} className="text-right">
                  <p
                    className="text-white font-display font-normal text-4xl leading-none mb-1"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {value}
                  </p>
                  <p className="text-white/40 text-xs">{label}</p>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ── Coming-soon strip ────────────────────────────────── */}
        <div className="grid grid-cols-3 max-md:grid-cols-1 gap-3">
          {UPCOMING.map(({ country, flag, subtitle }) => (
            <div
              key={country}
              className="rounded-2xl px-5 py-4 flex items-center gap-4 bg-white/70 border border-green-deep/10 group"
            >
              <span
                className="text-3xl flex-shrink-0 opacity-60 group-hover:opacity-80 transition-opacity"
                role="img"
                aria-label={country}
              >
                {flag}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-green-deep/75 font-medium text-sm">{country}</p>
                  <span className="text-[9px] font-semibold tracking-widest uppercase text-green-deep/35 border border-green-deep/15 px-1.5 py-0.5 rounded-full flex-shrink-0">
                    Soon
                  </span>
                </div>
                <p className="text-green-deep/40 text-xs truncate">{subtitle}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
