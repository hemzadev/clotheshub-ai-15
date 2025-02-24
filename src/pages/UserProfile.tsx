
import { users } from "@/data/staticData";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HomeNavbar from "@/components/HomeNavbar";
import { Card } from "@/components/ui/card";

const UserProfile = () => {
  const { username } = useParams();
  const user = users.find(u => u.username.toLowerCase() === username?.toLowerCase());

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <HomeNavbar />
      <div className="container pt-24">
        <Card className="max-w-2xl mx-auto p-6 bg-white/5 border-white/10">
          <div className="flex items-center gap-6">
            <img 
              src={user.profilePicture} 
              alt={user.username} 
              className="w-24 h-24 rounded-full border-4 border-primary"
            />
            <div>
              <h1 className="text-2xl font-bold">{user.username}</h1>
              <p className="text-gray-400 mt-1">{user.bio}</p>
              <div className="flex gap-6 mt-4">
                <div>
                  <div className="text-xl font-semibold">{user.pins}</div>
                  <div className="text-sm text-gray-400">Pins</div>
                </div>
                <div>
                  <div className="text-xl font-semibold">{user.followers}</div>
                  <div className="text-sm text-gray-400">Followers</div>
                </div>
                <div>
                  <div className="text-xl font-semibold">{user.following}</div>
                  <div className="text-sm text-gray-400">Following</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <Button className="bg-primary hover:bg-primary/90">Follow</Button>
            <Button variant="outline" className="border-white/10 hover:bg-white/5">Message</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
