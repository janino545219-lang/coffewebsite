import React, { useState } from 'react';
import { INITIAL_INVENTORY } from '../../data/mockData';
import { InventoryItem } from '../../types';
import { Package, AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';

export const InventoryTab: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [reorderingId, setReorderingId] = useState<string | null>(null);

  const handleReorder = (id: string) => {
    setReorderingId(id);
    setTimeout(() => {
      setReorderingId(null);
      setInventory((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                stockLevel: item.stockLevel + 50,
                status: 'In Stock',
              }
            : item
        )
      );
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h3 className="font-serif text-2xl font-bold text-amber-100">Roastery Inventory & Supply Chain</h3>
        <p className="text-xs text-amber-200/50">Track green bean stock, dairy supplies, syrups & compostable packaging</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {inventory.map((item) => {
          const isLow = item.stockLevel <= item.minThreshold;
          const percentage = Math.min(100, Math.round((item.stockLevel / (item.minThreshold * 2.5)) * 100));

          return (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-coffee-900/40 border border-amber-500/20 backdrop-blur-md space-y-4 shadow-xl"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-[10px] text-amber-300 uppercase">{item.category}</span>
                  <h4 className="font-serif text-lg font-bold text-stone-100">{item.name}</h4>
                  <p className="text-xs text-amber-200/50">Supplier: {item.supplier}</p>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase flex items-center gap-1 ${
                    isLow
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  }`}
                >
                  {isLow ? <AlertCircle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                  <span>{item.status}</span>
                </span>
              </div>

              {/* STOCK LEVEL BAR */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-amber-200/70">Current Level</span>
                  <span className="text-amber-300 font-bold">
                    {item.stockLevel} {item.unit} (Min: {item.minThreshold})
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-coffee-950 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isLow ? 'bg-rose-500' : 'bg-gradient-to-r from-amber-500 to-emerald-400'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>

              {/* REORDER BUTTON */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => handleReorder(item.id)}
                  disabled={reorderingId === item.id}
                  className="px-4 py-2 rounded-xl bg-coffee-800 hover:bg-coffee-700 text-amber-200 border border-amber-500/30 text-xs font-semibold flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${reorderingId === item.id ? 'animate-spin' : ''}`} />
                  <span>{reorderingId === item.id ? 'Ordering Stock...' : 'Trigger Express Reorder (+50)'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
