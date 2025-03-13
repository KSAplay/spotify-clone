import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMusicStore } from "@/stores/useMusicStore";
import { Calendar, Music, Trash2 } from "lucide-react";
import { useEffect } from "react";

const AlbumsTable = () => {
  const { albums, isLoadingAlbums, error, deleteAlbum, fetchAlbums } =
    useMusicStore();

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  if (isLoadingAlbums) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-zinc-400">Cargando álbumes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-zinc-800/50">
          <TableHead className="w-[50px]"></TableHead>
          <TableHead>Título</TableHead>
          <TableHead className="hidden text-center md:table-cell">
            Artista
          </TableHead>
          <TableHead className="hidden text-center md:table-cell">
            Año de Lanzamiento
          </TableHead>
          <TableHead className="hidden text-center md:table-cell">
            Canciones
          </TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {albums.map((album) => (
          <TableRow key={album._id} className="hover:bg-zinc-800/50">
            <TableCell>
              <img
                src={album.imageUrl}
                alt={album.title}
                className="size-10 rounded object-cover"
              />
            </TableCell>

            <TableCell className="font-medium">
              <div>{album.title}</div>
              <div className="text-xs font-normal md:hidden">
                {album.artist}
              </div>
            </TableCell>

            <TableCell className="hidden text-center md:table-cell">
              {album.artist}
            </TableCell>

            <TableCell className="hidden text-center md:table-cell">
              <span className="inline-flex items-center gap-1 text-zinc-400">
                <Calendar className="size-4" />
                {album.releaseYear}
              </span>
            </TableCell>

            <TableCell className="hidden text-center md:table-cell">
              <span className="inline-flex items-center gap-1 text-center text-zinc-400">
                <Music className="size-4" />
                {album.songs.length} canciones
              </span>
            </TableCell>

            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteAlbum(album._id)}
                  className="cursor-pointer text-red-400 hover:bg-red-400/10 hover:text-red-300"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AlbumsTable;
