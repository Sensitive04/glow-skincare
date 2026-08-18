import pg from "pg";

const { Client } = pg;

const products = [
  {
    id: "p001",
    name: "Hydrating Cleanser",
    slug: "hydrating-cleanser",
    description:
      "A gentle gel cleanser that removes impurities without stripping the skin's natural moisture barrier. Enriched with hyaluronic acid and green tea extract.",
    price: 24,
    image_url:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80&auto=format&fit=crop",
    category: "Cleansers",
    in_stock: true,
  },
  {
    id: "p002",
    name: "Vitamin C Serum",
    slug: "vitamin-c-serum",
    description:
      "A brightening 15% vitamin C serum that evens skin tone and fades dark spots. Formulated with ferulic acid and vitamin E for enhanced stability.",
    price: 42,
    image_url:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=80&auto=format&fit=crop",
    category: "Serums",
    in_stock: true,
  },
  {
    id: "p003",
    name: "Rose Water Toner",
    slug: "rose-water-toner",
    description:
      "A calming alcohol-free toner made with steam-distilled rose water to refresh, tone, and balance the skin after cleansing.",
    price: 18,
    image_url:
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&q=80&auto=format&fit=crop",
    category: "Toners",
    in_stock: true,
  },
  {
    id: "p004",
    name: "Nourishing Face Cream",
    slug: "nourishing-face-cream",
    description:
      "A rich daily moisturizer with shea butter and squalane that deeply nourishes and restores dry, dehydrated skin.",
    price: 36,
    image_url:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80&auto=format&fit=crop",
    category: "Moisturizers",
    in_stock: true,
  },
  {
    id: "p005",
    name: "Gentle Exfoliating Scrub",
    slug: "gentle-exfoliating-scrub",
    description:
      "A micro-fine jojoba bead scrub that polishes away dead skin cells to reveal smoother, brighter skin. Safe for daily use.",
    price: 22,
    image_url:
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80&auto=format&fit=crop",
    category: "Cleansers",
    in_stock: true,
  },
  {
    id: "p006",
    name: "Botanical Eye Cream",
    slug: "botanical-eye-cream",
    description:
      "A cooling eye cream with caffeine and botanical extracts that reduces puffiness, dark circles, and fine lines.",
    price: 30,
    image_url:
      "https://images.unsplash.com/photo-1591871937573-74dbba515c4c?w=800&q=80&auto=format&fit=crop",
    category: "Moisturizers",
    in_stock: true,
  },
  {
    id: "p007",
    name: "SPF 50 Mineral Sunscreen",
    slug: "spf-50-mineral-sunscreen",
    description:
      "A lightweight, non-greasy mineral sunscreen with zinc oxide that protects against UVA/UVB rays without a white cast.",
    price: 28,
    image_url:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=80&auto=format&fit=crop",
    category: "Sunscreen",
    in_stock: true,
  },
  {
    id: "p008",
    name: "Deep Hydration Mask",
    slug: "deep-hydration-mask",
    description:
      "An overnight hydrogel mask that delivers intense moisture to leave skin plump and dewy by morning.",
    price: 26,
    image_url:
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80&auto=format&fit=crop",
    category: "Masks",
    in_stock: false,
  },
  {
    id: "p009",
    name: "Clay Detox Mask",
    slug: "clay-detox-mask",
    description:
      "A purifying kaolin clay mask that draws out impurities and excess oil, leaving skin clean and refined.",
    price: 20,
    image_url:
      "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=800&q=80&auto=format&fit=crop",
    category: "Masks",
    in_stock: true,
  },
  {
    id: "p010",
    name: "Calming Night Oil",
    slug: "calming-night-oil",
    description:
      "A restorative blend of jojoba, rosehip, and chamomile oils that calms skin and supports overnight repair.",
    price: 34,
    image_url:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=80&auto=format&fit=crop",
    category: "Serums",
    in_stock: true,
  },
];

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  try {
    for (const p of products) {
      await client.query(
        `INSERT INTO products (id, name, slug, description, price, image_url, category, in_stock)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (slug) DO UPDATE SET
           name = EXCLUDED.name,
           description = EXCLUDED.description,
           price = EXCLUDED.price,
           image_url = EXCLUDED.image_url,
           category = EXCLUDED.category,
           in_stock = EXCLUDED.in_stock`,
        [p.id, p.name, p.slug, p.description, p.price, p.image_url, p.category, p.in_stock]
      );
    }
    const { rows } = await client.query("SELECT COUNT(*)::int AS count FROM products");
    console.log(`Seeded ${products.length} products. Total in DB: ${rows[0].count}`);
  } finally {
    await client.end();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});