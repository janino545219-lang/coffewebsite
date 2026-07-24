import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { MOCK_REVIEWS } from '../../data/mockData';
import { gsap } from 'gsap';

export const ReviewsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const quoteIconRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Initial entrance animation
    const ctx = gsap.context(() => {
      gsap.from('.review-header', {
        y: 30, opacity: 0, duration: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      });
      gsap.from(carouselRef.current, {
        scale: 0.95, opacity: 0, duration: 1, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Autoplay logic
  useEffect(() => {
    let interval: number;
    if (isAutoPlaying) {
      interval = window.setInterval(() => {
        handleNext();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const handleNext = () => {
    // Animate out
    gsap.to('.review-content', { 
      x: -30, opacity: 0, duration: 0.3, 
      onComplete: () => {
        setCurrentIndex((prev) => (prev + 1) % MOCK_REVIEWS.length);
        // Animate in
        gsap.fromTo('.review-content', 
          { x: 30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
        );
      }
    });
  };

  const handlePrev = () => {
    gsap.to('.review-content', { 
      x: 30, opacity: 0, duration: 0.3, 
      onComplete: () => {
        setCurrentIndex((prev) => (prev - 1 + MOCK_REVIEWS.length) % MOCK_REVIEWS.length);
        gsap.fromTo('.review-content', 
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
        );
      }
    });
  };

  const currentReview = MOCK_REVIEWS[currentIndex];

  return (
    <section ref={sectionRef} className="py-24 bg-coffee-950 relative overflow-hidden">
      {/* Decorative noise/texture would be handled by global CSS noise-overlay */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-amber-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-yellow-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="review-header text-center mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-stone-100">
            Words from our <span className="text-gold-gradient">Guests</span>
          </h2>
        </div>

        <div 
          ref={carouselRef}
          className="max-w-4xl mx-auto glass-panel-elevated rounded-[2.5rem] p-8 md:p-16 relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <Quote 
            ref={quoteIconRef} 
            className="absolute top-8 left-8 md:top-12 md:left-12 w-16 h-16 text-amber-500/10 rotate-180 animate-float pointer-events-none" 
          />

          <div className="review-content flex flex-col items-center text-center">
            {/* Stars */}
            <div className="flex gap-1 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-5 h-5 ${i < Math.floor(currentReview.rating) ? 'fill-amber-400 text-amber-400' : 'text-amber-500/30'}`} 
                />
              ))}
            </div>

            {/* Quote Text */}
            <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-amber-50 leading-relaxed font-light mb-10">
              "{currentReview.comment}"
            </p>

            {/* User Info */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 rounded-full border border-amber-500/50 animate-ping opacity-50" style={{ animationDuration: '3s' }}></div>
                <img 
                  src={currentReview.avatar} 
                  alt={currentReview.author} 
                  className="w-14 h-14 rounded-full object-cover border-2 border-amber-500/30 relative z-10"
                />
              </div>
              <div className="text-left">
                <p className="font-bold text-stone-200">{currentReview.author}</p>
                <p className="text-xs text-amber-100/50 uppercase tracking-widest">{currentReview.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-6">
            <button 
              onClick={handlePrev}
              className="w-12 h-12 rounded-full bg-coffee-900 border border-amber-500/30 flex items-center justify-center text-amber-400 hover:bg-amber-500 hover:text-coffee-950 transition-colors shadow-lg hover:shadow-amber-500/20"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-6">
            <button 
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-coffee-900 border border-amber-500/30 flex items-center justify-center text-amber-400 hover:bg-amber-500 hover:text-coffee-950 transition-colors shadow-lg hover:shadow-amber-500/20"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          
          {/* Pagination dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {MOCK_REVIEWS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (idx !== currentIndex) {
                    gsap.to('.review-content', { 
                      opacity: 0, duration: 0.2, 
                      onComplete: () => {
                        setCurrentIndex(idx);
                        gsap.to('.review-content', { opacity: 1, duration: 0.4 });
                      }
                    });
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-amber-400 w-6' : 'bg-amber-500/30 hover:bg-amber-500/60'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
