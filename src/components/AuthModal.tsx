
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

const AuthModal = () => {
  return (
    <>
      <DialogHeader className="space-y-4">
        <DialogTitle className="text-2xl text-center font-medium">Welcome to StylisH</DialogTitle>
        <p className="text-center text-muted-foreground">
          Join our community of fashion enthusiasts
        </p>
      </DialogHeader>
      <div className="flex flex-col gap-3 mt-4">
        <Button variant="outline" className="w-full gap-2">
          <Github className="w-4 h-4" />
          Continue with GitHub
        </Button>
        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-background px-2 text-muted-foreground">or continue with</span>
          </div>
        </div>
        <Button className="w-full bg-black text-white hover:bg-black/90">
          Sign Up with Email
        </Button>
        <p className="text-center text-sm text-muted-foreground mt-2">
          Already have an account?{" "}
          <a href="#" className="underline underline-offset-4 hover:text-black">
            Sign in
          </a>
        </p>
      </div>
    </>
  );
};

export default AuthModal;
