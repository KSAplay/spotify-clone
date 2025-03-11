import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Library } from "lucide-react";
import AddAlbumDialog from "./AddAlbumDialog";
import AlbumsTable from "./AlbumsTable";
import { ScrollArea } from "@/components/ui/scroll-area";

const AlbumsTabContent = () => {
  return (
    <Card className="border-zinc-700/50 bg-zinc-900">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Library className="size-4 text-violet-500 md:size-5" />
              <span className="text-base sm:text-xl">
                Biblioteca de Álbumes
              </span>
            </CardTitle>
            <CardDescription>
              Administra tu colección de álbumes
            </CardDescription>
          </div>
          <AddAlbumDialog />
        </div>
      </CardHeader>

      <CardContent>
        <ScrollArea className="max-h-full sm:h-full md:px-4 lg:h-[400px] lg:max-h-[400px]">
          <AlbumsTable />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AlbumsTabContent;
