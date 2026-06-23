"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

type FAQItem = { q: string; a: string };

const FAQS: FAQItem[] = [
  {
    q: "Is Pathways a law firm or immigration consultant?",
    a: "No. Pathways is a technology platform that helps you understand your immigration options and organise your application. We are not a law firm and do not provide legal advice. For complex legal questions, we recommend consulting a licensed immigration consultant (RCIC) or lawyer. We can help you find one.",
  },
  {
    q: "How accurate is the pathway matching?",
    a: "Our pathway matching is retrieval-based — we match your profile against a curated, regularly updated database of immigration pathways. We do not use AI to generate or invent pathways. If a pathway appears in your results, it exists and you meet the stated criteria.",
  },
  {
    q: "What languages does Pathways support?",
    a: "Our voice AI supports any language. You can speak to Pathways in your native language and it will understand and respond. Written content is currently available in English, French, Hindi, Tagalog, Mandarin, and Spanish, with more being added regularly.",
  },
  {
    q: "Is my personal information secure?",
    a: "Yes. All data is encrypted at rest and in transit. We use row-level security, meaning your data is isolated and never accessible to other users. We do not sell or share your personal information with third parties.",
  },
  {
    q: "How much does Pathways cost?",
    a: "Pathway matching and your personalised checklist are always free. Paid plans unlock document generation, direct application support, and priority guidance — at a fraction of what a lawyer charges.",
  },
  {
    q: "Which countries do you support?",
    a: "We are launching with Canada (Express Entry, Provincial Nominee Programs, Family Sponsorship, and more). Additional countries are in development — join our waitlist to be notified when your destination is added.",
  },
  {
    q: "Can my employer use Pathways to sponsor me?",
    a: "Yes. Pathways has a business tier designed for employers sponsoring international hires. Contact us to learn more.",
  },
];

function AccordionItem({
  item,
  open,
  onToggle,
}: {
  item: FAQItem;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-grey-200">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="w-full flex items-center justify-between text-left py-5 gap-4 group"
      >
        <span
          className={`font-medium text-base transition-colors duration-200 ${
            open ? "text-green-deep" : "text-grey-900 group-hover:text-green-deep"
          }`}
        >
          {item.q}
        </span>
        <span className={`shrink-0 transition-colors duration-200 ${open ? "text-green-deep" : "text-grey-400"}`}>
          {open ? <Minus size={16} aria-hidden="true" /> : <Plus size={16} aria-hidden="true" />}
        </span>
      </button>

      {/* Height-based animation — CSS only, no JS measurement needed */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-grey-500 leading-relaxed text-base pb-5 pr-8">
          {item.a}
        </p>
      </div>
    </div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white max-md:py-14">
      <div className="max-w-[1280px] mx-auto px-10 max-md:px-5">

        {/* Centered heading */}
        <div className="mb-12 max-md:mb-8 text-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-green-deep mb-4">
            FAQ
          </p>
          <h2
            className="font-display font-normal text-5xl max-md:text-3xl text-grey-900 leading-tight tracking-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            Questions we get a lot.
          </h2>
        </div>

        {/* Accordion — centered */}
        <div className="max-w-[680px] mx-auto">
          {FAQS.map((item, i) => (
            <AccordionItem
              key={item.q}
              item={item}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
