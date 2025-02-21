
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, MessageCircle, Search, User } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const HomeNavbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full border-b border-white/5 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container h-16 flex items-center gap-4">
        <a href="/" className="shrink-0">
          <img 
            src="/lovable-uploads/e6b6d2ce-6576-4d67-9f26-07ea4ea994c2.png" 
            alt="StylisH" 
            className="h-8 dark:invert" 
          />
        </a>

        <div className="flex-1 flex items-center gap-2">
          <div className="relative flex-1 max-w-2xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search for inspiration..." 
              className="w-full pl-9 bg-accent/5 border-accent/10"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <MessageCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomeNavbar;
