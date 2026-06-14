# Pathways — Desktop-First Responsive Design Guide
> For Claude: This is the front-end design and engineering specification for the Pathways immigration platform. Read this entire file before writing any code. Every layout, component, and style decision must follow these rules. The approach is **desktop-first** — design and build for desktop, then use `max-width` breakpoints to ensure everything works perfectly on mobile automatically.

---

## 1. Philosophy: Desktop-First, Mobile-Guaranteed

Design and write CSS starting from the **desktop view (1280px+)**. Then use `max-width` breakpoints to progressively simplify the layout for smaller screens. The goal is that a developer never needs to think about mobile separately — following this spec guarantees mobile works.

```
Desktop      →  1280px+         (full layout, multi-column, rich UI)
Tablet       →  768px–1279px    (simplified layout, condensed nav)
Mobile       →  360px–767px     (single column, thumb-friendly)
```

**Every component you build must be tested at 360px before it is considered done.** Use `max-width` media queries to override desktop styles for smaller screens.

---

## 2. Breakpoint System

```css
/* Desktop base: no media query needed — this is the default */

/* Tablet and below */
@media (max-width: 1279px) { ... }

/* Mobile only */
@media (max-width: 767px) { ... }

/* Small mobile (older/budget phones) */
@media (max-width: 399px) { ... }
```

In Tailwind, use responsive prefixes with `max-*` variants:
- `max-lg:` — tablet and below (< 1280px)
- `max-md:` — mobile (< 768px)

---

## 3. Layout

### Desktop (default)
- Multi-column grids (2–3 columns for cards, 2 for content + sidebar)
- Full horizontal navigation bar
- Max content width: `1200px`, centered: `margin: 0 auto`
- Side padding: `40px`
- Section vertical padding: `96px` top and bottom

### Tablet (max-width: 1279px)
- Reduce to 2-column grids
- Condensed navigation (can still be horizontal, just tighter)
- Side padding: `32px`
- Section vertical padding: `64px`

### Mobile (max-width: 767px)
- **Single column — always.** No multi-column layouts on mobile.
- Hamburger navigation drawer
- Side padding: `20px` — never let content touch screen edges
- Section vertical padding: `48px`
- All buttons full-width
- Max content width: `100%`

### CSS Grid Pattern (desktop-first)
```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);   /* Desktop: 3 columns */
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

@media (max-width: 1279px) {
  .grid {
    grid-template-columns: repeat(2, 1fr); /* Tablet: 2 columns */
    padding: 0 32px;
    gap: 24px;
  }
}

@media (max-width: 767px) {
  .grid {
    grid-template-columns: 1fr;            /* Mobile: 1 column */
    padding: 0 20px;
    gap: 16px;
  }
}
```

---

## 4. Typography Scale

Desktop sizes are the default. Mobile sizes are overridden via `max-width` breakpoints. **Never go below 16px for body text** — this prevents iOS Safari from auto-zooming.

```css
:root {
  /* Desktop type scale */
  --text-xs:   0.75rem;    /* 12px */
  --text-sm:   0.875rem;   /* 14px */
  --text-base: 1rem;       /* 16px — body */
  --text-lg:   1.125rem;   /* 18px — lead text */
  --text-xl:   1.25rem;    /* 20px */
  --text-2xl:  1.875rem;   /* 30px — section headings */
  --text-3xl:  2.25rem;    /* 36px — page headings */
  --text-4xl:  3rem;       /* 48px — hero headline */
  --text-5xl:  3.75rem;    /* 60px — large hero (optional) */
}

@media (max-width: 767px) {
  :root {
    /* Mobile: scale down large sizes */
    --text-4xl:  2.25rem;  /* 36px — hero on mobile */
    --text-3xl:  1.875rem; /* 30px */
    --text-2xl:  1.5rem;   /* 24px */
  }
}
```

**Rules:**
- Line height: `1.6` for body, `1.2` for headings
- Paragraph max-width: `65ch` — prevents lines running too wide on desktop
- Font weights: `400` body, `600` subheadings, `700` headings
- Never set `font-size` below `14px` anywhere
- Form inputs must be `font-size: 1rem` (16px) minimum — smaller values trigger iOS zoom-on-focus

---

## 5. Spacing System

4px base unit. All spacing is a multiple of 4.

```css
:root {
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-6:  24px;
  --space-8:  32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;
}
```

---

## 6. Navigation

### Desktop (default)
```
┌────────────────────────────────────────────────────────────────┐
│  [Logo]    How It Works    Countries    Pricing    Blog  [CTA] │
└────────────────────────────────────────────────────────────────┘
```
- `position: sticky; top: 0; z-index: 100`
- Backdrop blur on scroll: `backdrop-filter: blur(10px); background: rgba(255,255,255,0.85)`
- CTA button always visible on the right
- Height: `72px`

