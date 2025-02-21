
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ArrowRight, Sparkles } from "lucide-react";
import AuthModal from "./AuthModal";

const HeroSection = () => {
  return (
    <div className="min-h-screen pt-20 flex items-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_-20%,#0047ff,transparent_70%)]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight animate-fadeIn [--animation-delay:200ms] leading-[1.1]">
                Your Personal{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient">
                  AI Style Assistant
                </span>
              </h1>
              <p className="text-xl text-foreground/80 max-w-[600px] mx-auto lg:mx-0 animate-fadeIn [--animation-delay:400ms] leading-relaxed">
                Discover perfect outfits, get personalized style recommendations, and join a community of fashion enthusiasts.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fadeIn [--animation-delay:600ms]">
              <Button 
                size="lg" 
                className="bg-primary text-white hover:bg-primary/90 gap-2 h-14 px-8 text-lg font-medium relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,71,255,0.4)] hover:-translate-y-0.5"
              >
                Explore Now
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="gap-2 h-14 px-8 text-lg font-medium border-white/10 bg-white/5 backdrop-blur hover:bg-white/10 transition-all duration-300"
                  >
                    <Sparkles className="w-5 h-5" />
                    Try AI Stylist
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md animate-popIn bg-background/95 backdrop-blur-xl border border-white/10">
                  <AuthModal />
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <div className="hidden lg:block relative animate-fadeIn [--animation-delay:800ms]">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 p-8 backdrop-blur-3xl border border-white/10">
              <div className="w-full h-full rounded-2xl bg-white/5 backdrop-blur shadow-2xl border border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#0047ff1a,transparent_70%)]"></div>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="/lovable-uploads/20e7cef7-90e9-4afe-bead-ea8e4c840216.png" 
                alt="StylisH Logo" 
                className="w-40 brightness-0 invert" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
