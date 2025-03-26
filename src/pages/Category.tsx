import React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Star, Heart } from "lucide-react";
import { motion } from 'framer-motion';

// Components
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

// Data
import { products } from '@/data/products';

export function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  
  // Get the category name in a better format
  const categoryName = category 
    ? category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : 'All Products';
  
  // Filter products by category
  const categoryProducts = category 
    ? products.filter(product => product.category.toLowerCase().replace(/\s+/g, '-') === category)
    : products;
  
  const handleAddToFavorites = (e: React.MouseEvent, productName: string) => {
    e.stopPropagation();
    toast({
      title: "Added to Wishlist",
      description: `${productName} has been added to your wishlist`,
      duration: 3000,
    });
  };
  
  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };
  
  // Get a featured image for the category (first product in the category)
  const categoryImage = categoryProducts.length > 0 
    ? categoryProducts[0].image 
    : "https://images.unsplash.com/photo-1600014896066-48005593e447?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950 flex flex-col">
      <main className="flex-grow pt-6 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate(-1)}
              className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          </div>
          
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative h-40 sm:h-60 md:h-80 mb-8 rounded-xl overflow-hidden shadow-md"
          >
            <img 
              src={categoryImage} 
              alt={categoryName} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
              <h1 className="text-2xl md:text-4xl font-playfair mb-2">{categoryName}</h1>
              <p className="text-sm md:text-base">{categoryProducts.length} products</p>
            </div>
          </motion.div>
          
          <Separator className="mb-8 bg-stone-200 dark:bg-stone-800" />
          
          {/* Filters and Sort */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap justify-between items-center mb-6"
          >
            <div className="flex space-x-2 mb-4 sm:mb-0 overflow-x-auto pb-2">
              <Button variant="outline" size="sm" className="bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/30">All</Button>
              <Button variant="outline" size="sm">New</Button>
              <Button variant="outline" size="sm">Featured</Button>
              <Button variant="outline" size="sm">Bestsellers</Button>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-stone-500 dark:text-stone-400">Sort by:</span>
              <select className="text-sm border rounded-md p-1 bg-white dark:bg-stone-800 border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-amber-500">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
                <option>Rating</option>
              </select>
            </div>
          </motion.div>
          
          {/* Products Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {categoryProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
              >
                <Card 
                  className="overflow-hidden group cursor-pointer border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md transition-shadow dark:bg-stone-900"
                  onClick={() => handleProductClick(product.id)}
                >
                  <div className="aspect-square relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.featured && (
                      <Badge className="absolute top-2 left-2 font-medium text-xs bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                        Featured
                      </Badge>
                    )}
                    {product.onSale && (
                      <Badge className="absolute top-2 left-2 font-medium text-xs bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-800">
                        Sale
                      </Badge>
                    )}
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="absolute top-2 right-2 bg-white/90 hover:bg-white dark:bg-stone-800/90 dark:hover:bg-stone-800 dark:text-white rounded-full h-8 w-8 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      onClick={(e) => handleAddToFavorites(e, product.name)}
                    >
                      <Heart className="h-4 w-4" />
                      <span className="sr-only">Add to wishlist</span>
                    </Button>
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium text-sm line-clamp-1 text-stone-900 dark:text-stone-100">{product.name}</h3>
                    <div className="flex items-center justify-between mt-1">
                      <p className="font-medium text-sm text-stone-900 dark:text-stone-100">${product.price.toFixed(2)}</p>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                        <span className="text-xs ml-1 text-stone-600 dark:text-stone-400">
                          {(4 + Math.random()).toFixed(1).substring(0, 3)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Load More Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10 text-center"
          >
            <Button 
              variant="outline" 
              className="border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20 text-amber-800 dark:text-amber-300"
              onClick={() => toast({
                title: "Loading more products",
                description: "Additional products would load here",
                duration: 2000,
              })}
            >
              Load More
            </Button>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default CategoryPage;