import React from 'react';
import { Sparkles, ArrowRight, Heart, ShieldCheck, Clock, Award } from 'lucide-react';

export const Hero = ({ onOpenReservation }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#1A1411] via-[#241B16] to-b57-cream pt-12 pb-24 lg:pt-16 lg:pb-32 text-b57-cream">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-amber-500/15 rounded-full blur-3xl pointer-events-none hero-glow-pulse"></div>
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none hero-glow-pulse"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left reveal-init reveal-fade-up">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-b57-yellow" />
              <span>Patel Nagar, City Center, Gwalior</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.15] tracking-tight">
              Good Coffee. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-b57-yellow via-b57-orange to-b57-pink">
                Great Food.
              </span> <br />
              Real Moments.
            </h1>

            {/* Sub-headline */}
            <p className="text-b57-cream/85 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Welcome to <strong>Bistro 57 Gwalior</strong> — your cozy neighborhood café serving freshly pulled artisanal coffees, cheesy gourmet pizzas, thick frappes, crisp burgers, and hot momos. 
              <span className="block mt-1 font-semibold text-amber-200">100% Pure Vegetarian. Crafted with love.</span>
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#menu-section"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold bg-gradient-to-r from-b57-orange to-b57-red text-white shadow-xl hover:shadow-b57-glow hover:scale-105 transition transform duration-200"
              >
                <span>Explore Full Menu</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenReservation}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md transition hover:scale-105"
              >
                <span>Reserve a Table</span>
              </button>
            </div>

            {/* Key Trust Signals / Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/10 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-extrabold font-heading text-amber-300">40+</div>
                <div className="text-[11px] text-neutral-300 font-medium">Pure Veg Delights</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-extrabold font-heading text-amber-300">4.8★</div>
                <div className="text-[11px] text-neutral-300 font-medium">Google Rating</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-extrabold font-heading text-amber-300">11-11</div>
                <div className="text-[11px] text-neutral-300 font-medium">Open Daily</div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual & Floating Elements */}
          <div className="lg:col-span-5 relative flex justify-center reveal-init reveal-scale delay-200">
            
            {/* Visual Glass Card Container */}
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl p-3 bg-gradient-to-b from-white/15 to-white/5 border border-white/20 shadow-2xl backdrop-blur-xl overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80"
                alt="Classic Bistro Cold Coffee"
                className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition duration-700"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-2xl pointer-events-none"></div>

              {/* Bottom Card Info */}
              <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
                <div className="flex items-center gap-2 mb-1">
                  <span className="veg-symbol scale-90"></span>
                  <span className="text-xs uppercase font-bold tracking-widest text-amber-300">Signature Creation</span>
                </div>
                <h3 className="font-heading font-extrabold text-xl text-white">Classic Whipped Cold Coffee</h3>
                <p className="text-xs text-neutral-300 mt-1">Dark Arabica roast, creamy chilled dairy & raw Belgian cocoa swirl.</p>
              </div>
            </div>

            {/* Floating Badge 1: 100% Pure Veg */}
            <div className="absolute -top-4 -left-4 sm:-left-6 p-3 rounded-2xl bg-white/95 text-neutral-900 border border-amber-500/20 shadow-xl backdrop-blur-md flex items-center gap-3 animate-bounce-slow">
              <span className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-xl">🌱</span>
              <div>
                <div className="font-heading font-bold text-xs text-emerald-800">100% Pure Veg</div>
                <div className="text-[10px] text-neutral-500">Hygiene First Kitchen</div>
              </div>
            </div>

            {/* Floating Badge 2: Freshly Brewed */}
            <div className="absolute -bottom-5 -right-4 sm:-right-6 p-3 rounded-2xl bg-[#1A1411]/95 text-white border border-amber-500/40 shadow-xl backdrop-blur-md flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-xl">☕</span>
              <div>
                <div className="font-heading font-bold text-xs text-amber-300">Custom Roasted</div>
                <div className="text-[10px] text-neutral-400">Beans ground per cup</div>
              </div>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
};
