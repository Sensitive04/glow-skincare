import { ArrowRight } from "lucide-react";

export default function Hero({ config }) {
  return (
    <section className="hero">
      <span className="hero-label">Clean Beauty Essentials</span>
      <h1>
        Discover Your
        <br />
        Natural <em>Glow</em>
      </h1>
      <p className="hero-description">{config.description}</p>
      <a href="#products" className="hero-cta">
        Shop Collection
        <ArrowRight size={16} />
      </a>
    </section>
  );
}