### Mobile (max-width: 767px)
```
┌──────────────────────────────────┐
│  [Logo]              [☰ Menu]   │
└──────────────────────────────────┘
```
- Hamburger icon (☰) on the right, minimum 44×44px tap target
- Opens a full-screen or slide-in drawer with all nav links + CTA
- Close (✕) button at top-right of drawer
- Lock body scroll when drawer is open: `document.body.style.overflow = 'hidden'`
- Nav height: `60px`

```css
.nav-links {
  display: flex;
  gap: var(--space-8);
  align-items: center;
}

.nav-hamburger {
  display: none;
}

@media (max-width: 767px) {
  .nav-links    { display: none; }
  .nav-hamburger { display: flex; min-width: 44px; min-height: 44px; }
}
```

---

## 7. Touch & Tap Targets (Critical for Mobile)

Even though you design desktop-first, these rules must apply to ALL components — they ensure mobile usability without extra effort:

```css
/* Apply to all interactive elements */
button, a, input, select, textarea, [role="button"] {
  min-height: 44px;
  min-width: 44px;
}

button, .btn {
  padding: 12px 24px;  /* comfortable tap area */
}
```

- Minimum gap between adjacent tap targets: `8px`
- Never rely solely on hover for functionality — every hover action needs a tap/click equivalent
- All focus states must be visible: never write `outline: none` without providing a replacement

---

## 8. Colour System

Pathways must feel **trustworthy, calm, and competent** — the aesthetic of a product handling high-stakes life decisions.

```css
:root {
  /* Brand */
  --color-brand:        #2563EB;   /* Primary blue — buttons, links, accents */
  --color-brand-dark:   #1D4ED8;   /* Hover */
  --color-brand-light:  #EFF6FF;   /* Tinted surfaces */

  /* Neutrals */
  --color-bg:           #FFFFFF;
  --color-surface:      #F8FAFC;   /* Card / section backgrounds */
  --color-border:       #E2E8F0;
  --color-text:         #0F172A;   /* Primary text */
  --color-text-muted:   #64748B;   /* Secondary / caption text */

  /* Semantic */
  --color-success:      #16A34A;
  --color-warning:      #D97706;
  --color-error:        #DC2626;
}

/* Dark mode — respect system preference */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg:           #0F172A;
    --color-surface:      #1E293B;
    --color-border:       #334155;
    --color-text:         #F1F5F9;
    --color-text-muted:   #94A3B8;
    --color-brand-light:  #1E3A5F;
  }
}
```

