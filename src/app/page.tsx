import { HeroSection }           from "@/components/landing/HeroSection";
import { SocialProofSection }    from "@/components/landing/SocialProofSection";
import { VisaMatchSection,
         ApplyConfidenceSection } from "@/components/landing/ValuePropsSection";
import { HowItWorksSection }     from "@/components/landing/HowItWorksSection";
import { KeyFeaturesSection }    from "@/components/landing/KeyFeaturesSection";
import { TestimonialsSection }   from "@/components/landing/TestimonialsSection";
import { PathwaysSection }       from "@/components/landing/PathwaysSection";
import { FAQSection }            from "@/components/landing/FAQSection";
import { CTASection }            from "@/components/landing/CTASection";
import { Footer }                from "@/components/Footer";

export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      <SocialProofSection />
      <VisaMatchSection />
      <ApplyConfidenceSection />
      <HowItWorksSection />
      <KeyFeaturesSection />
      <TestimonialsSection />
      <PathwaysSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
