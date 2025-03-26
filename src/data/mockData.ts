// products.ts - Unified product data for the DAILY TOUCH store

// Product interface - main product type used throughout the application
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured?: boolean;
  onSale?: boolean;
  newArrival?: boolean;
  discountPercentage?: number; // For sale items
  stock: number;
  rating?: number;
  reviewCount?: number;
  colors?: string[];  // Optional color variants
  sizes?: string[];   // Optional size variants
}

// Categories
export interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
  featured?: boolean;
}

// Collections for curated product groups
export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  featured?: boolean;

// Testimonials from customers
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  image?: string;
  rating: number;
}

// Blog content
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  author: string;
  category: string;
}

// Cart item
export interface CartItem {
  productId: string;
  quantity: number;
}

// Sample products data
export const products: Product[] = [
  {
    id: "ceramic-serving-bowl",
    name: "Ceramic Serving Bowl",
    description: "Handcrafted ceramic bowl with elegant glazing, perfect for serving salads, pasta, or displaying fresh fruit.",
    price: 48.50,
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Kitchen",
    featured: true,
    stock: 15,
    rating: 4.8,
    reviewCount: 124
  },
  {
    id: "minimalist-desk-lamp",
    name: "Minimalist Desk Lamp",
    description: "Modern desk lamp with adjustable brightness and sleek design that complements any workspace.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Lighting",
    featured: true,
    stock: 8,
    rating: 4.7,
    reviewCount: 86
  },
  {
    id: "leather-bound-journal",
    name: "Leather-Bound Journal",
    description: "Premium journal with handmade paper and genuine leather binding. Perfect for sketching, writing, and documenting your thoughts.",
    price: 32.95,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Stationery",
    featured: true,
    stock: 22,
    rating: 4.9,
    reviewCount: 213
  },
  {
    id: "macrame-wall-hanging",
    name: "Macramé Wall Hanging",
    description: "Handwoven from 100% natural cotton, this macramé wall hanging adds texture and bohemian charm to any room.",
    price: 65.00,
    image: "https://images.unsplash.com/photo-1594040226829-7f251ab46d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Wall Art",
    featured: true,
    stock: 5,
    rating: 4.6,
    reviewCount: 78
  },
  {
    id: "wooden-serving-tray",
    name: "Wooden Serving Tray",
    description: "Artisan-crafted from sustainable oak, this serving tray is perfect for breakfast in bed or entertaining guests.",
    price: 58.99,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Kitchen",
    newArrival: true,
    featured: true,
    stock: 12,
    rating: 4.5,
    reviewCount: 42
  },
  {
    id: "linen-napkin-set",
    name: "Linen Napkin Set",
    description: "Set of 4 stone-washed linen napkins in complementary earth tones. Soft, absorbent, and reusable.",
    price: 36.00,
    image: "https://images.unsplash.com/photo-1593620659273-d6a839499962?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Kitchen",
    featured: true,
    stock: 18,
    rating: 4.7,
    reviewCount: 63
  },
  {
    id: "copper-lamp",
    name: "Copper Hanging Lamp",
    description: "Handcrafted copper lamp with an industrial-inspired design that adds warmth and character to any space.",
    price: 89.00,
    image: "https://images.unsplash.com/photo-1594040226829-7f251ab46d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "Lighting",
    stock: 10,
    rating: 4.7,
    reviewCount: 62
  },
  {
    id: "art-deco-vase",
    name: "Art Deco Vase",
    description: "Elegant ceramic vase with art deco-inspired patterns, perfect as a statement piece for any room.",
    price: 64.99,
    image: "https://images.unsplash.com/photo-1622398925373-3f91b1eba4fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "Decor",
    newArrival: true,
    stock: 7,
    rating: 4.6,
    reviewCount: 28
  },
  {
    id: "wall-mirror",
    name: "Round Wall Mirror",
    description: "Minimalist round mirror with a thin brass frame that adds light and dimension to your space.",
    price: 72.50,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "Wall Art",
    stock: 15,
    rating: 4.8,
    reviewCount: 94
  },
  {
    id: "wooden-desk-set",
    name: "Wooden Desk Organizer",
    description: "Handcrafted desk organizer with compartments for pens, cards, and small accessories. Made from sustainable oak.",
    price: 124.00,
    image: "https://images.unsplash.com/photo-1577207989304-fbe2cbf96a51?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "Decor",
    featured: true,
    stock: 6,
    rating: 4.9,
    reviewCount: 47
  },
  {
    id: "scented-candles",
    name: "Scented Candles Set",
    description: "Set of three hand-poured soy candles with essential oil scents - lavender, cedar, and vanilla.",
    price: 42.00,
    image: "https://images.unsplash.com/photo-1560005384-0dba34ab6da9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "Decor",
    stock: 20,
    rating: 4.9,
    reviewCount: 118
  },
  {
    id: "linen-notebooks",
    name: "Linen Notebook Set",
    description: "Set of three linen-covered notebooks in different sizes, perfect for journaling, sketching, and note-taking.",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "Stationery",
    stock: 25,
    rating: 4.6,
    reviewCount: 52
  },
  {
    id: "premium-stationery",
    name: "Premium Stationery Set",
    description: "Complete stationery set including notepad, envelopes, and writing implements in a coordinated design.",
    price: 34.50,
    image: "https://images.unsplash.com/photo-1519974719765-e6559eac2575?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "Stationery",
    stock: 15,
    rating: 4.8,
    reviewCount: 76
  },
  {
    id: "fountain-pen-set",
    name: "Fountain Pen Collection",
    description: "Set of three premium fountain pens with different nib sizes and complementary ink colors.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "Stationery",
    stock: 8,
    rating: 4.9,
    reviewCount: 64
  },
  {
    id: "ceramic-plates",
    name: "Ceramic Plates Set",
    description: "Set of four handmade ceramic plates with a matte glaze finish. Each piece has subtle variations making it unique.",
    price: 56.99,
    image: "https://images.unsplash.com/photo-1572107998877-3e93e457f8c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "Kitchen",
    stock: 10,
    rating: 4.9,
    reviewCount: 58
  },
  {
    id: "pendant-light",
    name: "Modern Pendant Light",
    description: "Minimalist pendant light with brass accents and an adjustable height. Provides warm, ambient lighting.",
    price: 118.00,
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "Lighting",
    featured: true,
    stock: 7,
    rating: 4.8,
    reviewCount: 74
  },
  {
    id: "floor-lamp",
    name: "Adjustable Floor Lamp",
    description: "Contemporary floor lamp with a flexible arm and weighted base. Perfect for reading nooks and living spaces.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1532582783240-66b1dd261686?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "Lighting",
    stock: 5,
    rating: 4.9,
    reviewCount: 46
  },
  {
    id: "wax-seal-kit",
    name: "Wax Seal Kit",
    description: "Complete wax sealing kit with brass seal, wax sticks in three colors, and a melting spoon.",
    price: 28.95,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "Stationery",
    onSale: true,
    discountPercentage: 15,
    stock: 12,
    rating: 4.5,
    reviewCount: 32
  },
  {
    id: "kitchen-knives",
    name: "Professional Kitchen Knives",
    description: "Set of three essential kitchen knives made from high-carbon steel with ergonomic wooden handles.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1567015417694-e8dee045b1fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "Kitchen",
    onSale: true,
    discountPercentage: 20,
    stock: 6,
    rating: 4.7,
    reviewCount: 124
  },
  {
    id: "geometric-wall-light",
    name: "Geometric Wall Light",
    description: "Modern wall sconce with a geometric brass frame and frosted glass diffuser for a soft, warm glow.",
    price: 78.00,
    image: "https://images.unsplash.com/photo-1594040226829-7f251ab46d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "Lighting",
    stock: 9,
    rating: 4.6,
    reviewCount: 38
  }
];

