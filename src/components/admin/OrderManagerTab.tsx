import React, { useState } from 'react';
import { INITIAL_ORDERS } from '../../data/mockData';
import { Order } from '../../types';
import { ShoppingBag, Clock, CheckCircle } from 'lucide-react';

export const OrderManagerTab: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const filteredOrders = orders.filter((ord) => {
    if (filterStatus === 'All') return true;
    return ord.status === filterStatus;
  });

  const handleUpdateStatus = (id: string, newStatus: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl font-bold text-amber-100">Live Order Kitchen Pipeline</h3>
          <p className="text-xs text-amber-200/50">Manage incoming web & counter order preparation states</p>
        </div>

        {/* STATUS FILTER CHIPS */}
        <div className="flex items-center gap-2 overflow-x-auto">
          {['All', 'Pending', 'Preparing', 'Ready', 'Completed', 'Cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                filterStatus === st
                  ? 'bg-amber-500 text-coffee-950 font-bold'
                  : 'bg-coffee-900/60 text-amber-200/60 hover:text-amber-100 border border-amber-500/15'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* ORDERS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOrders.map((ord) => (
          <div
            key={ord.id}
            className="p-5 rounded-2xl bg-coffee-900/40 border border-amber-500/20 backdrop-blur-md space-y-4 shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-coffee-800">
                <div>
                  <span className="font-mono text-sm font-bold text-amber-300">{ord.id}</span>
                  <span className="text-[10px] text-amber-200/50 block">{ord.date} • {ord.type}</span>
                </div>
                <span className="font-serif text-lg font-bold text-gold-gradient">${ord.totalAmount.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-stone-200">{ord.customerName}</span>
                <span className="text-amber-200/60">{ord.paymentMethod}</span>
              </div>

              {/* ITEMS LIST */}
              <div className="space-y-1.5 pt-1">
                {ord.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between text-xs text-amber-100/80">
                    <span>{it.quantity}x {it.name}</span>
                    <span className="font-mono text-amber-400/80">${(it.price * it.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* STATUS SWITCH ACTION */}
            <div className="pt-3 border-t border-coffee-800 space-y-1.5">
              <label className="text-[10px] text-amber-200/50 font-mono uppercase block">Update Order Status</label>
              <select
                value={ord.status}
                onChange={(e) => handleUpdateStatus(ord.id, e.target.value as Order['status'])}
                className={`w-full px-3 py-2 rounded-xl text-xs font-bold border focus:outline-none cursor-pointer ${
                  ord.status === 'Completed'
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-500/30'
                    : ord.status === 'Ready'
                    ? 'bg-blue-950 text-blue-300 border-blue-500/30'
                    : 'bg-amber-950 text-amber-300 border-amber-500/30'
                }`}
              >
                <option value="Pending" className="bg-coffee-950">Pending</option>
                <option value="Preparing" className="bg-coffee-950">Preparing</option>
                <option value="Ready" className="bg-coffee-950">Ready for Pickup</option>
                <option value="Completed" className="bg-coffee-950">Completed</option>
                <option value="Cancelled" className="bg-coffee-950">Cancelled</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
