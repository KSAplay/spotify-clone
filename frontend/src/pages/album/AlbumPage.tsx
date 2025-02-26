import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Play, Ellipsis, CirclePlus, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { lightenColor } from "@/utils/lightenColor";
import { formatDuration } from "@/utils/formatDuration";

const AlbumPage = () => {
  const { albumId } = useParams();
  const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore();
  // const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();
  const [bgColorTop, setBgColorTop] = useState("#082040FF");
  // const [bgColorBottom, setBgColorBottom] = useState("#5038a0");;

  useEffect(() => {
    if (albumId) fetchAlbumById(albumId);
  }, [fetchAlbumById, albumId]);

  useEffect(() => {
    setBgColorTop(lightenColor(currentAlbum?.coverColor || "#FFFFFF"));
  }, [bgColorTop, currentAlbum]);

  if (isLoading) return null;

  return (
    <div className="h-full">
      {/* TODO: Arreglar que el fondo degradado no se encoja al reducir la altura */}
      <ScrollArea className="relative h-full rounded-lg bg-zinc-900">
        {/* Background gradient */}
        <div
          className="absolute inset-0 z-0 h-[1000px] rounded-lg"
          style={{
            background: `linear-gradient(180deg, ${bgColorTop} 0%, #18181b 45%, #18181b 100%)`,
          }}
          aria-hidden="true"
        />
        {/* Content */}
        <div className="relative z-10">
          <div className={`relative flex gap-6 p-6 pb-8`}>
            {/* bg gradient part one
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-900/0 to-zinc-900/30"
              aria-hidden="true"
            /> */}
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
                <span className="text-white" style={{ color: bgColorTop }}>
                  •
                </span>
                <span className="text-white" style={{ color: bgColorTop }}>
                  {currentAlbum?.releaseYear}
                </span>
                <span className="text-white" style={{ color: bgColorTop }}>
                  •
                </span>
                <span className="text-white" style={{ color: bgColorTop }}>
                  {currentAlbum?.songs.length} canciones
                </span>
              </div>
            </div>
          </div>

          {/* Play Button */}
          <div className="flex items-center gap-6 bg-black/30 p-6 backdrop-blur-sm">
            <Button
              size="icon"
              className="h-14 w-14 cursor-pointer rounded-full bg-green-500 transition-all duration-75 hover:scale-105 hover:bg-green-400"
            >
              <Play className="size-6 text-black" fill="black" />
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
            <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 border-b border-white/5 px-10 py-2 text-sm text-zinc-400">
              <div>#</div>
              <div>Título</div>
              <div className="flex items-center justify-center">
                Fecha de lanzamiento
              </div>
              <div className="flex items-center justify-end">
                <Clock className="h-4 w-4" />
              </div>
            </div>

            {/* songs list */}

            <div className="px-6">
              <div className="space-y-2 py-4">
                {currentAlbum?.songs.map((song, index) => {
                  //const isCurrentSong = currentSong?._id === song._id;
                  return (
                    <div
                      key={song._id}
                      //onClick={() => handlePlaySong(index)}
                      className={`group grid cursor-pointer grid-cols-[16px_4fr_2fr_1fr] gap-4 rounded-md px-4 py-2 text-sm text-zinc-400 hover:bg-white/5`}
                    >
                      <div className="flex items-center justify-center">
                        {/*{isCurrentSong && isPlaying ? (
                            <div className="size-4 text-green-500">♫</div>
                          ) : (*/}
                        <span className="group-hover:hidden">{index + 1}</span>
                        {/*)}
                          {!isCurrentSong && (*/}
                        <Play
                          className="hidden h-4 w-4 group-hover:block"
                          fill="#9f9fa9"
                        />
                        {/*)})*/}
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
                      <div className="flex items-center justify-end">
                        {formatDuration(song.duration)}
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
