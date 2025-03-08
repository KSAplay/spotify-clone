import { useAuthStore } from "@/stores/useAuthStore";
import Header from "./components/Header";
import DashboardStats from "./components/DashboardStats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Album, Music } from "lucide-react";
import SongsTabContent from "./components/SongsTabContent";
import AlbumsTabContent from "./components/AlbumsTabContent";
import { useEffect } from "react";
import { useMusicStore } from "@/stores/useMusicStore";

const AdminPage = () => {
  const { isAdmin, isLoading } = useAuthStore();
  const { fetchAlbums, fetchSongs, fetchStats } = useMusicStore();

  useEffect(() => {
    fetchAlbums();
    fetchSongs();
    fetchStats();
  }, [fetchAlbums, fetchSongs, fetchStats]);

  if (!isAdmin && !isLoading) return <div>Unauthorized</div>;

  return (
    <div className="flex h-screen min-h-screen items-center justify-center bg-black p-2">
      <div className="min-h-full w-full rounded-lg bg-gradient-to-b from-zinc-900 to-zinc-950 p-8 text-zinc-100 flex items-center justify-center">
        <div className="w-full flex max-w-screen-lg flex-col justify-center">
          <Header />

          <DashboardStats />

          <Tabs defaultValue="songs" className="space-y-6">
            <TabsList className="bg-zinc-800/50 p-1">
              <TabsTrigger
                value="songs"
                className="cursor-pointer dark:data-[state=active]:bg-zinc-700"
              >
                <Music className="mr-2 size-4" /> Canciones
              </TabsTrigger>
              <TabsTrigger
                value="albums"
                className="cursor-pointer dark:data-[state=active]:bg-zinc-700"
              >
                <Album className="mr-2 size-4" /> Álbumes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="songs">
              <SongsTabContent />
            </TabsContent>
            <TabsContent value="albums">
              <AlbumsTabContent />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
