import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  User, MapPin, CreditCard, Heart, ShoppingBag, 
  Settings, LogOut, ArrowLeft, Coffee, Award, Star 
} from 'lucide-react';
import { INITIAL_ORDERS, FEATURED_PRODUCTS } from '../../data/mockData';
import { gsap } from 'gsap';

export const CustomerDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'orders' | 'favorites' | 'rewards' | 'settings'>('orders');
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter mock orders to simulate user's own orders
  const myOrders = INITIAL_ORDERS.slice(0, 3).map(o => ({...o, customerName: user?.name || 'Customer'}));
  
  // Animation on tab switch
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo('.tab-content', 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [activeTab]);

  if (!user) return null;

  return (
    <div ref={containerRef} className="min-h-screen bg-coffee-950 pt-28 pb-20 relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header & Back */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 animate-fadeIn">
          <div>
            <button 
              onClick={() => {window.location.hash = '';}}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 hover:text-amber-300 transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Cafe
            </button>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-100">
              Welcome, <span className="text-gold-gradient">{user.name.split(' ')[0]}</span>
            </h1>
          </div>
          
          <div className="glass-panel px-6 py-4 rounded-2xl flex items-center gap-6">
            <div>
              <p className="text-[10px] text-amber-200/50 uppercase tracking-widest font-mono">Status</p>
              <p className="font-bold text-amber-400 flex items-center gap-1"><Award className="w-4 h-4"/> Gold Member</p>
            </div>
            <div className="w-px h-8 bg-amber-500/20"></div>
            <div>
              <p className="text-[10px] text-amber-200/50 uppercase tracking-widest font-mono">Points</p>
              <p className="font-bold text-stone-200">1,240 <span className="text-amber-400 text-xs">pts</span></p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1 space-y-2 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            <div className="glass-panel-elevated p-4 rounded-3xl space-y-1">
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all text-sm font-semibold tracking-wider ${
                  activeTab === 'orders' ? 'bg-amber-500 text-coffee-950 shadow-lg shadow-amber-500/20' : 'text-amber-100 hover:bg-coffee-900'
                }`}
              >
                <ShoppingBag className="w-4 h-4" /> Order History
              </button>
              <button
                onClick={() => setActiveTab('favorites')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all text-sm font-semibold tracking-wider ${
                  activeTab === 'favorites' ? 'bg-amber-500 text-coffee-950 shadow-lg shadow-amber-500/20' : 'text-amber-100 hover:bg-coffee-900'
                }`}
              >
                <Heart className="w-4 h-4" /> Favorites
              </button>
              <button
                onClick={() => setActiveTab('rewards')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all text-sm font-semibold tracking-wider ${
                  activeTab === 'rewards' ? 'bg-amber-500 text-coffee-950 shadow-lg shadow-amber-500/20' : 'text-amber-100 hover:bg-coffee-900'
                }`}
              >
                <Star className="w-4 h-4" /> Rewards & Perks
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all text-sm font-semibold tracking-wider ${
                  activeTab === 'settings' ? 'bg-amber-500 text-coffee-950 shadow-lg shadow-amber-500/20' : 'text-amber-100 hover:bg-coffee-900'
                }`}
              >
                <Settings className="w-4 h-4" /> Settings
              </button>
            </div>
            
            <button 
              onClick={() => {
                logout();
                window.location.hash = '';
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-rose-400 hover:bg-rose-500/10 transition-colors text-sm font-bold tracking-wider uppercase border border-transparent hover:border-rose-500/20"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 glass-panel-elevated rounded-3xl p-6 sm:p-8 min-h-[500px]">
            <div className="tab-content">
              
              {/* ORDERS TAB */}
              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <h3 className="font-serif text-2xl font-bold text-stone-100 mb-6">Recent Orders</h3>
                  
                  {myOrders.map((order, i) => (
                    <div key={order.id} className="glass-card p-6 rounded-2xl border border-amber-500/10 hover:border-amber-500/30 transition-colors">
                      <div className="flex flex-wrap justify-between items-start gap-4 mb-4 pb-4 border-b border-coffee-800">
                        <div>
                          <p className="font-mono text-amber-400 font-bold">{order.id}</p>
                          <p className="text-xs text-amber-200/50 mt-1">Today at 09:42 AM</p>
                        </div>
                        <div className="text-right">
                          <p className="font-serif text-xl font-bold text-stone-100">${order.totalAmount.toFixed(2)}</p>
                          <span className={`inline-block mt-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                            order.status === 'Ready' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-coffee-900 border border-amber-500/20 flex items-center justify-center">
                                <span className="font-bold text-amber-200">{item.quantity}x</span>
                              </div>
                              <span className="text-stone-200">{item.name}</span>
                            </div>
                            <span className="text-amber-100/60 font-mono">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6 flex justify-end">
                        <button className="px-4 py-2 rounded-xl bg-coffee-900 text-amber-400 text-xs font-bold uppercase tracking-widest hover:bg-amber-500 hover:text-coffee-950 transition-colors border border-amber-500/20 hover:border-transparent">
                          Reorder
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* FAVORITES TAB */}
              {activeTab === 'favorites' && (
                <div>
                  <h3 className="font-serif text-2xl font-bold text-stone-100 mb-6">Your Favorites</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {FEATURED_PRODUCTS.slice(0, 2).map((product: any) => (
                      <div key={product.id} className="glass-card rounded-2xl overflow-hidden group">
                        <div className="h-40 relative overflow-hidden">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          <button className="absolute top-3 right-3 p-2 rounded-full bg-coffee-950/80 text-rose-400 hover:text-white transition-colors backdrop-blur-md">
                            <Heart className="w-4 h-4 fill-rose-400" />
                          </button>
                        </div>
                        <div className="p-5">
                          <h4 className="font-serif font-bold text-stone-100 text-lg mb-1">{product.name}</h4>
                          <p className="text-amber-400 font-mono font-bold text-sm mb-4">${product.price.toFixed(2)}</p>
                          <button className="w-full py-2.5 rounded-xl bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest hover:bg-amber-500 hover:text-coffee-950 transition-colors border border-amber-500/30 hover:border-transparent">
                            Add to Order
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* REWARDS TAB */}
              {activeTab === 'rewards' && (
                <div className="space-y-8">
                  <h3 className="font-serif text-2xl font-bold text-stone-100 mb-2">Rewards & Perks</h3>
                  
                  {/* Progress Ring visual */}
                  <div className="flex flex-col sm:flex-row items-center gap-8 p-6 rounded-3xl bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(245,158,11,0.1)" strokeWidth="6" />
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#f59e0b" strokeWidth="6" strokeDasharray="283" strokeDashoffset="283 * 0.2" className="drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]" style={{ strokeDashoffset: 283 - (283 * 0.75) }} />
                      </svg>
                      <div className="absolute text-center">
                        <p className="text-2xl font-bold text-stone-100 font-mono">75%</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-amber-200 mb-2">260 Points to Platinum</h4>
                      <p className="text-sm text-amber-100/70 mb-4">Earn 10 points for every $1 spent. Platinum members get free pastries and priority seating.</p>
                      <div className="w-full bg-coffee-900 rounded-full h-2">
                        <div className="bg-gradient-to-r from-amber-500 to-yellow-300 h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl border border-dashed border-amber-500/30 bg-coffee-900/30 text-center space-y-2">
                      <Coffee className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                      <h5 className="font-bold text-stone-200">Free Signature Drink</h5>
                      <p className="text-xs text-amber-100/50">Redeem for 500 points</p>
                      <button className="mt-2 text-xs font-bold uppercase tracking-widest text-amber-400 border border-amber-500/30 px-4 py-1.5 rounded-full hover:bg-amber-500/10">Redeem</button>
                    </div>
                    <div className="p-5 rounded-2xl border border-dashed border-amber-500/30 bg-coffee-900/30 text-center space-y-2">
                      <ShoppingBag className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                      <h5 className="font-bold text-stone-200">20% Off Coffee Beans</h5>
                      <p className="text-xs text-amber-100/50">Redeem for 800 points</p>
                      <button className="mt-2 text-xs font-bold uppercase tracking-widest text-amber-400 border border-amber-500/30 px-4 py-1.5 rounded-full hover:bg-amber-500/10">Redeem</button>
                    </div>
                  </div>
                </div>
              )}

              {/* SETTINGS TAB */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <h3 className="font-serif text-2xl font-bold text-stone-100 mb-6">Account Settings</h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-amber-200/60">Full Name</label>
                        <input type="text" defaultValue={user.name} className="w-full bg-coffee-900/50 border border-amber-500/20 rounded-xl px-4 py-3 text-sm text-stone-200 focus:outline-none focus:border-amber-400" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-amber-200/60">Email Address</label>
                        <input type="email" defaultValue={user.email} className="w-full bg-coffee-900/50 border border-amber-500/20 rounded-xl px-4 py-3 text-sm text-stone-200 focus:outline-none focus:border-amber-400" />
                      </div>
                    </div>
                    
                    <div className="pt-6 mt-6 border-t border-coffee-800">
                      <h4 className="font-bold text-stone-200 mb-4">Saved Payment Methods</h4>
                      <div className="flex items-center justify-between p-4 rounded-xl border border-amber-500/20 bg-coffee-900/30">
                        <div className="flex items-center gap-3">
                          <CreditCard className="w-5 h-5 text-amber-400" />
                          <div>
                            <p className="text-sm font-bold text-stone-200">Visa ending in 4242</p>
                            <p className="text-xs text-amber-100/50">Expires 12/25</p>
                          </div>
                        </div>
                        <button className="text-xs text-rose-400 hover:text-rose-300">Remove</button>
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-coffee-800 flex justify-end">
                      <button className="px-6 py-3 rounded-xl bg-amber-500 text-coffee-950 font-bold uppercase tracking-widest text-sm hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
