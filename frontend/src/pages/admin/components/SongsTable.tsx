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
import { Calendar, Trash2 } from "lucide-react";

const SongsTable = () => {
  const { songs, isLoadingSongs, error, deleteSong } = useMusicStore();

  if (isLoadingSongs) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-zinc-400">Cargando canciones...</div>
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
            Fecha de Lanzamiento
          </TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {songs.map((song) => (
          <TableRow key={song._id} className="hover:bg-zinc-800/50">
            <TableCell>
              <img
                src={song.imageUrl}
                alt={song.title}
                className="size-10 rounded object-cover"
              />
            </TableCell>

            <TableCell className="font-medium">
              <div>{song.title}</div>
              <div className="text-xs font-normal md:hidden">{song.artist}</div>
            </TableCell>

            <TableCell className="hidden text-center md:table-cell">
              {song.artist}
            </TableCell>

            <TableCell className="hidden text-center md:table-cell">
              <span className="inline-flex items-center gap-1 text-zinc-400">
                <Calendar className="size-4" />
                {song.createdAt.split("T")[0]}
              </span>
            </TableCell>

            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteSong(song._id)}
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

export default SongsTable;
