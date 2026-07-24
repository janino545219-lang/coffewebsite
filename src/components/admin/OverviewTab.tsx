import React, { useEffect, useRef, useState } from 'react';
import { DollarSign, ShoppingBag, Calendar, AlertTriangle, TrendingUp, ArrowUpRight } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { REVENUE_ANALYTICS_DATA, INITIAL_ORDERS, INITIAL_RESERVATIONS } from '../../data/mockData';
import { gsap } from 'gsap';

export const OverviewTab: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // States for animated counters
  const [revenue, setRevenue] = useState(0);
  const [orders, setOrders] = useState(0);
  const targetRevenue = 3450.80;
  const targetOrders = 148;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered entrance for cards
      gsap.fromTo('.stat-card', 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
      );
      
      // Chart entrance
      gsap.fromTo('.chart-container',
        { scale: 0.98, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, delay: 0.3, ease: 'power2.out' }
      );

      // Animate Counters
      gsap.to({ val: 0 }, {
        val: targetRevenue,
        duration: 2,
        ease: 'power2.out',
        onUpdate: function() {
          setRevenue(this.targets()[0].val);
        }
      });
      
      gsap.to({ val: 0 }, {
        val: targetOrders,
        duration: 1.5,
        ease: 'power2.out',
        onUpdate: function() {
          setOrders(Math.round(this.targets()[0].val));
        }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="space-y-8">
      {/* TOP STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat-card glass-panel-elevated p-6 rounded-3xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-amber-200/60 font-mono uppercase tracking-wider">Daily Revenue</span>
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="font-serif text-3xl font-bold text-stone-100">${revenue.toFixed(2)}</h3>
            <span className="text-xs font-semibold text-emerald-400 flex items-center bg-emerald-500/10 px-2 py-0.5 rounded-full">
              +14.2% <ArrowUpRight className="w-3 h-3 ml-0.5" />
            </span>
          </div>
          <p className="text-[10px] text-amber-200/40 uppercase tracking-widest">Compared to yesterday</p>
        </div>

        <div className="stat-card glass-panel-elevated p-6 rounded-3xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-amber-200/60 font-mono uppercase tracking-wider">Total Orders</span>
            <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="font-serif text-3xl font-bold text-stone-100">{orders}</h3>
            <span className="text-xs font-semibold text-emerald-400 flex items-center bg-emerald-500/10 px-2 py-0.5 rounded-full">
              +8.5% <ArrowUpRight className="w-3 h-3 ml-0.5" />
            </span>
          </div>
          <p className="text-[10px] text-amber-200/40 uppercase tracking-widest">Avg order: $23.30</p>
        </div>

        <div className="stat-card glass-panel-elevated p-6 rounded-3xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-amber-200/60 font-mono uppercase tracking-wider">Booked Tables</span>
            <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="font-serif text-3xl font-bold text-stone-100">18</h3>
            <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full">92% Cap</span>
          </div>
          <p className="text-[10px] text-amber-200/40 uppercase tracking-widest">Next: 10:30 AM (4 guests)</p>
        </div>

        <div className="stat-card glass-panel-elevated p-6 rounded-3xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-amber-200/60 font-mono uppercase tracking-wider">Stock Alerts</span>
            <div className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-400 relative">
              <AlertTriangle className="w-4 h-4" />
              <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="font-serif text-3xl font-bold text-stone-100">3</h3>
            <span className="text-xs font-semibold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full">Action Req</span>
          </div>
          <p className="text-[10px] text-amber-200/40 uppercase tracking-widest truncate" title="Colombia Supremo & Valrhona Chocolate">Colombia Supremo & ...</p>
        </div>
      </div>

      {/* REVENUE GRAPH */}
      <div className="chart-container p-6 sm:p-8 rounded-[2rem] glass-panel-elevated space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-2xl font-bold text-stone-100 mb-1">Revenue Trends</h3>
            <p className="text-xs text-amber-200/50 uppercase tracking-widest font-mono">Past 7 Days</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20">
            <TrendingUp className="w-4 h-4" />
            <span>Peak: Saturday ($5,400)</span>
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={REVENUE_ANALYTICS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="day" 
                stroke="#78350f" 
                fontSize={12} 
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis 
                stroke="#78350f" 
                fontSize={12} 
                tickFormatter={(v) => `$${v}`} 
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(28, 13, 8, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(245, 158, 11, 0.2)',
                  borderRadius: '16px',
                  color: '#f7f1e5',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                  padding: '12px'
                }}
                itemStyle={{ color: '#f59e0b', fontWeight: 'bold' }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#f59e0b"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorRevenue)"
                animationDuration={2000}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* RECENT ORDERS & RESERVATIONS SUMMARY GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* RECENT ORDERS */}
        <div className="stat-card p-6 rounded-[2rem] glass-panel-elevated space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-coffee-800">
            <h4 className="font-serif text-xl font-bold text-stone-100">Live Order Queue</h4>
            <span className="text-xs bg-amber-500/20 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full font-bold">{INITIAL_ORDERS.length} Active</span>
          </div>

          <div className="space-y-3">
            {INITIAL_ORDERS.map((ord) => (
              <div
                key={ord.id}
                className="p-4 rounded-2xl bg-coffee-900/50 border border-amber-500/10 flex items-center justify-between hover:border-amber-500/30 transition-colors"
              >
                <div>
                  <span className="font-mono font-bold text-amber-400 text-sm">{ord.id}</span>
                  <p className="text-stone-200 font-bold mt-1">{ord.customerName}</p>
                  <p className="text-[10px] text-amber-200/50 uppercase tracking-widest mt-1 truncate max-w-[150px] sm:max-w-xs">{ord.items.map(i => i.name).join(', ')}</p>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-stone-100">${ord.totalAmount.toFixed(2)}</span>
                  <span
                    className={`block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mt-2 ${
                      ord.status === 'Ready'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20'
                        : ord.status === 'Preparing'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/20 animate-pulse'
                        : 'bg-blue-500/20 text-blue-400 border border-blue-500/20'
                    }`}
                  >
                    {ord.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-3 text-xs font-bold uppercase tracking-widest text-amber-400 hover:text-amber-300 transition-colors bg-coffee-900/50 rounded-xl hover:bg-coffee-900">
            View All Orders
          </button>
        </div>

        {/* UPCOMING RESERVATIONS */}
        <div className="stat-card p-6 rounded-[2rem] glass-panel-elevated space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-coffee-800">
            <h4 className="font-serif text-xl font-bold text-stone-100">Upcoming Bookings</h4>
            <span className="text-xs bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full font-bold">{INITIAL_RESERVATIONS.length} Bookings</span>
          </div>

          <div className="space-y-3">
            {INITIAL_RESERVATIONS.map((res) => (
              <div
                key={res.id}
                className="p-4 rounded-2xl bg-coffee-900/50 border border-amber-500/10 flex items-center justify-between hover:border-amber-500/30 transition-colors"
              >
                <div>
                  <span className="font-mono font-bold text-amber-400 text-sm">{res.id}</span>
                  <p className="text-stone-200 font-bold mt-1">{res.customerName}</p>
                  <p className="text-[10px] text-amber-200/50 uppercase tracking-widest mt-1">{res.seating} • {res.guests} Guests</p>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-stone-100">{res.time}</span>
                  <span
                    className={`block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mt-2 ${
                      res.status === 'Confirmed'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/20'
                    }`}
                  >
                    {res.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-3 text-xs font-bold uppercase tracking-widest text-amber-400 hover:text-amber-300 transition-colors bg-coffee-900/50 rounded-xl hover:bg-coffee-900">
            View All Reservations
          </button>
        </div>
      </div>
    </div>
  );
};
