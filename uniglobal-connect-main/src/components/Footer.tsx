import { GraduationCap } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground py-12">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg accent-gradient flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-accent-foreground" />
            </div>
            <span className="font-heading font-bold text-lg text-background">Uniglobal</span>
          </div>
          <p className="text-sm text-background/50">Your trusted partner for study abroad consultancy. Helping students achieve their dreams since 2020.</p>
        </div>
        <div>
          <h4 className="font-heading font-bold text-background mb-3 text-sm">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {["Study Abroad", "Universities", "Services", "Blogs"].map((l) => (
              <a key={l} href="#" className="text-sm text-background/50 hover:text-background transition-colors">{l}</a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-heading font-bold text-background mb-3 text-sm">Destinations</h4>
          <div className="flex flex-col gap-2">
            {["USA", "UK", "Canada", "Australia", "Germany"].map((c) => (
              <span key={c} className="text-sm text-background/50">{c}</span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-heading font-bold text-background mb-3 text-sm">Contact</h4>
          <div className="flex flex-col gap-2 text-sm text-background/50">
            <span>📧 info@uniglobal.co.in</span>
            <span>📞 +91 98765 43210</span>
            <span>📍 New Delhi, India</span>
          </div>
        </div>
      </div>
      <div className="border-t border-background/10 mt-8 pt-6 text-center">
        <p className="text-xs text-background/40">© 2025 Uniglobal. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
