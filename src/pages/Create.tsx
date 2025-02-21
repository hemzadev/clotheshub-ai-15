
import HomeNavbar from "@/components/HomeNavbar";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Home as HomeIcon, PlusCircle, Grid, User, Settings, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Create = () => {
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
          <div className="container max-w-5xl mx-auto pt-8">
            <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-white/10 rounded-[1.5rem] bg-white/5">
              <Upload className="h-12 w-12 text-white/40 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Create a New Pin</h2>
              <p className="text-white/60 mb-4 text-center">
                Drag and drop an image or click to upload
              </p>
              <Button className="bg-primary hover:bg-primary/90">
                Choose File
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Create;
