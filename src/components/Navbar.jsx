import { ShoppingBag } from "lucide-react";

export default function Navbar({ shopName, cartCount, onCartClick }) {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <a href="#" className="navbar-brand">
          {shopName}
        </a>
        <ul className="navbar-links">
          <li>
            <a href="#products">Shop</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#track">Track Order</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
        <button className="cart-btn" onClick={onCartClick} aria-label="Open cart">
          <ShoppingBag />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </button>
      </div>
    </nav>
  );
}
