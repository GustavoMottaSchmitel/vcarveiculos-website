import AboutUsSection from "./_components/AboutUsSection";
import { CarChatbot } from "./_components/CarChatbot";
import ContactSection from "./_components/ContactSection";
import HeroSection from "./_components/HeroSection";
import TestimonialsPage from "./_components/Testimonials";
import WhyChooseUsSection from "./_components/WhyChooseUsSection";

export default function Home() {
  return (
    <main className="min-h-screen">

      <div className="pt-16 lg:pt-20">
        <HeroSection />
      </div>

      <WhyChooseUsSection />

      <CarChatbot />

      <AboutUsSection />

      <TestimonialsPage />

      <ContactSection />

    </main>
  );
}
