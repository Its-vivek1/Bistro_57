import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext(null);
const STORAGE_KEY = 'bistro57_cart_v2';
const GST_RATE = 0.05; // 5% GST for pure veg dining

export const CartProvider = ({ children }) => {
  const { addToast } = useToast();
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [badgeAnimate, setBadgeAnimate] = useState(false);

  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [lastOrder, setLastOrder] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to persist cart to localStorage', e);
    }
  }, [cartItems]);

  const triggerBadgeAnimation = () => {
    setBadgeAnimate(true);
    setTimeout(() => setBadgeAnimate(false), 600);
  };

  const addToCart = useCallback((item, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((i) => i.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      } else {
        return [...prevItems, { ...item, quantity }];
      }
    });

    triggerBadgeAnimation();
    if (addToast) {
      addToast(`Added "${item.name}" to your cart! 🛒`, 'success');
    }
  }, [addToast]);

  const updateQuantity = useCallback((id, delta) => {
    setCartItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    setAppliedCoupon(null);
  }, []);

  const applyCoupon = useCallback((code) => {
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) return { success: false, message: 'Please enter a coupon code' };

    if (cleanCode === 'BISTRO15' || cleanCode === 'SPIN15') {
      setAppliedCoupon({ code: cleanCode, type: 'percent', value: 15, label: '15% Off Total' });
      return { success: true, message: `Coupon ${cleanCode} applied! 15% discount` };
    } else if (cleanCode === 'SPIN20') {
      setAppliedCoupon({ code: 'SPIN20', type: 'percent', value: 20, label: '20% Mega Off' });
      return { success: true, message: 'Coupon SPIN20 applied! 20% discount 🎉' };
    } else if (cleanCode === 'COFFEE50' || cleanCode === 'FIRST50' || cleanCode === 'SPIN50') {
      setAppliedCoupon({ code: cleanCode, type: 'flat', value: 50, label: '₹50 Flat Discount' });
      return { success: true, message: `Coupon ${cleanCode} applied! ₹50 off` };
    } else if (cleanCode === 'FREEGB') {
      setAppliedCoupon({ code: 'FREEGB', type: 'flat', value: 99, label: 'Free Garlic Bread Deal (₹99 Off)' });
      return { success: true, message: 'Coupon FREEGB applied! ₹99 Garlic Bread discount 🎉' };
    } else if (cleanCode === 'FREECC') {
      setAppliedCoupon({ code: 'FREECC', type: 'flat', value: 149, label: 'Free Cold Coffee Deal (₹149 Off)' });
      return { success: true, message: 'Coupon FREECC applied! Free Cold Coffee discount 🎉' };
    } else if (cleanCode === 'B1G1') {
      setAppliedCoupon({ code: 'B1G1', type: 'flat', value: 100, label: 'Buy 1 Get 1 Special (₹100 Off)' });
      return { success: true, message: 'Coupon B1G1 applied! ₹100 discount 🎉' };
    } else if (cleanCode === 'WELCOME10') {
      setAppliedCoupon({ code: 'WELCOME10', type: 'percent', value: 10, label: '10% Welcome Discount' });
      return { success: true, message: 'Coupon WELCOME10 applied! 10% discount' };
    }

    return { success: false, message: 'Invalid coupon code. Try SPIN20, BISTRO15 or SPIN50' };
  }, []);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percent') {
      discountAmount = Math.round((cartSubtotal * appliedCoupon.value) / 100);
    } else if (appliedCoupon.type === 'flat') {
      discountAmount = Math.min(cartSubtotal, appliedCoupon.value);
    }
  }

  const taxableAmount = Math.max(0, cartSubtotal - discountAmount);
  const gstAmount = Math.round(taxableAmount * GST_RATE);
  const grandTotal = taxableAmount + gstAmount;

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const generateWhatsAppMessage = ({ name, phone, orderType, notes, paymentMethod, address }) => {
    let text = `*NEW ORDER - BISTRO 57 GWALIOR*\n`;
    text += `------------------------------------\n`;
    text += `*Order Type:* ${orderType || 'Dine-In'}\n`;
    if (name) text += `*Customer Name:* ${name}\n`;
    if (phone) text += `*Contact Phone:* ${phone}\n`;
    if (address) text += `*Address / Table:* ${address}\n`;
    if (paymentMethod) text += `*Payment Method:* ${paymentMethod}\n`;
    text += `\n*ITEMS ORDERED:*\n`;

    cartItems.forEach((item, index) => {
      text += `${index + 1}. ${item.name} x ${item.quantity} = ₹${item.price * item.quantity}\n`;
    });

    text += `\n------------------------------------\n`;
    text += `*Subtotal:* ₹${cartSubtotal}\n`;
    if (discountAmount > 0) text += `*Discount (${appliedCoupon?.code}):* -₹${discountAmount}\n`;
    text += `*GST (5%):* ₹${gstAmount}\n`;
    text += `*GRAND TOTAL:* ₹${grandTotal}\n`;
    text += `------------------------------------\n`;
    if (notes) text += `*Cooking / Special Notes:* ${notes}\n\n`;
    text += `Please confirm my order. Thank you!`;

    return encodeURIComponent(text);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        badgeAnimate,
        cartCount,
        cartSubtotal,
        discountAmount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        gstAmount,
        grandTotal,
        lastOrder,
        setLastOrder,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        openCart,
        closeCart,
        setIsCartOpen,
        generateWhatsAppMessage
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
