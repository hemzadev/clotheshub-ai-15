
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { Home as HomeIcon, PlusCircle, Grid, User, Settings } from "lucide-react";
import PinGrid from "@/components/PinGrid";
import HomeNavbar from "@/components/HomeNavbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <HomeNavbar />
      <SidebarProvider>
        <div className="flex w-full">
          <Sidebar className="h-[calc(100vh-64px)] w-[240px] shrink-0 border-r border-white/5">
            <div className="space-y-4 py-4">
              <div className="px-3 py-2">
                <div className="space-y-1">
                  <button className="w-full flex items-center gap-3 py-2 px-4 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    <HomeIcon className="h-5 w-5" />
                    Home
                  </button>
                  <button className="w-full flex items-center gap-3 py-2 px-4 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    <PlusCircle className="h-5 w-5" />
                    Create
                  </button>
                  <button className="w-full flex items-center gap-3 py-2 px-4 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    <Grid className="h-5 w-5" />
                    Wardrobes
                  </button>
                  <button className="w-full flex items-center gap-3 py-2 px-4 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    <User className="h-5 w-5" />
                    Account
                  </button>
                </div>
              </div>
              <div className="px-3 py-2 mt-auto">
                <button className="w-full flex items-center gap-3 py-2 px-4 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                  <Settings className="h-5 w-5" />
                  Settings
                </button>
              </div>
            </div>
          </Sidebar>
          <main className="flex-1 overflow-auto">
            <PinGrid />
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Home;
