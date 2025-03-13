import Topbar from "@/components/Topbar";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import FeaturedSection from "./components/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "./components/SectionGrid";

const HomePage = () => {
  const {
    fetchFeaturedSongs,
    fetchMadeForYouSongs,
    fetchTrendingSongs,
    isLoadingMadeForYouSongs,
    isLoadingTrendingSongs,
    madeForYouSongs,
    trendingSongs,
  } = useMusicStore();

  useEffect(() => {
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();
  }, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);

  return (
    <main className="h-full overflow-hidden rounded-lg bg-gradient-to-b from-zinc-900 to-zinc-950">
      <Topbar />
      <ScrollArea className="h-full">
        <div className="p-4 sm:p-6">
          <h1 className="mb-6 text-2xl font-bold sm:text-3xl">Buenos días</h1>
          <FeaturedSection />

          <div className="space-y-8">
            <SectionGrid
              title="Para ti"
              songs={madeForYouSongs}
              isLoading={isLoadingMadeForYouSongs}
              updateSongs={fetchMadeForYouSongs}
            />
            <SectionGrid
              title="Tendencias"
              songs={trendingSongs}
              isLoading={isLoadingTrendingSongs}
              updateSongs={fetchTrendingSongs}
            />
          </div>
        </div>
      </ScrollArea>
    </main>
  );
};

export default HomePage;
