import React, { useState, useEffect } from 'react';
import { ShoppingBag, User as UserIcon, Menu, X, Coffee, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { setIsCartOpen, totalItemCount } = useCart();
  const { user, setIsAuthModalOpen, viewMode, setViewMode } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Featured', href: '#featured' },
    { name: 'Menu', href: '#menu' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reserve Table', href: '#reservation' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-coffee-950/85 backdrop-blur-xl border-b border-amber-500/15 py-3 shadow-2xl shadow-black/40'
          : 'bg-gradient-to-b from-coffee-950/90 via-coffee-950/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* BRAND LOGO */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 p-[1px] shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-coffee-950 rounded-full flex items-center justify-center">
                <Coffee className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-wider text-gold-gradient leading-none">
                AURA ROAST
              </span>
              <span className="text-[10px] tracking-[0.25em] text-amber-200/60 uppercase font-mono mt-0.5">
                Micro-Roastery
              </span>
            </div>
          </a>

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs uppercase tracking-widest text-amber-100/70 hover:text-amber-300 transition-colors font-medium relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-amber-400 hover:after:w-full after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* ACTION CONTROLS */}
          <div className="flex items-center gap-4">
            {/* View Mode Toggle for Admin */}
            {user?.role === 'admin' && (
              <button
                onClick={() => setViewMode(viewMode === 'public' ? 'admin' : 'public')}
                className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all ${
                  viewMode === 'admin'
                    ? 'bg-amber-500 text-coffee-950 border-amber-400 shadow-md shadow-amber-500/30'
                    : 'bg-coffee-900/60 text-amber-300 border-amber-500/30 hover:border-amber-400'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{viewMode === 'admin' ? 'Exit Dashboard' : 'Admin Panel'}</span>
              </button>
            )}

            {/* CART BUTTON */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-coffee-900/60 border border-amber-500/20 text-amber-200 hover:text-white hover:border-amber-400/50 hover:bg-coffee-800/80 transition-all shadow-inner group"
              aria-label="Open Order Cart"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {totalItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-500 text-coffee-950 text-[11px] font-bold flex items-center justify-center shadow-lg shadow-amber-500/40 animate-pulse">
                  {totalItemCount}
                </span>
              )}
            </button>

            {/* USER / AUTH BUTTON */}
            <button
              onClick={() => {
                if (user) {
                  if (user.role === 'admin') {
                    setViewMode(viewMode === 'public' ? 'admin' : 'public');
                  }
                } else {
                  setIsAuthModalOpen(true);
                }
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-600/90 to-amber-800/90 hover:from-amber-500 hover:to-amber-700 text-amber-50 text-xs font-semibold tracking-wider uppercase border border-amber-400/30 shadow-lg shadow-amber-900/30 hover:shadow-amber-500/20 transition-all active:scale-95"
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {user ? (user.role === 'admin' ? 'Dashboard' : user.name) : 'Sign In'}
              </span>
            </button>

            {/* MOBILE MENU TOGGLE */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-coffee-900/60 border border-amber-500/20 text-amber-200"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[70px] bg-coffee-950/95 backdrop-blur-2xl z-40 p-6 flex flex-col justify-between border-t border-amber-500/10 animate-fadeIn">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-serif text-amber-100 hover:text-amber-400 py-2 border-b border-coffee-800/50 flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-amber-500/40 text-xs font-mono">→</span>
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-amber-500/20 flex flex-col gap-3">
            {user?.role === 'admin' && (
              <button
                onClick={() => {
                  setViewMode(viewMode === 'public' ? 'admin' : 'public');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-xl bg-amber-500 text-coffee-950 font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{viewMode === 'admin' ? 'Back to Website' : 'Go to Admin Panel'}</span>
              </button>
            )}
            <p className="text-center text-xs text-amber-200/50">
              © 2026 Aura Roast Micro-Roastery. All rights reserved.
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
