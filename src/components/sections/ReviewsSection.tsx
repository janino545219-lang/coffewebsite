import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Heart } from 'lucide-react';
import { MOCK_REVIEWS } from '../../data/mockData';

export const ReviewsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % MOCK_REVIEWS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + MOCK_REVIEWS.length) % MOCK_REVIEWS.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const current = MOCK_REVIEWS[currentIndex];

  return (
    <section id="reviews" className="py-24 bg-coffee-950 relative overflow-hidden border-t border-amber-500/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-mono">
            Guest Experiences
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100">
            Words From Our <span className="text-gold-gradient">Patrons</span>
          </h2>
        </div>

        {/* CAROUSEL CONTAINER */}
        <div className="relative p-8 sm:p-12 rounded-3xl bg-coffee-900/40 border border-amber-500/20 backdrop-blur-xl shadow-2xl space-y-8">
          <Quote className="w-16 h-16 text-amber-500/10 absolute top-6 right-8 pointer-events-none" />

          {/* RATING STARS */}
          <div className="flex items-center gap-1.5 text-amber-400">
            {Array.from({ length: current.rating }).map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
          </div>

          {/* COMMENT */}
          <p className="font-serif text-xl sm:text-2xl text-amber-100 leading-relaxed italic">
            "{current.comment}"
          </p>

          {/* AUTHOR INFO */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-coffee-800/60">
            <div className="flex items-center gap-4">
              <img
                src={current.avatar}
                alt={current.author}
                className="w-14 h-14 rounded-full object-cover border-2 border-amber-500/30"
              />
              <div>
                <h4 className="font-serif text-lg font-bold text-stone-100">{current.author}</h4>
                <p className="text-xs text-amber-200/60 font-mono">{current.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto px-3 py-1.5 rounded-full bg-coffee-950/80 border border-amber-500/20 text-xs text-amber-300">
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              <span>Fav: {current.favoriteItem}</span>
            </div>
          </div>

          {/* NAVIGATION CONTROLS */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex gap-2">
              {MOCK_REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === i ? 'w-8 bg-amber-400' : 'w-2 bg-coffee-800'
                  }`}
                  aria-label={`Go to testimonial slide ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-full bg-coffee-950 border border-amber-500/20 text-amber-200 hover:text-white hover:border-amber-400 transition-all"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-full bg-coffee-950 border border-amber-500/20 text-amber-200 hover:text-white hover:border-amber-400 transition-all"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
