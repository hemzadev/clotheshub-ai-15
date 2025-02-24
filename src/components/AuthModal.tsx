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
})

interface AuthModalProps {
  onClose?: () => void;
}

const AuthModal = ({ onClose = () => {} }: AuthModalProps) => {
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
      
      // Save user data to frontend store for demonstration
      userStore.setUserData({
        username: data.username,
        email: data.email,
        bio: "New user",
        profilePicture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.username}`
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
      await handleRegister({
        username: values.username,
        email: values.email,
        password: values.password
      });
    }
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
            <Button
              type="submit"
              className="w-full"
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
          </form>
        </Form>
        <AlertDialogFooter className="flex flex-col gap-4">
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </Button>
          <Separator />
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleGoogleLogin}
          >
            Continue with Google
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AuthModal;
