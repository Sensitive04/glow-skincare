import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  RotateCcw,
  LogOut,
  Package,
} from "lucide-react";
import { getProducts, addProduct, updateProduct, deleteProduct, resetToDefaults } from "../store";
import { CATEGORIES, SHOP_CONFIG } from "../products";

const EMPTY = {
  name: "",
  category: "cleansers",
  price: "",
  originalPrice: "",
  description: "",
  ingredients: "",
  size: "",
  badge: "",
  rating: "",
  reviews: "",
};

export default function Admin({ onLogout }) {
  const [products, setProducts] = useState(() => getProducts());
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [showAdd, setShowAdd] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const reload = () => setProducts(getProducts());

  const handleSave = () => {
    const data = {
      ...form,
      price: Number(form.price) || 0,
      originalPrice: form.originalPrice ? Number(form.originalPrice) : null,
      rating: Number(form.rating) || 4.5,
      reviews: Number(form.reviews) || 0,
      badge: form.badge || null,
    };

    if (editing) {
      updateProduct(editing, data);
    } else {
      addProduct(data);
    }
    setEditing(null);
    setShowAdd(false);
    setForm(EMPTY);
    reload();
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      originalPrice: product.originalPrice || "",
      description: product.description,
      ingredients: product.ingredients,
      size: product.size,
      badge: product.badge || "",
      rating: product.rating,
      reviews: product.reviews,
    });
    setEditing(product.id);
    setShowAdd(true);
  };

  const handleDelete = (id) => {
    deleteProduct(id);
    setConfirmDelete(null);
    reload();
  };

  const handleReset = () => {
    if (window.confirm("Reset all products to defaults? This cannot be undone.")) {
      resetToDefaults();
      reload();
    }
  };

  const cancel = () => {
    setEditing(null);
    setShowAdd(false);
    setForm(EMPTY);
  };

  const categories = CATEGORIES.filter((c) => c.id !== "all");

  return (
    <div className="admin">
      <div className="admin-inner">
        <div className="admin-header">
          <div>
            <h1>
              <Package size={28} />
              {SHOP_CONFIG.name} Admin
            </h1>
            <p>Manage your products</p>
          </div>
          <div className="admin-actions">
            <button className="admin-btn secondary" onClick={handleReset}>
              <RotateCcw size={16} />
              Reset Defaults
            </button>
            <button className="admin-btn primary" onClick={() => { cancel(); setShowAdd(true); }}>
              <Plus size={16} />
              Add Product
            </button>
            <button className="admin-btn ghost" onClick={onLogout}>
              <LogOut size={16} />
              Exit
            </button>
          </div>
        </div>

        {showAdd && (
          <div className="admin-modal-overlay" onClick={cancel}>
            <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{editing ? "Edit Product" : "Add New Product"}</h2>
                <button onClick={cancel}>
                  <X size={20} />
                </button>
              </div>
              <div className="modal-body">
                <div className="form-row">
                  <label>
                    Product Name *
                    <input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Vitamin C Serum"
                    />
                  </label>
                  <label>
                    Size
                    <input
                      value={form.size}
                      onChange={(e) => setForm({ ...form, size: e.target.value })}
                      placeholder="e.g. 30ml"
                    />
                  </label>
                </div>
                <div className="form-row">
                  <label>
                    Price *
                    <input
                      type="number"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      placeholder="28"
                    />
                  </label>
                  <label>
                    Original Price (optional, shows strikethrough)
                    <input
                      type="number"
                      value={form.originalPrice}
                      onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
                      placeholder="35"
                    />
                  </label>
                </div>
                <div className="form-row">
                  <label>
                    Category
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Badge
                    <select
                      value={form.badge}
                      onChange={(e) => setForm({ ...form, badge: e.target.value })}
                    >
                      <option value="">None</option>
                      <option value="Bestseller">Bestseller</option>
                      <option value="Sale">Sale</option>
                      <option value="New">New</option>
                      <option value="Premium">Premium</option>
                      <option value="Editor's Pick">Editor's Pick</option>
                    </select>
                  </label>
                </div>
                <label>
                  Description
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Describe the product..."
                  />
                </label>
                <label>
                  Key Ingredients
                  <input
                    value={form.ingredients}
                    onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
                    placeholder="e.g. Vitamin C, Hyaluronic Acid"
                  />
                </label>
                <div className="form-row">
                  <label>
                    Rating
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      value={form.rating}
                      onChange={(e) => setForm({ ...form, rating: e.target.value })}
                      placeholder="4.5"
                    />
                  </label>
                  <label>
                    Reviews Count
                    <input
                      type="number"
                      value={form.reviews}
                      onChange={(e) => setForm({ ...form, reviews: e.target.value })}
                      placeholder="128"
                    />
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <button className="admin-btn ghost" onClick={cancel}>
                  Cancel
                </button>
                <button
                  className="admin-btn primary"
                  onClick={handleSave}
                  disabled={!form.name || !form.price}
                >
                  <Save size={16} />
                  {editing ? "Save Changes" : "Add Product"}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Badge</th>
                <th>Rating</th>
                <th style={{ width: 100 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className="product-cell">
                      <strong>{p.name}</strong>
                      <span>{p.size}</span>
                    </div>
                  </td>
                  <td>
                    <span className="cat-tag">{p.category}</span>
                  </td>
                  <td>
                    <div className="price-cell">
                      <strong>${p.price}</strong>
                      {p.originalPrice && (
                        <span className="old-price">${p.originalPrice}</span>
                      )}
                    </div>
                  </td>
                  <td>
                    {p.badge && (
                      <span className={`badge-tag badge-${p.badge.toLowerCase().replace("'", "")}`}>
                        {p.badge}
                      </span>
                    )}
                  </td>
                  <td>
                    {p.rating} ({p.reviews})
                  </td>
                  <td>
                    <div className="action-btns">
                      <button className="icon-btn" onClick={() => handleEdit(p)} title="Edit">
                        <Pencil size={15} />
                      </button>
                      <button
                        className="icon-btn danger"
                        onClick={() => setConfirmDelete(p.id)}
                        title="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {confirmDelete && (
          <div className="admin-modal-overlay" onClick={() => setConfirmDelete(null)}>
            <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
              <h3>Delete product?</h3>
              <p>This action cannot be undone.</p>
              <div className="confirm-actions">
                <button className="admin-btn ghost" onClick={() => setConfirmDelete(null)}>
                  Cancel
                </button>
                <button className="admin-btn danger" onClick={() => handleDelete(confirmDelete)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
