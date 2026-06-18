import Link from "next/link";

const LINKS = {
  Product: [
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Pathways",     href: "/#pathways"     },
    { label: "Pricing",      href: "/pricing"        },
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
    <footer
      className="bg-[#0a1a12] overflow-hidden"
      style={{
        backgroundImage:     "url('/textures/topo-lines.svg')",
        backgroundSize:      "600px 600px",
        backgroundRepeat:    "repeat",
        backgroundBlendMode: "soft-light",
        backgroundPosition:  "120px 80px",
      }}
    >

      {/* ── Giant wordmark ──────────────────────────────────────── */}
      <div className="px-6 max-md:px-4 pt-16 pb-2 select-none" aria-hidden="true">
        <span
          className="block text-white leading-[0.88] tracking-[-0.04em]"
          style={{
            fontFamily: "var(--pw-font-display)",
            fontSize:   "clamp(3.5rem, 17vw, 21rem)",
            opacity:    0.07,
          }}
        >
          Pathways
        </span>
      </div>

      <div className="max-w-[1200px] mx-auto px-10 max-md:px-5">

        {/* ── Links + tagline ─────────────────────────────────────── */}
        <div className="border-t border-white/[0.07] pt-10 pb-12 grid grid-cols-5 gap-10 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-8">

          {/* Tagline col */}
          <div className="col-span-1 max-lg:col-span-2 max-md:col-span-1">
            <Link href="/" aria-label="Pathways — home" className="inline-block mb-4">
              <span
                className="text-white/70 text-xl"
                style={{ fontFamily: "var(--pw-font-display)" }}
              >
                Pathways
              </span>
            </Link>
            <p className="text-white/30 text-sm leading-relaxed max-w-[200px]">
              AI-powered immigration guidance for everyone, in any language.
            </p>
          </div>

          {/* Link columns */}
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

        {/* ── Bottom bar ──────────────────────────────────────────── */}
        <div className="border-t border-white/[0.05] py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-white/25 text-xs">
            © 2026 Pathways Technologies Inc. All rights reserved.
          </p>
          <p className="text-white/15 text-xs max-w-xs leading-relaxed text-right max-md:text-left">
            Pathways is not a law firm and does not provide legal advice.
            Consult a licensed immigration consultant or lawyer.
          </p>
        </div>

      </div>
    </footer>
  );
}
