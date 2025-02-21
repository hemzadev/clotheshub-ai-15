
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

const WhatsNewModal = () => {
  return (
    <>
      <DialogHeader className="space-y-4">
        <DialogTitle className="text-2xl text-center font-medium text-foreground">
          What's New in StylisH
        </DialogTitle>
        <p className="text-center text-accent">
          Exciting new features and updates
        </p>
      </DialogHeader>
      <div className="mt-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-foreground">AI Style Assistant</h3>
          <p className="text-sm text-foreground/80">
            Get personalized outfit recommendations based on your style preferences and occasion.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-foreground">Community Features</h3>
          <p className="text-sm text-foreground/80">
            Share your outfits, get inspiration from others, and join style challenges.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-foreground">Smart Wardrobe</h3>
          <p className="text-sm text-foreground/80">
            Organize your clothes digitally and get mix-and-match suggestions.
          </p>
        </div>
      </div>
    </>
  );
};

export default WhatsNewModal;
