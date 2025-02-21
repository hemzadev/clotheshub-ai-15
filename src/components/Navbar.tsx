
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AuthModal from "./AuthModal";
import WhatsNewModal from "./WhatsNewModal";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-background/40 backdrop-blur-xl border-b border-white/5 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Left side */}
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              className="animate-glow border-primary text-primary hover:text-primary hover:bg-primary/10 relative overflow-hidden transition-all duration-300"
            >
              What's New
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg animate-popIn bg-background/95 backdrop-blur-xl border border-white/10">
            <WhatsNewModal />
          </DialogContent>
        </Dialog>

        {/* Center logo */}
        <a href="/" className="absolute left-1/2 -translate-x-1/2 group">
          <img 
            src="/lovable-uploads/e6b6d2ce-6576-4d67-9f26-07ea4ea994c2.png" 
            alt="StylisH" 
            className="h-10 brightness-0 invert transition-all duration-300 group-hover:scale-105" 
          />
        </a>

        {/* Right side */}
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              size="sm"
              className="bg-primary hover:bg-primary/90 text-white font-medium px-6 relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,71,255,0.4)] hover:-translate-y-0.5"
            >
              Join Now
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md animate-popIn bg-background/95 backdrop-blur-xl border border-white/10">
            <AuthModal />
          </DialogContent>
        </Dialog>
      </div>
    </nav>
  );
};

export default Navbar;
