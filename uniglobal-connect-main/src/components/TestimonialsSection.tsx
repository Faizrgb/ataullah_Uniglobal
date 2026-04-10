import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Priya Sharma", country: "Canada", text: "Uniglobal made my dream of studying in Canada a reality. Their guidance on SOP and visa was exceptional!", rating: 5 },
  { name: "Rahul Mehta", country: "USA", text: "The counsellors were extremely knowledgeable. Got admits from 3 top US universities!", rating: 5 },
  { name: "Ananya Patel", country: "UK", text: "From profile evaluation to visa approval, every step was smooth. Highly recommend Uniglobal!", rating: 5 },
];

const TestimonialsSection = () => (
  <section className="py-20 bg-background">
    <div className="container mx-auto px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">What Our Students Say</h2>
        <p className="text-muted-foreground">Hear from students who achieved their study abroad dreams with us.</p>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-2xl p-6 card-shadow"
          >
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} className="w-4 h-4 fill-accent text-accent" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{t.text}"</p>
            <div>
              <p className="font-heading font-bold text-foreground text-sm">{t.name}</p>
              <p className="text-xs text-muted-foreground">Studying in {t.country}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
