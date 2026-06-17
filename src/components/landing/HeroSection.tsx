"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";

const HeroGlobe = dynamic(() => import("./HeroGlobe"), { ssr: false });

import { ONBOARDING_URL } from "@/lib/constants";

export function HeroSection() {
  const containerRef              = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let rafId: number;

    function update() {
      const el = containerRef.current;
      if (!el) return;
      const scrolled = window.scrollY - el.offsetTop;
      const max      = el.offsetHeight - window.innerHeight;
      setScrollProgress(Math.min(1, Math.max(0, scrolled / max)));
    }

    function onScroll() {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    /*
     * Outer div is 200vh tall — sticky viewport is 100vh, so the user
     * scrolls 100vh (one viewport height) to complete the full animation.
     */
    <div ref={containerRef} style={{ height: "200vh", position: "relative" }}>
      <div
        className="sticky top-0 overflow-hidden"
        style={{ height: "100vh" }}
        aria-label="Hero"
      >
        {/* ── Three.js canvas (z-index: 0) ───────────────────────── */}
        <div className="absolute inset-0" style={{ background: "#060e0a" }}>
          <HeroGlobe scrollProgress={scrollProgress} />
        </div>

        {/* ── Hero text (z-index: 10) ─────────────────────────────── */}
        <div
          className="relative flex flex-col items-start justify-center h-full px-10 max-md:px-5 max-w-[1200px] mx-auto"
          style={{ zIndex: 10 }}
        >
          <div className="max-w-md max-md:max-w-full max-md:text-center max-md:mx-auto">
            <p
              className="hero-entry text-sm font-semibold tracking-widest uppercase text-white/60 mb-6"
              style={{ animationDelay: "0ms" }}
            >
              AI-Powered Immigration Guidance
            </p>
            <h1
              className="hero-entry font-display font-normal text-white text-6xl max-md:text-4xl leading-tight tracking-tight mb-6"
              style={{ animationDelay: "80ms", lineHeight: "1.15" }}
            >
              Your pathway to a<br className="max-md:hidden" />
              {" "}new life, simplified.
            </h1>
            <p
              className="hero-entry text-lg text-white/70 leading-relaxed mb-10"
              style={{ animationDelay: "160ms" }}
            >
              Tell us about yourself in any language. We match you to the
              right visa, build your application, and guide you every step.
            </p>
            <div
              className="hero-entry flex items-center gap-4 max-md:flex-col max-md:w-full"
              style={{ animationDelay: "240ms" }}
            >
              <a
                href={ONBOARDING_URL}
                className="
                  inline-flex items-center justify-center gap-2
                  bg-white text-green-deep font-semibold text-base
                  px-8 py-4 rounded-full min-h-[52px]
                  hover:bg-green-tint active:scale-[0.98]
                  transition-all duration-150 shadow-xl whitespace-nowrap
                  max-md:w-full
                "
              >
                Find My Pathway <span aria-hidden="true">→</span>
              </a>
              <a
                href="#how-it-works"
                className="
                  inline-flex items-center justify-center gap-2
                  bg-transparent text-white border border-white/40
                  font-semibold text-base px-7 py-3.5 rounded-full min-h-[52px]
                  hover:bg-white/10 hover:border-white/70
                  active:scale-[0.98] transition-all duration-150
                  whitespace-nowrap max-md:w-full
                "
              >
                See How It Works
              </a>
            </div>
            <p
              className="hero-entry mt-8 text-sm text-white/50"
              style={{ animationDelay: "320ms" }}
            >
              Available in any language&ensp;·&ensp;50+ visa pathways&ensp;·&ensp;No lawyer needed
            </p>
          </div>
        </div>

        {/* ── Scroll indicator ────────────────────────────────────── */}
        <div
          aria-hidden="true"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 animate-bounce"
          style={{
            zIndex: 10,
            opacity: scrollProgress > 0.05 ? 0 : 1,
            transition: "opacity 0.4s ease",
          }}
        >
          <ChevronDown size={24} />
        </div>
      </div>
    </div>
  );
}
