import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus, ShoppingBag, Send, ArrowRight, Tag, Check, Sparkles } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const CartDrawer = ({ onOpenCheckout }) => {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    discountAmount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    gstAmount,
    grandTotal,
    generateWhatsAppMessage
  } = useCart();

  const { addToast } = useToast();
  const [couponInput, setCouponInput] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderType, setOrderType] = useState('Dine-In');
  const [cookingNotes, setCookingNotes] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const result = applyCoupon(couponInput);
    if (result.success) {
      addToast(result.message, 'success');
      setCouponInput('');
    } else {
      addToast(result.message, 'error');
    }
  };

  const handleProceedCheckout = () => {
    if (cartItems.length === 0) {
      addToast('Your cart is empty!', 'error');
      return;
    }
    closeCart();
    if (onOpenCheckout) {
      onOpenCheckout();
    }
  };

  const handleWhatsAppCheckout = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      addToast('Your cart is empty. Please add delicious items first!', 'error');
      return;
    }

    const encodedMsg = generateWhatsAppMessage({
      name: customerName,
      phone: customerPhone,
      orderType: orderType,
      notes: cookingNotes
    });

    const waUrl = `https://wa.me/917838828743?text=${encodedMsg}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    addToast('Opening WhatsApp to place your order...', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#181310] text-b57-cream border-l border-amber-500/20 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-white">Your Order</h3>
                <span className="text-xs text-neutral-400">
                  {cartItems.reduce((s, i) => s + i.quantity, 0)} items selected
                </span>
              </div>
            </div>

            <button
              onClick={closeCart}
              className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">🛒</div>
                <h4 className="font-heading font-bold text-lg text-white">Your Cart is Empty</h4>
                <p className="text-xs text-neutral-400 mt-1 mb-6">
                  Explore our menu to add artisanal cold coffee, pizzas, pastas and shakes!
                </p>
                <button
                  onClick={closeCart}
                  className="px-6 py-2.5 rounded-full text-xs font-bold bg-b57-orange text-white"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                    Order Items
                  </span>
                  <button
                    onClick={clearCart}
                    className="text-xs text-red-400 hover:underline"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-2xl bg-neutral-900/90 border border-white/10 flex items-center gap-3.5 justify-between"
                    >
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-neutral-800 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=150&q=80';
                          }}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h5 className="font-heading font-bold text-sm text-white truncate">
                          {item.name}
                        </h5>
                        <span className="text-xs text-amber-300 font-extrabold block">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>

                      {/* Quantity Modifier */}
                      <div className="flex items-center gap-2 bg-neutral-800 rounded-xl p-1 border border-neutral-700">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded-lg bg-neutral-700 flex items-center justify-center text-white hover:bg-neutral-600 transition"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold px-1 text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded-lg bg-neutral-700 flex items-center justify-center text-white hover:bg-neutral-600 transition"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-neutral-500 hover:text-red-400 transition p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Promo Code & Coupon Section */}
                <div className="pt-4 border-t border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-amber-400" /> Apply Coupon Code
                    </span>
                  </div>

                  {appliedCoupon ? (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400" />
                        <div>
                          <strong className="text-emerald-300 block">{appliedCoupon.code}</strong>
                          <span className="text-[10px] text-neutral-300">{appliedCoupon.label}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeCoupon}
                        className="text-neutral-400 hover:text-red-400 text-xs underline font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Try 'BISTRO15' or 'COFFEE50'"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-xs text-white uppercase outline-none focus:border-amber-500"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold text-xs transition"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                </div>

                {/* Quick WhatsApp Details Form (Optional alternative) */}
                <div className="pt-4 space-y-3 border-t border-white/10">
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">
                    Quick WhatsApp Order Options
                  </span>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Your Name (Optional)"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-xs text-white outline-none focus:border-b57-orange"
                    />
                    <input
                      type="tel"
                      placeholder="Phone (Optional)"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-xs text-white outline-none focus:border-b57-orange"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-neutral-950 border-t border-white/10 space-y-3">
              <div className="space-y-1.5 text-xs text-neutral-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{cartSubtotal}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>GST (5% Pure Veg Dining)</span>
                  <span>₹{gstAmount}</span>
                </div>

                <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-white/10">
                  <span>Grand Total</span>
                  <span className="text-amber-300 font-heading">₹{grandTotal}</span>
                </div>
              </div>

              {/* Main Instant Checkout Button */}
              <button
                onClick={handleProceedCheckout}
                className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-neutral-950 flex items-center justify-center gap-2 shadow-lg hover:shadow-amber-500/20 transition"
              >
                <Sparkles className="w-4 h-4" />
                <span>Proceed to Online Checkout & UPI</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-2.5 rounded-xl font-bold text-xs bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-700 flex items-center justify-center gap-2 transition"
              >
                <Send className="w-3.5 h-3.5 text-emerald-400" />
                <span>Or Order Direct via WhatsApp</span>
              </button>
            </div>
          )}

        </div>
      </div>

    </div>
  );
};
