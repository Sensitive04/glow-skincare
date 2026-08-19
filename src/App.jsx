import { useState, useCallback, useEffect } from "react";
import { SHOP_CONFIG } from "./products";
import { getSession } from "./store";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import About from "./components/About";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import Login from "./components/Login";
import Admin from "./components/Admin";
import OrderTracking from "./components/OrderTracking";

function useHashRoute() {
  const [route, setRoute] = useState(window.location.hash || "#home");
  useEffect(() => {
    const handler = () => setRoute(window.location.hash || "#home");
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  return route;
}

export default function App() {
  const route = useHashRoute();
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    getSession().then((session) => {
      setLoggedIn(!!session);
      setAuthChecked(true);
    });
  }, []);

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

  const handleOrderComplete = useCallback(() => {
    setCart([]);
    setCartOpen(false);
    showToast("Order placed successfully!");
  }, [showToast]);

  if (route === "#admin") {
    if (!authChecked) return null;
    if (!loggedIn) {
      return <Login onLogin={() => setLoggedIn(true)} />;
    }
    return <Admin onLogout={() => { setLoggedIn(false); window.location.hash = "#home"; }} />;
  }

  if (route === "#track") {
    return (
      <>
        <Navbar
          shopName={SHOP_CONFIG.name}
          cartCount={cartCount}
          onCartClick={() => setCartOpen(true)}
        />
        <OrderTracking />
        <Footer config={SHOP_CONFIG} />
        <Cart
          open={cartOpen}
          onClose={() => setCartOpen(false)}
          items={cart}
          total={cartTotal}
          currency={SHOP_CONFIG.currency}
          onRemove={removeFromCart}
          onUpdateQuantity={updateQuantity}
          onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }}
        />
        <Toast toasts={toasts} />
      </>
    );
  }

  return (
    <>
      <Navbar
        shopName={SHOP_CONFIG.name}
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
      />
      <Hero config={SHOP_CONFIG} />
      <ProductGrid onAddToCart={addToCart} currency={SHOP_CONFIG.currency} />
      <About />
      <Footer config={SHOP_CONFIG} />
      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        total={cartTotal}
        currency={SHOP_CONFIG.currency}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }}
      />
      <Checkout
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={cart}
        total={cartTotal}
        currency={SHOP_CONFIG.currency}
        onOrderComplete={handleOrderComplete}
      />
      <Toast toasts={toasts} />
    </>
  );
}
