import { useAuth } from "@clerk/clerk-react";
import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";

const updateApiToken = (token: string | null) => {
  if (token)
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete axiosInstance.defaults.headers.common["Authorization"];
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken /*, userId */ } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const initAuth = async () => {
      try {
        const token = await getToken();
        updateApiToken(token);

        if (token) {
          //TODO: Fetch user data
        }
      } catch (error) {
        updateApiToken(null);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, [getToken]);

  if (loading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader className="size-8 animate-spin text-emerald-500" />
      </div>
    );

  return <>{children}</>;
};

export default AuthProvider;
