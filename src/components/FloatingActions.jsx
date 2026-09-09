import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { MessageSquare, Phone, ShoppingBag, ArrowUp, Gift } from 'lucide-react';

export const FloatingActions = ({ onOpenSpinWheel }) => {
  const { cartCount, openCart, badgeAnimate } = useCart();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 350);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
      
      {/* Floating Spin & Win Gift Button */}
      <button
        onClick={onOpenSpinWheel}
        className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-400 text-neutral-950 shadow-2xl flex items-center justify-center transition transform hover:scale-110 group relative animate-bounce"
        aria-label="Spin & Win Discount"
        title="Spin & Win Instant Discount!"
      >
        <Gift className="w-6 h-6 text-neutral-950" />
        <span className="absolute left-14 px-3 py-1.5 rounded-xl bg-black/90 text-amber-300 text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg border border-amber-500/30">
          🎁 Spin & Win Coupons!
        </span>
      </button>

      {/* Floating WhatsApp Action */}
      <a
        href="https://wa.me/917838828743?text=Hello%20Bistro%2057%20Gwalior!%20I%20want%20to%20place%20an%20order."
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl flex items-center justify-center transition transform hover:scale-110 group relative"
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="absolute left-14 px-3 py-1.5 rounded-xl bg-black/90 text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
          Chat on WhatsApp
        </span>
      </a>

      {/* Floating Call Action */}
      <a
        href="tel:+917838828743"
        className="w-12 h-12 rounded-full bg-b57-red hover:bg-red-500 text-white shadow-xl flex items-center justify-center transition transform hover:scale-110 group relative"
        aria-label="Call Bistro 57"
      >
        <Phone className="w-5 h-5" />
        <span className="absolute left-14 px-3 py-1.5 rounded-xl bg-black/90 text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
          Call +91 78388 28743
        </span>
      </a>

      {/* Floating Cart Button (Visible if items in cart) */}
      {cartCount > 0 && (
        <button
          onClick={openCart}
          className={`w-12 h-12 rounded-full bg-b57-orange text-white shadow-2xl flex items-center justify-center transition transform hover:scale-110 group relative ${
            badgeAnimate ? 'cart-badge-bounce' : ''
          }`}
          aria-label="Open Cart"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
            {cartCount}
          </span>
          <span className="absolute left-14 px-3 py-1.5 rounded-xl bg-black/90 text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
            View Cart ({cartCount})
          </span>
        </button>
      )}

      {/* Back to top */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="w-12 h-12 rounded-full bg-[#181310] hover:bg-neutral-800 text-amber-300 border border-amber-500/30 shadow-xl flex items-center justify-center transition transform hover:scale-110"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

    </div>
  );
};
