import type { WooProduct, WooCategory } from "./types";

export const mockCategories: WooCategory[] = [
  { id: 1, name: "Electrónica", slug: "electronica", parent: 0, count: 4, image: null },
  { id: 2, name: "Ropa", slug: "ropa", parent: 0, count: 3, image: null },
  { id: 3, name: "Hogar", slug: "hogar", parent: 0, count: 3, image: null },
];

export const mockProducts: WooProduct[] = [
  {
    id: 1,
    name: "Auriculares Bluetooth Pro",
    slug: "auriculares-bluetooth-pro",
    description: "<p>Auriculares inalámbricos con cancelación de ruido activa, 30 horas de batería y sonido Hi-Fi. Ideales para trabajo y entretenimiento.</p>",
    short_description: "Auriculares inalámbricos con cancelación de ruido",
    price: "89.99",
    regular_price: "129.99",
    sale_price: "89.99",
    on_sale: true,
    images: [{ id: 1, src: "https://picsum.photos/seed/headphones/600/600", name: "Auriculares", alt: "Auriculares Bluetooth Pro" }],
    categories: [{ id: 1, name: "Electrónica", slug: "electronica", parent: 0, count: 4, image: null }],
    attributes: [{ id: 1, name: "Color", options: ["Negro", "Blanco", "Azul"] }],
    stock_status: "instock",
    sku: "AUR-BT-001",
    average_rating: "4.5",
    rating_count: 128,
  },
  {
    id: 2,
    name: "Smartwatch Deportivo",
    slug: "smartwatch-deportivo",
    description: "<p>Reloj inteligente resistente al agua con GPS, monitor de ritmo cardíaco y más de 20 modos deportivos.</p>",
    short_description: "Reloj inteligente con GPS y monitor cardíaco",
    price: "199.99",
    regular_price: "199.99",
    sale_price: "",
    on_sale: false,
    images: [{ id: 2, src: "https://picsum.photos/seed/smartwatch/600/600", name: "Smartwatch", alt: "Smartwatch Deportivo" }],
    categories: [{ id: 1, name: "Electrónica", slug: "electronica", parent: 0, count: 4, image: null }],
    attributes: [{ id: 2, name: "Talla", options: ["S", "M", "L"] }],
    stock_status: "instock",
    sku: "SW-DEP-002",
    average_rating: "4.2",
    rating_count: 85,
  },
  {
    id: 3,
    name: "Camiseta Algodón Orgánico",
    slug: "camiseta-algodon-organico",
    description: "<p>Camiseta de algodón 100% orgánico, suave y transpirable. Corte regular fit disponible en múltiples colores.</p>",
    short_description: "Camiseta de algodón orgánico premium",
    price: "29.99",
    regular_price: "39.99",
    sale_price: "29.99",
    on_sale: true,
    images: [{ id: 3, src: "https://picsum.photos/seed/tshirt/600/600", name: "Camiseta", alt: "Camiseta Algodón Orgánico" }],
    categories: [{ id: 2, name: "Ropa", slug: "ropa", parent: 0, count: 3, image: null }],
    attributes: [{ id: 3, name: "Talla", options: ["XS", "S", "M", "L", "XL"] }, { id: 1, name: "Color", options: ["Blanco", "Negro", "Gris", "Azul marino"] }],
    stock_status: "instock",
    sku: "CAM-ORG-003",
    average_rating: "4.8",
    rating_count: 256,
  },
  {
    id: 4,
    name: "Lámpara LED Escritorio",
    slug: "lampara-led-escritorio",
    description: "<p>Lámpara de escritorio con luz LED regulable, 5 niveles de brillo y 3 temperaturas de color. Base con carga inalámbrica.</p>",
    short_description: "Lámpara LED con carga inalámbrica integrada",
    price: "49.99",
    regular_price: "49.99",
    sale_price: "",
    on_sale: false,
    images: [{ id: 4, src: "https://picsum.photos/seed/lamp/600/600", name: "Lámpara", alt: "Lámpara LED Escritorio" }],
    categories: [{ id: 3, name: "Hogar", slug: "hogar", parent: 0, count: 3, image: null }],
    attributes: [{ id: 1, name: "Color", options: ["Negro", "Blanco"] }],
    stock_status: "instock",
    sku: "LAM-LED-004",
    average_rating: "4.6",
    rating_count: 94,
  },
  {
    id: 5,
    name: "Mochila Urbana Impermeable",
    slug: "mochila-urbana-impermeable",
    description: "<p>Mochila de 25L con compartimento acolchado para laptop de hasta 15.6\", material impermeable y múltiples bolsillos organizadores.</p>",
    short_description: "Mochila impermeable para laptop 15.6\"",
    price: "59.99",
    regular_price: "79.99",
    sale_price: "59.99",
    on_sale: true,
    images: [{ id: 5, src: "https://picsum.photos/seed/backpack/600/600", name: "Mochila", alt: "Mochila Urbana Impermeable" }],
    categories: [{ id: 2, name: "Ropa", slug: "ropa", parent: 0, count: 3, image: null }],
    attributes: [{ id: 1, name: "Color", options: ["Negro", "Gris", "Azul"] }],
    stock_status: "instock",
    sku: "MOC-URB-005",
    average_rating: "4.7",
    rating_count: 312,
  },
  {
    id: 6,
    name: "Teclado Mecánico RGB",
    slug: "teclado-mecanico-rgb",
    description: "<p>Teclado mecánico con switches Cherry MX, retroiluminación RGB personalizable y marco de aluminio. Ideal para gaming y productividad.</p>",
    short_description: "Teclado mecánico Cherry MX con RGB",
    price: "119.99",
    regular_price: "119.99",
    sale_price: "",
    on_sale: false,
    images: [{ id: 6, src: "https://picsum.photos/seed/keyboard/600/600", name: "Teclado", alt: "Teclado Mecánico RGB" }],
    categories: [{ id: 1, name: "Electrónica", slug: "electronica", parent: 0, count: 4, image: null }],
    attributes: [{ id: 4, name: "Switch", options: ["Red", "Blue", "Brown"] }],
    stock_status: "instock",
    sku: "TEC-MEC-006",
    average_rating: "4.4",
    rating_count: 178,
  },
  {
    id: 7,
    name: "Difusor Aromaterapia",
    slug: "difusor-aromaterapia",
    description: "<p>Difusor ultrasónico de aceites esenciales con luz LED ambiental, 300ml de capacidad y apagado automático.</p>",
    short_description: "Difusor ultrasónico con luz LED ambiental",
    price: "34.99",
    regular_price: "44.99",
    sale_price: "34.99",
    on_sale: true,
    images: [{ id: 7, src: "https://picsum.photos/seed/diffuser/600/600", name: "Difusor", alt: "Difusor Aromaterapia" }],
    categories: [{ id: 3, name: "Hogar", slug: "hogar", parent: 0, count: 3, image: null }],
    attributes: [{ id: 1, name: "Color", options: ["Blanco", "Madera clara", "Madera oscura"] }],
    stock_status: "instock",
    sku: "DIF-ARO-007",
    average_rating: "4.3",
    rating_count: 67,
  },
  {
    id: 8,
    name: "Cargador Portátil 20000mAh",
    slug: "cargador-portatil-20000mah",
    description: "<p>Power bank de 20000mAh con carga rápida USB-C PD 65W, pantalla LED y capacidad para cargar laptop.</p>",
    short_description: "Power bank 20000mAh con carga rápida 65W",
    price: "45.99",
    regular_price: "45.99",
    sale_price: "",
    on_sale: false,
    images: [{ id: 8, src: "https://picsum.photos/seed/powerbank/600/600", name: "Cargador", alt: "Cargador Portátil 20000mAh" }],
    categories: [{ id: 1, name: "Electrónica", slug: "electronica", parent: 0, count: 4, image: null }],
    attributes: [],
    stock_status: "instock",
    sku: "CAR-POR-008",
    average_rating: "4.1",
    rating_count: 203,
  },
];

export function getMockProducts(params?: { category?: string; search?: string }): WooProduct[] {
  let products = [...mockProducts];
  if (params?.category) {
    products = products.filter((p) =>
      p.categories.some((c) => c.slug === params.category),
    );
  }
  if (params?.search) {
    const q = params.search.toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.short_description.toLowerCase().includes(q),
    );
  }
  return products;
}

export function getMockProduct(slug: string): WooProduct | null {
  return mockProducts.find((p) => p.slug === slug) ?? null;
}

export function getMockCategories(): WooCategory[] {
  return mockCategories;
}
