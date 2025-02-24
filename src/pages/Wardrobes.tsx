
import { useState } from "react";
import HomeNavbar from "@/components/HomeNavbar";
import { Button } from "@/components/ui/button";
import { PlusCircle, Home as HomeIcon, Grid, User, Settings, Sparkles, FolderPlus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { wardrobes } from "@/data/staticData";

const Wardrobes = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [newWardrobe, setNewWardrobe] = useState({
    name: "",
    description: ""
  });
  
  const handleCreateWardrobe = () => {
    if (!newWardrobe.name.trim()) {
      toast({
        title: "Error",
        description: "Please provide a wardrobe name",
        variant: "destructive"
      });
      return;
    }

    const wardrobe = {
      id: (wardrobes.length + 1).toString(),
      name: newWardrobe.name,
      description: newWardrobe.description,
      pins: [],
      createdAt: new Date()
    };

    wardrobes.push(wardrobe);
    setIsOpen(false);
    setNewWardrobe({ name: "", description: "" });
    
    toast({
      title: "Success",
      description: "Wardrobe created successfully!"
    });
  };
  
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
          <div className="container pt-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-semibold">Your Wardrobes</h1>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90">
                    <FolderPlus className="h-5 w-5 mr-2" />
                    New Wardrobe
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Wardrobe</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={newWardrobe.name}
                        onChange={(e) => setNewWardrobe(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="My Fashion Collection"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        value={newWardrobe.description}
                        onChange={(e) => setNewWardrobe(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="A collection of my favorite pieces"
                      />
                    </div>
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={handleCreateWardrobe}
                    >
                      Create Wardrobe
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            {wardrobes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16">
                <FolderPlus className="h-16 w-16 text-white/20 mb-4" />
                <h3 className="text-lg font-medium mb-2">No Wardrobes Yet</h3>
                <p className="text-white/60 text-center mb-4">
                  Create your first wardrobe to start organizing your favorite pieces
                </p>
                <Button
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => setIsOpen(true)}
                >
                  Create Your First Wardrobe
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {wardrobes.map((wardrobe) => (
                  <div 
                    key={wardrobe.id} 
                    className="p-4 rounded-[1.5rem] bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <div className="aspect-square rounded-[1.5rem] bg-white/10 mb-4 overflow-hidden">
                      {wardrobe.pins[0] ? (
                        <img 
                          src={wardrobe.pins[0].imageUrl} 
                          alt={wardrobe.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FolderPlus className="h-12 w-12 text-white/20" />
                        </div>
                      )}
                    </div>
                    <h3 className="font-medium mb-1">{wardrobe.name}</h3>
                    <p className="text-sm text-white/60">{wardrobe.pins.length} items</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Wardrobes;

