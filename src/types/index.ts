export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  in_stock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
