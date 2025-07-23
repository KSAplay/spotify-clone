import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./components/LeftSidebar";
import { useEffect, useState } from "react";
import FriendsActivity from "./components/FriendsActivity";
import AudioPlayer from "@/layout/components/AudioPlayer";
import PlaybackControls from "./components/PlaybackControls";
import TopbarMobile from "@/components/TopbarMobile";

const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="flex h-screen w-full flex-col bg-black text-white">
      <AudioPlayer />
      {isMobile ? (
        <div className="md:hidden">
          <TopbarMobile />
          <Outlet />
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
