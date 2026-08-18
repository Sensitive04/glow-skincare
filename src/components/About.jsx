import { Leaf, Heart, Sparkles, Shield } from "lucide-react";

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about-inner">
        <span className="about-label">Our Story</span>
        <h2 className="about-title">
          Beauty Rooted in <em>Nature</em>
        </h2>
        <p className="about-text">
          Founded in 2020, GLOW was born from a simple belief: skincare should be
          clean, effective, and accessible to everyone. We partner with
          sustainable farms and use cutting-edge green chemistry to deliver
          results you can see and feel.
        </p>

        <div className="about-values">
          <div className="value-card">
            <div className="value-icon">
              <Leaf size={28} />
            </div>
            <h3>Clean Ingredients</h3>
            <p>
              Every product is free from parabens, sulfates, and synthetic
              fragrances. We only use what your skin truly needs.
            </p>
          </div>
          <div className="value-card">
            <div className="value-icon">
              <Heart size={28} />
            </div>
            <h3>Cruelty-Free</h3>
            <p>
              Never tested on animals. All our products are certified
              cruelty-free by Leaping Bunny.
            </p>
          </div>
          <div className="value-card">
            <div className="value-icon">
              <Sparkles size={28} />
            </div>
            <h3>Science-Backed</h3>
            <p>
              Formulated with dermatologists and tested in clinical trials to
              ensure real, visible results.
            </p>
          </div>
          <div className="value-card">
            <div className="value-icon">
              <Shield size={28} />
            </div>
            <h3>Sustainable</h3>
            <p>
              Recyclable packaging, carbon-neutral shipping, and 1% of every
              sale goes to environmental causes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
