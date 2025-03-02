import { useAuth } from "@clerk/clerk-react";
import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";

const updateApiToken = (token: string | null) => {
  if (token)
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete axiosInstance.defaults.headers.common["Authorization"];
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken /*, userId */ } = useAuth();
  const [loading, setLoading] = useState(true);
  const { checkAdminStatus } = useAuthStore();

  useEffect(() => {
    setLoading(true);
    const initAuth = async () => {
      try {
        const token = await getToken();
        updateApiToken(token);

        if (token) {
          await checkAdminStatus();
        }
      } catch (error: any) {
        updateApiToken(null);
        console.error("Error in AuthProvider", error);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, [checkAdminStatus, getToken]);

  if (loading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader className="size-8 animate-spin text-emerald-500" />
      </div>
    );

  return <>{children}</>;
};

export default AuthProvider;
