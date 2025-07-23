import { useState, useEffect } from 'react';

export const useMobileLayout = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      // Cerrar sidebars si cambias a desktop
      if (!mobile) {
        setLeftSidebarOpen(false);
        setRightSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Cerrar todos los overlays
  const closeOverlays = () => {
    setLeftSidebarOpen(false);
    setRightSidebarOpen(false);
  };

  // Prevenir scroll del body cuando hay overlays abiertos
  useEffect(() => {
    if (leftSidebarOpen || rightSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [leftSidebarOpen, rightSidebarOpen]);

  return {
    isMobile,
    leftSidebarOpen,
    rightSidebarOpen,
    setLeftSidebarOpen,
    setRightSidebarOpen,
    closeOverlays,
  };
};
