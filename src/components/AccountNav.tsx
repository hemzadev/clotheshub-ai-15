
import { Link, useLocation } from "react-router-dom";
import { Home as HomeIcon, PlusCircle, Grid, User, Settings, Sparkles } from "lucide-react";

export const navItems = [
  { icon: HomeIcon, path: "/home", label: "Home" },
  { icon: PlusCircle, path: "/create", label: "Create" },
  { icon: Grid, path: "/wardrobes", label: "Wardrobes" },
  { icon: Sparkles, path: "/ai-recommendations", label: "AI" },
  { icon: User, path: "/account", label: "Account" },
];

const AccountNav = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
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
  );
};

export default AccountNav;
