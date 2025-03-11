import { useAuth } from "@clerk/clerk-react";
import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";

const updateApiToken = (token: string | null) => {
  if (token)
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete axiosInstance.defaults.headers.common["Authorization"];
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken, userId } = useAuth();
  const [loading, setLoading] = useState(true);
  const { checkAdminStatus } = useAuthStore();
  const { initSocket, disconnectSocket } = useChatStore();

  useEffect(() => {
    setLoading(true);
    const initAuth = async () => {
      try {
        const token = await getToken();
        updateApiToken(token);

        if (token) {
          await checkAdminStatus();
          // init socket
          if (userId) initSocket(userId);
        }
      } catch (error: any) {
        updateApiToken(null);
        console.error("Error in AuthProvider", error);
      } finally {
        setLoading(false);
      }
    };
    initAuth();

    // cleanup
    return () => disconnectSocket();
  }, [checkAdminStatus, disconnectSocket, getToken, initSocket, userId]);

  if (loading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader className="size-8 animate-spin text-emerald-500" />
      </div>
    );

  return <>{children}</>;
};

export default AuthProvider;
