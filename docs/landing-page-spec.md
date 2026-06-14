# Pathways — Landing Page Spec
> For Claude: Read DESIGN_TOKENS.md and COMPONENT_SPEC.md before this file. This is the section-by-section build specification for the Pathways landing page (`app/page.tsx`). Build each section in order. Preserve and extend the existing landing page design language — do not redesign from scratch. Use Next.js 14 App Router, TypeScript strict mode, Tailwind CSS v4, and shadcn/ui throughout.

---

## Page File Structure

```
app/
  page.tsx                  ← Main landing page (imports all sections)
components/
  landing/
    HeroSection.tsx
    SocialProofSection.tsx
    HowItWorksSection.tsx
    FeaturesSection.tsx
    TestimonialsSection.tsx
    PathwaysSection.tsx
    FAQSection.tsx
    CTASection.tsx
  Navbar.tsx
  Footer.tsx
public/
  textures/
    topo-lines.svg           ← Topographic texture for dark green sections
  videos/
    hero-bg.mp4              ← Hero background video (muted, looping)
    hero-bg.webm             ← WebM version for better browser support
```

---

## Section 1 — Hero

### Goal
Immediate clarity on what Pathways is. Maximum visual impact. Single CTA.

### Layout
- Full viewport height (`min-h-screen`)
- Full-bleed background video, muted, autoplay, loop, playsInline
- Dark green overlay on top of video: `bg-green-deep/70` (so text is always readable)
- Topographic texture overlay at very low opacity on top of everything
- All content centered horizontally and vertically

### Content
```
[Navbar floats over this — transparent state]

        [Eyebrow: small caps, white/60]
        "AI-Powered Immigration Guidance"

        [Headline: font-display, white, text-6xl desktop / text-4xl mobile]
        "Your pathway to a
         new life, simplified."

        [Subtext: white/70, text-lg, max-w-md, centered]
        "Tell us about yourself in any language. We match you
         to the right visa, build your application, and guide
         you every step of the way."

        [CTA buttons — stacked horizontally, centered]
        [Primary: "Find My Pathway →"]   [Outline: "See How It Works"]

        [Trust line below CTAs: white/50, text-sm]
        "Available in any language  ·  50+ visa pathways  ·  No lawyer needed"

[Scroll indicator: animated chevron down, white/40, bottom center]
```

### Video Implementation
```tsx
<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
  {/* Background video */}
  <video
    autoPlay muted loop playsInline
    className="absolute inset-0 w-full h-full object-cover"
    poster="/images/hero-poster.jpg"
  >
    <source src="/videos/hero-bg.webm" type="video/webm" />
    <source src="/videos/hero-bg.mp4" type="video/mp4" />
  </video>

  {/* Green overlay */}
  <div className="absolute inset-0 bg-green-deep/75" />

  {/* Topo texture overlay */}
  <div
    className="absolute inset-0 opacity-[0.06]"
    style={{ backgroundImage: "url('/textures/topo-lines.svg')", backgroundSize: '600px' }}
  />

  {/* Content */}
  <div className="relative z-10 text-center px-5 max-w-3xl mx-auto">
    {/* ... headline, subtext, buttons */}
  </div>
</section>
```

**Video note:** If no video is available yet, use a static `bg-green-deep` background with the topographic texture at slightly higher opacity (`0.12`). The layout must work either way.

---

## Section 2 — Social Proof Bar

### Goal
Immediately establish credibility with numbers. Short, horizontal, no fluff.

### Layout
- Background: `var(--color-green-light)` (the muted grey-green)
- Thin top and bottom border: `border-y border-green-deep/10`
- Single row of stats, centered, with vertical dividers between them
- Padding: `py-12` desktop, `py-8` mobile
- On mobile: 2×2 grid

### Content (placeholder numbers — update with real data at launch)
```
  2,400+            50+              40+            Any Language
Applications    Visa Pathways    Countries        Supported
  Started         Available       Supported
```

