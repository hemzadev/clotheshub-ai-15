
import { useState } from "react";
import { ImagePlus, Heart, Share2, MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar } from "./ui/avatar";

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
    }
  ]);

  return (
    <div className="container py-6">
      <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4">
        {pins.map((pin) => (
          <div 
            key={pin.id} 
            className="break-inside-avoid mb-4 group relative rounded-[1.5rem] overflow-hidden"
          >
            <div className="relative overflow-hidden" style={{ height: pin.height }}>
              <img 
                src={pin.image} 
                alt=""
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
            <div className="p-3 flex items-center gap-2">
              <Avatar>
                <img src={pin.user.avatar} alt={pin.user.name} />
              </Avatar>
              <span className="text-sm text-white/90 font-medium">{pin.user.name}</span>
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
