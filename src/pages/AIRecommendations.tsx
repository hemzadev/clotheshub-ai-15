
import { useState } from "react";
import HomeNavbar from "@/components/HomeNavbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Sparkles, Home as HomeIcon, PlusCircle, Grid, User, Settings, Upload, ExternalLink, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const AIRecommendations = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
          setShowRecommendations(false); // Reset recommendations when new image is uploaded
        };
        reader.readAsDataURL(file);
      } else {
        toast({
          title: "Error",
          description: "Please upload an image file",
          variant: "destructive"
        });
      }
    }
  };

  // Demo recommendations based on different detected styles
  const getRecommendationsForStyle = (style: string) => {
    const recommendationSets = {
      casual: [
        {
          category: "Similar Style Products",
          items: [
            {
              name: "Classic White Sneakers",
              price: "$79.99",
              image: "https://i.ibb.co/JDgm9MT/3395ce42d9f9a393d6971c74679d5d76.jpg",
              link: "https://www.nike.com/",
              store: "Nike"
            },
            {
              name: "Denim Jacket",
              price: "$89.99",
              image: "https://i.ibb.co/LdYxcj50/truck-jacket.jpg",
              link: "https://www.zara.com/",
              store: "Zara"
            }
          ]
        },
        {
          category: "Recommended Stores",
          items: [
            {
              name: "Urban Outfitters Collection",
              price: "Various",
              image: "https://i.ibb.co/F4V6jm40/d9056bb3325fd3fa2e78000d57f3cea6.jpg",
              link: "https://www.urbanoutfitters.com/",
              store: "Urban Outfitters"
            },
            {
              name: "H&M Basics",
              price: "Various",
              image: "https://i.ibb.co/rGWCJZj7/720f88eae35743c41c89fecae05a347f.jpg",
              link: "https://www.hm.com/",
              store: "H&M"
            }
          ]
        }
      ],
      formal: [
        {
          category: "Similar Style Products",
          items: [
            {
              name: "Slim Fit Suit",
              price: "$299.99",
              image: "https://i.ibb.co/F4V6jm40/d9056bb3325fd3fa2e78000d57f3cea6.jpg",
              link: "https://www.suitsupply.com/",
              store: "SuitSupply"
            },
            {
              name: "Oxford Dress Shoes",
              price: "$189.99",
              image: "https://i.ibb.co/LdYxcj50/truck-jacket.jpg",
              link: "https://www.allenedmonds.com/",
              store: "Allen Edmonds"
            }
          ]
        },
        {
          category: "Recommended Stores",
          items: [
            {
              name: "Brooks Brothers Collection",
              price: "Various",
              image: "https://i.ibb.co/JDgm9MT/3395ce42d9f9a393d6971c74679d5d76.jpg",
              link: "https://www.brooksbrothers.com/",
              store: "Brooks Brothers"
            },
            {
              name: "Hugo Boss Selection",
              price: "Various",
              image: "https://i.ibb.co/rGWCJZj7/720f88eae35743c41c89fecae05a347f.jpg",
              link: "https://www.hugoboss.com/",
              store: "Hugo Boss"
            }
          ]
        }
      ],
      streetwear: [
        {
          category: "Similar Style Products",
          items: [
            {
              name: "Graphic Hoodie",
              price: "$129.99",
              image: "https://i.ibb.co/JDgm9MT/3395ce42d9f9a393d6971c74679d5d76.jpg",
              link: "https://www.supreme.com/",
              store: "Supreme"
            },
            {
              name: "High-Top Sneakers",
              price: "$199.99",
              image: "https://i.ibb.co/LdYxcj50/truck-jacket.jpg",
              link: "https://www.nike.com/",
              store: "Nike"
            }
          ]
        },
        {
          category: "Recommended Stores",
          items: [
            {
              name: "BAPE Collection",
              price: "Various",
              image: "https://i.ibb.co/F4V6jm40/d9056bb3325fd3fa2e78000d57f3cea6.jpg",
              link: "https://www.bape.com/",
              store: "BAPE"
            },
            {
              name: "Off-White Selection",
              price: "Various",
              image: "https://i.ibb.co/rGWCJZj7/720f88eae35743c41c89fecae05a347f.jpg",
              link: "https://www.off---white.com/",
              store: "Off-White"
            }
          ]
        }
      ]
    };

    // Randomly select a style if not specified
    const styles = ['casual', 'formal', 'streetwear'];
    const selectedStyle = style || styles[Math.floor(Math.random() * styles.length)];
    return recommendationSets[selectedStyle as keyof typeof recommendationSets];
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
    
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Get random recommendations for demo
    const newRecommendations = getRecommendationsForStyle("");
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
                Upload a fashion image and get personalized product and store recommendations
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
                  <div className="space-y-4">
                    <div className="flex flex-col items-center">
                      <Upload className="h-12 w-12 text-white/40 mb-4" />
                      <p className="text-white/60 mb-4">
                        Upload a fashion image to get started
                      </p>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload">
                        <Button className="bg-primary hover:bg-primary/90">
                          Choose Image
                        </Button>
                      </label>
                    </div>
                  </div>
                )}
              </Card>

              {showRecommendations && recommendations.map((section, index) => (
                <div key={index} className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">{section.category}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {section.items.map((item, itemIndex) => (
                      <Card 
                        key={itemIndex}
                        className="p-4 bg-white/5 border-white/10 hover:bg-white/10 transition-colors"
                      >
                        <div className="flex gap-4">
                          <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium mb-1">{item.name}</h3>
                            <p className="text-sm text-white/60 mb-2">{item.price}</p>
                            <p className="text-sm text-white/60 mb-2">Store: {item.store}</p>
                            <a 
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-sm text-primary hover:text-primary/80"
                            >
                              Visit Store
                              <ExternalLink className="h-4 w-4 ml-1" />
                            </a>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AIRecommendations;
