import React from 'react';
import { useCart } from '../context/CartContext';
import { Star, Plus, ArrowRight } from 'lucide-react';
import { MENU_ITEMS } from '../data/menuData';

// Select 6 Signature Items
const FAVOURITE_IDS = ['pz-1', 'cc-1', 'sf-1', 'bg-1', 'ps-1', 'st-1'];

export const FanFavourites = ({ onSelectItem }) => {
  const { addToCart } = useCart();
  const favouriteItems = MENU_ITEMS.filter((item) => FAVOURITE_IDS.includes(item.id));

  return (
    <section id="fan-favourites" className="py-24 bg-b57-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 reveal-init reveal-fade-up">
          <div>
            <span className="inline-block px-3.5 py-1 rounded-full bg-b57-red/10 text-b57-red text-xs font-bold uppercase tracking-wider mb-2">
              Signature Bestsellers
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-b57-brown">
              Fan Favourites
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base mt-2 max-w-lg">
              Our most-loved café creations, tried and celebrated hundreds of times by our Gwalior guests.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <a
              href="#menu-section"
              className="inline-flex items-center gap-2 font-bold text-sm text-b57-red hover:text-b57-brown transition group"
            >
              <span>View All 13 Categories</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </a>
          </div>
        </div>

        {/* 6 Large Food Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favouriteItems.map((item, index) => (
            <div
              key={item.id}
              className={`bg-white rounded-3xl overflow-hidden border border-amber-900/10 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group reveal-init reveal-fade-up delay-${(index % 3 + 1) * 100}`}
            >
              {/* Card Image Wrap */}
              <div>
                <div
                  className="relative h-56 w-full overflow-hidden cursor-pointer bg-neutral-100"
                  onClick={() => onSelectItem && onSelectItem(item)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition duration-700"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80';
                    }}
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="veg-symbol shadow-sm"></span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500 text-white shadow-sm">
                      {item.badge}
                    </span>
                  </div>

                  {/* Star Rating Badge */}
                  <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md text-amber-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                    <span>{item.rating.toFixed(1)}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <span className="text-[11px] uppercase font-bold tracking-wider text-amber-800">
                    {item.tags[0] || 'Artisanal'}
                  </span>
                  <h3
                    className="text-xl font-bold font-heading text-neutral-900 mt-1 mb-2 group-hover:text-b57-red transition cursor-pointer"
                    onClick={() => onSelectItem && onSelectItem(item)}
                  >
                    {item.name}
                  </h3>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Card Footer: Price & Add Button */}
              <div className="px-6 pb-6 pt-3 flex items-center justify-between border-t border-neutral-100">
                <div>
                  <span className="text-[11px] text-neutral-400 block font-medium">Price</span>
                  <span className="text-2xl font-extrabold font-heading text-neutral-900">
                    ₹{item.price}
                  </span>
                </div>

                <button
                  onClick={() => addToCart(item)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-b57-orange to-b57-red text-white shadow-md hover:shadow-lg hover:scale-105 transition transform duration-200"
                >
                  <Plus className="w-4 h-4" />
                  <span>Order Now</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
