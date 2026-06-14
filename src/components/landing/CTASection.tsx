const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.example.com";

export function CTASection() {
  return (
    <section
      className="py-32 max-md:py-20 text-center bg-green-deep"
      style={{
        backgroundImage:     "url('/textures/topo-lines.svg')",
        backgroundSize:      "600px 600px",
        backgroundRepeat:    "repeat",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-10 max-md:px-5">
        <h2
          className="font-display font-normal text-white text-5xl max-md:text-3xl mb-5 leading-tight tracking-tight"
          style={{ letterSpacing: "-0.02em" }}
        >
          Your new life starts<br />
          with one conversation.
        </h2>

        <p className="text-white/70 mb-12 max-w-sm mx-auto leading-relaxed text-lg">
          Tell us about yourself. We&apos;ll take it from there.
        </p>

        <a
          href={`${APP_URL}/auth/login?intent=signup`}
          className="
            inline-flex items-center justify-center gap-2
            bg-white text-green-deep
            font-semibold text-base
            px-8 py-4 rounded-full
            min-h-[56px]
            hover:bg-green-tint active:scale-[0.98]
            transition-all duration-150
            shadow-xl
            max-md:w-full
          "
        >
          Find My Pathway →
        </a>

        <p className="mt-6 text-xs text-white/40">
          Free to start&ensp;·&ensp;No credit card required&ensp;·&ensp;Takes 5 minutes
        </p>
      </div>
    </section>
  );
}
