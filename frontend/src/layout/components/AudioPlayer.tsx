import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef } from "react";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const prevSongRef = useRef<string | null>(null);

  const { currentSong, isPlaying, playNext } = usePlayerStore();

  // Maneja la lógica de reproducción/pausa
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const playAudio = async () => {
      try {
        if (isPlaying) {
          await audio.play();
        } else {
          audio.pause();
        }
      } catch (error) {
        console.error("Error al reproducir audio:", error);
      }
    };

    playAudio();
  }, [isPlaying]);

  // Maneja cuando termina la canción
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      playNext();
    };

    const handleError = (e: Event) => {
      console.error("Error de audio:", e);
    };

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [playNext]);

  // Maneja los cambios de canción
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    const audio = audioRef.current;
    const isSongChange = prevSongRef.current !== currentSong?.audioUrl;

    if (isSongChange) {
      // Pausa el audio actual antes de cambiar la fuente
      audio.pause();
      audio.src = currentSong.audioUrl;
      audio.currentTime = 0;

      prevSongRef.current = currentSong.audioUrl;

      // Carga el nuevo audio
      audio.load();

      if (isPlaying) {
        // Espera un poco para que el audio se cargue antes de intentar reproducir
        setTimeout(async () => {
          try {
            await audio.play();
          } catch (error) {
            console.error("Error al reproducir nueva canción:", error);
          }
        }, 100);
      }
    }
  }, [currentSong, isPlaying]);

  return <audio ref={audioRef} />;
};

export default AudioPlayer;
