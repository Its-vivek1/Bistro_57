/**
 * BISTRO 57 - PATEL NAGAR, GWALIOR
 * Master JavaScript Engine with Grouped Menu Categorization & Robust Image Handlers
 */

document.addEventListener('DOMContentLoaded', () => {
  initLiveHours();
  initNavigation();
  initCategorizedMenu();
  initCoffeeAdvisor();
  initCartSystem();
  initReservationModal();
  initGalleryLightbox();
  initReviews();
  initContactForm();
  initQuickModals();
  initScrollReveal();
});

/* ==========================================================================
   0. SCROLL REVEAL INTERSECTION OBSERVER
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-init');
  if (!revealElements.length) return;

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   1. LIVE OPEN/CLOSED OPERATING HOURS
   Bistro 57 Patel Nagar: 11:00 AM – 11:00 PM Daily
   ========================================================================== */
function initLiveHours() {
  const statusBadges = document.querySelectorAll('.live-status-indicator');
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTimeVal = currentHour + currentMinute / 60;

  // Open between 11:00 (11.0) and 23:00 (23.0)
  const isOpen = currentTimeVal >= 11 && currentTimeVal < 23;

  statusBadges.forEach(badge => {
    if (isOpen) {
      badge.innerHTML = `
        <span class="live-pulse-dot"></span>
        <span class="font-semibold text-emerald-800 text-xs">Open Now • Closes 11:00 PM</span>
      `;
      badge.classList.remove('bg-amber-100', 'text-amber-800', 'border-amber-300');
      badge.classList.add('bg-emerald-50', 'text-emerald-800', 'border-emerald-200');
    } else {
      badge.innerHTML = `
        <span class="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
        <span class="font-semibold text-amber-900 text-xs">Opens Today at 11:00 AM</span>
      `;
      badge.classList.remove('bg-emerald-50', 'text-emerald-800', 'border-emerald-200');
      badge.classList.add('bg-amber-50', 'text-amber-900', 'border-amber-300');
    }
  });
}

/* ==========================================================================
   2. STICKY NAVIGATION & DROPDOWN BEHAVIOR
   ========================================================================== */
function initNavigation() {
  const navbar = document.getElementById('main-navbar');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
  const closeMobileMenu = document.getElementById('close-mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const menuDropdownToggle = document.getElementById('menu-dropdown-toggle');
  const menuDropdownMenu = document.getElementById('menu-dropdown-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 25) {
      navbar.classList.add('shadow-2xl', 'bg-[#120D0A]/98', 'border-amber-500/40');
      navbar.classList.remove('bg-[#181310]/95', 'border-amber-500/20');
    } else {
      navbar.classList.remove('shadow-2xl', 'bg-[#120D0A]/98', 'border-amber-500/40');
      navbar.classList.add('bg-[#181310]/95', 'border-amber-500/20');
    }
  });

  // Dropdown hover & click
  if (menuDropdownToggle && menuDropdownMenu) {
    let dropdownTimeout;
    const showDropdown = () => {
      clearTimeout(dropdownTimeout);
      menuDropdownMenu.classList.remove('opacity-0', 'invisible', 'translate-y-2');
      menuDropdownMenu.classList.add('opacity-100', 'visible', 'translate-y-0');
    };
    const hideDropdown = () => {
      dropdownTimeout = setTimeout(() => {
        menuDropdownMenu.classList.add('opacity-0', 'invisible', 'translate-y-2');
        menuDropdownMenu.classList.remove('opacity-100', 'visible', 'translate-y-0');
      }, 150);
    };

    menuDropdownToggle.parentElement.addEventListener('mouseenter', showDropdown);
    menuDropdownToggle.parentElement.addEventListener('mouseleave', hideDropdown);
  }

  // Mobile Drawer
  if (mobileMenuBtn && mobileMenuDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuDrawer.classList.remove('translate-x-full');
      document.body.style.overflow = 'hidden';
    });

    const closeDrawer = () => {
      mobileMenuDrawer.classList.add('translate-x-full');
      document.body.style.overflow = '';
    };

    if (closeMobileMenu) closeMobileMenu.addEventListener('click', closeDrawer);
    mobileNavLinks.forEach(link => link.addEventListener('click', closeDrawer));
  }
}

/* ==========================================================================
   3. MENU DATASET WITH VERIFIED HIGH-RES FOOD IMAGES
   Categories grouped systematically:
   - Group 1: ☕ Coffees & Hot Brews
   - Group 2: 🥤 Shakes, Frappes & Coolers
   - Group 3: 🍕 Artisanal Pizzas & Pastas
   - Group 4: 🍔 Burgers, Sandwiches & Wraps
   - Group 5: 🍟 Starters, Momos & Indo-Chinese
   - Group 6: 🍛 North Indian Platters
   - Group 7: 🍰 Decadent Desserts
   ========================================================================== */

const FALLBACK_FOOD_IMG = 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80';

const MENU_GROUPS = [
  {
    id: 'group-coffee',
    name: 'Coffee & Brews',
    icon: '☕',
    description: 'Freshly ground Arabica espresso, velvety steamed lattes & whipped cold brews.',
    categories: ['hot-coffee', 'cold-coffee']
  },
  {
    id: 'group-shakes',
    name: 'Shakes, Frappes & Coolers',
    icon: '🥤',
    description: 'Thick monster milkshakes, gourmet ice frappes & sparkling fruit mojitos.',
    categories: ['shakes-frappes', 'mojitos-coolers']
  },
  {
    id: 'group-pizza-pasta',
    name: 'Pizzas & Gourmet Pasta',
    icon: '🍕',
    description: 'Wood-fired style sourdough pizzas loaded with mozzarella & rich al dente pastas.',
    categories: ['pizza', 'pasta']
  },
  {
    id: 'group-burgers-sandwiches',
    name: 'Burgers, Wraps & Sandwiches',
    icon: '🍔',
    description: 'Double stacked patties, golden grilled club toasts & whole wheat wraps.',
    categories: ['burgers-wraps', 'sandwiches']
  },
  {
    id: 'group-starters-chinese',
    name: 'Starters, Momos & Indo-Chinese',
    icon: '🍟',
    description: 'Crispy wok-tossed chilli paneer, kurkure momos, spring noodles & garlic toasts.',
    categories: ['starters', 'chinese']
  },
  {
    id: 'group-meals-desserts',
    name: 'North Indian & Desserts',
    icon: '🍛',
    description: 'Slow-cooked dal makhani, shahi paneer naan combos & sizzling walnut brownies.',
    categories: ['north-indian', 'desserts']
  }
];

