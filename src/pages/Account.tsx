
import { useState } from "react";
import HomeNavbar from "@/components/HomeNavbar";
import { userStore } from "@/store/userStore";
import { useToast } from "@/components/ui/use-toast";
import AccountNav from "@/components/AccountNav";
import ProfileCard from "@/components/ProfileCard";
import AccountSettings from "@/components/AccountSettings";

const Account = () => {
  const { toast } = useToast();
  const [userData, setUserData] = useState(userStore.getUserData());

  return (
    <div className="min-h-screen bg-background">
      <HomeNavbar />
      <div className="flex w-full pt-16">
        <AccountNav />
        <main className="flex-1 overflow-auto">
          <div className="container py-8">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-2xl font-semibold mb-8">Account Settings</h1>
              <ProfileCard userData={userData} />
              <AccountSettings />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Account;
