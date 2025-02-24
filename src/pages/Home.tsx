
import { Home as HomeIcon, PlusCircle, Grid, User, Settings, Sparkles } from "lucide-react";
import PinGrid from "@/components/PinGrid";
import HomeNavbar from "@/components/HomeNavbar";
import { Link, useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { staticPins } from "@/data/staticData";
import { useState } from "react";

const Home = () => {
  const location = useLocation();
  const [loading] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { icon: HomeIcon, path: "/home", label: "Home" },
    { icon: PlusCircle, path: "/create", label: "Create" },
    { icon: Grid, path: "/wardrobes", label: "Wardrobes" },
    { icon: Sparkles, path: "/ai-recommendations", label: "AI" },
    { icon: User, path: "/account", label: "Account" },
  ];

  const allPins = staticPins;
  const productPins = staticPins.filter(pin => pin.type === "PRODUCT");
  const outfitPins = staticPins.filter(pin => pin.type === "OUTFIT");

  return (
    <div className="min-h-screen bg-background">
      <HomeNavbar />
      <div className="flex w-full pt-16">
        <div className="w-16 shrink-0 border-r border-white/5 bg-background">
          <div className="fixed top-16 w-16 flex flex-col h-[calc(100vh-64px)]">
            <div className="flex-1 py-4">
              <div className="flex flex-col items-center gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ${
                      isActive(item.path)
                        ? "text-white bg-primary shadow-lg shadow-primary/25"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            </div>
            <div className="pb-4 flex justify-center">
              <button className="flex items-center justify-center w-10 h-10 text-white/60 hover:text-white hover:bg-white/5 rounded-full transition-colors">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        <main className="flex-1 overflow-auto px-6">
          <Tabs defaultValue="all" className="w-full pt-6">
            <TabsList className="grid w-full max-w-[400px] grid-cols-3 mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="outfits">Outfits</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <PinGrid pins={allPins} loading={loading} />
            </TabsContent>
            <TabsContent value="products">
              <PinGrid pins={productPins} loading={loading} />
            </TabsContent>
            <TabsContent value="outfits">
              <PinGrid pins={outfitPins} loading={loading} />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Home;