const MENU_DATA = [
  // --- HOT COFFEE ---
  {
    id: 'hc-1',
    name: 'Artisan Cappuccino',
    category: 'hot-coffee',
    categoryLabel: 'Hot Coffee',
    group: 'group-coffee',
    price: 139,
    rating: 4.9,
    description: 'Double espresso pulled fresh with silky steamed milk, micro-foam velvet texture & dusted with organic cocoa.',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80',
    tags: ['Best Seller', 'Barista Pick'],
    veg: true,
    spice: 0,
    preparationTime: '5-7 mins'
  },
  {
    id: 'hc-2',
    name: 'Hazelnut Warm Latte',
    category: 'hot-coffee',
    categoryLabel: 'Hot Coffee',
    group: 'group-coffee',
    price: 159,
    rating: 4.8,
    description: 'Freshly steamed milk gently folded into rich espresso infused with roasted hazelnut essence.',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80',
    tags: ['Aroma Special'],
    veg: true,
    spice: 0,
    preparationTime: '5-7 mins'
  },
  {
    id: 'hc-3',
    name: 'Irish Cream Hot Coffee',
    category: 'hot-coffee',
    categoryLabel: 'Hot Coffee',
    group: 'group-coffee',
    price: 169,
    rating: 4.9,
    description: 'Rich non-alcoholic Irish coffee blend with dark roasted espresso, whipped foam top & caramelized sugar.',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80',
    tags: ['Signature'],
    veg: true,
    spice: 0,
    preparationTime: '6 mins'
  },
  {
    id: 'hc-4',
    name: 'Café Mocha Supreme',
    category: 'hot-coffee',
    categoryLabel: 'Hot Coffee',
    group: 'group-coffee',
    price: 169,
    rating: 4.7,
    description: 'Velvety espresso paired with Belgian dark chocolate sauce, steamed milk & chocolate drizzle.',
    image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=600&q=80',
    tags: ['Chocolate Lover'],
    veg: true,
    spice: 0,
    preparationTime: '6 mins'
  },
  {
    id: 'hc-5',
    name: 'Cinnamon Spiced Brew',
    category: 'hot-coffee',
    categoryLabel: 'Hot Coffee',
    group: 'group-coffee',
    price: 149,
    rating: 4.7,
    description: 'Hand-pulled espresso with aromatic Ceylon cinnamon bark infusion and brown sugar glaze.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    tags: ['Warm Comfort'],
    veg: true,
    spice: 0,
    preparationTime: '5 mins'
  },
  {
    id: 'hc-6',
    name: 'Gourmet Hot Chocolate',
    category: 'hot-coffee',
    categoryLabel: 'Hot Coffee',
    group: 'group-coffee',
    price: 169,
    rating: 5.0,
    description: 'Thick, molten chocolate simmered with fresh whole milk and crowned with toasted marshmallows.',
    image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=600&q=80',
    tags: ['Must Try'],
    veg: true,
    spice: 0,
    preparationTime: '7 mins'
  },

  // --- COLD COFFEE ---
  {
    id: 'cc-1',
    name: 'Classic Bistro Cold Coffee',
    category: 'cold-coffee',
    categoryLabel: 'Cold Coffee',
    group: 'group-coffee',
    price: 149,
    rating: 5.0,
    description: 'Bistro 57’s iconic creamy whipped cold brew made with dark roasted beans, chilled milk & vanilla scoop.',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80',
    tags: ['Iconic Best Seller', 'Fan Favourite'],
    veg: true,
    spice: 0,
    preparationTime: '5 mins'
  },
  {
    id: 'cc-2',
    name: 'Hazelnut Cold Coffee',
    category: 'cold-coffee',
    categoryLabel: 'Cold Coffee',
    group: 'group-coffee',
    price: 179,
    rating: 4.9,
    description: 'Ultra-thick chilled coffee loaded with crunchy toasted hazelnut crush and chocolate swirl.',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80',
    tags: ['Top Pick'],
    veg: true,
    spice: 0,
    preparationTime: '5 mins'
  },
  {
    id: 'cc-3',
    name: 'Brownie Fudge Cold Coffee',
    category: 'cold-coffee',
    categoryLabel: 'Cold Coffee',
    group: 'group-coffee',
    price: 199,
    rating: 4.9,
    description: 'Rich cold coffee blended directly with warm walnut brownie fudge, chocolate shavings & choco chips.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80',
    tags: ['Decadent'],
    veg: true,
    spice: 0,
    preparationTime: '6 mins'
  },
  {
    id: 'cc-4',
    name: 'Caramel Macchiato Chilled',
    category: 'cold-coffee',
    categoryLabel: 'Cold Coffee',
    group: 'group-coffee',
    price: 179,
    rating: 4.8,
    description: 'Espresso poured over iced vanilla milk with rich sea-salt caramel drizzle on top.',
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=600&q=80',
    tags: ['Sweet & Salty'],
    veg: true,
    spice: 0,
    preparationTime: '5 mins'
  },

  // --- SHAKES & FRAPPES ---
  {
    id: 'sf-1',
    name: 'Lotus Biscoff Frappe',
    category: 'shakes-frappes',
    categoryLabel: 'Shakes & Frappes',
    group: 'group-shakes',
    price: 219,
    rating: 5.0,
    description: 'Gourmet spiced Speculoos cookie butter blended into thick iced frappe topped with crushed Biscoff crumbs.',
    image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=600&q=80',
    tags: ['Trending', 'Fan Favourite'],
    veg: true,
    spice: 0,
    preparationTime: '6 mins'
  },
  {
    id: 'sf-2',
    name: 'Ferrero Rocher Nutella Shake',
    category: 'shakes-frappes',
    categoryLabel: 'Shakes & Frappes',
    group: 'group-shakes',
    price: 229,
    rating: 5.0,
    description: 'Crushed whole Ferrero Rocher pralines, pure Nutella swirl, rich vanilla cream & crispy wafer stick.',
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&q=80',
    tags: ['Premium Delight'],
    veg: true,
    spice: 0,
    preparationTime: '7 mins'
  },
  {
    id: 'sf-3',
    name: 'Tiramisu Choco Frappe',
    category: 'shakes-frappes',
    categoryLabel: 'Shakes & Frappes',
    group: 'group-shakes',
    price: 209,
    rating: 4.8,
    description: 'Italian mascarpone flavored frappe blended with espresso and dusted with premium cocoa.',
    image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=600&q=80',
    tags: ['Italian Twist'],
    veg: true,
    spice: 0,
    preparationTime: '6 mins'
  },
  {
    id: 'sf-4',
    name: 'Oreo Overload Thick Shake',
    category: 'shakes-frappes',
    categoryLabel: 'Shakes & Frappes',
    group: 'group-shakes',
    price: 189,
    rating: 4.9,
    description: 'Double crunchy Oreo cookies whipped with thick vanilla dairy base and chocolate drizzle.',
    image: 'https://images.unsplash.com/photo-1568909344668-6f14a07b56a0?auto=format&fit=crop&w=600&q=80',
    tags: ['Youth Favourite'],
    veg: true,
    spice: 0,
    preparationTime: '5 mins'
  },
  {
    id: 'sf-5',
    name: 'KitKat Crunchy Shake',
    category: 'shakes-frappes',
    categoryLabel: 'Shakes & Frappes',
    group: 'group-shakes',
    price: 189,
    rating: 4.8,
    description: 'Crispy wafer KitKat bars blended with chocolate ice cream and whipped dairy crown.',
    image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=600&q=80',
    tags: ['Kids & Youth'],
    veg: true,
    spice: 0,
    preparationTime: '5 mins'
  },

  // --- MOJITOS & COOLERS ---
  {
    id: 'mc-1',
    name: 'Fresh Watermelon Mint Mojito',
    category: 'mojitos-coolers',
    categoryLabel: 'Mojitos & Coolers',
    group: 'group-shakes',
    price: 149,
    rating: 4.9,
    description: 'Muddled fresh watermelon chunks, garden mint sprigs, zesty lemon juice & sparkling club soda on crushed ice.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
    tags: ['Summer Hit', 'Refreshing'],
    veg: true,
    spice: 0,
    preparationTime: '4 mins'
  },
  {
    id: 'mc-2',
    name: 'Crisp Green Apple Fizz',
    category: 'mojitos-coolers',
    categoryLabel: 'Mojitos & Coolers',
    group: 'group-shakes',
    price: 149,
    rating: 4.8,
    description: 'Tangy Granny Smith apple crush, lime wedge, fresh mint leaves & chilled effervescent soda.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    tags: ['Tangy'],
    veg: true,
    spice: 0,
    preparationTime: '4 mins'
  },
  {
    id: 'mc-3',
    name: 'Classic Virgin Mojito',
    category: 'mojitos-coolers',
    categoryLabel: 'Mojitos & Coolers',
    group: 'group-shakes',
    price: 139,
    rating: 4.8,
    description: 'Muddled fragrant mint leaves, cane sugar, lime juice, dash of rock salt & bubbly fizz.',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=600&q=80',
    tags: ['All-Time Fav'],
    veg: true,
    spice: 0,
    preparationTime: '4 mins'
  },
  {
    id: 'mc-4',
    name: 'Wild Strawberry Blossom Cooler',
    category: 'mojitos-coolers',
    categoryLabel: 'Mojitos & Coolers',
    group: 'group-shakes',
    price: 159,
    rating: 4.9,
    description: 'Juicy hill strawberries muddled with fresh basil and citrus fizz served with ice crystal rim.',
    image: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?auto=format&fit=crop&w=600&q=80',
    tags: ['Vibrant'],
    veg: true,
    spice: 0,
    preparationTime: '4 mins'
  },

  // --- PIZZA ---
  {
    id: 'pz-1',
    name: 'Tandoori Paneer Tikka Pizza',
    category: 'pizza',
    categoryLabel: 'Artisanal Pizza',
    group: 'group-pizza-pasta',
    price: 269,
    rating: 5.0,
    description: 'Hand-stretched sourdough base, spiced paneer cubes, roasted bell peppers, red onions, liquid mozzarella & tandoori drizzle.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    tags: ['Fan Favourite', 'Chef Special'],
    veg: true,
    spice: 2,
    preparationTime: '12-15 mins'
  },
  {
    id: 'pz-2',
    name: 'Bistro 57 Farmhouse Supreme',
    category: 'pizza',
    categoryLabel: 'Artisanal Pizza',
    group: 'group-pizza-pasta',
    price: 259,
    rating: 4.9,
    description: 'Fresh mushrooms, golden sweet corn, black olives, crisp capsicum, jalapeños & 100% dairy mozzarella.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
    tags: ['Bestseller'],
    veg: true,
    spice: 1,
    preparationTime: '12-15 mins'
  },
  {
    id: 'pz-3',
    name: 'Peri Peri Paneer Burst Pizza',
    category: 'pizza',
    categoryLabel: 'Artisanal Pizza',
    group: 'group-pizza-pasta',
    price: 279,
    rating: 4.9,
    description: 'Fiery peri-peri marinated paneer, paprika flakes, cheesy cheddar burst ring and spicy garlic dip.',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80',
    tags: ['Spicy Kick'],
    veg: true,
    spice: 3,
    preparationTime: '14 mins'
  },
  {
    id: 'pz-4',
    name: 'Classic Italian Margherita',
    category: 'pizza',
    categoryLabel: 'Artisanal Pizza',
    group: 'group-pizza-pasta',
    price: 219,
    rating: 4.8,
    description: 'San Marzano tomato sauce, fresh buffalo mozzarella, aromatic basil leaves and extra virgin olive oil.',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80',
    tags: ['Classic'],
    veg: true,
    spice: 0,
    preparationTime: '12 mins'
  },

  // --- PASTA ---
  {
    id: 'ps-1',
    name: 'Creamy Alfredo White Sauce Pasta',
    category: 'pasta',
    categoryLabel: 'Gourmet Pasta',
    group: 'group-pizza-pasta',
    price: 219,
    rating: 5.0,
    description: 'Al dente Penne pasta tossed in rich garlic parmesan cream sauce with sautéed mushrooms, broccoli & oregano herbs.',
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=600&q=80',
    tags: ['Fan Favourite', 'Rich & Creamy'],
    veg: true,
    spice: 0,
    preparationTime: '12 mins'
  },
  {
    id: 'ps-2',
    name: 'Spicy Arrabiata Red Sauce Pasta',
    category: 'pasta',
    categoryLabel: 'Gourmet Pasta',
    group: 'group-pizza-pasta',
    price: 209,
    rating: 4.8,
    description: 'Penne simmered in spicy San Marzano tomato sauce, garlic flakes, red chilli peppers, fresh basil & black olives.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
    tags: ['Zesty'],
    veg: true,
    spice: 2,
    preparationTime: '10 mins'
  },

  // --- BURGERS & WRAPS ---
  {
    id: 'bg-1',
    name: 'Double Loaded Paneer Burger',
    category: 'burgers-wraps',
    categoryLabel: 'Burgers & Wraps',
    group: 'group-burgers-sandwiches',
    price: 189,
    rating: 5.0,
    description: 'Crispy fried herb paneer patty + grilled cottage cheese slice, molten cheese drip, caramelized onions & secret B57 sauce.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    tags: ['Fan Favourite', 'Must Try'],
    veg: true,
    spice: 2,
    preparationTime: '10 mins'
  },
  {
    id: 'bg-2',
    name: 'Crispy Veggie Crunch Burger',
    category: 'burgers-wraps',
    categoryLabel: 'Burgers & Wraps',
    group: 'group-burgers-sandwiches',
    price: 149,
    rating: 4.7,
    description: 'Golden fried vegetable & corn patty with fresh iceberg lettuce, sliced tomatoes, gherkins & tangy thousand island dip.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
    tags: ['Crispy'],
    veg: true,
    spice: 1,
    preparationTime: '8 mins'
  },
  {
    id: 'bg-3',
    name: 'Cheesy Paneer Tikka Wrap',
    category: 'burgers-wraps',
    categoryLabel: 'Burgers & Wraps',
    group: 'group-burgers-sandwiches',
    price: 169,
    rating: 4.9,
    description: 'Flaky whole-wheat wrap stuffed with smoky paneer chunks, bell peppers, mint chutney & shredded mozzarella.',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=600&q=80',
    tags: ['Bestseller Wrap'],
    veg: true,
    spice: 2,
    preparationTime: '8 mins'
  },

  // --- SANDWICHES ---
  {
    id: 'sw-1',
    name: 'B57 Special Grilled Club Sandwich',
    category: 'sandwiches',
    categoryLabel: 'Sandwiches',
    group: 'group-burgers-sandwiches',
    price: 179,
    rating: 5.0,
    description: 'Triple-decker butter-toasted sandwich loaded with spiced paneer, garden veggies, creamy cheese slice & green herb chutney.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
    tags: ['Signature Club', 'Fan Favourite'],
    veg: true,
    spice: 1,
    preparationTime: '8-10 mins'
  },
  {
    id: 'sw-2',
    name: 'Corn & Mozzarella Melt Toast',
    category: 'sandwiches',
    categoryLabel: 'Sandwiches',
    group: 'group-burgers-sandwiches',
    price: 149,
    rating: 4.8,
    description: 'Golden sweet corn, chopped jalapeños, Italian herbs & gooey mozzarella grilled to crisp perfection.',
    image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=600&q=80',
    tags: ['Cheesy'],
    veg: true,
    spice: 1,
    preparationTime: '7 mins'
  },

  // --- STARTERS & CRISPIES ---
  {
    id: 'st-1',
    name: 'Crispy Chilli Paneer Dry',
    category: 'starters',
    categoryLabel: 'Starters',
    group: 'group-starters-chinese',
    price: 229,
    rating: 5.0,
    description: 'Wok-tossed cottage cheese cubes with scallions, capsicum, dark soya glaze, ginger and crushed black pepper.',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80',
    tags: ['Fan Favourite', 'Crowd Pleaser'],
    veg: true,
    spice: 2,
    preparationTime: '10 mins'
  },
  {
    id: 'st-2',
    name: 'Crispy Honey Chilli Potato',
    category: 'starters',
    categoryLabel: 'Starters',
    group: 'group-starters-chinese',
    price: 179,
    rating: 4.9,
    description: 'Deep-fried golden potato fingers coated with wild honey, spicy schezwan sauce and toasted sesame seeds.',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80',
    tags: ['Crunchy Sweet & Spicy'],
    veg: true,
    spice: 2,
    preparationTime: '8 mins'
  },
  {
    id: 'st-3',
    name: 'Cheese Garlic Bread Supreme',
    category: 'starters',
    categoryLabel: 'Starters',
    group: 'group-starters-chinese',
    price: 159,
    rating: 4.9,
    description: 'Warm baguette slices topped with roasted garlic butter, molten mozzarella cheese, jalapeños & chilli flakes.',
    image: 'https://images.unsplash.com/photo-1619860860774-1e2e17343432?auto=format&fit=crop&w=600&q=80',
    tags: ['Cheesy Bite'],
    veg: true,
    spice: 1,
    preparationTime: '7 mins'
  },

  // --- CHINESE / INDO-CHINESE & MOMOS ---
  {
    id: 'ch-1',
    name: 'Steamed Veg Darjeeling Momos',
    category: 'chinese',
    categoryLabel: 'Chinese & Momos',
    group: 'group-starters-chinese',
    price: 139,
    rating: 4.9,
    description: 'Handcrafted thin-skin dumplings packed with finely shredded cabbage, carrots, ginger and spring onions with spicy red dip.',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=600&q=80',
    tags: ['Authentic', 'Fan Favourite'],
    veg: true,
    spice: 2,
    preparationTime: '8 mins'
  },
  {
    id: 'ch-2',
    name: 'Kurkure Crispy Paneer Momos',
    category: 'chinese',
    categoryLabel: 'Chinese & Momos',
    group: 'group-starters-chinese',
    price: 169,
    rating: 5.0,
    description: 'Paneer momos coated in crunchy cornflake crust, fried golden and served with tandoori mayo and fiery chutney.',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
    tags: ['Ultra Crispy'],
    veg: true,
    spice: 2,
    preparationTime: '10 mins'
  },
  {
    id: 'ch-3',
    name: 'Wok Hakka Noodles',
    category: 'chinese',
    categoryLabel: 'Chinese & Momos',
    group: 'group-starters-chinese',
    price: 169,
    rating: 4.8,
    description: 'Classic wok-tossed noodles with shredded bell peppers, cabbage, bean sprouts, soya sauce and garlic oil.',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80',
    tags: ['Wok Fresh'],
    veg: true,
    spice: 1,
    preparationTime: '8 mins'
  },

  // --- NORTH INDIAN ---
  {
    id: 'ni-1',
    name: 'Shahi Paneer with Butter Naan Combo',
    category: 'north-indian',
    categoryLabel: 'North Indian',
    group: 'group-meals-desserts',
    price: 249,
    rating: 4.9,
    description: 'Silky cashew & tomato gravy with soft paneer cubes, topped with cream swirl and served with 2 hot butter naans.',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80',
    tags: ['Rich Platter'],
    veg: true,
    spice: 1,
    preparationTime: '12 mins'
  },
  {
    id: 'ni-2',
    name: 'Slow-Cooked Dal Makhani Rice Bowl',
    category: 'north-indian',
    categoryLabel: 'North Indian',
    group: 'group-meals-desserts',
    price: 219,
    rating: 4.9,
    description: 'Black lentils slow-cooked overnight with white butter and fresh cream, served with fragrant jeera basmati rice.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    tags: ['Desi Classic'],
    veg: true,
    spice: 1,
    preparationTime: '10 mins'
  },

  // --- DESSERTS ---
  {
    id: 'ds-1',
    name: 'Sizzling Brownie with Vanilla Ice Cream',
    category: 'desserts',
    categoryLabel: 'Desserts',
    group: 'group-meals-desserts',
    price: 189,
    rating: 5.0,
    description: 'Warm walnut fudge brownie placed on a smoking iron sizzler plate, crowned with French vanilla gelato and hot melted chocolate cascade.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
    tags: ['Sizzling Showstopper', 'Fan Favourite'],
    veg: true,
    spice: 0,
    preparationTime: '6 mins'
  },
  {
    id: 'ds-2',
    name: 'Belgian Waffle with Nutella & Biscoff',
    category: 'desserts',
    categoryLabel: 'Desserts',
    group: 'group-meals-desserts',
    price: 199,
    rating: 4.9,
    description: 'Freshly baked golden waffle drizzled generously with warm Nutella and Lotus Biscoff butter spread.',
    image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=600&q=80',
    tags: ['Indulgent'],
    veg: true,
    spice: 0,
    preparationTime: '8 mins'
  }
];

