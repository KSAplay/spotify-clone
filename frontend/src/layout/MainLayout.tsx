import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./components/LeftSidebar";
import FriendsActivity from "./components/FriendsActivity";
import AudioPlayer from "@/layout/components/AudioPlayer";
import PlaybackControls from "./components/PlaybackControls";
import { Menu, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMobileLayout } from "@/hooks/useMobileLayout";

const MainLayout = () => {
  const {
    isMobile,
    leftSidebarOpen,
    rightSidebarOpen,
    setLeftSidebarOpen,
    setRightSidebarOpen,
    closeOverlays,
  } = useMobileLayout();

  return (
    <div className="flex h-screen w-full flex-col bg-black text-white">
      <AudioPlayer />
      {isMobile ? (
        <div className="relative flex h-full flex-col">
          {/* Mobile Header con botones de navegación */}
          <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/95 p-3 backdrop-blur-sm">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLeftSidebarOpen(true)}
              className="rounded-full p-2 text-zinc-300 hover:bg-zinc-800 hover:text-white"
            >
              <Menu className="h-6 w-6" />
            </Button>

            <div className="flex items-center space-x-2">
              <img src="/spotify-white.svg" alt="Spotify" className="h-6 w-6" />
              <span className="text-xl font-bold text-white">Spotify</span>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setRightSidebarOpen(true)}
              className="rounded-full p-2 text-zinc-300 hover:bg-zinc-800 hover:text-white"
            >
              <Users className="h-6 w-6" />
            </Button>
          </div>

          {/* Contenido principal móvil */}
          <div className="flex-1 overflow-hidden">
            <Outlet />
          </div>

          {/* Overlay para LeftSidebar */}
          {leftSidebarOpen && (
            <div className="animate-in fade-in absolute inset-0 z-50 flex duration-200">
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={closeOverlays}
              />

              {/* Panel izquierdo */}
              <div className="animate-in slide-in-from-left relative z-10 w-80 max-w-[85vw] border-r border-zinc-700 bg-zinc-900 shadow-2xl duration-300">
                <div className="flex items-center justify-between border-b border-zinc-700 bg-zinc-800/50 p-4">
                  <span className="text-lg font-semibold text-white">
                    Tu Biblioteca
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setLeftSidebarOpen(false)}
                    className="rounded-full text-zinc-400 hover:bg-zinc-700 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="h-full overflow-y-auto pb-20">
                  <LeftSidebar isMobile={true} />
                </div>
              </div>
            </div>
          )}

          {/* Overlay para RightSidebar */}
          {rightSidebarOpen && (
            <div className="animate-in fade-in absolute inset-0 z-50 flex justify-end duration-200">
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={closeOverlays}
              />

              {/* Panel derecho */}
              <div className="animate-in slide-in-from-right relative z-10 w-80 max-w-[85vw] border-l border-zinc-700 bg-zinc-900 shadow-2xl duration-300">
                <div className="flex items-center justify-between border-b border-zinc-700 bg-zinc-800/50 p-4">
                  <span className="text-lg font-semibold text-white">
                    Actividad de amigos
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setRightSidebarOpen(false)}
                    className="rounded-full text-zinc-400 hover:bg-zinc-700 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="h-full overflow-y-auto pb-20">
                  <FriendsActivity isMobile={true} />
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <ResizablePanelGroup
          direction="horizontal"
          className="flex h-full flex-1 overflow-hidden p-2"
        >
          {/* Left sidebar */}
          <ResizablePanel defaultSize={20} minSize={0} maxSize={30}>
            <LeftSidebar />
          </ResizablePanel>

          <ResizableHandle className="w-2 rounded-lg bg-black transition-colors" />

          {/* Main content */}
          <ResizablePanel defaultSize={isMobile ? 80 : 60}>
            <Outlet />
          </ResizablePanel>

          <ResizableHandle className="w-2 rounded-lg bg-black transition-colors" />

          {/* Right sidebar */}
          <ResizablePanel
            defaultSize={20}
            minSize={0}
            maxSize={25}
            collapsedSize={0}
          >
            <FriendsActivity />
          </ResizablePanel>
        </ResizablePanelGroup>
      )}
      <PlaybackControls />
    </div>
  );
};

export default MainLayout;
