import Link from "next/link";
import { ONBOARDING_URL } from "@/lib/constants";

const LINKS = {
  Product: [
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Pathways",     href: "/#pathways"     },
    { label: "Explore Visas", href: "/visas"           },
    { label: "Why Pathways", href: "/why-pathways"   },
  ],
  Resources: [
    { label: "Blog",           href: "/resources"      },
    { label: "Guides",         href: "/resources"      },
    { label: "CRS Calculator", href: "/crs-calculator" },
    { label: "FAQ",            href: "/#faq"           },
  ],
  Company: [
    { label: "About",   href: "/about"   },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/careers" },
  ],
  Legal: [
    { label: "Privacy Policy",         href: "/privacy"    },
    { label: "Terms of Service",       href: "/terms"      },
    { label: "Immigration Disclaimer", href: "/disclaimer" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-black">
      <div className="max-w-[1280px] mx-auto px-10 max-md:px-5">

        {/* ── Top row: brand + CTA ────────────────────────────────── */}
        <div className="flex items-center justify-between py-12 border-b border-white/[0.07] max-md:flex-col max-md:items-start max-md:gap-6">
          <div>
            <Link href="/" aria-label="Pathways — home" className="inline-block mb-3">
              <span
                className="text-white/80 text-xl"
                style={{ fontFamily: "var(--pw-font-display)" }}
              >
                Pathways
              </span>
            </Link>
            <p className="text-white/30 text-sm leading-relaxed max-w-[220px]">
              AI-powered immigration guidance for everyone, in any language.
            </p>
          </div>

          <Link
            href={ONBOARDING_URL}
            className="
              inline-flex items-center gap-2
              text-white/75 hover:text-white
              font-medium text-sm
              px-5 py-2.5 rounded-full
              border border-white/15 hover:border-white/30
              bg-white/5 hover:bg-white/10
              transition-all duration-150
            "
          >
            Find My Pathway →
          </Link>
        </div>

        {/* ── Link columns ─────────────────────────────────────────── */}
        <div className="py-12 grid grid-cols-4 gap-8 border-b border-white/[0.07] max-lg:grid-cols-2 max-md:grid-cols-2 max-md:gap-10">
          {Object.entries(LINKS).map(([group, items]) => (
            <div key={group}>
              <p className="text-white/25 text-[10px] font-semibold uppercase tracking-widest mb-5">
                {group}
              </p>
              <ul className="space-y-3">
                {items.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-white/40 hover:text-white/75 text-sm transition-colors duration-150"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Legal disclaimer ─────────────────────────────────────── */}
        <div className="py-10 border-b border-white/[0.07]">
          <p
            className="text-[10px] font-semibold tracking-widest uppercase mb-5"
            style={{ color: "rgba(134, 239, 172, 0.65)" }}
          >
            — Important Legal Information
          </p>
          <div className="space-y-3 text-xs text-white/30 leading-relaxed max-w-[860px]">
            <p>
              Pathways is a technology platform and is not a law firm. We do not provide legal
              advice and do not represent applicants before Immigration, Refugees and Citizenship
              Canada (IRCC) or any other government body. All applications are submitted directly
              by the applicant through their own IRCC account.
            </p>
            <p>
              Our platform is designed to help users prepare applications that are compliant with
              current IRCC requirements. However, IRCC retains sole authority over all immigration
              decisions, and Pathways makes no guarantee of approval outcomes.
            </p>
            <p>
              For complex immigration matters or situations involving inadmissibility, refusals,
              appeals, or criminal history, we recommend consulting a Regulated Canadian
              Immigration Consultant (RCIC) or a licensed immigration lawyer.
            </p>
          </div>
        </div>

        {/* ── Bottom bar ───────────────────────────────────────────── */}
        <div className="py-7 flex items-center justify-between gap-4 max-md:flex-col max-md:items-start">
          <p className="text-white/25 text-xs">
            © 2026 Pathways Technologies Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy"    className="text-white/20 hover:text-white/45 text-xs transition-colors">Privacy</Link>
            <Link href="/terms"      className="text-white/20 hover:text-white/45 text-xs transition-colors">Terms of Service</Link>
            <Link href="/disclaimer" className="text-white/20 hover:text-white/45 text-xs transition-colors">Disclaimer</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
