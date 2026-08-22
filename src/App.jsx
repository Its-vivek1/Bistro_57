import React, { useState } from 'react';
import { useScrollReveal } from './hooks/useScrollReveal';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { FanFavourites } from './components/FanFavourites';
import { MenuSection } from './components/MenuSection';
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
import { FloatingActions } from './components/FloatingActions';
import { ToastContainer } from './components/ToastContainer';

export function App() {
  useScrollReveal();

  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="min-h-screen bg-b57-cream text-b57-brown flex flex-col font-sans">
      
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
      <CartDrawer />
      
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
      <FloatingActions />

      {/* Toast Notification Container */}
      <ToastContainer />

    </div>
  );
}

export default App;
