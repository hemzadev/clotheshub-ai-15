
import { Sidebar } from "@/components/ui/sidebar";
import PinGrid from "@/components/PinGrid";
import HomeNavbar from "@/components/HomeNavbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <HomeNavbar />
      <div className="flex">
        <Sidebar className="h-[calc(100vh-64px)] w-[240px] shrink-0 border-r border-white/5">
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-white">Discover</h2>
              <div className="space-y-1">
                <button className="w-full flex items-center py-2 px-4 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                  For You
                </button>
                <button className="w-full flex items-center py-2 px-4 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                  Following
                </button>
                <button className="w-full flex items-center py-2 px-4 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                  Popular
                </button>
              </div>
            </div>
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-white">Categories</h2>
              <div className="space-y-1">
                <button className="w-full flex items-center py-2 px-4 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                  Fashion
                </button>
                <button className="w-full flex items-center py-2 px-4 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                  Art
                </button>
                <button className="w-full flex items-center py-2 px-4 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                  Photography
                </button>
              </div>
            </div>
          </div>
        </Sidebar>
        <main className="flex-1 overflow-auto">
          <PinGrid />
        </main>
      </div>
    </div>
  );
};

export default Home;
