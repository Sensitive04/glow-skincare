import { PRODUCTS as DEFAULT_PRODUCTS } from "./products";

const STORAGE_KEY = "glow_products";

function load() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return null;
}

function save(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

function init() {
  const stored = load();
  if (!stored || stored.length === 0) {
    save(DEFAULT_PRODUCTS);
    return DEFAULT_PRODUCTS;
  }
  return stored;
}

let products = init();

export function getProducts() {
  return [...products];
}

export function addProduct(product) {
  const id = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
  const newProduct = { ...product, id };
  products = [...products, newProduct];
  save(products);
  return newProduct;
}

export function updateProduct(id, updates) {
  products = products.map((p) => (p.id === id ? { ...p, ...updates } : p));
  save(products);
}

export function deleteProduct(id) {
  products = products.filter((p) => p.id !== id);
  save(products);
}

export function resetToDefaults() {
  products = [...DEFAULT_PRODUCTS];
  save(products);
}
