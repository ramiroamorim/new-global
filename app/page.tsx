import { FrequentlyAskedQuestions } from "@/components/faq";
import { Features } from "@/components/features";
import { Hero } from "@/components/hero";
import { SpotlightLogoCloud } from "@/components/logos-cloud";
import { Testimonials } from "@/components/testimonials";
import { ContactFormGridWithDetails } from "@/components/contact-form";





export default function Home() {
  return (
    <div>
      <Hero />
      <SpotlightLogoCloud />
      <Features />
      <Testimonials />
      <ContactFormGridWithDetails />
      <FrequentlyAskedQuestions />
    
       </div>
  );
}
