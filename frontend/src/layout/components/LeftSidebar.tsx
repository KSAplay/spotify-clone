import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useMusicStore } from "@/stores/useMusicStore";
import { SignedIn } from "@clerk/clerk-react";
import { HomeIcon, Library, MessageCircle } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

interface LeftSidebarProps {
  isSidebarOpen?: boolean;
  isMobile?: boolean;
}

const LeftSidebar = ({ isSidebarOpen, isMobile = false }: LeftSidebarProps) => {
  const { albums, fetchAlbums, isLoadingAlbums } = useMusicStore();

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        isMobile
          ? "h-full w-full"
          : `absolute z-20 h-screen w-[300px] transition-transform duration-300 md:relative md:h-full md:w-full md:translate-0 ${isSidebarOpen ? "-translate-x-0" : "-translate-x-[400px]"}`,
      )}
    >
      {/* Navigation menu */}
      <div className={cn("bg-zinc-900 p-4", !isMobile && "md:rounded-lg")}>
        <div className="space-y-2">
          <Link
            to={"/"}
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "w-full justify-start text-white hover:bg-zinc-800",
              }),
            )}
          >
            <HomeIcon className="mr-2 size-5" />
            <span className={cn(isMobile ? "inline" : "hidden md:inline")}>
              Inicio
            </span>
          </Link>

          <SignedIn>
            <Link
              to={"/chat"}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className:
                    "w-full justify-start text-white hover:bg-zinc-800",
                }),
              )}
            >
              <MessageCircle className="mr-2 size-5" />
              <span className={cn(isMobile ? "inline" : "hidden md:inline")}>
                Mensajes
              </span>
            </Link>
          </SignedIn>
        </div>
      </div>

      {/* Library section */}
      <div
        className={cn("flex-1 bg-zinc-900 p-4", !isMobile && "md:rounded-lg")}
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center px-2 text-white">
            <Library className="mr-2 size-5" />
            <span>Listas de reproducción</span>
          </div>
        </div>

        <ScrollArea
          className={cn(
            isMobile ? "h-[calc(100vh-200px)]" : "h-[calc(100vh-300px)]",
          )}
        >
          <div className="space-y-2">
            {isLoadingAlbums && albums.length === 0 ? (
              <PlaylistSkeleton />
            ) : (
              albums.map((album) => (
                <Link
                  to={`/albums/${album._id}`}
                  key={album._id}
                  className="group flex cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-zinc-800"
                >
                  <img
                    src={album.imageUrl}
                    alt="Playlist img"
                    className="size-12 flex-shrink-0 rounded-md object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{album.title}</p>
                    <p className="truncate text-sm text-zinc-400">
                      Álbum • {album.artist}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeftSidebar;
