
import { useEffect, useRef, useState } from "react";
import { ImagePlus, Heart, Share2, MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar } from "./ui/avatar";
import { Link } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";
import { useInView } from "react-intersection-observer";

interface Pin {
  id: number;
  image: string;
  height: number;
  user: {
    name: string;
    avatar: string;
  };
}

const PinGrid = () => {
  const [loading, setLoading] = useState(true);
  const [pins] = useState<Pin[]>([
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      height: 400,
      user: {
        name: "Sarah Wilson",
        avatar: "https://ui.shadcn.com/avatars/01.png"
      }
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      height: 300,
      user: {
        name: "John Creative",
        avatar: "https://ui.shadcn.com/avatars/02.png"
      }
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
      height: 500,
      user: {
        name: "Nature Explorer",
        avatar: "https://ui.shadcn.com/avatars/03.png"
      }
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      height: 350,
      user: {
        name: "Pet Lover",
        avatar: "https://ui.shadcn.com/avatars/04.png"
      }
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      height: 450,
      user: {
        name: "Interior Design",
        avatar: "https://ui.shadcn.com/avatars/05.png"
      }
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      height: 380,
      user: {
        name: "Home Decor",
        avatar: "https://ui.shadcn.com/avatars/06.png"
      }
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
      height: 420,
      user: {
        name: "Style Maven",
        avatar: "https://ui.shadcn.com/avatars/07.png"
      }
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1600573472591-ee6b68d14d12",
      height: 360,
      user: {
        name: "Design Pro",
        avatar: "https://ui.shadcn.com/avatars/08.png"
      }
    }
  ]);

  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Create loading skeletons that match the layout
  const loadingSkeletons = Array.from({ length: 14 }).map((_, index) => (
    <div 
      key={`skeleton-${index}`}
      className="break-inside-avoid mb-3 group relative rounded-[1.5rem] overflow-hidden bg-card"
    >
      <div className="relative overflow-hidden rounded-[1.5rem] p-2">
        <Skeleton className="w-full" style={{ 
          height: `${Math.floor(Math.random() * (500 - 300) + 300)}px`,
          borderRadius: '1.25rem'
        }} />
      </div>
      <div className="p-4 flex items-center gap-3">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  ));

  return (
    <div className="py-6" ref={ref}>
      <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 2xl:columns-7 gap-3 [column-fill:_balance] px-3 md:px-0">
        {loading ? loadingSkeletons : pins.map((pin) => (
          <div 
            key={pin.id}
            className={`break-inside-avoid mb-3 group relative rounded-[1.5rem] overflow-hidden bg-card hover:bg-muted/10 transition-colors ${
              inView ? 'animate-fadeIn' : ''
            }`}
            style={{
              '--animation-delay': `${pin.id * 0.1}s`,
            } as React.CSSProperties}
          >
            <Link to={`/pin/${pin.id}`} className="block">
              <div className="relative overflow-hidden rounded-[1.5rem] p-2">
                <div
                  className="w-full"
                  style={{
                    paddingBottom: `${(pin.height / (pin.height > 400 ? 2 : 1))}px`,
                    position: 'relative'
                  }}
                >
                  <img 
                    src={pin.image} 
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover rounded-[1.25rem] transition-all duration-300 group-hover:scale-105"
                    loading="lazy"
                    onLoad={() => {
                      if (!loadedImages.has(pin.id)) {
                        setLoadedImages(prev => new Set([...prev, pin.id]));
                      }
                    }}
                  />
                </div>
                <div className="absolute inset-2 rounded-[1.25rem] bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="absolute top-3 right-3 flex gap-2">
                    <Button 
                      size="icon" 
                      variant="secondary" 
                      className="h-9 w-9 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm"
                      onClick={(e) => e.preventDefault()}
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="secondary" 
                      className="h-9 w-9 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm"
                      onClick={(e) => e.preventDefault()}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="secondary" 
                      className="h-9 w-9 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm"
                      onClick={(e) => e.preventDefault()}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
            <div className="p-4 flex items-center gap-3">
              <Link to={`/user/${pin.user.name.toLowerCase().replace(/\s+/g, '-')}`} className="hover:opacity-80 transition-opacity">
                <Avatar className="border-2 border-border">
                  <img src={pin.user.avatar} alt={pin.user.name} />
                </Avatar>
              </Link>
              <Link 
                to={`/user/${pin.user.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-sm text-foreground/90 font-medium hover:text-foreground transition-colors"
              >
                {pin.user.name}
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      <Button 
        className="fixed right-6 bottom-6 h-12 w-12 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/25"
      >
        <ImagePlus className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default PinGrid;
