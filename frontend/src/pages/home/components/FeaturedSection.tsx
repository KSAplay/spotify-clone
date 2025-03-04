import FeaturedGridSkeleton from "@/components/skeletons/FeaturedGridSkeleton";
import { useMusicStore } from "@/stores/useMusicStore";
import PlayButton from "./PlayButton";

const FeaturedSection = () => {
  const { isLoading, featuredSongs, error } = useMusicStore();

  if (isLoading) return <FeaturedGridSkeleton />;

  if (error) return <p className="mb-4 text-lg text-red-500">{error}</p>;

  return (
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {featuredSongs.map((song) => (
        <div
          key={song._id}
          className="group relative flex cursor-pointer items-center overflow-hidden rounded-md bg-zinc-700/20 transition-colors hover:bg-zinc-700/50"
        >
          <img
            src={song.imageUrl}
            alt={song.title}
            className="h-16 w-16 flex-shrink-0 object-cover sm:h-20 sm:w-20"
          />
          <div className="flex-1 p-4">
            <p className="truncate font-medium">{song.title}</p>
            <p className="truncate text-sm text-zinc-400">{song.artist}</p>
          </div>

          <PlayButton song={song} />
        </div>
      ))}
    </div>
  );
};

export default FeaturedSection;
