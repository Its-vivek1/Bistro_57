import React from 'react';
import { REVIEWS } from '../data/reviewsData';
import { Star, Edit3, ExternalLink } from 'lucide-react';

export const Reviews = ({ onOpenReviewModal }) => {
  return (
    <section id="reviews-section" className="py-24 bg-b57-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 reveal-init reveal-fade-up">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-200/60 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
              ⭐ 4.8 / 5.0 on Google Reviews
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-b57-brown">
              See What Our Guests Say
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base mt-2 max-w-lg">
              Real experiences from food lovers, students, and families visiting Bistro 57 Patel Nagar, Gwalior.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <button
              onClick={onOpenReviewModal}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold bg-white text-b57-brown border border-amber-900/20 hover:bg-neutral-50 shadow-sm transition"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Write a Review</span>
            </button>

            <a
              href="https://maps.google.com/?q=B-99+Patel+Nagar+City+Center+Gwalior+Madhya+Pradesh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold bg-b57-orange text-white hover:bg-b57-red shadow-sm transition"
            >
              <span>Google Reviews</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((r, idx) => (
            <div
              key={r.id}
              className={`p-6 rounded-3xl bg-white border border-amber-900/10 shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between reveal-init reveal-fade-up delay-${(idx + 1) * 100}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-amber-400">
                    {[...Array(r.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-neutral-400 font-medium">
                    {r.source}
                  </span>
                </div>

                <p className="text-neutral-700 text-sm sm:text-base italic leading-relaxed mb-6">
                  "{r.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
                <div
                  className={`w-10 h-10 rounded-full font-bold flex items-center justify-center text-sm ${r.avatarBg}`}
                >
                  {r.avatar}
                </div>
                <div>
                  <h5 className="font-bold text-sm text-neutral-900">{r.name}</h5>
                  <span className="text-xs text-neutral-400">{r.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
