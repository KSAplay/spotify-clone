import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { axiosInstance } from "@/lib/axios";
import { useMusicStore } from "@/stores/useMusicStore";
import { Upload, Plus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface NewSong {
  title: string;
  artist: string;
  album: string;
  duration: string;
}

const AddSongDialog = () => {
  const { albums, fetchSongs, fetchAlbums } = useMusicStore();
  const [songDialogOpen, setSongDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [newSong, setNewSong] = useState<NewSong>({
    title: "",
    artist: "",
    album: "",
    duration: "0",
  });

  const [files, setFiles] = useState<{
    audio: File | null;
    image: File | null;
  }>({
    audio: null,
    image: null,
  });

  const audioInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      if (!files.audio || !files.image) {
        throw new Error("Por favor sube un archivo de audio y una imagen");
      }

      const formData = new FormData();

      formData.append("title", newSong.title);
      formData.append("artist", newSong.artist);
      formData.append("duration", newSong.duration);

      if (newSong.album && newSong.album !== "none") {
        formData.append("albumId", newSong.album);
      }

      formData.append("audioFile", files.audio);
      formData.append("imageFile", files.image);

      await axiosInstance.post("/admin/songs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setNewSong({
        title: "",
        artist: "",
        album: "",
        duration: "0",
      });

      setFiles({
        audio: null,
        image: null,
      });

      toast.success("Canción añadida exitosamente");
      fetchSongs();
      fetchAlbums();
      setSongDialogOpen(false);
    } catch (error: any) {
      toast.error("Error al añadir la canción: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!files.audio || !files.audio.type.startsWith("audio")) return;
    const audio = new Audio(URL.createObjectURL(files.audio));
    audio.onloadedmetadata = () => {
      setNewSong((prev) => ({
        ...prev,
        duration: Math.floor(audio.duration).toString(),
      }));
    };
  }, [files.audio]);

  return (
    <Dialog open={songDialogOpen} onOpenChange={setSongDialogOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer bg-green-400 text-black hover:bg-green-500">
          <Plus className="h-4 w-4 md:mr-2" />
          <span className="hidden md:inline-block">Añadir Canción</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[80vh] overflow-auto border-zinc-700 bg-zinc-900">
        <DialogHeader>
          <DialogTitle>Añadir Nueva Canción</DialogTitle>
          <DialogDescription>
            Añade una nueva canción a tu biblioteca musical
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <input
            type="file"
            accept="audio/*"
            ref={audioInputRef}
            hidden
            onChange={(e) =>
              setFiles((prev) => ({ ...prev, audio: e.target.files![0] }))
            }
          />

          <input
            type="file"
            ref={imageInputRef}
            className="hidden"
            accept="image/*"
            onChange={(e) =>
              setFiles((prev) => ({ ...prev, image: e.target.files![0] }))
            }
          />

          {/* image upload area */}
          <div
            className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-zinc-700 p-6"
            onClick={() => imageInputRef.current?.click()}
          >
            <div className="text-center">
              {files.image ? (
                <div className="h- relative">
                  <img
                    src={URL.createObjectURL(files.image)}
                    alt="Preview"
                    className="max-h-80 rounded-lg"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute -top-4 -right-4 cursor-pointer rounded-full"
                    onClick={() =>
                      setFiles((prev) => ({ ...prev, image: null }))
                    }
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mb-2 inline-block rounded-full bg-zinc-800 p-3">
                    <Upload className="h-6 w-6 text-zinc-400" />
                  </div>
                  <div className="mb-2 text-sm text-zinc-400">
                    Subir portada
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer text-xs"
                  >
                    Elegir Archivo
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Audio upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Archivo de Audio</label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => audioInputRef.current?.click()}
                className="w-full cursor-pointer"
              >
                {files.audio
                  ? files.audio.name.slice(0, 20)
                  : "Elegir Archivo de Audio"}
              </Button>
            </div>
          </div>

          {/* other fields */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Título</label>
            <Input
              value={newSong.title}
              onChange={(e) =>
                setNewSong({ ...newSong, title: e.target.value })
              }
              className="border-zinc-700 bg-zinc-800"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Artista</label>
            <Input
              value={newSong.artist}
              onChange={(e) =>
                setNewSong({ ...newSong, artist: e.target.value })
              }
              className="border-zinc-700 bg-zinc-800"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Álbum (Opcional)</label>
            <Select
              value={newSong.album}
              onValueChange={(value) =>
                setNewSong({ ...newSong, album: value })
              }
            >
              <SelectTrigger className="w-full cursor-pointer border-zinc-700 bg-zinc-800">
                <SelectValue placeholder="Select album" />
              </SelectTrigger>
              <SelectContent className="border-zinc-700 bg-zinc-800">
                <SelectItem value="none" className="cursor-pointer">
                  Sin Álbum (Sencillo)
                </SelectItem>
                {albums.map((album) => (
                  <SelectItem
                    key={album._id}
                    value={album._id}
                    className="cursor-pointer"
                  >
                    {album.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setSongDialogOpen(false)}
            disabled={isLoading}
            className="cursor-pointer"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="cursor-pointer"
          >
            {isLoading ? "Subiendo..." : "Subir Canción"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddSongDialog;
