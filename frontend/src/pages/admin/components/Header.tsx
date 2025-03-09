import { UserButton } from "@clerk/clerk-react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="mb-4 flex items-center gap-3 md:mb-8">
        <Link to="/" className="group">
          <ArrowLeft className="size-8 text-white transition-transform group-hover:-translate-x-1" />
        </Link>
        <Link to="/" className="rounded-lg">
          <img src="/spotify.svg" className="size-10 text-black" />
        </Link>
        <div>
          <h1 className="text-md font-bold md:text-3xl">
            Panel de Administración
          </h1>
          <p className="mt-1 hidden text-sm text-zinc-400 sm:text-base md:inline-block">
            Gestiona tu catálogo musical
          </p>
        </div>
      </div>
      <UserButton
        appearance={{
          elements: {
            userButtonTrigger: "size-10",
          },
        }}
      />
    </div>
  );
};

export default Header;
