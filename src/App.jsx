import { useState, useCallback } from "react";
import { SHOP_CONFIG } from "./products";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Toast from "./components/Toast";

export default function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const addToCart = useCallback(
    (product) => {
      setCart((prev) => {
        const existing = prev.find((item) => item.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prev, { ...product, quantity: 1 }];
      });
      showToast(`${product.name} added to cart`);
    },
    [showToast]
  );

  const removeFromCart = useCallback((productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar
        shopName={SHOP_CONFIG.name}
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
      />
      <Hero config={SHOP_CONFIG} />
      <ProductGrid onAddToCart={addToCart} currency={SHOP_CONFIG.currency} />
      <Footer config={SHOP_CONFIG} />
      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        total={cartTotal}
        currency={SHOP_CONFIG.currency}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />
      <Toast toasts={toasts} />
    </>
  );
}
