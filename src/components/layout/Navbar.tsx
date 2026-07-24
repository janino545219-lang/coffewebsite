import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, User, Menu, X, ShieldCheck, Sun, Moon } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { gsap } from 'gsap';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItemCount } = useCart();
  const { user, setIsAuthModalOpen } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  const itemCount = totalItemCount;

  const navLinks = [
    { name: 'Menu', href: '#menu' },
    { name: 'Philosophy', href: '#about' },
    { name: 'Reserve', href: '#reservation' },
    { name: 'Location', href: '#contact' },
  ];

  // Initial animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(logoRef.current, { y: -20, opacity: 0, duration: 0.8, ease: 'power3.out' })
        .from(linksRef.current?.children || [], { 
          y: -20, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' 
        }, "-=0.4");
    }, navRef);
    return () => ctx.revert();
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      ref={navRef}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-coffee-950/80 backdrop-blur-xl border-b border-amber-500/10 py-3 shadow-2xl' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* LOGO */}
          <div ref={logoRef} className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="w-8 h-8 rounded-full border border-amber-500/30 flex items-center justify-center text-amber-400 bg-coffee-950/80 group-hover:border-amber-400 transition-colors duration-300">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                <path d="M12 6c-1.5 2-2.5 4.5-2 7s2.5 4.5 4 5c1.5-.5 2.5-2.5 2-5s-2.5-5-4-7z" />
              </svg>
            </div>
            <span className="font-serif text-xl font-bold tracking-widest text-stone-100 group-hover:text-amber-200 transition-colors">AURA</span>
          </div>

          {/* DESKTOP LINKS */}
          <nav ref={linksRef} className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-semibold tracking-widest uppercase text-amber-100/70 hover:text-amber-400 transition-colors relative group"
              >
                {link.name}
                {/* Magnetic Hover Indicator */}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-4">
            
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-amber-500/10 text-amber-200/70 hover:text-amber-400 transition-colors hidden sm:block"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* User Account / Dashboard Link */}
            {user ? (
              <div className="flex items-center gap-3">
                {user.role === 'admin' && (
                  <button 
                    onClick={() => setIsAuthModalOpen(true)} // Or handle via AuthContext to go back to admin
                    className="hidden sm:flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-emerald-400 border border-emerald-500/30 px-2 py-1 rounded-full hover:bg-emerald-500/10"
                  >
                    <ShieldCheck className="w-3 h-3" /> Admin
                  </button>
                )}
                <button 
                  onClick={() => {
                    // Simple hash routing for dashboard
                    window.location.hash = '#dashboard';
                  }}
                  className="w-9 h-9 rounded-full bg-coffee-900 border border-amber-500/30 flex items-center justify-center text-amber-200 overflow-hidden hover:border-amber-400 transition-colors"
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="hidden sm:flex p-2 rounded-full hover:bg-amber-500/10 text-amber-200/70 hover:text-amber-400 transition-colors"
              >
                <User className="w-4 h-4" />
              </button>
            )}

            {/* Cart Button */}
            <button 
              onClick={() => dispatchEvent(new CustomEvent('toggle-cart'))}
              className="relative p-2 rounded-full bg-amber-500 hover:bg-amber-400 text-coffee-950 transition-colors shadow-lg shadow-amber-500/20"
            >
              <ShoppingBag className="w-4 h-4" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-coffee-950">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-amber-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full glass-panel-elevated border-b border-amber-500/20 animate-slideInUp">
          <nav className="flex flex-col px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-serif font-bold text-stone-100 hover:text-amber-400 border-b border-amber-500/10 pb-4"
              >
                {link.name}
              </a>
            ))}
            {!user && (
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAuthModalOpen(true);
                }}
                className="text-left text-lg font-serif font-bold text-amber-400 pb-2"
              >
                Sign In
              </button>
            )}
            <div className="flex items-center gap-4 pt-2">
               <button 
                onClick={toggleTheme}
                className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-amber-200/70"
              >
                {theme === 'dark' ? <><Sun className="w-4 h-4" /> Light Mode</> : <><Moon className="w-4 h-4" /> Dark Mode</>}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
