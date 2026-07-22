import React from 'react';
import { Sparkles, ArrowRight, Award, Flame, HeartHandshake } from 'lucide-react';
import { CoffeeCupScene } from '../3d/CoffeeCupScene';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-gradient-to-b from-coffee-950 via-coffee-900/60 to-coffee-950">
      {/* GLOWING AMBIENT BACKGROUND SPHERES */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-400/10 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* LEFT CONTENT COLUMN */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left pt-6">
            {/* BADGE */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span>Artisanal Micro-Roastery & Glasshouse Café</span>
            </div>

            {/* HEADLINE */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-100 leading-[1.1]">
              Elevate Your Daily <br className="hidden sm:inline" />
              <span className="text-gold-gradient drop-shadow-lg">Coffee Ritual</span>
            </h1>

            {/* DESCRIPTION */}
            <p className="text-sm sm:text-base text-amber-100/75 max-w-xl font-light leading-relaxed mx-auto lg:mx-0">
              Immerse your senses in single-origin beans, roasted daily on our vintage German cast-iron roaster and served in a sunlit glasshouse sanctuary.
            </p>

            {/* CTA BUTTONS */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#menu"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-coffee-950 font-bold text-sm tracking-wider uppercase shadow-xl shadow-amber-500/20 hover:shadow-amber-400/40 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore Specialty Menu</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#reservation"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-coffee-900/80 hover:bg-coffee-800 text-amber-200 border border-amber-500/30 hover:border-amber-400 font-semibold text-sm tracking-wider uppercase backdrop-blur-md transition-all flex items-center justify-center gap-2"
              >
                <span>Reserve a Table</span>
              </a>
            </div>

            {/* METRICS TICKER */}
            <div className="pt-8 border-t border-amber-500/15 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <div className="flex items-center justify-center lg:justify-start gap-1 text-amber-400">
                  <Flame className="w-4 h-4" />
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-100">15+</span>
                </div>
                <p className="text-[11px] text-amber-200/60 tracking-wider uppercase mt-0.5">Single Origins</p>
              </div>

              <div>
                <div className="flex items-center justify-center lg:justify-start gap-1 text-amber-400">
                  <HeartHandshake className="w-4 h-4" />
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-100">50K+</span>
                </div>
                <p className="text-[11px] text-amber-200/60 tracking-wider uppercase mt-0.5">Happy Guests</p>
              </div>

              <div>
                <div className="flex items-center justify-center lg:justify-start gap-1 text-amber-400">
                  <Award className="w-4 h-4" />
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-100">99.8%</span>
                </div>
                <p className="text-[11px] text-amber-200/60 tracking-wider uppercase mt-0.5">Satisfaction</p>
              </div>
            </div>
          </div>

          {/* RIGHT 3D CANVAS COLUMN */}
          <div className="lg:col-span-6 flex justify-center items-center">
            <CoffeeCupScene />
          </div>
        </div>
      </div>
    </section>
  );
};
