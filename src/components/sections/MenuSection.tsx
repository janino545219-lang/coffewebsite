import React, { useState, useMemo } from 'react';
import { Search, Filter, Star, Plus, MapPin, Flame, Check, SlidersHorizontal, X } from 'lucide-react';
import { INITIAL_MENU_ITEMS } from '../../data/mockData';
import { Category, MenuItem } from '../../types';
import { useCart } from '../../context/CartContext';

export const MenuSection: React.FC = () => {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDietary, setSelectedDietary] = useState<string>('All');

  // Customizer modal state
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [selectedSize, setSelectedSize] = useState<'Standard' | 'Grand' | 'Reserve'>('Standard');
  const [selectedMilk, setSelectedMilk] = useState<'Whole' | 'Oat' | 'Almond' | 'Soy' | 'None'>('Oat');
  const [selectedSweetness, setSelectedSweetness] = useState<'100%' | '75%' | '50%' | '25%' | 'Unsweetened'>('100%');
  const [specialNotes, setSpecialNotes] = useState('');

  const categories: Category[] = [
    'All',
    'Hot Coffee',
    'Iced Coffee',
    'Espresso',
    'Non-Coffee',
    'Pastries',
    'Desserts',
  ];

  const filteredItems = useMemo(() => {
    return INITIAL_MENU_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesDietary =
        selectedDietary === 'All' ||
        item.dietaryTags?.includes(selectedDietary as any);

      return matchesCategory && matchesSearch && matchesDietary;
    });
  }, [activeCategory, searchQuery, selectedDietary]);

  const handleOpenCustomize = (item: MenuItem) => {
    setCustomizingItem(item);
    setSelectedSize('Standard');
    setSelectedMilk('Oat');
    setSelectedSweetness('100%');
    setSpecialNotes('');
  };

  const handleConfirmAddToCart = () => {
    if (!customizingItem) return;
    addToCart(customizingItem, {
      size: selectedSize,
      milk: selectedMilk,
      sweetness: selectedSweetness,
      notes: specialNotes,
      quantity: 1,
    });
    setCustomizingItem(null);
  };

  return (
    <section id="menu" className="py-24 bg-coffee-950 relative overflow-hidden border-t border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-mono">
            Artisanal Offerings
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-100">
            Explore Our <span className="text-gold-gradient">Café Menu</span>
          </h2>
          <p className="text-sm text-amber-100/70 font-light">
            Every beverage and pastry is crafted to order with single-origin beans, organic dairy options, and handcrafted natural syrups.
          </p>
        </div>

        {/* SEARCH & FILTER BAR */}
        <div className="mb-10 space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* SEARCH INPUT */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-amber-400 absolute left-4 top-3.5" />
              <input
                type="text"
                placeholder="Search coffee, ingredients, or tasting notes (e.g. Mocha, Yirgacheffe)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-coffee-900/60 border border-amber-500/20 text-amber-100 placeholder-amber-200/40 text-sm focus:outline-none focus:border-amber-400 backdrop-blur-md"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3.5 text-amber-200/50 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* DIETARY SELECTOR */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <SlidersHorizontal className="w-4 h-4 text-amber-400 shrink-0" />
              <select
                value={selectedDietary}
                onChange={(e) => setSelectedDietary(e.target.value)}
                className="px-4 py-3 rounded-xl bg-coffee-900/60 border border-amber-500/20 text-amber-200 text-xs focus:outline-none focus:border-amber-400 backdrop-blur-md cursor-pointer w-full md:w-auto"
              >
                <option value="All" className="bg-coffee-950 text-stone-100">All Dietary Options</option>
                <option value="Vegan" className="bg-coffee-950 text-stone-100">Vegan Only</option>
                <option value="Organic" className="bg-coffee-950 text-stone-100">Organic Only</option>
                <option value="Gluten-Free" className="bg-coffee-950 text-stone-100">Gluten-Free Only</option>
              </select>
            </div>
          </div>

          {/* CATEGORY CHIPS */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all duration-300 border ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-coffee-950 border-amber-400 shadow-lg shadow-amber-500/20 scale-105'
                    : 'bg-coffee-900/40 text-amber-200/70 border-amber-500/15 hover:border-amber-400/40 hover:text-amber-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* MENU ITEMS GRID */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center text-amber-200/50 space-y-3 bg-coffee-900/20 border border-amber-500/10 rounded-2xl">
            <Filter className="w-10 h-10 mx-auto stroke-[1]" />
            <p className="font-serif text-xl text-amber-100">No coffee creations match your search</p>
            <p className="text-xs">Try clearing filters or searching for different keywords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group p-5 rounded-2xl bg-coffee-900/40 border border-amber-500/15 hover:border-amber-400/40 backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="relative h-48 rounded-xl overflow-hidden mb-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-coffee-950/90 via-transparent to-transparent" />
                    
                    <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-coffee-950/80 backdrop-blur-md border border-amber-500/20 text-[10px] uppercase font-semibold text-amber-300">
                      {item.category}
                    </div>

                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-coffee-950/80 backdrop-blur-md border border-amber-500/20 flex items-center gap-1 text-[10px] font-mono text-amber-300">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span>{item.rating} ({item.reviewsCount})</span>
                    </div>

                    {item.calories && (
                      <div className="absolute bottom-2 right-2 text-[10px] font-mono text-amber-200/80 bg-coffee-950/80 px-2 py-0.5 rounded border border-amber-500/20">
                        {item.calories} kcal
                      </div>
                    )}
                  </div>

                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif text-lg font-bold text-amber-100 group-hover:text-amber-300 transition-colors">
                      {item.name}
                    </h3>
                    <span className="font-serif text-lg font-bold text-gold-gradient shrink-0">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  <p className="text-xs text-amber-100/60 font-light leading-relaxed line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {item.ingredients.map((ing) => (
                      <span
                        key={ing}
                        className="text-[10px] px-2 py-0.5 rounded bg-coffee-950 border border-amber-500/10 text-amber-200/70"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-coffee-800/60 flex items-center justify-between gap-3">
                  <button
                    onClick={() => handleOpenCustomize(item)}
                    className="flex-1 py-2 px-3 rounded-xl bg-coffee-800/60 hover:bg-coffee-800 text-amber-200 border border-amber-500/20 text-xs font-semibold transition-all text-center"
                  >
                    Customize
                  </button>
                  <button
                    onClick={() => addToCart(item)}
                    className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-coffee-950 font-bold transition-all shadow-md active:scale-95 flex items-center justify-center"
                    title="Quick Add to Order"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ITEM CUSTOMIZER MODAL */}
      {customizingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setCustomizingItem(null)}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
          />
          <div className="relative w-full max-w-md bg-coffee-950 border border-amber-500/30 rounded-2xl p-6 shadow-2xl z-10 space-y-5 animate-scaleUp">
            <div className="flex items-start justify-between border-b border-coffee-800 pb-3">
              <div>
                <h3 className="font-serif text-xl font-bold text-amber-100">{customizingItem.name}</h3>
                <p className="text-xs text-amber-200/60">Customize your order preferences</p>
              </div>
              <button
                onClick={() => setCustomizingItem(null)}
                className="text-amber-200/50 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* SIZE SELECTION */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-amber-300 uppercase tracking-wider block">
                Select Size
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Standard', 'Grand', 'Reserve'] as const).map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2 px-3 rounded-lg text-xs font-medium border transition-all ${
                      selectedSize === sz
                        ? 'bg-amber-500 text-coffee-950 border-amber-400 font-bold'
                        : 'bg-coffee-900/60 text-amber-200 border-amber-500/20 hover:border-amber-400'
                    }`}
                  >
                    {sz} {sz === 'Grand' ? '(+25%)' : sz === 'Reserve' ? '(+50%)' : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* MILK SELECTION (IF APPLICABLE) */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-amber-300 uppercase tracking-wider block">
                Milk Choice
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Whole', 'Oat', 'Almond', 'Soy', 'None'] as const).map((mk) => (
                  <button
                    key={mk}
                    onClick={() => setSelectedMilk(mk)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-medium border transition-all ${
                      selectedMilk === mk
                        ? 'bg-amber-500 text-coffee-950 border-amber-400 font-bold'
                        : 'bg-coffee-900/60 text-amber-200 border-amber-500/20 hover:border-amber-400'
                    }`}
                  >
                    {mk}
                  </button>
                ))}
              </div>
            </div>

            {/* SWEETNESS */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-amber-300 uppercase tracking-wider block">
                Sweetness Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['100%', '75%', '50%', '25%', 'Unsweetened'] as const).map((sw) => (
                  <button
                    key={sw}
                    onClick={() => setSelectedSweetness(sw)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-medium border transition-all ${
                      selectedSweetness === sw
                        ? 'bg-amber-500 text-coffee-950 border-amber-400 font-bold'
                        : 'bg-coffee-900/60 text-amber-200 border-amber-500/20 hover:border-amber-400'
                    }`}
                  >
                    {sw}
                  </button>
                ))}
              </div>
            </div>

            {/* SPECIAL INSTRUCTIONS */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-amber-300 uppercase tracking-wider block">
                Barista Notes
              </label>
              <input
                type="text"
                placeholder="Extra hot, double cup, light foam..."
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-coffee-900 border border-amber-500/20 text-xs text-amber-100 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* ADD TO CART ACTION */}
            <button
              onClick={handleConfirmAddToCart}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-coffee-950 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Add Customized Item to Bag</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
