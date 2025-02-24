
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const AccountSettings = () => {
  return (
    <div className="mt-8 space-y-4">
      <Card className="p-6 bg-white/5 border-white/10">
        <h3 className="text-lg font-medium mb-2">Privacy Settings</h3>
        <p className="text-white/60 mb-4">Manage your privacy preferences</p>
        <Button variant="outline" className="border-white/10 hover:bg-white/5">
          Manage Privacy
        </Button>
      </Card>
      
      <Card className="p-6 bg-white/5 border-white/10">
        <h3 className="text-lg font-medium mb-2">Security</h3>
        <p className="text-white/60 mb-4">Update your security settings</p>
        <Button variant="outline" className="border-white/10 hover:bg-white/5">
          Security Settings
        </Button>
      </Card>
    </div>
  );
};

export default AccountSettings;
