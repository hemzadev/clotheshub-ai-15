
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HomeNavbar from "@/components/HomeNavbar";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Heart, FolderPlus, Share2, MessageCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { staticPins, likedPins, wardrobes } from "@/data/staticData";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

const PinDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isWardrobeDialogOpen, setIsWardrobeDialogOpen] = useState(false);
  
  const pin = staticPins.find(p => p.id === id);
  const similarPins = staticPins.filter(p => 
    p.id !== id && p.type === pin?.type
  ).slice(0, 3);

  if (!pin) {
    return <div>Pin not found</div>;
  }

  const isLiked = likedPins.has(pin.id);

  const handleLike = () => {
    if (isLiked) {
      likedPins.delete(pin.id);
      pin.likes--;
    } else {
      likedPins.add(pin.id);
      pin.likes++;
    }
    // Force re-render
    window.location.reload();
  };

  const handleAddToWardrobe = (wardrobeId: string) => {
    const wardrobe = wardrobes.find(w => w.id === wardrobeId);
    if (wardrobe && !wardrobe.pins.find(p => p.id === pin.id)) {
      wardrobe.pins.push(pin);
      setIsWardrobeDialogOpen(false);
      toast({
        title: "Success",
        description: `Added to ${wardrobe.name}`
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <HomeNavbar />
      <div className="container max-w-6xl mx-auto pt-24 px-4">
        <Button
          variant="ghost"
          size="icon"
          className="mb-6 h-10 w-10 rounded-full"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img 
              src={pin.imageUrl} 
              alt={pin.title}
              className="w-full rounded-[1.5rem] object-cover"
            />
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                  onClick={() => {
                    if (wardrobes.length === 0) {
                      toast({
                        title: "No Wardrobes",
                        description: "Create a wardrobe first to save pins",
                        variant: "destructive"
                      });
                      return;
                    }
                    setIsWardrobeDialogOpen(true);
                  }}
                >
                  <FolderPlus className="h-5 w-5" />
                </Button>
                <Button variant="secondary" size="icon" className="h-10 w-10 rounded-full">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
              <Button
                variant={isLiked ? "default" : "secondary"}
                size="icon"
                className="h-10 w-10 rounded-full"
                onClick={handleLike}
              >
                <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
              </Button>
            </div>

            <h1 className="text-2xl font-semibold">{pin.title}</h1>
            <p className="text-muted-foreground">{pin.description}</p>

            <div className="flex items-center gap-3">
              <Avatar>
                <img src={pin.user.profilePicture} alt={pin.user.username} />
              </Avatar>
              <div>
                <Link to={`/user/${pin.user.username.toLowerCase()}`} className="font-medium hover:underline">
                  {pin.user.username}
                </Link>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Heart className={`h-5 w-5 ${isLiked ? "fill-current text-primary" : ""}`} />
                <span>{pin.likes} likes</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                <span>{Math.floor(pin.user.followers * 0.1)} comments</span>
              </div>
            </div>

            <Card className="p-4">
              <h3 className="font-medium mb-4">Similar Items</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {similarPins.map(similarPin => (
                  <Link 
                    key={similarPin.id}
                    to={`/pin/${similarPin.id}`}
                    className="block group"
                  >
                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                      <img 
                        src={similarPin.imageUrl} 
                        alt={similarPin.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-2">
                      <h4 className="text-sm font-medium truncate">{similarPin.title}</h4>
                      <p className="text-xs text-muted-foreground">by {similarPin.user.username}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={isWardrobeDialogOpen} onOpenChange={setIsWardrobeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add to Wardrobe</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-2">
              {wardrobes.map(wardrobe => (
                <Button
                  key={wardrobe.id}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handleAddToWardrobe(wardrobe.id)}
                >
                  <FolderPlus className="h-4 w-4 mr-2" />
                  {wardrobe.name}
                  <span className="ml-auto text-sm text-white/60">
                    {wardrobe.pins.length} items
                  </span>
                </Button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PinDetail;

