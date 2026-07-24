import React, { useRef, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { SALES_BY_CATEGORY, POPULAR_TIMES } from '../../data/mockData';
import { gsap } from 'gsap';
import { Calendar } from 'lucide-react';

export const AnalyticsTab: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.analytics-card',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const COLORS = ['#f59e0b', '#d97706', '#b45309', '#78350f', '#451a03'];

  return (
    <div ref={containerRef} className="space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="font-serif text-2xl font-bold text-stone-100">Sales Analytics</h2>
          <p className="text-sm text-amber-200/50 mt-1">Detailed breakdown of performance metrics</p>
        </div>
        
        <div className="flex items-center gap-2 bg-coffee-900/50 border border-amber-500/20 rounded-xl px-4 py-2">
          <Calendar className="w-4 h-4 text-amber-400" />
          <select className="bg-transparent border-none text-sm text-stone-200 focus:outline-none appearance-none cursor-pointer pr-4">
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="ytd">Year to Date</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Sales By Category Pie Chart */}
        <div className="analytics-card glass-panel-elevated p-6 rounded-3xl h-96 flex flex-col">
          <div className="mb-4">
            <h3 className="font-serif text-lg font-bold text-stone-100">Revenue by Category</h3>
            <p className="text-xs text-amber-200/50 uppercase tracking-widest font-mono">Top performers</p>
          </div>
          <div className="flex-1 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={SALES_BY_CATEGORY}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="sales"
                  stroke="none"
                  animationDuration={1500}
                  animationEasing="ease-out"
                >
                  {SALES_BY_CATEGORY.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(28, 13, 8, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(245, 158, 11, 0.2)',
                    borderRadius: '12px',
                    color: '#f7f1e5',
                  }}
                  itemStyle={{ color: '#f7f1e5', fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Custom Legend */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 flex flex-col gap-3">
              {SALES_BY_CATEGORY.map((item: any, idx: number) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                  <div className="text-xs">
                    <p className="font-bold text-stone-200">{item.category}</p>
                    <p className="text-amber-200/50 font-mono">${item.sales}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Popular Times Bar Chart */}
        <div className="analytics-card glass-panel-elevated p-6 rounded-3xl h-96 flex flex-col">
           <div className="mb-4">
            <h3 className="font-serif text-lg font-bold text-stone-100">Foot Traffic & Orders</h3>
            <p className="text-xs text-amber-200/50 uppercase tracking-widest font-mono">Busiest Hours</p>
          </div>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={POPULAR_TIMES} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                <XAxis 
                  dataKey="time" 
                  stroke="#78350f" 
                  fontSize={10} 
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke="#78350f" 
                  fontSize={10} 
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(245,158,11,0.1)' }}
                  contentStyle={{
                    backgroundColor: 'rgba(28, 13, 8, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(245, 158, 11, 0.2)',
                    borderRadius: '12px',
                    color: '#f7f1e5',
                  }}
                  itemStyle={{ color: '#f59e0b', fontWeight: 'bold' }}
                />
                <Bar 
                  dataKey="orders" 
                  fill="#f59e0b" 
                  radius={[4, 4, 0, 0]} 
                  animationDuration={1500}
                  animationEasing="ease-out"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
      </div>
    </div>
  );
};
