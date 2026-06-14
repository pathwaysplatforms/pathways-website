"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Menu, X } from "lucide-react";
import { setLocale } from "@/app/actions/locale";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.example.com";

export function Navbar() {
  const pathname = usePathname();
  const isHome   = pathname === "/";

  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen]     = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // Non-home pages always use the solid style; home page goes transparent until 80px scroll
  const solid = !isHome || scrolled;

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    if (!langOpen) return;
    function onOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [langOpen]);

  const linkClass = solid
    ? "text-grey-700 hover:text-green-deep"
    : "text-white/85 hover:text-white";

  return (
    <>
      {/* ── Main bar ───────────────────────────────────────────────── */}
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          solid
            ? "bg-white/95 backdrop-blur-md border-b border-grey-200 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-10 h-[72px] flex items-center max-md:px-5 max-md:h-[60px]">

          {/* LEFT: Logo — flex-1 so center links stay truly centered */}
          <div className="flex-1">
            <Link href="/" aria-label="Pathways — home" className="inline-block">
              <span
                className={`text-2xl transition-colors duration-300 ${
                  solid ? "text-grey-900" : "text-white"
                }`}
                style={{ fontFamily: "var(--pw-font-display)" }}
              >
                Pathways
              </span>
            </Link>
          </div>

          {/* CENTER: Nav links — hidden on mobile */}
          <div className="flex items-center gap-8 max-md:hidden">
            <Link
              href="/why-pathways"
              className={`text-sm font-medium transition-colors duration-200 ${linkClass}`}
            >
              Why Pathways
            </Link>
            <Link
              href="/resources"
              className={`text-sm font-medium transition-colors duration-200 ${linkClass}`}
            >
              Resources
            </Link>
            <Link
              href="/pricing"
              className={`text-sm font-medium transition-colors duration-200 ${linkClass}`}
            >
              Pricing
            </Link>
          </div>

          {/* RIGHT: Actions — flex-1 justified end, hidden on mobile */}
          <div className="flex-1 flex items-center justify-end gap-3 max-md:hidden">

            {/* Language picker */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen((v) => !v)}
                aria-expanded={langOpen}
                aria-haspopup="listbox"
                aria-label="Select language"
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 min-h-[44px] px-2 ${linkClass}`}
              >
                <Globe size={15} aria-hidden="true" />
                EN
              </button>

              {langOpen && (
                <div
                  role="listbox"
                  aria-label="Language options"
                  className="absolute top-full right-0 mt-1 bg-white border border-grey-200 rounded-lg shadow-card-md py-1 min-w-[130px] z-10"
                >
                  <form action={setLocale.bind(null, "en", "/")}>
                    <button
                      type="submit"
                      role="option"
                      onClick={() => setLangOpen(false)}
                      className="w-full text-left px-4 py-2 text-sm text-grey-700 hover:text-green-deep hover:bg-grey-100 transition-colors"
                    >
                      English
                    </button>
                  </form>
                  <form action={setLocale.bind(null, "fr", "/")}>
                    <button
                      type="submit"
                      role="option"
                      onClick={() => setLangOpen(false)}
                      className="w-full text-left px-4 py-2 text-sm text-grey-700 hover:text-green-deep hover:bg-grey-100 transition-colors"
                    >
                      Français
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Login */}
            <a
              href={`${APP_URL}/auth/login`}
              className={`text-sm font-medium transition-colors duration-200 inline-flex items-center min-h-[44px] ${linkClass}`}
            >
              Login
            </a>

            {/* Get Started — inverted on transparent, solid on scrolled */}
            <a
              href={`${APP_URL}/auth/login?intent=signup`}
              className={`inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full min-h-[40px] whitespace-nowrap active:scale-[0.98] transition-all duration-200 ${
                solid
                  ? "bg-green-deep text-white hover:bg-green-muted"
                  : "bg-white text-green-deep hover:bg-green-tint"
              }`}
            >
              Get Started <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            className={`hidden max-md:flex items-center justify-center min-w-[44px] min-h-[44px] rounded-md transition-colors ${
              solid ? "text-grey-900" : "text-white"
            }`}
          >
            <Menu size={22} aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ──────────────────────────────────────────── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed inset-0 z-[100] bg-green-deep flex flex-col transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          backgroundImage:     "url('/textures/topo-lines.svg')",
          backgroundSize:      "600px 600px",
          backgroundRepeat:    "repeat",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="flex flex-col h-full px-5 py-6">

          <div className="flex items-center justify-between mb-12">
            <span className="text-white text-2xl" style={{ fontFamily: "var(--pw-font-display)" }}>
              Pathways
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation menu"
              className="flex items-center justify-center min-w-[44px] min-h-[44px]"
            >
              <X size={22} className="text-white" aria-hidden="true" />
            </button>
          </div>

          <nav className="flex flex-col flex-1 gap-1" aria-label="Mobile navigation">
            {[
              { label: "Why Pathways", href: "/why-pathways",         external: false },
              { label: "Resources",    href: "/resources",            external: false },
              { label: "Pricing",      href: "/pricing",              external: false },
              { label: "Login",        href: `${APP_URL}/auth/login`, external: true  },
            ].map(({ label, href, external }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                {...(external ? { rel: "noopener noreferrer" } : {})}
                className="text-white/80 hover:text-white text-lg font-medium py-4 border-b border-white/10 transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-4 mt-8">
            <a
              href={`${APP_URL}/auth/login?intent=signup`}
              onClick={() => setMobileOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-white text-green-deep font-semibold text-base px-5 py-3.5 rounded-full min-h-[52px]"
            >
              Get Started →
            </a>
            <div className="flex items-center justify-center gap-2">
              <form action={setLocale.bind(null, "en", "/")}>
                <button type="submit" className="text-white/60 hover:text-white text-sm min-h-[44px] px-4 transition-colors">
                  EN — English
                </button>
              </form>
              <span className="text-white/20 select-none">|</span>
              <form action={setLocale.bind(null, "fr", "/")}>
                <button type="submit" className="text-white/60 hover:text-white text-sm min-h-[44px] px-4 transition-colors">
                  FR — Français
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
