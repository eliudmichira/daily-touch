import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description: string;
}

const categories: Category[] = [
  {
    id: 'kitchen',
    name: 'Kitchen Items',
    description: 'Modern kitchen utensils and appliances'
  },
  {
    id: 'stationary',
    name: 'Stationaries',
    description: 'Premium writing and desk accessories'
  },
  {
    id: 'lighting',
    name: 'Light Shop',
    description: 'Modern and classic lighting solutions'
  },
  {
    id: 'clayworks',
    name: 'Clay Works',
    description: 'Handcrafted ceramic and pottery items'
  }
];

interface DropdownMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DropdownMenu({ isOpen, onClose }: DropdownMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1]
            }}
            onClick={onClose}
            className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40"
          />
          
          {/* Dropdown panel */}
          <motion.div
            initial={{ opacity: 0, x: "-100%", scale: 0.98 }}
            animate={{ 
              opacity: 1, 
              x: 0, 
              scale: 1,
              transition: {
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
                opacity: { 
                  duration: 0.4,
                  ease: "easeOut" 
                },
                scale: { 
                  duration: 0.5,
                  ease: [0.34, 1.56, 0.64, 1]
                }
              }
            }}
            exit={{ 
              opacity: 0, 
              x: "-100%", 
              scale: 0.98,
              transition: {
                duration: 0.4,
                ease: [0.32, 0, 0.67, 0],
                opacity: { 
                  duration: 0.25,
                  ease: "easeInOut"
                }
              }
            }}
            className="fixed top-0 left-0 h-screen w-[300px] bg-background/30 backdrop-blur-2xl border-r border-white/20 shadow-2xl z-50 overflow-y-auto"
          >
            <div className="h-16 sm:h-20 border-b border-white/10 flex items-center px-6 bg-background/20">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { 
                    delay: 0.2,
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1]
                  }
                }}
                className="text-xl font-playfair font-semibold text-foreground"
              >
                Categories
              </motion.h2>
            </div>
            <div className="p-6">
              <div className="divide-y divide-white/10">
                {categories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      transition: { 
                        delay: 0.3 + index * 0.07,
                        duration: 0.4,
                        ease: [0.16, 1, 0.3, 1]
                      }
                    }}
                    className="py-2 first:pt-0 last:pb-0"
                  >
                    <Link
                      to={`/products?category=${category.name}`}
                      onClick={onClose}
                      className="group flex items-center justify-between w-full p-3 rounded-lg hover:bg-white/10 transition-all duration-300 hover:pl-4"
                    >
                      <div>
                        <h3 className="font-medium text-foreground group-hover:text-foreground/90 transition-colors duration-300">
                          {category.name}
                        </h3>
                        <p className="text-sm text-foreground/70 group-hover:text-foreground/80 transition-colors duration-300">
                          {category.description}
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-foreground/60 group-hover:text-foreground/90 transition-all duration-300 group-hover:translate-x-1" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
