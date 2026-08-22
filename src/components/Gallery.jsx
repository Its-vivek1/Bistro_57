import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/galleryData';
import { ZoomIn } from 'lucide-react';

export const Gallery = ({ onSelectImage }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredGallery = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'interior', label: 'Café Interior' },
    { id: 'food', label: 'Artisanal Food' },
    { id: 'coffee', label: 'Coffee & Shakes' },
    { id: 'moments', label: 'Guests & Moments' }
  ];

  return (
    <section id="gallery-section" className="py-24 bg-b57-creamSurface relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10 reveal-init reveal-fade-up">
          <span className="inline-block px-3.5 py-1 rounded-full bg-b57-orange/15 text-b57-orange text-xs font-bold uppercase tracking-wider mb-2">
            Visual Moments
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-b57-brown mb-3">
            Inside Bistro 57
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base">
            Take a look at our café vibe, signature dishes, freshly prepared drinks and moments of joy.
          </p>
        </div>

        {/* Gallery Filter Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10 reveal-init reveal-fade-up delay-100">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition duration-200 ${
                activeCategory === cat.id
                  ? 'bg-b57-orange text-white shadow-md'
                  : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 reveal-init reveal-scale delay-200">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectImage && onSelectImage(item)}
              className="relative h-72 rounded-3xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-all duration-500 bg-neutral-200"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80';
                }}
              />

              {/* Gradient Overlay & Hover info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 text-white">
                <div className="flex justify-end">
                  <span className="p-2 rounded-full bg-white/20 backdrop-blur-md">
                    <ZoomIn className="w-4 h-4 text-white" />
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 block mb-1">
                    {item.categoryLabel}
                  </span>
                  <h4 className="font-heading font-bold text-lg text-white">
                    {item.title}
                  </h4>
                  <p className="text-xs text-neutral-300 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
