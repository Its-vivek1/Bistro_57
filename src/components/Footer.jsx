import React from 'react';
import { Phone, MapPin, Clock, Heart } from 'lucide-react';

export const Footer = ({ onOpenReservation }) => {
  return (
    <footer className="bg-[#120D0A] text-b57-cream border-t border-amber-500/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-b57-orange via-b57-yellow to-b57-pink">
                <img
                  src="/assets/images/bistro57-logo.png"
                  alt="B57 Logo"
                  className="w-full h-full rounded-full object-cover bg-white"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=150&q=80';
                  }}
                />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-xl text-white">
                  BISTRO <span className="text-b57-orange">57</span>
                </h3>
                <span className="text-[10px] text-amber-300 font-bold uppercase tracking-widest block">
                  100% Pure Veg • Gwalior
                </span>
              </div>
            </div>

            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
              Gwalior's ultimate pure vegetarian café destination for artisanal cold coffees, hand-tossed pizzas, crispy momos, thick shakes, and memorable conversations.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <span className="veg-symbol scale-75"></span>
              <span>100% Pure Vegetarian Certified</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><a href="#" className="hover:text-amber-300 transition">Home</a></li>
              <li><a href="#about" className="hover:text-amber-300 transition">Our Story</a></li>
              <li><a href="#fan-favourites" className="hover:text-amber-300 transition">Fan Favourites</a></li>
              <li><a href="#menu-section" className="hover:text-amber-300 transition">Menu Explorer</a></li>
              <li><a href="#coffee-ritual" className="hover:text-amber-300 transition">Coffee Ritual</a></li>
              <li><a href="#gallery-section" className="hover:text-amber-300 transition">Photo Gallery</a></li>
              <li><a href="#reviews-section" className="hover:text-amber-300 transition">Guest Reviews</a></li>
            </ul>
          </div>

          {/* Col 3: Popular Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Must-Try Dishes
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><a href="#menu-section" className="hover:text-amber-300 transition">Classic Bistro Cold Coffee</a></li>
              <li><a href="#menu-section" className="hover:text-amber-300 transition">Tandoori Paneer Tikka Pizza</a></li>
              <li><a href="#menu-section" className="hover:text-amber-300 transition">Lotus Biscoff Thick Frappe</a></li>
              <li><a href="#menu-section" className="hover:text-amber-300 transition">Creamy Alfredo White Pasta</a></li>
              <li><a href="#menu-section" className="hover:text-amber-300 transition">Crispy Kurkure Fried Momos</a></li>
              <li><a href="#menu-section" className="hover:text-amber-300 transition">Double Loaded Paneer Burger</a></li>
            </ul>
          </div>

          {/* Col 4: Visit & Timings */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Visit & Timings
            </h4>
            <div className="space-y-2.5 text-xs text-neutral-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-b57-orange flex-shrink-0 mt-0.5" />
                <span>B-99, Near Green Garden, Patel Nagar, City Center, Gwalior – 474011</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>11:00 AM – 11:00 PM (Daily)</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-b57-red flex-shrink-0" />
                <a href="tel:+917838828743" className="text-amber-300 font-bold hover:underline">
                  +91 78388 28743
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenReservation}
                className="w-full py-2.5 rounded-xl font-bold text-xs bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition"
              >
                📅 Book a Table
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} Bistro 57 Gwalior. All rights reserved. 100% Pure Vegetarian.
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-b57-red fill-b57-red" />
            <span>for Gwalior food lovers</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
