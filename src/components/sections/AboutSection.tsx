import React, { useEffect, useRef } from 'react';
import { Target, Leaf, Cpu } from 'lucide-react';
import { gsap } from 'gsap';

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image Parallax
      gsap.to(imageRef.current, {
        y: '20%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Text content reveal
      gsap.fromTo(textContentRef.current?.children || [], 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textContentRef.current,
            start: 'top 80%',
          }
        }
      );

      // Cards reveal
      gsap.fromTo(cardsRef.current?.children || [],
        { y: 80, opacity: 0, rotationX: -15 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const values = [
    {
      icon: <Target className="w-6 h-6 text-amber-400" />,
      title: 'Precision Roasting',
      desc: 'Our German cast-iron roaster is monitored by custom software to guarantee the exact temperature curve for every batch.',
    },
    {
      icon: <Leaf className="w-6 h-6 text-emerald-400" />,
      title: 'Direct Trade',
      desc: 'We purchase our beans directly from farmers at 3x the fair-trade premium to ensure sustainable livelihoods.',
    },
    {
      icon: <Cpu className="w-6 h-6 text-blue-400" />,
      title: 'Modern Extraction',
      desc: 'Our espresso machines use pressure profiling and gravimetric dosing for absolute consistency in every cup.',
    },
  ];

  return (
    <section ref={sectionRef} id="about" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* IMAGE WITH PARALLAX */}
          <div className="relative h-[500px] sm:h-[600px] rounded-[2rem] overflow-hidden group">
            <div className="absolute inset-0 bg-coffee-950/20 z-10 pointer-events-none group-hover:bg-transparent transition-colors duration-700" />
            <img
              ref={imageRef}
              src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=1200&q=80"
              alt="Pour over coffee process"
              className="absolute -top-[10%] -bottom-[10%] left-0 w-full h-[120%] object-cover object-center"
            />
            {/* Glass decoration */}
            <div className="absolute bottom-8 right-8 z-20 glass-panel-elevated p-6 rounded-2xl max-w-xs transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <p className="font-serif text-lg font-bold text-amber-200">The Perfect Pour</p>
              <p className="text-xs text-amber-100/70 mt-1">205°F water, 3-minute extraction, zero compromise.</p>
            </div>
          </div>

          {/* TEXT CONTENT */}
          <div ref={textContentRef} className="space-y-8">
            <div className="inline-flex items-center gap-3">
              <div className="w-12 h-[1px] bg-amber-500/50"></div>
              <span className="text-amber-400 text-xs font-bold tracking-[0.2em] uppercase">Our Philosophy</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-stone-100 leading-tight">
              Where Ancient Craft Meets <br />
              <span className="text-gold-gradient">Modern Science</span>
            </h2>

            <p className="text-amber-100/70 leading-relaxed text-base sm:text-lg font-light">
              We believe that roasting coffee is an art, but extracting it is a science. At Aura Roast, we merge decades of sensory intuition with cutting-edge telemetry to bring you a cup of coffee that pushes the boundaries of flavor.
            </p>

            <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              {values.map((v, i) => (
                <div key={i} className="glass-card p-6 rounded-2xl tilt-card hover:bg-coffee-900/60 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-coffee-950/80 border border-amber-500/20 flex items-center justify-center mb-4 shadow-inner">
                    {v.icon}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-stone-100 mb-2">{v.title}</h3>
                  <p className="text-xs text-amber-100/60 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