### Implementation note
Animate the numbers counting up when the section enters the viewport (use `requestAnimationFrame` or a library like `react-countup`). Keep the animation under 1.5 seconds.

---

## Section 3 — How It Works

### Goal
Explain the Pathways flow clearly. Build confidence that it's simple.

### Layout
- Background: `white`
- Section heading centered at top
- Then alternating left-right rows (text left / visual right, then visual left / text right, etc.)
- Each row: `grid grid-cols-1 md:grid-cols-2 gap-16 items-center`
- Generous vertical spacing between rows: `mb-24` on desktop

### Section Heading
```
Eyebrow: "How It Works"
Title: "From conversation to
        application, in minutes."
Subtitle: "No confusing forms. No legal jargon. Just tell us about yourself."
Centered.
```

### Row 1 — Text left, Visual right
**Text:**
```
[Step number: "01" in tiny green-deep, font-body, tracking-widest]
[Heading: "Tell us about yourself"]
[Body: "Speak naturally in your own language. Our AI voice assistant
        asks the right questions to understand your background,
        goals, and situation — no forms, no jargon."]
[Subtle: small icon row showing supported language flags or audio wave]
```

**Visual:** A clean UI mockup of the voice AI interface — a minimal card showing a waveform animation and a transcription snippet. Style: white card, `shadow-lg`, `rounded-2xl`, on a `bg-green-tint` background square. Do not use a real screenshot — build a clean illustrative mockup in JSX/SVG.

### Row 2 — Visual left, Text right
**Text:**
```
[Step: "02"]
[Heading: "Get your matched pathways"]
[Body: "Based on your profile, we surface the visa pathways you
        actually qualify for — retrieved directly from our database,
        not generated by AI. Accurate, reliable, and clear."]
```

**Visual:** A mockup showing 2–3 pathway cards stacked/fanned, each with a country flag, visa type tag, and a match percentage or "Strong Match" label. Green-deep card headers.

### Row 3 — Text left, Visual right
**Text:**
```
[Step: "03"]
[Heading: "Get your personalized checklist"]
[Body: "Every pathway comes with a step-by-step checklist built
        around your specific profile. Know exactly what documents
        you need, what forms to fill, and in what order."]
```

**Visual:** A mockup of a checklist UI — clean list items with checkboxes, progress bar at top, a few items checked in green. Minimal, not busy.

### Row 4 — Visual left, Text right
**Text:**
```
[Step: "04"]
[Heading: "We help you build your application"]
[Body: "Generate the documents you need, draft your personal
        statements, and track your progress — all in one place.
        Pathways stays with you until you're approved."]
```

**Visual:** A mockup of a document being generated — a clean text document preview with a subtle "Generating..." animation or a completed status indicator.

---

## Section 4 — Features

### Goal
Show the depth of the platform in a scannable grid.

### Layout
- Background: `var(--color-green-tint)` (near-white green tint)
- Section heading left-aligned
- 3-column grid on desktop, 2-column tablet, 1-column mobile
- Use `FeatureCard` component from COMPONENT_SPEC.md

### Section Heading
```
Eyebrow: "The Platform"
Title: "Everything you need,
        nothing you don't."
Left-aligned. No subtitle needed.
```

### Feature Cards Content
```
1. 🌐 Any Language
   "Speak to Pathways in your native language.
    Our voice AI understands and responds in over 50 languages."

2. ⚡ Instant Pathway Matching
   "Your profile is matched against our verified pathway database
    in seconds. No waiting, no ambiguity."

3. 📋 Personalised Checklists
   "Every checklist is built around your specific situation —
    not a generic template copied from a government website."

4. 📄 Document Generation
   "Draft personal statements, cover letters, and supporting
    documents with AI assistance. You review and approve."

5. 🔒 Bank-Level Security
   "Your data is encrypted at rest and in transit. We never
    share your information with third parties."

6. 👥 Built for Individuals & Teams
   "Whether you're applying alone or an employer sponsoring
    international hires — Pathways scales with you."
```

