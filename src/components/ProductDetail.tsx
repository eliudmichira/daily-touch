import { useEffect, useState } from "react";
import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingBag, Heart, Share2, ChevronLeft, ChevronRight, Truck, Shield, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { products } from "@/data/products";
import { useCartStore } from "@/store/cartStore";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  // Get similar products (same category, excluding current product)
  const similarProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Mock additional images (in a real app, these would come from the product data)
  const productImages = [
    product.image,
    product.image.replace('.jpg', '-2.jpg'),
    product.image.replace('.jpg', '-3.jpg'),
    product.image.replace('.jpg', '-4.jpg'),
  ];

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast({
      title: "Added to cart",
      description: `${quantity} ${quantity === 1 ? 'unit' : 'units'} of ${product.name} added to your cart`,
      duration: 3000,
    });
  };

  const handleAddToWishlist = () => {
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist`,
      duration: 3000,
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Product link has been copied to clipboard",
      duration: 3000,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        {/* Product Images */}
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="aspect-square w-full overflow-hidden rounded-lg bg-stone-100 dark:bg-stone-800 relative group"
          >
            <img
              src={productImages[selectedImage]}
              alt={product.name}
              className="h-full w-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
            />
            {selectedImage > 0 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white dark:bg-black/80 dark:hover:bg-black"
                onClick={() => setSelectedImage(prev => prev - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            )}
            {selectedImage < productImages.length - 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white dark:bg-black/80 dark:hover:bg-black"
                onClick={() => setSelectedImage(prev => prev + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </motion.div>
          
          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 gap-4">
            {productImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`aspect-square rounded-md overflow-hidden bg-stone-100 dark:bg-stone-800 transition-all duration-200 ${
                  selectedImage === idx ? 'ring-2 ring-amber-500' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} view ${idx + 1}`}
                  className="h-full w-full object-cover object-center"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0"
        >
          <Badge className="mb-4 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100">
            {product.category}
          </Badge>
          
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-playfair font-medium text-stone-800 dark:text-stone-100">
              {product.name}
            </h1>
            <Button
              variant="ghost"
              size="icon"
              className="text-stone-600 hover:text-amber-600 dark:text-stone-400 dark:hover:text-amber-400"
              onClick={handleShare}
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          <div className="mt-6">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl font-medium text-amber-600 dark:text-amber-400">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <Tabs defaultValue="description" className="mt-6">
            <TabsList className="w-full">
              <TabsTrigger value="description" className="flex-1">Description</TabsTrigger>
              <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
              <TabsTrigger value="shipping" className="flex-1">Shipping</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4">
              <div className="space-y-4 text-base text-stone-600 dark:text-stone-400">
                <p>{product.description}</p>
              </div>
            </TabsContent>
            <TabsContent value="details" className="mt-4">
              <ul className="space-y-2 text-stone-600 dark:text-stone-400">
                <li>• Premium quality materials</li>
                <li>• Handcrafted with care</li>
                <li>• Unique design</li>
                <li>• Easy maintenance</li>
              </ul>
            </TabsContent>
            <TabsContent value="shipping" className="mt-4">
              <div className="space-y-4 text-stone-600 dark:text-stone-400">
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-amber-500" />
                  <p>Free shipping on orders over $50</p>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-amber-500" />
                  <p>30-day money-back guarantee</p>
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-amber-500" />
                  <p>Easy returns within 14 days</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-8">
            <div className="flex items-center space-x-4">
              <div className={`h-3 w-3 rounded-full ${
                product.stock > 5 ? 'bg-green-500' : 
                product.stock > 0 ? 'bg-amber-500' : 'bg-red-500'
              }`} />
              <span className="text-stone-600 dark:text-stone-400">
                {product.stock > 5 ? 'In Stock' : 
                 product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
              </span>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            {/* Quantity Selector */}
            {product.stock > 0 && (
              <div className="flex items-center space-x-4">
                <label className="text-sm text-stone-600 dark:text-stone-400">Quantity:</label>
                <div className="flex items-center border border-stone-200 dark:border-stone-700 rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </Button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col space-y-4">
              <Button
                size="lg"
                className="w-full bg-amber-300 text-stone-900 hover:bg-amber-400"
                disabled={product.stock === 0}
                onClick={handleAddToCart}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full border-amber-200 text-stone-700 hover:bg-amber-50 dark:border-amber-800 dark:text-stone-300 dark:hover:bg-amber-900/30"
                onClick={handleAddToWishlist}
              >
                <Heart className="mr-2 h-5 w-5" />
                Add to Wishlist
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Similar Products */}
      <AnimatePresence>
        {similarProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 border-t border-stone-200 dark:border-stone-700 pt-8"
          >
            <h2 className="text-2xl font-playfair font-medium text-stone-800 dark:text-stone-200 mb-6">
              Similar Products
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {similarProducts.map((similarProduct) => (
                <Link
                  key={similarProduct.id}
                  to={`/products/${similarProduct.id}`}
                  className="group"
                >
                  <div className="aspect-square rounded-lg overflow-hidden bg-stone-100 dark:bg-stone-800">
                    <img
                      src={similarProduct.image}
                      alt={similarProduct.name}
                      className="h-full w-full object-cover object-center transform transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-3">
                    <h3 className="text-sm font-medium text-stone-800 dark:text-stone-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 line-clamp-2">
                      {similarProduct.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-amber-600 dark:text-amber-400">
                      ${similarProduct.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 