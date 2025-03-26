import React from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import { ProductCard } from '@/components/ProductCard';
import { motion } from 'framer-motion';

export function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  
  // Convert URL-friendly category back to original format
  const formattedCategory = category
    ?.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Filter products by category
  const categoryProducts = products.filter(
    product => product.category.toLowerCase() === category?.toLowerCase()
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* Category Header */}
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-playfair font-bold text-foreground mb-4"
          >
            {formattedCategory}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-stone-600 dark:text-stone-400"
          >
            {categoryProducts.length} products found
          </motion.p>
        </div>

        {/* Products Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {categoryProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {categoryProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-lg text-stone-600 dark:text-stone-400">
              No products found in this category.
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
} 