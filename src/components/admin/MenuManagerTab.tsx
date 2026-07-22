import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Star, X, Check } from 'lucide-react';
import { INITIAL_MENU_ITEMS } from '../../data/mockData';
import { MenuItem, Category } from '../../types';

export const MenuManagerTab: React.FC = () => {
  const [items, setItems] = useState<MenuItem[]>(INITIAL_MENU_ITEMS);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('All');

  // Add / Edit Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: '',
    category: 'Hot Coffee',
    price: 6.50,
    rating: 4.8,
    reviewsCount: 12,
    description: '',
    ingredients: ['Espresso', 'Whole Milk'],
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80',
  });

  const filtered = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCat === 'All' || item.category === selectedCat;
    return matchesSearch && matchesCategory;
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      category: 'Hot Coffee',
      price: 6.50,
      rating: 4.8,
      reviewsCount: 12,
      description: '',
      ingredients: ['Espresso', 'Whole Milk'],
      isFeatured: false,
      image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this menu item?')) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    if (editingItem) {
      setItems((prev) =>
        prev.map((i) => (i.id === editingItem.id ? ({ ...i, ...formData } as MenuItem) : i))
      );
    } else {
      const newItem: MenuItem = {
        id: `item-${Date.now()}`,
        name: formData.name || 'Custom Coffee',
        category: (formData.category || 'Hot Coffee') as Category,
        price: Number(formData.price) || 5.0,
        rating: 4.9,
        reviewsCount: 1,
        description: formData.description || 'Artisanal roastery offering.',
        ingredients: formData.ingredients || ['Espresso'],
        isFeatured: formData.isFeatured || false,
        image: formData.image || 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80',
      };
      setItems((prev) => [newItem, ...prev]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* HEADER ACTIONS */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl font-bold text-amber-100">Menu Catalog Management</h3>
          <p className="text-xs text-amber-200/50">Add, edit, or remove coffee offerings & pricing</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-coffee-950 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Menu Item</span>
        </button>
      </div>

      {/* SEARCH AND CATEGORY FILTER */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search items by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-coffee-900/60 border border-amber-500/20 text-xs text-amber-100 placeholder-amber-200/40 focus:outline-none focus:border-amber-400"
          />
        </div>

        <select
          value={selectedCat}
          onChange={(e) => setSelectedCat(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-coffee-900/60 border border-amber-500/20 text-xs text-amber-200 focus:outline-none focus:border-amber-400 cursor-pointer w-full sm:w-auto"
        >
          <option value="All">All Categories</option>
          <option value="Hot Coffee">Hot Coffee</option>
          <option value="Iced Coffee">Iced Coffee</option>
          <option value="Espresso">Espresso</option>
          <option value="Non-Coffee">Non-Coffee</option>
          <option value="Pastries">Pastries</option>
          <option value="Desserts">Desserts</option>
        </select>
      </div>

      {/* ITEMS TABLE */}
      <div className="rounded-2xl bg-coffee-900/40 border border-amber-500/20 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-coffee-950 text-amber-300 font-mono uppercase tracking-wider border-b border-coffee-800">
              <tr>
                <th className="py-4 px-6">Item</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Price</th>
                <th className="py-4 px-4">Rating</th>
                <th className="py-4 px-4">Featured</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-coffee-800/60 text-amber-100/90">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-coffee-800/40 transition-colors">
                  <td className="py-3 px-6 flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-cover border border-amber-500/20"
                    />
                    <div>
                      <p className="font-semibold text-stone-100">{item.name}</p>
                      <p className="text-[10px] text-amber-200/50 line-clamp-1">{item.description}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-amber-200">{item.category}</td>
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">${item.price.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{item.rating}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {item.isFeatured ? (
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                        Yes
                      </span>
                    ) : (
                      <span className="text-[10px] text-amber-200/40">No</span>
                    )}
                  </td>
                  <td className="py-3 px-6 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="p-1.5 rounded-lg bg-coffee-800 hover:bg-coffee-700 text-amber-300 transition-colors"
                      title="Edit Item"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 rounded-lg bg-coffee-800 hover:bg-rose-900/60 text-rose-300 transition-colors"
                      title="Delete Item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD / EDIT ITEM MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
          <div className="relative w-full max-w-lg bg-coffee-950 border border-amber-500/30 rounded-3xl p-6 shadow-2xl z-10 space-y-4">
            <div className="flex items-center justify-between border-b border-coffee-800 pb-3">
              <h4 className="font-serif text-xl font-bold text-amber-100">
                {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
              </h4>
              <button onClick={() => setIsModalOpen(false)} className="text-amber-200/50 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-amber-300 block mb-1">Item Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-coffee-900 border border-amber-500/20 text-amber-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-amber-300 block mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                    className="w-full px-3 py-2 rounded-xl bg-coffee-900 border border-amber-500/20 text-amber-100 focus:outline-none"
                  >
                    <option value="Hot Coffee">Hot Coffee</option>
                    <option value="Iced Coffee">Iced Coffee</option>
                    <option value="Espresso">Espresso</option>
                    <option value="Non-Coffee">Non-Coffee</option>
                    <option value="Pastries">Pastries</option>
                    <option value="Desserts">Desserts</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-amber-300 block mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.10"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-coffee-900 border border-amber-500/20 text-amber-100 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-amber-300 block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-coffee-900 border border-amber-500/20 text-amber-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-amber-300 block mb-1">Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-coffee-900 border border-amber-500/20 text-amber-100 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredCheck"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="rounded border-amber-500/30 text-amber-500 bg-coffee-900"
                />
                <label htmlFor="featuredCheck" className="text-amber-200 cursor-pointer">
                  Feature on Landing Page Hero Carousel
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-coffee-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Save Menu Item</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
