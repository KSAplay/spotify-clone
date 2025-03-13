import UsersListSkeleton from "@/components/skeletons/UserListSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/stores/useChatStore";

const UserList = () => {
  const { users, selectedUser, isLoadingUsers, setSelectedUser, onlineUsers } =
    useChatStore();

  return (
    <div className="border-r border-zinc-800">
      <div className="flex h-full flex-col">
        <ScrollArea className="h-[calc(100vh-280px)]">
          <div className="space-y-2 p-4">
            {isLoadingUsers ? (
              <UsersListSkeleton />
            ) : (
              users.map((user) => (
                <div
                  key={user._id}
                  onClick={() => setSelectedUser(user)}
                  className={`flex cursor-pointer items-center justify-center gap-3 rounded-lg p-3 transition-colors lg:justify-start ${selectedUser?.clerkId === user.clerkId ? "bg-zinc-800" : "hover:bg-zinc-800/50"}`}
                >
                  <div className="relative">
                    <Avatar className="size-8 md:size-12">
                      <AvatarImage src={user.imageUrl} />
                      <AvatarFallback>{user.fullName[0]}</AvatarFallback>
                    </Avatar>
                    {/* online indicator */}
                    <div
                      className={`absolute right-0 bottom-0 size-2.5 rounded-full ring-2 ring-zinc-900 ${onlineUsers.has(user.clerkId) ? "bg-green-500" : "bg-zinc-500"}`}
                    />
                  </div>

                  <div className="hidden min-w-0 flex-1 lg:block">
                    <span className="truncate font-medium">
                      {user.fullName}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default UserList;
