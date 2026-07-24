import React, { createContext, useContext, useState } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  viewMode: 'public' | 'admin';
  setViewMode: (mode: 'public' | 'admin') => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  login: (email: string, pass: string) => { success: boolean; message: string };
  signup: (name: string, email: string, pass: string) => { success: boolean; message: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    name: 'Julian Vance',
    email: 'admin@auraroast.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  });
  const [viewMode, setViewMode] = useState<'public' | 'admin'>('public');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  const isAdmin = user?.role === 'admin';

  const login = (email: string, _pass: string) => {
    if (email.toLowerCase().includes('admin')) {
      const adminUser: User = {
        name: 'Julian Vance',
        email: email,
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      };
      setUser(adminUser);
      setIsAuthModalOpen(false);
      return { success: true, message: 'Welcome back, Master Roaster!' };
    }
    const customerUser: User = {
      name: email.split('@')[0],
      email: email,
      role: 'customer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    };
    setUser(customerUser);
    setIsAuthModalOpen(false);
    return { success: true, message: 'Successfully signed in.' };
  };

  const logout = () => {
    setUser(null);
    setViewMode('public');
  };

  const signup = (name: string, email: string, _pass: string) => {
    const customerUser: User = {
      name,
      email,
      role: 'customer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    };
    setUser(customerUser);
    setIsAuthModalOpen(false);
    return { success: true, message: 'Account created successfully.' };
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        viewMode,
        setViewMode,
        isAuthModalOpen,
        setIsAuthModalOpen,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
