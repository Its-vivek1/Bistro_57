import React, { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { Search, Plus, Star, X } from 'lucide-react';
import { SUPER_CATEGORIES, SUB_CATEGORIES, MENU_ITEMS } from '../data/menuData';

export const MenuSection = ({ onSelectItem }) => {
  const { addToCart } = useCart();
  const [selectedSuper, setSelectedSuper] = useState('all');
  const [selectedSub, setSelectedSub] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Handle super-category change
  const handleSuperChange = (superId) => {
    setSelectedSuper(superId);
    setSelectedSub('all');
  };

  // Filter available sub-categories based on selected super-category
  const visibleSubCategories = useMemo(() => {
    if (selectedSuper === 'all') {
      return SUB_CATEGORIES;
    }
    return SUB_CATEGORIES.filter((sub) => sub.id === 'all' || sub.superId === selectedSuper);
  }, [selectedSuper]);

  // Filter menu items by search, super-category and sub-category
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchTags = item.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchName && !matchDesc && !matchTags) return false;
      }

      // Super category filter
      if (selectedSuper !== 'all' && item.superCategory !== selectedSuper) {
        return false;
      }

      // Sub category filter
      if (selectedSub !== 'all' && item.category !== selectedSub) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedSuper, selectedSub]);

  return (
    <section id="menu-section" className="py-24 bg-b57-creamSurface relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 reveal-init reveal-fade-up">
          <span className="inline-block px-3.5 py-1 rounded-full bg-b57-orange/15 text-b57-orange text-xs font-bold uppercase tracking-wider mb-2">
            100% Pure Vegetarian Kitchen
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-b57-brown mb-3">
            Explore Our Menu by Category
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base font-normal">
            Select a category below or search for your favourite coffee, pizzas, pastas, shakes, burgers, momos and desserts.
          </p>
        </div>

        {/* Search Bar & Stats */}
        <div className="max-w-xl mx-auto mb-8 relative reveal-init reveal-fade-up delay-100">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pizza, cold coffee, biscoff, burger, pasta, momos..."
              className="w-full pl-12 pr-10 py-3.5 rounded-full bg-white border border-neutral-200 focus:border-b57-orange focus:ring-2 focus:ring-b57-orange/20 text-sm text-neutral-800 shadow-sm outline-none transition"
            />
            <Search className="absolute left-4 w-5 h-5 text-neutral-400 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 text-neutral-400 hover:text-neutral-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="flex items-center justify-between mt-2 px-3 text-xs text-neutral-500">
            <span>Showing {filteredItems.length} delicious vegetarian items</span>
            <span className="flex items-center gap-1 font-semibold text-emerald-800">
              <span className="veg-symbol scale-75"></span> Pure Vegetarian
            </span>
          </div>
        </div>

        {/* Super-Category Horizontal Group Tabs */}
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-3 mb-6 -mx-4 px-4 sm:mx-0 sm:px-0 reveal-init reveal-fade-up delay-200">
          {SUPER_CATEGORIES.map((cat) => {
            const isActive = selectedSuper === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleSuperChange(cat.id)}
                className={`flex-shrink-0 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition duration-200 ${
                  isActive
                    ? 'bg-[#1A1411] text-amber-300 shadow-md border border-amber-500/40'
                    : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name.replace(/^[^\s]+\s/, '')}</span>
              </button>
            );
          })}
        </div>

        {/* Sub-Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-10 -mx-4 px-4 sm:mx-0 sm:px-0">
          {visibleSubCategories.map((sub) => {
            const isActive = selectedSub === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => setSelectedSub(sub.id)}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                  isActive
                    ? 'bg-b57-orange text-white shadow-sm'
                    : 'bg-amber-100/60 text-amber-900 hover:bg-amber-200/60 border border-amber-900/10'
                }`}
              >
                {sub.name}
              </button>
            );
          })}
        </div>

        {/* Menu Food Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-neutral-200 p-8 max-w-md mx-auto">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="font-heading font-bold text-lg text-neutral-800">No items found</h3>
            <p className="text-xs text-neutral-500 mt-1 mb-4">
              We couldn't find any dishes matching "{searchQuery}". Try searching for pizza, coffee or burger.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSuper('all');
                setSelectedSub('all');
              }}
              className="px-5 py-2 rounded-full text-xs font-bold bg-b57-orange text-white"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden border border-amber-900/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col justify-between group menu-card-pop"
              >
                <div>
                  {/* Card Image */}
                  <div
                    className="relative h-44 w-full overflow-hidden cursor-pointer bg-neutral-100"
                    onClick={() => onSelectItem && onSelectItem(item)}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80';
                      }}
                    />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap max-w-[80%]">
                      <span className="veg-symbol shadow-sm" title="100% Pure Vegetarian"></span>
                      {item.badge && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500 text-white shadow-sm">
                          {item.badge}
                        </span>
                      )}
                      {(item.tags.some(t => t.toLowerCase().includes('spicy') || t.toLowerCase().includes('chilli') || t.toLowerCase().includes('peri')) || item.category === 'pizzas' || item.category === 'pastas') && (
                        <span className="px-1.5 py-0.5 rounded-full text-[9px] font-extrabold bg-red-500/90 text-white shadow-sm flex items-center gap-0.5" title="Spicy Delight">
                          🌶️ Spicy
                        </span>
                      )}
                      {(item.category === 'cold-coffee' || item.category === 'hot-coffee' || item.category === 'sandwiches-garlic-bread' || item.category === 'momos') && (
                        <span className="px-1.5 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-700 text-white shadow-sm flex items-center gap-0.5" title="Jain Friendly Option">
                          🌿 Jain
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-2.5 right-2.5 bg-black/75 backdrop-blur-md text-amber-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                      <span>{item.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4">
                    <h3
                      className="font-heading font-bold text-base text-neutral-900 group-hover:text-b57-red transition cursor-pointer line-clamp-1"
                      onClick={() => onSelectItem && onSelectItem(item)}
                    >
                      {item.name}
                    </h3>
                    <p className="text-neutral-500 text-xs mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Card Action & Price */}
                <div className="px-4 pb-4 pt-2 flex items-center justify-between border-t border-neutral-100">
                  <span className="text-lg font-extrabold font-heading text-neutral-900">
                    ₹{item.price}
                  </span>
                  <button
                    onClick={() => addToCart(item)}
                    className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-bold bg-b57-orange hover:bg-b57-red text-white shadow-sm transition transform hover:scale-105"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
