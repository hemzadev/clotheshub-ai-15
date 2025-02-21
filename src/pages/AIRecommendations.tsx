
import HomeNavbar from "@/components/HomeNavbar";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const AIRecommendations = () => {
  return (
    <div className="min-h-screen bg-background">
      <HomeNavbar />
      <div className="container pt-24">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Sparkles className="h-12 w-12 mx-auto mb-4 text-primary animate-pulse" />
          <h1 className="text-3xl font-semibold mb-4">AI Style Recommendations</h1>
          <p className="text-white/60 mb-8">
            Get personalized style recommendations based on your preferences and current wardrobe
          </p>
          <Button className="bg-primary hover:bg-primary/90">
            Get Recommendations
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-6 rounded-[1.5rem] bg-white/5 hover:bg-white/10 transition-colors">
              <h3 className="font-semibold mb-3">Style Suggestion {i}</h3>
              <p className="text-white/60 text-sm mb-4">
                Based on your recent preferences and current trends
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="aspect-square rounded-2xl bg-white/10" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIRecommendations;
