export interface WooProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  images: WooImage[];
  categories: WooCategory[];
  attributes: WooAttribute[];
  stock_status: "instock" | "outofstock" | "onbackorder";
  sku: string;
  average_rating: string;
  rating_count: number;
}

export interface WooImage {
  id: number;
  src: string;
  name: string;
  alt: string;
}

export interface WooCategory {
  id: number;
  name: string;
  slug: string;
  parent: number;
  count: number;
  image: WooImage | null;
}

export interface WooAttribute {
  id: number;
  name: string;
  options: string[];
}

export interface CartItem {
  product: WooProduct;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

export interface WooOrder {
  id: number;
  status: string;
  total: string;
  line_items: {
    product_id: number;
    quantity: number;
  }[];
  billing: WooBilling;
  shipping: WooShipping;
}

export interface WooBilling {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address_1: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

export interface WooShipping {
  first_name: string;
  last_name: string;
  address_1: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}
