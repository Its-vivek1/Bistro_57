import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { Gift, X, Sparkles, Check, ArrowRight, RotateCw } from 'lucide-react';

const PRIZES = [
  { id: 'SPIN20', label: '20% OFF', color: '#E65100', text: '#FFFFFF', desc: 'Get 20% flat discount on your order' },
  { id: 'FREEGB', label: 'Free Garlic Bread', color: '#1B5E20', text: '#FFFFFF', desc: '₹99 Off for a crispy garlic bread' },
  { id: 'B1G1', label: 'Buy 1 Get 1', color: '#FF8F00', text: '#FFFFFF', desc: '₹100 Off special B1G1 offer' },
  { id: 'SPIN50', label: 'Flat ₹50 OFF', color: '#4A148C', text: '#FFFFFF', desc: '₹50 flat instant discount' },
  { id: 'SPIN15', label: '15% OFF', color: '#00695C', text: '#FFFFFF', desc: '15% off total bill' },
  { id: 'FREECC', label: 'Free Cold Coffee', color: '#BF360C', text: '#FFFFFF', desc: '₹149 Off for iconic cold coffee' }
];

export const SpinWheelModal = ({ isOpen, onClose }) => {
  const { applyCoupon, openCart } = useCart();
  const { addToast } = useToast();

  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonPrize, setWonPrize] = useState(null);

  if (!isOpen) return null;

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setWonPrize(null);

    // Pick random prize index (0 to 5)
    const prizeIndex = Math.floor(Math.random() * PRIZES.length);
    const sliceAngle = 360 / PRIZES.length; // 60 deg each
    
    // Rotate 5 full turns (1800deg) + slice offset angle
    const targetAngle = 3600 + (360 - (prizeIndex * sliceAngle + sliceAngle / 2));
    setRotation(targetAngle);

    setTimeout(() => {
      setIsSpinning(false);
      const winner = PRIZES[prizeIndex];
      setWonPrize(winner);
    }, 4500);
  };

  const handleAutoApply = () => {
    if (!wonPrize) return;
    const res = applyCoupon(wonPrize.id);
    if (res.success) {
      addToast(res.message, 'success');
      onClose();
      openCart();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div
        className="bg-[#16120e] text-b57-cream border border-amber-500/30 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-fadeIn my-6 relative flex flex-col items-center p-6 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isSpinning}
          className="absolute right-4 top-4 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1 border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5" /> Lucky Wheel
          </span>
          <h3 className="font-heading font-extrabold text-2xl text-white">Spin & Win Instant Discount</h3>
          <p className="text-xs text-neutral-400 mt-0.5">Spin the wheel to unlock exclusive food & coffee rewards!</p>
        </div>

        {/* Interactive SVG Wheel Container */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 my-4 flex items-center justify-center">
          
          {/* Wheel Pointer Indicator */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-amber-400 filter drop-shadow-md"></div>

          {/* SVG Wheel Graphic */}
          <div
            className="w-full h-full rounded-full shadow-2xl border-4 border-amber-500/50 overflow-hidden transition-transform duration-[4500ms] cubic-bezier(0.15, 0.9, 0.2, 1)"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {PRIZES.map((prize, idx) => {
                const angle = 360 / PRIZES.length; // 60deg
                const startAngle = idx * angle;
                const endAngle = (idx + 1) * angle;

                const x1 = 50 + 50 * Math.cos((Math.PI * startAngle) / 180);
                const y1 = 50 + 50 * Math.sin((Math.PI * startAngle) / 180);
                const x2 = 50 + 50 * Math.cos((Math.PI * endAngle) / 180);
                const y2 = 50 + 50 * Math.sin((Math.PI * endAngle) / 180);

                const d = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;
                
                // Text positioning
                const textAngle = startAngle + angle / 2;
                const textRad = (Math.PI * textAngle) / 180;
                const tx = 50 + 32 * Math.cos(textRad);
                const ty = 50 + 32 * Math.sin(textRad);

                return (
                  <g key={prize.id}>
                    <path d={d} fill={prize.color} stroke="#16120e" strokeWidth="1" />
                    <text
                      x={tx}
                      y={ty}
                      fill="#ffffff"
                      fontSize="5"
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      transform={`rotate(${textAngle + 90}, ${tx}, ${ty})`}
                    >
                      {prize.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Center Hub Button */}
          <button
            type="button"
            onClick={handleSpin}
            disabled={isSpinning}
            className="absolute z-10 w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-400 text-neutral-950 font-extrabold text-xs shadow-2xl border-4 border-white flex flex-col items-center justify-center hover:scale-105 active:scale-95 transition disabled:opacity-75"
          >
            <RotateCw className={`w-4 h-4 text-neutral-950 ${isSpinning ? 'animate-spin' : ''}`} />
            <span>SPIN</span>
          </button>
        </div>

        {/* Won Prize Banner / Modal */}
        {wonPrize ? (
          <div className="w-full mt-4 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-center space-y-3 animate-fadeIn">
            <div className="flex items-center justify-center gap-2 text-emerald-400 text-xs font-extrabold uppercase">
              <Gift className="w-4 h-4" /> Congratulations! You Won:
            </div>
            <h4 className="font-heading font-extrabold text-xl text-white">{wonPrize.label}</h4>
            <p className="text-xs text-neutral-300">{wonPrize.desc} (Code: <strong className="text-amber-400">{wonPrize.id}</strong>)</p>

            <button
              onClick={handleAutoApply}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold text-xs shadow-lg hover:shadow-emerald-500/20 transition flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Auto-Apply Coupon & Open Cart</span>
            </button>
          </div>
        ) : (
          <p className="text-xs text-neutral-500 mt-2">Tap <strong>SPIN</strong> to reveal your gift offer!</p>
        )}
      </div>
    </div>
  );
};
