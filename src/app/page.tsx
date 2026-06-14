import { HeroSection }         from "@/components/landing/HeroSection";
import { SocialProofSection }  from "@/components/landing/SocialProofSection";
import { HowItWorksSection }   from "@/components/landing/HowItWorksSection";
import { FeaturesSection }     from "@/components/landing/FeaturesSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { PathwaysSection }     from "@/components/landing/PathwaysSection";
import { FAQSection }          from "@/components/landing/FAQSection";
import { CTASection }          from "@/components/landing/CTASection";
import { Footer }              from "@/components/Footer";

export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      <SocialProofSection />
      <HowItWorksSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PathwaysSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
