import React, { useState, useEffect } from 'react';
import { Phone, MapPin } from 'lucide-react';

export const AnnouncementBar = () => {
  const [isOpenNow, setIsOpenNow] = useState(true);

  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const timeVal = currentHour + currentMinute / 60;
      // Open 11:00 AM (11.0) to 11:00 PM (23.0)
      setIsOpenNow(timeVal >= 11 && timeVal < 23);
    };

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#140E0B] text-b57-cream text-xs py-2 px-4 border-b border-amber-500/20 z-40 relative">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        
        {/* Left: Location & Status */}
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <span className="flex items-center gap-1.5 font-semibold text-amber-200">
            <MapPin className="w-3.5 h-3.5 text-b57-orange" />
            <span>B-99, Patel Nagar, City Center, Gwalior</span>
          </span>
          <span className="hidden md:inline text-white/30">•</span>
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/40 border border-white/10">
            {isOpenNow ? (
              <>
                <span className="live-pulse-dot"></span>
                <span className="text-emerald-400 font-bold text-[11px]">Open Now • Closes 11:00 PM</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
                <span className="text-amber-300 font-bold text-[11px]">Opens Today at 11:00 AM</span>
              </>
            )}
          </span>
        </div>

        {/* Right: Dietary & Direct Call */}
        <div className="flex items-center gap-4 text-[11px] font-medium">
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <span className="veg-symbol scale-75"></span>
            <span>100% Pure Vegetarian</span>
          </span>
          <span className="hidden sm:inline text-white/30">•</span>
          <a
            href="tel:+917838828743"
            className="flex items-center gap-1 text-amber-300 hover:text-white transition font-bold"
          >
            <Phone className="w-3 h-3 text-b57-orange" />
            <span>+91 78388 28743</span>
          </a>
        </div>

      </div>
    </div>
  );
};
