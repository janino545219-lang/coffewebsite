import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Zap, Sun, Coffee, Sparkles } from 'lucide-react';

export const WhyUsSection: React.FC = () => {
  const reasons = [
    {
      icon: <Coffee className="w-6 h-6 text-amber-400" />,
      title: 'Top 1% Single-Origin Beans',
      desc: 'Sourced directly from high-altitude volcanic origins in Ethiopia, Panama, and Colombia with cupping scores exceeding 88+ points.'
    },
    {
      icon: <Award className="w-6 h-6 text-amber-400" />,
      title: 'World Barista Champion Team',
      desc: 'Our coffee is crafted exclusively by SCA-certified baristas trained in water chemistry, extraction science, and latte art.'
    },
    {
      icon: <Sun className="w-6 h-6 text-amber-400" />,
      title: 'Glasshouse Ambiance',
      desc: 'Designed with floor-to-ceiling glass architecture, lush botanical greenery, and acoustic jazz for deep focus or warm conversations.'
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-400" />,
      title: 'Express Mobile Ordering',
      desc: 'Order ahead via web app for zero-wait pickup at our dedicated Glasshouse Express Counter.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-amber-400" />,
      title: 'Zero Artificial Additives',
      desc: 'Hand-crafted syrups cooked daily from organic cane sugar, real Madagascar vanilla pods, and 72% Valrhona dark chocolate.'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-400" />,
      title: '100% Sustainable Footprint',
      desc: 'Compostable glassmorphic takeaway materials, zero single-use plastics, and renewable energy powering our entire roastery.'
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-coffee-950/95 relative overflow-hidden border-t border-amber-500/10">
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
            Uncompromising Standards
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-100">
            Why Discerning Coffee Lovers <span className="text-gold-gradient">Choose Us</span>
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />
          <p className="text-sm text-amber-100/70 font-light">
            We don’t just serve coffee—we curate an elevated lifestyle experience rooted in hospitality, precision, and passion.
          </p>
        </motion.div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((r, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="p-8 rounded-2xl bg-coffee-900/30 border border-amber-500/15 hover:border-amber-400/40 hover:bg-coffee-900/60 backdrop-blur-md transition-all duration-300 space-y-4 group hover:shadow-xl hover:shadow-amber-500/10"
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center group-hover:scale-110 transition-transform">
                {r.icon}
              </div>
              <h3 className="font-serif text-xl font-bold text-amber-100 group-hover:text-amber-300 transition-colors">
                {r.title}
              </h3>
              <p className="text-xs sm:text-sm text-amber-100/60 font-light leading-relaxed">
                {r.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