let selectedGroupFilter = 'all';
let selectedCategoryFilter = 'all';
let menuSearchQuery = '';

/* ==========================================================================
   4. CATEGORIZED MENU RENDERING ENGINE
   ========================================================================== */
function initCategorizedMenu() {
  const container = document.getElementById('menu-grid-container');
  const groupTabsContainer = document.getElementById('menu-group-tabs');
  const categoryPillsContainer = document.getElementById('menu-category-pills');
  const searchInput = document.getElementById('menu-search-input');
  const itemsCountLabel = document.getElementById('menu-items-count');

  if (!container) return;

  // Render Sub-Category Pills based on selected group
  function renderSubCategoryPills() {
    if (!categoryPillsContainer) return;

    let availableCategories = [];
    if (selectedGroupFilter === 'all') {
      availableCategories = [
        { id: 'all', label: 'All Subcategories', icon: '✨' },
        { id: 'hot-coffee', label: 'Hot Coffee', icon: '☕' },
        { id: 'cold-coffee', label: 'Cold Coffee', icon: '🧊' },
        { id: 'shakes-frappes', label: 'Shakes & Frappes', icon: '🥤' },
        { id: 'mojitos-coolers', label: 'Mojitos & Coolers', icon: '🍹' },
        { id: 'pizza', label: 'Artisanal Pizza', icon: '🍕' },
        { id: 'pasta', label: 'Gourmet Pasta', icon: '🍝' },
        { id: 'burgers-wraps', label: 'Burgers & Wraps', icon: '🍔' },
        { id: 'sandwiches', label: 'Sandwiches', icon: '🥪' },
        { id: 'starters', label: 'Starters', icon: '🍟' },
        { id: 'chinese', label: 'Chinese & Momos', icon: '🥟' },
        { id: 'north-indian', label: 'North Indian', icon: '🍛' },
        { id: 'desserts', label: 'Desserts', icon: '🍰' }
      ];
    } else {
      const activeGroup = MENU_GROUPS.find(g => g.id === selectedGroupFilter);
      if (activeGroup) {
        availableCategories = [{ id: 'all', label: 'All in ' + activeGroup.name, icon: '🌟' }];
        activeGroup.categories.forEach(catId => {
          const sample = MENU_DATA.find(m => m.category === catId);
          if (sample) {
            availableCategories.push({ id: catId, label: sample.categoryLabel, icon: activeGroup.icon });
          }
        });
      }
    }

    categoryPillsContainer.innerHTML = availableCategories.map(cat => {
      const count = (cat.id === 'all')
        ? (selectedGroupFilter === 'all' ? MENU_DATA.length : MENU_DATA.filter(m => m.group === selectedGroupFilter).length)
        : MENU_DATA.filter(m => m.category === cat.id).length;

      const isActive = selectedCategoryFilter === cat.id;

      return `
        <button class="menu-sub-pill text-xs font-bold py-2 px-4 rounded-full border transition whitespace-nowrap flex items-center gap-1.5 ${
          isActive 
            ? 'bg-b57-brown text-white border-b57-orange shadow-md' 
            : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-100'
        }" data-category-id="${cat.id}">
          <span>${cat.icon}</span>
          <span>${cat.label}</span>
          <span class="text-[10px] py-0.5 px-1.5 rounded-full ${isActive ? 'bg-amber-500 text-neutral-950' : 'bg-neutral-100 text-neutral-500'} font-extrabold">${count}</span>
        </button>
      `;
    }).join('');

    categoryPillsContainer.querySelectorAll('.menu-sub-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedCategoryFilter = btn.getAttribute('data-category-id');
        renderSubCategoryPills();
        renderMenuCards();
      });
    });
  }

  // Render Menu Cards
  function renderMenuCards() {
    let filtered = MENU_DATA.filter(item => {
      const matchesGroup = (selectedGroupFilter === 'all' || item.group === selectedGroupFilter);
      const matchesCategory = (selectedCategoryFilter === 'all' || item.category === selectedCategoryFilter);
      const matchesSearch = item.name.toLowerCase().includes(menuSearchQuery) ||
                            item.description.toLowerCase().includes(menuSearchQuery) ||
                            item.categoryLabel.toLowerCase().includes(menuSearchQuery);
      return matchesGroup && matchesCategory && matchesSearch;
    });

    if (itemsCountLabel) {
      itemsCountLabel.textContent = `Showing ${filtered.length} pure vegetarian specialties`;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full text-center py-16 px-4 bg-white rounded-3xl border border-neutral-200">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 text-2xl">
            🔍
          </div>
          <h4 class="text-xl font-bold font-heading text-neutral-800 mb-2">No dishes found</h4>
          <p class="text-neutral-500 max-w-md mx-auto mb-6 text-sm">We couldn't find any dishes matching your query. Try searching for coffee, pizza, pasta or shakes.</p>
          <button id="reset-menu-filters" class="btn-primary-b57 text-xs py-2.5 px-6">Reset All Filters</button>
        </div>
      `;
      const resetBtn = document.getElementById('reset-menu-filters');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          selectedGroupFilter = 'all';
          selectedCategoryFilter = 'all';
          menuSearchQuery = '';
          if (searchInput) searchInput.value = '';
          if (groupTabsContainer) {
            groupTabsContainer.querySelectorAll('.menu-group-btn').forEach((b, i) => {
              b.classList.toggle('active', i === 0);
            });
          }
          renderSubCategoryPills();
          renderMenuCards();
        });
      }
      return;
    }

    // Build Cards
    container.innerHTML = filtered.map(item => `
      <div class="food-card card-cream-b57 overflow-hidden flex flex-col justify-between group h-full">
        <div>
          <div class="food-card-img-wrap h-48 sm:h-52 w-full relative bg-neutral-100">
            <img src="${item.image}" alt="${item.name}" loading="lazy" class="w-full h-full object-cover" onerror="this.onerror=null; this.src='${FALLBACK_FOOD_IMG}';">
            
            <div class="absolute top-3 left-3 flex gap-1.5 flex-wrap">
              <span class="veg-symbol" title="100% Pure Vegetarian"></span>
              ${item.tags && item.tags.length > 0 ? `
                <span class="b57-badge b57-badge-bestseller text-[10px] font-bold shadow-sm">${item.tags[0]}</span>
              ` : ''}
            </div>

            <div class="absolute bottom-3 right-3 bg-neutral-900/85 backdrop-blur-md text-amber-300 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
              <span>★</span> ${item.rating.toFixed(1)}
            </div>
          </div>

          <div class="p-5">
            <div class="flex items-center justify-between gap-2 mb-1.5">
              <span class="text-[11px] uppercase font-bold tracking-wider text-b57-orange font-body">${item.categoryLabel}</span>
              <span class="text-[11px] text-neutral-400 font-medium">⏱ ${item.preparationTime}</span>
            </div>
            <h3 class="text-lg font-bold font-heading text-neutral-900 group-hover:text-b57-red transition-colors leading-snug mb-2">
              ${item.name}
            </h3>
            <p class="text-neutral-600 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
              ${item.description}
            </p>
          </div>
        </div>
        
        <div class="px-5 pb-5 pt-3 flex items-center justify-between border-t border-neutral-100 mt-auto bg-neutral-50/40">
          <div>
            <span class="text-[10px] text-neutral-400 block font-bold uppercase tracking-wider">Price</span>
            <span class="text-xl font-bold font-heading text-neutral-900">₹${item.price}</span>
          </div>
          <div class="flex items-center gap-2">
            <button class="quick-view-btn text-xs font-semibold text-neutral-600 hover:text-neutral-900 p-2 rounded-full hover:bg-neutral-200 transition" data-id="${item.id}" title="View Details">
              ℹ️
            </button>
            <button class="add-to-cart-btn btn-primary-b57 text-xs py-2 px-4 shadow-sm" data-id="${item.id}">
              <span>+ Add</span>
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Attach listeners
    container.querySelectorAll('.add-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const item = MENU_DATA.find(x => x.id === id);
        if (item) {
          addToCart(item);
        }
      });
    });

    container.querySelectorAll('.quick-view-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const item = MENU_DATA.find(x => x.id === id);
        if (item) {
          openItemDetailModal(item);
        }
      });
    });
  }

  // Setup Group Tabs (Major Super-Categories)
  if (groupTabsContainer) {
    const groupButtonsHTML = `
      <button class="menu-group-btn active" data-group-id="all">
        <span>🍽️</span> All Specialties
      </button>
      ${MENU_GROUPS.map(g => `
        <button class="menu-group-btn" data-group-id="${g.id}">
          <span>${g.icon}</span> ${g.name}
        </button>
      `).join('')}
    `;
    groupTabsContainer.innerHTML = groupButtonsHTML;

    groupTabsContainer.querySelectorAll('.menu-group-btn').forEach(tab => {
      tab.addEventListener('click', () => {
        groupTabsContainer.querySelectorAll('.menu-group-btn').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        selectedGroupFilter = tab.getAttribute('data-group-id');
        selectedCategoryFilter = 'all'; // reset sub-filter on group change
        renderSubCategoryPills();
        renderMenuCards();
      });
    });
  }

  // Search Input Listener
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      menuSearchQuery = e.target.value.toLowerCase().trim();
      renderMenuCards();
    });
  }

  // Global category jump trigger (e.g. from navbar dropdown)
  window.jumpToMenuCategory = (groupId, categoryId = 'all') => {
    selectedGroupFilter = groupId;
    selectedCategoryFilter = categoryId;

    if (groupTabsContainer) {
      groupTabsContainer.querySelectorAll('.menu-group-btn').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-group-id') === groupId);
      });
    }

    renderSubCategoryPills();
    renderMenuCards();

    const menuEl = document.getElementById('menu-section');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Initial Render
  renderSubCategoryPills();
  renderMenuCards();
}

