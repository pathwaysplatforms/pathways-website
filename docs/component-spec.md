# Pathways — Component Spec
> For Claude: Read DESIGN_TOKENS.md before this file. Every component here must use only tokens defined there. Components are built with Next.js 14 App Router, TypeScript strict mode, Tailwind CSS v4, and shadcn/ui. Match the clean, minimal design language of the existing landing page exactly.

---

## 1. Navbar

### Structure
```
[Logo]    [Why Pathways]  [Resources]         [🌐 Language]  [Login]  [Get Started →]
```

### Behaviour
- **Sticky:** `position: sticky; top: 0; z-index: 50`
- **Transparent on hero:** When over the video hero, navbar background is fully transparent
- **Solid on scroll:** Once user scrolls past the hero, background transitions to `rgba(255,255,255,0.95)` with `backdrop-filter: blur(12px)` and a bottom border `1px solid var(--color-grey-300)`
- **Dark variant:** On dark-background pages or when transparent over video, all text and icons are white
- **Light variant:** Once scrolled/solid, text switches to `var(--color-grey-900)`

### Tailwind Implementation
```tsx
// components/Navbar.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`
      fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${scrolled
        ? 'bg-white/95 backdrop-blur-md border-b border-grey-200 shadow-sm'
        : 'bg-transparent'
      }
    `}>
      <div className="max-w-[1200px] mx-auto px-10 h-[72px] flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <img src="/logo.svg" alt="Pathways" className="h-8 w-auto" />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink href="/why-pathways" scrolled={scrolled}>Why Pathways</NavLink>
          <NavLink href="/resources" scrolled={scrolled}>Resources</NavLink>
        </div>

        {/* Right side actions */}
        <div className="hidden md:flex items-center gap-3">
          <LanguagePicker scrolled={scrolled} />
          <NavLink href="/login" scrolled={scrolled}>Login</NavLink>
          <GetStartedButton />
        </div>

        {/* Mobile hamburger */}
        <MobileMenuButton scrolled={scrolled} />
      </div>
    </nav>
  )
}
```

### Nav Link Style
```tsx
// Transparent state: white text, white hover
// Scrolled state: grey-900 text, green-deep hover
function NavLink({ href, children, scrolled }) {
  return (
    <Link
      href={href}
      className={`
        text-sm font-medium transition-colors duration-200
        ${scrolled
          ? 'text-grey-700 hover:text-green-deep'
          : 'text-white/90 hover:text-white'
        }
      `}
    >
      {children}
    </Link>
  )
}
```

### Language Picker
- Globe icon (🌐 or Lucide `Globe` icon) + current language abbreviation (e.g. "EN")
- Opens a dropdown with all supported languages, searchable
- Stores selection in localStorage and applies to the app
- On dark navbar: white icon/text. On light navbar: grey-700.
- Use shadcn/ui `DropdownMenu` component

### Get Started Button (Primary CTA — always visible in nav)
```tsx
function GetStartedButton() {
  return (
    <Link
      href="/onboarding"
      className="
        inline-flex items-center gap-2
        bg-green-deep text-white
        text-sm font-semibold
        px-5 py-2.5 rounded-full
        hover:bg-green-muted
        transition-colors duration-200
        min-h-[40px]
        whitespace-nowrap
      "
    >
      Get Started
      <span aria-hidden>→</span>
    </Link>
  )
}
```

### Mobile Menu
- Hamburger icon button (44×44px minimum)
- Opens a full-screen drawer sliding in from the right
- Background: `var(--color-green-deep)` with topographic texture
- White text on all links
- Language picker and Get Started button included
- Close button (✕) top right
- Lock body scroll when open

---

## 2. Footer

### Structure
```
┌─────────────────────────────────────────────────────────┐
│  [Logo + tagline]    [Product]  [Resources]  [Company]  │
│                                                         │
│  [Social icons]      [Legal links]    © 2025 Pathways  │
│                                                         │
│  Pathways is not a law firm and does not provide        │
│  legal advice. For legal advice, consult a licensed     │
│  immigration consultant or lawyer.                      │
└─────────────────────────────────────────────────────────┘
```

### Style
- Background: `var(--color-green-deep)` with topographic texture
- All text: white, with secondary text at `rgba(255,255,255,0.6)`
- Divider: `rgba(255,255,255,0.12)`
- Link hover: `rgba(255,255,255,1)` (from 0.6 opacity)
- Legal disclaimer: `text-xs` in `rgba(255,255,255,0.4)` at very bottom

### Footer Links
```
Product:    How It Works · Pathways · Pricing · Why Pathways
Resources:  Blog · Guides · CRS Calculator · FAQ
Company:    About · Contact · Careers
Legal:      Privacy Policy · Terms of Service · Immigration Disclaimer
```

---

## 3. Primary Button

```tsx
// Variants: 'solid' (default), 'outline', 'ghost'
// Sizes: 'sm', 'md' (default), 'lg'

// Solid (default) — used for primary CTAs
className="
  inline-flex items-center justify-center gap-2
  bg-green-deep text-white
  font-semibold text-base
  px-7 py-3.5 rounded-full
  min-h-[52px]
  hover:bg-green-muted
  active:scale-[0.98]
  transition-all duration-150
  focus-visible:outline focus-visible:outline-2
  focus-visible:outline-offset-2 focus-visible:outline-green-deep
  whitespace-nowrap
"

// Outline — used for secondary CTAs on dark backgrounds
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
"

// On mobile: full width
// @media (max-width: 767px): width: 100%
```

---

## 4. Section Heading Pattern

Every section follows this heading structure. Maintain it consistently.

