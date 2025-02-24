
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

const OAuth2Callback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const refreshToken = urlParams.get('refreshToken');
    const error = urlParams.get('error');

    if (token && refreshToken) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      toast({
        title: "Successfully logged in!",
        description: "Welcome to StylisH",
      });
      navigate('/home');
    } else {
      toast({
        variant: "destructive",
        title: "Authentication failed",
        description: error || "Could not complete authentication",
      });
      navigate('/');
    }
  }, [navigate, toast]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  );
};

export default OAuth2Callback;
