import SectionGridSkeleton from "@/components/skeletons/SectionGridSkeleton";
import { Button } from "@/components/ui/button";
import { Song } from "@/types";

interface SectionGridProps {
  title: string;
  songs: Song[];
  isLoading: boolean;
}

const SectionGrid = ({ title, songs, isLoading }: SectionGridProps) => {
  if (isLoading) return <SectionGridSkeleton />;

  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold sm:text-2xl">{title}</h2>
        <Button
          variant="link"
          className="cursor-pointer text-sm text-zinc-400 hover:text-white"
        >
          Mostrar todo
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {songs.map((song) => (
          <div
            key={song._id}
            className="group cursor-pointer rounded-md bg-zinc-700/20 p-4 transition-all hover:bg-zinc-700/40"
          >
            <div className="relative mb-4">
              <div className="aspect-square overflow-hidden rounded-md shadow-lg">
                <img
                  src={song.imageUrl}
                  alt={song.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
            <h3 className="mb-2 truncate font-medium">{song.title}</h3>
            <p className="truncate text-sm text-zinc-400">{song.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionGrid;