```tsx
function SectionHeading({ eyebrow, title, subtitle, centered = false, light = false }) {
  return (
    <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
      {eyebrow && (
        <p className={`
          text-sm font-semibold tracking-widest uppercase mb-4
          ${light ? 'text-white/60' : 'text-green-deep'}
        `}>
          {eyebrow}
        </p>
      )}
      <h2 className={`
        font-display font-normal
        text-4xl md:text-5xl
        leading-tight tracking-tight
        mb-5
        ${light ? 'text-white' : 'text-grey-900'}
      `}>
        {title}
      </h2>
      {subtitle && (
        <p className={`
          text-lg leading-relaxed max-w-[560px]
          ${centered ? 'mx-auto' : ''}
          ${light ? 'text-white/70' : 'text-grey-500'}
        `}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
```

---

## 5. Feature Card

Used in the Features section. Clean, minimal, no heavy shadows.

```tsx
function FeatureCard({ icon, title, description }) {
  return (
    <div className="
      p-8 rounded-2xl
      bg-white border border-grey-100
      hover:shadow-green hover:-translate-y-1
      transition-all duration-300
    ">
      <div className="
        w-12 h-12 rounded-xl
        bg-green-tint flex items-center justify-center
        mb-6
      ">
        {icon} {/* Lucide icon, color: text-green-deep */}
      </div>
      <h3 className="font-semibold text-xl text-grey-900 mb-3">{title}</h3>
      <p className="text-grey-500 leading-relaxed text-base">{description}</p>
    </div>
  )
}
```

---

## 6. Testimonial Card

```tsx
function TestimonialCard({ quote, name, role, company, avatar }) {
  return (
    <div className="
      p-8 rounded-2xl
      bg-white border border-grey-100
      shadow-md
    ">
      {/* Quote mark */}
      <span className="
        font-display text-6xl text-green-light leading-none
        block mb-4 -mt-2
      ">"</span>
      <p className="
        font-display text-xl text-grey-900
        leading-relaxed mb-8
        italic font-normal
      ">
        {quote}
      </p>
      <div className="flex items-center gap-4">
        <img
          src={avatar}
          alt={name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-sm text-grey-900">{name}</p>
          <p className="text-sm text-grey-500">{role} · {company}</p>
        </div>
      </div>
    </div>
  )
}
```

---

## 7. FAQ Accordion Item

Use shadcn/ui `Accordion` component. Style overrides:

```tsx
// Accordion item styling
<AccordionItem
  value={id}
  className="border-b border-grey-200 py-2"
>
  <AccordionTrigger className="
    text-left font-medium text-grey-900 text-base
    hover:text-green-deep hover:no-underline
    py-5 transition-colors duration-200
    [&[data-state=open]]:text-green-deep
  ">
    {question}
  </AccordionTrigger>
  <AccordionContent className="
    text-grey-500 leading-relaxed pb-5 text-base
  ">
    {answer}
  </AccordionContent>
</AccordionItem>
```

---

## 8. Pathway Card (Sliding Section)

```tsx
function PathwayCard({ country, flag, visaTypes, tagline, href, comingSoon = false }) {
  return (
    <div className={`
      relative flex-shrink-0 w-[300px] md:w-[340px]
      rounded-2xl overflow-hidden
      border border-grey-200
      group cursor-pointer
      transition-all duration-300
      ${comingSoon ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-green hover:-translate-y-1'}
    `}>
      {/* Top — green-deep background with flag and country */}
      <div className="bg-green-deep p-6 h-[140px] flex flex-col justify-between bg-green-textured">
        <span className="text-4xl">{flag}</span>
        <div>
          <p className="text-white/60 text-xs font-medium uppercase tracking-widest mb-1">
            {comingSoon ? 'Coming Soon' : 'Available Now'}
          </p>
          <h3 className="text-white font-display text-2xl font-normal">{country}</h3>
        </div>
      </div>
      {/* Bottom — white card body */}
      <div className="p-6 bg-white">
        <p className="text-grey-500 text-sm mb-4">{tagline}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {visaTypes.map(type => (
            <span key={type} className="
              text-xs font-medium text-green-deep
              bg-green-tint px-3 py-1 rounded-full
            ">{type}</span>
          ))}
        </div>
        {!comingSoon && (
          <Link href={href} className="
            text-sm font-semibold text-green-deep
            flex items-center gap-1
            group-hover:gap-2 transition-all duration-200
          ">
            Explore pathways <span>→</span>
          </Link>
        )}
      </div>
    </div>
  )
}
```

---

## 9. Stat / Social Proof Item

Used in the social proof bar.

```tsx
function StatItem({ value, label, light = false }) {
  return (
    <div className="text-center px-8">
      <p className={`
        font-display text-4xl md:text-5xl font-normal
        tracking-tight mb-2
        ${light ? 'text-white' : 'text-grey-900'}
      `}>
        {value}
      </p>
      <p className={`
        text-sm font-medium uppercase tracking-widest
        ${light ? 'text-white/60' : 'text-grey-500'}
      `}>
        {label}
      </p>
    </div>
  )
}
```

---

## 10. Responsive Rules (Summary)

Follow `PATHWAYS_RESPONSIVE.md` for full rules. Summary:

- Desktop first — default styles target 1280px+
- `max-w-[1200px] mx-auto` on all section containers
- Side padding: `px-10` desktop, `px-8` tablet, `px-5` mobile
- Navigation collapses to hamburger at `max-width: 767px`
- All multi-column grids collapse to single column on mobile
- Button width: `auto` desktop, `w-full` mobile
- Touch targets: minimum `44px × 44px` on all interactive elements
- Input `font-size` must be `1rem` (16px) minimum — prevents iOS zoom