---

## Section 5 — Testimonials

### Goal
Social proof through real human stories. Trust, not marketing.

### Layout
- Background: `white`
- Section heading centered
- 3-column grid on desktop, 1-column on mobile
- Use `TestimonialCard` component from COMPONENT_SPEC.md
- Below the cards: a single line in `text-grey-400 text-sm text-center mt-12`
  "Real users. Real outcomes. Names and details shared with permission."

### Section Heading
```
Eyebrow: "Success Stories"
Title: "People who found
        their pathway."
Centered.
```

### Placeholder Testimonials (replace with real ones at launch)
```
1. Quote: "I'd been trying to understand Express Entry for months.
            Pathways explained my options in Tagalog and had my
            profile ready in one afternoon."
   Name: Maria Santos
   Role: Software Engineer · Moving to Canada

2. Quote: "The checklist alone saved me hours of research.
            I knew exactly what documents I needed and in what order."
   Name: Arjun Mehta
   Role: Data Analyst · Express Entry Applicant

3. Quote: "The platform is very user-friendly and the guidance
            from our counsellors was knowledgeable from an HR perspective."
   Name: HR Generalist
   Role: Corsair · Enterprise Client
```

---

## Section 6 — Pathways (Sliding Cards)

### Goal
Show the countries and visa types available. Build excitement about roadmap.

### Layout
- Background: `var(--color-green-deep)` with topographic texture
- Section heading: white, left-aligned within max-width container
- Below heading: horizontally scrollable card row
- Cards use `PathwayCard` component from COMPONENT_SPEC.md
- Scroll container: `overflow-x-auto` with hidden scrollbar, `snap-x snap-mandatory`
- "More countries coming soon" card at the end of the row (muted, locked state)

### Section Heading
```
Eyebrow: "Where We Can Take You" (white/60)
Title: "Start your journey." (white, font-display)
Subtitle: "We're launching with Canada and expanding fast." (white/70)
Left-aligned.
```

### Cards
```
1. Canada 🇨🇦
   Tagline: "One of the world's most immigration-friendly countries."
   Visa types: ["Express Entry", "Provincial Nominee", "Family Sponsorship", "Study Permit"]
   Status: Available Now
   href: /pathways/canada

2. Coming Soon — [blurred/muted card]
   Country: "More coming soon"
   Show 2–3 placeholder cards with a lock icon and "Notify me" hover state
```

### Scrollable Container
```tsx
<div className="
  flex gap-6
  overflow-x-auto
  snap-x snap-mandatory
  scrollbar-hide
  pb-4 -mb-4   {/* hide scrollbar but allow scroll */}
  px-5 md:px-10
">
  {/* Cards snap to start */}
  {cards.map(card => (
    <div key={card.id} className="snap-start">
      <PathwayCard {...card} />
    </div>
  ))}
</div>
```

---

## Section 7 — FAQ

### Goal
Answer the most common objections and questions. Reduce friction before the final CTA.

### Layout
- Background: `white`
- Section heading left-aligned
- Single column accordion, max-width `680px`, left-aligned (not centered)
- Use shadcn/ui `Accordion` with styles from COMPONENT_SPEC.md

### Section Heading
```
Eyebrow: "FAQ"
Title: "Questions we get a lot."
Left-aligned. No subtitle.
```

