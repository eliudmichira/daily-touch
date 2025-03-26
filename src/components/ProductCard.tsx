import React from 'react';
import { Product } from "../data/products";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { useToast } from "@/components/ui/use-toast";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the add to cart button
    addItem(product, 1);
    toast({
      title: "Added to cart",
      description: `${product.name} added to your cart`,
      duration: 3000,
    });
  };

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-background rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="relative aspect-w-1 aspect-h-1 w-full overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center transform transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Stock badges */}
          {product.stock <= 5 && product.stock > 0 && (
            <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Only {product.stock} left!
            </div>
          )}
          {product.stock === 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Out of Stock
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="px-2 py-1 bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300 rounded-full text-xs">
              {product.category}
            </span>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-sm ${
                    i < Math.floor(product.rating)
                      ? "text-amber-400"
                      : "text-stone-300 dark:text-stone-600"
                  }`}
                >
                  ★
                </span>
              ))}
              <span className="ml-1 text-xs text-stone-600 dark:text-stone-400">
                ({product.rating})
              </span>
            </div>
          </div>
          
          <h3 className="text-lg font-medium text-stone-800 dark:text-amber-100 mb-1 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
            {product.name}
          </h3>
          
          <p className="text-sm text-stone-600 dark:text-stone-400 line-clamp-2 mb-3">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-amber-700 dark:text-amber-300">
              ${product.price.toFixed(2)}
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                ${
                  product.stock > 0
                    ? "bg-amber-300 text-stone-900 hover:bg-amber-400"
                    : "bg-stone-600 text-stone-300 cursor-not-allowed"
                }`}
              disabled={product.stock === 0}
              onClick={handleAddToCart}
            >
              {product.stock > 0 ? "Add to Cart" : "Sold Out"}
            </motion.button>
          </div>
        </div>
      </div>
    </Link>
  );
} 