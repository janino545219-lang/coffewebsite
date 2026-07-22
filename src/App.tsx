import React from 'react';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
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

const MainApp: React.FC = () => {
  const { viewMode } = useAuth();

  if (viewMode === 'admin') {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-coffee-950 text-stone-100 selection:bg-amber-500/30 selection:text-amber-200">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <FeaturedSection />
        <MenuSection />
        <WhyUsSection />
        <ReviewsSection />
        <GallerySection />
        <ReservationSection />
        <ContactSection />
      </main>
      <Footer />
      <CartDrawer />
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MainApp />
      </CartProvider>
    </AuthProvider>
  );
}
