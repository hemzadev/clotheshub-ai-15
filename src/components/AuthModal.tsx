import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
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
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import {
  ChangeEvent,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { authService } from "@/services/authService";
import { RegisterRequest } from "@/types/auth";
import { userStore } from "@/store/userStore";

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
})

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal = ({ onClose }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  const handleLogin = async (data: Omit<RegisterRequest, 'username'>) => {
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
    try {
      const response = await authService.register(data);
      
      // Save user data to frontend store for demonstration
      userStore.setUserData({
        username: data.username,
        email: data.email,
        bio: "New user",  // Default bio
        profilePicture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.username}` // Default avatar
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
    }
  };

  const handleGoogleLogin = async () => {
    authService.initiateGoogleAuth();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          {isLogin ? "Login" : "Register"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{isLogin ? "Login" : "Register"}</AlertDialogTitle>
          <AlertDialogDescription>
            {isLogin
              ? "Enter your email and password to access your account."
              : "Create an account to start pinning."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {!isLogin && (
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
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
          </form>
        </Form>
        <AlertDialogFooter>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </Button>
          <Button
            onClick={() => {
              if (isLogin) {
                form.handleSubmit(async (data) => {
                  await handleLogin(data);
                })();
              } else {
                form.handleSubmit(async (data) => {
                  await handleRegister(data);
                })();
              }
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              isLogin ? "Login" : "Register"
            )}
          </Button>
        </AlertDialogFooter>
        <Separator className="my-4" />
        <Button variant="outline" onClick={handleGoogleLogin}>
          Continue with Google
        </Button>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AuthModal;
