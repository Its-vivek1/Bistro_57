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
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const gstAmount = Math.round(cartSubtotal * GST_RATE);
  const grandTotal = cartSubtotal + gstAmount;

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const generateWhatsAppMessage = ({ name, phone, orderType, notes }) => {
    let text = `*NEW ORDER - BISTRO 57 GWALIOR*\n`;
    text += `------------------------------------\n`;
    text += `*Order Type:* ${orderType || 'Dine-In'}\n`;
    if (name) text += `*Customer Name:* ${name}\n`;
    if (phone) text += `*Contact Phone:* ${phone}\n`;
    text += `\n*ITEMS ORDERED:*\n`;

    cartItems.forEach((item, index) => {
      text += `${index + 1}. ${item.name} x ${item.quantity} = ₹${item.price * item.quantity}\n`;
    });

    text += `\n------------------------------------\n`;
    text += `*Subtotal:* ₹${cartSubtotal}\n`;
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
        gstAmount,
        grandTotal,
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
