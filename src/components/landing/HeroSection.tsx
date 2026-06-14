import { ChevronDown } from "lucide-react";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.example.com";

/**
 * Hero — landing-page-spec.md §1
 *
 * Full-viewport dark green section with topographic texture.
 * Video background can be added later by placing files at
 * /public/videos/hero-bg.webm and /public/videos/hero-bg.mp4.
 * Until then the bg-green-deep fallback is shown.
 *
 * Content animates in on page load (CSS, no JS) with staggered delays.
 */
export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-green-deep"
      aria-label="Hero"
    >
      {/* ── Background video (shows once files are placed in /public/videos/) ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      >
        <source src="/videos/hero-bg.webm" type="video/webm" />
        <source src="/videos/hero-bg.mp4"  type="video/mp4"  />
      </video>

      {/* ── Green overlay (increases readability over video) ─────────────── */}
      <div className="absolute inset-0 bg-green-deep/80" aria-hidden="true" />

      {/* ── Topographic texture ───────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage:  "url('/textures/topo-lines.svg')",
          backgroundSize:   "600px 600px",
          backgroundRepeat: "repeat",
        }}
      />

      {/* ── Hero content ─────────────────────────────────────────────────── */}
      <div className="relative z-10 text-center px-5 max-w-3xl mx-auto w-full py-32 max-md:py-24">

        {/* Eyebrow */}
        <p
          className="hero-entry text-sm font-semibold tracking-widest uppercase text-white/60 mb-6"
          style={{ animationDelay: "0ms" }}
        >
          AI-Powered Immigration Guidance
        </p>

        {/* Headline */}
        <h1
          className="hero-entry font-display font-normal text-white text-6xl max-md:text-4xl leading-tight tracking-tight mb-6"
          style={{ animationDelay: "80ms", lineHeight: "1.15" }}
        >
          Your pathway to a
          <br className="max-md:hidden" />
          {" "}new life, simplified.
        </h1>

        {/* Subtext */}
        <p
          className="hero-entry text-lg text-white/70 leading-relaxed mb-10 max-w-md mx-auto"
          style={{ animationDelay: "160ms" }}
        >
          Tell us about yourself in any language. We match you to the right
          visa, build your application, and guide you every step of the way.
        </p>

        {/* CTA buttons */}
        <div
          className="hero-entry flex items-center justify-center gap-4 max-md:flex-col max-md:w-full"
          style={{ animationDelay: "240ms" }}
        >
          {/* Primary — inverted (white bg, green text) for contrast on dark hero */}
          <a
            href={`${APP_URL}/auth/login?intent=signup`}
            className="
              inline-flex items-center justify-center gap-2
              bg-white text-green-deep
              font-semibold text-base
              px-8 py-4 rounded-full
              min-h-[52px]
              hover:bg-green-tint active:scale-[0.98]
              transition-all duration-150
              shadow-xl whitespace-nowrap
              max-md:w-full
            "
          >
            Find My Pathway <span aria-hidden="true">→</span>
          </a>

          {/* Secondary — outline */}
          <a
            href="#how-it-works"
            className="
              inline-flex items-center justify-center gap-2
              bg-transparent text-white
              border border-white/40
              font-semibold text-base
              px-7 py-3.5 rounded-full
              min-h-[52px]
              hover:bg-white/10 hover:border-white/70
              active:scale-[0.98]
              transition-all duration-150
              whitespace-nowrap
              max-md:w-full
            "
          >
            See How It Works
          </a>
        </div>

        {/* Trust line */}
        <p
          className="hero-entry mt-8 text-sm text-white/50"
          style={{ animationDelay: "320ms" }}
        >
          Available in any language&ensp;·&ensp;50+ visa pathways&ensp;·&ensp;No lawyer needed
        </p>
      </div>

      {/* ── Scroll indicator ──────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 animate-bounce"
        style={{ animationDelay: "1600ms" }}
      >
        <ChevronDown size={24} />
      </div>
    </section>
  );
}
