
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { ChevronDown, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const AuthModal = () => {
  const [isEmailAuth, setIsEmailAuth] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <>
      <DialogHeader className="space-y-4">
        <DialogTitle className="text-2xl text-center font-medium">
          {isEmailAuth ? (isSignUp ? "Create an account" : "Welcome back") : "Welcome to StylisH"}
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
            <Button variant="outline" className="w-full gap-2">
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
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
                control={form.control}
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
                {isSignUp ? "Sign Up" : "Sign In"}
              </Button>
            </form>
          </Form>
        )}
        
        <p className="text-center text-sm text-muted-foreground mt-2">
          {isEmailAuth ? (
            <>
              {isSignUp ? "Already have an account? " : "Don't have an account? "}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
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
            onClick={() => setIsEmailAuth(false)}
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
