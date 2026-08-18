import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-sage/20 bg-primary text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-3 text-lg font-bold">Glō</h3>
            <p className="text-sm text-white/70">
              Clean skincare for radiant, healthy skin. Formulated with care,
              powered by nature.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link href="/products" className="hover:text-white">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-white">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>hello@glo-skincare.com</li>
              <li>1-800-GLO-SKIN</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/20 pt-6 text-center text-xs text-white/50">
          &copy; {new Date().getFullYear()} Glō Skincare. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
