import React, { useState, useEffect, useRef } from 'react';
import { X, Mail, Lock, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { gsap } from 'gsap';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login, signup } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAuthModalOpen) {
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out', display: 'flex' });
      gsap.fromTo(modalRef.current, 
        { scale: 0.95, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.2)' }
      );
    } else {
      gsap.to(modalRef.current, { scale: 0.95, opacity: 0, y: 20, duration: 0.3, ease: 'power2.in' });
      gsap.to(overlayRef.current, { 
        opacity: 0, duration: 0.3, ease: 'power2.in', 
        onComplete: () => {
          if (overlayRef.current) overlayRef.current.style.display = 'none';
        }
      });
      // Reset state
      setError('');
      setIsLoading(false);
      setEmail('');
      setPassword('');
      setName('');
    }
  }, [isAuthModalOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (mode === 'login') {
        const success = login(email, password);
        if (!success) setError('Invalid credentials. Use admin@auraroast.com / admin123 for admin access, or any other for customer.');
      } else {
        const success = signup(name, email, password);
        if (!success) setError('Email already exists');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 bg-coffee-950/80 backdrop-blur-md z-[100] hidden items-center justify-center p-4 opacity-0"
    >
      <div 
        ref={modalRef}
        className="w-full max-w-md glass-panel-elevated rounded-3xl overflow-hidden relative"
      >
        <button 
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full text-amber-200/50 hover:text-amber-400 hover:bg-coffee-900 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl font-bold text-stone-100">
              {mode === 'login' ? 'Welcome Back' : 'Join Aura Roast'}
            </h2>
            <p className="text-sm text-amber-100/60 mt-2">
              {mode === 'login' ? 'Access your orders and preferences.' : 'Create an account to earn rewards.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-amber-200/60">Full Name</label>
                <div className="relative">
                  <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500/50" />
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-coffee-900/50 border border-amber-500/20 rounded-xl px-10 py-3 text-sm text-stone-200 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-amber-200/60">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500/50" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-coffee-900/50 border border-amber-500/20 rounded-xl px-10 py-3 text-sm text-stone-200 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-amber-200/60">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500/50" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-coffee-900/50 border border-amber-500/20 rounded-xl px-10 py-3 text-sm text-stone-200 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                />
              </div>
            </div>

            {error && (
              <p className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-lg p-2 text-center">
                {error}
              </p>
            )}

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 mt-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-coffee-950 font-bold tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-coffee-950/20 border-t-coffee-950 rounded-full animate-spin"></div>
              ) : (
                <>
                  {mode === 'login' ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                  <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login');
                setError('');
              }}
              className="text-xs text-amber-200/60 hover:text-amber-400 transition-colors"
            >
              {mode === 'login' ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
          
          {mode === 'login' && (
             <div className="mt-4 pt-4 border-t border-amber-500/10 text-center">
              <p className="text-[10px] text-amber-100/40">Demo Admin: admin@auraroast.com / admin123</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};
