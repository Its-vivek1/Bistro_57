import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, Star, Heart } from 'lucide-react';

export const ItemDetailModal = ({ item, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!item) return null;

  const handleAdd = () => {
    addToCart(item, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-lg rounded-3xl bg-white text-neutral-900 border border-amber-900/10 shadow-2xl overflow-hidden animate-scaleIn">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Item Image */}
          <div className="relative h-64 w-full bg-neutral-100">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80';
              }}
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="veg-symbol shadow-md"></span>
              {item.badge && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-white shadow-md">
                  {item.badge}
                </span>
              )}
            </div>

            <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-md text-amber-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              <span>{item.rating ? item.rating.toFixed(1) : '5.0'}</span>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-amber-800">
                100% Pure Vegetarian
              </span>
              <h3 className="font-heading font-bold text-2xl text-b57-brown mt-0.5">
                {item.name}
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed mt-2">
                {item.description}
              </p>
            </div>

            {/* Tags */}
            {item.tags && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-semibold"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Price & Quantity & Add to Cart */}
            <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-neutral-400 block font-medium">Total Price</span>
                <span className="text-2xl font-extrabold font-heading text-neutral-900">
                  ₹{item.price * quantity}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Quantity Controls */}
                <div className="flex items-center gap-2 bg-neutral-100 rounded-2xl p-1.5 border border-neutral-200">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-7 h-7 rounded-xl bg-white shadow-sm flex items-center justify-center text-neutral-700 hover:bg-neutral-50 transition"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm font-bold px-2 text-neutral-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-7 h-7 rounded-xl bg-white shadow-sm flex items-center justify-center text-neutral-700 hover:bg-neutral-50 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className="px-6 py-3 rounded-full text-xs font-bold bg-gradient-to-r from-b57-orange to-b57-red text-white shadow-md hover:shadow-lg transition transform hover:scale-105"
                >
                  + Add to Cart
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
