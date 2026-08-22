import React, { useState } from 'react';
import { Phone, MessageSquare, Send, PartyPopper, Bike } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const ContactSection = () => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    purpose: 'Table Reservation',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      addToast('Please enter your name and contact phone number', 'error');
      return;
    }

    let text = `*NEW INQUIRY - BISTRO 57 GWALIOR*\n`;
    text += `------------------------------------\n`;
    text += `*Name:* ${formData.name}\n`;
    text += `*Phone:* ${formData.phone}\n`;
    text += `*Purpose:* ${formData.purpose}\n`;
    if (formData.message) text += `*Message/Notes:* ${formData.message}\n`;
    text += `------------------------------------\n`;

    const encoded = encodeURIComponent(text);
    const waUrl = `https://wa.me/917838828743?text=${encoded}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    addToast('Opening WhatsApp to send your inquiry...', 'success');
  };

  return (
    <section id="contact-section" className="py-24 bg-b57-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Quick Info & Party Hosting */}
          <div className="lg:col-span-5 space-y-6 reveal-init reveal-fade-left">
            <span className="inline-block px-3.5 py-1 rounded-full bg-b57-red/10 text-b57-red text-xs font-bold uppercase tracking-wider">
              Get in Touch
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-b57-brown">
              Connect With Bistro 57
            </h2>
            <p className="text-neutral-700 text-sm sm:text-base leading-relaxed font-normal">
              Planning a birthday bash, kitty party, college reunion, or intimate family dinner? Reach out to us or drop a message to reserve the perfect table setup.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-b57-orange flex items-center justify-center text-xl flex-shrink-0">
                  <PartyPopper className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-neutral-900">Birthday & Celebration Booking</h4>
                  <p className="text-xs text-neutral-500">Customized food combos & decoration support.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl flex-shrink-0">
                  <Bike className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-neutral-900">Takeaway & Quick Pickup</h4>
                  <p className="text-xs text-neutral-500">Call ahead to keep your hot pizza & coffee ready.</p>
                </div>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="tel:+917838828743"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold bg-gradient-to-r from-b57-orange to-b57-red text-white shadow-md hover:shadow-lg transition"
              >
                <Phone className="w-4 h-4" />
                <span>Call +91 78388 28743</span>
              </a>
              <a
                href="https://wa.me/917838828743?text=Hello%20Bistro%2057%20Gwalior!%20I%20have%20an%20inquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-md transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Chat</span>
              </a>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7 reveal-init reveal-scale delay-200">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-amber-900/10 shadow-xl">
              <h3 className="font-heading font-bold text-2xl text-b57-brown mb-1">
                Send an Inquiry / Booking Note
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 mb-6">
                Fill in your details below and our team will get in touch instantly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-bold text-neutral-700 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-sm focus:border-b57-orange focus:bg-white outline-none transition"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-bold text-neutral-700 mb-1">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-sm focus:border-b57-orange focus:bg-white outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-purpose" className="block text-xs font-bold text-neutral-700 mb-1">
                    Inquiry Purpose *
                  </label>
                  <select
                    id="contact-purpose"
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-sm focus:border-b57-orange focus:bg-white outline-none transition"
                  >
                    <option value="Table Reservation">Table Reservation</option>
                    <option value="Birthday Party / Celebration">Birthday Party / Celebration</option>
                    <option value="Food Order & Delivery Inquiry">Food Order & Delivery Inquiry</option>
                    <option value="Feedback / Suggestion">Feedback / Suggestion</option>
                    <option value="Other Inquiries">Other Inquiries</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-bold text-neutral-700 mb-1">
                    Message or Special Requests
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us date, guest count, dietary preferences or anything else..."
                    className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-sm focus:border-b57-orange focus:bg-white outline-none transition"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-b57-orange to-b57-red text-white flex items-center justify-center gap-2 shadow-lg hover:shadow-b57-glow transition"
                >
                  <Send className="w-4 h-4" />
                  <span>Send via WhatsApp & Connect</span>
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
