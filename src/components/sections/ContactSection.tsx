import React, { useRef, useEffect } from 'react';
import { MapPin, Phone, Mail, Camera, MessageCircle } from 'lucide-react';
import { gsap } from 'gsap';

export const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { y: 60, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }}
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="py-24 bg-coffee-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div ref={cardRef} className="glass-panel-elevated rounded-[3rem] overflow-hidden flex flex-col md:flex-row relative">
          
          {/* MAP SIDE (Visual representation) */}
          <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-coffee-900 group">
            {/* Styled Map Image (In a real app, could be a styled Google Map) */}
            <img 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=80" 
              alt="Map location" 
              className="w-full h-full object-cover opacity-50 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-80 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-coffee-950/40 group-hover:bg-transparent transition-colors duration-700"></div>
            
            {/* Map Pin Marker - Davao City, Philippines */}
            <div className="absolute top-[57%] left-[81%] -translate-x-1/2 -translate-y-1/2">
              <div className="relative flex items-center justify-center">
                <div className="absolute w-12 h-12 bg-amber-500/20 rounded-full animate-ping"></div>
                <div className="absolute w-8 h-8 bg-amber-500/40 rounded-full"></div>
                <div className="w-4 h-4 bg-amber-400 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.8)] relative z-10"></div>
                
                {/* Floating Location Badge */}
                <div className="absolute bottom-full mb-2 bg-coffee-950/95 text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-500/30 whitespace-nowrap shadow-lg backdrop-blur-md">
                  📍 Davao City, Philippines
                </div>
              </div>
            </div>
          </div>

          {/* INFO SIDE */}
          <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100 mb-8">
              Find Our <span className="text-gold-gradient">Sanctuary</span>
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-stone-200">Davao City Flagship</p>
                  <p className="text-amber-100/60 font-light mt-1">123 Roaster Street, Downtown District<br/>Davao City, Philippines 8000</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-amber-400 shrink-0" />
                <a href="tel:+639121955278" className="text-amber-100/60 font-light hover:text-amber-300 transition-colors">
                  0912-195-5278
                </a>
              </div>

              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-amber-400 shrink-0" />
                <a href="mailto:hello@auraroast.com" className="text-amber-100/60 font-light hover:text-amber-300 transition-colors">
                  hello@auraroast.com
                </a>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-amber-500/15 flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-coffee-900 border border-amber-500/20 flex items-center justify-center text-amber-400 hover:bg-amber-500 hover:text-coffee-950 transition-colors">
                <Camera className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-coffee-900 border border-amber-500/20 flex items-center justify-center text-amber-400 hover:bg-amber-500 hover:text-coffee-950 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
