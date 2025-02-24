
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { Icons } from "@/components/icons"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { authService } from "@/services/authService"
import { RegisterRequest, LoginRequest } from "@/types/auth"
import { userStore } from "@/store/userStore"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  bio: z.string().max(160).optional(),
  profilePicture: z.string().optional(),
})

interface AuthModalProps {
  onClose?: () => void;
}

const AuthModal = ({ onClose = () => {} }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const { toast } = useToast()
  const [step, setStep] = useState(1) // Add steps for registration

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      bio: "",
      profilePicture: "",
    },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
          form.setValue("profilePicture", reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        toast({
          title: "Error",
          description: "Please upload an image file",
          variant: "destructive"
        });
      }
    }
  };

  const handleLogin = async (data: LoginRequest) => {
    setIsLoading(true);
    try {
      const response = await authService.login(data);
      toast({
        title: "Success",
        description: "Login successful!"
      });
      onClose();
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Error",
        description: "Login failed. Please check your credentials.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (data: RegisterRequest) => {
    setIsLoading(true);
    try {
      const response = await authService.register(data);
      
      userStore.setUserData({
        username: data.username,
        email: data.email,
        bio: data.bio || "New user",
        profilePicture: data.profilePicture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.username}`
      });

      toast({
        title: "Success",
        description: "Registration successful!"
      });
      
      onClose();
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Error",
        description: "Registration failed. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    authService.initiateGoogleAuth();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (isLogin) {
      await handleLogin({
        email: values.email,
        password: values.password
      });
    } else {
      if (step < 3) {
        setStep(step + 1);
        return;
      }
      await handleRegister({
        username: values.username,
        email: values.email,
        password: values.password,
        bio: values.bio,
        profilePicture: values.profilePicture
      });
    }
  };

  const renderRegisterStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Create a password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
      case 2:
        return (
          <FormField
            control={form.control}
            name="profilePicture"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Picture</FormLabel>
                <FormControl>
                  <div className="space-y-4">
                    {previewUrl && (
                      <div className="w-24 h-24 rounded-full overflow-hidden mx-auto">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="cursor-pointer"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      case 3:
        return (
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us about yourself..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      default:
        return null;
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          {isLogin ? "Login" : "Register"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[400px] p-0 gap-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <AlertDialogHeader className="p-6 pb-0">
          <AlertDialogTitle className="text-2xl">{isLogin ? "Welcome back" : "Create account"}</AlertDialogTitle>
          <AlertDialogDescription>
            {isLogin
              ? "Enter your details to sign in to your account."
              : `Step ${step} of 3: ${step === 1 ? 'Basic Info' : step === 2 ? 'Profile Picture' : 'Bio'}`}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="p-6 pt-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {isLogin ? (
                <>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your email"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your password"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              ) : (
                renderRegisterStep()
              )}

              <Button
                type="submit"
                className="w-full bg-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : isLogin ? (
                  "Sign In"
                ) : step < 3 ? (
                  "Continue"
                ) : (
                  "Create Account"
                )}
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setStep(1);
                }}
              >
                {isLogin
                  ? "New here? Create an account"
                  : "Already have an account? Sign in"}
              </Button>

              {!isLogin && step > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep(step - 1)}
                  className="w-full"
                >
                  Back to previous step
                </Button>
              )}

              <Separator />
              
              <Button 
                type="button"
                variant="outline" 
                className="w-full"
                onClick={handleGoogleLogin}
              >
                <Icons.google className="mr-2 h-4 w-4" />
                Continue with Google
              </Button>
            </form>
          </Form>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AuthModal;
