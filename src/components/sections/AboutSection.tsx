import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, Feather, Recycle } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const values = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-amber-400" />,
      title: 'Direct-Trade Sourcing',
      desc: 'We partner directly with family farms in Ethiopia, Colombia, and Panama, paying 3x Fair Trade prices to ensure micro-lot excellence.'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-400" />,
      title: 'Small-Batch Roasting',
      desc: 'Every single bean is flame-roasted on our restored 1968 Probat German cast-iron drum, unlocking intricate fruit and cocoa notes.'
    },
    {
      icon: <Feather className="w-6 h-6 text-amber-400" />,
      title: 'Artisanal Lamination',
      desc: 'Our master pastry chefs hand-fold 81 layers of French Isigny butter into every croissant, baked fresh twice daily at 6 AM & 2 PM.'
    },
    {
      icon: <Recycle className="w-6 h-6 text-amber-400" />,
      title: 'Zero-Waste Philosophy',
      desc: '100% compostable glassmorphic takeaway cups and recycled coffee ground soil enrichment delivered to local community gardens.'
    }
  ];

  return (
    <section id="about" className="py-24 bg-coffee-950 relative overflow-hidden border-t border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-mono">
            Crafting Perfection Since 2012
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-100">
            Where Science Meets <span className="text-gold-gradient">Coffee Artistry</span>
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />
          <p className="text-sm sm:text-base text-amber-100/70 font-light leading-relaxed">
            Founded by world barista championship judge Julian Vance, Aura Roast was created to transform the humble coffee cup into an unforgettable sensory journey of aroma, texture, and visual elegance.
          </p>
        </motion.div>

        {/* IMAGE STORY GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-700/20 to-coffee-800/20 blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />
            <div className="relative rounded-2xl overflow-hidden border border-amber-500/20 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80"
                alt="Aura Roast Roastery Interior"
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-coffee-950 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-coffee-950/80 backdrop-blur-md border border-amber-500/20">
                <p className="font-serif text-lg font-bold text-amber-200">The Glasshouse Roastery</p>
                <p className="text-xs text-amber-100/70">San Francisco, California</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-100 leading-snug">
              Every Sip Tells the Story of High-Altitude Volcano Soils & Passion
            </h3>
            <p className="text-xs sm:text-sm text-amber-100/70 font-light leading-relaxed">
              We source micro-lots exclusively grown above 1,800 meters elevation, where cold mountain nights slow cherry maturation, concentrating sugar levels and producing unmatched clarity in the final cup.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-coffee-900/40 border border-amber-500/15">
                <span className="font-serif text-2xl font-bold text-amber-400">100%</span>
                <p className="text-xs text-amber-200/70 font-mono uppercase tracking-wider mt-0.5">Arabica Specialty</p>
              </div>
              <div className="p-4 rounded-xl bg-coffee-900/40 border border-amber-500/15">
                <span className="font-serif text-2xl font-bold text-amber-400">88+</span>
                <p className="text-xs text-amber-200/70 font-mono uppercase tracking-wider mt-0.5">SCA Cupping Score</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* VALUES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="p-6 rounded-2xl bg-coffee-900/30 border border-amber-500/15 hover:border-amber-500/40 hover:bg-coffee-900/60 transition-all duration-300 space-y-3 group"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                {v.icon}
              </div>
              <h4 className="font-serif text-lg font-bold text-amber-100 group-hover:text-amber-300 transition-colors">
                {v.title}
              </h4>
              <p className="text-xs text-amber-100/60 leading-relaxed font-light">
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
