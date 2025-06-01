import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { cn } from '@/lib/utils';

interface MainAppLayoutProps {
  children: React.ReactNode;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Initialize sidebar state based on screen size: open on desktop, closed on mobile.
    const mediaQuery = window.matchMedia('(min-width: 768px)'); // Tailwind 'md' breakpoint
    
    const handleMediaQueryChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsSidebarOpen(event.matches);
    };

    // Set initial state
    handleMediaQueryChange(mediaQuery);

    // Need to cast to (e: Event) => handleMediaQueryChange(e as MediaQueryListEvent) for addEventListener
    // Or, better, ensure the type is correct directly.
    // MediaQueryList.addEventListener takes (type: string, listener: (this: MediaQueryList, ev: MediaQueryListEvent) => unknown, options?: boolean | AddEventListenerOptions)
    const listener = (event: MediaQueryListEvent) => handleMediaQueryChange(event);
    mediaQuery.addEventListener('change', listener);

    return () => {
      mediaQuery.removeEventListener('change', listener);
    };
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  return (
    <div className="relative flex min-h-screen bg-background">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Main content wrapper. 
          The 'md:pl-64' class ensures that on medium screens and up, 
          space is made for the fixed-width sidebar. 
          On smaller screens, this padding is not applied, allowing content to use full width 
          as the sidebar becomes an overlay. */}
      <div className={cn(
        "flex-1 flex flex-col w-full transition-all duration-300 ease-in-out",
        "md:pl-64" 
        // If sidebar could be collapsed on desktop, this would be conditional: 
        // isSidebarOpen ? "md:pl-64" : "md:pl-0"
        // But current SidebarNav is always w-64 fixed, so md:pl-64 is always needed.
      )}>
        <Header onToggleSidebar={toggleSidebar} />
        
        {/* Main content area as per layout requirements */}
        {/* pt-[70px] to offset fixed header, p-6 for content padding */}
        <main className="flex-1 p-6 mt-[70px]">
          {/* Container for children as per layout requirements */}
          <div className="flex flex-col gap-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainAppLayout;
