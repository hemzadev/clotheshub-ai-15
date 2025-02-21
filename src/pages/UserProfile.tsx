
import HomeNavbar from "@/components/HomeNavbar";
import { Button } from "@/components/ui/button";
import { Home as HomeIcon, PlusCircle, Grid, User, Settings, Sparkles, MessageCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Avatar } from "@/components/ui/avatar";

const UserProfile = () => {
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
          <div className="container py-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-6 mb-8">
                <Avatar className="h-24 w-24 border-2 border-white/10">
                  <img src="https://ui.shadcn.com/avatars/01.png" alt="User avatar" />
                </Avatar>
                <div className="flex-1">
                  <h1 className="text-2xl font-semibold mb-2">Sarah Wilson</h1>
                  <p className="text-white/60 mb-4">Fashion enthusiast | Personal stylist</p>
                  <div className="flex gap-4">
                    <Button className="bg-primary hover:bg-primary/90">
                      Follow
                    </Button>
                    <Button variant="outline" className="border-white/10">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-lg font-semibold mb-4">Public Wardrobes</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 rounded-[1.5rem] bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                      <div className="aspect-square rounded-[1.5rem] bg-white/10 mb-4" />
                      <h3 className="font-medium mb-1">Wardrobe {i}</h3>
                      <p className="text-sm text-white/60">{i * 4} items</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4">Pins</h2>
                <div className="columns-2 sm:columns-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="break-inside-avoid mb-4">
                      <div className="rounded-[1.5rem] bg-white/5 hover:bg-white/10 transition-colors overflow-hidden">
                        <div className="aspect-[3/4] bg-white/10" />
                        <div className="p-4">
                          <h3 className="font-medium mb-1">Pin Title {i}</h3>
                          <p className="text-sm text-white/60">Description</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserProfile;
