import React from 'react';
import { useCart } from '../context/CartContext';
import { Plus } from 'lucide-react';
import { MENU_ITEMS } from '../data/menuData';

const DRINK_IDS = ['mc-1', 'mc-2', 'sf-2', 'sf-4'];

export const DrinksShowcase = ({ onSelectItem }) => {
  const { addToCart } = useCart();
  const drinks = MENU_ITEMS.filter((item) => DRINK_IDS.includes(item.id));

  return (
    <section id="drinks-section" className="py-20 bg-b57-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12 reveal-init reveal-fade-up">
          <span className="inline-block px-3.5 py-1 rounded-full bg-b57-pink/10 text-b57-pink text-xs font-bold uppercase tracking-wider mb-2">
            Vibrant Sips & Coolers
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-b57-brown mb-3">
            Coolers, Frappes & Shakes
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base">
            Hand-shaken sparkling fruit mojitos, thick monster shakes & ice-blended gourmet frappes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {drinks.map((drink, idx) => (
            <div
              key={drink.id}
              className={`bg-white rounded-3xl overflow-hidden p-5 border border-amber-900/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col justify-between group reveal-init reveal-fade-up delay-${(idx + 1) * 100}`}
            >
              <div>
                <div
                  className="h-48 rounded-2xl overflow-hidden mb-4 relative cursor-pointer bg-neutral-100"
                  onClick={() => onSelectItem && onSelectItem(drink)}
                >
                  <img
                    src={drink.image}
                    alt={drink.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/70 text-white text-[10px] font-bold backdrop-blur-md">
                    {drink.tags[0] || 'Chilled'}
                  </span>
                </div>
                <h4
                  className="font-heading font-bold text-lg text-neutral-900 group-hover:text-b57-red transition cursor-pointer"
                  onClick={() => onSelectItem && onSelectItem(drink)}
                >
                  {drink.name}
                </h4>
                <p className="text-xs text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
                  {drink.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-neutral-100">
                <span className="font-extrabold text-lg font-heading text-neutral-900">
                  ₹{drink.price}
                </span>
                <button
                  onClick={() => addToCart(drink)}
                  className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-bold bg-b57-orange text-white hover:bg-b57-red transition transform hover:scale-105"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
