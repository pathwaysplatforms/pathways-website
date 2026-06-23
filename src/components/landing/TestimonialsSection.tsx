type Testimonial = {
  quote:    string;
  name:     string;
  role:     string;
  initials: string;
  color:    string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:    "I'd been trying to understand Express Entry for months. Pathways explained my options in Tagalog and had my profile ready in one afternoon.",
    name:     "Maria Santos",
    role:     "Software Engineer · Moving to Canada",
    initials: "MS",
    color:    "bg-green-deep",
  },
  {
    quote:    "The checklist alone saved me hours of research. I knew exactly what documents I needed and in what order.",
    name:     "Arjun Mehta",
    role:     "Data Analyst · Express Entry Applicant",
    initials: "AM",
    color:    "bg-green-muted",
  },
  {
    quote:    "I applied for the Provincial Nominee Program and Pathways walked me through every step in Spanish. I couldn't believe how clear it made everything.",
    name:     "Camila Rodrígues",
    role:     "Nurse · Ontario PNP Applicant",
    initials: "CR",
    color:    "bg-grey-700",
  },
  {
    quote:    "As someone who had a previous visa refusal, I was nervous. Pathways helped me understand exactly what went wrong and how to address it this time.",
    name:     "Wei Zhang",
    role:     "Mechanical Engineer · Study Permit",
    initials: "WZ",
    color:    "bg-green-deep",
  },
  {
    quote:    "Three different lawyers quoted me $6,000. Pathways got me the same roadmap in 15 minutes, for free. I submitted my application myself and was approved.",
    name:     "Fatima Al-Rashid",
    role:     "Accountant · Family Sponsorship",
    initials: "FA",
    color:    "bg-green-muted",
  },
  {
    quote:    "The voice feature is incredible. I just talked through my situation and it figured out I qualified for a stream I'd never even heard of.",
    name:     "James Okafor",
    role:     "IT Manager · Atlantic Immigration Program",
    initials: "JO",
    color:    "bg-grey-700",
  },
  {
    quote:    "My French isn't perfect, but Pathways understood everything I said and responded clearly. It felt like talking to an expert who actually cared.",
    name:     "Amara Diallo",
    role:     "Teacher · Francophone Mobility Program",
    initials: "AD",
    color:    "bg-green-deep",
  },
  {
    quote:    "I was skeptical of another AI tool, but Pathways only showed me real programs I actually qualified for — no hallucinated pathways. That trust matters.",
    name:     "Priya Krishnamurthy",
    role:     "Data Scientist · Startup Visa Applicant",
    initials: "PK",
    color:    "bg-green-muted",
  },
  {
    quote:    "We used Pathways to help onboard three international hires. It cut our HR team's immigration prep work in half.",
    name:     "Lena Hofmann",
    role:     "HR Director · Enterprise Client",
    initials: "LH",
    color:    "bg-grey-700",
  },
  {
    quote:    "The document generation feature drafted my personal statement better than I could have written it myself. My consultant said it was excellent.",
    name:     "Daniel Abebe",
    role:     "Chef · Rural & Northern Immigration Pilot",
    initials: "DA",
    color:    "bg-green-deep",
  },
];

function TestimonialCard({ quote, name, role, initials, color }: Testimonial) {
  return (
    <div className="w-[320px] shrink-0 p-7 rounded-2xl bg-white border border-grey-100 shadow-card-md flex flex-col select-none">
      <span className="font-display text-5xl text-green-light leading-none block mb-3 -mt-1" aria-hidden="true">
        &ldquo;
      </span>
      <p className="font-display text-base text-grey-900 leading-relaxed italic font-normal flex-1 mb-6">
        {quote}
      </p>
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-full ${color} flex items-center justify-center shrink-0`} aria-hidden="true">
          <span className="text-[10px] font-bold text-white tracking-wide">{initials}</span>
        </div>
        <div>
          <p className="font-semibold text-sm text-grey-900 leading-none mb-0.5">{name}</p>
          <p className="text-xs text-grey-400">{role}</p>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-white max-md:py-14" aria-label="Success Stories">
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee-scroll 90s linear infinite;
          will-change: transform;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Heading */}
      <div className="text-center mb-14 px-10 max-md:px-5 max-md:mb-10">
        <p className="text-sm font-semibold tracking-widest uppercase text-green-deep mb-4">
          Success Stories
        </p>
        <h2
          className="font-display font-normal text-5xl max-md:text-3xl text-grey-900 leading-tight"
          style={{ letterSpacing: "-0.02em" }}
        >
          People who found<br />
          their pathway.
        </h2>
      </div>

      {/*
        Marquee sits inside a container that is inset from the page edges.
        overflow-hidden clips the cards at the container boundary, not the
        viewport edge — so cards visibly fade behind white space before
        reaching the page margin.
      */}
      <div className="relative mx-10 max-md:mx-4 overflow-hidden">
        {/* Left fade — cards disappear behind white before the page edge */}
        <div
          className="absolute left-0 inset-y-0 w-44 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, white 15%, transparent 100%)" }}
          aria-hidden="true"
        />
        {/* Right fade */}
        <div
          className="absolute right-0 inset-y-0 w-44 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, white 15%, transparent 100%)" }}
          aria-hidden="true"
        />

        {/* Scrolling track — duplicated for seamless infinite loop */}
        <div className="marquee-track flex gap-5 w-max py-3">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>
      </div>

      <p className="text-grey-400 text-sm text-center mt-12 px-10">
        Real users. Real outcomes. Names and details shared with permission.
      </p>
    </section>
  );
}
