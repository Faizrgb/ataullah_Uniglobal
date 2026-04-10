import Navbar from "@/components/Navbar";
import LeadForm from "@/components/LeadForm";
import StatsSection from "@/components/StatsSection";
import ServicesSection from "@/components/ServicesSection";
import CountriesSection from "@/components/CountriesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <div className="pt-16">
      <LeadForm />
      <StatsSection />
      <ServicesSection />
      <CountriesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
    <Chatbot />
  </div>
);

export default Index;