// Categories data
export const categories: Category[] = [
  {
    id: "wall-art",
    name: "Wall Art",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    productCount: products.filter(p => p.category === "Wall Art").length,
    featured: true
  },
  {
    id: "decor",
    name: "Home Decor",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    productCount: products.filter(p => p.category === "Decor").length,
    featured: true
  },
  {
    id: "kitchen",
    name: "Kitchen",
    image: "https://images.unsplash.com/photo-1600014896066-48005593e447?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    productCount: products.filter(p => p.category === "Kitchen").length,
    featured: true
  },
  {
    id: "lighting",
    name: "Lighting",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    productCount: products.filter(p => p.category === "Lighting").length,
    featured: true
  },
  {
    id: "stationery",
    name: "Stationery",
    image: "https://images.unsplash.com/photo-1519974719765-e6559eac2575?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    productCount: products.filter(p => p.category === "Stationery").length,
    featured: true
  }
];

// Collections data
export const collections: Collection[] = [
  {
    id: "handcrafted",
    name: "Handcrafted Pieces",
    description: "Unique items made by skilled artisans",
    image: "https://images.unsplash.com/photo-1565193566173-7a0bff4e5390?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    productCount: 12,
    featured: true
  },
  {
    id: "modern-lighting",
    name: "Modern Lighting",
    description: "Elegant designs for every space",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    productCount: products.filter(p => p.category === "Lighting").length,
    featured: true
  },
  {
    id: "premium-stationery",
    name: "Premium Stationery",
    description: "For the discerning writer and creator",
    image: "https://images.unsplash.com/photo-1519974719765-e6559eac2575?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    productCount: products.filter(p => p.category === "Stationery").length,
    featured: true
  },
  {
    id: "eco-friendly",
    name: "Sustainable Living",
    description: "Eco-friendly products for conscious consumers",
    image: "https://images.unsplash.com/photo-1600014896066-48005593e447?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    productCount: 8,
    featured: true
  }
];

