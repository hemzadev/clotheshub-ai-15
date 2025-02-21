
import { useParams, useNavigate } from "react-router-dom";
import HomeNavbar from "@/components/HomeNavbar";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Heart, Bookmark, Share2, MessageCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PinDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock data - in a real app, this would come from an API
  const pin = {
    id: Number(id),
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    title: "Amazing Fashion Design",
    description: "This is a beautiful design that combines modern and classic elements.",
    likes: 1234,
    saves: 567,
    comments: [
      {
        id: 1,
        user: {
          name: "Sarah Wilson",
          avatar: "https://ui.shadcn.com/avatars/01.png"
        },
        text: "This is absolutely stunning! Love the design.",
        timestamp: "2 hours ago"
      },
      {
        id: 2,
        user: {
          name: "John Creative",
          avatar: "https://ui.shadcn.com/avatars/02.png"
        },
        text: "The color combination is perfect!",
        timestamp: "1 day ago"
      }
    ],
    user: {
      name: "Design Master",
      avatar: "https://ui.shadcn.com/avatars/03.png"
    },
    similarPins: [
      {
        id: 101,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
        title: "Similar Design 1",
        height: 400,
        user: {
          name: "Interior Design",
          avatar: "https://ui.shadcn.com/avatars/05.png"
        }
      },
      {
        id: 102,
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
        title: "Similar Design 2",
        height: 380,
        user: {
          name: "Home Decor",
          avatar: "https://ui.shadcn.com/avatars/06.png"
        }
      },
      {
        id: 103,
        image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
        title: "Similar Design 3",
        height: 420,
        user: {
          name: "Style Maven",
          avatar: "https://ui.shadcn.com/avatars/07.png"
        }
      }
    ]
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
          {/* Left Column - Image */}
          <div>
            <img 
              src={pin.image} 
              alt={pin.title}
              className="w-full rounded-[1.5rem] object-cover"
            />
          </div>

          {/* Right Column - Info */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Button variant="secondary" size="icon" className="h-10 w-10 rounded-full">
                  <Share2 className="h-5 w-5" />
                </Button>
                <Button variant="secondary" size="icon" className="h-10 w-10 rounded-full">
                  <Bookmark className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <h1 className="text-2xl font-semibold">{pin.title}</h1>
            <p className="text-muted-foreground">{pin.description}</p>

            <div className="flex items-center gap-3">
              <Avatar>
                <img src={pin.user.avatar} alt={pin.user.name} />
              </Avatar>
              <div>
                <Link to={`/user/${pin.user.name}`} className="font-medium hover:underline">
                  {pin.user.name}
                </Link>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                <span>{pin.likes.toLocaleString()} likes</span>
              </div>
              <div className="flex items-center gap-2">
                <Bookmark className="h-5 w-5" />
                <span>{pin.saves.toLocaleString()} saves</span>
              </div>
            </div>

            <Card className="p-4">
              <h3 className="font-medium mb-4 flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Comments
              </h3>
              <div className="space-y-4">
                {pin.comments.map(comment => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar>
                      <img src={comment.user.avatar} alt={comment.user.name} />
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <Link to={`/user/${comment.user.name}`} className="font-medium hover:underline">
                          {comment.user.name}
                        </Link>
                        <span className="text-sm text-muted-foreground">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm mt-1">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <div>
              <h3 className="font-medium mb-4">Similar Items</h3>
              <div className="columns-2 sm:columns-3 gap-4 [column-fill:_balance]">
                {pin.similarPins.map(similarPin => (
                  <div 
                    key={similarPin.id}
                    className="break-inside-avoid mb-4 group relative rounded-[1.5rem] overflow-hidden bg-card hover:bg-muted/10 transition-colors"
                  >
                    <Link to={`/pin/${similarPin.id}`} className="block">
                      <div className="relative overflow-hidden rounded-[1.5rem] p-2">
                        <div
                          className="w-full"
                          style={{
                            paddingBottom: `${(similarPin.height / (similarPin.height > 400 ? 2 : 1))}px`,
                            position: 'relative'
                          }}
                        >
                          <img 
                            src={similarPin.image} 
                            alt={similarPin.title}
                            className="absolute inset-0 w-full h-full object-cover rounded-[1.25rem] transition-all duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="absolute inset-2 rounded-[1.25rem] bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      </div>
                    </Link>
                    <div className="p-4 flex items-center gap-3">
                      <Link to={`/user/${similarPin.user.name.toLowerCase().replace(/\s+/g, '-')}`} className="hover:opacity-80 transition-opacity">
                        <Avatar className="border-2 border-border">
                          <img src={similarPin.user.avatar} alt={similarPin.user.name} />
                        </Avatar>
                      </Link>
                      <Link 
                        to={`/user/${similarPin.user.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-sm text-foreground/90 font-medium hover:text-foreground transition-colors"
                      >
                        {similarPin.user.name}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PinDetail;
