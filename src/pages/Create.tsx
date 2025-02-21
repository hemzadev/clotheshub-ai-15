
import HomeNavbar from "@/components/HomeNavbar";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

const Create = () => {
  return (
    <div className="min-h-screen bg-background">
      <HomeNavbar />
      <div className="container max-w-5xl mx-auto pt-24">
        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-white/10 rounded-[1.5rem] bg-white/5">
          <Upload className="h-12 w-12 text-white/40 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Create a New Pin</h2>
          <p className="text-white/60 mb-4 text-center">
            Drag and drop an image or click to upload
          </p>
          <Button className="bg-primary hover:bg-primary/90">
            Choose File
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Create;
