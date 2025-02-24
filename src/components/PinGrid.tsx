
import { useEffect, useRef, useState } from "react";
import { ImagePlus, Heart, Share2, MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar } from "./ui/avatar";
import { Link } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";
import { useInView } from "react-intersection-observer";

interface User {
  id: string;
  name: string;
  avatar: string;
}

interface Pin {
  id: string;
  title: string;
  description: string;
  type: string;
  imageUrl: string;
  user: User;
}

interface PinGridProps {
  pins?: Pin[];
  loading?: boolean;
}

const PinGrid = ({ pins = [], loading = false }: PinGridProps) => {
  const loadingSkeletons = Array.from({ length: 8 }).map((_, index) => (
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

  if (loading) {
    return (
      <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 2xl:columns-7 gap-3 [column-fill:_balance] px-3 md:px-0">
        {loadingSkeletons}
      </div>
    );
  }

  return (
    <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 2xl:columns-7 gap-3 [column-fill:_balance] px-3 md:px-0">
      {pins.map((pin, index) => (
        <div 
          key={pin.id}
          className="break-inside-avoid mb-3 group relative rounded-[1.5rem] overflow-hidden bg-card hover:bg-muted/10 transition-colors animate-fadeIn"
          style={{
            '--animation-delay': `${index * 0.1}s`,
          } as React.CSSProperties}
        >
          <Link to={`/pin/${pin.id}`} className="block">
            <div className="relative overflow-hidden rounded-[1.5rem] p-2">
              <div
                className="w-full"
                style={{
                  paddingBottom: '75%',
                  position: 'relative'
                }}
              >
                <img 
                  src={pin.imageUrl} 
                  alt={pin.title}
                  className="absolute inset-0 w-full h-full object-cover rounded-[1.25rem] transition-all duration-300 group-hover:scale-105"
                  loading="lazy"
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
      
      <Button 
        className="fixed right-6 bottom-6 h-12 w-12 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/25"
      >
        <ImagePlus className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default PinGrid;
