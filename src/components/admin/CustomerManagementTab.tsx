import React from 'react';
import { Search, Star, Award, MoreVertical, Mail, MapPin } from 'lucide-react';

export const CustomerManagementTab: React.FC = () => {
  const customers = [
    { id: 'CUST-8821', name: 'Eleanor Vance', email: 'eleanor.v@example.com', totalOrders: 42, totalSpent: 1250.40, points: 2100, tier: 'Platinum', lastVisit: 'Today' },
    { id: 'CUST-9012', name: 'Thomas Wright', email: 'twright88@example.com', totalOrders: 18, totalSpent: 430.20, points: 840, tier: 'Gold', lastVisit: 'Yesterday' },
    { id: 'CUST-9144', name: 'Sophia Chen', email: 'soph.chen@example.com', totalOrders: 8, totalSpent: 185.00, points: 350, tier: 'Silver', lastVisit: '3 days ago' },
    { id: 'CUST-9201', name: 'Marcus Johnson', email: 'mjohnson@example.com', totalOrders: 2, totalSpent: 45.50, points: 90, tier: 'Member', lastVisit: '1 week ago' },
    { id: 'CUST-9311', name: 'Isabella Davis', email: 'idavis_tech@example.com', totalOrders: 64, totalSpent: 2100.80, points: 4200, tier: 'Platinum', lastVisit: 'Today' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-stone-100">Customer Database</h2>
          <p className="text-sm text-amber-200/50 mt-1">Manage loyalty programs, view order histories, and analyze customer behavior</p>
        </div>
        
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-200/50" />
          <input 
            type="text" 
            placeholder="Search customers..." 
            className="w-full bg-coffee-900/50 border border-amber-500/20 rounded-xl px-10 py-2 text-sm text-stone-200 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="glass-panel-elevated p-6 rounded-3xl flex items-center justify-between">
          <div>
            <p className="text-[10px] text-amber-200/50 uppercase tracking-widest font-mono mb-1">Total Members</p>
            <h3 className="text-2xl font-bold text-stone-100">12,482</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
            <Star className="w-6 h-6" />
          </div>
        </div>
        <div className="glass-panel-elevated p-6 rounded-3xl flex items-center justify-between">
          <div>
            <p className="text-[10px] text-amber-200/50 uppercase tracking-widest font-mono mb-1">Platinum Members</p>
            <h3 className="text-2xl font-bold text-stone-100">428</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-fuchsia-500/10 flex items-center justify-center text-fuchsia-400 border border-fuchsia-500/20">
            <Award className="w-6 h-6" />
          </div>
        </div>
        <div className="glass-panel-elevated p-6 rounded-3xl flex items-center justify-between">
          <div>
            <p className="text-[10px] text-amber-200/50 uppercase tracking-widest font-mono mb-1">Avg Lifetime Value</p>
            <h3 className="text-2xl font-bold text-stone-100">$485.20</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
            <Star className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="glass-panel-elevated rounded-[2rem] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-coffee-800 bg-coffee-900/40">
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-amber-200/60">Customer</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-amber-200/60">Tier & Points</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-amber-200/60">Total Orders</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-amber-200/60">Lifetime Spend</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-amber-200/60">Last Visit</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-amber-200/60 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-coffee-800/50">
              {customers.map((cust) => (
                <tr key={cust.id} className="hover:bg-coffee-900/20 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-coffee-900 border border-amber-500/20 flex items-center justify-center font-bold text-amber-400">
                        {cust.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-stone-200 group-hover:text-amber-300 transition-colors">{cust.name}</p>
                        <div className="flex items-center gap-1 text-[10px] text-amber-200/50">
                          <Mail className="w-3 h-3" /> {cust.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      <span className={`inline-flex items-center w-max px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                        cust.tier === 'Platinum' ? 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20' :
                        cust.tier === 'Gold' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                        cust.tier === 'Silver' ? 'bg-slate-300/10 text-slate-300 border-slate-300/20' :
                        'bg-coffee-800 text-amber-100/60 border-coffee-700'
                      }`}>
                        {cust.tier}
                      </span>
                      <span className="text-xs text-amber-100/70 font-mono">{cust.points} pts</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm font-bold text-stone-200">
                    {cust.totalOrders}
                  </td>
                  <td className="p-4 text-sm font-bold text-stone-200 font-mono">
                    ${cust.totalSpent.toFixed(2)}
                  </td>
                  <td className="p-4 text-xs text-amber-100/70">
                    {cust.lastVisit}
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-2 text-amber-200/50 hover:text-amber-400 transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
