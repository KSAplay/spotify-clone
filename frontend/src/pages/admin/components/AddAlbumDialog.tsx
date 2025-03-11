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
import { axiosInstance } from "@/lib/axios";
import { useMusicStore } from "@/stores/useMusicStore";
import { Plus, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { useClickAway } from "@uidotdev/usehooks";
import { toast } from "sonner";
import { HexColorPicker } from "react-colorful";

const AddAlbumDialog = () => {
  const { fetchAlbums, fetchSongs } = useMusicStore();
  const [coverColor, setCoverColor] = useState("#FFFFFF");
  const [albumDialogOpen, setAlbumDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const popover = useClickAway<HTMLDivElement>(() => {
    setIsPickerOpen(false);
  });

  const [newAlbum, setNewAlbum] = useState({
    title: "",
    artist: "",
    releaseYear: new Date().getFullYear(),
    coverColor: "#FFFFFF",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      if (!imageFile) {
        return toast.error("Por favor, sube una imagen");
      }

      const formData = new FormData();
      formData.append("title", newAlbum.title);
      formData.append("artist", newAlbum.artist);
      formData.append("releaseYear", newAlbum.releaseYear.toString());
      formData.append("imageFile", imageFile);
      formData.append("coverColor", newAlbum.coverColor);

      await axiosInstance.post("/admin/albums", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setNewAlbum({
        title: "",
        artist: "",
        releaseYear: new Date().getFullYear(),
        coverColor: "#FFFFFF",
      });

      setImageFile(null);
      setAlbumDialogOpen(false);
      toast.success("Álbum creado exitosamente");

      fetchAlbums();
      fetchSongs();
    } catch (error: any) {
      toast.error("Error al crear el álbum: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={albumDialogOpen} onOpenChange={setAlbumDialogOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer bg-violet-500 text-white hover:bg-violet-600">
          <Plus className="size-4 md:mr-2" />
          <span className="hidden md:inline-block">Añadir Álbum</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="border-zinc-700 bg-zinc-900">
        <DialogHeader>
          <DialogTitle>Añadir Nuevo Álbum</DialogTitle>
          <DialogDescription>
            Añade un nuevo álbum a tu colección
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <input
            type="file"
            accept="image/*"
            ref={imageInputRef}
            hidden
            onChange={handleImageSelect}
          />

          {/* Image Upload */}
          <div
            className="flex cursor-pointer items-center justify-center rounded-lg border-2 p-6"
            onClick={() => imageInputRef.current?.click()}
            style={{
              background: `linear-gradient(180deg, ${coverColor} 0%, #18181b 100%)`,
            }}
          >
            <div className="text-center">
              {imageFile ? (
                <div className="relative">
                  <img
                    src={URL.createObjectURL(imageFile)}
                    alt="Vista previa"
                    className="max-h-80 rounded-lg"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute -top-4 -right-4 cursor-pointer rounded-full"
                    onClick={() => setImageFile(null)}
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="mb-2 inline-block rounded-full bg-zinc-800 p-3">
                    <Upload className="size-6 text-zinc-400" />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer text-xs"
                  >
                    Elegir Archivo
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* other fields */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Título del Álbum</label>
            <Input
              value={newAlbum.title}
              onChange={(e) =>
                setNewAlbum({ ...newAlbum, title: e.target.value })
              }
              className="mt-1 border-zinc-700 bg-zinc-800"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Artista</label>
            <Input
              value={newAlbum.artist}
              onChange={(e) =>
                setNewAlbum({ ...newAlbum, artist: e.target.value })
              }
              className="mt-1 border-zinc-700 bg-zinc-800"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Año de Lanzamiento</label>
            <Input
              type="number"
              value={newAlbum.releaseYear}
              onChange={(e) =>
                setNewAlbum({
                  ...newAlbum,
                  releaseYear: parseInt(e.target.value),
                })
              }
              className="mt-1 border-zinc-700 bg-zinc-800"
              min={1900}
              max={new Date().getFullYear()}
            />
          </div>

          <div className="w-full space-y-2">
            <label className="text-sm font-medium">Color de la portada</label>

            <div className="relative mt-1 w-full rounded-lg bg-zinc-800 p-2">
              <div
                className="h-10 w-full cursor-pointer rounded-lg"
                style={{ background: coverColor }}
                onClick={() => setIsPickerOpen(true)}
              />

              {isPickerOpen && (
                <div
                  className="absolute top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-full transform p-2"
                  ref={popover}
                >
                  <HexColorPicker color={coverColor} onChange={setCoverColor} />
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setAlbumDialogOpen(false)}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            className="cursor-pointer bg-violet-500 hover:bg-violet-600"
            disabled={
              isLoading || !imageFile || !newAlbum.title || !newAlbum.artist
            }
          >
            {isLoading ? "Creando..." : "Añadir Álbum"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddAlbumDialog;
