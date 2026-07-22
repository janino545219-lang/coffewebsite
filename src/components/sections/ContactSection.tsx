import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Navigation, ExternalLink } from 'lucide-react';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-coffee-950 relative overflow-hidden border-t border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-mono">
            Visit & Connect
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-100">
            Find Our <span className="text-gold-gradient">Sanctuary</span>
          </h2>
          <p className="text-sm text-amber-100/70 font-light">
            Located in the heart of San Francisco’s historic Glasshouse District. Step inside for freshly roasted aromas and warm luxury.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* INTERACTIVE MAP MOCKUP */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 rounded-3xl overflow-hidden border border-amber-500/20 shadow-2xl relative min-h-[400px] group"
          >
            {/* Styled Dark Map Graphic */}
            <div className="absolute inset-0 bg-[#120a07] bg-[radial-gradient(#2b1810_1px,transparent_1px)] [background-size:16px_16px] flex items-center justify-center">
              {/* Map Road Patterns */}
              <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                <path d="M 0 100 Q 250 180 500 120 T 1000 300" fill="none" stroke="#d4a373" strokeWidth="3" />
                <path d="M 200 0 Q 300 250 400 600" fill="none" stroke="#d4a373" strokeWidth="2" strokeDasharray="4 4" />
                <circle cx="450" cy="220" r="80" fill="rgba(212, 163, 115, 0.05)" stroke="#d4a373" strokeWidth="1" />
              </svg>

              {/* COFFEE PIN MARKER */}
              <div className="relative z-10 flex flex-col items-center animate-bounce">
                <div className="p-3 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 text-coffee-950 shadow-2xl shadow-amber-500/50 border-2 border-white">
                  <MapPin className="w-7 h-7 fill-coffee-950" />
                </div>
                <div className="mt-2 px-3 py-1 rounded-full bg-coffee-950/90 border border-amber-500/40 backdrop-blur-md text-xs font-serif font-bold text-amber-300 shadow-xl">
                  Aura Roast Flagship
                </div>
              </div>
            </div>

            {/* MAP FLOATING CONTROLS OVERLAY */}
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-coffee-950/85 backdrop-blur-md border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 z-20">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                  <Navigation className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-stone-100">458 Grand Avenue, SF 94108</h4>
                  <p className="text-[11px] text-amber-200/60">Glasshouse District • Valet Parking Available</p>
                </div>
              </div>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-coffee-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shrink-0"
              >
                <span>Open in Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* CONTACT DETAILS CARD */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 p-8 sm:p-10 rounded-3xl bg-coffee-900/40 border border-amber-500/20 backdrop-blur-xl flex flex-col justify-between space-y-6"
          >
            <div>
              <h3 className="font-serif text-2xl font-bold text-amber-100 mb-6">Concierge & Inquiries</h3>

              <div className="space-y-5 text-xs text-amber-100/80">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-coffee-950 border border-amber-500/20 text-amber-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-100 text-sm">Flagship Café</h4>
                    <p className="text-amber-200/60 mt-0.5">458 Grand Avenue, Glasshouse District, SF 94108</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-coffee-950 border border-amber-500/20 text-amber-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-100 text-sm">Phone Concierge</h4>
                    <p className="text-amber-200/60 mt-0.5">+1 (415) 890-2345 (Reservations & Orders)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-coffee-950 border border-amber-500/20 text-amber-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-100 text-sm">Email Inquiries</h4>
                    <p className="text-amber-200/60 mt-0.5">concierge@auraroast.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-coffee-950 border border-amber-500/20 text-amber-400">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-100 text-sm">Operating Hours</h4>
                    <p className="text-amber-200/60 mt-0.5">Mon–Fri: 6:30 AM – 9:00 PM</p>
                    <p className="text-amber-200/60">Sat–Sun: 7:00 AM – 10:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-coffee-800/80 flex items-center justify-between text-xs text-amber-200/60">
              <span>Private Event Hire Available</span>
              <a href="#reservation" className="text-amber-300 font-bold hover:underline">Book Lounge →</a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
