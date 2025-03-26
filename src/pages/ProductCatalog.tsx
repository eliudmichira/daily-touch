import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { products, categories, getFeaturedProducts, getNewArrivals } from "@/data/products";
import { ProductList } from "@/components/ProductList";
import { FeaturedCollection } from "@/components/FeaturedCollection";
import { motion, AnimatePresence } from "framer-motion";
import React from 'react';

// Hero images data
const heroImages = [
  {
    url: "https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&q=80",
    alt: "Kitchen utensils",
    title: "Kitchen Essentials",
    description: "Discover premium kitchen tools"
  },
  {
    url: "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?auto=format&fit=crop&q=80",
    alt: "Stationery items",
    title: "Stationery Collection",
    description: "Premium writing instruments"
  },
  {
    url: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80",
    alt: "Modern lamps",
    title: "Modern Lighting",
    description: "Illuminate your space"
  }
];

// Additional images for scrolling rows
const scrollingImages = {
  row1: [
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80", // Kitchen
    "https://images.unsplash.com/photo-1583075773515-8482c2231111?auto=format&fit=crop&q=80", // Stationery
    "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&q=80", // Lamp
    "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&q=80", // Kitchen
    "https://images.unsplash.com/photo-1587838155980-b3f7e582e3b5?auto=format&fit=crop&q=80", // Stationery
  ],
  row2: [
    "https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?auto=format&fit=crop&q=80", // Lamp
    "https://images.unsplash.com/photo-1588854337115-1c67d9247e4d?auto=format&fit=crop&q=80", // Kitchen
    "https://images.unsplash.com/photo-1531826338556-162edb086560?auto=format&fit=crop&q=80", // Stationery
    "https://images.unsplash.com/photo-1567459169668-95d355371bda?auto=format&fit=crop&q=80", // Lamp
    "https://images.unsplash.com/photo-1591543620767-582b2e76369e?auto=format&fit=crop&q=80", // Kitchen
  ],
};

// Helper function to get random products
const getRandomProducts = (count: number) => {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export function ProductCatalog() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "All";
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [trendingProducts, setTrendingProducts] = useState(getRandomProducts(6));

  // Auto advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, []);

  // Update selected category when URL param changes
  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  // Filter products by category
  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden mb-12">
        {/* Background Image Carousel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={heroImages[currentImageIndex].url}
              alt={heroImages[currentImageIndex].alt}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          </motion.div>
        </AnimatePresence>
            
        {/* Content Layer */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="h-full flex items-center justify-between">
            {/* Main Hero Text */}
            <div className="max-w-2xl">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-playfair text-foreground mb-8 leading-tight tracking-normal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                Discover a world of unique utensils, stationery and lamps.
              </motion.h1>
              
              <motion.p 
                className="text-lg text-muted-foreground mb-10 font-sans font-light tracking-wide leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              >
                Elevate your everyday life with our carefully curated collection of premium products.
              </motion.p>
              
              <motion.button
                onClick={() => navigate("/products")}
                className="bg-amber-600 text-white px-8 py-3 rounded-full text-sm font-sans font-medium 
                  hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 transform transition-all duration-500 ease-out
                  shadow-sm hover:shadow tracking-wider uppercase"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Shop Now
              </motion.button>
            </div>

            {/* Current Slide Info */}
            <div className="hidden md:block max-w-xs">
              <motion.div
                key={`info-${currentImageIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-sm rounded-2xl p-8 text-stone-900 dark:text-stone-100"
              >
                <h2 className="text-2xl font-playfair mb-3 tracking-normal">{heroImages[currentImageIndex].title}</h2>
                <p className="text-base text-stone-600 dark:text-stone-400 font-sans font-light leading-relaxed">{heroImages[currentImageIndex].description}</p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                index === currentImageIndex 
                  ? 'bg-amber-600 dark:bg-amber-500 w-6' 
                  : 'bg-amber-600/50 dark:bg-amber-500/50 hover:bg-amber-600/75 dark:hover:bg-amber-500/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Main Content */}
      <div className="px-6 sm:px-8 lg:px-12 py-12">
        {/* Featured Collection */}
        <FeaturedCollection products={getFeaturedProducts()} />

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mt-16 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => navigate(`/products${category === "All" ? "" : `?category=${category}`}`)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-amber-600 dark:bg-amber-500 text-white'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Main Product Section */}
        <section className="mt-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-playfair font-medium text-stone-900 dark:text-stone-100">
              {selectedCategory === "All" ? "All Products" : selectedCategory}
            </h2>
          </div>
          
          <div className="w-full">
            {/* Product grid */}
            <ProductList products={filteredProducts} />
          </div>
        </section>

        {/* Scrolling Products Showcase */}
        <section className="mt-24 mb-16 overflow-hidden will-change-transform">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 
              className="text-4xl font-playfair font-medium text-stone-900 dark:text-stone-100 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Our Collection
            </motion.h2>
            <motion.p
              className="text-lg text-stone-600 dark:text-stone-400 font-sans font-light leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Explore our carefully selected products designed to elevate your daily life with thoughtful design and craftsmanship
            </motion.p>
          </div>

          <motion.h3 
            className="text-3xl font-playfair font-medium text-stone-900 dark:text-stone-100 mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Trending Products
          </motion.h3>
          <div className="relative">
            {/* First Row - Left to Right */}
            <motion.div 
              className="flex gap-8 mb-8 transform-gpu"
              animate={{
                x: [0, -1920],
              }}
              transition={{
                duration: 60,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop"
              }}
              style={{
                backfaceVisibility: "hidden",
                perspective: 1000,
                willChange: "transform"
              }}
            >
              {[...scrollingImages.row1, ...scrollingImages.row1].map((img, index) => (
                <motion.div 
                  key={index} 
                  className="w-80 h-64 flex-shrink-0 rounded-2xl overflow-hidden group relative cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src={img} 
                    alt="Trending product" 
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute bottom-0 left-0 right-0 bg-stone-900/80 backdrop-blur-sm p-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-amber-300">
                        $299.99
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1 rounded-full text-sm font-medium bg-amber-300 text-stone-900 hover:bg-amber-400 transition-colors"
                      >
                        View Details
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Second Row - Right to Left */}
            <motion.div 
              className="flex gap-8"
              animate={{
                x: [-1920, 0],
              }}
              transition={{
                duration: 60,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop"
              }}
              style={{
                backfaceVisibility: "hidden",
                perspective: 1000,
                willChange: "transform"
              }}
            >
              {[...scrollingImages.row2, ...scrollingImages.row2].map((img, index) => (
                <motion.div 
                  key={index} 
                  className="w-80 h-64 flex-shrink-0 rounded-2xl overflow-hidden group relative cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src={img} 
                    alt="Trending product" 
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute bottom-0 left-0 right-0 bg-stone-900/80 backdrop-blur-sm p-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-amber-300">
                        $249.99
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1 rounded-full text-sm font-medium bg-amber-300 text-stone-900 hover:bg-amber-400 transition-colors"
                      >
                        View Details
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}