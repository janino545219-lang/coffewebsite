import React from 'react';
import { DollarSign, ShoppingBag, Calendar, AlertTriangle, TrendingUp, ArrowUpRight } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { REVENUE_ANALYTICS_DATA, INITIAL_ORDERS, INITIAL_RESERVATIONS } from '../../data/mockData';

export const OverviewTab: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* TOP STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-coffee-900/40 border border-amber-500/20 backdrop-blur-md space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-amber-200/60 font-mono uppercase">Daily Revenue</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="font-serif text-3xl font-bold text-stone-100">$3,450.80</h3>
            <span className="text-xs font-semibold text-emerald-400 flex items-center">
              +14.2% <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <p className="text-[11px] text-amber-200/50">Compared to yesterday ($3,020)</p>
        </div>

        <div className="p-6 rounded-2xl bg-coffee-900/40 border border-amber-500/20 backdrop-blur-md space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-amber-200/60 font-mono uppercase">Total Orders</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="font-serif text-3xl font-bold text-stone-100">148</h3>
            <span className="text-xs font-semibold text-emerald-400 flex items-center">
              +8.5% <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <p className="text-[11px] text-amber-200/50">Avg order value: $23.30</p>
        </div>

        <div className="p-6 rounded-2xl bg-coffee-900/40 border border-amber-500/20 backdrop-blur-md space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-amber-200/60 font-mono uppercase">Booked Tables</span>
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="font-serif text-3xl font-bold text-stone-100">18</h3>
            <span className="text-xs font-semibold text-indigo-400">92% Capacity</span>
          </div>
          <p className="text-[11px] text-amber-200/50">Next table: 10:30 AM (4 guests)</p>
        </div>

        <div className="p-6 rounded-2xl bg-coffee-900/40 border border-amber-500/20 backdrop-blur-md space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-amber-200/60 font-mono uppercase">Stock Alerts</span>
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="font-serif text-3xl font-bold text-stone-100">3 Items</h3>
            <span className="text-xs font-semibold text-rose-400">Action Required</span>
          </div>
          <p className="text-[11px] text-amber-200/50">Colombia Supremo & Valrhona Chocolate</p>
        </div>
      </div>

      {/* REVENUE GRAPH */}
      <div className="p-6 sm:p-8 rounded-3xl bg-coffee-900/40 border border-amber-500/20 backdrop-blur-xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl font-bold text-amber-100">Weekly Revenue Trends</h3>
            <p className="text-xs text-amber-200/50">Real-time sales performance across 7 days</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-mono">
            <TrendingUp className="w-4 h-4" />
            <span>Peak Day: Saturday ($5,400)</span>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={REVENUE_ANALYTICS_DATA}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d4a373" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#d4a373" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="#a8896c" fontSize={12} />
              <YAxis stroke="#a8896c" fontSize={12} tickFormatter={(v) => `$${v}`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1c0d08',
                  borderColor: 'rgba(212, 163, 115, 0.3)',
                  borderRadius: '12px',
                  color: '#f7f1e5',
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#e6b800"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* RECENT ORDERS & RESERVATIONS SUMMARY GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* RECENT ORDERS */}
        <div className="p-6 rounded-3xl bg-coffee-900/40 border border-amber-500/20 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-coffee-800">
            <h4 className="font-serif text-lg font-bold text-amber-100">Live Order Queue</h4>
            <span className="text-xs text-amber-400 font-mono">{INITIAL_ORDERS.length} Active</span>
          </div>

          <div className="space-y-3">
            {INITIAL_ORDERS.map((ord) => (
              <div
                key={ord.id}
                className="p-3.5 rounded-xl bg-coffee-950/60 border border-amber-500/10 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-mono font-bold text-amber-300">{ord.id}</span>
                  <p className="text-stone-200 font-medium">{ord.customerName}</p>
                  <p className="text-[10px] text-amber-200/50">{ord.items.map(i => i.name).join(', ')}</p>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-amber-400">${ord.totalAmount.toFixed(2)}</span>
                  <span
                    className={`block text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1 ${
                      ord.status === 'Ready'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : ord.status === 'Preparing'
                        ? 'bg-amber-500/20 text-amber-300 animate-pulse'
                        : 'bg-blue-500/20 text-blue-300'
                    }`}
                  >
                    {ord.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* UPCOMING RESERVATIONS */}
        <div className="p-6 rounded-3xl bg-coffee-900/40 border border-amber-500/20 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-coffee-800">
            <h4 className="font-serif text-lg font-bold text-amber-100">Upcoming Reservations</h4>
            <span className="text-xs text-amber-400 font-mono">{INITIAL_RESERVATIONS.length} Bookings</span>
          </div>

          <div className="space-y-3">
            {INITIAL_RESERVATIONS.map((res) => (
              <div
                key={res.id}
                className="p-3.5 rounded-xl bg-coffee-950/60 border border-amber-500/10 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-mono font-bold text-amber-300">{res.id}</span>
                  <p className="text-stone-200 font-medium">{res.customerName}</p>
                  <p className="text-[10px] text-amber-200/50">{res.seating} • {res.guests} Guests</p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-amber-200">{res.time}</span>
                  <span
                    className={`block text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1 ${
                      res.status === 'Confirmed'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-amber-500/20 text-amber-300'
                    }`}
                  >
                    {res.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
