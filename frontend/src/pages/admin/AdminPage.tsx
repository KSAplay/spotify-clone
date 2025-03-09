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

  if (!isAdmin && !isLoading)
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="mb-4 text-3xl font-bold">Acceso Denegado</h1>
          <p className="mb-4">No tienes permisos para ver esta página.</p>
          <a href="/" className="text-blue-500 underline">
            Volver a la página principal
          </a>
        </div>
      </div>
    );

  return (
    <div className="flex h-screen max-h-screen justify-center bg-black p-2">
      <div className="flex h-full max-h-full w-full justify-center rounded-lg bg-gradient-to-b from-zinc-900 to-zinc-950 p-8 text-zinc-100">
        <div className="flex h-full min-h-full w-full max-w-screen-xl flex-col lg:justify-center">
          <Header />

          <DashboardStats />

          <Tabs defaultValue="songs" className="space-y-6">
            <TabsList className="mx-auto flex w-full max-w-full items-center bg-zinc-800/50 p-1 md:w-[400px]">
              <TabsTrigger
                value="songs"
                className="cursor-pointer px-2 dark:data-[state=active]:bg-zinc-700"
              >
                <Music className="mr-2 size-4" /> Canciones
              </TabsTrigger>
              <TabsTrigger
                value="albums"
                className="cursor-pointer px-2 dark:data-[state=active]:bg-zinc-700"
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
