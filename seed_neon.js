import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

async function main() {
  console.log('⚡ Connecting to Neon PostgreSQL...');

  // 1. Create menu_items table
  await sql`
    CREATE TABLE IF NOT EXISTS menu_items (
      id SERIAL PRIMARY KEY,
      item_code VARCHAR(50) UNIQUE NOT NULL,
      name VARCHAR(255) NOT NULL,
      category VARCHAR(100) NOT NULL,
      super_category VARCHAR(100) NOT NULL,
      price NUMERIC(10, 2) NOT NULL,
      rating NUMERIC(3, 1) DEFAULT 4.8,
      badge VARCHAR(100),
      description TEXT,
      image TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  console.log('✅ Table "menu_items" created/verified in Neon Postgres!');

  // 2. Sample 5 items data
  const sampleItems = [
    {
      item_code: 'cc-1',
      name: 'Classic Bistro Cold Coffee',
      category: 'cold-coffee',
      super_category: 'coffee',
      price: 149.00,
      rating: 5.0,
      badge: 'Iconic Bestseller',
      description: 'Our legendary whipped thick cold coffee made with rich dark roasted Arabica beans, creamy chilled milk & chocolate dust.',
      image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80'
    },
    {
      item_code: 'cc-2',
      name: 'Hazelnut Cold Coffee',
      category: 'cold-coffee',
      super_category: 'coffee',
      price: 169.00,
      rating: 4.9,
      badge: 'Guest Favourite',
      description: 'Velvety cold espresso blended with roasted hazelnut syrup, rich dairy, and crushed ice, topped with roasted hazelnut flakes.',
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80'
    },
    {
      item_code: 'pizz-1',
      name: 'Bistro Special Loaded Paneer Pizza',
      category: 'pizzas',
      super_category: 'pizza-pasta',
      price: 299.00,
      rating: 4.9,
      badge: 'Chef Special',
      description: 'Hand-tossed thin crust pizza topped with spicy marinated tandoori paneer, crisp bell peppers, red onions, and melted mozzarella.',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80'
    },
    {
      item_code: 'burg-1',
      name: 'Crispy Veg Supreme Burger',
      category: 'burgers',
      super_category: 'burgers-sandwiches',
      price: 129.00,
      rating: 4.8,
      badge: 'Bestseller',
      description: 'Golden fried herb patty, layered with smoked cheese slice, fresh lettuce, tomatoes, pickles, and Bistro secret thousand island sauce.',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80'
    },
    {
      item_code: 'shk-1',
      name: 'Nutella Blast Thick Shake',
      category: 'shakes-frappes',
      super_category: 'shakes',
      price: 189.00,
      rating: 5.0,
      badge: 'Must Try',
      description: 'Ultra-creamy rich shake loaded with authentic Nutella, vanilla bean ice cream, crushed Ferrero Rocher & chocolate drizzle.',
      image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80'
    }
  ];

  // 3. Insert items into Neon DB (ON CONFLICT DO UPDATE)
  for (const item of sampleItems) {
    await sql`
      INSERT INTO menu_items (item_code, name, category, super_category, price, rating, badge, description, image)
      VALUES (${item.item_code}, ${item.name}, ${item.category}, ${item.super_category}, ${item.price}, ${item.rating}, ${item.badge}, ${item.description}, ${item.image})
      ON CONFLICT (item_code) DO UPDATE SET
        name = EXCLUDED.name,
        price = EXCLUDED.price,
        rating = EXCLUDED.rating,
        badge = EXCLUDED.badge,
        description = EXCLUDED.description,
        image = EXCLUDED.image;
    `;
  }
  console.log('✅ Successfully inserted/updated 5 items into Neon DB!');

  // 4. Fetch and display inserted data from Neon DB
  const result = await sql`SELECT id, item_code, name, category, price, rating FROM menu_items ORDER BY id ASC;`;
  console.log('\n📊 Live Data currently stored in Neon Postgres:');
  console.table(result);
}

main().catch((err) => {
  console.error('❌ Error seeding Neon DB:', err);
});