**Rules:**
- Never use colour alone to convey meaning — always pair with an icon or label
- All text must meet WCAG AA contrast: **4.5:1** for normal text, **3:1** for large text
- Check every colour pair at [webaim.org/resources/contrastchecker](https://webaim.org/resources/contrastchecker)

---

## 9. Component Patterns

### Primary Button
```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  background: var(--color-brand);
  color: #ffffff;
  font-size: var(--text-base);
  font-weight: 600;
  padding: 14px 28px;
  border-radius: 8px;
  min-height: 48px;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: background 150ms ease, transform 100ms ease, box-shadow 150ms ease;
  white-space: nowrap;
}

.btn-primary:hover       { background: var(--color-brand-dark); box-shadow: 0 4px 12px rgba(37,99,235,0.3); }
.btn-primary:active      { transform: scale(0.98); }
.btn-primary:focus-visible {
  outline: 3px solid var(--color-brand);
  outline-offset: 3px;
}

/* Full width on mobile */
@media (max-width: 767px) {
  .btn-primary { width: 100%; justify-content: center; }
}
```

### Card
```css
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: var(--space-8);
  transition: box-shadow 200ms ease, transform 200ms ease;
}

.card:hover {
  box-shadow: 0 8px 32px rgba(0,0,0,0.08);
  transform: translateY(-2px);
}

@media (max-width: 767px) {
  .card { padding: var(--space-6); }
}
```

### Form Input
```css
.input {
  width: 100%;
  min-height: 48px;
  padding: 12px 16px;
  font-size: 1rem;         /* MUST be 1rem / 16px — prevents iOS zoom */
  font-family: inherit;
  border: 1.5px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-bg);
  color: var(--color-text);
  transition: border-color 150ms ease, box-shadow 150ms ease;
}

.input:focus {
  outline: none;
  border-color: var(--color-brand);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}

.input::placeholder {
  color: var(--color-text-muted);
}
```

### Section Wrapper
```css
.section {
  padding: var(--space-24) var(--space-8);
}

@media (max-width: 1279px) {
  .section { padding: var(--space-16) var(--space-8); }
}

@media (max-width: 767px) {
  .section { padding: var(--space-12) var(--space-4); }
}
```

---

## 10. Images & Media

```html
<!-- Always use picture element with WebP + fallback -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <img
    src="image.jpg"
    alt="Descriptive alt text"
    width="800"
    height="500"
    loading="lazy"        <!-- lazy for below fold -->
    decoding="async"
  >
</picture>

<!-- Hero / above-fold images: eager load -->
<img src="hero.webp" alt="..." width="1200" height="630"
     loading="eager" fetchpriority="high">
```

```css
/* All images responsive by default */
img {
  max-width: 100%;
  height: auto;
  display: block;
}
```

**Rules:**
- Always set explicit `width` and `height` to prevent layout shift (CLS)
- Use WebP format for all images
- Compress images: photos < 200KB, illustrations < 100KB
- Never serve images wider than displayed — use `srcset` for art direction if needed

---

## 11. Performance Rules

### Fonts
```html
<!-- Preload critical fonts -->
<link rel="preload" href="/fonts/inter-variable.woff2" as="font" type="font/woff2" crossorigin>
```
```css
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-variable.woff2') format('woff2');
  font-display: swap;   /* Prevents invisible text flash */
  font-weight: 100 900;
}
```
- Maximum 2 font families
- Use variable fonts where possible (one file, all weights)
- Subset fonts to Latin + any required character sets for Pathways' user languages

### JavaScript
- Defer all non-critical scripts: `<script defer src="..."></script>`
- No render-blocking scripts in `<head>`
- Code-split by route — don't load the entire app on page load
- Lazy-load heavy components (maps, video players, rich editors)

### CSS
- Inline critical above-the-fold CSS in `<head>`
- Purge unused CSS in production (Tailwind does this automatically)

### Core Web Vitals Targets
| Metric | Target | What it means |
|--------|--------|---------------|
| LCP (Largest Contentful Paint) | < 2.5s | Hero loads fast |
| CLS (Cumulative Layout Shift) | < 0.1 | Nothing jumps around |
| INP (Interaction to Next Paint) | < 200ms | Clicks feel instant |
| TTFB (Time to First Byte) | < 800ms | Server responds fast |

Run **Lighthouse** (Chrome DevTools → Lighthouse tab) on every major page. Target **90+ on Performance, Accessibility, and SEO**.

---

## 12. Accessibility

These rules apply to every component. Accessibility is non-negotiable — it also improves SEO.

```css
/* Always visible focus state */
:focus-visible {
  outline: 3px solid var(--color-brand);
  outline-offset: 3px;
  border-radius: 4px;
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Checklist for every page:**
- [ ] Every image has meaningful `alt` text (or `alt=""` for decorative)
- [ ] All form inputs have `<label>` elements — not just placeholders
- [ ] Page has one `<h1>`, heading hierarchy is logical (h1 → h2 → h3)
- [ ] `<nav>` wraps navigation, `<main>` wraps page content
- [ ] Keyboard-only navigation works (Tab through the entire page)
- [ ] Error messages are descriptive and linked to inputs via `aria-describedby`
- [ ] Colour contrast passes WCAG AA for all text combinations

---

## 13. SEO — Every Page

```html
<head>
  <title>Page Title — Pathways</title>
  <meta name="description" content="150–160 chars, includes primary keyword">

  <!-- Open Graph (social sharing) -->
  <meta property="og:title" content="Page Title — Pathways">
  <meta property="og:description" content="Same or similar to meta description">
  <meta property="og:image" content="https://pathways.app/og/page-name.jpg"> <!-- 1200×630px -->
  <meta property="og:type" content="website">

  <!-- Canonical -->
  <link rel="canonical" href="https://pathways.app/this-page">
</head>
```

**Structured data (JSON-LD) — add to every page:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Pathways",
  "url": "https://pathways.app",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://pathways.app/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
</script>
```

For blog/resource articles, add `Article` schema. For FAQ sections, add `FAQPage` schema.

---

## 14. How to Test Mobile Without Leaving Your Desktop

You never need a physical phone during development. Use Chrome DevTools:

1. Open Chrome → press **F12**
2. Click the **device icon** (top-left of DevTools) or press **Ctrl+Shift+M** / **Cmd+Shift+M**
3. Select a preset device (iPhone 14, Pixel 7) or type `360` for minimum width
4. Check your component at **360px, 390px, 768px, 1280px** before marking it done

**Required checks at each breakpoint:**
- No horizontal scrollbar
- No text overflow
- Tap targets are large enough (visually check buttons look tappable)
- Navigation collapses correctly
- Images scale correctly

---

## 15. Pre-Deployment Checklist

- [ ] Lighthouse score: Performance ≥ 90, Accessibility ≥ 90, SEO ≥ 90
- [ ] No horizontal scroll at 360px, 768px, or 1280px
- [ ] Navigation works at all breakpoints (hamburger on mobile, full bar on desktop)
- [ ] All images have `alt` text, `width`, `height`, and correct `loading` attribute
- [ ] All form inputs are ≥ 16px font-size
- [ ] Dark mode renders correctly
- [ ] Keyboard navigation works through all interactive elements
- [ ] Meta tags and OG image present on every page
- [ ] Sitemap submitted to Google Search Console
- [ ] `prefers-reduced-motion` respected for all animations