import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { products } from '@/data/products';
import { ProductList } from '@/components/ProductList';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q')?.toLowerCase() || '';
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if (!query) {
      navigate('/products');
      return;
    }

    // Check for exact product match first
    const exactMatch = products.find(
      product => product.name.toLowerCase() === query
    );

    if (exactMatch) {
      navigate(`/products/${exactMatch.id}`);
      return;
    }

    // Filter products based on search query
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );

    setFilteredProducts(filtered);
  }, [query, navigate]);

  if (!query) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button
          variant="ghost"
          size="sm"
          className="mb-4"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-2xl font-playfair font-medium text-stone-800 dark:text-stone-200">
            Search Results for "{query}"
          </h1>
          <p className="mt-2 text-stone-600 dark:text-stone-400">
            Found {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
        </motion.div>
      </div>

      {filteredProducts.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <ProductList products={filteredProducts} />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center py-12"
        >
          <h2 className="text-xl font-medium text-stone-800 dark:text-stone-200 mb-2">
            No products found
          </h2>
          <p className="text-stone-600 dark:text-stone-400 mb-6">
            Try adjusting your search terms or browse our categories
          </p>
          <Button
            onClick={() => navigate('/products')}
            className="bg-amber-300 text-stone-900 hover:bg-amber-400"
          >
            Browse All Products
          </Button>
        </motion.div>
      )}
    </div>
  );
} 