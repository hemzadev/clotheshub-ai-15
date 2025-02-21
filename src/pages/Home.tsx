
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { Home as HomeIcon, PlusCircle, Grid, User, Settings } from "lucide-react";
import PinGrid from "@/components/PinGrid";
import HomeNavbar from "@/components/HomeNavbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <HomeNavbar />
      <div className="flex w-full pt-16">
        <div className="w-16 shrink-0 border-r border-white/5 bg-background">
          <div className="fixed top-16 w-16 flex flex-col h-[calc(100vh-64px)]">
            <div className="flex-1 py-4">
              <div className="flex flex-col items-center gap-4">
                <button className="flex items-center justify-center w-10 h-10 text-white/60 hover:text-white hover:bg-white/5 rounded-full transition-colors">
                  <HomeIcon className="h-5 w-5" />
                </button>
                <button className="flex items-center justify-center w-10 h-10 text-white/60 hover:text-white hover:bg-white/5 rounded-full transition-colors">
                  <PlusCircle className="h-5 w-5" />
                </button>
                <button className="flex items-center justify-center w-10 h-10 text-white/60 hover:text-white hover:bg-white/5 rounded-full transition-colors">
                  <Grid className="h-5 w-5" />
                </button>
                <button className="flex items-center justify-center w-10 h-10 text-white/60 hover:text-white hover:bg-white/5 rounded-full transition-colors">
                  <User className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="pb-4 flex justify-center">
              <button className="flex items-center justify-center w-10 h-10 text-white/60 hover:text-white hover:bg-white/5 rounded-full transition-colors">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        <main className="flex-1 overflow-auto">
          <PinGrid />
        </main>
      </div>
    </div>
  );
};

export default Home;