/* ==========================================================================
   5. INTERACTIVE COFFEE ADVISOR
   ========================================================================== */
function initCoffeeAdvisor() {
  const tempButtons = document.querySelectorAll('.coffee-temp-btn');
  const strengthButtons = document.querySelectorAll('.coffee-strength-btn');
  const flavorSelect = document.getElementById('coffee-flavor-select');
  const advisorResultBox = document.getElementById('coffee-advisor-result');
  const advisorAddBtn = document.getElementById('advisor-add-cart-btn');

  let selectedTemp = 'cold';
  let selectedStrength = 'creamy';

  if (!advisorResultBox) return;

  function updateCoffeeRecommendation() {
    let rec = {
      name: 'Classic Bistro Cold Coffee',
      price: 149,
      id: 'cc-1',
      image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80',
      reason: 'A perfect creamy cold-whipped classic with rich Arabica roast notes.'
    };

    const flavor = flavorSelect ? flavorSelect.value : 'classic';

    if (selectedTemp === 'cold') {
      if (flavor === 'hazelnut') {
        rec = {
          name: 'Hazelnut Cold Coffee',
          price: 179,
          id: 'cc-2',
          image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80',
          reason: 'Chilled Arabica shot blended with roasted hazelnut crunch.'
        };
      } else if (flavor === 'caramel') {
        rec = {
          name: 'Caramel Macchiato Chilled',
          price: 179,
          id: 'cc-4',
          image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=600&q=80',
          reason: 'Velvety cold brew with rich sea-salt caramel drizzle.'
        };
      } else if (flavor === 'chocolate' || selectedStrength === 'indulgent') {
        rec = {
          name: 'Brownie Fudge Cold Coffee',
          price: 199,
          id: 'cc-3',
          image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80',
          reason: 'Decadent chocolate brownie fudge blended with dark roast espresso.'
        };
      }
    } else { // Hot Coffee
      if (selectedStrength === 'bold') {
        rec = {
          name: 'Artisan Cappuccino',
          price: 139,
          id: 'hc-1',
          image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80',
          reason: 'Bold double espresso pulled fresh with rich micro-foam.'
        };
      } else if (flavor === 'hazelnut') {
        rec = {
          name: 'Hazelnut Warm Latte',
          price: 159,
          id: 'hc-2',
          image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80',
          reason: 'Steamed micro-foam milk with roasted hazelnut espresso notes.'
        };
      } else if (flavor === 'chocolate') {
        rec = {
          name: 'Gourmet Hot Chocolate',
          price: 169,
          id: 'hc-6',
          image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=600&q=80',
          reason: 'Molten Belgian chocolate simmered with fresh milk.'
        };
      } else {
        rec = {
          name: 'Artisan Cappuccino',
          price: 139,
          id: 'hc-1',
          image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80',
          reason: 'Silky micro-foam with rich espresso and cocoa dusting.'
        };
      }
    }

    advisorResultBox.innerHTML = `
      <div class="flex items-center gap-4 advisor-card-animate">
        <img src="${rec.image}" alt="${rec.name}" class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-amber-500/30 shadow-md" onerror="this.onerror=null; this.src='${FALLBACK_FOOD_IMG}';">
        <div>
          <span class="text-[10px] uppercase font-bold tracking-widest text-amber-400 block">Recommended For You</span>
          <h4 class="font-heading font-bold text-base sm:text-lg text-white">${rec.name}</h4>
          <p class="text-xs text-neutral-300 mt-0.5 line-clamp-1">${rec.reason}</p>
          <div class="text-sm font-bold text-amber-400 mt-1">₹${rec.price}</div>
        </div>
      </div>
    `;

    if (advisorAddBtn) {
      advisorAddBtn.onclick = () => {
        addToCart({
          id: rec.id,
          name: rec.name,
          price: rec.price,
          image: rec.image
        });
      };
    }
  }

  tempButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tempButtons.forEach(b => b.classList.remove('bg-b57-orange', 'text-white', 'border-b57-orange'));
      tempButtons.forEach(b => b.classList.add('bg-neutral-800', 'text-neutral-300'));
      btn.classList.add('bg-b57-orange', 'text-white', 'border-b57-orange');
      btn.classList.remove('bg-neutral-800', 'text-neutral-300');
      selectedTemp = btn.getAttribute('data-temp');
      updateCoffeeRecommendation();
    });
  });

  strengthButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      strengthButtons.forEach(b => b.classList.remove('bg-b57-orange', 'text-white', 'border-b57-orange'));
      strengthButtons.forEach(b => b.classList.add('bg-neutral-800', 'text-neutral-300'));
      btn.classList.add('bg-b57-orange', 'text-white', 'border-b57-orange');
      btn.classList.remove('bg-neutral-800', 'text-neutral-300');
      selectedStrength = btn.getAttribute('data-strength');
      updateCoffeeRecommendation();
    });
  });

  if (flavorSelect) {
    flavorSelect.addEventListener('change', updateCoffeeRecommendation);
  }

  updateCoffeeRecommendation();
}

