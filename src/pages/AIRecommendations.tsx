import { useState, useCallback } from "react";
import HomeNavbar from "@/components/HomeNavbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Sparkles, Home as HomeIcon, PlusCircle, Grid, User, Settings, Upload, ExternalLink, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const AIRecommendations = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    if (file.type.startsWith("image/")) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
        setShowRecommendations(false);
      };
      reader.readAsDataURL(file);
    } else {
      toast({
        title: "Error",
        description: "Please upload an image file",
        variant: "destructive"
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  }, []);

  const getRecommendationsForStyle = () => {
    return [
      {
        category: "Recommended Jackets",
        items: [
          {
            name: "Korean Black Leather Jacket",
            price: "$89.99",
            image: "https://www.soodress.com/cdn/shop/products/S161c07dc750849e2878df4b6d9d654b6U.jpg",
            link: "https://www.soodress.com/products/korean-black-leather-jacket-women-winter-long-womens-moto-biker-zipper-jacket-streetwear-harajuku-y2k-loose-womens-coat-2021",
            store: "Soodress"
          },
          {
            name: "Retro Air Force Pilot Leather Jacket",
            price: "$129.99",
            image: "https://www.talkdecor.shop/cdn/shop/products/Hc9c7d12e83694100a6116af98a33a1a70.jpg",
            link: "https://www.talkdecor.shop/products/retro-american-air-force-fur-all-in-one-pilot-leather-jacket-23309",
            store: "Talk Decor"
          },
          {
            name: "Urban Explorer Corduroy Jacket",
            price: "$79.99",
            image: "https://www.kaxide.com/cdn/shop/products/S6772ffa6b171455ea5a08dd27901d4b58.jpg",
            link: "https://www.kaxide.com/products/urban-explorer-corduroy-jacket",
            store: "Kaxide"
          },
          {
            name: "Quilted Lined Corduroy Coat",
            price: "$99.99",
            image: "https://www.sdcts.com/cdn/shop/products/S457fc20ad0624475b0138bb374e1b1eaP.jpg",
            link: "https://www.sdcts.com/products/quilted-lined-corduroy-coat-q9td",
            store: "SDCTS"
          }
        ]
      }
    ];
  };

  const handleGetRecommendations = async () => {
    if (!selectedFile) {
      toast({
        title: "Error",
        description: "Please upload an image first",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newRecommendations = getRecommendationsForStyle();
    setRecommendations(newRecommendations);
    setShowRecommendations(true);
    setIsAnalyzing(false);
    
    toast({
      title: "Success",
      description: "Analysis complete! Here are your recommendations."
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

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    setShowRecommendations(false);
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
          <div className="container pt-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <Sparkles className="h-12 w-12 mx-auto mb-4 text-primary animate-pulse" />
              <h1 className="text-3xl font-semibold mb-4">AI Style Recommendations</h1>
              <p className="text-white/60 mb-8">
                Upload a fashion image and get personalized product recommendations
              </p>
              
              <Card className="p-8 bg-white/5 border-white/10 mb-8">
                {previewUrl ? (
                  <div className="space-y-4">
                    <div className="relative w-full max-w-md mx-auto aspect-square rounded-lg overflow-hidden">
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={handleRemoveImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button 
                      className="bg-primary hover:bg-primary/90"
                      onClick={handleGetRecommendations}
                      disabled={isAnalyzing}
                    >
                      {isAnalyzing ? (
                        <>
                          <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                          Analyzing Style...
                        </>
                      ) : (
                        "Get Recommendations"
                      )}
                    </Button>
                  </div>
                ) : (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`space-y-4 cursor-pointer border-2 border-dashed rounded-lg p-8 transition-colors ${
                      isDragging ? "border-primary bg-primary/10" : "border-white/10 hover:border-primary/50"
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <Upload className="h-12 w-12 text-white/40 mb-4" />
                      <p className="text-white/60 mb-4">
                        Drag and drop an image here, or click to select
                      </p>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload">
                        <Button className="bg-primary hover:bg-primary/90 cursor-pointer">
                          Choose Image
                        </Button>
                      </label>
                    </div>
                  </div>
                )}
              </Card>

              {showRecommendations && (
                <div className="grid gap-8">
                  {recommendations.map((section, index) => (
                    <div key={index} className="space-y-4">
                      <h2 className="text-xl font-semibold text-left">{section.category}</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {section.items.map((item, itemIndex) => (
                          <Card 
                            key={itemIndex}
                            className="overflow-hidden hover:ring-2 hover:ring-primary/50 transition-all duration-200"
                          >
                            <a 
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block"
                            >
                              <div className="aspect-[4/3] relative">
                                <img 
                                  src={item.image} 
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="p-4">
                                <h3 className="font-medium text-lg mb-2">{item.name}</h3>
                                <p className="text-white/60 mb-1">{item.price}</p>
                                <p className="text-sm text-white/60">Store: {item.store}</p>
                                <Button 
                                  variant="ghost" 
                                  className="w-full mt-3 hover:bg-primary hover:text-white"
                                >
                                  View Product <ExternalLink className="h-4 w-4 ml-2" />
                                </Button>
                              </div>
                            </a>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AIRecommendations;
