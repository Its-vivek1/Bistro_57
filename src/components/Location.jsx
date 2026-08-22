import React from 'react';
import { MapPin, Clock, Phone, Navigation } from 'lucide-react';

export const Location = () => {
  return (
    <section id="location-section" className="py-24 bg-b57-creamSurface relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left: Location Details & Hours */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-b57-brownDark text-b57-cream shadow-xl reveal-init reveal-fade-left">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
                Visit Bistro 57 Gwalior
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-6">
                Find Us in Patel Nagar
              </h2>

              <div className="space-y-6 text-sm text-b57-cream/90">
                
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-b57-orange" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Address</h4>
                    <p className="text-neutral-300 leading-relaxed mt-1">
                      B-99, Near Green Garden,<br />
                      Patel Nagar, City Center,<br />
                      Gwalior, Madhya Pradesh – 474011
                    </p>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-orange-500/10 text-orange-400 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-b57-yellow" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Opening Hours</h4>
                    <p className="text-neutral-300 leading-relaxed mt-1">
                      <strong>Monday – Sunday:</strong><br />
                      11:00 AM – 11:00 PM (Daily)
                    </p>
                    <div className="mt-2 inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-semibold">
                      <span className="live-pulse-dot"></span> Open 7 Days a Week
                    </div>
                  </div>
                </div>

                {/* Direct Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-b57-red" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Phone & Reservations</h4>
                    <a
                      href="tel:+917838828743"
                      className="text-amber-300 font-bold hover:underline block mt-0.5 text-base"
                    >
                      +91 78388 28743
                    </a>
                    <span className="text-xs text-neutral-400">Direct booking & takeaway inquiries</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Direct CTA Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 pt-6 border-t border-white/10">
              <a
                href="https://maps.google.com/?q=B-99+Patel+Nagar+City+Center+Gwalior+Madhya+Pradesh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full text-xs font-bold bg-b57-orange hover:bg-b57-red text-white shadow-md transition"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>
              <a
                href="tel:+917838828743"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition"
              >
                <Phone className="w-4 h-4 text-amber-300" />
                <span>Call Now</span>
              </a>
            </div>
          </div>

          {/* Right: Embedded Google Map */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-neutral-200 min-h-[380px] relative reveal-init reveal-fade-right delay-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14318.570776774653!2d78.182740!3d26.204500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976c6a469a9108b%3A0x7d6f5170d10b77b8!2sPatel%20Nagar%2C%20City%20Center%2C%20Gwalior%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '420px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bistro 57 Patel Nagar Gwalior Map"
            ></iframe>
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-neutral-200 flex items-center gap-3 pointer-events-none">
              <img
                src="/assets/images/bistro57-logo.png"
                alt="B57"
                className="w-8 h-8 rounded-full"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=100&q=80';
                }}
              />
              <div>
                <div className="font-bold text-xs text-neutral-900">Bistro 57 Gwalior</div>
                <div className="text-[10px] text-neutral-500">Patel Nagar, City Center</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
