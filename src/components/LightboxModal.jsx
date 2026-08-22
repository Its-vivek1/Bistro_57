import React from 'react';
import { X } from 'lucide-react';

export const LightboxModal = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative max-w-4xl w-full z-10 animate-scaleIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 rounded-full bg-white/20 text-white hover:bg-white/40 transition"
          aria-label="Close image preview"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="rounded-3xl overflow-hidden bg-neutral-950 border border-white/15 shadow-2xl">
          <img
            src={item.image}
            alt={item.title}
            className="w-full max-h-[75vh] object-contain mx-auto"
          />

          <div className="p-6 bg-[#16110D] border-t border-white/10 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 block mb-1">
                {item.categoryLabel}
              </span>
              <h3 className="font-heading font-bold text-xl text-white">
                {item.title}
              </h3>
              <p className="text-xs text-neutral-300 mt-1">
                {item.description}
              </p>
            </div>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition flex-shrink-0"
            >
              Close Viewer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
