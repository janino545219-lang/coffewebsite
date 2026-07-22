import React, { useState } from 'react';
import { Coffee, Send, MapPin, Phone, Mail, Clock, Globe, Share2, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-coffee-950 border-t border-amber-500/15 relative overflow-hidden pt-16 pb-12">
      {/* Glow Backdrop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-amber-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-coffee-800/60">
          {/* BRAND BIO */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 p-[1px]">
                <div className="w-full h-full bg-coffee-950 rounded-full flex items-center justify-center">
                  <Coffee className="w-4 h-4 text-amber-400" />
                </div>
              </div>
              <span className="font-serif text-2xl font-bold tracking-wider text-gold-gradient">
                AURA ROAST
              </span>
            </div>
            <p className="text-xs text-amber-100/60 leading-relaxed font-light">
              Crafting sensory coffee experiences since 2012. Micro-roasted single-origin beans, artisanal baking, and glassmorphic warmth.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-coffee-900 border border-amber-500/20 flex items-center justify-center text-amber-300 hover:bg-amber-500 hover:text-coffee-950 transition-all" title="Instagram">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-coffee-900 border border-amber-500/20 flex items-center justify-center text-amber-300 hover:bg-amber-500 hover:text-coffee-950 transition-all" title="Facebook">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-coffee-900 border border-amber-500/20 flex items-center justify-center text-amber-300 hover:bg-amber-500 hover:text-coffee-950 transition-all" title="Twitter">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-amber-200 uppercase tracking-widest mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-amber-100/70">
              <li><a href="#about" className="hover:text-amber-400 transition-colors">Our Artisan Story</a></li>
              <li><a href="#menu" className="hover:text-amber-400 transition-colors">Specialty Coffee Menu</a></li>
              <li><a href="#reservation" className="hover:text-amber-400 transition-colors">Book a Table</a></li>
              <li><a href="#gallery" className="hover:text-amber-400 transition-colors">Café Ambiance Gallery</a></li>
              <li><a href="#why-us" className="hover:text-amber-400 transition-colors">Bean Sourcing Philosophy</a></li>
            </ul>
          </div>

          {/* HOURS & CONTACT */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-amber-200 uppercase tracking-widest mb-4">
              Hours & Location
            </h4>
            <ul className="space-y-3 text-xs text-amber-100/70">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>458 Grand Avenue, Glasshouse District, SF 94108</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Mon–Fri: 6:30 AM – 9:00 PM</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Sat–Sun: 7:00 AM – 10:00 PM</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+1 (415) 890-2345</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>concierge@auraroast.com</span>
              </li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-amber-200 uppercase tracking-widest mb-4">
              The Coffee Gazette
            </h4>
            <p className="text-xs text-amber-100/60 leading-relaxed mb-3">
              Subscribe for micro-batch bean release alerts, cupping workshop invitations, and 15% off your first order.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg bg-coffee-900/80 border border-amber-500/20 text-amber-100 placeholder-amber-200/40 text-xs focus:outline-none focus:border-amber-400 pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-amber-500 hover:bg-amber-400 text-coffee-950 rounded-md flex items-center justify-center transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-emerald-400 font-medium animate-fadeIn">
                  ✓ Thank you! Check your inbox for your 15% code.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-amber-200/40 gap-4">
          <p>© 2026 Aura Roast Micro-Roastery & Café. Designed for Coffee Lovers worldwide.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-amber-300">Privacy Policy</a>
            <a href="#" className="hover:text-amber-300">Terms of Service</a>
            <a href="#" className="hover:text-amber-300">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
