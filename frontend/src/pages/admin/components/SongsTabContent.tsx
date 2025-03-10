import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Music } from "lucide-react";
import SongsTable from "./SongsTable";
import { ScrollArea } from "@/components/ui/scroll-area";
import AddSongDialog from "./AddSongDialog";

const SongsTabContent = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Music className="size-4 text-emerald-500 md:size-5" />
              <span className="sm:text- xl text-base">
                Biblioteca de Canciones
              </span>
            </CardTitle>
            <CardDescription>Administra tus pistas de música</CardDescription>
          </div>
          <AddSongDialog />
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="max-h-full sm:h-full md:px-4 lg:h-[400px]">
          <SongsTable />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default SongsTabContent;
