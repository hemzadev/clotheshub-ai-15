
import HomeNavbar from "@/components/HomeNavbar";
import { Button } from "@/components/ui/button";
import { Sparkles, Home as HomeIcon, PlusCircle, Grid, User, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const AIRecommendations = () => {
  const location = useLocation();
  
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
              <Link
                to="/settings"
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ${
                  isActive("/settings")
                    ? "text-white bg-primary shadow-lg shadow-primary/25"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <Settings className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        <main className="flex-1 overflow-auto">
          <div className="container pt-8">
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
        </main>
      </div>
    </div>
  );
};

export default AIRecommendations;
