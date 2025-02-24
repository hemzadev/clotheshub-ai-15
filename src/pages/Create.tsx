
import HomeNavbar from "@/components/HomeNavbar";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Home as HomeIcon, PlusCircle, Grid, User, Settings, Sparkles } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { staticPins, users } from "@/data/staticData";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const Create = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("PRODUCT");
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!previewUrl || !title) {
      toast({
        title: "Error",
        description: "Please fill in all required fields and upload an image",
        variant: "destructive"
      });
      return;
    }

    const newPin = {
      id: (staticPins.length + 1).toString(),
      title,
      description,
      type,
      imageUrl: previewUrl,
      user: users[0] // Using first user as the creator
    };

    // Add the new pin to the static data
    staticPins.push(newPin);
    
    toast({
      title: "Success",
      description: "Pin created successfully!"
    });

    // Navigate to the home page
    navigate("/home");
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
          <div className="container max-w-2xl mx-auto pt-8">
            <Card className="p-6 bg-white/5 border-white/10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-white/10 rounded-[1.5rem] bg-white/5">
                  {previewUrl ? (
                    <div className="relative w-full max-w-md aspect-[3/4] rounded-lg overflow-hidden">
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                      <Button
                        type="button"
                        onClick={() => {
                          setSelectedFile(null);
                          setPreviewUrl("");
                        }}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600"
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-12 w-12 text-white/40 mb-4" />
                      <h2 className="text-xl font-semibold mb-2">Create a New Pin</h2>
                      <p className="text-white/60 mb-4 text-center">
                        Drag and drop an image or click to upload
                      </p>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload">
                        <Button type="button" className="bg-primary hover:bg-primary/90">
                          Choose File
                        </Button>
                      </label>
                    </>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Add a title"
                      className="bg-white/5 border-white/10"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Add a detailed description"
                      className="bg-white/5 border-white/10"
                    />
                  </div>

                  <div>
                    <Label>Type</Label>
                    <RadioGroup defaultValue="PRODUCT" onValueChange={setType} className="mt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="PRODUCT" id="product" />
                        <Label htmlFor="product">Product</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="OUTFIT" id="outfit" />
                        <Label htmlFor="outfit">Outfit</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  Create Pin
                </Button>
              </form>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Create;
