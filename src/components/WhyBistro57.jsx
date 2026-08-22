import React from 'react';

export const WhyBistro57 = () => {
  const pillars = [
    {
      icon: '🌱',
      title: 'Vegetarian Goodness',
      color: 'border-emerald-500/30 bg-emerald-950/80 text-emerald-400',
      description: 'Wide variety of 100% vegetarian food, from gourmet Italian pasta to sizzling North Indian platters & momos, prepared with utmost cleanliness.'
    },
    {
      icon: '✨',
      title: 'Made for Moments',
      color: 'border-amber-500/30 bg-amber-950/80 text-amber-400',
      description: 'A warm, comfortable place for friends, family, college groups and casual meetups with soothing lighting and great music.'
    },
    {
      icon: '☕',
      title: 'Coffee & Conversations',
      color: 'border-orange-500/30 bg-orange-950/80 text-orange-400',
      description: 'Authentic coffees pulled fresh, thick shakes, handcrafted coolers and soothing brews that spark meaningful conversations.'
    },
    {
      icon: '🍕',
      title: 'Something for Everyone',
      color: 'border-red-500/30 bg-red-950/80 text-red-400',
      description: 'Pizzas, pasta, burgers, sandwiches, Chinese momos, crispy starters, desserts & coolers — a menu curated to satisfy every craving.'
    }
  ];

  return (
    <section id="why-bistro57" className="py-24 bg-b57-brownDark text-b57-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-init reveal-fade-up">
          <span className="inline-block px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-2">
            The B57 Standard
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white mb-4">
            Why Choose Bistro 57?
          </h2>
          <p className="text-b57-cream/80 text-sm sm:text-base">
            From the first sip of cold brew to the last slice of cheesy pizza, we craft an unforgettable café experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-3xl bg-neutral-900/90 border border-white/10 hover:border-amber-500/30 transition duration-300 flex flex-col items-start group reveal-init reveal-fade-up delay-${(idx + 1) * 100}`}
            >
              <div
                className={`w-14 h-14 rounded-2xl ${p.color} border text-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition`}
              >
                {p.icon}
              </div>
              <h3 className="font-heading font-bold text-xl text-white mb-3 group-hover:text-amber-300 transition">
                {p.title}
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
