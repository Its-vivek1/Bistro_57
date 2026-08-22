import React, { useState } from 'react';
import { X, Calendar, Clock, Users, Send } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const ReservationModal = ({ isOpen, onClose }) => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    time: '19:00',
    guests: '2',
    seating: 'Indoor Cozy AC',
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      addToast('Please enter your name and phone number', 'error');
      return;
    }

    let text = `*TABLE RESERVATION - BISTRO 57 GWALIOR*\n`;
    text += `------------------------------------\n`;
    text += `*Name:* ${formData.name}\n`;
    text += `*Phone:* ${formData.phone}\n`;
    text += `*Date:* ${formData.date}\n`;
    text += `*Time:* ${formData.time}\n`;
    text += `*Number of Guests:* ${formData.guests} Persons\n`;
    text += `*Seating Preference:* ${formData.seating}\n`;
    if (formData.notes) text += `*Special Occasion/Notes:* ${formData.notes}\n`;
    text += `------------------------------------\n`;
    text += `Please confirm my table reservation. Thank you!`;

    const encoded = encodeURIComponent(text);
    const waUrl = `https://wa.me/917838828743?text=${encoded}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    addToast('Opening WhatsApp to confirm your table reservation...', 'success');
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
        <div className="relative w-full max-w-lg rounded-3xl bg-[#181310] text-b57-cream border border-amber-500/30 p-6 sm:p-8 shadow-2xl z-10 animate-scaleIn">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl text-white">Reserve a Table</h3>
                <span className="text-xs text-amber-400">Bistro 57 Patel Nagar, Gwalior</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition"
              aria-label="Close reservation modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ayush K."
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-xs text-white outline-none focus:border-b57-orange"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">
                  WhatsApp Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-xs text-white outline-none focus:border-b57-orange"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-xs text-white outline-none focus:border-b57-orange"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">
                  Time Slot
                </label>
                <input
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-xs text-white outline-none focus:border-b57-orange"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">
                  Guests
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-xs text-white outline-none focus:border-b57-orange"
                >
                  <option value="1">1 Person</option>
                  <option value="2">2 Persons</option>
                  <option value="3-4">3 - 4 Persons</option>
                  <option value="5-8">5 - 8 Persons</option>
                  <option value="9+">9+ Group Party</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">
                Seating Preference
              </label>
              <select
                value={formData.seating}
                onChange={(e) => setFormData({ ...formData, seating: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-xs text-white outline-none focus:border-b57-orange"
              >
                <option value="Indoor Cozy AC">Indoor Cozy AC</option>
                <option value="Outdoor Greenery View">Outdoor Greenery View</option>
                <option value="Birthday / Celebration Setup">Birthday / Celebration Setup</option>
                <option value="Quiet Corner / Work Friendly">Quiet Corner / Work Friendly</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">
                Special Requests / Birthday Notes
              </label>
              <textarea
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Mention cake arrangements, decoration or high chair needs..."
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-xs text-white outline-none focus:border-b57-orange"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-b57-orange to-b57-red text-white flex items-center justify-center gap-2 shadow-lg hover:shadow-b57-glow transition"
            >
              <Send className="w-4 h-4" />
              <span>Confirm & Book on WhatsApp</span>
            </button>
          </form>

        </div>
      </div>

    </div>
  );
};