### FAQ Items
```
Q: Is Pathways a law firm or immigration consultant?
A: No. Pathways is a technology platform that helps you understand your immigration
   options and organise your application. We are not a law firm and do not provide
   legal advice. For complex legal questions, we recommend consulting a licensed
   immigration consultant (RCIC) or lawyer. We can help you find one.

Q: How accurate is the pathway matching?
A: Our pathway matching is retrieval-based — we match your profile against a
   curated, regularly updated database of immigration pathways. We do not use
   AI to generate or invent pathways. If a pathway appears in your results,
   it exists and you meet the stated criteria.

Q: What languages does Pathways support?
A: Our voice AI supports any language. You can speak to Pathways in your native
   language and it will understand and respond. Written content is currently
   available in English, French, Hindi, Tagalog, Mandarin, and Spanish, with
   more being added regularly.

Q: Is my personal information secure?
A: Yes. All data is encrypted at rest and in transit. We use Supabase with
   row-level security, meaning your data is isolated and never accessible to
   other users. We do not sell or share your personal information with third parties.

Q: How much does Pathways cost?
A: We offer a free tier that gives you pathway matching and your personalised
   checklist. Our paid plans unlock document generation, direct application
   support, and priority guidance. See our Pricing page for full details.

Q: Which countries do you support?
A: We are launching with Canada (Express Entry, Provincial Nominee Programs,
   Family Sponsorship, and more). Additional countries are in development —
   join our waitlist to be notified when your destination is added.

Q: Can my employer use Pathways to sponsor me?
A: Yes. Pathways has a business tier designed for employers sponsoring
   international hires. Contact us at [email] to learn more.
```

---

## Section 8 — Final CTA

### Goal
Convert anyone who made it this far. One message, one button.

### Layout
- Background: `var(--color-green-deep)` with topographic texture
- Full-width section, generous padding: `py-32` desktop, `py-20` mobile
- All content centered
- No competing elements — just headline, subline, and button

### Content
```
[Headline: font-display, white, text-5xl desktop / text-3xl mobile, centered]
"Your new life starts
 with one conversation."

[Subline: white/70, text-lg, max-w-sm, centered]
"Tell us about yourself. We'll take it from there."

[Primary CTA button: white background, green-deep text — inverted for contrast]
"Find My Pathway →"

[Below button: white/40, text-xs, centered]
"Free to start  ·  No credit card required  ·  Takes 5 minutes"
```

### Inverted Button (CTA section only)
```tsx
className="
  inline-flex items-center gap-2
  bg-white text-green-deep
  font-semibold text-base
  px-8 py-4 rounded-full
  min-h-[56px]
  hover:bg-green-tint
  active:scale-[0.98]
  transition-all duration-150
  shadow-xl
"
```

---

## Section 9 — Footer

Use `Footer` component from COMPONENT_SPEC.md.

---

## Animation Notes

- All sections animate in on scroll with a `fade-up` (opacity 0 → 1, translateY 24px → 0)
- Use `IntersectionObserver` or Framer Motion `whileInView`
- Stagger child elements within sections by `100ms` delay increments
- Never animate the navbar or footer
- Hero content animates in on page load (not scroll), staggered: eyebrow → headline → subtext → buttons (each 80ms apart)

---

## Performance Notes

- Hero video: provide both `.webm` and `.mp4`. Use `poster` image for instant display before video loads.
- All section images/mockups: WebP, lazy-loaded, explicit `width` and `height`
- Pathway cards section: only render visible cards (virtualise if > 10 cards)
- FAQ accordion: all content in DOM (good for SEO), just hidden via CSS height
- Font: preload `Playfair Display` and `Inter` variable fonts in `app/layout.tsx`
- Lighthouse target: 90+ Performance, 90+ Accessibility, 90+ SEO

---

## Responsive Behaviour Summary

| Section | Desktop | Tablet | Mobile |
|---|---|---|---|
| Hero | Full screen video, centered content | Same | Same, smaller text |
| Social Proof | 4 stats in a row | 4 stats in a row | 2×2 grid |
| How It Works | Side-by-side rows | Side-by-side rows | Stack: text above visual |
| Features | 3-column grid | 2-column grid | 1-column |
| Testimonials | 3-column grid | 1-column | 1-column |
| Pathways | Horizontal scroll | Horizontal scroll | Horizontal scroll |
| FAQ | Left-aligned, max 680px | Same | Full width |
| Final CTA | Centered | Centered | Centered, full-width button |