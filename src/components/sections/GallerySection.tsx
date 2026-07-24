import React, { useRef, useEffect } from 'react';
import { Maximize2 } from 'lucide-react';
import { gsap } from 'gsap';

export const GallerySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const images = [
    { src: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80', alt: 'Latte Art', size: 'large' },
    { src: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=800&q=80', alt: 'Pour Over', size: 'small' },
    { src: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80', alt: 'Coffee Beans', size: 'small' },
    { src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80', alt: 'Cafe Interior', size: 'medium' },
    { src: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80', alt: 'Espresso Machine', size: 'medium' },
    { src: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&w=800&q=80', alt: 'Barista', size: 'large' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gallery-header', {
        y: 40, opacity: 0, duration: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      });

      // Staggered reveal for gallery items
      gsap.fromTo(gridRef.current?.children || [],
        { scale: 0.9, opacity: 0, y: 30 },
        {
          scale: 1, opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 75%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-coffee-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="gallery-header text-center mb-12">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-stone-100 mb-4">
            The <span className="text-gold-gradient">Gallery</span>
          </h2>
          <p className="text-amber-100/60 font-light">A visual journey through our craft.</p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[250px]">
          {images.map((img, idx) => {
            // Masonry-like sizing based on defined 'size' property
            let spanClasses = 'col-span-1 row-span-1';
            if (img.size === 'large') spanClasses = 'col-span-1 md:col-span-2 row-span-2';
            if (img.size === 'medium') spanClasses = 'col-span-1 md:col-span-2 row-span-1';

            return (
              <div 
                key={idx} 
                className={`relative rounded-3xl overflow-hidden group cursor-pointer ${spanClasses}`}
              >
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay that slides up on hover */}
                <div className="absolute inset-0 bg-coffee-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
