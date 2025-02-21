
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AuthModal from "./AuthModal";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg border-b z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
            <Sparkles className="w-4 h-4" />
            AI Stylist
          </Button>
        </div>
        
        <a href="/" className="absolute left-1/2 -translate-x-1/2">
          <img src="/lovable-uploads/20e7cef7-90e9-4afe-bead-ea8e4c840216.png" alt="StylisH" className="h-8" />
        </a>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-black text-white hover:bg-black/90">
              Join Now
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <AuthModal />
          </DialogContent>
        </Dialog>
      </div>
    </nav>
  );
};

export default Navbar;
