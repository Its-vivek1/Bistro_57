import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  X,
  Printer,
  MessageSquare,
  Clock,
  MapPin,
  UtensilsCrossed,
  ChefHat,
  Bike,
  Sparkles
} from 'lucide-react';

export const OrderConfirmationModal = ({ isOpen, onClose, order }) => {
  const [activeStep, setActiveStep] = useState(1); // 0: Received, 1: Kitchen, 2: Ready

  useEffect(() => {
    if (!isOpen) return;
    const timer1 = setTimeout(() => setActiveStep(1), 3000);
    const timer2 = setTimeout(() => setActiveStep(2), 7000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isOpen]);

  if (!isOpen || !order) return null;

  const handleWhatsAppSend = () => {
    let text = `*ORDER RECEIPT - BISTRO 57 GWALIOR*\n`;
    text += `*Order ID:* ${order.orderId}\n`;
    text += `*Date:* ${order.date}\n`;
    text += `*Order Mode:* ${order.orderType}\n`;
    text += `*Customer:* ${order.customer.name} (${order.customer.phone})\n`;
    text += `*Address/Table:* ${order.customer.address}\n\n`;

    text += `*ITEMS ORDERED:*\n`;
    order.items.forEach((item, idx) => {
      text += `${idx + 1}. ${item.name} x ${item.quantity} = ₹${item.price * item.quantity}\n`;
    });

    text += `\n------------------------------------\n`;
    text += `*Subtotal:* ₹${order.subtotal}\n`;
    if (order.discount > 0) text += `*Discount (${order.coupon}):* -₹${order.discount}\n`;
    text += `*GST (5%):* ₹${order.gst}\n`;
    text += `*GRAND TOTAL:* ₹${order.grandTotal}\n`;
    text += `*Payment Method:* ${order.paymentMethod}\n`;
    text += `*Payment Status:* ${order.paymentStatus}\n`;

    const waUrl = `https://wa.me/917838828743?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div
        className="bg-[#14100c] text-b57-cream border border-emerald-500/30 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden animate-fadeIn my-6 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Banner */}
        <div className="bg-gradient-to-r from-emerald-950 via-neutral-900 to-emerald-950 p-6 text-center border-b border-emerald-500/20 relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-3 border border-emerald-500/40 animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h3 className="font-heading font-extrabold text-xl text-white">Order Confirmed!</h3>
          <p className="text-xs text-emerald-300 font-mono mt-1">Order ID: {order.orderId}</p>
        </div>

        {/* Modal Content */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          
          {/* Live Tracker Animation */}
          <div className="p-4 rounded-2xl bg-neutral-900 border border-white/10 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-neutral-300">
              <span className="flex items-center gap-1.5 text-amber-400">
                <Clock className="w-4 h-4 animate-spin" /> Live Order Status
              </span>
              <span className="text-[11px] text-neutral-400">Est. Time: 20-30 mins</span>
            </div>

            <div className="grid grid-cols-3 gap-2 relative">
              {[
                { step: 0, label: 'Order Received', icon: UtensilsCrossed },
                { step: 1, label: 'In Kitchen', icon: ChefHat },
                { step: 2, label: order.orderType === 'Delivery' ? 'On The Way' : 'Ready to Serve', icon: Bike }
              ].map((st) => {
                const IconComp = st.icon;
                const isCurrent = activeStep === st.step;
                const isPassed = activeStep >= st.step;
                return (
                  <div
                    key={st.step}
                    className={`p-2.5 rounded-xl border text-center flex flex-col items-center gap-1 transition ${
                      isCurrent
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md animate-pulse'
                        : isPassed
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-600'
                    }`}
                  >
                    <IconComp className="w-4 h-4" />
                    <span className="text-[10px] font-bold">{st.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Customer & Delivery Summary */}
          <div className="grid grid-cols-2 gap-3 text-xs bg-neutral-900/60 p-4 rounded-2xl border border-white/5">
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase font-bold">Customer</span>
              <span className="font-bold text-white">{order.customer.name}</span>
              <span className="text-neutral-400 block">{order.customer.phone}</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase font-bold">Mode & Destination</span>
              <span className="font-bold text-amber-400">{order.orderType}</span>
              <span className="text-neutral-400 block truncate">{order.customer.address}</span>
            </div>
          </div>

          {/* Receipt Breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Receipt Breakdown</h4>
            
            <div className="space-y-2 bg-neutral-950 p-4 rounded-2xl border border-neutral-800">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-xs">
                  <span className="text-white font-medium">
                    {item.name} <strong className="text-amber-400">x{item.quantity}</strong>
                  </span>
                  <span className="text-neutral-300 font-bold">₹{item.price * item.quantity}</span>
                </div>
              ))}

              <div className="pt-3 border-t border-neutral-800 space-y-1 text-xs text-neutral-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{order.subtotal}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({order.coupon})</span>
                    <span>-₹{order.discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>GST (5%)</span>
                  <span>₹{order.gst}</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-neutral-800">
                  <span>Paid Amount ({order.paymentMethod})</span>
                  <span className="text-amber-400 font-heading">₹{order.grandTotal}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleWhatsAppSend}
              className="py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-lg"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Send Receipt to WhatsApp</span>
            </button>

            <button
              onClick={handlePrint}
              className="py-3 px-4 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition border border-neutral-700"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save Receipt</span>
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-neutral-950 border-t border-white/10 text-center">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold text-xs transition"
          >
            Done & Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
};
