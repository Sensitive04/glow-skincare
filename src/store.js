const BASE = "/api";

export async function getProducts() {
  try {
    const res = await fetch(`${BASE}/products`);
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  } catch (e) {
    console.error("Error fetching products:", e);
    return [];
  }
}

export async function addProduct(product) {
  const res = await fetch(`${BASE}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Failed to add product");
  return res.json();
}

export async function updateProduct(id, updates) {
  const res = await fetch(`${BASE}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error("Failed to update product");
}

export async function deleteProduct(id) {
  const res = await fetch(`${BASE}/products/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete product");
}

export async function seedProducts(productsList) {
  for (const p of productsList) {
    await addProduct(p);
  }
}

export async function signIn(_email, password) {
  const res = await fetch(`${BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Authentication failed");
  }
  const session = { loggedIn: true, ts: Date.now() };
  localStorage.setItem("glow_admin_session", JSON.stringify(session));
  return session;
}

export async function signUp(_email, password) {
  return signIn(_email, password);
}

export async function signOut() {
  localStorage.removeItem("glow_admin_session");
}

export async function createOrder(orderData) {
  const res = await fetch(`${BASE}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to create order");
  }
  return res.json();
}

export async function getOrder(orderId, phone) {
  const params = phone ? `?phone=${encodeURIComponent(phone)}` : "";
  const res = await fetch(`${BASE}/orders/${orderId}${params}`);
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Order not found");
  }
  return res.json();
}

export async function getOrdersByPhone(phone) {
  const res = await fetch(`${BASE}/orders/phone/${encodeURIComponent(phone)}`);
  if (!res.ok) throw new Error("No orders found");
  return res.json();
}

export async function getSession() {
  try {
    const raw = localStorage.getItem("glow_admin_session");
    if (!raw) return null;
    const session = JSON.parse(raw);
    if (!session.loggedIn) return null;
    if (Date.now() - session.ts > 24 * 60 * 60 * 1000) {
      localStorage.removeItem("glow_admin_session");
      return null;
    }
    return session;
  } catch {
    return null;
  }
}
