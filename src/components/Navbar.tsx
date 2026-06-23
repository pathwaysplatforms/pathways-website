"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Menu, X } from "lucide-react";
import { setLocale } from "@/app/actions/locale";

import { APP_URL, ONBOARDING_URL } from "@/lib/constants";

export function Navbar() {
  const pathname = usePathname();
  // Pages whose hero sections are dark green — nav should start transparent
  const isHero = pathname === "/" || pathname === "/why-pathways" || pathname === "/visas";

  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen]     = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const solid = !isHero || scrolled;

  useEffect(() => {
    if (!isHero) return;
    // Home: stay transparent for a full viewport height; other hero pages: ~60% vh
    const threshold = pathname === "/" ? window.innerHeight : Math.round(window.innerHeight * 0.58);
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHero, pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    if (!langOpen) return;
    function onOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    }
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [langOpen]);

  const linkCls = solid
    ? "text-grey-600 hover:text-grey-900"
    : "text-white/80 hover:text-white";

  return (
    <>
      {/* ── Main bar ───────────────────────────────────────────────── */}
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          solid
            ? "bg-white/96 backdrop-blur-md border-b border-grey-200/80"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-10 h-[68px] flex items-center max-md:px-5 max-md:h-[60px]">

          {/* Logo */}
          <Link href="/" aria-label="Pathways — home" className="shrink-0">
            <span
              className={`text-[1.4rem] transition-colors duration-300 ${
                solid ? "text-grey-900" : "text-white"
              }`}
              style={{ fontFamily: "var(--pw-font-display)" }}
            >
              Pathways
            </span>
          </Link>

          {/* Vertical divider */}
          <div
            aria-hidden="true"
            className={`w-px h-[18px] mx-7 shrink-0 transition-colors duration-300 max-md:hidden ${
              solid ? "bg-grey-300" : "bg-white/25"
            }`}
          />

          {/* Nav links — immediately after divider, left-aligned */}
          <div className="flex items-center gap-7 max-md:hidden">
            <Link href="/why-pathways" className={`text-sm font-medium transition-colors duration-200 ${linkCls}`}>
              Why Pathways
            </Link>
            <Link href="/visas" className={`text-sm font-medium transition-colors duration-200 ${linkCls}`}>
              Explore Visas
            </Link>
            <Link href="/resources" className={`text-sm font-medium transition-colors duration-200 ${linkCls}`}>
              Resources
            </Link>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Right actions */}
          <div className="flex items-center gap-1 max-md:hidden">

            {/* Language picker */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen((v) => !v)}
                aria-expanded={langOpen}
                aria-haspopup="listbox"
                aria-label="Select language"
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 min-h-[44px] px-3 rounded-md ${linkCls}`}
              >
                <Globe size={14} aria-hidden="true" />
                EN
              </button>

              {langOpen && (
                <div
                  role="listbox"
                  aria-label="Language options"
                  className="absolute top-full right-0 mt-1 bg-white border border-grey-200 rounded-xl shadow-lg py-1.5 min-w-[140px] z-10"
                >
                  <form action={setLocale.bind(null, "en", "/")}>
                    <button
                      type="submit"
                      role="option"
                      onClick={() => setLangOpen(false)}
                      className="w-full text-left px-4 py-2 text-sm text-grey-700 hover:text-green-deep hover:bg-grey-50 transition-colors"
                    >
                      English
                    </button>
                  </form>
                  <form action={setLocale.bind(null, "fr", "/")}>
                    <button
                      type="submit"
                      role="option"
                      onClick={() => setLangOpen(false)}
                      className="w-full text-left px-4 py-2 text-sm text-grey-700 hover:text-green-deep hover:bg-grey-50 transition-colors"
                    >
                      Français
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Login */}
            <a
              href={`${APP_URL}/login`}
              className={`text-sm font-medium transition-colors duration-200 inline-flex items-center min-h-[44px] px-3 rounded-md ${linkCls}`}
            >
              Login
            </a>

            {/* Get Started */}
            <a
              href={ONBOARDING_URL}
              className={`ml-1 inline-flex items-center gap-1.5 text-sm font-semibold px-5 py-2.5 rounded-full min-h-[40px] whitespace-nowrap active:scale-[0.98] transition-all duration-200 ${
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
              { label: "Why Pathways",  href: "/why-pathways",   external: false },
              { label: "Explore Visas", href: "/visas",           external: false },
              { label: "Resources",     href: "/resources",       external: false },
              { label: "Login",        href: `${APP_URL}/login`,  external: true  },
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
              href={ONBOARDING_URL}
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
