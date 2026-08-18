// ============================================
// GLOW SKINCARE - PRODUCT CONFIGURATION
// ============================================
// To add a new product: copy an existing product block and change the values
// To remove a product: delete the product block
// To change prices: edit the "price" field
// To change the shop name: edit SHOP_CONFIG below
// ============================================

export const SHOP_CONFIG = {
  name: "GLOW",
  tagline: "Premium Skincare for Radiant Skin",
  description:
    "Discover our curated collection of clean, effective skincare. Each product is crafted with love and the finest ingredients to help you glow from within.",
  email: "hello@glowskin.com",
  currency: "$",
};

export const CATEGORIES = [
  { id: "all", label: "All Products" },
  { id: "cleansers", label: "Cleansers" },
  { id: "serums", label: "Serums" },
  { id: "moisturizers", label: "Moisturizers" },
  { id: "masks", label: "Masks" },
  { id: "spf", label: "SPF" },
];

export const PRODUCTS = [
  {
    id: 1,
    name: "Gentle Foaming Cleanser",
    category: "cleansers",
    price: 28,
    originalPrice: 35,
    description:
      "A pH-balanced foaming cleanser that removes impurities without stripping your skin's natural moisture barrier.",
    ingredients: "Aloe Vera, Green Tea, Chamomile",
    size: "150ml",
    badge: "Bestseller",
    rating: 4.8,
    reviews: 342,
  },
  {
    id: 2,
    name: "Vitamin C Brightening Serum",
    category: "serums",
    price: 42,
    originalPrice: null,
    description:
      "Powerful 15% Vitamin C serum that fades dark spots and boosts collagen production for a luminous complexion.",
    ingredients: "Vitamin C, Hyaluronic Acid, Ferulic Acid",
    size: "30ml",
    badge: "Editor's Pick",
    rating: 4.9,
    reviews: 518,
  },
  {
    id: 3,
    name: "Hydra-Glow Moisturizer",
    category: "moisturizers",
    price: 38,
    originalPrice: 48,
    description:
      "Lightweight yet deeply hydrating moisturizer that locks in moisture for 72 hours without feeling greasy.",
    ingredients: "Hyaluronic Acid, Squalane, Niacinamide",
    size: "50ml",
    badge: "Sale",
    rating: 4.7,
    reviews: 289,
  },
  {
    id: 4,
    name: "Overnight Recovery Mask",
    category: "masks",
    price: 34,
    originalPrice: null,
    description:
      "Wake up to revitalized skin with our sleeping mask that repairs and nourishes while you rest.",
    ingredients: "Retinol, Jojoba Oil, Vitamin E",
    size: "75ml",
    badge: null,
    rating: 4.6,
    reviews: 156,
  },
  {
    id: 5,
    name: "Mineral Sunscreen SPF 50",
    category: "spf",
    price: 32,
    originalPrice: null,
    description:
      "Invisible mineral sunscreen that provides broad-spectrum protection without white cast or greasy residue.",
    ingredients: "Zinc Oxide, Green Tea, Aloe Vera",
    size: "50ml",
    badge: "New",
    rating: 4.8,
    reviews: 98,
  },
  {
    id: 6,
    name: "Hyaluronic Acid Serum",
    category: "serums",
    price: 36,
    originalPrice: 44,
    description:
      "Multi-weight hyaluronic acid that hydrates every layer of your skin for plump, dewy complexion.",
    ingredients: "Hyaluronic Acid, Vitamin B5, Centella",
    size: "30ml",
    badge: "Sale",
    rating: 4.9,
    reviews: 621,
  },
  {
    id: 7,
    name: "Charcoal Detox Cleanser",
    category: "cleansers",
    price: 26,
    originalPrice: null,
    description:
      "Deep-cleansing charcoal wash that draws out toxins and unclogs pores for clearer, refined skin.",
    ingredients: "Activated Charcoal, Tea Tree, Salicylic Acid",
    size: "120ml",
    badge: null,
    rating: 4.5,
    reviews: 203,
  },
  {
    id: 8,
    name: "Ceramide Repair Cream",
    category: "moisturizers",
    price: 46,
    originalPrice: null,
    description:
      "Rich barrier-repair cream packed with ceramides to restore and protect compromised skin.",
    ingredients: "Ceramides, Shea Butter, Madecassoside",
    size: "45ml",
    badge: "Premium",
    rating: 4.8,
    reviews: 178,
  },
  {
    id: 9,
    name: "Clay Purifying Mask",
    category: "masks",
    price: 30,
    originalPrice: 38,
    description:
      "French green clay mask that absorbs excess oil and minimizes pores while delivering essential minerals.",
    ingredients: "French Green Clay, Matcha, Kaolin",
    size: "60ml",
    badge: "Sale",
    rating: 4.6,
    reviews: 134,
  },
  {
    id: 10,
    name: "Retinol Night Serum",
    category: "serums",
    price: 48,
    originalPrice: null,
    description:
      "Encapsulated retinol serum that reduces fine lines and improves skin texture with minimal irritation.",
    ingredients: "Retinol, Bakuchiol, Peptides",
    size: "30ml",
    badge: "Bestseller",
    rating: 4.9,
    reviews: 445,
  },
  {
    id: 11,
    name: "Rose Water Toner Mist",
    category: "cleansers",
    price: 22,
    originalPrice: null,
    description:
      "Refreshing rose water toner that hydrates, balances pH, and prepares skin for the next step of your routine.",
    ingredients: "Damask Rose Water, Glycerin, Allantoin",
    size: "100ml",
    badge: null,
    rating: 4.7,
    reviews: 267,
  },
  {
    id: 12,
    name: "Daily Glow SPF 30",
    category: "spf",
    price: 28,
    originalPrice: null,
    description:
      "Lightweight daily sunscreen with a natural dewy finish that doubles as a makeup primer.",
    ingredients: "Zinc Oxide, Niacinamide, Hyaluronic Acid",
    size: "40ml",
    badge: null,
    rating: 4.6,
    reviews: 89,
  },
];
