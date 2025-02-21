
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ArrowRight, Sparkles } from "lucide-react";
import AuthModal from "./AuthModal";

const HeroSection = () => {
  return (
    <div className="min-h-screen pt-16 flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight animate-fadeIn [--animation-delay:200ms]">
                Your Personal AI-Powered{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                  Style Assistant
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-[600px] mx-auto lg:mx-0 animate-fadeIn [--animation-delay:400ms]">
                Discover perfect outfits, get personalized style recommendations, and join a community of fashion enthusiasts. All powered by advanced AI.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fadeIn [--animation-delay:600ms]">
              <Button size="lg" className="bg-black text-white hover:bg-black/90 gap-2">
                Explore Now
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" variant="outline" className="gap-2">
                    <Sparkles className="w-4 h-4" />
                    Try AI Stylist
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <AuthModal />
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <div className="hidden lg:block relative animate-fadeIn [--animation-delay:800ms]">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-pink-100 to-violet-100 p-8">
              <div className="w-full h-full rounded-xl bg-white/80 backdrop-blur shadow-xl"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <img src="/lovable-uploads/20e7cef7-90e9-4afe-bead-ea8e4c840216.png" alt="StylisH Logo" className="w-32" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
