
import { Sidebar } from "@/components/ui/sidebar";
import { Home as HomeIcon, PlusCircle, Grid, User, Settings, Sparkles } from "lucide-react";
import PinGrid from "@/components/PinGrid";
import HomeNavbar from "@/components/HomeNavbar";
import { Link, useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Home = () => {
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

  const { data: allPins, isLoading: loadingAll, error: errorAll } = useQuery({
    queryKey: ['pins'],
    queryFn: async () => {
      console.log('Fetching all pins...');
      try {
        const response = await axios.post('http://localhost:8088/graphql', {
          query: `
            query {
              pins {
                id
                title
                description
                type
                imageUrl
                user {
                  id
                  username
                  profilePicture
                }
              }
            }
          `
        });
        console.log('All pins raw response:', response);
        
        if (response.data.errors) {
          throw new Error(response.data.errors[0].message);
        }
        
        return response.data.data?.pins || [];
      } catch (error) {
        console.error('Error fetching all pins:', error);
        throw error;
      }
    }
  });

  const { data: productPins, isLoading: loadingProducts, error: errorProducts } = useQuery({
    queryKey: ['pins', 'products'],
    queryFn: async () => {
      console.log('Fetching product pins...');
      try {
        const response = await axios.post('http://localhost:8088/graphql', {
          query: `
            query {
              pinsByType(type: "PRODUCT") {
                id
                title
                description
                type
                imageUrl
                user {
                  id
                  username
                  profilePicture
                }
              }
            }
          `
        });
        console.log('Product pins raw response:', response);
        
        if (response.data.errors) {
          throw new Error(response.data.errors[0].message);
        }
        
        return response.data.data?.pinsByType || [];
      } catch (error) {
        console.error('Error fetching product pins:', error);
        throw error;
      }
    }
  });

  const { data: outfitPins, isLoading: loadingOutfits, error: errorOutfits } = useQuery({
    queryKey: ['pins', 'outfits'],
    queryFn: async () => {
      console.log('Fetching outfit pins...');
      try {
        const response = await axios.post('http://localhost:8088/graphql', {
          query: `
            query {
              pinsByType(type: "OUTFIT") {
                id
                title
                description
                type
                imageUrl
                user {
                  id
                  username
                  profilePicture
                }
              }
            }
          `
        });
        console.log('Outfit pins raw response:', response);
        
        if (response.data.errors) {
          throw new Error(response.data.errors[0].message);
        }
        
        return response.data.data?.pinsByType || [];
      } catch (error) {
        console.error('Error fetching outfit pins:', error);
        throw error;
      }
    }
  });

  // Log the current state of all data
  console.log('Current data state:', {
    allPins,
    productPins,
    outfitPins,
    loadingStates: {
      all: loadingAll,
      products: loadingProducts,
      outfits: loadingOutfits
    },
    errors: {
      all: errorAll,
      products: errorProducts,
      outfits: errorOutfits
    }
  });

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
              <button className="flex items-center justify-center w-10 h-10 text-white/60 hover:text-white hover:bg-white/5 rounded-full transition-colors">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        <main className="flex-1 overflow-auto px-6">
          <Tabs defaultValue="all" className="w-full pt-6">
            <TabsList className="grid w-full max-w-[400px] grid-cols-3 mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="outfits">Outfits</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <PinGrid pins={allPins} loading={loadingAll} />
            </TabsContent>
            <TabsContent value="products">
              <PinGrid pins={productPins} loading={loadingProducts} />
            </TabsContent>
            <TabsContent value="outfits">
              <PinGrid pins={outfitPins} loading={loadingOutfits} />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Home;

