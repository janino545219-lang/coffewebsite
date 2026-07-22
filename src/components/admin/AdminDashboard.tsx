import React, { useState } from 'react';
import {
  LayoutDashboard,
  BarChart2,
  Coffee,
  ShoppingBag,
  Calendar,
  Package,
  Settings,
  Bell,
  Search,
  LogOut,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Moon,
  Sun,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { OverviewTab } from './OverviewTab';
import { AnalyticsTab } from './AnalyticsTab';
import { MenuManagerTab } from './MenuManagerTab';
import { OrderManagerTab } from './OrderManagerTab';
import { ReservationManagerTab } from './ReservationManagerTab';
import { InventoryTab } from './InventoryTab';
import { SettingsTab } from './SettingsTab';

export const AdminDashboard: React.FC = () => {
  const { user, logout, setViewMode } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'menu' | 'orders' | 'reservations' | 'inventory' | 'settings'>('overview');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const notifications = [
    { id: 1, title: 'Low Stock Alert', desc: 'Colombia Supremo beans are below 15kg.', time: '10m ago' },
    { id: 2, title: 'New Table Reservation', desc: 'Claire B. booked 4 guests for 10:30 AM.', time: '25m ago' },
    { id: 3, title: 'New Mobile Order #ORD-1094', desc: '$24.60 via Apple Pay.', time: '40m ago' },
  ];

  const sidebarLinks = [
    { id: 'overview', name: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'analytics', name: 'Sales Analytics', icon: <BarChart2 className="w-4 h-4" /> },
    { id: 'menu', name: 'Menu Catalog', icon: <Coffee className="w-4 h-4" /> },
    { id: 'orders', name: 'Kitchen Orders', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'reservations', name: 'Bookings', icon: <Calendar className="w-4 h-4" /> },
    { id: 'inventory', name: 'Inventory & Beans', icon: <Package className="w-4 h-4" /> },
    { id: 'settings', name: 'Store Settings', icon: <Settings className="w-4 h-4" /> },
  ] as const;

  return (
    <div className="min-h-screen bg-coffee-950 text-stone-100 flex overflow-hidden">
      {/* SIDEBAR NAVIGATION */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-coffee-950/95 border-r border-amber-500/15 backdrop-blur-2xl transition-transform duration-300 flex flex-col justify-between p-5 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* BRAND */}
          <div className="flex items-center justify-between border-b border-coffee-800/80 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 p-[1px]">
                <div className="w-full h-full bg-coffee-950 rounded-full flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                </div>
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold text-gold-gradient leading-none">ROASTER HQ</h2>
                <span className="text-[10px] text-amber-200/50 uppercase tracking-widest font-mono">Master Dashboard</span>
              </div>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-amber-200/50 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* NAV LINKS */}
          <nav className="space-y-1.5">
            {sidebarLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id as any);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wider transition-all ${
                  activeTab === link.id
                    ? 'bg-amber-500 text-coffee-950 font-bold shadow-lg shadow-amber-500/20'
                    : 'text-amber-200/70 hover:bg-coffee-900/60 hover:text-amber-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  {link.icon}
                  <span>{link.name}</span>
                </div>
                {activeTab === link.id && <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            ))}
          </nav>
        </div>

        {/* BOTTOM USER PROFILE & WEBSITE BACK ACTION */}
        <div className="pt-4 border-t border-coffee-800/80 space-y-3">
          <button
            onClick={() => setViewMode('public')}
            className="w-full py-2.5 px-3 rounded-xl bg-coffee-900/80 hover:bg-coffee-800 border border-amber-500/20 text-amber-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-amber-400" />
            <span>Return to Public Café</span>
          </button>

          <div className="flex items-center justify-between p-2 rounded-xl bg-coffee-900/40">
            <div className="flex items-center gap-2">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                alt={user?.name}
                className="w-8 h-8 rounded-full object-cover border border-amber-500/30"
              />
              <div className="text-left">
                <p className="text-xs font-bold text-stone-200 truncate max-w-[90px]">{user?.name}</p>
                <p className="text-[9px] text-amber-400 font-mono">Master Roaster</p>
              </div>
            </div>

            <button
              onClick={logout}
              className="p-2 text-amber-200/50 hover:text-rose-400 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* DASHBOARD HEADER */}
        <header className="sticky top-0 z-30 bg-coffee-950/80 backdrop-blur-xl border-b border-amber-500/15 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-coffee-900 border border-amber-500/20 text-amber-300"
            >
              <LayoutDashboard className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-serif text-xl font-bold text-stone-100 capitalize">
                {activeTab} Management
              </h1>
              <p className="text-[11px] text-amber-200/50">San Francisco Flagship Branch</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* NOTIFICATIONS PANEL TOGGLE */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2.5 rounded-full bg-coffee-900 border border-amber-500/20 text-amber-200 hover:text-white relative"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-coffee-950 border border-amber-500/30 rounded-2xl p-4 shadow-2xl z-50 space-y-3 animate-scaleUp">
                  <div className="flex items-center justify-between pb-2 border-b border-coffee-800">
                    <span className="font-serif text-sm font-bold text-amber-100">Live Alerts</span>
                    <span className="text-[10px] text-amber-400 font-mono">3 New</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    {notifications.map((n) => (
                      <div key={n.id} className="p-2.5 rounded-xl bg-coffee-900/60 border border-amber-500/10 space-y-0.5">
                        <div className="flex justify-between font-semibold text-stone-200">
                          <span>{n.title}</span>
                          <span className="text-[9px] text-amber-200/50">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-amber-200/60">{n.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setViewMode('public')}
              className="px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-coffee-950 font-bold text-xs uppercase tracking-wider shadow-md"
            >
              Public Café
            </button>
          </div>
        </header>

        {/* DASHBOARD TAB BODY */}
        <main className="p-6 sm:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'analytics' && <AnalyticsTab />}
          {activeTab === 'menu' && <MenuManagerTab />}
          {activeTab === 'orders' && <OrderManagerTab />}
          {activeTab === 'reservations' && <ReservationManagerTab />}
          {activeTab === 'inventory' && <InventoryTab />}
          {activeTab === 'settings' && <SettingsTab />}
        </main>
      </div>
    </div>
  );
};
