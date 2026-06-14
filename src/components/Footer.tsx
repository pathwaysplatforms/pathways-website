import Link from "next/link";

const LINKS = {
  Product: [
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Pathways",     href: "/#pathways"     },
    { label: "Pricing",      href: "/pricing"        },
    { label: "Why Pathways", href: "/why-pathways"   },
  ],
  Resources: [
    { label: "Blog",           href: "/blog"           },
    { label: "Guides",         href: "/guides"         },
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
      className="bg-[#0a1a12]"
      style={{
        backgroundImage:     "url('/textures/topo-lines.svg')",
        backgroundSize:      "600px 600px",
        backgroundRepeat:    "repeat",
        backgroundBlendMode: "soft-light",
        backgroundPosition:  "120px 80px",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-10 max-md:px-5">

        {/* Top row: logo + columns */}
        <div className="grid grid-cols-5 gap-12 py-16 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-10">

          <div className="col-span-1 max-lg:col-span-2 max-md:col-span-1">
            <Link href="/" aria-label="Pathways — home" className="inline-block mb-4">
              <span
                className="text-white/80 text-2xl"
                style={{ fontFamily: "var(--pw-font-display)" }}
              >
                Pathways
              </span>
            </Link>
            <p className="text-white/35 text-sm leading-relaxed max-w-[220px]">
              AI-powered immigration guidance for everyone, in any language.
            </p>
          </div>

          {Object.entries(LINKS).map(([group, items]) => (
            <div key={group}>
              <p className="text-white/30 text-xs font-semibold uppercase tracking-widest mb-5">
                {group}
              </p>
              <ul className="space-y-3">
                {items.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-white/45 hover:text-white/80 text-sm transition-colors duration-150"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/[0.07]" />

        <div className="py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © 2026 Pathways Technologies Inc. All rights reserved.
          </p>
          <p className="text-white/20 text-xs max-w-sm leading-relaxed text-right max-md:text-left">
            Pathways is not a law firm and does not provide legal advice. For legal advice, consult a licensed immigration consultant or lawyer.
          </p>
        </div>

      </div>
    </footer>
  );
}
