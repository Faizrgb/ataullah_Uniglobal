import { motion } from "framer-motion";
import { Globe, Building2, BookOpen, Users } from "lucide-react";

const stats = [
  { icon: Globe, value: "42+", label: "Countries" },
  { icon: Building2, value: "1000+", label: "Universities" },
  { icon: BookOpen, value: "100K+", label: "Courses" },
  { icon: Users, value: "10K+", label: "Students Assisted" },
];

const StatsSection = () => (
  <section className="py-16 bg-card">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-accent/10 flex items-center justify-center">
                <Icon className="w-7 h-7 text-accent" />
              </div>
              <p className="font-heading text-3xl font-extrabold text-foreground">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </motion.div>
          );
        })}
      </div>
      <p className="text-center text-muted-foreground mt-8 text-sm">✅ Free counselling for students & parents</p>
    </div>
  </section>
);

export default StatsSection;
