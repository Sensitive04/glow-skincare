export default function Footer({ config }) {
  return (
    <footer className="footer" id="contact">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <h3>{config.name}</h3>
            <p>
              Clean, effective skincare crafted with the finest ingredients.
              Because your skin deserves the best.
            </p>
          </div>
          <div className="footer-col">
            <h4>Shop</h4>
            <ul>
              <li><a href="#products">All Products</a></li>
              <li><a href="#products">Cleansers</a></li>
              <li><a href="#products">Serums</a></li>
              <li><a href="#products">Moisturizers</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Sustainability</a></li>
              <li><a href="#">Ingredients</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Shipping</a></li>
              <li><a href="#">Returns</a></li>
              <li><a href={`mailto:${config.email}`}>Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2026 {config.name}. All rights reserved.</span>
          <span>Made with care for your skin</span>
        </div>
      </div>
    </footer>
  );
}
