import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, ChevronDown, Menu, X, Calendar } from 'lucide-react';
import { SUPER_CATEGORIES } from '../data/menuData';

export const Navbar = ({ onOpenReservation }) => {
  const { cartCount, openCart, badgeAnimate } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled ? 'navbar-scrolled-theme' : 'navbar-main-theme'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Title */}
          <a href="#" className="flex items-center gap-3.5 group">
            <div className="relative w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-b57-orange via-b57-yellow to-b57-pink shadow-md group-hover:scale-105 transition duration-300">
              <img
                src="/assets/images/bistro57-logo.png"
                alt="Bistro 57 Logo"
                className="w-full h-full rounded-full object-cover bg-white"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=150&q=80';
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight text-white leading-none">
                BISTRO <span className="text-b57-orange">57</span>
              </span>
              <span className="text-[10px] font-bold tracking-widest text-amber-300 uppercase mt-0.5">
                Est. Gwalior • 100% Pure Veg
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <a href="#" className="nav-link-item">Home</a>
            <a href="#about" className="nav-link-item">About</a>
            <a href="#fan-favourites" className="nav-link-item">Favourites</a>
            
            {/* Menu Dropdown */}
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <a
                href="#menu-section"
                className="nav-link-item"
                onClick={(e) => {
                  if (window.innerWidth < 1024) {
                    e.preventDefault();
                    setIsDropdownOpen(!isDropdownOpen);
                  }
                }}
              >
                <span>Menu</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-amber-300' : ''}`} />
              </a>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 w-64 pt-2 animate-fadeIn z-50">
                  <div className="bg-[#181310] border border-amber-500/30 rounded-2xl shadow-2xl p-2.5 backdrop-blur-xl">
                    <div className="text-[10px] uppercase font-bold tracking-wider text-amber-400/80 px-3 py-1.5 border-b border-white/10">
                      Super Categories
                    </div>
                    {SUPER_CATEGORIES.map((cat) => (
                      <a
                        key={cat.id}
                        href="#menu-section"
                        className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-neutral-200 hover:text-amber-300 hover:bg-white/10 transition"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <span className="flex items-center gap-2">
                          <span>{cat.icon}</span>
                          <span>{cat.name.replace(/^[^\s]+\s/, '')}</span>
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/10 text-neutral-400">
                          {cat.count}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <a href="#coffee-ritual" className="nav-link-item">Coffee Ritual</a>
            <a href="#gallery-section" className="nav-link-item">Gallery</a>
            <a href="#reviews-section" className="nav-link-item">Reviews</a>
            <a href="#location-section" className="nav-link-item">Location</a>
          </nav>

          {/* Desktop Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* Cart Trigger */}
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-full bg-white/10 border border-white/15 text-b57-cream hover:text-white hover:bg-white/20 transition transform hover:scale-105"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-amber-300" />
              {cartCount > 0 && (
                <span
                  className={`absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-b57-orange text-white font-bold text-[11px] flex items-center justify-center shadow-md border-2 border-[#181310] ${
                    badgeAnimate ? 'cart-badge-bounce' : ''
                  }`}
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* Book Table Button */}
            <button
              onClick={onOpenReservation}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold border-1.5 border-amber-400/50 text-amber-200 hover:text-white hover:bg-amber-500/20 hover:border-amber-400 transition"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Book Table</span>
            </button>

            {/* Order Online Button */}
            <a
              href="#menu-section"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-b57-orange to-b57-red text-white shadow-lg hover:shadow-b57-glow hover:scale-105 transition"
            >
              <span>Order Online</span>
              <span>→</span>
            </a>

          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            
            {/* Mobile Cart Trigger */}
            <button
              onClick={openCart}
              className="relative p-2 rounded-full bg-white/10 text-white"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-amber-300" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-b57-orange text-white font-bold text-[10px] flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#16110D] border-b border-amber-500/20 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <nav className="flex flex-col gap-1">
            <a
              href="#"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-bold text-neutral-200 hover:text-amber-300 hover:bg-white/10 transition"
            >
              Home
            </a>
            <a
              href="#about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-bold text-neutral-200 hover:text-amber-300 hover:bg-white/10 transition"
            >
              About
            </a>
            <a
              href="#fan-favourites"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-bold text-neutral-200 hover:text-amber-300 hover:bg-white/10 transition"
            >
              Favourites
            </a>
            <a
              href="#menu-section"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-bold text-neutral-200 hover:text-amber-300 hover:bg-white/10 transition"
            >
              Menu Explorer
            </a>
            <a
              href="#coffee-ritual"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-bold text-neutral-200 hover:text-amber-300 hover:bg-white/10 transition"
            >
              Coffee Ritual
            </a>
            <a
              href="#gallery-section"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-bold text-neutral-200 hover:text-amber-300 hover:bg-white/10 transition"
            >
              Gallery
            </a>
            <a
              href="#reviews-section"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-bold text-neutral-200 hover:text-amber-300 hover:bg-white/10 transition"
            >
              Reviews
            </a>
            <a
              href="#location-section"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-bold text-neutral-200 hover:text-amber-300 hover:bg-white/10 transition"
            >
              Location & Hours
            </a>
          </nav>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full py-3 rounded-xl font-bold text-xs border border-amber-400/40 text-amber-300 text-center"
            >
              📅 Reserve Table
            </button>
            <a
              href="#menu-section"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-b57-orange to-b57-red text-white text-center shadow-md"
            >
              Order Online on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
