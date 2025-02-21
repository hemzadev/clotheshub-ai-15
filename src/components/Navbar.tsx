
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AuthModal from "./AuthModal";
import WhatsNewModal from "./WhatsNewModal";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-lg border-b border-border/40 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="hidden sm:flex gap-2 text-foreground border-secondary">
            <Sparkles className="w-4 h-4" />
            AI Stylist
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="animate-glow border-primary text-primary hover:text-primary hover:bg-primary/10"
              >
                What's New
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg animate-popIn bg-background text-foreground">
              <WhatsNewModal />
            </DialogContent>
          </Dialog>
        </div>
        
        <a href="/" className="absolute left-1/2 -translate-x-1/2">
          <img 
            src="/lovable-uploads/e6b6d2ce-6576-4d67-9f26-07ea4ea994c2.png" 
            alt="StylisH" 
            className="h-8 brightness-0 invert"
          />
        </a>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              size="sm" 
              className="bg-primary text-white hover:bg-primary/90"
            >
              Join Now
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md animate-popIn bg-background text-foreground">
            <AuthModal />
          </DialogContent>
        </Dialog>
      </div>
    </nav>
  );
};

export default Navbar;
