
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Edit } from "lucide-react";

interface ProfileCardProps {
  userData: {
    username: string;
    email: string;
    bio?: string;
    profilePicture?: string;
  } | null;
}

const ProfileCard = ({ userData }: ProfileCardProps) => {
  if (!userData) {
    return (
      <Card className="p-6 bg-white/5 border-white/10">
        <p className="text-white/60">Please register or sign in to view your profile</p>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-white/5 border-white/10">
      <div className="flex items-start gap-6">
        <div className="relative group">
          <Avatar className="h-24 w-24 border-2 border-primary">
            {userData.profilePicture ? (
              <AvatarImage src={userData.profilePicture} alt={userData.username} />
            ) : (
              <AvatarFallback className="text-lg">
                {userData.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
          <Button 
            size="icon" 
            className="absolute -bottom-2 -right-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold">{userData.username}</h2>
              <p className="text-white/60">{userData.email}</p>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
          {userData.bio && (
            <>
              <Separator className="my-4" />
              <div>
                <h3 className="text-sm font-medium text-white/60 mb-2">Bio</h3>
                <p className="text-white/80">{userData.bio}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;
