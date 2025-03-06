import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { formatTime } from "@/utils/formatTime";
import { SliderThumb } from "@radix-ui/react-slider";
import {
  Laptop2,
  ListMusic,
  Mic2,
  Pause,
  Play,
  Repeat,
  Repeat1,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume,
  Volume1,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const PlaybackControls = () => {
  const { currentSong, isPlaying, togglePlay, playNext, playPrevious } =
    usePlayerStore();
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<"off" | "all" | "one">("off");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleRepeatMode = () => {
    setRepeatMode((prevMode) => {
      if (prevMode === "off") return "all";
      if (prevMode === "all") return "one";
      return "off";
    });
  };

  useEffect(() => {
    audioRef.current = document.querySelector("audio");
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const updateDuration = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    const handleEnded = () => {
      usePlayerStore.setState({ isPlaying: false });
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong, isPlaying]);

  const handleSeek = (value: number[]) => {
    if (audioRef.current) audioRef.current.currentTime = value[0];
  };

  const handleAudioSeek = (e: React.PointerEvent) => {
    if (audioRef.current && isPlaying) {
      if (e.type === "pointerdown") {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  const handleMuted = () => {
    if (audioRef.current) {
      setIsMuted(!isMuted);
      audioRef.current.muted = !audioRef.current.muted;
    }
  };

  const handleShuffle = () => {
    setIsShuffle(!isShuffle);
  };

  return (
    <footer className="h-20 border-t border-zinc-800 bg-zinc-900 px-4 sm:h-24">
      <div className="mx-auto flex h-full max-w-[1800px] items-center justify-between">
        {/* currently playing song */}
        <div className="hidden w-[30%] min-w-[180px] items-center gap-4 sm:flex">
          {currentSong && (
            <>
              <img
                src={currentSong.imageUrl}
                alt={currentSong.title}
                className="h-14 w-14 rounded-md object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="cursor-pointer truncate font-medium hover:underline">
                  {currentSong.title}
                </div>
                <div className="cursor-pointer truncate text-sm text-zinc-400 hover:underline">
                  {currentSong.artist}
                </div>
              </div>
            </>
          )}
        </div>

        {/* player controls*/}
        <div className="flex max-w-full flex-1 flex-col items-center gap-2 sm:max-w-[45%]">
          <div className="flex items-center gap-4 sm:gap-6">
            <Button
              size="icon"
              variant="ghost"
              onClick={handleShuffle}
              className={`group hidden cursor-pointer hover:bg-zinc-900 sm:inline-flex ${isShuffle ? "text-emerald-400 hover:text-emerald-400" : "text-zinc-400 hover:text-white"}`}
            >
              <Shuffle className="size-5 group-hover:scale-105 group-active:scale-90" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="group cursor-pointer text-zinc-400 hover:bg-zinc-900 hover:text-white"
              onClick={playPrevious}
              disabled={!currentSong}
            >
              <SkipBack className="size-5 fill-zinc-400 stroke-zinc-400 group-hover:scale-105 group-hover:fill-white group-hover:stroke-white group-active:scale-90 group-active:fill-emerald-400 group-active:stroke-emerald-400" />
            </Button>

            <Button
              size="icon"
              className="group size-9 cursor-pointer rounded-full bg-white text-black hover:bg-white/80"
              onClick={togglePlay}
              disabled={!currentSong}
            >
              {isPlaying ? (
                <Pause
                  className="size-5 group-hover:scale-105 group-active:scale-90"
                  fill="black"
                />
              ) : (
                <Play
                  className="size-5 group-hover:scale-105 group-active:scale-90"
                  fill="black"
                />
              )}
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="group cursor-pointer hover:bg-zinc-900 hover:text-white"
              onClick={playNext}
              disabled={!currentSong}
            >
              <SkipForward className="size-5 fill-zinc-400 stroke-zinc-400 group-hover:scale-105 group-hover:fill-white group-hover:stroke-white group-active:scale-90 group-active:fill-emerald-400 group-active:stroke-emerald-400" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleRepeatMode}
              className={`group hidden cursor-pointer hover:bg-zinc-900 hover:text-white sm:inline-flex ${repeatMode !== "off" ? "text-emerald-400 hover:text-emerald-400" : "text-zinc-400"}`}
            >
              {repeatMode === "one" ? (
                <Repeat1 className="size-5 group-hover:scale-105 group-active:scale-90" />
              ) : (
                <Repeat className="size-5 group-hover:scale-105 group-active:scale-90" />
              )}
            </Button>
          </div>

          <div className="group hidden w-full items-center gap-2 sm:flex">
            <div className="text-xs text-zinc-400">
              {formatTime(currentTime)}
            </div>
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={1}
              className="w-full cursor-pointer"
              onPointerDown={handleAudioSeek}
              onPointerUp={handleAudioSeek}
              onValueChange={handleSeek}
            >
              <SliderThumb className="h-2 w-2 rounded-full bg-white shadow-sm" />
            </Slider>
            <div className="text-xs text-zinc-400">{formatTime(duration)}</div>
          </div>
        </div>

        {/* volume controls */}
        <div className="hidden w-[30%] min-w-[180px] items-center justify-end gap-4 sm:flex">
          <Button
            size="icon"
            variant="ghost"
            className="cursor-pointer text-zinc-400 hover:text-white"
          >
            <Mic2 className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="cursor-pointer text-zinc-400 hover:text-white"
          >
            <ListMusic className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="cursor-pointer text-zinc-400 hover:text-white"
          >
            <Laptop2 className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              className={`cursor-pointer ${isMuted ? "text-red-400 hover:text-red-400" : "text-zinc-400 hover:text-white"}`}
              onClick={handleMuted}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="h-4 w-4" />
              ) : volume < 20 ? (
                <Volume className="h-4 w-4" />
              ) : volume < 40 ? (
                <Volume1 className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>

            <Slider
              value={isMuted ? [0] : [volume]}
              max={100}
              step={1}
              disabled={isMuted}
              className="group w-24 hover:cursor-pointer sm:w-32"
              onValueChange={(value) => {
                setVolume(value[0]);
                if (audioRef.current) {
                  audioRef.current.volume = value[0] / 100;
                }
              }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PlaybackControls;
