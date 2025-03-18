import { SignedOut, UserButton } from "@clerk/clerk-react";
import { Bell, LayoutDashboardIcon, Users } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import FriendsActivity from "@/layout/components/FriendsActivity";
import { useState } from "react";

const Topbar = () => {
  const { isAdmin } = useAuthStore();
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="sticky top-0 z-20 flex items-center justify-between bg-zinc-950 p-4">
      <div className="absolute top-17 right-0 left-0 block md:hidden">
        <FriendsActivity isSidebarOpen={openSidebar} />
      </div>

      <div className="flex w-full items-center justify-between md:hidden">
        {/* Sign in button */}
        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>

        {/* User button */}
        <UserButton />

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

        <div className="flex items-center gap-4">
          {/* FriendsList toggle button */}
          <div className="flex items-center md:hidden">
            <Button
              size="icon"
              variant="ghost"
              className="cursor-pointer rounded-full"
              onClick={() => setOpenSidebar(!openSidebar)}
            >
              <Users className="size-5" />
            </Button>
          </div>

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

        {/* Logo */}
        <div className="hidden items-center gap-2 md:flex">
          <img
            src="/spotify-white.svg"
            className="size-8"
            alt="Logo de Spotify"
          />
        </div>
      </div>

      <div className="hidden w-full md:flex md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <div className="hidden items-center gap-2 md:flex">
            <img
              src="/spotify-white.svg"
              className="size-8"
              alt="Logo de Spotify"
            />
          </div>

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
    </div>
  );
};

export default Topbar;
