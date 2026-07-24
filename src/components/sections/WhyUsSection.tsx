import React, { useEffect, useRef } from 'react';
import { Leaf, Droplets, MapPin, Award } from 'lucide-react';
import { gsap } from 'gsap';

export const WhyUsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Direct Sourcing",
      desc: "We travel to farms globally, bypassing brokers to ensure farmers are paid fairly and we get the absolute best beans."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Master Roasting",
      desc: "Our head roaster has 15 years of experience, coaxing out the unique flavor profile of each single-origin bean."
    },
    {
      icon: <Droplets className="w-8 h-8" />,
      title: "Water Alchemy",
      desc: "Coffee is 98% water. We use a reverse osmosis system remineralized to exact specifications for perfect extraction."
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Zero Waste",
      desc: "Our spent grounds are composted locally, our packaging is fully biodegradable, and our roaster runs on clean energy."
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo('.why-header', 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }}
      );

      // Cards stagger reveal
      gsap.fromTo(cardsRef.current?.children || [],
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: 'back.out(1.2)',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 85%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden bg-coffee-950">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-amber-600/10 via-transparent to-transparent rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="why-header text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-amber-400 text-xs font-bold tracking-[0.2em] uppercase">The Aura Difference</span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-stone-100">
            Obsessive <span className="text-gold-gradient">Craftsmanship</span>
          </h2>
          <p className="text-amber-100/70 text-lg font-light">
            We control every variable from farm to cup. It’s not just coffee; it’s a pursuit of perfection.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="glass-card p-8 rounded-3xl text-center group hover:border-amber-500/40 hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-900/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 group-hover:text-amber-300 transition-transform duration-500 shadow-lg shadow-amber-500/5">
                {feature.icon}
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-100 mb-3">{feature.title}</h3>
              <p className="text-sm text-amber-100/60 font-light leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
