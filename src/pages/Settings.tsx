
import { useEffect, useState } from "react";
import HomeNavbar from "@/components/HomeNavbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Home as HomeIcon, PlusCircle, Grid, User, Settings, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const SettingsPage = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [isDarkMode, setIsDarkMode] = useState(true);
  
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
    // Check if there's a saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const handleThemeChange = (checked: boolean) => {
    setIsDarkMode(checked);
    document.documentElement.classList.toggle('dark', checked);
    localStorage.setItem('theme', checked ? 'dark' : 'light');
    
    toast({
      title: "Theme Updated",
      description: `Switched to ${checked ? 'dark' : 'light'} mode`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <HomeNavbar />
      <div className="flex w-full pt-16">
        <div className="w-16 shrink-0 border-r border-border bg-background">
          <div className="fixed top-16 w-16 flex flex-col h-[calc(100vh-64px)]">
            <div className="flex-1 py-4">
              <div className="flex flex-col items-center gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ${
                      isActive(item.path)
                        ? "text-foreground bg-primary shadow-lg shadow-primary/25"
                        : "text-foreground/60 hover:text-foreground hover:bg-accent/10"
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
                    ? "text-foreground bg-primary shadow-lg shadow-primary/25"
                    : "text-foreground/60 hover:text-foreground hover:bg-accent/10"
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
              <h1 className="text-2xl font-semibold mb-8 text-foreground">Settings</h1>
              
              <div className="space-y-4">
                <Card className="p-6 bg-card border-border">
                  <h3 className="text-lg font-medium mb-4 text-foreground">Appearance</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Dark Mode</p>
                        <p className="text-sm text-muted-foreground">Toggle dark mode theme</p>
                      </div>
                      <Switch 
                        checked={isDarkMode}
                        onCheckedChange={handleThemeChange}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">High Contrast</p>
                        <p className="text-sm text-muted-foreground">Increase visual contrast</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-card border-border">
                  <h3 className="text-lg font-medium mb-4 text-foreground">Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive email updates</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Push Notifications</p>
                        <p className="text-sm text-muted-foreground">Get mobile notifications</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-card border-border">
                  <h3 className="text-lg font-medium mb-4 text-foreground">Language & Region</h3>
                  <Button variant="outline" className="border-border hover:bg-accent/5">
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
