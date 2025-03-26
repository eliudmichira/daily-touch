import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ScrollingImages from "@/components/ScrollingImages";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { 
  getFeaturedProducts, 
  products, 
  categories, 
  collections, 
  testimonials,
  Collection,
  Testimonial
} from "@/data/products";

const Index = () => {
  const navigate = useNavigate();
  const featuredProducts = getFeaturedProducts();

  const handleCategoryClick = (categoryId: string, categoryName: string) => {
    toast({
      title: `Exploring ${categoryName}`,
      description: "Browsing our curated collection",
      duration: 3000,
    });
    
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950 flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        
        {/* Featured Products section */}
        <section aria-labelledby="featured-heading" className="py-12 md:py-16 bg-white dark:bg-stone-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 id="featured-heading" className="text-xl md:text-2xl font-playfair text-stone-900 dark:text-stone-100">Featured Products</h2>
              <button 
                onClick={() => navigate('/products?featured=true')}
                className="text-sm text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 hover:underline font-medium"
              >
                View all
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {featuredProducts.slice(0, 3).map((product) => (
                <Card 
                  key={product.id} 
                  className="overflow-hidden group cursor-pointer border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md transition-shadow dark:bg-stone-800"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <div className="h-64 overflow-hidden relative">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {product.featured && (
                      <Badge className="absolute top-3 left-3 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border border-amber-200 dark:border-amber-800">Featured</Badge>
                    )}
                    {product.onSale && (
                      <Badge className="absolute top-3 left-3 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-800">Sale</Badge>
                    )}
                    {product.newArrival && (
                      <Badge className="absolute top-3 left-3 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">New</Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-medium text-stone-900 dark:text-stone-100 mt-2">{product.name}</h3>
                    <p className="text-sm text-stone-600 dark:text-stone-400 mt-1 line-clamp-2">{product.description}</p>
                    <div className="flex items-center mt-2">
                      <p className="text-lg font-medium text-stone-900 dark:text-stone-100">${product.price.toFixed(2)}</p>
                      <div className="ml-auto flex items-center">
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        <span className="text-sm font-medium ml-1 text-stone-700 dark:text-stone-300">{product.rating}</span>
                        <span className="text-xs text-stone-500 dark:text-stone-500 ml-1">({product.reviewCount})</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Popular right now section */}
        <section aria-labelledby="trending-heading" className="py-12 md:py-16 bg-stone-50 dark:bg-stone-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 id="trending-heading" className="text-xl md:text-2xl font-playfair text-stone-900 dark:text-stone-100">Popular Categories</h2>
              <button 
                onClick={() => navigate('/categories')}
                className="text-sm text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 hover:underline font-medium"
              >
                See all
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {categories.filter(cat => cat.featured).map((category) => (
                <div 
                  key={category.id}
                  className="flex flex-col items-center cursor-pointer group"
                  onClick={() => handleCategoryClick(category.id, category.name)}
                >
                  <div className="w-full aspect-square rounded-full overflow-hidden bg-white dark:bg-stone-800 flex items-center justify-center mb-3 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors shadow-md">
                    <div className="w-full h-full overflow-hidden rounded-full relative">
                      <img 
                        src={category.image} 
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-center text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">{category.name}</span>
                  <span className="text-xs text-stone-500 dark:text-stone-500">{category.productCount} products</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section aria-labelledby="collection-heading" className="py-12 md:py-16 bg-white dark:bg-stone-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 id="collection-heading" className="text-2xl md:text-3xl font-playfair text-stone-900 dark:text-stone-100 mb-4">Our Collection</h2>
              <p className="text-stone-600 dark:text-stone-400 max-w-2xl mx-auto text-sm md:text-base">
                Explore our carefully selected products designed to elevate your daily life with thoughtful design and craftsmanship.
              </p>
            </div>
            
            <Separator className="mb-12 bg-stone-200 dark:bg-stone-800" />
          </div>
          
          <div className="mb-8">
            <ScrollingImages direction="left" speed={40} category="Kitchen Appliances" />
          </div>
          <div className="mb-8">
            <ScrollingImages direction="right" speed={35} category="Home Decor" />
          </div>
          <div className="mb-16">
            <ScrollingImages direction="left" speed={30} category="Stationery" />
          </div>
          
          {/* Additional category */}
          <div className="mb-16">
            <ScrollingImages direction="right" speed={38} category="Light Appliances" />
          </div>
        </section>
        
        {/* Featured collections section */}
        <section className="py-12 md:py-16 bg-stone-50 dark:bg-stone-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-playfair text-stone-900 dark:text-stone-100 mb-8">Curated by Daily Touch</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {collections.slice(0, 3).map((collection: Collection, index: number) => (
                <Card 
                  key={index} 
                  className="overflow-hidden group cursor-pointer border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md transition-shadow dark:bg-stone-800"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={collection.image} 
                      alt={collection.name} 
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <Badge className="mb-2 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                      {collection.featured ? "Featured" : "Collection"}
                    </Badge>
                    <h3 className="text-lg font-playfair mt-2 text-stone-900 dark:text-stone-100">{collection.name}</h3>
                    <p className="text-sm text-stone-600 dark:text-stone-400">{collection.description}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-stone-500 dark:text-stone-500">{collection.productCount} products</span>
                      <Button 
                        variant="link" 
                        className="p-0 text-amber-600 dark:text-amber-400 font-medium flex items-center group hover:text-amber-800 dark:hover:text-amber-300"
                        onClick={() => navigate(`/collection/${collection.id}`)}
                      >
                        Shop Collection
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials section */}
        <section className="py-12 md:py-16 bg-amber-50 dark:bg-amber-950/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-playfair text-stone-900 dark:text-stone-100 mb-8 text-center">What Our Customers Say</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.slice(0, 2).map((testimonial: Testimonial) => (
                <Card 
                  key={testimonial.id} 
                  className="p-6 border-stone-200 dark:border-stone-800 shadow-md hover:shadow-lg transition-shadow dark:bg-stone-900"
                >
                  <div className="flex items-start">
                    {testimonial.image && (
                      <div className="mr-4 flex-shrink-0">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <div className="flex items-center mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < testimonial.rating ? 'text-amber-500 fill-amber-500' : 'text-stone-300 dark:text-stone-700'}`} 
                          />
                        ))}
                      </div>
                      <p className="text-stone-700 dark:text-stone-300 italic mb-4">"{testimonial.content}"</p>
                      <div>
                        <p className="font-medium text-stone-900 dark:text-stone-100">{testimonial.name}</p>
                        <p className="text-sm text-stone-500 dark:text-stone-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <section aria-labelledby="philosophy-heading" className="py-16 bg-stone-100 dark:bg-stone-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                  alt="About Daily Touch" 
                  className="rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>
              <div>
                <Badge className="mb-4 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border border-amber-200 dark:border-amber-800">Our Story</Badge>
                <h2 id="philosophy-heading" className="text-3xl font-playfair text-stone-900 dark:text-stone-100 mb-4">Our Philosophy</h2>
                <p className="text-stone-600 dark:text-stone-400 mb-6">
                  At Daily Touch, we believe in the beauty of everyday objects. Our collection is carefully curated to bring quality design into your daily life, making ordinary moments extraordinary.
                </p>
                <p className="text-stone-600 dark:text-stone-400">
                  Each item we select represents our commitment to craftsmanship, sustainability, and timeless design. We partner with artisans and designers who share our values in creating products that are both beautiful and functional.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;