/* ==========================================================================
   6. SHOPPING CART & WHATSAPP CHECKOUT SYSTEM
   ========================================================================== */
let cart = [];

function initCartSystem() {
  const cartDrawer = document.getElementById('cart-drawer');
  const openCartBtns = document.querySelectorAll('.open-cart-btn');
  const closeCartBtn = document.getElementById('close-cart-drawer');
  const cartDrawerOverlay = document.getElementById('cart-drawer-overlay');
  const cartItemsContainer = document.getElementById('cart-items-list');
  const cartBadgeCount = document.querySelectorAll('.cart-badge-count');
  const subtotalEl = document.getElementById('cart-subtotal');
  const gstEl = document.getElementById('cart-gst');
  const grandTotalEl = document.getElementById('cart-grand-total');
  const checkoutWhatsAppBtn = document.getElementById('checkout-whatsapp-btn');

  function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadgeCount.forEach(el => {
      el.textContent = totalItems;
      el.style.display = totalItems > 0 ? 'flex' : 'none';
    });

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const gst = Math.round(subtotal * 0.05); // 5% GST on Restaurant F&B
    const grandTotal = subtotal > 0 ? (subtotal + gst) : 0;

    if (subtotalEl) subtotalEl.textContent = `₹${subtotal}`;
    if (gstEl) gstEl.textContent = `₹${gst}`;
    if (grandTotalEl) grandTotalEl.textContent = `₹${grandTotal}`;

    if (!cartItemsContainer) return;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="text-center py-16 px-4">
          <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-amber-50 flex items-center justify-center text-3xl">
            ☕
          </div>
          <h4 class="text-lg font-bold font-heading text-neutral-800 mb-1">Your Cart is Empty</h4>
          <p class="text-neutral-500 text-xs max-w-xs mx-auto mb-6">Explore our pure vegetarian menu and add your favourite coffee, pizzas & snacks.</p>
          <a href="#menu-section" class="btn-primary-b57 text-xs py-2.5 px-5 close-drawer-on-click">Explore Menu</a>
        </div>
      `;
      const link = cartItemsContainer.querySelector('.close-drawer-on-click');
      if (link) {
        link.addEventListener('click', closeCart);
      }
      return;
    }

    cartItemsContainer.innerHTML = cart.map((item, index) => `
      <div class="flex items-center justify-between gap-3 p-3.5 bg-white rounded-2xl border border-neutral-100 shadow-sm">
        <img src="${item.image}" alt="${item.name}" class="w-14 h-14 rounded-xl object-cover flex-shrink-0" onerror="this.onerror=null; this.src='${FALLBACK_FOOD_IMG}';">
        <div class="flex-1 min-w-0">
          <h5 class="font-bold text-xs sm:text-sm text-neutral-900 truncate">${item.name}</h5>
          <div class="text-[11px] text-neutral-500 mb-1">₹${item.price} each</div>
          <div class="flex items-center gap-2">
            <button class="cart-qty-btn w-6 h-6 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold flex items-center justify-center text-xs" data-action="decrease" data-index="${index}">-</button>
            <span class="text-xs font-bold w-4 text-center">${item.quantity}</span>
            <button class="cart-qty-btn w-6 h-6 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold flex items-center justify-center text-xs" data-action="increase" data-index="${index}">+</button>
          </div>
        </div>
        <div class="text-right flex-shrink-0">
          <div class="font-bold font-heading text-sm text-neutral-900">₹${item.price * item.quantity}</div>
          <button class="remove-cart-item text-[11px] text-red-500 hover:text-red-700 mt-1" data-index="${index}">Remove</button>
        </div>
      </div>
    `).join('');

    // Attach listeners
    cartItemsContainer.querySelectorAll('.cart-qty-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.currentTarget.getAttribute('data-index'), 10);
        const action = e.currentTarget.getAttribute('data-action');
        if (action === 'increase') {
          cart[index].quantity += 1;
        } else if (action === 'decrease') {
          if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
          } else {
            cart.splice(index, 1);
          }
        }
        updateCartUI();
      });
    });

    cartItemsContainer.querySelectorAll('.remove-cart-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.currentTarget.getAttribute('data-index'), 10);
        const removed = cart[index].name;
        cart.splice(index, 1);
        updateCartUI();
        showToast(`Removed "${removed}" from cart`, 'info');
      });
    });
  }

  function openCart() {
    if (cartDrawer) {
      cartDrawer.classList.remove('translate-x-full');
      if (cartDrawerOverlay) cartDrawerOverlay.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      updateCartUI();
    }
  }

  function closeCart() {
    if (cartDrawer) {
      cartDrawer.classList.add('translate-x-full');
      if (cartDrawerOverlay) cartDrawerOverlay.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  openCartBtns.forEach(btn => btn.addEventListener('click', openCart));
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
  if (cartDrawerOverlay) cartDrawerOverlay.addEventListener('click', closeCart);

  // WhatsApp Checkout integration
  if (checkoutWhatsAppBtn) {
    checkoutWhatsAppBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        showToast('Your cart is empty. Please add some items first!', 'warning');
        return;
      }

      const orderTypeSelect = document.getElementById('order-type-select');
      const orderType = orderTypeSelect ? orderTypeSelect.value : 'Takeaway';
      const customerNameInput = document.getElementById('cart-customer-name');
      const customerName = customerNameInput && customerNameInput.value.trim() ? customerNameInput.value.trim() : 'Guest';
      const notesInput = document.getElementById('cart-special-notes');
      const notes = notesInput && notesInput.value.trim() ? notesInput.value.trim() : 'None';

      const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const gst = Math.round(subtotal * 0.05);
      const grandTotal = subtotal + gst;

      let itemsList = cart.map(i => `• ${i.quantity}x ${i.name} (₹${i.price * i.quantity})`).join('\n');

      let message = `*NEW ORDER - BISTRO 57 GWALIOR*\n`;
      message += `--------------------------------\n`;
      message += `👤 *Customer Name:* ${customerName}\n`;
      message += `🍽️ *Order Type:* ${orderType}\n`;
      message += `📍 *Location:* Patel Nagar, City Center, Gwalior\n\n`;
      message += `*Items Ordered:*\n${itemsList}\n\n`;
      message += `--------------------------------\n`;
      message += `Subtotal: ₹${subtotal}\n`;
      message += `GST (5%): ₹${gst}\n`;
      message += `*Grand Total: ₹${grandTotal}*\n`;
      message += `--------------------------------\n`;
      message += `📝 *Special Notes:* ${notes}\n\n`;
      message += `Please confirm my order and share preparation time! ☕`;

      const whatsappURL = `https://wa.me/917838828743?text=${encodeURIComponent(message)}`;
      window.open(whatsappURL, '_blank');

      showToast('Order details prepared! Opening WhatsApp...', 'success');
    });
  }

  // Expose global addToCart
  window.addToCart = (item) => {
    const existing = cart.find(x => x.id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }
    updateCartUI();

    // Trigger pulse / bounce animation on cart badges
    cartBadgeCount.forEach(el => {
      el.classList.remove('cart-badge-bounce');
      void el.offsetWidth; // Force DOM reflow to restart animation
      el.classList.add('cart-badge-bounce');
    });

    showToast(`Added "${item.name}" to cart!`, 'success');
  };

  updateCartUI();
}

