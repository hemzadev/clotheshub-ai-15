import { useEffect } from "react";
import HomeNavbar from "@/components/HomeNavbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Home as HomeIcon, PlusCircle, Grid, User, Settings, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const SettingsPage = () => {
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

  useEffect(() => {
    // Check system preference and localStorage on mount
    const isDark = localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleDarkMode = (enabled: boolean) => {
    if (enabled) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

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
              <h1 className="text-2xl font-semibold mb-8">Settings</h1>
              
              <div className="space-y-4">
                <Card className="p-6 bg-white/5 border-white/10">
                  <h3 className="text-lg font-medium mb-4">Appearance</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Dark Mode</p>
                        <p className="text-sm text-muted-foreground">Toggle dark mode theme</p>
                      </div>
                      <Switch
                        checked={document.documentElement.classList.contains("dark")}
                        onCheckedChange={toggleDarkMode}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">High Contrast</p>
                        <p className="text-sm text-muted-foreground">Increase visual contrast</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-white/5 border-white/10">
                  <h3 className="text-lg font-medium mb-4">Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-white/60">Receive email updates</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-white/60">Get mobile notifications</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-white/5 border-white/10">
                  <h3 className="text-lg font-medium mb-4">Language & Region</h3>
                  <Button variant="outline" className="border-white/10 hover:bg-white/5">
                    Change Language
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

export default SettingsPage;
