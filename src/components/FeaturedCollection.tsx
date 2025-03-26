import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const categories = [
  {
    id: 'kitchen',
    name: 'Kitchen Items',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80',
    description: 'Elegant and functional kitchen essentials'
  },
  {
    id: 'stationery',
    name: 'Stationery',
    image: 'https://images.unsplash.com/photo-1583075773515-8482c2231111?auto=format&fit=crop&q=80',
    description: 'Premium writing and desk accessories'
  },
  {
    id: 'lighting',
    name: 'Light Shop',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80',
    description: 'Modern and artistic lighting solutions'
  },
  {
    id: 'clayworks',
    name: 'Clay Works',
    image: 'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&q=80',
    description: 'Handcrafted ceramic pieces'
  }
];

export function FeaturedCollection() {
  return (
    <section className="mt-16">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-2xl font-playfair font-medium text-foreground">
          Featured Collection
        </h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col items-center text-center group relative"
          >
            <Link 
              to={`/products?category=${category.id}`} 
              className="group relative flex flex-col items-center w-full"
            >
              <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden mb-6 bg-stone-50 dark:bg-stone-900/50 ring-2 ring-stone-200/50 dark:ring-stone-700/50">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
              
              <motion.div 
                className="text-center w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors duration-300 mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground max-w-[200px] mx-auto">
                  {category.description}
                </p>
              </motion.div>
            </Link>

            {/* Vertical separator line for all except last in row */}
            {index % 4 !== 3 && (
              <div className="hidden md:block absolute right-0 top-[20%] h-[60%] w-px bg-stone-200 dark:bg-stone-700" />
            )}
            
            {/* Horizontal separator line for mobile */}
            {index % 2 !== 1 && index !== categories.length - 1 && (
              <div className="md:hidden absolute right-0 top-1/2 h-px w-8 bg-stone-200 dark:bg-stone-700" />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
} 