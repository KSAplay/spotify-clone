import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useChatStore } from "@/stores/useChatStore";
import { User } from "@/types";
import { useUser } from "@clerk/clerk-react";
import { HeadphonesIcon, Music, UsersRound } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface FriendsActivityProps {
  isSidebarOpen?: boolean;
  isMobile?: boolean;
}

const FriendsActivity = ({
  isSidebarOpen = false,
  isMobile = false,
}: FriendsActivityProps) => {
  const { users, fetchUsers, onlineUsers, userActivities, setSelectedUser } =
    useChatStore();
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) fetchUsers();
  }, [fetchUsers, user]);

  const handleClickUser = (user: User) => {
    setSelectedUser(user);
    navigate("/chat");
  };

  return (
    <div
      className={cn(
        "flex flex-col bg-zinc-900",
        isMobile
          ? "h-full w-full"
          : `absolute right-0 z-20 h-screen w-[300px] transition-transform duration-300 md:relative md:h-full md:w-full md:translate-0 md:rounded-lg ${isSidebarOpen ? "translate-x-0" : "translate-x-[300px]"}`,
      )}
    >
      <div className="flex items-center justify-between border-b border-zinc-700 p-4">
        <div className="flex items-center gap-2">
          <UsersRound className="size-5 shrink-0" />
          <h2 className="font-semibold">Lo que están escuchando</h2>
        </div>
      </div>

      {!user && <LoginPrompt />}

      <ScrollArea className="flex-1">
        <div className="space-y-4 p-4">
          {users.map((user: User) => {
            const activity = userActivities.get(user.clerkId);
            const isPlaying = activity && activity !== "Inactivo";

            return (
              <div
                onClick={() => handleClickUser(user)}
                key={user.clerkId}
                className="group cursor-pointer rounded-md p-3 transition-colors hover:bg-zinc-800/50"
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar className="size-10 border border-zinc-800">
                      <AvatarImage src={user.imageUrl} alt={user.fullName} />
                      <AvatarFallback>{user.fullName[0]}</AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-zinc-900 ${onlineUsers.has(user.clerkId) ? "bg-green-500" : "bg-zinc-500"}`}
                      aria-hidden="true"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">
                        {user.fullName}
                      </span>
                      {isPlaying && (
                        <Music className="size-3.5 shrink-0 text-emerald-400" />
                      )}
                    </div>

                    {isPlaying ? (
                      <div className="mt-1">
                        <div className="mt-1 truncate text-sm font-medium text-emerald-400">
                          {activity.replace("Escuchando ", "").split(" de ")[0]}
                        </div>
                        <div className="truncate text-xs text-zinc-400">
                          {activity.split(" de ")[1]}
                        </div>
                      </div>
                    ) : (
                      <div className="mt-1 text-xs text-zinc-400">
                        {onlineUsers.has(user.clerkId)
                          ? "En línea"
                          : "Desconectado"}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default FriendsActivity;

const LoginPrompt = () => (
  <div className="flex h-full flex-col items-center justify-center space-y-4 p-6 text-center">
    <div className="relative">
      <div
        className="absolute -inset-1 animate-pulse rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 opacity-75 blur-lg"
        aria-hidden="true"
      />
      <div className="relative rounded-full bg-zinc-900 p-4">
        <HeadphonesIcon className="size-8 text-emerald-400" />
      </div>
    </div>

    <div className="max-w-[250px] space-y-2">
      <h3 className="text-lg font-semibold text-white">
        Mira lo que tus amigos están escuchando
      </h3>
      <p className="text-sm text-zinc-400">
        Inicia sesión para descubrir qué música están disfrutando tus amigos
        ahora mismo
      </p>
    </div>
  </div>
);
