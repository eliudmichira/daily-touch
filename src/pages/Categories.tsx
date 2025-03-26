import React from 'react';
import { products } from '../data/products';
import { ProductCard } from '@/components/ProductCard';
import { motion } from 'framer-motion';

export function Categories() {
  // Group products by category
  const productsByCategory = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, typeof products>);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-stone-800 dark:text-amber-100 mb-8"
      >
        Shop by Category
      </motion.h1>

      <div className="space-y-12">
        {Object.entries(productsByCategory).map(([category, categoryProducts], index) => (
          <motion.section
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-stone-700 dark:text-amber-200">
              {category}
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
} 