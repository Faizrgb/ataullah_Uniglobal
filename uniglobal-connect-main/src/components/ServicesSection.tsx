import { motion } from "framer-motion";
import { UserCheck, Search, FileText, Shield } from "lucide-react";

const services = [
  { icon: UserCheck, title: "Profile Evaluation", desc: "Get a detailed assessment of your academic and professional profile for study abroad." },
  { icon: Search, title: "University Shortlisting", desc: "We match you with the best-fit universities based on your profile, budget, and goals." },
  { icon: FileText, title: "SOP/LOR Assistance", desc: "Expert guidance on crafting compelling statements and securing strong recommendations." },
  { icon: Shield, title: "Visa Guidance", desc: "End-to-end visa support with documentation review and mock interview preparation." },
];

const ServicesSection = () => (
  <section id="services" className="py-20 bg-background">
    <div className="container mx-auto px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">Our Services</h2>
        <p className="text-muted-foreground max-w-lg mx-auto">Everything you need for a successful study abroad journey, from profile evaluation to visa approval.</p>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {services.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl p-6 card-shadow hover:card-shadow-hover transition-shadow group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors">
                <Icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
              </div>
              <h3 className="font-heading font-bold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default ServicesSection;