/* ==========================================================================
   7. FOOD ITEM DETAIL & CUSTOMIZATION MODAL
   ========================================================================== */
function openItemDetailModal(item) {
  const modal = document.getElementById('item-detail-modal');
  const content = document.getElementById('item-modal-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="relative">
      <div class="h-64 sm:h-72 w-full relative bg-neutral-100">
        <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover" onerror="this.onerror=null; this.src='${FALLBACK_FOOD_IMG}';">
        <button id="close-item-modal-btn" class="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition">✕</button>
        <div class="absolute bottom-4 left-4 flex items-center gap-2">
          <span class="veg-symbol"></span>
          <span class="bg-black/70 backdrop-blur-md text-amber-300 text-xs font-bold px-3 py-1 rounded-full">
            ★ ${item.rating.toFixed(1)} Rating
          </span>
        </div>
      </div>
      <div class="p-6">
        <div class="flex items-start justify-between gap-4 mb-3">
          <div>
            <span class="text-xs uppercase font-bold tracking-wider text-b57-orange">${item.categoryLabel}</span>
            <h3 class="text-2xl font-bold font-heading text-neutral-900">${item.name}</h3>
          </div>
          <div class="text-2xl font-bold font-heading text-[#C83A2E]">₹${item.price}</div>
        </div>

        <p class="text-neutral-600 text-sm leading-relaxed mb-6">${item.description}</p>

        <div class="grid grid-cols-2 gap-3 mb-6">
          <div class="p-3 rounded-2xl bg-amber-50/60 border border-amber-100 text-xs">
            <span class="text-neutral-400 block mb-0.5 font-bold uppercase tracking-wider text-[10px]">Category</span>
            <strong class="text-neutral-800 font-semibold">${item.categoryLabel}</strong>
          </div>
          <div class="p-3 rounded-2xl bg-amber-50/60 border border-amber-100 text-xs">
            <span class="text-neutral-400 block mb-0.5 font-bold uppercase tracking-wider text-[10px]">Prep Time</span>
            <strong class="text-neutral-800 font-semibold">${item.preparationTime}</strong>
          </div>
        </div>

        <div class="border-t border-neutral-100 pt-5 flex items-center justify-between gap-4">
          <div>
            <span class="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">Total</span>
            <span class="text-2xl font-bold font-heading text-neutral-900">₹${item.price}</span>
          </div>
          <button id="modal-add-to-cart-btn" class="btn-primary-b57 text-sm py-3 px-8 flex-1">
            + Add to Order
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  const closeBtn = document.getElementById('close-item-modal-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    });
  }

  const addBtn = document.getElementById('modal-add-to-cart-btn');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      addToCart(item);
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  });
}

