
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    toast({
      title: "Shop Now Clicked",
      description: "Navigating to our featured collection...",
      duration: 3000,
    });
    
    // Simulate loading and then navigate
    setTimeout(() => {
      navigate("/category/kitchen");
    }, 800);
  };

  return (
    <section className="pt-8 pb-16 md:py-20 overflow-hidden" aria-labelledby="hero-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 md:order-1 animate-fade-in">
            <Badge className="mb-4 bg-[#FEF7CD] text-[#89662B] hover:bg-[#FEF7CD]/90">Handpicked Collection</Badge>
            <h1 
              id="hero-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-tight mb-6 etsy-title"
            >
              Discover a World of Unique Treasures
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Carefully curated collection of handmade utensils, stationery, and lighting. Elevate your space with our thoughtfully designed pieces.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={handleShopNow}
                className="group px-6 py-6 md:py-3 text-base rounded-full bg-black text-white hover:bg-gray-800 transition-all etsy-button"
                aria-label="Shop now"
              >
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                onClick={() => navigate("/category/all")}
                variant="outline" 
                className="px-6 py-6 md:py-3 text-base rounded-full border-black text-black hover:bg-gray-100 transition-all etsy-button"
              >
                View All
              </Button>
            </div>
            
            <div className="mt-8 flex items-center text-sm text-gray-500">
              <span className="inline-block w-4 h-4 bg-[#FDE1D3] rounded-full mr-2"></span>
              Free shipping on orders over $50
              <span className="mx-3">•</span>
              <span className="inline-block w-4 h-4 bg-[#D3E4FD] rounded-full mr-2"></span>
              Handcrafted with love
            </div>
          </div>
          <div className="order-1 md:order-2 animate-slide-in">
            <div className="relative">
              <div className="absolute inset-0 -m-8 rounded-full bg-[#F1F0FB] -z-10"></div>
              <picture>
                <source 
                  media="(max-width: 640px)" 
                  srcSet="https://images.unsplash.com/photo-1605812860427-4024433a70fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                />
                <source 
                  media="(max-width: 1024px)" 
                  srcSet="https://images.unsplash.com/photo-1605812860427-4024433a70fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                />
                <img
                  src="https://images.unsplash.com/photo-1605812860427-4024433a70fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                  alt="Daily Touch Collection"
                  className="rounded-lg shadow-xl w-full h-auto object-cover"
                  loading="eager"
                />
              </picture>
              <div className="absolute -bottom-8 -left-8 hidden md:block">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
                    alt="Wooden Utensils"
                    className="w-40 h-40 object-cover rounded-md shadow-xl"
                    loading="lazy"
                  />
                  <Badge className="absolute top-2 left-2 bg-white text-black hover:bg-white/90">
                    New
                  </Badge>
                </div>
              </div>
              <div className="absolute -top-10 right-10 hidden md:block">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
                    alt="Wall Mirror"
                    className="w-28 h-28 object-cover rounded-md shadow-xl"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="absolute -right-4 bottom-16 hidden md:block">
                <Badge className="px-4 py-2 bg-white shadow-md text-black font-medium hover:bg-white/90">
                  20% OFF
                </Badge>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick category access */}
        <div className="mt-16 hidden md:block">
          <div className="flex items-center justify-center space-x-8">
            {[
              { name: "Kitchen", icon: "🍽️" },
              { name: "Home Decor", icon: "🏠" },
              { name: "Lighting", icon: "💡" },
              { name: "Stationery", icon: "✏️" },
              { name: "Gifts", icon: "🎁" }
            ].map((item) => (
              <div 
                key={item.name}
                onClick={() => navigate(`/category/${item.name.toLowerCase().replace(/\s+/g, '-')}`)}
                className="flex flex-col items-center cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center mb-2 group-hover:bg-[#F1F0FB] transition-colors">
                  <span className="text-xl">{item.icon}</span>
                </div>
                <span className="text-xs font-medium">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
