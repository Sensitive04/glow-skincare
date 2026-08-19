import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const DB_NAME = "glow_skincare";

let db, products, orders;

async function connectDB() {
  if (db) return;
  const client = await MongoClient.connect(MONGO_URI);
  db = client.db(DB_NAME);
  products = db.collection("products");
  orders = db.collection("orders");
  await products.createIndex({ id: 1 });
  await orders.createIndex({ orderId: 1 });
}

// --- Helpers ---
function escHtml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// --- Telegram helpers ---
async function sendTelegram(text) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;
  try {
    const res = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: "HTML",
        }),
      }
    );
    if (!res.ok) {
      const body = await res.text();
      console.error("Telegram API error:", res.status, body);
    }
  } catch (e) {
    console.error("Telegram send error:", e.message);
  }
}

function formatOrderMessage(order) {
  const items = order.items
    .map(
      (item, i) =>
        `${i + 1}. ${escHtml(item.name)} (x${item.quantity}) — ${order.currency}${(item.price * item.quantity).toFixed(2)}`
    )
    .join("\n");

  return (
    `📦 <b>New Order #${order.orderId}</b>\n\n` +
    `👤 <b>${escHtml(order.customer.name)}</b>\n` +
    `📞 ${escHtml(order.customer.phone)}\n` +
    `📍 ${escHtml(order.customer.address)}\n\n` +
    `<b>Items:</b>\n${items}\n\n` +
    `💰 <b>Total: ${order.currency}${order.total.toFixed(2)}</b>\n\n` +
    `Reply with:\n` +
    `<code>confirm ${order.orderId}</code> — to confirm & ship\n` +
    `<code>reject ${order.orderId}</code> — to reject`
  );
}

// Long-polling for admin replies
let tgOffset = 0;
async function pollTelegramReplies() {
  if (!TELEGRAM_BOT_TOKEN) return;
  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates?offset=${tgOffset}&timeout=30`;
    const res = await fetch(url);
    if (!res.ok) {
      console.error("Telegram poll HTTP error:", res.status);
      return;
    }
    const data = await res.json();
    if (!data.ok || !data.result) return;

    for (const update of data.result) {
      tgOffset = update.update_id + 1;
      const msg = update.message;
      if (!msg || String(msg.chat.id) !== String(TELEGRAM_CHAT_ID)) continue;

      const text = (msg.text || "").trim();
      const textLower = text.toLowerCase();
      const confirmMatch = textLower.match(/^confirm\s+(GS\d+)$/i);
      const rejectMatch = textLower.match(/^reject\s+(GS\d+)$/i);
      const orderId = (confirmMatch || rejectMatch)?.[1]?.toUpperCase();

      if (orderId) {
        const status = confirmMatch ? "confirmed" : "rejected";
        await updateOrderStatus(orderId, status);
        const emoji = confirmMatch ? "✅" : "❌";
        await sendTelegram(`${emoji} Order #${orderId} ${status}${confirmMatch ? " & marked for shipping!" : "."}`);
      }
    }
  } catch (e) {
    console.error("Telegram poll error:", e.message);
  }
}

async function updateOrderStatus(orderId, status) {
  await connectDB();
  await orders.updateOne({ orderId }, { $set: { status, updatedAt: new Date() } });
}

// Start polling in background (skip on Vercel)
if (process.env.VERCEL !== "1" && TELEGRAM_BOT_TOKEN) {
  (async function loop() {
    while (true) {
      await pollTelegramReplies();
    }
  })();
}

app.use(cors());
app.use(express.json());

if (process.env.VERCEL !== "1") {
  app.use(express.static(join(__dirname, "dist")));
}

// --- Auth ---
app.post("/api/auth/login", (req, res) => {
  const { password } = req.body;
  if (!ADMIN_PASSWORD) return res.status(500).json({ error: "Admin password not configured" });
  if (password !== ADMIN_PASSWORD) return res.status(401).json({ error: "Invalid password" });
  res.json({ ok: true });
});

// --- Products ---
app.get("/api/products", async (req, res) => {
  try {
    await connectDB();
    const data = await products.find().sort({ id: 1 }).toArray();
    res.json(data.map(({ _id, ...rest }) => rest));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    await connectDB();
    const last = await products.findOne({}, { sort: { id: -1 } });
    const newId = (last?.id || 0) + 1;
    const doc = { ...req.body, id: newId };
    await products.insertOne(doc);
    res.json(doc);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put("/api/products/:id", async (req, res) => {
  try {
    await connectDB();
    const id = Number(req.params.id);
    const { id: _, ...updates } = req.body;
    await products.updateOne({ id }, { $set: updates });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    await connectDB();
    await products.deleteOne({ id: Number(req.params.id) });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// --- Orders ---
app.post("/api/orders", async (req, res) => {
  try {
    await connectDB();
    const { items, total, currency, customer } = req.body;

    if (!items?.length || !customer?.name || !customer?.phone || !customer?.address) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!/^\+?[\d\s\-]{7,15}$/.test(customer.phone.trim())) {
      return res.status(400).json({ error: "Invalid phone number" });
    }

    const lastOrder = await orders.findOne({}, { sort: { _id: -1 } });
    const num = lastOrder ? (lastOrder.num || 0) + 1 : 1;
    const orderId = `GS${String(num).padStart(4, "0")}`;

    const order = {
      orderId,
      num,
      items,
      total,
      currency: currency || "Rs.",
      customer,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await orders.insertOne(order);

    // Send to Telegram
    await sendTelegram(formatOrderMessage(order));

    res.json({ ok: true, orderId });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/api/orders/:orderId", async (req, res) => {
  try {
    await connectDB();
    const order = await orders.findOne({ orderId: req.params.orderId });
    if (!order) return res.status(404).json({ error: "Order not found" });
    const { _id, ...rest } = order;
    res.json(rest);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// SPA fallback (local dev only)
if (process.env.VERCEL !== "1") {
  app.get("*", (req, res) => {
    res.sendFile(join(__dirname, "dist", "index.html"));
  });
}

if (process.env.VERCEL !== "1") {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

export default app;
