import { SignedOut, UserButton } from "@clerk/clerk-react";
import { Bell, LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";

const Topbar = () => {
  const { isAdmin } = useAuthStore();

  return (
    <div className="sticky top-0 z-20 flex items-center justify-between bg-zinc-950 p-4">
      {/* Logo */}
      <div className="hidden items-center gap-2 md:flex">
        <img
          src="/spotify-white.svg"
          className="size-8"
          alt="Logo de Spotify"
        />
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="flex items-center md:hidden">
          <Button
            size="icon"
            variant="ghost"
            className="cursor-pointer rounded-full"
            onClick={() => {}}
          >
            <Bell className="size-5" />
          </Button>
        </div>
      </div>

      {/* TODO: Crear el UserButton y mover el AdminButton dentro */}
      {/* Admin button */}
      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link
            to="/admin"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <LayoutDashboardIcon className="mr-2 size-4" />
            Panel de Administración
          </Link>
        )}
      </div>
      {/* Sign in button */}
      <SignedOut>
        <SignInOAuthButtons />
      </SignedOut>
      {/* User button */}
      <UserButton />
    </div>
  );
};

export default Topbar;
