
import { useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { categoryImages } from "@/data/mockData";

interface ScrollingImagesProps {
  direction?: "left" | "right";
  speed?: number;
  category?: string;
}

const ScrollingImages = ({
  direction = "left",
  speed = 30,
  category = "kitchen",
}: ScrollingImagesProps) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!scrollerRef.current) return;
    
    const scrollerContent = Array.from(scrollerRef.current.children);
    
    // Clone items to create continuous flow
    scrollerContent.forEach(item => {
      const duplicatedItem = item.cloneNode(true);
      scrollerRef.current?.appendChild(duplicatedItem);
    });
    
  }, []);

  const handleFavorite = (e: React.MouseEvent, title: string) => {
    e.stopPropagation();
    toast({
      title: "Added to favorites",
      description: `${title} has been added to your favorites`,
      duration: 3000,
    });
  };

  const handleProductClick = (title: string, price: string) => {
    toast({
      title: "Product Selected",
      description: `Viewing ${title} - ${price}`,
      duration: 3000,
    });
    
    navigate(`/product/${title.toLowerCase().replace(/\s+/g, '-')}`);
  };

  const images = categoryImages[category as keyof typeof categoryImages] || categoryImages.kitchen;

  return (
    <div className="relative w-full overflow-hidden py-8">
      <div className="mb-4 px-4 sm:px-6 lg:px-8">
        <h3 className="text-lg font-serif text-gray-800">
          {category === "kitchen" ? "Kitchen Essentials" : 
           category === "decor" ? "Home Decor" : 
           category === "lighting" ? "Lighting Collection" : 
           "Stationery Collection"}
        </h3>
      </div>
      
      <div
        ref={scrollerRef}
        className="flex animate-[scroll_40s_linear_infinite]"
        style={{
          animationDirection: direction === "left" ? "normal" : "reverse",
          animationDuration: `${speed}s`,
        }}
      >
        {images.map((img, idx) => (
          <div
            key={idx}
            onClick={() => handleProductClick(img.title, img.price)}
            className="relative mx-3 h-72 w-[280px] flex-shrink-0 rounded-lg overflow-hidden group cursor-pointer etsy-card"
          >
            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300"></div>
            <img
              src={img.url}
              alt={`${img.title}`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {img.badge && (
              <Badge className="absolute top-3 left-3 font-medium text-xs py-1 px-2.5 bg-white text-black hover:bg-white/90 etsy-badge">
                {img.badge}
              </Badge>
            )}
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute top-3 right-3 bg-white/90 hover:bg-white rounded-full h-8 w-8 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={(e) => handleFavorite(e, img.title)}
            >
              <Heart className="h-4 w-4" />
              <span className="sr-only">Add to favorites</span>
            </Button>
            <div className="absolute bottom-0 left-0 right-0 bg-white p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="font-medium text-gray-900 truncate etsy-title">{img.title}</h3>
              <div className="flex items-center justify-between mt-1">
                <p className="text-gray-700 font-medium etsy-price">{img.price}</p>
                <div className="flex items-center">
                  <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-medium ml-1">{img.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <style>
        {`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-100% / 2));
            }
          }
        `}
      </style>
    </div>
  );
};

export default ScrollingImages;
