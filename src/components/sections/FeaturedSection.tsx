import React, { useRef, useEffect } from 'react';
import { Star, ShoppingBag, Info, ArrowRight } from 'lucide-react';
import { FEATURED_PRODUCTS } from '../../data/mockData';
import { useCart } from '../../context/CartContext';
import { gsap } from 'gsap';
import { MenuItem } from '../../types';

export const FeaturedSection: React.FC = () => {
  const { addToCart } = useCart();
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Horizontal scroll animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(headerRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }}
      );

      // Carousel horizontal scroll
      if (carouselRef.current) {
        const totalWidth = carouselRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const scrollAmount = totalWidth - viewportWidth + (viewportWidth * 0.1); // Add padding compensation

        gsap.to(carouselRef.current, {
          x: -scrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: scrollContainerRef.current,
            start: "top top",
            end: () => `+=${scrollAmount}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, card: HTMLDivElement) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(card, {
      duration: 0.5,
      rotateX,
      rotateY,
      transformPerspective: 1000,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = (card: HTMLDivElement) => {
    gsap.to(card, {
      duration: 0.5,
      rotateX: 0,
      rotateY: 0,
      ease: "power2.out"
    });
  };

  return (
    <section ref={sectionRef} id="featured" className="py-24 bg-[#0a0502] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-yellow-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[100vw] overflow-hidden">
        
        <div ref={headerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-stone-100">
              Signature <span className="text-gold-gradient">Masterpieces</span>
            </h2>
            <p className="mt-4 text-lg text-amber-100/60 max-w-2xl font-light">
              Our award-winning creations, meticulously crafted with precision and passion. 
              Each cup tells a story of sourcing, roasting, and artistry.
            </p>
          </div>
          
          <button className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-amber-400 hover:text-amber-300 transition-colors group">
            <span>Explore Full Menu</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div ref={scrollContainerRef}>
          <div ref={carouselRef} className="flex gap-6 md:gap-10 pb-12 px-[10vw]">
            {FEATURED_PRODUCTS.map((product: MenuItem, idx: number) => (
              <div
                key={product.id}
                className="featured-card group relative w-[300px] sm:w-[400px] flex-shrink-0 rounded-[2rem] p-6 glass-panel-elevated hover:border-amber-500/40 transition-colors duration-500"
                onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
              >
                {/* Product Image */}
                <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden mb-6 bg-coffee-900/50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-coffee-950 via-transparent to-transparent opacity-80" />
                  
                  {/* Floating tags */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="glass-card px-3 py-1 rounded-full text-[10px] font-bold text-amber-300 tracking-wider uppercase backdrop-blur-md">
                      Signature
                    </span>
                  </div>
                  
                  {/* Price tag */}
                  <div className="absolute bottom-4 right-4 glass-card px-4 py-2 rounded-xl border border-amber-500/20 backdrop-blur-md shadow-lg transform group-hover:-translate-y-2 transition-transform duration-300">
                    <span className="font-serif text-xl font-bold text-amber-200">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-stone-100 mb-1">{product.name}</h3>
                      <div className="flex items-center gap-1.5 text-xs text-amber-200/60">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{product.rating}</span>
                        <span className="mx-1">•</span>
                        <span>{product.reviewsCount} Reviews</span>
                      </div>
                    </div>
                    <button className="p-2 rounded-full bg-coffee-900 text-amber-200/50 hover:text-amber-400 hover:bg-coffee-800 transition-colors">
                      <Info className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-sm text-amber-100/70 font-light line-clamp-2">
                    {product.description}
                  </p>

                  <button
                    onClick={() => addToCart(product)}
                    className="w-full py-3.5 rounded-xl bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-coffee-950 border border-amber-500/30 hover:border-transparent font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Order</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
