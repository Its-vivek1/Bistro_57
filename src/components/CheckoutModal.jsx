import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import {
  X,
  CreditCard,
  QrCode,
  Banknote,
  CheckCircle,
  Loader2,
  MapPin,
  Phone,
  User,
  Utensils,
  ShieldCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const CheckoutModal = ({ isOpen, onClose, onOrderSuccess }) => {
  const {
    cartItems,
    cartSubtotal,
    discountAmount,
    appliedCoupon,
    gstAmount,
    grandTotal,
    clearCart,
    setLastOrder
  } = useCart();

  const { addToast } = useToast();

  const [orderType, setOrderType] = useState('Delivery'); // 'Delivery', 'Dine-In', 'Takeaway'
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [tableNo, setTableNo] = useState('');
  const [cookingNotes, setCookingNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI'); // 'UPI', 'Card', 'COD'
  const [upiApp, setUpiApp] = useState('GPay');

  // Card Form State
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleProcessPayment = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      addToast('Please enter your name.', 'error');
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      addToast('Please enter a valid 10-digit phone number.', 'error');
      return;
    }
    if (orderType === 'Delivery' && !address.trim()) {
      addToast('Please enter your delivery address.', 'error');
      return;
    }
    if (orderType === 'Dine-In' && !tableNo.trim()) {
      addToast('Please enter your table number.', 'error');
      return;
    }
    if (paymentMethod === 'Card') {
      if (!cardNumber || !cardExpiry || !cardCvv) {
        addToast('Please complete card details.', 'error');
        return;
      }
    }

    setIsProcessing(true);

    // Simulate mock payment processing delay
    setTimeout(() => {
      setIsProcessing(false);

      const orderId = 'B57-' + Math.floor(100000 + Math.random() * 900000);
      const newOrder = {
        orderId,
        date: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
        orderType,
        customer: { name, phone, address: orderType === 'Delivery' ? address : `Table #${tableNo}` },
        items: [...cartItems],
        subtotal: cartSubtotal,
        discount: discountAmount,
        coupon: appliedCoupon?.code || null,
        gst: gstAmount,
        grandTotal,
        paymentMethod: paymentMethod === 'UPI' ? `UPI (${upiApp})` : paymentMethod === 'Card' ? 'Credit/Debit Card' : 'Cash / Counter',
        paymentStatus: paymentMethod === 'COD' ? 'Pending (Pay on Delivery)' : 'Paid Successfully',
        status: 'Order Placed'
      };

      setLastOrder(newOrder);
      clearCart();
      addToast(`Order placed successfully! Order ID: ${orderId} 🎉`, 'success');
      onClose();
      if (onOrderSuccess) {
        onOrderSuccess(newOrder);
      }
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md">
      <div
        className="bg-[#16120e] text-b57-cream border border-amber-500/30 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-fadeIn my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-[#221a14] via-[#1a140f] to-[#221a14] border-b border-amber-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-lg text-white">Checkout & Payment</h3>
              <p className="text-xs text-neutral-400">Complete your order details & instant payment</p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <form onSubmit={handleProcessPayment} className="p-6 flex-1 overflow-y-auto space-y-6">
          {/* Order Summary Pill */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex justify-between items-center text-xs">
            <div>
              <span className="text-neutral-400 block">Total Items ({cartItems.length})</span>
              <span className="font-bold text-white text-sm">₹{grandTotal}</span>
            </div>
            {discountAmount > 0 && (
              <span className="bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-1 rounded-full text-[11px] border border-emerald-500/30">
                Saved ₹{discountAmount} ({appliedCoupon?.code})
              </span>
            )}
          </div>

          {/* 1. Order Type Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider">
              1. Choose Dining / Delivery Mode
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'Delivery', label: '🚀 Home Delivery' },
                { id: 'Dine-In', label: '🍽️ Dine-In' },
                { id: 'Takeaway', label: '🛍️ Takeaway' }
              ].map((mode) => (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setOrderType(mode.id)}
                  className={`py-3 px-2 rounded-2xl text-xs font-bold border transition text-center ${
                    orderType === mode.id
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-lg'
                      : 'bg-neutral-900/80 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Customer Contact & Location Information */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider">
              2. Contact & Delivery Details
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="relative">
                <User className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="Your Full Name *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-xs text-white outline-none focus:border-amber-500 transition"
                />
              </div>

              <div className="relative">
                <Phone className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                <input
                  type="tel"
                  required
                  placeholder="10-digit Phone Number *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-xs text-white outline-none focus:border-amber-500 transition"
                />
              </div>
            </div>

            {orderType === 'Delivery' ? (
              <div className="relative">
                <MapPin className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="Complete Delivery Address (House/Flat No, Area, Landmark) *"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-xs text-white outline-none focus:border-amber-500 transition"
                />
              </div>
            ) : orderType === 'Dine-In' ? (
              <div className="relative">
                <Utensils className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="Table Number (e.g. Table 05) *"
                  value={tableNo}
                  onChange={(e) => setTableNo(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-xs text-white outline-none focus:border-amber-500 transition"
                />
              </div>
            ) : null}

            <input
              type="text"
              placeholder="Cooking instructions / Extra napkins (Optional)"
              value={cookingNotes}
              onChange={(e) => setCookingNotes(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-xs text-white outline-none focus:border-amber-500 transition"
            />
          </div>

          {/* 3. Payment Method Selection */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider">
              3. Payment Method
            </label>

            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'UPI', label: 'UPI / Scan QR', icon: QrCode },
                { id: 'Card', label: 'Credit/Debit Card', icon: CreditCard },
                { id: 'COD', label: orderType === 'Delivery' ? 'Cash on Delivery' : 'Pay at Counter', icon: Banknote }
              ].map((pm) => {
                const IconComponent = pm.icon;
                return (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setPaymentMethod(pm.id)}
                    className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition ${
                      paymentMethod === pm.id
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md'
                        : 'bg-neutral-900/80 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{pm.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Sub-options for UPI */}
            {paymentMethod === 'UPI' && (
              <div className="p-4 rounded-2xl bg-neutral-900 border border-white/10 space-y-4">
                <div className="flex justify-around text-xs font-bold">
                  {['GPay', 'PhonePe', 'Paytm', 'Scan QR'].map((app) => (
                    <button
                      key={app}
                      type="button"
                      onClick={() => setUpiApp(app)}
                      className={`px-3 py-1.5 rounded-xl border transition ${
                        upiApp === app
                          ? 'bg-amber-500 text-neutral-950 font-extrabold border-amber-500'
                          : 'bg-neutral-800 text-neutral-400 border-neutral-700'
                      }`}
                    >
                      {app}
                    </button>
                  ))}
                </div>

                {upiApp === 'Scan QR' ? (
                  <div className="flex flex-col items-center justify-center p-3 bg-white rounded-2xl text-neutral-900 space-y-2">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=bistro57@upi%26pn=Bistro57%26am=${grandTotal}`}
                      alt="UPI QR Code"
                      className="w-36 h-36 border border-neutral-300 rounded-lg p-1"
                    />
                    <span className="text-[11px] font-bold text-neutral-600">Scan using any UPI App to Pay ₹{grandTotal}</span>
                  </div>
                ) : (
                  <div className="p-3 bg-neutral-950/80 rounded-xl text-xs text-neutral-300 border border-neutral-800 flex items-center justify-between">
                    <span>UPI ID: <strong className="text-amber-400">bistro57@upi</strong></span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">Auto Verified</span>
                  </div>
                )}
              </div>
            )}

            {/* Card Form */}
            {paymentMethod === 'Card' && (
              <div className="p-4 rounded-2xl bg-neutral-900 border border-white/10 space-y-3">
                <input
                  type="text"
                  placeholder="Card Number (4532 XXXX XXXX 8924)"
                  value={cardNumber}
                  maxLength={19}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white outline-none focus:border-amber-500"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    maxLength={5}
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white outline-none focus:border-amber-500"
                  />
                  <input
                    type="password"
                    placeholder="CVV"
                    maxLength={4}
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Guarantee Security Note */}
          <div className="flex items-center gap-2 text-[11px] text-neutral-400 justify-center pt-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>256-bit Secure Encryption • Instant Order Processing</span>
          </div>

          {/* Submit / Pay Button */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-4 rounded-2xl font-extrabold text-sm bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-neutral-950 shadow-xl hover:shadow-amber-500/20 transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-neutral-950" />
                <span>Processing Payment...</span>
              </>
            ) : (
              <>
                <span>Pay ₹{grandTotal} & Place Order</span>
                <ArrowRight className="w-4 h-4 text-neutral-950" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
