import React, { useState } from 'react';
import { X, Star, Send } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const ReviewModal = ({ isOpen, onClose }) => {
  const { addToast } = useToast();
  const [rating, setRating] = useState(5);
  const [name, setName] = useState('');
  const [favouriteDish, setFavouriteDish] = useState('');
  const [comment, setComment] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      addToast('Please enter your name and review', 'error');
      return;
    }

    addToast('Thank you for your valuable feedback! ⭐', 'success');
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
        <div className="relative w-full max-w-md rounded-3xl bg-[#181310] text-b57-cream border border-amber-500/30 p-6 sm:p-8 shadow-2xl z-10 animate-scaleIn">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <div>
              <h3 className="font-heading font-bold text-xl text-white">Write a Review</h3>
              <span className="text-xs text-amber-400">Share your Bistro 57 experience</span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Star Rating Select */}
            <div className="text-center pb-2">
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                Your Rating
              </label>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-2xl transition transform hover:scale-125 focus:outline-none"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-neutral-600'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-xs text-white outline-none focus:border-b57-orange"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">
                Favourite Dish (Optional)
              </label>
              <input
                type="text"
                value={favouriteDish}
                onChange={(e) => setFavouriteDish(e.target.value)}
                placeholder="e.g. Classic Cold Coffee & Paneer Pizza"
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-xs text-white outline-none focus:border-b57-orange"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">
                Your Review *
              </label>
              <textarea
                rows={3}
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us about the taste, ambiance and service..."
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-xs text-white outline-none focus:border-b57-orange"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-b57-orange to-b57-red text-white flex items-center justify-center gap-2 shadow-lg hover:shadow-b57-glow transition"
            >
              <Send className="w-4 h-4" />
              <span>Submit Feedback</span>
            </button>
          </form>

        </div>
      </div>

    </div>
  );
};
