import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon, Coffee, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login } = useAuth();
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const res = login(email, password);
      setMessage(res.message);
    }, 1000);
  };

  const handleDemoAdmin = () => {
    setEmail('admin@auraroast.com');
    setPassword('roaster2026');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login('admin@auraroast.com', 'roaster2026');
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* BACKDROP */}
      <div
        onClick={() => setIsAuthModalOpen(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-fadeIn"
      />

      {/* MODAL CARD */}
      <div className="relative w-full max-w-md bg-coffee-950/95 border border-amber-500/30 rounded-3xl p-8 shadow-2xl z-10 space-y-6 backdrop-blur-2xl animate-scaleUp">
        {/* CLOSE BUTTON */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-coffee-900 text-amber-200/50 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LOGO BRAND */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 p-[1px] mx-auto shadow-lg shadow-amber-500/20">
            <div className="w-full h-full bg-coffee-950 rounded-full flex items-center justify-center">
              <Coffee className="w-6 h-6 text-amber-400" />
            </div>
          </div>
          <h3 className="font-serif text-2xl font-bold text-stone-100">Welcome to Aura Roast</h3>
          <p className="text-xs text-amber-200/60 font-light">
            Sign in to unlock exclusive cupping rewards & order tracking
          </p>
        </div>

        {/* TAB SWITCHER */}
        <div className="grid grid-cols-2 p-1 rounded-xl bg-coffee-900/60 border border-amber-500/15">
          <button
            type="button"
            onClick={() => setTab('login')}
            className={`py-2 rounded-lg text-xs font-semibold transition-all ${
              tab === 'login'
                ? 'bg-amber-500 text-coffee-950 font-bold shadow-md'
                : 'text-amber-200/60 hover:text-amber-100'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setTab('signup')}
            className={`py-2 rounded-lg text-xs font-semibold transition-all ${
              tab === 'signup'
                ? 'bg-amber-500 text-coffee-950 font-bold shadow-md'
                : 'text-amber-200/60 hover:text-amber-100'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === 'signup' && (
            <div>
              <label className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider block mb-1">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-amber-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="Julian Vance"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-coffee-900 border border-amber-500/20 text-xs text-amber-100 placeholder-amber-200/30 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider block mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-amber-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-coffee-900 border border-amber-500/20 text-xs text-amber-100 placeholder-amber-200/30 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider block mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-amber-400 absolute left-3.5 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-coffee-900 border border-amber-500/20 text-xs text-amber-100 placeholder-amber-200/30 focus:outline-none focus:border-amber-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-amber-200/50 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* REMEMBER ME & FORGOT PASSWORD */}
          <div className="flex items-center justify-between text-xs text-amber-200/70 pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-amber-500/30 text-amber-500 focus:ring-amber-500/40 bg-coffee-900"
              />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-amber-400 hover:underline">Forgot password?</a>
          </div>

          {message && (
            <p className="text-xs text-emerald-400 font-medium text-center">{message}</p>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-coffee-950 font-bold text-xs uppercase tracking-wider shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-coffee-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>{tab === 'login' ? 'Sign In to Account' : 'Create Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* SOCIAL SIGN IN */}
        <div className="space-y-3 pt-2 border-t border-coffee-800/80">
          <div className="text-center text-[10px] text-amber-200/40 uppercase tracking-widest">
            Or continue with
          </div>
          <button
            onClick={handleDemoAdmin}
            className="w-full py-2.5 rounded-xl bg-coffee-900 hover:bg-coffee-800 border border-amber-500/20 text-amber-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
          >
            <span>🔐 Quick Sign In as Master Roaster (Admin)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
