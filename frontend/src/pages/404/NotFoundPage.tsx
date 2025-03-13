import { Home, Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-b from-zinc-900 to-zinc-950">
      <div className="mb-50 space-y-8 px-4 text-center">
        <div className="flex animate-bounce justify-center">
          <Music2 className="h-24 w-24 text-green-500" />
        </div>

        {/* Error message */}
        <div className="space-y-4">
          <h1 className="text-7xl font-bold text-white">404</h1>
          <h2 className="text-2xl font-semibold text-white">
            Página no encontrada
          </h2>
          <p className="mx-auto max-w-md text-neutral-400">
            Parece que esta pista se perdió en la mezcla. Vamos a llevarte de
            vuelta a la música.
          </p>
        </div>

        {/* Action buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="w-full cursor-pointer border-neutral-700 bg-neutral-800 text-white hover:bg-neutral-700 sm:w-auto"
          >
            Volver
          </Button>
          <Button
            onClick={() => navigate("/")}
            className="w-full cursor-pointer bg-green-500 text-zinc-800 hover:bg-green-600 sm:w-auto"
          >
            <Home className="mr-2 size-4" />
            Ir a Inicio
          </Button>
        </div>
      </div>
    </div>
  );
}
