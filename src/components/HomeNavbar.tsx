
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, MessageCircle, Search, User } from "lucide-react";

const HomeNavbar = () => {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container h-16 flex items-center gap-4">
        <a href="/" className="shrink-0">
          <img 
            src="/lovable-uploads/e6b6d2ce-6576-4d67-9f26-07ea4ea994c2.png" 
            alt="StylisH" 
            className="h-8 brightness-0 invert" 
          />
        </a>

        <div className="flex-1 flex items-center gap-2">
          <div className="relative flex-1 max-w-2xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <Input 
              type="search" 
              placeholder="Search for inspiration..." 
              className="w-full pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/40"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-white/60 hover:text-white">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white/60 hover:text-white">
            <MessageCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white/60 hover:text-white">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomeNavbar;
