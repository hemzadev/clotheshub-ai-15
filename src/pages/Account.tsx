
import HomeNavbar from "@/components/HomeNavbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home as HomeIcon, PlusCircle, Grid, User, Settings, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Account = () => {
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
            <div className="max-w-2xl mx-auto">
              <h1 className="text-2xl font-semibold mb-8">Account Settings</h1>
              <Card className="p-6 bg-white/5 border-white/10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-full bg-white/10" />
                  <div>
                    <h2 className="text-lg font-medium">John Doe</h2>
                    <p className="text-white/60">john.doe@example.com</p>
                  </div>
                </div>
                <Button className="bg-primary hover:bg-primary/90">Edit Profile</Button>
              </Card>
              
              <div className="mt-8 space-y-4">
                <Card className="p-6 bg-white/5 border-white/10">
                  <h3 className="text-lg font-medium mb-2">Privacy Settings</h3>
                  <p className="text-white/60 mb-4">Manage your privacy preferences</p>
                  <Button variant="outline" className="border-white/10 hover:bg-white/5">
                    Manage Privacy
                  </Button>
                </Card>
                
                <Card className="p-6 bg-white/5 border-white/10">
                  <h3 className="text-lg font-medium mb-2">Security</h3>
                  <p className="text-white/60 mb-4">Update your security settings</p>
                  <Button variant="outline" className="border-white/10 hover:bg-white/5">
                    Security Settings
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Account;
