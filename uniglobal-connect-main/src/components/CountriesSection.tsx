import { motion } from "framer-motion";

const destinations = [
  { name: "USA", flag: "🇺🇸", unis: "4000+ Universities", color: "from-blue-500/10 to-red-500/10" },
  { name: "United Kingdom", flag: "🇬🇧", unis: "150+ Universities", color: "from-red-500/10 to-blue-500/10" },
  { name: "Canada", flag: "🇨🇦", unis: "100+ Universities", color: "from-red-500/10 to-white/10" },
  { name: "Germany", flag: "🇩🇪", unis: "400+ Universities", color: "from-yellow-500/10 to-red-500/10" },
  { name: "Australia", flag: "🇦🇺", unis: "43+ Universities", color: "from-blue-500/10 to-yellow-500/10" },
  { name: "France", flag: "🇫🇷", unis: "70+ Universities", color: "from-blue-500/10 to-red-500/10" },
];

const CountriesSection = () => (
  <section className="py-20 bg-card">
    <div className="container mx-auto px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">Popular Destinations</h2>
        <p className="text-muted-foreground max-w-lg mx-auto">Explore top study abroad destinations with world-class universities and career opportunities.</p>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {destinations.map((d, i) => (
          <motion.div
            key={d.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="bg-background rounded-2xl p-6 card-shadow hover:card-shadow-hover transition-all hover:-translate-y-1 cursor-pointer group"
          >
            <span className="text-4xl mb-3 block">{d.flag}</span>
            <h3 className="font-heading font-bold text-lg text-foreground mb-1">{d.name}</h3>
            <p className="text-sm text-muted-foreground">{d.unis}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CountriesSection;
