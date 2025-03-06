import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Play, Ellipsis, CirclePlus, Clock, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { lightenColor } from "@/utils/lightenColor";
import { formatTime } from "@/utils/formatTime";
import { usePlayerStore } from "@/stores/usePlayerStore";

const AlbumPage = () => {
  const { albumId } = useParams();
  const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore();
  const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();
  const [textColor, setTextColor] = useState("#082040FF");

  useEffect(() => {
    if (albumId) fetchAlbumById(albumId);
  }, [fetchAlbumById, albumId]);

  useEffect(() => {
    setTextColor(lightenColor(currentAlbum?.coverColor || "#FFFFFF"));
  }, [setTextColor, currentAlbum]);

  if (isLoading) return null;

  const handlePlayAlbum = () => {
    if (!currentAlbum) return;
    const isCurrentAlbumPlaying = currentAlbum?.songs.some(
      (song) => song._id === currentSong?._id,
    );

    if (isCurrentAlbumPlaying) togglePlay();
    else {
      // start playing the album from the beginning
      playAlbum(currentAlbum?.songs, 0);
    }
  };

  const handlePlaySong = (index: number) => {
    if (!currentAlbum) return;
    playAlbum(currentAlbum?.songs, index);
  };

  return (
    <div className="h-full">
      <ScrollArea className="relative h-full rounded-lg bg-zinc-900">
        {/* Background gradient */}
        <div
          className="absolute inset-0 z-0 h-[1000px] rounded-lg"
          style={{
            background: `linear-gradient(180deg, ${currentAlbum?.coverColor} 0%, #18181b 45%, #18181b 100%)`,
          }}
          aria-hidden="true"
        />
        {/* Content */}
        <div className="relative z-10">
          <div className={`relative flex gap-6 p-6 pb-8`}>
            <img
              src={currentAlbum?.imageUrl}
              alt={currentAlbum?.title}
              className="h-[240px] w-[240px] rounded shadow-xl"
            />
            <div className="flex flex-col justify-end">
              <p className="text-sm font-medium">Álbum</p>
              <h1 className="my-4 text-7xl font-bold">{currentAlbum?.title}</h1>
              <div className="flex items-center gap-1 text-sm font-semibold">
                <span className="font-bold text-white">
                  {currentAlbum?.artist}
                </span>
                <span className="text-white" style={{ color: textColor }}>
                  •
                </span>
                <span className="text-white" style={{ color: textColor }}>
                  {currentAlbum?.releaseYear}
                </span>
                <span className="text-white" style={{ color: textColor }}>
                  •
                </span>
                <span className="text-white" style={{ color: textColor }}>
                  {currentAlbum?.songs.length} canciones
                </span>
              </div>
            </div>
          </div>

          {/* Play Button */}
          <div className="flex items-center gap-6 bg-black/30 p-6 backdrop-blur-sm">
            <Button
              onClick={handlePlayAlbum}
              size="icon"
              className="h-14 w-14 cursor-pointer rounded-full bg-green-500 transition-all duration-75 hover:scale-105 hover:bg-green-400"
            >
              {isPlaying &&
              currentAlbum?.songs.some(
                (song) => song._id === currentSong?._id,
              ) ? (
                <Pause className="size-6 text-black" fill="black" />
              ) : (
                <Play className="size-6 text-black" fill="black" />
              )}
            </Button>
            <Button
              size="icon"
              variant={"ghost"}
              className="h-14 w-14 cursor-pointer transition-all duration-75 hover:scale-110 hover:bg-transparent"
            >
              <CirclePlus className="size-8 text-gray-300" />
            </Button>
            <Button
              size="icon"
              variant={"ghost"}
              className="h-14 w-auto cursor-pointer gap-0 p-0 transition-all duration-75 hover:scale-110 hover:bg-transparent"
            >
              <Ellipsis className="size-7 text-gray-300" />
            </Button>
          </div>

          {/* Table Section */}
          <div className="bg-black/30 backdrop-blur-sm">
            {/* table header */}
            <div className="grid grid-cols-[16px_3fr_4fr_0.3fr] gap-4 border-b border-white/5 px-10 py-2 text-sm text-zinc-400">
              <div>#</div>
              <div>Título</div>
              <div className="flex items-center justify-center">
                Fecha de lanzamiento
              </div>
              <div className="flex items-center justify-center">
                <Clock className="size-4" />
              </div>
            </div>

            {/* songs list */}

            <div className="px-6">
              <div className="space-y-2 py-4">
                {currentAlbum?.songs.map((song, index) => {
                  const isCurrentSong = currentSong?._id === song._id;
                  return (
                    <div
                      key={song._id}
                      onClick={() => handlePlaySong(index)}
                      className={`group grid cursor-pointer grid-cols-[16px_3fr_4fr_0.3fr] gap-4 rounded-md px-4 py-2 text-sm text-zinc-400 hover:bg-white/5`}
                    >
                      <div className="flex items-center justify-center">
                        {isCurrentSong && isPlaying ? (
                          <div className="size-4 text-green-500">♫</div>
                        ) : (
                          <span className="group-hover:hidden">
                            {index + 1}
                          </span>
                        )}
                        {!isCurrentSong && (
                          <Play
                            className="hidden h-4 w-4 text-white group-hover:block"
                            fill="white"
                          />
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <img
                          src={song.imageUrl}
                          alt={song.title}
                          className="size-10"
                        />

                        <div>
                          <div className={`font-medium text-white`}>
                            {song.title}
                          </div>
                          <div>{song.artist}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        {song.createdAt.split("T")[0]}
                      </div>
                      <div className="relative flex items-center justify-center">
                        {formatTime(song.duration)}
                        <div className="absolute -left-8 hidden items-center justify-center group-hover:flex">
                          <CirclePlus className="size-5" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AlbumPage;
