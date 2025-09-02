import CTA from "@/components/cta";
import { FrequentlyAskedQuestions } from "@/components/faq";
import { Features } from "@/components/features";
import { Hero } from "@/components/hero";
import { SpotlightLogoCloud } from "@/components/logos-cloud";
import { Testimonials } from "@/components/testimonials";

export default function Home() {
  return (
    <div>
      <Hero />
      <SpotlightLogoCloud />
      <Features />
      <Testimonials />
      <FrequentlyAskedQuestions />
      <CTA />
    </div>
  );
}
