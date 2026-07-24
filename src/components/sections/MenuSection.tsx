import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, ShoppingBag, X } from 'lucide-react';
import { ALL_PRODUCTS } from '../../data/mockData';
import { MenuItem } from '../../types';
import { useCart } from '../../context/CartContext';
import { gsap } from 'gsap';

export const MenuSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);
  const { addToCart } = useCart();
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'Espresso', 'Pour Over', 'Cold Brew', 'Tea', 'Pastries', 'Beans'];

  const filteredProducts = ALL_PRODUCTS.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.menu-header', {
        y: 40, opacity: 0, duration: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Grid layout animation on filter change
  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(gridRef.current.children, 
        { scale: 0.9, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'back.out(1.2)' }
      );
    }
  }, [activeCategory, searchQuery]);

  return (
    <section ref={sectionRef} id="menu" className="py-24 bg-coffee-950 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="menu-header text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-stone-100 mb-6">
            The <span className="text-gold-gradient">Collection</span>
          </h2>
          
          {/* SEARCH & FILTER BAR */}
          <div className="glass-panel p-2 rounded-2xl flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-200/50" />
              <input 
                type="text" 
                placeholder="Search beverages, pastries, beans..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none focus:ring-0 text-sm text-stone-100 placeholder:text-amber-200/30 pl-10 py-3"
              />
            </div>
            <div className="hidden sm:block w-px h-8 bg-amber-500/20 self-center"></div>
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none px-2 py-1">
              <Filter className="w-4 h-4 text-amber-400 shrink-0" />
              {categories.slice(0, 3).map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 px-4 py-1.5 rounded-xl text-xs font-bold tracking-wider transition-all ${
                    activeCategory === cat 
                      ? 'bg-amber-500 text-coffee-950 shadow-lg shadow-amber-500/20' 
                      : 'text-amber-200/60 hover:text-amber-200 hover:bg-coffee-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* MENU GRID */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product: MenuItem) => (
            <div 
              key={product.id}
              className="menu-item-card glass-panel-elevated rounded-[2rem] p-4 flex flex-col group cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative h-48 rounded-xl overflow-hidden mb-4 bg-coffee-900">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-2 right-2 glass-card px-2.5 py-1 rounded-lg backdrop-blur-md">
                  <span className="font-serif font-bold text-amber-200">${product.price.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex-1 flex flex-col">
                <h3 className="font-serif text-lg font-bold text-stone-100 mb-1">{product.name}</h3>
                <p className="text-[11px] text-amber-200/50 uppercase tracking-widest font-mono mb-2">{product.category}</p>
                <p className="text-sm text-amber-100/70 font-light line-clamp-2 mb-4 flex-1">
                  {product.description}
                </p>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  className="w-full py-2.5 rounded-xl bg-coffee-900 hover:bg-amber-500 text-amber-400 hover:text-coffee-950 border border-amber-500/20 hover:border-transparent font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Quick Add</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-amber-200/50 font-serif text-xl italic">No creations found matching your desire.</p>
            <button 
              onClick={() => {setSearchQuery(''); setActiveCategory('All');}}
              className="mt-4 text-amber-400 text-sm font-bold tracking-widest uppercase hover:text-amber-300"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* PRODUCT DETAIL MODAL (Simple implementation) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-coffee-950/80 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}></div>
          <div className="relative w-full max-w-2xl bg-coffee-950 border border-amber-500/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-scaleUp">
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="w-full md:w-1/2 h-64 md:h-auto relative">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
              <span className="text-[10px] text-amber-400 uppercase tracking-widest font-mono mb-2">{selectedProduct.category}</span>
              <h3 className="font-serif text-3xl font-bold text-stone-100 mb-2">{selectedProduct.name}</h3>
              <p className="font-serif text-xl text-amber-200 mb-6">${selectedProduct.price.toFixed(2)}</p>
              
              <p className="text-sm text-amber-100/70 font-light mb-6 flex-1">
                {selectedProduct.description}
              </p>
              
              {/* Customization Options (Mock) */}
              <div className="space-y-4 mb-8">
                <div>
                  <p className="text-xs font-bold text-stone-200 mb-2 uppercase tracking-wider">Size</p>
                  <div className="flex gap-2">
                    {['Standard', 'Large (+$1.00)'].map((size, i) => (
                      <button key={size} className={`px-4 py-2 rounded-xl border text-xs font-semibold ${i === 0 ? 'border-amber-500 bg-amber-500/10 text-amber-300' : 'border-amber-500/20 text-amber-200/60'}`}>
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-coffee-950 font-bold text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Order</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
