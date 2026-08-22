// Bistro 57 Complete Pure Vegetarian Menu Dataset (6 Super-Groups, 13 Categories, 40+ Items)

export const SUPER_CATEGORIES = [
  { id: 'all', name: '✨ All Offerings', icon: '🌟', count: 40 },
  { id: 'coffee', name: '☕ Coffee & Brews', icon: '☕', count: 9 },
  { id: 'shakes', name: '🥤 Shakes & Coolers', icon: '🥤', count: 7 },
  { id: 'pizza-pasta', name: '🍕 Pizzas & Pasta', icon: '🍕', count: 7 },
  { id: 'burgers-sandwiches', name: '🍔 Burgers & Wraps', icon: '🍔', count: 6 },
  { id: 'starters-chinese', name: '🍟 Starters & Momos', icon: '🥟', count: 7 },
  { id: 'meals-desserts', name: '🍛 Meals & Desserts', icon: '🍛', count: 4 }
];

export const SUB_CATEGORIES = [
  { id: 'all', name: 'All Items', superId: 'all' },
  { id: 'cold-coffee', name: 'Cold Coffees', superId: 'coffee' },
  { id: 'hot-coffee', name: 'Hot Brews & Lattes', superId: 'coffee' },
  { id: 'shakes-frappes', name: 'Thick Shakes & Frappes', superId: 'shakes' },
  { id: 'mojitos-coolers', name: 'Mojitos & Fruit Coolers', superId: 'shakes' },
  { id: 'pizzas', name: 'Artisanal Pizzas', superId: 'pizza-pasta' },
  { id: 'pastas', name: 'Gourmet Pastas', superId: 'pizza-pasta' },
  { id: 'burgers', name: 'Gourmet Burgers', superId: 'burgers-sandwiches' },
  { id: 'sandwiches-garlic-bread', name: 'Sandwiches & Garlic Bread', superId: 'burgers-sandwiches' },
  { id: 'momos', name: 'Steamed & Crispy Momos', superId: 'starters-chinese' },
  { id: 'starters', name: 'Crispy Starters & Fries', superId: 'starters-chinese' },
  { id: 'indo-chinese', name: 'Wok Indo-Chinese', superId: 'starters-chinese' },
  { id: 'desserts', name: 'Waffles & Sweet Treats', superId: 'meals-desserts' },
  { id: 'north-indian', name: 'North Indian Classics', superId: 'meals-desserts' }
];

