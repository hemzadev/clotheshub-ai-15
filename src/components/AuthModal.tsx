import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { ChevronDown, Mail, UserRound, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { authService } from "@/services/authService";
import { useNavigate } from "react-router-dom";

const credentialsSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
});

const pictureSchema = z.object({
  profilePicture: z.string().optional(),
});

const bioSchema = z.object({
  bio: z.string().max(150, "Bio must be less than 150 characters"),
});

const AuthModal = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isEmailAuth, setIsEmailAuth] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [signUpStep, setSignUpStep] = useState(1);
  const [profileImage, setProfileImage] = useState<string>("");
  const [userId, setUserId] = useState<number | null>(null);
  
  const credentialsForm = useForm<z.infer<typeof credentialsSchema>>({
    resolver: zodResolver(credentialsSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const pictureForm = useForm<z.infer<typeof pictureSchema>>({
    resolver: zodResolver(pictureSchema),
  });

  const bioForm = useForm<z.infer<typeof bioSchema>>({
    resolver: zodResolver(bioSchema),
    defaultValues: {
      bio: "",
    },
  });

  const onCredentialsSubmit = async (values: z.infer<typeof credentialsSchema>) => {
    try {
      if (isSignUp) {
        const response = await authService.register({
          email: values.email,
          password: values.password,
          username: values.username,
        });
        
        console.log('Registration response in modal:', response); // Debug log
        
        if (response && response.user && response.user.id) {
          setUserId(response.user.id);
          setSignUpStep(2);
          toast({
            title: "Account created successfully!",
            description: "Please set up your profile picture.",
          });
        } else {
          console.error('Invalid response structure:', response); // Debug log
          throw new Error("Failed to get user ID from response");
        }
      } else {
        await authService.login({
          email: values.email,
          password: values.password,
        });
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
        navigate('/home');
      }
    } catch (error) {
      console.error('Registration error:', error); // Debug log
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred during registration.",
      });
    }
  };

  const onPictureSubmit = async () => {
    if (!userId || !profileImage) return;

    try {
      await authService.updateProfile(userId, {
        profilePicture: profileImage,
      });
      setSignUpStep(3);
      toast({
        title: "Profile picture updated!",
        description: "Now let's add your bio.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile picture.",
      });
    }
  };

  const onBioSubmit = async (values: z.infer<typeof bioSchema>) => {
    if (!userId) return;

    try {
      await authService.updateProfile(userId, {
        bio: values.bio,
      });
      toast({
        title: "Profile completed!",
        description: "Welcome to StylisH!",
      });
      navigate('/home');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update bio.",
      });
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8088/oauth2/authorization/google";
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Create an image element to get dimensions
        const img = new Image();
        img.onload = () => {
          // Create canvas for resizing
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Calculate new dimensions while maintaining aspect ratio
          // Drastically reduced maximum dimension to 200px
          const maxDimension = 200;
          if (width > height && width > maxDimension) {
            height = (height * maxDimension) / width;
            width = maxDimension;
          } else if (height > maxDimension) {
            width = (width * maxDimension) / height;
            height = maxDimension;
          }
          
          // Set canvas dimensions
          canvas.width = width;
          canvas.height = height;
          
          // Draw and compress image
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, width, height);
            ctx.imageSmoothingQuality = 'low';
            ctx.drawImage(img, 0, 0, width, height);
            
            // Try initial compression
            let quality = 0.3; // Start with very low quality
            let dataUrl = canvas.toDataURL('image/jpeg', quality);
            
            // If still too large, reduce quality until it fits
            while (dataUrl.length > 8000 && quality > 0.1) {
              quality -= 0.05;
              dataUrl = canvas.toDataURL('image/jpeg', quality);
            }
            
            // If still too large, reduce dimensions
            if (dataUrl.length > 8000) {
              const scaleFactor = Math.sqrt(8000 / dataUrl.length);
              const newWidth = width * scaleFactor;
              const newHeight = height * scaleFactor;
              
              canvas.width = newWidth;
              canvas.height = newHeight;
              ctx.fillStyle = 'white';
              ctx.fillRect(0, 0, newWidth, newHeight);
              ctx.imageSmoothingQuality = 'low';
              ctx.drawImage(img, 0, 0, newWidth, newHeight);
              dataUrl = canvas.toDataURL('image/jpeg', 0.3);
            }
            
            console.log('Final image size:', dataUrl.length);
            setProfileImage(dataUrl);
          }
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <DialogHeader className="space-y-4">
        <DialogTitle className="text-2xl text-center font-medium">
          {isEmailAuth ? (
            isSignUp ? (
              signUpStep === 1 ? "Create an account" :
              signUpStep === 2 ? "Add a profile picture" :
              "Tell us about yourself"
            ) : "Welcome back"
          ) : "Welcome to StylisH"}
        </DialogTitle>
        {!isEmailAuth && (
          <p className="text-center text-muted-foreground">
            Join our community of fashion enthusiasts
          </p>
        )}
      </DialogHeader>
      
      <div className="flex flex-col gap-3 mt-4">
        {!isEmailAuth ? (
          <>
            <Button 
              variant="outline" 
              className="w-full gap-2"
              onClick={handleGoogleLogin}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-background px-2 text-muted-foreground">or continue with</span>
              </div>
            </div>
            <Button 
              className="w-full gap-2"
              variant="outline"
              onClick={() => setIsEmailAuth(true)}
            >
              <Mail className="w-4 h-4" />
              Continue with Email
            </Button>
          </>
        ) : (
          <>
            {isSignUp ? (
              signUpStep === 1 ? (
                <Form {...credentialsForm}>
                  <form onSubmit={credentialsForm.handleSubmit(onCredentialsSubmit)} className="space-y-4">
                    <FormField
                      control={credentialsForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="Choose a username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={credentialsForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={credentialsForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Enter your password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full bg-black text-white hover:bg-black/90">
                      Continue
                    </Button>
                  </form>
                </Form>
              ) : signUpStep === 2 ? (
                <Form {...pictureForm}>
                  <form onSubmit={pictureForm.handleSubmit(onPictureSubmit)} className="space-y-4">
                    <div className="flex flex-col items-center gap-4 mb-6">
                      <Avatar className="h-24 w-24 cursor-pointer relative group">
                        {profileImage ? (
                          <AvatarImage src={profileImage} className="object-cover" />
                        ) : (
                          <AvatarFallback>
                            <UserRound className="h-12 w-12 text-muted-foreground" />
                          </AvatarFallback>
                        )}
                        <div className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <ImageIcon className="h-8 w-8 text-white" />
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={handleImageUpload}
                        />
                      </Avatar>
                      <p className="text-sm text-muted-foreground">
                        Click to upload profile picture
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={() => setSignUpStep(1)}
                      >
                        Back
                      </Button>
                      <Button 
                        type="submit" 
                        className="flex-1 bg-black text-white hover:bg-black/90"
                        disabled={!profileImage}
                      >
                        Continue
                      </Button>
                    </div>
                  </form>
                </Form>
              ) : (
                <Form {...bioForm}>
                  <form onSubmit={bioForm.handleSubmit(onBioSubmit)} className="space-y-4">
                    <FormField
                      control={bioForm.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about yourself (max 150 characters)" 
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={() => setSignUpStep(2)}
                      >
                        Back
                      </Button>
                      <Button 
                        type="submit" 
                        className="flex-1 bg-black text-white hover:bg-black/90"
                      >
                        Complete Profile
                      </Button>
                    </div>
                  </form>
                </Form>
              )
            ) : (
              <Form {...credentialsForm}>
                <form onSubmit={credentialsForm.handleSubmit(onCredentialsSubmit)} className="space-y-4">
                  <FormField
                    control={credentialsForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={credentialsForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Enter your password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-black text-white hover:bg-black/90">
                    Sign In
                  </Button>
                </form>
              </Form>
            )}
          </>
        )}
        
        <p className="text-center text-sm text-muted-foreground mt-2">
          {isEmailAuth ? (
            <>
              {isSignUp ? "Already have an account? " : "Don't have an account? "}
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setSignUpStep(1);
                }}
                className="underline underline-offset-4 hover:text-black"
              >
                {isSignUp ? "Sign in" : "Sign up"}
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => {
                  setIsEmailAuth(true);
                  setIsSignUp(false);
                }}
                className="underline underline-offset-4 hover:text-black"
              >
                Sign in
              </button>
            </>
          )}
        </p>
        
        {isEmailAuth && (
          <Button
            variant="ghost"
            className="mt-2"
            onClick={() => {
              setIsEmailAuth(false);
              setSignUpStep(1);
            }}
          >
            <ChevronDown className="w-4 h-4 mr-2 rotate-90" />
            Back to all options
          </Button>
        )}
      </div>
    </>
  );
};

export default AuthModal;
