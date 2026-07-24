import React, { useEffect, useRef } from 'react';
import { ArrowRight, Award, Coffee } from 'lucide-react';
import { gsap } from 'gsap';

// Custom Coffee Bean SVG Icon
const CoffeeBeanIcon: React.FC = () => (
  <svg className="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="M12 2c1.5 3 2.5 6 1.5 9s-3.5 5-1.5 9" />
    <path d="M8 7c1 1.5 2 3.5 1.5 5s-2 2.5-1.5 4" />
  </svg>
);

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(badgeRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.1
      })
      .from(headlineRef.current?.children || [], {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12
      }, "-=0.5")
      .from(descRef.current, {
        y: 25,
        opacity: 0,
        duration: 0.8
      }, "-=0.6")
      .from(ctaRef.current?.children || [], {
        y: 15,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08
      }, "-=0.4")
      .from(metricsRef.current?.children || [], {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1
      }, "-=0.4");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-[#000000]">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-950/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT CONTENT COLUMN */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left pt-6">
            
            {/* SUB-BADGE */}
            <div ref={badgeRef} className="text-amber-500/80 text-[11px] font-bold tracking-[0.35em] uppercase">
              Premium Coffee
            </div>

            {/* HEADLINE */}
            <h1 ref={headlineRef} className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-stone-100 leading-[1.08] perspective-1000">
              <span className="block text-stone-100">Experience</span>
              <span className="block text-amber-500 font-serif my-1.5">Coffee Like</span>
              <span className="block text-stone-100">Never Before</span>
            </h1>

            {/* DESCRIPTION */}
            <p ref={descRef} className="text-xs sm:text-sm text-amber-100/50 max-w-md font-light leading-relaxed mx-auto lg:mx-0">
              Discover handcrafted coffee made from carefully selected premium beans. Every cup is brewed with passion, delivering rich flavors, smooth aromas, and an unforgettable coffee experience.
            </p>

            {/* CTA BUTTONS */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#menu"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-coffee-950 font-bold text-xs tracking-widest uppercase shadow-lg shadow-amber-500/10 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Explore Our Menu</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#reservation"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-stone-100/20 hover:border-amber-500 text-stone-100 hover:text-amber-400 font-semibold text-xs tracking-widest uppercase bg-transparent transition-all flex items-center justify-center gap-2"
              >
                <span>Reserve a Table</span>
              </a>
            </div>

            {/* METRICS TICKER */}
            <div ref={metricsRef} className="pt-10 border-t border-amber-500/10 grid grid-cols-3 gap-6 text-center lg:text-left">
              <div className="space-y-2">
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <Coffee className="w-5 h-5 text-amber-400" />
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-100">20+</span>
                </div>
                <p className="text-[10px] text-amber-200/50 tracking-wider uppercase">Signature Drinks</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <CoffeeBeanIcon />
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-100">100%</span>
                </div>
                <p className="text-[10px] text-amber-200/50 tracking-wider uppercase">Premium Arabica Beans</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-100">5K+</span>
                </div>
                <p className="text-[10px] text-amber-200/50 tracking-wider uppercase">Happy Customers</p>
              </div>
            </div>
          </div>

          {/* RIGHT CINEMATIC IMAGE COLUMN */}
          <div className="lg:col-span-6 flex justify-center items-center relative h-[650px] w-full">
            <div className="relative w-full h-[550px] rounded-[3rem] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.9)] border border-amber-500/10 group">
              <img
                src="/cinematic_coffee_hero.png"
                alt="Realistic specialty espresso"
                className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-[4000ms] ease-out"
              />
              
              {/* Cinematic Vignette Overlay to blend it beautifully into the pitch black page */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-[#000000]/30" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-transparent to-[#000000]/20" />
              <div className="absolute inset-0 bg-gradient-to-l from-[#000000]/60 via-transparent to-[#000000]/10" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/10 via-transparent to-[#000000]/60" />
              
              {/* Delicate inner thin golden highlight border */}
              <div className="absolute inset-0 rounded-[3rem] border border-amber-500/15 pointer-events-none group-hover:border-amber-400/35 transition-colors duration-1000" />
            </div>
          </div>

        </div>
      </div>

      {/* VERTICAL SECTION NAVIGATION INDICATOR (Far Right) */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4 z-40 bg-coffee-950/40 backdrop-blur-md p-3 rounded-full border border-amber-500/10 shadow-2xl">
        <span className="text-[10px] font-mono text-amber-100/40">01</span>
        
        <div className="flex flex-col items-center gap-3">
          {[
            { id: 'hero', label: '01. Top' },
            { id: 'about', label: '02. Philosophy' },
            { id: 'featured', label: '03. Signature' },
            { id: 'menu', label: '04. Menu' },
            { id: 'contact', label: '05. Location' }
          ].map((sec, idx) => (
            <button
              key={sec.id}
              onClick={() => {
                if (sec.id === 'hero') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  const el = document.getElementById(sec.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              title={sec.label}
              className="group relative flex items-center justify-center p-1 cursor-pointer"
            >
              {/* Dot */}
              <span className={`rounded-full transition-all duration-300 ${
                idx === 0 
                  ? 'w-2 h-2 bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]' 
                  : 'w-1.5 h-1.5 bg-amber-100/30 group-hover:bg-amber-400 group-hover:scale-125'
              }`} />

              {/* Hover Tooltip Label */}
              <span className="absolute right-full mr-3 px-2.5 py-1 bg-coffee-950/90 text-amber-200 text-[10px] font-mono font-bold rounded-lg border border-amber-500/20 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 translate-x-1 group-hover:translate-x-0 shadow-lg">
                {sec.label}
              </span>
            </button>
          ))}
        </div>

        <span className="text-[10px] font-mono text-amber-100/40">05</span>
      </div>

      {/* MOUSE SCROLL INDICATOR */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 opacity-40 z-20 hover:opacity-75 transition-opacity">
        <div className="w-[22px] h-[36px] rounded-full border-2 border-amber-100/30 flex justify-center p-1.5">
          <div className="w-[3px] h-[7px] bg-amber-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};
