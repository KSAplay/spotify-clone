import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useMusicStore } from "@/stores/useMusicStore";
import { Song } from "@/types";
import { Pause, Play } from "lucide-react";

const PlayButton = ({ song }: { song: Song }) => {
  const {
    currentSong,
    isPlaying,
    setCurrentSong,
    togglePlay,
    initializeQueue,
  } = usePlayerStore();
  const { featuredSongs, madeForYouSongs, trendingSongs } = useMusicStore();

  const isCurrentSong = currentSong?._id === song._id;

  const handlePlay = () => {
    if (isCurrentSong) {
      togglePlay();
    } else {
      // Crea una cola con todas las canciones disponibles
      const allSongs = [...featuredSongs, ...madeForYouSongs, ...trendingSongs];

      // Si tenemos canciones disponibles, inicializa la cola
      if (allSongs.length > 0) {
        const uniqueSongs = allSongs.filter(
          (s, index, self) => index === self.findIndex((t) => t._id === s._id),
        );
        initializeQueue(uniqueSongs);
      }

      setCurrentSong(song);
    }
  };

  return (
    <Button
      size={"icon"}
      onClick={handlePlay}
      className={`absolute right-4 aspect-square cursor-pointer bg-green-500 opacity-0 transition-all group-hover:translate-y-0 hover:scale-105 hover:bg-green-400 ${
        isCurrentSong ? "opacity-100" : "opacity-0 group-hover:opacity-100"
      }`}
    >
      {isCurrentSong && isPlaying ? (
        <Pause className="size-5 text-black" fill="black" />
      ) : (
        <Play className="size-5 text-black" fill="black" />
      )}
    </Button>
  );
};

export default PlayButton;
