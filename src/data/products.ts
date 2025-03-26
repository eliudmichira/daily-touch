export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  stock: number;
  featured?: boolean;
  onSale?: boolean;
  newArrival?: boolean;
  discountPercentage?: number;
  reviewCount?: number;
}

export const categories = [
  "All",
  "Kitchen Appliances",
  "Stationery", // Fixed spelling
  "Light Appliances",
  "Home Decor"
];

export const products: Product[] = [
  {
    id: "smart-refrigerator",
    name: "Smart Refrigerator",
    description: "Energy-efficient smart refrigerator with touch screen display and temperature control.",
    price: 1299.99,
    category: "Kitchen Appliances",
    image: "https://images.unsplash.com/photo-1588854337115-1c67d9247e4d?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    stock: 8,
    featured: true,
    reviewCount: 32
  },
  {
    id: "professional-notebook-set",
    name: "Professional Notebook Set",
    description: "Premium quality notebooks with smooth paper and durable covers.",
    price: 24.99,
    category: "Stationery",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    stock: 50,
    reviewCount: 78
  },
  {
    id: "led-desk-lamp",
    name: "LED Desk Lamp",
    description: "Adjustable LED desk lamp with multiple brightness levels and color temperatures.",
    price: 39.99,
    category: "Light Appliances",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    rating: 4.3,
    stock: 30,
    reviewCount: 45
  },
  {
    id: "modern-wall-art",
    name: "Modern Wall Art",
    description: "Contemporary wall art piece with abstract design and premium canvas material.",
    price: 89.99,
    category: "Home Decor",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    stock: 15,
    featured: true,
    reviewCount: 64
  },
  {
    id: "smart-coffee-maker",
    name: "Smart Coffee Maker",
    description: "Programmable coffee maker with built-in grinder and mobile app control.",
    price: 199.99,
    category: "Kitchen Appliances",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    stock: 12,
    featured: true,
    reviewCount: 102
  },
  {
    id: "premium-pen-set",
    name: "Premium Pen Set",
    description: "Luxury pen set with smooth writing experience and elegant design.",
    price: 49.99,
    category: "Stationery",
    image: "https://images.unsplash.com/photo-1583075773515-8482c2231111?auto=format&fit=crop&w=800&q=80",
    rating: 4.4,
    stock: 25,
    reviewCount: 36
  },
  {
    id: "smart-led-bulb",
    name: "Smart LED Bulb",
    description: "WiFi-enabled smart LED bulb with voice control and millions of colors.",
    price: 29.99,
    category: "Light Appliances",
    image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    stock: 40,
    onSale: true,
    discountPercentage: 15,
    reviewCount: 88
  },
  {
    id: "decorative-throw-pillows",
    name: "Decorative Throw Pillows",
    description: "Set of 3 stylish throw pillows with premium fabric and modern patterns.",
    price: 59.99,
    category: "Home Decor",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
    rating: 4.2,
    stock: 20,
    reviewCount: 42
  },
  {
    id: "food-processor",
    name: "Food Processor",
    description: "High-performance food processor with multiple attachments and pulse function.",
    price: 149.99,
    category: "Kitchen Appliances",
    image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    stock: 10,
    onSale: true,
    discountPercentage: 10,
    reviewCount: 56
  },
  {
    id: "desk-organizer-set",
    name: "Desk Organizer Set",
    description: "Complete desk organization set with compartments for all your supplies.",
    price: 34.99,
    category: "Stationery",
    image: "https://images.unsplash.com/photo-1587838155980-b3f7e582e3b5?auto=format&fit=crop&w=800&q=80",
    rating: 4.3,
    stock: 35,
    newArrival: true,
    reviewCount: 28
  },
  {
    id: "smart-ceiling-light",
    name: "Smart Ceiling Light",
    description: "Modern ceiling light with remote control and adjustable brightness.",
    price: 79.99,
    category: "Light Appliances",
    image: "https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    stock: 18,
    featured: true,
    reviewCount: 39
  },
  {
    id: "vintage-wall-clock",
    name: "Vintage Wall Clock",
    description: "Elegant vintage-style wall clock with silent movement.",
    price: 69.99,
    category: "Home Decor",
    image: "https://images.unsplash.com/photo-1594040226829-7f251ab46d80?auto=format&fit=crop&w=800&q=80",
    rating: 4.4,
    stock: 15,
    newArrival: true,
    reviewCount: 25
  }
];

// Helper functions to get specific product sets
export const getFeaturedProducts = () => products.filter(product => product.featured);
export const getNewArrivals = () => products.filter(product => product.newArrival);
export const getSaleItems = () => products.filter(product => product.onSale);
export const getProductsByCategory = (category: string) => 
  category === "All" 
    ? products 
    : products.filter(product => product.category === category);