// Testimonials data
export const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    name: "Emily Chen",
    role: "Interior Designer",
    content: "Daily Touch has transformed how I source products for my clients. The quality is exceptional and the curation is spot on.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    rating: 5
  },
  {
    id: "testimonial-2",
    name: "James Wilson",
    role: "Home Enthusiast",
    content: "I've purchased several items from Daily Touch and each one has exceeded my expectations. The attention to detail is remarkable.",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    rating: 5
  },
  {
    id: "testimonial-3",
    name: "Sofia Rodriguez",
    role: "Writer",
    content: "Their stationery collection is a dream. As someone who appreciates fine paper goods, I'm thoroughly impressed with the quality.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    rating: 4
  }
];

// Blog posts data
export const blogPosts: BlogPost[] = [
  {
    id: "blog-1",
    title: "The Art of Slow Living",
    excerpt: "Discover how thoughtfully designed spaces can transform your daily routines.",
    date: "June 12, 2023",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    author: "Elena Morris",
    category: "Lifestyle"
  },
  {
    id: "blog-2",
    title: "Sustainable Design Choices",
    excerpt: "How to select eco-friendly products without compromising on style.",
    date: "May 28, 2023",
    image: "https://images.unsplash.com/photo-1600014896066-48005593e447?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    author: "Thomas Reed",
    category: "Sustainability"
  },
  {
    id: "blog-3",
    title: "The Perfect Home Office",
    excerpt: "Essential items to create a productive and inspiring workspace.",
    date: "April 15, 2023",
    image: "https://images.unsplash.com/photo-1577207989304-fbe2cbf96a51?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    author: "Olivia Bennett",
    category: "Productivity"
  }
];

// Sample cart data
export const sampleCart: CartItem[] = [
  { productId: "ceramic-serving-bowl", quantity: 1 },
  { productId: "minimalist-desk-lamp", quantity: 2 },
  { productId: "linen-napkin-set", quantity: 1 }
];

// Featured products - convenience getter
export const getFeaturedProducts = () => products.filter(product => product.featured);

// New arrivals - convenience getter
export const getNewArrivals = () => products.filter(product => product.newArrival);

// Sale items - convenience getter
export const getSaleItems = () => products.filter(product => product.onSale);