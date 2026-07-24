import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current?.children || [],
        { y: 40, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: footerRef.current, start: "top 90%" }
        }
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-[#0a0502] pt-24 pb-8 border-t border-amber-500/10 relative overflow-hidden">
      {/* Decorative noise/texture */}
      <div className="noise-overlay absolute inset-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          <div className="md:col-span-1">
             <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 p-[1px]">
                <div className="w-full h-full bg-[#0a0502] rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                </div>
              </div>
              <span className="font-serif text-xl font-bold tracking-widest text-stone-100">AURA</span>
            </div>
            <p className="text-sm text-amber-100/50 leading-relaxed font-light">
              Elevating the daily ritual through uncompromising sourcing, precision roasting, and cinematic hospitality.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-stone-200 mb-6 uppercase tracking-widest text-xs">Explore</h4>
            <ul className="space-y-4">
              <li><a href="#menu" className="text-sm text-amber-100/50 hover:text-amber-400 transition-colors">Signatures</a></li>
              <li><a href="#about" className="text-sm text-amber-100/50 hover:text-amber-400 transition-colors">Our Philosophy</a></li>
              <li><a href="#reservation" className="text-sm text-amber-100/50 hover:text-amber-400 transition-colors">Book a Table</a></li>
              <li><a href="#" className="text-sm text-amber-100/50 hover:text-amber-400 transition-colors">Wholesale</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-stone-200 mb-6 uppercase tracking-widest text-xs">Legal</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm text-amber-100/50 hover:text-amber-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-amber-100/50 hover:text-amber-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-amber-100/50 hover:text-amber-400 transition-colors">Shipping & Returns</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-stone-200 mb-6 uppercase tracking-widest text-xs">Stay Updated</h4>
            <p className="text-sm text-amber-100/50 mb-4 font-light">Subscribe for exclusive releases and events.</p>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-coffee-950/50 border border-amber-500/20 rounded-xl px-4 py-3 text-sm text-stone-200 focus:outline-none focus:border-amber-400 transition-all placeholder:text-stone-600"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold uppercase tracking-widest text-amber-400 hover:text-amber-300">
                Join
              </button>
            </div>
          </div>

        </div>

        <div className="border-t border-amber-500/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] uppercase tracking-widest text-amber-100/40">
            &copy; {new Date().getFullYear()} Aura Roast. All rights reserved.
          </p>
          <p className="text-[10px] uppercase tracking-widest text-amber-100/40 flex items-center gap-1">
            Crafted with <span className="text-amber-500">♥</span> in San Francisco
          </p>
        </div>
      </div>
    </footer>
  );
};
