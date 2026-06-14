type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
  color: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "I'd been trying to understand Express Entry for months. Pathways explained my options in Tagalog and had my profile ready in one afternoon.",
    name: "Maria Santos",
    role: "Software Engineer · Moving to Canada",
    initials: "MS",
    color: "bg-green-deep",
  },
  {
    quote:
      "The checklist alone saved me hours of research. I knew exactly what documents I needed and in what order.",
    name: "Arjun Mehta",
    role: "Data Analyst · Express Entry Applicant",
    initials: "AM",
    color: "bg-green-muted",
  },
  {
    quote:
      "The platform is very user-friendly and the guidance from our counsellors was knowledgeable from an HR perspective.",
    name: "HR Generalist",
    role: "Corsair · Enterprise Client",
    initials: "HR",
    color: "bg-grey-700",
  },
];

function TestimonialCard({ quote, name, role, initials, color }: Testimonial) {
  return (
    <div className="p-8 rounded-2xl bg-white border border-grey-100 shadow-card-md flex flex-col">
      {/* Opening quote mark */}
      <span
        className="font-display text-6xl text-green-light leading-none block mb-4 -mt-2 select-none"
        aria-hidden="true"
      >
        &ldquo;
      </span>

      <p className="font-display text-xl text-grey-900 leading-relaxed mb-8 italic font-normal flex-1">
        {quote}
      </p>

      <div className="flex items-center gap-4">
        {/* Avatar initials */}
        <div
          className={`w-10 h-10 rounded-full ${color} flex items-center justify-center shrink-0`}
          aria-hidden="true"
        >
          <span className="text-xs font-bold text-white tracking-wide">
            {initials}
          </span>
        </div>
        <div>
          <p className="font-semibold text-sm text-grey-900">{name}</p>
          <p className="text-sm text-grey-500">{role}</p>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-white max-md:py-14">
      <div className="max-w-[1200px] mx-auto px-10 max-md:px-5">

        {/* Centered heading */}
        <div className="text-center mb-16 max-md:mb-10">
          <p className="text-sm font-semibold tracking-widest uppercase text-green-deep mb-4">
            Success Stories
          </p>
          <h2
            className="font-display font-normal text-5xl max-md:text-3xl text-grey-900 leading-tight tracking-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            People who found<br />
            their pathway.
          </h2>
        </div>

        {/* 3-col desktop / 1-col mobile */}
        <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-1">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>

        <p className="text-grey-400 text-sm text-center mt-12">
          Real users. Real outcomes. Names and details shared with permission.
        </p>

      </div>
    </section>
  );
}
