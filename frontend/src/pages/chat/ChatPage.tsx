import Topbar from "@/components/Topbar";
import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import UserList from "./components/UserList";
import ChatHeader from "./components/ChatHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/utils/formatDate";
import MessageInput from "./components/MessageInput";
import MessagesSkeleton from "@/components/skeletons/MessagesSkeleton";

const ChatPage = () => {
  const { user } = useUser();
  const {
    messages,
    isLoadingMessages,
    selectedUser,
    fetchUsers,
    fetchMessages,
  } = useChatStore();

  useEffect(() => {
    if (user) fetchUsers();
  }, [fetchUsers, user]);

  useEffect(() => {
    if (selectedUser) fetchMessages(selectedUser.clerkId);
  }, [selectedUser, fetchMessages]);

  // console.log({ messages });

  return (
    <main className="h-full overflow-hidden rounded-lg bg-gradient-to-b from-zinc-900 to-zinc-950">
      <Topbar />

      <div className="grid h-[calc(100vh-180px)] grid-cols-[80px_1fr] lg:grid-cols-[300px_1fr]">
        <UserList />

        {/* chat message */}
        <div className="flex h-full flex-col">
          {selectedUser ? (
            <>
              <ChatHeader />

              {/* Messages */}
              <ScrollArea className="h-[calc(100vh-340px)]">
                <div className="space-y-4 p-4">
                  {isLoadingMessages ? (
                    <MessagesSkeleton />
                  ) : (
                    messages.map((message) => (
                      <div
                        key={message._id}
                        className={`flex items-start gap-3 ${
                          message.senderId === user?.id
                            ? "flex-row-reverse"
                            : ""
                        }`}
                      >
                        <Avatar className="size-8">
                          <AvatarImage
                            src={
                              message.senderId === user?.id
                                ? user.imageUrl
                                : selectedUser.imageUrl
                            }
                          />
                        </Avatar>

                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${message.senderId === user?.id ? "bg-green-500" : "bg-zinc-800"} `}
                        >
                          <p className="text-sm">{message.content}</p>
                          <span className="mt-1 block text-xs text-zinc-300">
                            {formatDate(message.createdAt)}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>

              <MessageInput />
            </>
          ) : (
            <NoConversationPlaceholder />
          )}
        </div>
      </div>
    </main>
  );
};

export default ChatPage;

const NoConversationPlaceholder = () => (
  <div className="flex h-full flex-col items-center justify-center space-y-6">
    <img src="/spotify.svg" alt="Spotify" className="size-16 animate-bounce" />
    <div className="text-center">
      <h3 className="mb-1 text-lg font-medium text-zinc-300">
        No has seleccionado una conversación
      </h3>
      <p className="text-sm text-zinc-500">
        Elige un amigo para empezar a chatear
      </p>
    </div>
  </div>
);
