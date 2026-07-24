import React, { useEffect, useState, useCallback } from 'react';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/layout/CartDrawer';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { FeaturedSection } from './components/sections/FeaturedSection';
import { MenuSection } from './components/sections/MenuSection';
import { WhyUsSection } from './components/sections/WhyUsSection';
import { ReviewsSection } from './components/sections/ReviewsSection';
import { GallerySection } from './components/sections/GallerySection';
import { ReservationSection } from './components/sections/ReservationSection';
import { ContactSection } from './components/sections/ContactSection';
import { AuthModal } from './components/auth/AuthModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { CustomerDashboard } from './components/customer/CustomerDashboard';

const MainApp: React.FC = () => {
  const { viewMode, user } = useAuth();
  
  // Mouse spotlight effect tracking
  const [mousePos, setMousePos] = useState({ x: '50%', y: '50%' });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Only apply on desktop
    if (window.innerWidth > 768) {
      const x = `${(e.clientX / window.innerWidth) * 100}%`;
      const y = `${(e.clientY / window.innerHeight) * 100}%`;
      setMousePos({ x, y });
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  if (viewMode === 'admin') {
    return <AdminDashboard />;
  }

  // Use routing state for customer dashboard vs public site
  // Simple path check since we are a single page app without react-router
  const isDashboard = window.location.hash === '#dashboard' && user?.role === 'customer';

  return (
    <div 
      className="min-h-screen bg-coffee-950 text-stone-100 selection:bg-amber-500/30 selection:text-amber-200 mouse-spotlight noise-overlay"
      style={{ 
        '--mouse-x': mousePos.x, 
        '--mouse-y': mousePos.y 
      } as React.CSSProperties}
    >
      <Navbar />
      
      <main className="relative z-10">
        {isDashboard ? (
          <CustomerDashboard />
        ) : (
          <>
            <HeroSection />
            <AboutSection />
            <FeaturedSection />
            <MenuSection />
            <WhyUsSection />
            <ReviewsSection />
            <GallerySection />
            <ReservationSection />
            <ContactSection />
          </>
        )}
      </main>
      
      <Footer />
      <CartDrawer />
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <MainApp />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
