import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
      },

      fontFamily: {
        // Reference next/font CSS variables set on <html> in layout.tsx
        sans:    ["var(--font-urbanist)", "sans-serif"],
        display: ["var(--font-instrument-serif)", "Georgia", "serif"],
        body:    ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },

      colors: {
        pw: {
          bg:       "#FFFFFF",
          ink:      "#0D0D0D",
          muted:    "#6B6B6B",
          accent:   "#1A56DB",
          particle: "#1A1A1A",
          surface:  "#F7F7F5",
        },
        // Design-token greens (design-tokens.md §2)
        green: {
          deep:    "#0D4A3A",
          muted:   "#2A5C4E",
          surface: "#1C3D32",
          light:   "#E8F0EE",
          tint:    "#F2F6F5",
        },
        // Neutral grey scale (design-tokens.md §2)
        grey: {
          100: "#F4F4F4",
          200: "#E5E5E5",
          300: "#C4C4C4",
          500: "#6B6B6B",
          700: "#3D3D3D",
          900: "#1A1A1A",
        },
        bg: {
          base: "#EDEEF2",
          surface: "#FFFFFF",
          subtle: "#F1F3F4",
          muted: "#E8EAED",
        },
        border: {
          light: "#EAEDF0",
          DEFAULT: "#D8DCE1",
          strong: "#BDC4CC",
        },
        text: {
          primary: "#111827",
          secondary: "#4B5563",
          tertiary: "#9CA3AF",
          disabled: "#D1D5DB",
        },
        accent: {
          50:  "#ebfafb",
          100: "#cdf3f5",
          200: "#9de8ec",
          300: "#5cd4db",
          400: "#1ab8c4",
          500: "#14909c",
          600: "#107581",
          700: "#0d5d68",
          800: "#0a4750",
          900: "#072f38",
          950: "#041e25",
        },
      },

      spacing: {
        "gutter":       "20px",
        "gutter-lg":    "28px",
        "sidebar":      "64px",
        "sidebar-open": "220px",
      },

      borderRadius: {
        card:  "16px",
        panel: "20px",
        pill:  "9999px",
        badge: "8px",
        input: "10px",
        btn:   "10px",
        icon:  "12px",
      },

      boxShadow: {
        card:      "0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.04)",
        "card-md": "0 4px 12px 0 rgba(0,0,0,0.07), 0 2px 4px -1px rgba(0,0,0,0.04)",
        "card-lg": "0 8px 24px 0 rgba(0,0,0,0.09), 0 4px 8px -2px rgba(0,0,0,0.05)",
        sidebar:   "2px 0 12px 0 rgba(0,0,0,0.05)",
        accent:    "0 4px 20px 0 rgba(20,144,156,0.30), 0 1px 4px 0 rgba(20,144,156,0.20)",
        green:     "0 8px 30px rgba(13,74,58,0.14), 0 2px 8px rgba(13,74,58,0.08)",
      },

      transitionDuration: {
        fast:   "120ms",
        normal: "200ms",
        slow:   "350ms",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },

      keyframes: {
        sheen: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        sheen:     "sheen 2.4s linear infinite",
        "fade-up": "fade-up 0.3s cubic-bezier(0.4,0,0.2,1) both",
        "fade-in": "fade-in 0.25s ease both",
      },
    },
  },
  plugins: [],
};

export default config;
