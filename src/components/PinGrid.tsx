
import { useState } from "react";
import { ImagePlus, Heart, Share2, MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";

interface Pin {
  id: number;
  image: string;
  title: string;
  author: string;
}

const PinGrid = () => {
  const [pins] = useState<Pin[]>([
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      title: "Modern Fashion Trends",
      author: "Fashion Expert"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      title: "Creative Workspace",
      author: "Interior Design"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
      title: "Nature Exploration",
      author: "Travel Guide"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      title: "Pet Photography",
      author: "Animal Lover"
    }
  ]);

  return (
    <div className="container py-6">
      <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4">
        {pins.map((pin) => (
          <div 
            key={pin.id} 
            className="break-inside-avoid mb-4 group relative rounded-xl overflow-hidden"
          >
            <div className="relative aspect-[2/3] overflow-hidden">
              <img 
                src={pin.image} 
                alt={pin.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-2 right-2 flex gap-2">
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/40"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/40"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/40"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="p-3">
              <h3 className="font-medium text-white truncate">{pin.title}</h3>
              <p className="text-sm text-white/60">{pin.author}</p>
            </div>
          </div>
        ))}
        
        <Button 
          className="fixed right-6 bottom-6 h-12 w-12 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/25"
        >
          <ImagePlus className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default PinGrid;
