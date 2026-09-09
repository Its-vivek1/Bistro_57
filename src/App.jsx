import React, { useState, useEffect } from 'react';
import { useScrollReveal } from './hooks/useScrollReveal';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { FanFavourites } from './components/FanFavourites';
import { MenuSection } from './components/MenuSection';
import { CustomBrewBuilder } from './components/CustomBrewBuilder';
import { CoffeeAdvisor } from './components/CoffeeAdvisor';
import { DrinksShowcase } from './components/DrinksShowcase';
import { WhyBistro57 } from './components/WhyBistro57';
import { Gallery } from './components/Gallery';
import { Reviews } from './components/Reviews';
import { Location } from './components/Location';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ReservationModal } from './components/ReservationModal';
import { ItemDetailModal } from './components/ItemDetailModal';
import { ReviewModal } from './components/ReviewModal';
import { LightboxModal } from './components/LightboxModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { SpinWheelModal } from './components/SpinWheelModal';
import { FloatingActions } from './components/FloatingActions';
import { ToastContainer } from './components/ToastContainer';

import { useTheme } from './context/ThemeContext';

export function App() {
  useScrollReveal();
  const { theme } = useTheme();

  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSpinWheelOpen, setIsSpinWheelOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Auto show spin wheel after 3.5 seconds once per session
  useEffect(() => {
    const hasSeenWheel = sessionStorage.getItem('bistro57_wheel_shown');
    if (!hasSeenWheel) {
      const timer = setTimeout(() => {
        setIsSpinWheelOpen(true);
        sessionStorage.setItem('bistro57_wheel_shown', 'true');
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
      theme === 'light' ? 'bg-[#FAF4EB] text-[#2C1D16]' : 'bg-b57-cream text-b57-brown'
    }`}>
      
      {/* Top Status & Announcement Bar */}
      <AnnouncementBar />

      {/* Luxury Café Noir Sticky Navigation Bar */}
      <Navbar onOpenReservation={() => setIsReservationOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        <Hero onOpenReservation={() => setIsReservationOpen(true)} />
        <About onOpenReservation={() => setIsReservationOpen(true)} />
        <FanFavourites onSelectItem={(item) => setSelectedItem(item)} />
        <MenuSection onSelectItem={(item) => setSelectedItem(item)} />
        <CustomBrewBuilder />
        <CoffeeAdvisor />
        <DrinksShowcase onSelectItem={(item) => setSelectedItem(item)} />
        <WhyBistro57 />
        <Gallery onSelectImage={(img) => setSelectedImage(img)} />
        <Reviews onOpenReviewModal={() => setIsReviewOpen(true)} />
        <Location />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenReservation={() => setIsReservationOpen(true)} />

      {/* Drawers & Modals */}
      <CartDrawer onOpenCheckout={() => setIsCheckoutOpen(true)} />
      
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderSuccess={(order) => {
          setConfirmedOrder(order);
        }}
      />

      <OrderConfirmationModal
        isOpen={!!confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
        order={confirmedOrder}
      />

      <SpinWheelModal
        isOpen={isSpinWheelOpen}
        onClose={() => setIsSpinWheelOpen(false)}
      />

      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />

      <ItemDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />

      <ReviewModal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
      />

      <LightboxModal
        item={selectedImage}
        onClose={() => setSelectedImage(null)}
      />

      {/* Floating Action Buttons */}
      <FloatingActions onOpenSpinWheel={() => setIsSpinWheelOpen(true)} />

      {/* Toast Notification Container */}
      <ToastContainer />

    </div>
  );
}

export default App;
