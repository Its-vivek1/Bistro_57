import React, { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { Sparkles, Plus, Check } from 'lucide-react';
import { MENU_ITEMS } from '../data/menuData';

export const CoffeeAdvisor = () => {
  const { addToCart } = useCart();
  const [temperature, setTemperature] = useState('cold');
  const [strength, setStrength] = useState('creamy');
  const [flavor, setFlavor] = useState('classic');

  // Compute recommendation based on choices
  const recommendation = useMemo(() => {
    if (temperature === 'cold') {
      if (flavor === 'hazelnut') {
        return {
          id: 'cc-2',
          name: 'Hazelnut Cold Coffee',
          price: 169,
          notes: 'Silky whipped cold coffee with roasted hazelnut syrup & hazelnut dust.',
          image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80',
          matchScore: '99% Taste Match'
        };
      }
      if (flavor === 'caramel') {
        return {
          id: 'cc-4',
          name: 'Caramel Macchiato Chilled',
          price: 179,
          notes: 'Layered iced latte with vanilla, rich espresso float & sea salt caramel drizzle.',
          image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=600&q=80',
          matchScore: '98% Taste Match'
        };
      }
      if (flavor === 'chocolate' || strength === 'indulgent') {
        return {
          id: 'cc-3',
          name: 'Brownie Cold Coffee',
          price: 189,
          notes: 'Fresh walnut brownie blended with thick cold coffee & dark chocolate sauce.',
          image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80',
          matchScore: '97% Taste Match'
        };
      }
      return {
        id: 'cc-1',
        name: 'Classic Bistro Cold Coffee',
        price: 149,
        notes: 'Our legendary thick whipped cold brew with creamy milk & cocoa swirl.',
        image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80',
        matchScore: '100% Perfect Match'
      };
    } else {
      // Hot brews
      if (strength === 'bold') {
        return {
          id: 'hc-5',
          name: 'Pure Bold Americano',
          price: 119,
          notes: 'Hand-pulled double espresso shot with hot water for pure coffee lovers.',
          image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
          matchScore: '99% Bold Match'
        };
      }
      if (flavor === 'chocolate' || strength === 'indulgent') {
        return {
          id: 'hc-4',
          name: 'Café Mocha Hot',
          price: 169,
          notes: 'Belgian dark chocolate ganache with steamed milk & espresso.',
          image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=600&q=80',
          matchScore: '98% Chocolate Match'
        };
      }
      return {
        id: 'hc-1',
        name: 'Signature Cappuccino',
        price: 139,
        notes: 'Equal parts freshly pulled espresso, velvety milk & thick cocoa microfoam.',
        image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80',
        matchScore: '98% Balanced Match'
      };
    }
  }, [temperature, strength, flavor]);

  const coffeeVarieties = [
    { name: 'Classic Cold Coffee', icon: '🧊', price: 149, subtitle: 'Our legendary thick chilled brew', tag: 'Best Seller' },
    { name: 'Artisan Cappuccino', icon: '☕', price: 139, subtitle: 'Rich foam & cocoa dust', tag: 'Espresso' },
    { name: 'Café Latte', icon: '🥛', price: 149, subtitle: 'Silky steamed milk & espresso', tag: 'Smooth' },
    { name: 'Hazelnut Coffee', icon: '🌰', price: 159, subtitle: 'Roasted nutty warmth', tag: 'Aromatic' },
    { name: 'Café Mocha', icon: '🍫', price: 169, subtitle: 'Belgian chocolate infusion', tag: 'Decadent' },
    { name: 'Irish Coffee', icon: '🍀', price: 169, subtitle: 'Non-alcoholic Irish cream notes', tag: 'Signature' },
    { name: 'Caramel Macchiato', icon: '🍮', price: 179, subtitle: 'Sea salt caramel drizzle', tag: 'Chilled/Hot' },
    { name: 'Cinnamon Brew', icon: '🌿', price: 149, subtitle: 'Ceylon cinnamon infusion', tag: 'Warm Spice' },
    { name: 'Classic Americano', icon: '☕', price: 119, subtitle: 'Pure bold double espresso', tag: 'Bold' }
  ];

  return (
    <section id="coffee-ritual" className="py-24 bg-b57-brownDark text-b57-cream relative overflow-hidden">
      
      {/* Background radial atmosphere */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-amber-600/15 blur-3xl pointer-events-none hero-glow-pulse"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-red-600/15 blur-3xl pointer-events-none hero-glow-pulse"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Interactive Coffee Customizer / Advisor Tool */}
        <div className="mb-20 p-8 sm:p-10 rounded-3xl bg-neutral-900/90 border border-white/10 shadow-2xl backdrop-blur-md reveal-init reveal-scale">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Advisor Controls */}
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs uppercase font-bold tracking-widest text-amber-400 block">
                Interactive Sommelier
              </span>
              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white">
                Find Your Perfect Bistro 57 Brew
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300">
                Choose your mood, temperature, and flavor profile to get a personalized barista recommendation.
              </p>

              <div className="space-y-4 pt-2">
                {/* Temperature selector */}
                <div>
                  <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
                    Temperature Preference
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setTemperature('cold')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition ${
                        temperature === 'cold'
                          ? 'bg-b57-orange text-white border-b57-orange shadow-md'
                          : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:bg-neutral-700'
                      }`}
                    >
                      🧊 Chilled / Cold Brew
                    </button>
                    <button
                      onClick={() => setTemperature('hot')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition ${
                        temperature === 'hot'
                          ? 'bg-b57-orange text-white border-b57-orange shadow-md'
                          : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:bg-neutral-700'
                      }`}
                    >
                      ☕ Warm / Steamed
                    </button>
                  </div>
                </div>

                {/* Strength selector */}
                <div>
                  <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
                    Texture & Strength
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {[
                      { id: 'creamy', label: 'Silky & Creamy' },
                      { id: 'bold', label: 'Bold Espresso' },
                      { id: 'indulgent', label: 'Sweet & Indulgent' }
                    ].map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setStrength(s.id)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition ${
                          strength === s.id
                            ? 'bg-b57-orange text-white border-b57-orange shadow-md'
                            : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:bg-neutral-700'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Flavor select */}
                <div>
                  <label htmlFor="flavor-select" className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
                    Flavor Infusion
                  </label>
                  <select
                    id="flavor-select"
                    value={flavor}
                    onChange={(e) => setFlavor(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-xs text-white outline-none focus:border-b57-orange"
                  >
                    <option value="classic">Classic Roasted Arabica</option>
                    <option value="hazelnut">Roasted Hazelnut Nutty</option>
                    <option value="caramel">Sea Salt Caramel</option>
                    <option value="chocolate">Belgian Chocolate Fudge</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Right Recommendation Card */}
            <div className="lg:col-span-6 flex flex-col justify-between p-6 rounded-2xl bg-neutral-950/80 border border-amber-500/20 advisor-card-animate">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                    {recommendation.matchScore}
                  </span>
                  <span className="text-2xl font-extrabold text-amber-300 font-heading">
                    ₹{recommendation.price}
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-neutral-800 flex-shrink-0">
                    <img
                      src={recommendation.image}
                      alt={recommendation.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-lg text-white">
                      {recommendation.name}
                    </h4>
                    <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                      {recommendation.notes}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() =>
                  addToCart({
                    id: recommendation.id,
                    name: recommendation.name,
                    price: recommendation.price,
                    image: recommendation.image
                  })
                }
                className="mt-4 w-full py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-b57-orange to-b57-red text-white flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] transition"
              >
                <Plus className="w-4 h-4" />
                <span>Add Recommended Brew to Cart (₹{recommendation.price})</span>
              </button>
            </div>

          </div>
        </div>

        {/* 9 Dedicated Coffee Varieties */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6 reveal-init reveal-fade-left">
            <span className="inline-block px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
              Artisanal Roasts & Brews
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight">
              Your Daily <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-300">
                Coffee Ritual.
              </span>
            </h2>
            <p className="text-b57-cream/80 text-base leading-relaxed">
              At <strong>Bistro 57</strong>, coffee is an art. Every single cup begins with ethically sourced, custom-roasted Arabica-Robusta beans, calibrated espresso shots, and velvety textured milk.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs">✓</span>
                <span className="text-sm text-b57-cream/90 font-medium">Hand-pulled Double Shots & Cold Steeped Brews</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs">✓</span>
                <span className="text-sm text-b57-cream/90 font-medium">Flavours: Hazelnut, Irish Cream, Caramel & Cinnamon</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs">✓</span>
                <span className="text-sm text-b57-cream/90 font-medium">Thick Whipped Iced Coffee Classics</span>
              </div>
            </div>

            <a
              href="#menu-section"
              className="inline-block px-7 py-3 rounded-full text-xs font-bold bg-b57-orange text-white hover:bg-b57-red transition transform hover:scale-105"
            >
              Browse Full Menu
            </a>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4 reveal-init reveal-fade-right delay-200">
            {coffeeVarieties.map((v, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-neutral-900/80 border border-white/10 hover:border-amber-500/40 flex flex-col justify-between group transition duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition">
                  {v.icon}
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-white group-hover:text-amber-300 transition">
                    {v.name}
                  </h4>
                  <p className="text-[11px] text-neutral-400 mt-1 line-clamp-1">{v.subtitle}</p>
                </div>
                <div className="mt-4 pt-2 border-t border-white/10 flex justify-between items-center text-xs">
                  <span className="text-amber-400 font-bold">₹{v.price}</span>
                  <span className="text-[10px] text-neutral-400">{v.tag}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
