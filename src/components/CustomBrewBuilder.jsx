import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { Coffee, Sparkles, Plus, Check, Flame, Sliders } from 'lucide-react';

export const CustomBrewBuilder = () => {
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const BREW_BASES = [
    { id: 'cold-brew', name: 'Classic Cold Brew', price: 130, icon: '🧊' },
    { id: 'double-espresso', name: 'Double Espresso', price: 140, icon: '☕' },
    { id: 'nitro-brew', name: 'Nitro Smooth Brew', price: 160, icon: '⚡' },
    { id: 'frappe-base', name: 'Whipped Frappe Base', price: 150, icon: '🥤' }
  ];

  const MILKS = [
    { id: 'whole-milk', name: 'Whole Farm Milk', price: 0 },
    { id: 'almond-milk', name: 'Artisanal Almond Milk', price: 35 },
    { id: 'oat-milk', name: 'Creamy Oat Milk', price: 40 },
    { id: 'soy-milk', name: 'Organic Soy Milk', price: 25 }
  ];

  const FLAVORS = [
    { id: 'hazelnut', name: 'Roasted Hazelnut', price: 30 },
    { id: 'salted-caramel', name: 'Sea-Salted Caramel', price: 35 },
    { id: 'dark-fudge', name: 'Belgian Dark Fudge', price: 40 },
    { id: 'vanilla', name: 'French Vanilla Bean', price: 25 },
    { id: 'irish-cream', name: 'Irish Cream', price: 35 }
  ];

  const TOPPINGS = [
    { id: 'whipped-cream', name: 'Whipped Cream', price: 20 },
    { id: 'oreo-crumbs', name: 'Crushed Oreos', price: 25 },
    { id: 'nuts-crunch', name: 'Roasted Hazelnut Flakes', price: 25 },
    { id: 'extra-shot', name: 'Extra Espresso Shot', price: 35 }
  ];

  const [selectedBase, setSelectedBase] = useState(BREW_BASES[0]);
  const [selectedMilk, setSelectedMilk] = useState(MILKS[0]);
  const [selectedFlavor, setSelectedFlavor] = useState(FLAVORS[0]);
  const [selectedToppings, setSelectedToppings] = useState([TOPPINGS[0].id]);
  const [sweetness, setSweetness] = useState('Medium (50%)');

  const toggleTopping = (toppingId) => {
    setSelectedToppings((prev) =>
      prev.includes(toppingId) ? prev.filter((id) => id !== toppingId) : [...prev, toppingId]
    );
  };

  const calculateTotalPrice = () => {
    let total = selectedBase.price + selectedMilk.price + selectedFlavor.price;
    selectedToppings.forEach((tId) => {
      const topObj = TOPPINGS.find((t) => t.id === tId);
      if (topObj) total += topObj.price;
    });
    return total;
  };

  const handleAddCustomBrew = () => {
    const chosenToppingNames = selectedToppings
      .map((tId) => TOPPINGS.find((t) => t.id === tId)?.name)
      .filter(Boolean)
      .join(', ');

    const customItem = {
      id: `custom-brew-${Date.now()}`,
      name: `Custom ${selectedBase.name}`,
      price: calculateTotalPrice(),
      rating: 5.0,
      description: `${selectedFlavor.name} syrup, ${selectedMilk.name}, Sweetness: ${sweetness}${chosenToppingNames ? ` + ${chosenToppingNames}` : ''}`,
      image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80',
      tags: ['Custom Brew', selectedFlavor.name, selectedMilk.name]
    };

    addToCart(customItem, 1);
  };

  const totalPrice = calculateTotalPrice();

  return (
    <section id="custom-brew-builder" className="py-20 bg-[#16110d] text-b57-cream border-y border-amber-500/20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Brew Station
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white mb-3">
            Build Your Custom Coffee
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base">
            Craft your personalized artisanal coffee exactly how you love it. Pick your roast base, milk choice, syrup flavor & indulge in gourmet toppings!
          </p>
        </div>

        {/* Builder Interactive Card */}
        <div className="bg-[#1e1713] rounded-3xl border border-amber-500/20 p-6 sm:p-8 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column - Options Selection */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 1. Base Selection */}
            <div>
              <label className="block text-xs font-extrabold text-amber-400 uppercase tracking-wider mb-3">
                1. Select Coffee Base
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {BREW_BASES.map((base) => (
                  <button
                    key={base.id}
                    type="button"
                    onClick={() => setSelectedBase(base)}
                    className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between ${
                      selectedBase.id === base.id
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-md'
                        : 'bg-neutral-900/80 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <span className="text-2xl mb-1">{base.icon}</span>
                    <div>
                      <h4 className="font-heading font-bold text-xs text-white">{base.name}</h4>
                      <span className="text-[11px] text-amber-400 font-extrabold">₹{base.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Milk Choice */}
            <div>
              <label className="block text-xs font-extrabold text-amber-400 uppercase tracking-wider mb-3">
                2. Select Milk Option
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {MILKS.map((milk) => (
                  <button
                    key={milk.id}
                    type="button"
                    onClick={() => setSelectedMilk(milk)}
                    className={`p-3 rounded-xl border text-xs font-bold transition flex items-center justify-between ${
                      selectedMilk.id === milk.id
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                        : 'bg-neutral-900/80 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <span>{milk.name}</span>
                    <span className="text-[10px] text-amber-400">
                      {milk.price > 0 ? `+₹${milk.price}` : 'Included'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Syrup Flavor */}
            <div>
              <label className="block text-xs font-extrabold text-amber-400 uppercase tracking-wider mb-3">
                3. Choose Signature Flavor Syrup
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {FLAVORS.map((flavor) => (
                  <button
                    key={flavor.id}
                    type="button"
                    onClick={() => setSelectedFlavor(flavor)}
                    className={`p-3 rounded-xl border text-xs font-bold transition flex items-center justify-between ${
                      selectedFlavor.id === flavor.id
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                        : 'bg-neutral-900/80 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <span>{flavor.name}</span>
                    <span className="text-[10px] text-amber-400">+₹{flavor.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Toppings */}
            <div>
              <label className="block text-xs font-extrabold text-amber-400 uppercase tracking-wider mb-3">
                4. Select Toppings & Add-ons
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {TOPPINGS.map((topping) => {
                  const isChecked = selectedToppings.includes(topping.id);
                  return (
                    <button
                      key={topping.id}
                      type="button"
                      onClick={() => toggleTopping(topping.id)}
                      className={`p-3 rounded-xl border text-xs font-bold transition flex items-center justify-between ${
                        isChecked
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                          : 'bg-neutral-900/80 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <span>{topping.name}</span>
                      <span className="text-[10px] text-amber-400">+₹{topping.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Sweetness Slider */}
            <div>
              <label className="block text-xs font-extrabold text-amber-400 uppercase tracking-wider mb-2">
                5. Sweetness Level: <span className="text-white">{sweetness}</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['No Sugar (0%)', 'Medium (50%)', 'Full Sweet (100%)'].map((sw) => (
                  <button
                    key={sw}
                    type="button"
                    onClick={() => setSweetness(sw)}
                    className={`py-2 rounded-xl text-xs font-bold border transition ${
                      sweetness === sw
                        ? 'bg-amber-500 text-neutral-950 border-amber-500 font-extrabold'
                        : 'bg-neutral-900 text-neutral-400 border-neutral-800'
                    }`}
                  >
                    {sw}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column - Summary & Add to Cart */}
          <div className="lg:col-span-4 bg-neutral-950 p-6 rounded-2xl border border-white/10 flex flex-col justify-between h-full space-y-6">
            <div>
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider pb-3 border-b border-white/10">
                <Coffee className="w-4 h-4" /> Your Crafted Recipe
              </div>

              <div className="py-4 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Base:</span>
                  <span className="font-bold text-white">{selectedBase.name} (₹{selectedBase.price})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Milk:</span>
                  <span className="font-bold text-white">{selectedMilk.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Syrup:</span>
                  <span className="font-bold text-white">{selectedFlavor.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Sweetness:</span>
                  <span className="font-bold text-amber-300">{sweetness}</span>
                </div>
                {selectedToppings.length > 0 && (
                  <div className="pt-2 border-t border-neutral-800">
                    <span className="text-neutral-400 block mb-1">Toppings:</span>
                    <ul className="space-y-1 pl-2">
                      {selectedToppings.map((tId) => {
                        const topObj = TOPPINGS.find((t) => t.id === tId);
                        return (
                          <li key={tId} className="text-[11px] text-emerald-400 flex justify-between">
                            <span>• {topObj?.name}</span>
                            <span>+₹{topObj?.price}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-4">
              <div className="flex justify-between items-center text-lg font-extrabold text-white">
                <span>Calculated Price</span>
                <span className="text-amber-400 font-heading text-2xl">₹{totalPrice}</span>
              </div>

              <button
                type="button"
                onClick={handleAddCustomBrew}
                className="w-full py-4 rounded-2xl font-extrabold text-sm bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-neutral-950 flex items-center justify-center gap-2 shadow-xl hover:shadow-amber-500/20 transition hover:scale-[1.02]"
              >
                <Plus className="w-4 h-4 text-neutral-950" />
                <span>Add Custom Brew to Cart</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
