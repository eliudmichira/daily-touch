import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Quote, ShoppingBag, Mail, Gift, TrendingUp, Heart, Clock, Shield } from 'lucide-react';
import Footer from "@/components/Footer";

// New custom hook for parallax effect
const useParallax = (value: any, distance: number) => {
  return useTransform(value, [0, 1], [-distance, distance]);
};

export function Home() {
  // Get featured products (first 6 products)
  const featuredProducts = products.slice(0, 6);
  const featuredRef = useRef(null);
  const isInView = useInView(featuredRef, { once: true, margin: "-20%" });
  
  // Ref for hero section parallax
  const heroRef = useRef(null);
  const { scrollYProgress: heroScrollY } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(heroScrollY, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(heroScrollY, [0, 0.5], [1, 0]);

  // Newsletter state
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  
  // Sale countdown timer
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 12,
    minutes: 45,
    seconds: 30
  });
  
  // Update countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        let { days, hours, minutes, seconds } = prevTime;
        
        if (seconds > 0) {
          seconds -= 1;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes -= 1;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours -= 1;
            } else {
              hours = 23;
              if (days > 0) {
                days -= 1;
              } else {
                // Reset timer when it hits zero
                days = 3;
                hours = 12;
                minutes = 45;
                seconds = 30;
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Get unique categories
  const categories = Array.from(new Set(products.map(p => p.category)));
  
  // New trending products section (use different products)
  const trendingProducts = products.slice(8, 12);
  
  // Refs for section animations
  const categoryRef = useRef(null);
  const testimonialRef = useRef(null);
  const newsletterRef = useRef(null);
  const saleRef = useRef(null);
  const isCategoryInView = useInView(categoryRef, { once: true, margin: "-10%" });
  const isTestimonialInView = useInView(testimonialRef, { once: true, margin: "-10%" });
  const isNewsletterInView = useInView(newsletterRef, { once: true, margin: "-10%" });
  const isSaleInView = useInView(saleRef, { once: true, margin: "-10%" });

  // Handle newsletter submit
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950 overflow-hidden">
      {/* Hero Section with Parallax */}
      <motion.section 
        ref={heroRef}
        className="relative overflow-hidden bg-gradient-to-b from-amber-50 to-white dark:from-stone-900 dark:to-stone-950 py-32 sm:py-40"
      >
        {/* Background dots pattern */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 opacity-20 dark:opacity-10">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-2 w-2 rounded-full bg-amber-500 dark:bg-amber-400"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.7 + 0.3,
                }}
                animate={{
                  y: [0, Math.random() * 20 - 10],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 5 + Math.random() * 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>

        <motion.div
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.215, 0.610, 0.355, 1.000] }}
              className="inline-block mb-6 px-4 py-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-full text-sm font-medium"
            >
              New Collection Available
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl sm:text-6xl md:text-7xl font-playfair font-medium text-stone-900 dark:text-stone-100 tracking-tight"
            >
              <span className="block">Touch of</span>
              <span className="block bg-gradient-to-r from-amber-600 to-amber-400 dark:from-amber-400 dark:to-amber-200 text-transparent bg-clip-text">Elegance</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-6 text-lg sm:text-xl text-stone-600 dark:text-stone-400 max-w-3xl mx-auto"
            >
              Discover our curated collection of premium home essentials, designed to elevate your everyday moments with timeless style and exceptional quality.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/products">
                <Button size="lg" className="rounded-full px-8 bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600">
                  Explore Collection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/categories">
                <Button size="lg" variant="outline" className="rounded-full px-8">
                  Browse Categories
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Value Props Section */}
      <section className="py-12 bg-white dark:bg-stone-950 border-y border-stone-200 dark:border-stone-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: ShoppingBag,
                title: "Free Shipping",
                description: "On all orders over $50"
              },
              {
                icon: Clock,
                title: "30-Day Returns",
                description: "Hassle-free return policy"
              },
              {
                icon: Shield,
                title: "Secure Checkout",
                description: "100% protected payments"
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index, duration: 0.6 }}
                className="flex items-center justify-center gap-4 p-4"
              >
                <div className="rounded-full bg-amber-100 dark:bg-amber-900/30 p-3">
                  <item.icon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="font-medium text-stone-900 dark:text-stone-100">{item.title}</h3>
                  <p className="text-sm text-stone-600 dark:text-stone-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Limited Time Sale Section */}
      <section 
        ref={saleRef}
        className="py-16 bg-gradient-to-r from-amber-50 to-stone-50 dark:from-amber-950/40 dark:to-stone-900 overflow-hidden"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isSaleInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-block mb-4 px-4 py-1.5 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-full text-sm font-medium">
                Limited Time Offer
              </div>
              <h2 className="text-3xl sm:text-4xl font-playfair font-medium text-stone-900 dark:text-stone-100 mb-4">
                Season Ending <span className="text-red-600 dark:text-red-400">Sale</span>
              </h2>
              <p className="text-lg text-stone-600 dark:text-stone-400 mb-6">
                Enjoy up to 40% off on selected items from our latest collection. Don't miss out on these incredible deals.
              </p>
              
              <div className="grid grid-cols-4 gap-4 max-w-md mb-8">
                {[
                  { label: "Days", value: timeLeft.days },
                  { label: "Hours", value: timeLeft.hours },
                  { label: "Minutes", value: timeLeft.minutes },
                  { label: "Seconds", value: timeLeft.seconds }
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="bg-white dark:bg-stone-800 rounded-lg shadow-md p-3">
                      <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                        {String(item.value).padStart(2, '0')}
                      </div>
                      <div className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                        {item.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link to="/products?sale=true">
                <Button size="lg" className="rounded-full px-8 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600">
                  Shop the Sale
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isSaleInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={products[2].image}
                  alt="Sale promotion"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                  <div className="p-6 w-full">
                    <div className="inline-block px-3 py-1 bg-red-600 text-white text-sm font-bold rounded-full mb-2">
                      40% OFF
                    </div>
                    <h3 className="text-xl text-white font-medium mb-1">{products[2].name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-stone-300 line-through">${(products[2].price * 1.4).toFixed(2)}</span>
                      <span className="text-white font-bold">${products[2].price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating badge */}
              <motion.div
                className="absolute -top-4 -right-4 bg-amber-600 text-white rounded-full h-24 w-24 flex items-center justify-center shadow-lg"
                animate={{ 
                  rotate: [0, 10, 0, -10, 0],
                  scale: [1, 1.05, 1, 1.05, 1] 
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              >
                <div className="text-center">
                  <div className="text-xl font-bold">40%</div>
                  <div className="text-sm">OFF</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section 
        ref={categoryRef}
        className="py-20 bg-white dark:bg-stone-950"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isCategoryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl font-playfair font-medium text-stone-900 dark:text-stone-100 text-center mb-4"
          >
            Shop by Category
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isCategoryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-center text-stone-600 dark:text-stone-400 mb-12 max-w-2xl mx-auto"
          >
            Explore our carefully curated categories, designed to transform your living space into a haven of comfort and style.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isCategoryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {categories.map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={isCategoryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group relative"
              >
                <Link to={`/products?category=${category}`} className="block text-center">
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />
                    <img
                      src={products.find(p => p.category === category)?.image}
                      alt={category}
                      className="h-full w-full object-cover object-center transform transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white dark:bg-stone-900 bg-opacity-80 dark:bg-opacity-80 px-4 py-2 rounded-lg">
                        <span className="text-amber-600 dark:text-amber-400 font-medium">
                          Explore →
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-medium text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300">
                      {category}
                    </h3>
                    <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
                      {products.filter(p => p.category === category).length} products
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="py-16 bg-stone-50 dark:bg-stone-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <span className="text-sm font-medium text-amber-600 dark:text-amber-400">TRENDING NOW</span>
              </div>
              <h2 className="text-3xl font-playfair font-medium text-stone-900 dark:text-stone-100 mt-2">
                Popular This Week
              </h2>
            </div>
            <Link to="/products?sort=trending">
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group"
              >
                <Link to={`/products/${product.id}`}>
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-white dark:bg-stone-800 shadow-md group-hover:shadow-xl transition-all duration-300">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 right-3">
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        className="h-8 w-8 rounded-full bg-white dark:bg-stone-700 flex items-center justify-center shadow-md"
                      >
                        <Heart className="h-4 w-4 text-stone-500 dark:text-stone-400" />
                      </motion.div>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-start">
                      <span className="bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded-full mb-2">
                        Trending
                      </span>
                      <span className="text-sm">View Details →</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-stone-600 dark:text-stone-400">
                        ${product.price.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < 4 ? "fill-amber-400 text-amber-400" : "text-stone-300 dark:text-stone-600"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section 
        ref={featuredRef}
        className="py-20 bg-white dark:bg-stone-950 overflow-hidden"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-3xl font-playfair font-medium text-stone-900 dark:text-stone-100"
            >
              Featured Collection
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Link to="/products">
                <Button variant="outline">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ 
                  opacity: 0,
                  y: 50,
                  scale: 0.9,
                  rotateX: -15
                }}
                animate={isInView ? { 
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotateX: 0
                } : {
                  opacity: 0,
                  y: 50,
                  scale: 0.9,
                  rotateX: -15
                }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: [0.215, 0.610, 0.355, 1.000]
                }}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                <Link
                  to={`/products/${product.id}`}
                  className="group block perspective-1000"
                >
                  <div className="bg-white dark:bg-stone-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                    <div className="aspect-square overflow-hidden relative">
                      <motion.img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover object-center"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                      />
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ y: 20 }}
                        whileHover={{ y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Button size="sm" className="w-full bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600">
                          View Details
                        </Button>
                      </motion.div>
                    </div>
                    <motion.div 
                      className="p-4"
                      initial={{ y: 10, opacity: 0 }}
                      animate={isInView ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300">
                          {product.name}
                        </h3>
                        <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 text-xs font-bold px-2 py-1 rounded-full">
                          Featured
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
                        {product.category}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <p className="text-lg font-medium text-stone-900 dark:text-stone-100">
                          ${product.price.toFixed(2)}
                        </p>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(4 + Math.random()) ? "fill-amber-400 text-amber-400" : "text-stone-300 dark:text-stone-600"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Category List with Scroll Animation */}
      <section className="py-20 bg-stone-50 dark:bg-stone-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-playfair font-medium text-stone-900 dark:text-stone-100">
              Browse Categories
            </h2>
            <p className="mt-4 text-lg text-stone-600 dark:text-stone-400">
              Find exactly what you're looking for
            </p>
          </motion.div>

          <div className="space-y-32">
            {categories.map((category, index) => (
              <motion.div
                key={category}
                className="relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-medium text-stone-900 dark:text-stone-100">
                      {category}
                    </h3>
                  </div>
                  <Link
                    to={`/products?category=${category}`}
                    className="flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors duration-300"
                  >
                    View All
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="overflow-hidden">
                  <motion.div 
                    initial={{ x: 0 }}
                    animate={{ x: "-50%" }}
                    transition={{
                      duration: 30,
                      repeat: Infinity,
                      ease: "linear",
                      repeatType: "loop"
                    }}
                    className="flex gap-6"
                  >
                    {/* First set of products */}
                    <div className="flex gap-6">
                      {products
                        .filter(p => p.category === category)
                        .map((product, productIndex) => (
                          <motion.div
                            key={`${product.id}-1`}
                            className="group flex-shrink-0 w-[280px]"
                            whileHover={{ 
                              y: -5,
                              transition: { duration: 0.3 }
                            }}
                          >
                            <Link to={`/products/${product.id}`}>
                              <div className="relative aspect-square rounded-lg overflow-hidden bg-white dark:bg-stone-800 shadow-sm">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="h-full w-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <span className="text-white text-sm">View Details</span>
                                </div>
                              </div>
                              <div className="mt-3">
                                <h4 className="text-sm font-medium text-stone-900 dark:text-stone-100 truncate group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300">
                                  {product.name}
                                </h4>
                                <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
                                  ${product.price.toFixed(2)}
                                </p>
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                    </div>
                    {/* Duplicate set for seamless loop */}
                    <div className="flex gap-6">
                      {products
                        .filter(p => p.category === category)
                        .map((product, productIndex) => (
                          <motion.div
                            key={`${product.id}-2`}
                            className="group flex-shrink-0 w-[280px]"
                            whileHover={{ 
                              y: -5,
                              transition: { duration: 0.3 }
                            }}
                          >
                            <Link to={`/products/${product.id}`}>
                              <div className="relative aspect-square rounded-lg overflow-hidden bg-white dark:bg-stone-800 shadow-sm">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="h-full w-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <span className="text-white text-sm">View Details</span>
                                </div>
                              </div>
                              <div className="mt-3">
                                <h4 className="text-sm font-medium text-stone-900 dark:text-stone-100 truncate group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300">
                                  {product.name}
                                </h4>
                                <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
                                  ${product.price.toFixed(2)}
                                </p>
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section 
        ref={newsletterRef}
        className="py-20 bg-white dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isNewsletterInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Mail className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <span className="text-sm font-medium text-amber-600 dark:text-amber-400">STAY UPDATED</span>
              </div>
              <h2 className="text-3xl font-playfair font-medium text-stone-900 dark:text-stone-100 mb-4">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-stone-600 dark:text-stone-400 mb-8 max-w-md">
                Be the first to know about new collections, special offers, and exclusive events. Join our community today.
              </p>
              
              <div className="max-w-md">
                <AnimatePresence mode="wait">
                  {subscribed ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4 text-green-800 dark:text-green-300 flex items-start gap-3"
                    >
                      <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="h-4 w-4 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Thank you for subscribing!</p>
                        <p className="text-sm mt-1">You've been added to our newsletter and will receive updates on new collections and promotions.</p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={handleNewsletterSubmit}
                      className="flex flex-col sm:flex-row gap-3"
                    >
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email address"
                        className="flex-1 px-4 py-3 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400"
                        required
                      />
                      <Button 
                        type="submit"
                        className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white px-6 py-3"
                      >
                        Subscribe
                      </Button>
                    </motion.form>
                  )}
                </AnimatePresence>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-3">
                  By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isNewsletterInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={products[6].image}
                  alt="Newsletter signup"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                  <div className="bg-white/90 dark:bg-stone-900/90 backdrop-blur-sm rounded-lg p-6 max-w-sm">
                    <div className="text-sm text-amber-600 dark:text-amber-400 font-medium mb-2">EXCLUSIVE BENEFITS</div>
                    <h3 className="text-xl font-medium text-stone-900 dark:text-stone-100 mb-2">Join Our Community</h3>
                    <ul className="space-y-2 mb-4">
                      {[
                        "Early access to new collections",
                        "Exclusive subscriber-only discounts",
                        "Free shipping on your first order", 
                        "Design inspiration and tips"
                      ].map((benefit, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-stone-700 dark:text-stone-300">
                          <div className="h-4 w-4 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-amber-600 dark:bg-amber-400"></div>
                          </div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section 
        ref={testimonialRef}
        className="py-24 bg-gradient-to-b from-stone-50 to-amber-50 dark:from-stone-900 dark:to-stone-950"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isTestimonialInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-full text-sm font-medium mb-4">
              Customer Love
            </div>
            <h2 className="text-3xl font-playfair font-medium text-stone-900 dark:text-stone-100">
              What Our Customers Say
            </h2>
            <p className="mt-4 text-lg text-stone-600 dark:text-stone-400 max-w-xl mx-auto">
              Discover why people love our products and what makes the Daily Touch experience special
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Interior Designer",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
                quote: "The quality of their products has transformed how I approach home design. Each piece tells a story.",
                rating: 5
              },
              {
                name: "Michael Chen",
                role: "Home Chef",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
                quote: "Their kitchen collection has elevated my cooking experience. The attention to detail is remarkable.",
                rating: 5
              },
              {
                name: "Emma Davis",
                role: "Artist",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
                quote: "The lighting solutions have created the perfect ambiance for my studio. Absolutely stunning!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isTestimonialInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-white dark:bg-stone-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={isTestimonialInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
                  transition={{ delay: 0.5 + index * 0.2 }}
                  className="relative"
                >
                  <Quote className="absolute -top-2 -left-2 h-8 w-8 text-amber-200 dark:text-amber-700 opacity-50" />
                  <div className="pt-8">
                    <p className="text-stone-700 dark:text-stone-300 italic relative z-10">
                      "{testimonial.quote}"
                    </p>
                  </div>
                </motion.div>

                <div className="mt-6 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-900 dark:text-stone-100">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-stone-600 dark:text-stone-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isTestimonialInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <Link to="/products">
              <Button size="lg" variant="outline" className="rounded-full">
                Browse All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Gift Section */}
      <section className="py-16 bg-white dark:bg-stone-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Gift className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <span className="text-sm font-medium text-amber-600 dark:text-amber-400">PERFECT GIFTS</span>
              </div>
              <h2 className="text-3xl font-playfair font-medium text-stone-900 dark:text-stone-100 mb-4">
                Find the Perfect Gift
              </h2>
              <p className="text-stone-600 dark:text-stone-400 mb-6">
                Discover thoughtfully curated items perfect for every occasion. From housewarmings to anniversaries, we've got you covered.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  "Birthdays",
                  "Anniversaries",
                  "Housewarmings",
                  "Weddings"
                ].map((occasion) => (
                  <div key={occasion} className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-amber-600 dark:bg-amber-400"></div>
                    </div>
                    <span className="text-stone-700 dark:text-stone-300">{occasion}</span>
                  </div>
                ))}
              </div>
              
              <Link to="/products?category=gifts">
                <Button className="rounded-full px-8 bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600">
                  Shop Gifts
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {featuredProducts.slice(0, 4).map((product, index) => (
                <motion.div
                  key={product.id}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                  className="relative aspect-square rounded-lg overflow-hidden"
                >
                  <Link to={`/products/${product.id}`}>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="text-white text-sm font-medium truncate">{product.name}</div>
                        <div className="text-white/80 text-xs">${product.price.toFixed(2)}</div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}