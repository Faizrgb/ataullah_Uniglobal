import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const faqs: Record<string, string> = {
  "best country": "The best country depends on your goals! USA offers top research universities, Canada has great post-study work options, and Germany has low tuition fees. Book a free consultation for personalized advice!",
  "cost": "Study abroad costs vary: USA ($20K-$60K/yr), UK (£10K-£30K/yr), Canada (CAD 15K-40K/yr), Germany (mostly free tuition!). We help you find scholarships too!",
  "requirements": "Generally you need: Academic transcripts, English proficiency (IELTS/TOEFL), SOP, LORs, and a valid passport. Requirements vary by country and university.",
  "ielts": "Most universities require IELTS 6.0-7.0 overall. Some universities in Germany and Canada accept Duolingo. We can guide you on specific requirements!",
  "scholarship": "Many universities offer merit-based and need-based scholarships. We help identify scholarships that match your profile. Book a free consultation to learn more!",
};

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "bot" | "user"; text: string }[]>([
    { role: "bot", text: "Hi! 👋 I'm Uniglobal's assistant. Ask me about study abroad destinations, costs, requirements, or book a free consultation!" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((m) => [...m, { role: "user", text: userMsg }]);
    setInput("");

    const lower = userMsg.toLowerCase();
    let reply = "I'd love to help! For personalized guidance, I recommend booking a free consultation with our experts. Click the button below!";
    for (const [key, val] of Object.entries(faqs)) {
      if (lower.includes(key)) {
        reply = val;
        break;
      }
    }
    setTimeout(() => setMessages((m) => [...m, { role: "bot", text: reply }]), 600);
  };

  const scrollToForm = () => {
    setOpen(false);
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-4 z-50 w-80 sm:w-96 bg-card rounded-2xl card-shadow border border-border overflow-hidden flex flex-col"
            style={{ maxHeight: "70vh" }}
          >
            <div className="hero-gradient px-4 py-3 flex items-center justify-between">
              <span className="font-heading font-bold text-primary-foreground text-sm">Uniglobal Assistant</span>
              <button onClick={() => setOpen(false)} className="text-primary-foreground/70 hover:text-primary-foreground">
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px] max-h-[400px]">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-border">
              <button onClick={scrollToForm} className="w-full text-xs text-accent font-semibold mb-2 hover:underline">
                📅 Book Free Consultation
              </button>
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type a question..."
                  className="h-9 text-sm rounded-lg"
                />
                <Button size="sm" onClick={handleSend} className="bg-primary text-primary-foreground h-9 w-9 p-0 rounded-lg">
                  <Send size={14} />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-4 z-50 w-14 h-14 rounded-full accent-gradient flex items-center justify-center shadow-lg"
      >
        {open ? <X className="text-accent-foreground" size={22} /> : <MessageCircle className="text-accent-foreground" size={22} />}
      </motion.button>
    </>
  );
};

export default Chatbot;
