
import HomeNavbar from "@/components/HomeNavbar";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const Wardrobes = () => {
  return (
    <div className="min-h-screen bg-background">
      <HomeNavbar />
      <div className="container pt-24">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Your Wardrobes</h1>
          <Button className="bg-primary hover:bg-primary/90">
            <PlusCircle className="h-5 w-5 mr-2" />
            New Wardrobe
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Sample wardrobe cards */}
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-4 rounded-[1.5rem] bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
              <div className="aspect-square rounded-[1.5rem] bg-white/10 mb-4" />
              <h3 className="font-medium mb-1">Wardrobe {i}</h3>
              <p className="text-sm text-white/60">{i * 4} items</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wardrobes;
