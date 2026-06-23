import Link from "next/link";
import { ONBOARDING_URL } from "@/lib/constants";

export function CTASection() {
  return (
    <section className="bg-black py-14 px-10 max-md:px-5 max-md:py-8">
      <div className="max-w-[1280px] mx-auto">

        {/* ── Card — rich forest green so it pops against the black section ── */}
        <div
          className="relative overflow-hidden rounded-[2rem] border border-white/[0.08]"
          style={{ background: "#0e3d28" }}
        >

          {/* ── Abstract green art ───────────────────────────────────── */}
          <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 1200 420"
              preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Veil starts from the card's own green, not from black */}
                <linearGradient id="cta-veil" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"  stopColor="#0e3d28" stopOpacity="1"/>
                  <stop offset="34%" stopColor="#0e3d28" stopOpacity="0.97"/>
                  <stop offset="52%" stopColor="#0e3d28" stopOpacity="0.45"/>
                  <stop offset="70%" stopColor="#0e3d28" stopOpacity="0"/>
                </linearGradient>
                <radialGradient id="cta-vignette" cx="82%" cy="50%" r="62%">
                  <stop offset="0%"   stopColor="#0e3d28" stopOpacity="0"/>
                  <stop offset="100%" stopColor="#07200f" stopOpacity="0.50"/>
                </radialGradient>
              </defs>

              {/* ── Large sweep — picks up from the mid-right ──────── */}
              <path
                d="M 480 440 C 580 305 710 175 920 76 C 1048 8 1200 -8 1200 -8 L 1200 440 Z"
                fill="#1a6b48"
              />

              {/* ── Second forest mass ─────────────────────────────── */}
              <path
                d="M 680 440 C 735 310 808 182 988 74 C 1092 6 1200 32 1200 32 L 1200 440 Z"
                fill="#155e3b"
              />

              {/* ── Floating organic form — centre-right ──────────── */}
              <path
                d="M 820 -48 C 944 -68 1128 22 1165 152 C 1198 262 1150 356 1040 362
                   C 932 368 856 274 882 168 C 898 96 820 -48 820 -48 Z"
                fill="#22c55e"
                opacity="0.55"
              />

              {/* ── Upper emerald ─────────────────────────────────── */}
              <path
                d="M 968 -68 C 1088 -52 1204 46 1200 166 C 1198 246 1144 288 1070 266
                   C 996 244 974 172 1002 96 Z"
                fill="#16a34a"
                opacity="0.70"
              />

              {/* ── Bright lime accent ────────────────────────────── */}
              <path
                d="M 1078 -42 C 1168 -26 1224 56 1214 134 C 1208 178 1168 196 1130 172
                   C 1092 148 1090 82 1078 -42 Z"
                fill="#4ade80"
                opacity="0.40"
              />

              {/* ── Small vivid highlight ─────────────────────────── */}
              <path
                d="M 1152 10 C 1200 4 1228 56 1216 104 C 1208 134 1172 144 1145 122
                   C 1118 100 1122 44 1152 10 Z"
                fill="#4ade80"
                opacity="0.32"
              />

              {/* ── Pale mint rim ─────────────────────────────────── */}
              <path
                d="M 1188 -18 C 1218 -8 1232 26 1220 58 C 1212 78 1193 82 1178 62
                   C 1163 42 1168 2 1188 -18 Z"
                fill="#86efac"
                opacity="0.22"
              />

              {/* ── Deep shadow underform ─────────────────────────── */}
              <path
                d="M 555 440 C 658 348 814 320 990 364 C 1090 388 1160 440 1160 440 Z"
                fill="#071f10"
                opacity="0.70"
              />

              {/* ── Flowing line accents ──────────────────────────── */}
              <path d="M 548 402 C 678 272 818 156 1062 52"
                    stroke="#4ade80" strokeWidth="1.0" fill="none" opacity="0.18"/>
              <path d="M 586 402 C 718 258 868 132 1112 40"
                    stroke="#86efac" strokeWidth="0.5" fill="none" opacity="0.12"/>
              <path d="M 514 402 C 636 298 760 196 958 100"
                    stroke="#22c55e" strokeWidth="0.5" fill="none" opacity="0.09"/>

              {/* ── Dot accents ───────────────────────────────────── */}
              <circle cx="1058" cy="82"  r="3.0" fill="#4ade80" opacity="0.28"/>
              <circle cx="1112" cy="148" r="2.0" fill="#86efac" opacity="0.22"/>
              <circle cx="996"  cy="192" r="2.4" fill="#22c55e" opacity="0.30"/>
              <circle cx="1144" cy="256" r="1.8" fill="#4ade80" opacity="0.20"/>
              <circle cx="1032" cy="304" r="2.2" fill="#16a34a" opacity="0.25"/>

              {/* ── Text-side veil ────────────────────────────────── */}
              <rect width="1200" height="420" fill="url(#cta-veil)"/>
              <rect width="1200" height="420" fill="url(#cta-vignette)"/>
            </svg>
          </div>

          {/* ── Content ─────────────────────────────────────────────── */}
          <div className="relative z-10 py-16 px-16 max-md:py-10 max-md:px-8">
            <div className="max-w-[500px]">

              <p
                className="text-[10px] font-semibold tracking-widest uppercase mb-5"
                style={{ color: "rgba(134,239,172,0.70)" }}
              >
                Start For Free
              </p>

              <h2
                className="font-display font-normal text-white leading-tight mb-5"
                style={{ fontSize: "clamp(2.4rem, 3.5vw, 3.25rem)", letterSpacing: "-0.025em" }}
              >
                Your new life starts
                <br className="max-md:hidden" />
                {" "}with one conversation.
              </h2>

              <p className="text-white/60 text-lg max-md:text-base mb-8 leading-relaxed">
                Tell us about yourself. We&apos;ll match you to the right
                pathway — in minutes.
              </p>

              <Link
                href={ONBOARDING_URL}
                className="
                  inline-flex items-center gap-2
                  bg-white text-green-deep
                  font-semibold text-base
                  px-8 py-4 rounded-full min-h-[54px]
                  hover:bg-green-tint active:scale-[0.98]
                  transition-all duration-150
                  max-md:w-full max-md:justify-center
                "
              >
                Find My Pathway →
              </Link>

              <p className="mt-5 text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>
                Free to start&ensp;·&ensp;No credit card required&ensp;·&ensp;Takes 5 minutes
              </p>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
