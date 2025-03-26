import { motion } from 'framer-motion';
import { products } from '@/data/products';
import { Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { Search, SlidersHorizontal } from 'lucide-react';

type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

export function Products() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category));
    return ['all', ...Array.from(cats)];
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.description.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'name-asc':
            return a.name.localeCompare(b.name);
          case 'name-desc':
            return b.name.localeCompare(a.name);
          default:
            return 0;
        }
      });
  }, [search, sortBy, selectedCategory]);

  // Animation variants for staggered list
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-playfair font-medium text-stone-800 dark:text-stone-100">
          Our Products
        </h1>
        
        <div className="flex flex-col sm:flex-row gap-4 md:w-auto w-full">
          <div className="relative flex-1 sm:max-w-xs">
            <Input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
          </div>
          
          <div className="flex gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="name-asc">Name: A to Z</SelectItem>
                <SelectItem value="name-desc">Name: Z to A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Filters summary */}
      {(search || selectedCategory !== 'all') && (
        <div className="flex flex-wrap gap-2 mb-6">
          {search && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Search: {search}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => setSearch('')}
              >
                ×
              </Button>
            </Badge>
          )}
          {selectedCategory !== 'all' && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Category: {selectedCategory}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => setSelectedCategory('all')}
              >
                ×
              </Button>
            </Badge>
          )}
        </div>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {filteredProducts.map((product) => (
          <motion.div key={product.id} variants={itemVariants}>
            <Link
              to={`/products/${product.id}`}
              className="group block"
            >
              <div className="bg-white dark:bg-stone-900 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center transform transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="text-lg font-medium text-stone-800 dark:text-stone-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300">
                      {product.name}
                    </h2>
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-medium text-amber-600 dark:text-amber-400">
                      ${product.price.toFixed(2)}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-stone-500 dark:text-stone-400">
                        {product.stock > 5 ? 'In Stock' : 
                         product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                      </span>
                      <div className={`h-2 w-2 rounded-full ${
                        product.stock > 5 ? 'bg-green-500' : 
                        product.stock > 0 ? 'bg-amber-500' : 'bg-red-500'
                      }`} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {filteredProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <p className="text-lg text-stone-600 dark:text-stone-400">
            No products found matching your criteria
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearch('');
              setSelectedCategory('all');
              setSortBy('name-asc');
            }}
          >
            Reset Filters
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
} 