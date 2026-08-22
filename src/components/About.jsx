import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

export const About = ({ onOpenReservation }) => {
  return (
    <section id="about" className="py-24 bg-b57-creamSurface relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Collage with Retro Frame */}
          <div className="lg:col-span-6 relative reveal-init reveal-fade-left">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Image */}
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] bg-neutral-200">
                <img
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80"
                  alt="Bistro 57 Warm Ambiance"
                  className="w-full h-full object-cover hover:scale-105 transition duration-700"
                />
              </div>

              {/* Overlapping Secondary Image */}
              <div className="hidden sm:block absolute -bottom-8 -right-6 w-52 h-44 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80"
                  alt="Fresh Artisan Pizza"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Established Stamp */}
              <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-[#1A1411] text-amber-300 border-2 border-amber-500/40 p-2 flex flex-col items-center justify-center text-center shadow-xl">
                <span className="text-[10px] uppercase font-bold tracking-widest text-white/80">Est. Gwalior</span>
                <span className="font-heading font-extrabold text-sm text-b57-orange">B57</span>
                <span className="text-[8px] text-amber-400 font-semibold">Pure Veg</span>
              </div>

            </div>
          </div>

          {/* Right Column: Story & 4 Benefit Cards */}
          <div className="lg:col-span-6 space-y-6 reveal-init reveal-fade-right delay-200">
            
            <div>
              <span className="inline-block px-3.5 py-1 rounded-full bg-b57-orange/15 text-b57-orange text-xs font-bold uppercase tracking-wider mb-2">
                Our Story & Philosophy
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-b57-brown leading-tight">
                Crafting Joy, One Cup & Slice at a Time.
              </h2>
            </div>

            <p className="text-neutral-700 text-sm sm:text-base leading-relaxed">
              Located in the heart of Patel Nagar, City Center, <strong>Bistro 57 Gwalior</strong> was created as a sanctuary for coffee lovers, food enthusiasts, and friends looking for authentic conversations over exceptional vegetarian food.
            </p>

            <p className="text-neutral-700 text-sm sm:text-base leading-relaxed">
              From our signature whipped cold coffees to hand-tossed artisan pizzas and crispy wok-tossed Indo-Chinese starters, everything is prepared fresh upon ordering in a 100% hygienic, pure vegetarian kitchen.
            </p>

            {/* 4 Feature Cards Grid */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-amber-900/10 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300">
                <div className="text-2xl mb-1">🌱</div>
                <h4 className="font-bold text-sm text-b57-brown font-heading">Vegetarian Menu</h4>
                <p className="text-xs text-neutral-500 mt-0.5">100% Pure vegetarian recipes crafted with hygiene.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-amber-900/10 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300">
                <div className="text-2xl mb-1">🍕</div>
                <h4 className="font-bold text-sm text-b57-brown font-heading">Freshly Prepared</h4>
                <p className="text-xs text-neutral-500 mt-0.5">Cooked hot & fresh on every order, never pre-made.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-amber-900/10 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300">
                <div className="text-2xl mb-1">☕</div>
                <h4 className="font-bold text-sm text-b57-brown font-heading">Coffee & Shakes</h4>
                <p className="text-xs text-neutral-500 mt-0.5">Classic cold coffees, thick frappes & coolers.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-amber-900/10 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300">
                <div className="text-2xl mb-1">✨</div>
                <h4 className="font-bold text-sm text-b57-brown font-heading">Great Hangout</h4>
                <p className="text-xs text-neutral-500 mt-0.5">Cozy ambiance, relaxing music & comfy seating.</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={onOpenReservation}
                className="px-6 py-3 rounded-full text-xs font-bold bg-gradient-to-r from-b57-orange to-b57-red text-white shadow-md hover:shadow-lg transition"
              >
                Reserve Your Table
              </button>
              <a
                href="#menu-section"
                className="px-6 py-3 rounded-full text-xs font-bold bg-white text-b57-brown border border-amber-900/20 hover:bg-neutral-50 transition"
              >
                Explore Offerings
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