export const MENU_ITEMS = [
  // --- Cold Coffees ---
  {
    id: 'cc-1',
    name: 'Classic Bistro Cold Coffee',
    category: 'cold-coffee',
    superCategory: 'coffee',
    price: 149,
    rating: 5.0,
    badge: 'Iconic Bestseller',
    badgeType: 'bestseller',
    description: 'Our legendary whipped thick cold coffee made with rich dark roasted Arabica beans, creamy chilled milk & chocolate dust.',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80',
    tags: ['Chilled', 'Creamy', 'Signature']
  },
  {
    id: 'cc-2',
    name: 'Hazelnut Cold Coffee',
    category: 'cold-coffee',
    superCategory: 'coffee',
    price: 169,
    rating: 4.9,
    badge: 'Guest Favourite',
    badgeType: 'musttry',
    description: 'Velvety cold espresso blended with roasted hazelnut syrup, rich dairy, and crushed ice, topped with roasted hazelnut flakes.',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80',
    tags: ['Nutty', 'Aromatic', 'Rich']
  },
  {
    id: 'cc-3',
    name: 'Brownie Cold Coffee',
    category: 'cold-coffee',
    superCategory: 'coffee',
    price: 189,
    rating: 4.9,
    badge: 'Chef Special',
    badgeType: 'special',
    description: 'Freshly baked dark chocolate walnut brownie blended directly into whipped cold coffee with chocolate fudge drizzle.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80',
    tags: ['Fudge', 'Indulgent', 'Thick']
  },
  {
    id: 'cc-4',
    name: 'Caramel Macchiato Chilled',
    category: 'cold-coffee',
    superCategory: 'coffee',
    price: 179,
    rating: 4.8,
    badge: 'Sweet & Salty',
    badgeType: 'musttry',
    description: 'Layered iced latte with vanilla syrup, chilled full cream milk, bold espresso float, and sea-salted caramel drizzle.',
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=600&q=80',
    tags: ['Caramel', 'Layered', 'Sweet']
  },

  // --- Hot Coffees ---
  {
    id: 'hc-1',
    name: 'Signature Cappuccino',
    category: 'hot-coffee',
    superCategory: 'coffee',
    price: 139,
    rating: 4.9,
    badge: 'Morning Ritual',
    badgeType: 'musttry',
    description: 'Equal parts freshly pulled double espresso, silky steamed milk, and dense micro-foam dusted with raw Belgian cocoa.',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80',
    tags: ['Steamed', 'Espresso', 'Classic']
  },
  {
    id: 'hc-2',
    name: 'Velvety Café Latte',
    category: 'hot-coffee',
    superCategory: 'coffee',
    price: 149,
    rating: 4.8,
    badge: 'Smooth',
    badgeType: 'special',
    description: 'A smooth shot of espresso combined with generous steamed whole milk and a light topping of silky micro-foam.',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80',
    tags: ['Smooth', 'Mellow', 'Steamed']
  },
  {
    id: 'hc-3',
    name: 'Belgian Hot Chocolate',
    category: 'hot-coffee',
    superCategory: 'coffee',
    price: 169,
    rating: 5.0,
    badge: 'Pure Decadence',
    badgeType: 'bestseller',
    description: 'Melted dark Belgian chocolate whisked with rich steamed milk, topped with mini marshmallows and cocoa dusting.',
    image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=600&q=80',
    tags: ['Chocolate', 'Cozy', 'Warm']
  },
  {
    id: 'hc-4',
    name: 'Café Mocha Hot',
    category: 'hot-coffee',
    superCategory: 'coffee',
    price: 169,
    rating: 4.8,
    badge: 'Mocha Magic',
    badgeType: 'special',
    description: 'Dark chocolate ganache combined with freshly pulled espresso, steamed milk, and crowned with chocolate whip.',
    image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=600&q=80',
    tags: ['Chocolate', 'Espresso', 'Rich']
  },
  {
    id: 'hc-5',
    name: 'Pure Bold Americano',
    category: 'hot-coffee',
    superCategory: 'coffee',
    price: 119,
    rating: 4.7,
    badge: 'Zero Sugar',
    badgeType: 'musttry',
    description: 'Two double shots of dark roasted espresso diluted with filtered steaming water for an unadulterated, bold coffee aroma.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    tags: ['Black', 'Bold', 'ZeroSugar']
  },

  // --- Thick Shakes & Frappes ---
  {
    id: 'sf-1',
    name: 'Lotus Biscoff Frappe',
    category: 'shakes-frappes',
    superCategory: 'shakes',
    price: 219,
    rating: 5.0,
    badge: 'Trending Star',
    badgeType: 'bestseller',
    description: 'Authentic caramelized Speculoos Biscoff spread whipped into thick iced cream, garnished with crunchy biscuit crumbs & caramel swirl.',
    image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=600&q=80',
    tags: ['Biscoff', 'Crunchy', 'Trending']
  },
  {
    id: 'sf-2',
    name: 'Ferrero Rocher Nutella Shake',
    category: 'shakes-frappes',
    superCategory: 'shakes',
    price: 229,
    rating: 5.0,
    badge: 'Indulgent',
    badgeType: 'special',
    description: 'Real Ferrero Rocher hazelnut pralines blended with creamy Nutella, rich vanilla dairy base, and roasted hazelnut chunks.',
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&q=80',
    tags: ['Nutella', 'Ferrero', 'Chocolate']
  },
  {
    id: 'sf-3',
    name: 'KitKat Crunchy Shake',
    category: 'shakes-frappes',
    superCategory: 'shakes',
    price: 189,
    rating: 4.8,
    badge: 'Crispy Cocoa',
    badgeType: 'musttry',
    description: 'Crispy KitKat wafer bars crushed and blended into a thick malt shake with chocolate ganache lining.',
    image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=600&q=80',
    tags: ['KitKat', 'Crunchy', 'Shake']
  },
  {
    id: 'sf-4',
    name: 'Oreo Overload Thick Shake',
    category: 'shakes-frappes',
    superCategory: 'shakes',
    price: 189,
    rating: 4.9,
    badge: 'All-Time Hit',
    badgeType: 'bestseller',
    description: 'Double portion of crunchy Oreo biscuits blended with vanilla ice cream and topped with whole crushed cookie pieces.',
    image: 'https://images.unsplash.com/photo-1568909344668-6f14a07b56a0?auto=format&fit=crop&w=600&q=80',
    tags: ['Oreo', 'Thick', 'KidsFav']
  },
  {
    id: 'sf-5',
    name: 'Strawberry Velvet Cream Shake',
    category: 'shakes-frappes',
    superCategory: 'shakes',
    price: 179,
    rating: 4.8,
    badge: 'Fruity & Fresh',
    badgeType: 'musttry',
    description: 'Luscious mountain strawberry compote blended with sweet chilled dairy and topped with strawberry glaze.',
    image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=600&q=80',
    tags: ['Berry', 'Fruity', 'Pink']
  },

  // --- Mojitos & Fruit Coolers ---
  {
    id: 'mc-1',
    name: 'Watermelon Mint Mojito',
    category: 'mojitos-coolers',
    superCategory: 'shakes',
    price: 149,
    rating: 4.9,
    badge: 'Hydrating Sip',
    badgeType: 'bestseller',
    description: 'Muddled fresh watermelon chunks, garden mint sprigs, tangy lime juice, sugar cane syrup & sparkling soda over crushed ice.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
    tags: ['Mint', 'Fresh', 'Sparkling']
  },
  {
    id: 'mc-2',
    name: 'Crisp Green Apple Fizz',
    category: 'mojitos-coolers',
    superCategory: 'shakes',
    price: 149,
    rating: 4.8,
    badge: 'Tangy Sparkle',
    badgeType: 'musttry',
    description: 'Granny Smith green apple extract, crushed mint, lime slices, and effervescent fizz served chilled with a salted rim.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    tags: ['Apple', 'Tangy', 'Chilled']
  },

  // --- Artisanal Pizzas ---
  {
    id: 'pz-1',
    name: 'Tandoori Paneer Tikka Pizza',
    category: 'pizzas',
    superCategory: 'pizza-pasta',
    price: 269,
    rating: 5.0,
    badge: '#1 Food Bestseller',
    badgeType: 'bestseller',
    description: 'Handcrafted artisan crust topped with charcoal-spiced cottage cheese cubes, red onions, bell peppers, melted mozzarella & tandoori herbs.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    tags: ['Spicy', 'Tandoori', 'Paneer', 'Cheesy']
  },
  {
    id: 'pz-2',
    name: 'Farmhouse Veggie Supreme Pizza',
    category: 'pizzas',
    superCategory: 'pizza-pasta',
    price: 249,
    rating: 4.8,
    badge: 'Garden Fresh',
    badgeType: 'musttry',
    description: 'Crispy thin crust loaded with black olives, sweet golden corn, crunchy capsicum, red onions, button mushrooms, and molten mozzarella.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
    tags: ['Veggies', 'Mushrooms', 'Cheesy']
  },
  {
    id: 'pz-3',
    name: 'Fiery Peri-Peri Paneer Pizza',
    category: 'pizzas',
    superCategory: 'pizza-pasta',
    price: 279,
    rating: 4.9,
    badge: 'Spicy Kick',
    badgeType: 'special',
    description: 'Spiced African bird’s eye chili peri-peri glaze, marinated paneer, jalapeno rings, paprika flakes, and double mozzarella cheese.',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80',
    tags: ['PeriPeri', 'Spicy', 'Jalapeno']
  },
  {
    id: 'pz-4',
    name: 'Classic Margherita Deluxe',
    category: 'pizzas',
    superCategory: 'pizza-pasta',
    price: 199,
    rating: 4.7,
    badge: 'Italian Classic',
    badgeType: 'musttry',
    description: 'San Marzano herb tomato sauce, double layer of liquid mozzarella cheese, fresh garden basil, and extra virgin olive oil drizzle.',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80',
    tags: ['Classic', 'Basil', 'Mozzarella']
  },

  // --- Gourmet Pastas ---
  {
    id: 'ps-1',
    name: 'Creamy Alfredo White Sauce Pasta',
    category: 'pastas',
    superCategory: 'pizza-pasta',
    price: 219,
    rating: 5.0,
    badge: 'Cheesy Delight',
    badgeType: 'bestseller',
    description: 'Penne pasta cooked al dente in a velvety garlic parmesan cheese sauce with sautéed button mushrooms, broccoli florets & toasted herb bread.',
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=600&q=80',
    tags: ['Alfredo', 'Garlic', 'Cheesy']
  },
  {
    id: 'ps-2',
    name: 'Arrabbiata Spicy Red Sauce Pasta',
    category: 'pastas',
    superCategory: 'pizza-pasta',
    price: 209,
    rating: 4.8,
    badge: 'Zesty Italian',
    badgeType: 'musttry',
    description: 'Slow-simmered Italian plum tomato sauce with garlic, crushed red chili flakes, black olives, sweet basil & penne pasta.',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80',
    tags: ['Arrabbiata', 'Tomato', 'Spicy']
  },
  {
    id: 'ps-3',
    name: 'Pink Sauce Pasta (Rosa Mamma)',
    category: 'pastas',
    superCategory: 'pizza-pasta',
    price: 239,
    rating: 4.9,
    badge: 'Best of Both',
    badgeType: 'special',
    description: 'Perfect harmony of tangy red pomodoro and velvety white alfredo cream sauce tossed with penne, bell peppers & parmesan.',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80',
    tags: ['PinkSauce', 'Fusion', 'Creamy']
  },

  // --- Gourmet Burgers ---
  {
    id: 'bg-1',
    name: 'Double Loaded Paneer Burger',
    category: 'burgers',
    superCategory: 'burgers-sandwiches',
    price: 189,
    rating: 4.9,
    badge: 'Chef Signature',
    badgeType: 'bestseller',
    description: 'Crispy herb-crusted paneer patty plus grilled spiced cottage cheese slice, molten cheddar, caramelized onion relish, lettuce & house sauce.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    tags: ['Paneer', 'DoubleDecker', 'Saucy']
  },
  {
    id: 'bg-2',
    name: 'Crispy Veg Supreme Burger',
    category: 'burgers',
    superCategory: 'burgers-sandwiches',
    price: 139,
    rating: 4.8,
    badge: 'Crunchy Bite',
    badgeType: 'musttry',
    description: 'Golden fried vegetable patty made with peas, corn & potatoes, topped with sliced tomatoes, crunchy iceberg lettuce & creamy mayo.',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80',
    tags: ['Crispy', 'Classic', 'PocketFriendly']
  },
  {
    id: 'bg-3',
    name: 'Spicy Mexican Jalapeno Burger',
    category: 'burgers',
    superCategory: 'burgers-sandwiches',
    price: 169,
    rating: 4.8,
    badge: 'Spicy Zing',
    badgeType: 'special',
    description: 'Spiced chipotle vegetable patty, spicy pickled jalapenos, salsa dressing, cheese slice, and crunchy nachos inside a toasted sesame bun.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
    tags: ['Jalapeno', 'Mexican', 'Spicy']
  },

  // --- Sandwiches & Garlic Bread ---
  {
    id: 'sw-1',
    name: 'Grilled Paneer Tikka Club Sandwich',
    category: 'sandwiches-garlic-bread',
    superCategory: 'burgers-sandwiches',
    price: 179,
    rating: 4.9,
    badge: '3-Layer Club',
    badgeType: 'bestseller',
    description: 'Triple-decker toasted bread filled with spiced tandoori cottage cheese, cucumber, tomatoes, cheese slice, and green mint chutney.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
    tags: ['ClubSandwich', 'Grilled', 'Paneer']
  },
  {
    id: 'sw-2',
    name: 'Cheese Corn Spinach Sandwich',
    category: 'sandwiches-garlic-bread',
    superCategory: 'burgers-sandwiches',
    price: 159,
    rating: 4.7,
    badge: 'Melted Warmth',
    badgeType: 'musttry',
    description: 'Buttery grilled multi-grain bread loaded with sweet golden corn, tender spinach leaves, and molten mozzarella cheese.',
    image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=600&q=80',
    tags: ['Corn', 'Spinach', 'Cheesy']
  },
  {
    id: 'sw-3',
    name: 'Cheesy Garlic Bread Stuffed',
    category: 'sandwiches-garlic-bread',
    superCategory: 'burgers-sandwiches',
    price: 149,
    rating: 4.9,
    badge: 'Hot & Gooey',
    badgeType: 'bestseller',
    description: 'Freshly baked French baguette stuffed with roasted garlic butter, sweet corn, jalapenos & pull-apart molten mozzarella cheese.',
    image: 'https://images.unsplash.com/photo-1619860860774-1e2e17343432?auto=format&fit=crop&w=600&q=80',
    tags: ['GarlicBread', 'CheesePull', 'Snack']
  },

  // --- Momos ---
  {
    id: 'mm-1',
    name: 'Steamed Paneer Delight Momos (6 Pcs)',
    category: 'momos',
    superCategory: 'starters-chinese',
    price: 139,
    rating: 4.9,
    badge: 'Street Style',
    badgeType: 'bestseller',
    description: 'Delicate translucent momo parcels stuffed with seasoned cottage cheese, ginger, scallions & cilantro, served with fiery red chili dip.',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=600&q=80',
    tags: ['Steamed', 'Momos', 'Paneer']
  },
  {
    id: 'mm-2',
    name: 'Crispy Kurkure Fried Momos (6 Pcs)',
    category: 'momos',
    superCategory: 'starters-chinese',
    price: 169,
    rating: 5.0,
    badge: 'Ultra Crunchy',
    badgeType: 'bestseller',
    description: 'Flaky cornflake-crusted momos deep fried to golden perfection, dusted with chatpata peri-peri spice and served with garlic mayo.',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
    tags: ['Kurkure', 'Crunchy', 'Fried']
  },
  {
    id: 'mm-3',
    name: 'Tandoori Gravy Momos (6 Pcs)',
    category: 'momos',
    superCategory: 'starters-chinese',
    price: 189,
    rating: 4.9,
    badge: 'Smoky Flavours',
    badgeType: 'special',
    description: 'Charcoal-roasted momos bathed in a rich creamy tandoori masala gravy with sliced red onions and coriander.',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80',
    tags: ['Tandoori', 'Gravy', 'Spicy']
  },

  // --- Crispy Starters & Fries ---
  {
    id: 'st-1',
    name: 'Crispy Chilli Paneer Dry',
    category: 'indo-chinese',
    superCategory: 'starters-chinese',
    price: 229,
    rating: 4.9,
    badge: 'Indo-Chinese Hit',
    badgeType: 'bestseller',
    description: 'Crispy battered paneer tossed in a smoking hot wok with scallions, capsicum, dark soya glaze, ginger, and aromatic crushed black pepper.',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80',
    tags: ['Paneer', 'Chilli', 'IndoChinese']
  },
  {
    id: 'st-2',
    name: 'Crispy Peri-Peri French Fries',
    category: 'starters',
    superCategory: 'starters-chinese',
    price: 129,
    rating: 4.8,
    badge: 'Snack Favourite',
    badgeType: 'musttry',
    description: 'Golden Belgian potato fries dusted liberally with our secret spicy African peri-peri herb blend, served with cheese dip.',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=600&q=80',
    tags: ['Fries', 'PeriPeri', 'Crunchy']
  },
  {
    id: 'st-3',
    name: 'Cheesy Nachos Loaded Platter',
    category: 'starters',
    superCategory: 'starters-chinese',
    price: 179,
    rating: 4.8,
    badge: 'Sharing Snack',
    badgeType: 'special',
    description: 'Crisp corn tortilla nachos smothered in warm queso cheese sauce, fresh pico de gallo, diced jalapenos & sour cream drizzle.',
    image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=600&q=80',
    tags: ['Nachos', 'Cheesy', 'Mexican']
  },
  {
    id: 'st-4',
    name: 'Veg Manchurian Dry (Wok Tossed)',
    category: 'indo-chinese',
    superCategory: 'starters-chinese',
    price: 199,
    rating: 4.7,
    badge: 'Classic Manchurian',
    badgeType: 'musttry',
    description: 'Crispy vegetable dumplings tossed in garlic, scallion, green chili, and tangy dark soya sauce glaze.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
    tags: ['Manchurian', 'Wok', 'IndoChinese']
  },

  // --- Desserts & Waffles ---
  {
    id: 'ds-1',
    name: 'Belgian Nutella Waffle',
    category: 'desserts',
    superCategory: 'meals-desserts',
    price: 199,
    rating: 5.0,
    badge: 'Warm & Sweet',
    badgeType: 'bestseller',
    description: 'Golden crispy Belgian waffle loaded with warm melted Nutella spread, chocolate chips, and a scoop of vanilla bean ice cream.',
    image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=600&q=80',
    tags: ['Waffle', 'Nutella', 'Sweet']
  },
  {
    id: 'ds-2',
    name: 'Sizzling Brownie with Ice Cream',
    category: 'desserts',
    superCategory: 'meals-desserts',
    price: 219,
    rating: 4.9,
    badge: 'Showstopper',
    badgeType: 'special',
    description: 'Fudgy chocolate brownie served on a smoking cast iron platter, topped with vanilla ice cream and sizzling hot chocolate fudge.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
    tags: ['Sizzling', 'Brownie', 'IceCream']
  },

  // --- North Indian Specials ---
  {
    id: 'ni-1',
    name: 'Paneer Butter Masala Combo Bowl',
    category: 'north-indian',
    superCategory: 'meals-desserts',
    price: 249,
    rating: 4.9,
    badge: 'Hearty Meal',
    badgeType: 'bestseller',
    description: 'Soft cottage cheese cubes simmered in a velvety cashew tomato butter gravy, served with 2 butter naan or aromatic jeera rice.',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80',
    tags: ['PaneerButterMasala', 'Curry', 'NorthIndian']
  },
  {
    id: 'ni-2',
    name: 'Dal Makhani Special with Naan',
    category: 'north-indian',
    superCategory: 'meals-desserts',
    price: 229,
    rating: 4.8,
    badge: 'Slow Cooked',
    badgeType: 'musttry',
    description: 'Whole black lentils slow-cooked overnight with white butter and cream, accompanied by 2 freshly baked butter tandoori rotis.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    tags: ['DalMakhani', 'Traditional', 'Meal']
  }
];
