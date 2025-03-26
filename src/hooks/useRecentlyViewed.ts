import { useState, useEffect } from 'react';
import { Product } from '@/data/products';

const STORAGE_KEY = 'recently-viewed-products';
const MAX_RECENT_PRODUCTS = 4;

export function useRecentlyViewed() {
  const [recentProducts, setRecentProducts] = useState<Product[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recentProducts));
  }, [recentProducts]);

  const addProduct = (product: Product) => {
    setRecentProducts(prev => {
      // Remove the product if it's already in the list
      const filtered = prev.filter(p => p.id !== product.id);
      
      // Add the new product at the beginning and limit the list size
      return [product, ...filtered].slice(0, MAX_RECENT_PRODUCTS);
    });
  };

  return {
    recentProducts,
    addProduct
  };
} 