/* ==========================================================================
   8. TABLE RESERVATION MODAL & VALIDATION
   ========================================================================== */
function initReservationModal() {
  const modal = document.getElementById('reservation-modal');
  const openBtns = document.querySelectorAll('.open-reservation-btn');
  const closeBtn = document.getElementById('close-reservation-modal');
  const form = document.getElementById('table-reservation-form');

  if (!modal) return;

  const openModal = () => {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    const dateInput = document.getElementById('res-date');
    if (dateInput && !dateInput.value) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.value = today;
      dateInput.min = today;
    }
  };

  const closeModal = () => {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  };

  openBtns.forEach(btn => btn.addEventListener('click', openModal));
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('res-name').value;
      const phone = document.getElementById('res-phone').value;
      const guests = document.getElementById('res-guests').value;
      const date = document.getElementById('res-date').value;
      const time = document.getElementById('res-time').value;
      const seating = document.getElementById('res-seating').value;
      const notes = document.getElementById('res-notes').value || 'None';

      const confirmationMsg = `Hello Bistro 57 Gwalior! I would like to reserve a table:\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n👥 Guests: ${guests}\n📅 Date: ${date}\n⏰ Time: ${time}\n🪑 Seating Preference: ${seating}\n📝 Notes: ${notes}`;

      const whatsappURL = `https://wa.me/917838828743?text=${encodeURIComponent(confirmationMsg)}`;
      window.open(whatsappURL, '_blank');

      closeModal();
      form.reset();
      showToast(`Reservation request sent for ${name} (${guests})! We'll confirm shortly.`, 'success');
    });
  }
}

/* ==========================================================================
   9. MASONRY GALLERY & LIGHTBOX
   ========================================================================== */
