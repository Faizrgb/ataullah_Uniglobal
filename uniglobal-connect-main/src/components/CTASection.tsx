import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="contact" className="py-20 hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsla(27,100%,50%,0.1),transparent_60%)]" />
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-primary-foreground/70 max-w-md mx-auto mb-8">
            Book a free consultation with our expert counsellors and take the first step towards your dream university.
          </p>
          <Button onClick={scrollToForm} size="lg" className="accent-gradient text-accent-foreground font-semibold px-8 h-13 rounded-xl shadow-lg border-0 text-base hover:opacity-90 transition-opacity">
            Book Free Consultation <ArrowRight size={18} className="ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
