import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { REVENUE_ANALYTICS_DATA, CATEGORY_SALES_DATA } from '../../data/mockData';

export const AnalyticsTab: React.FC = () => {
  const COLORS = ['#d4a373', '#e6b800', '#c87d55', '#9a3412'];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* HEADER */}
      <div>
        <h3 className="font-serif text-2xl font-bold text-amber-100">Revenue & Sales Analytics</h3>
        <p className="text-xs text-amber-200/50">Comprehensive breakdown of sales channels and item category performance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* BAR CHART: DAILY ORDERS */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-coffee-900/40 border border-amber-500/20 backdrop-blur-xl space-y-4">
          <h4 className="font-serif text-lg font-bold text-amber-100">Daily Order Count</h4>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_ANALYTICS_DATA}>
                <XAxis dataKey="day" stroke="#a8896c" fontSize={12} />
                <YAxis stroke="#a8896c" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1c0d08',
                    borderColor: 'rgba(212, 163, 115, 0.3)',
                    borderRadius: '12px',
                    color: '#f7f1e5',
                  }}
                />
                <Bar dataKey="orders" fill="#d4a373" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PIE CHART: CATEGORY DISTRIBUTION */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-coffee-900/40 border border-amber-500/20 backdrop-blur-xl space-y-4">
          <h4 className="font-serif text-lg font-bold text-amber-100">Sales Distribution by Category</h4>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CATEGORY_SALES_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {CATEGORY_SALES_DATA.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1c0d08',
                    borderColor: 'rgba(212, 163, 115, 0.3)',
                    borderRadius: '12px',
                    color: '#f7f1e5',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* LEGEND */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-coffee-800">
            {CATEGORY_SALES_DATA.map((cat, i) => (
              <div key={cat.name} className="flex items-center gap-2 text-xs text-amber-200/80">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                <span>{cat.name} ({cat.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