const GALLERY_DATA = [
  {
    title: 'Cozy Retro Bistro Ambiance',
    category: 'interior',
    categoryLabel: 'Ambiance',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80',
    caption: 'Warm ambient lighting and vintage café seating at Bistro 57 Patel Nagar.'
  },
  {
    title: 'Signature Paneer Tikka Pizza',
    category: 'food',
    categoryLabel: 'Artisanal Food',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80',
    caption: 'Wood-fired crust topped with spiced cottage cheese and molten dairy mozzarella.'
  },
  {
    title: 'Artisan Latte Art Ritual',
    category: 'coffee',
    categoryLabel: 'Coffee & Drinks',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1000&q=80',
    caption: 'Freshly pulled espresso with creamy microfoam poured by our baristas.'
  },
  {
    title: 'Thick Decadent Gourmet Shakes',
    category: 'coffee',
    categoryLabel: 'Coffee & Drinks',
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=1000&q=80',
    caption: 'Ferrero Rocher & Lotus Biscoff thick shakes loaded with real chocolate.'
  },
  {
    title: 'Double Loaded Paneer Burger & Fries',
    category: 'food',
    categoryLabel: 'Artisanal Food',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80',
    caption: 'Juicy golden cottage cheese patty served with peri-peri salted fries.'
  },
  {
    title: 'Friends & Family Café Moments',
    category: 'moments',
    categoryLabel: 'Moments',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1000&q=80',
    caption: 'Unwinding with good conversations and delicious vegetarian food.'
  },
  {
    title: 'Crispy Chilli Paneer & Starters',
    category: 'food',
    categoryLabel: 'Artisanal Food',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=1000&q=80',
    caption: 'Wok-tossed spicy chilli paneer with fresh scallions and bell peppers.'
  },
  {
    title: 'Sizzling Brownie with Vanilla Ice Cream',
    category: 'food',
    categoryLabel: 'Artisanal Food',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1000&q=80',
    caption: 'Molten chocolate cascade over warm walnut brownie on a hot sizzler plate.'
  },
  {
    title: 'Refreshing Mint & Watermelon Mojitos',
    category: 'coffee',
    categoryLabel: 'Coffee & Drinks',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=80',
    caption: 'Crushed ice coolers hand-shaken with freshly picked mint and citrus slices.'
  }
];

let currentLightboxIndex = 0;
let filteredGalleryData = [...GALLERY_DATA];

function initGalleryLightbox() {
  const galleryGrid = document.getElementById('gallery-grid');
  const tabs = document.querySelectorAll('.gallery-filter-btn');
  const lightboxModal = document.getElementById('gallery-lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-image');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCategory = document.getElementById('lightbox-category');
  const prevBtn = document.getElementById('lightbox-prev-btn');
  const nextBtn = document.getElementById('lightbox-next-btn');
  const closeBtn = document.getElementById('close-lightbox-btn');

  if (!galleryGrid) return;

  function renderGallery(category = 'all') {
    filteredGalleryData = (category === 'all')
      ? GALLERY_DATA
      : GALLERY_DATA.filter(item => item.category === category);

    galleryGrid.innerHTML = filteredGalleryData.map((item, index) => `
      <div class="gallery-item group h-64 sm:h-72" data-index="${index}">
        <img src="${item.image}" alt="${item.title}" loading="lazy" class="w-full h-full object-cover" onerror="this.onerror=null; this.src='${FALLBACK_FOOD_IMG}';">
        <div class="gallery-overlay">
          <span class="text-[11px] font-bold uppercase tracking-wider text-amber-300 mb-1">${item.categoryLabel}</span>
          <h4 class="text-white font-heading font-bold text-lg leading-tight mb-1">${item.title}</h4>
          <p class="text-white/80 text-xs line-clamp-1">${item.caption}</p>
        </div>
      </div>
    `).join('');

    galleryGrid.querySelectorAll('.gallery-item').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.getAttribute('data-index'), 10);
        openLightbox(idx);
      });
    });
  }

  function openLightbox(index) {
    if (!lightboxModal || !filteredGalleryData[index]) return;
    currentLightboxIndex = index;
    updateLightboxContent();
    lightboxModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function updateLightboxContent() {
    const item = filteredGalleryData[currentLightboxIndex];
    if (!item) return;
    if (lightboxImg) lightboxImg.src = item.image;
    if (lightboxTitle) lightboxTitle.textContent = item.title;
    if (lightboxCaption) lightboxCaption.textContent = item.caption;
    if (lightboxCategory) lightboxCategory.textContent = item.categoryLabel;
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  function prevImage() {
    currentLightboxIndex = (currentLightboxIndex - 1 + filteredGalleryData.length) % filteredGalleryData.length;
    updateLightboxContent();
  }

  function nextImage() {
    currentLightboxIndex = (currentLightboxIndex + 1) % filteredGalleryData.length;
    updateLightboxContent();
  }

  if (prevBtn) prevBtn.addEventListener('click', prevImage);
  if (nextBtn) nextBtn.addEventListener('click', nextImage);
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (lightboxModal && !lightboxModal.classList.contains('hidden')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    }
  });

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.getAttribute('data-gallery-category');
      renderGallery(cat);
    });
  });

  renderGallery('all');
}

/* ==========================================================================
   10. REVIEWS & TESTIMONIALS
   ========================================================================== */
function initReviews() {
  const leaveReviewBtn = document.getElementById('open-review-modal-btn');
  const reviewModal = document.getElementById('review-submit-modal');
  const closeReviewModal = document.getElementById('close-review-modal');
  const reviewForm = document.getElementById('customer-review-form');

  if (leaveReviewBtn && reviewModal) {
    leaveReviewBtn.addEventListener('click', () => {
      reviewModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });

    if (closeReviewModal) {
      closeReviewModal.addEventListener('click', () => {
        reviewModal.classList.add('hidden');
        document.body.style.overflow = '';
      });
    }

    reviewModal.addEventListener('click', (e) => {
      if (e.target === reviewModal) {
        reviewModal.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });

    if (reviewForm) {
      reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        reviewModal.classList.add('hidden');
        document.body.style.overflow = '';
        reviewForm.reset();
        showToast('Thank you for your feedback! Your review helps us brew better moments.', 'success');
      });
    }
  }
}

/* ==========================================================================
   11. CONTACT FORM & EVENT INQUIRIES
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('bistro-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value;
      const phone = document.getElementById('contact-phone').value;
      const subject = document.getElementById('contact-subject').value;
      const message = document.getElementById('contact-message').value;

      const whatsappText = `Hello Bistro 57 Patel Nagar! New Inquiry:\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n📌 Topic: ${subject}\n💬 Message: ${message}`;
      const whatsappURL = `https://wa.me/917838828743?text=${encodeURIComponent(whatsappText)}`;
      window.open(whatsappURL, '_blank');

      contactForm.reset();
      showToast('Thank you! Your message has been sent to our café team.', 'success');
    });
  }
}

/* ==========================================================================
   12. QUICK MODALS & TOAST ENGINE
   ========================================================================== */
function initQuickModals() {
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.add('opacity-100', 'pointer-events-auto');
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'b57-toast';

  let icon = 'ℹ️';
  let borderColor = '#F28C28';
  if (type === 'success') {
    icon = '✅';
    borderColor = '#237A4B';
  } else if (type === 'warning') {
    icon = '⚠️';
    borderColor = '#F5C542';
  } else if (type === 'error') {
    icon = '❌';
    borderColor = '#C83A2E';
  }

  toast.style.borderLeftColor = borderColor;
  toast.innerHTML = `
    <div class="flex items-center gap-3">
      <span class="text-lg">${icon}</span>
      <p class="text-xs sm:text-sm font-medium text-cream">${message}</p>
    </div>
    <button class="text-neutral-400 hover:text-white text-sm">✕</button>
  `;

  const closeBtn = toast.querySelector('button');
  closeBtn.addEventListener('click', () => {
    toast.remove();
  });

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.35s ease';
    setTimeout(() => toast.remove(), 350);
  }, 4000);
}
