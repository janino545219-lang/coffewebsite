import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingBag, Flame, MapPin } from 'lucide-react';
import { INITIAL_MENU_ITEMS } from '../../data/mockData';
import { useCart } from '../../context/CartContext';
import { MenuItem } from '../../types';

export const FeaturedSection: React.FC = () => {
  const { addToCart } = useCart();
  const featuredItems = INITIAL_MENU_ITEMS.filter((item) => item.isFeatured).slice(0, 4);

  return (
    <section id="featured" className="py-24 bg-coffee-950/90 relative overflow-hidden border-t border-amber-500/10">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-amber-600/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-mono">
              Curated Roaster Selections
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-100">
              Featured <span className="text-gold-gradient">Masterpieces</span>
            </h2>
          </div>
          <a
            href="#menu"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-300 hover:text-amber-100 transition-colors"
          >
            <span>View Full Menu ({INITIAL_MENU_ITEMS.length} Items)</span>
            <span>→</span>
          </a>
        </motion.div>

        {/* FEATURED CARDS GRID WITH SCROLL & 3D HOVER */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredItems.map((item: MenuItem, idx: number) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 45, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative rounded-2xl bg-coffee-900/40 border border-amber-500/15 hover:border-amber-400/40 backdrop-blur-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between"
            >
              {/* IMAGE & BADGES */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-coffee-950 via-coffee-950/20 to-transparent" />
                
                {/* CATEGORY BADGE */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-coffee-950/80 backdrop-blur-md border border-amber-500/20 text-[10px] uppercase font-semibold text-amber-300">
                  {item.category}
                </div>

                {/* RATING BADGE */}
                <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-coffee-950/80 backdrop-blur-md border border-amber-500/20 flex items-center gap-1 text-[11px] font-mono text-amber-300">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span>{item.rating}</span>
                </div>

                {/* ORIGIN TAG IF PRESENT */}
                {item.origin && (
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[11px] text-amber-200/80 bg-coffee-950/60 backdrop-blur-sm px-2 py-0.5 rounded">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span className="truncate max-w-[150px]">{item.origin}</span>
                  </div>
                )}
              </div>

              {/* DETAILS */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-serif text-xl font-bold text-amber-100 group-hover:text-amber-300 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-amber-100/60 line-clamp-2 font-light leading-relaxed">
                    {item.description}
                  </p>

                  {/* ROAST LEVEL & DIETARY TAGS */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {item.roastLevel && (
                      <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                        <Flame className="w-2.5 h-2.5 text-amber-400" />
                        <span>{item.roastLevel} Roast</span>
                      </span>
                    )}
                    {item.dietaryTags?.map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* FOOTER ACTION */}
                <div className="flex items-center justify-between pt-3 border-t border-coffee-800/60">
                  <div>
                    <span className="text-[10px] text-amber-200/50 block">Price</span>
                    <span className="font-serif text-xl font-bold text-gold-gradient">${item.price.toFixed(2)}</span>
                  </div>

                  <button
                    onClick={() => addToCart(item)}
                    className="p-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-coffee-950 font-bold transition-all shadow-lg shadow-amber-500/20 active:scale-95 flex items-center justify-center gap-1.5"
                    aria-label={`Add ${item.name} to order`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span className="text-xs tracking-wider uppercase font-semibold">Order</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
