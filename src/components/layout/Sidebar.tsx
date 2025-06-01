import React from 'react';
import SidebarNav from '../Dashboard/SidebarNav';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void; // To allow overlay click to close sidebar on mobile
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Sidebar Navigation Panel itself is 'fixed top-0 left-0 w-64 h-screen bg-sidebar ...' from SidebarNav.tsx */}
      {/* This wrapper div controls its visibility state via transform, and z-index for layering */}
      <div
        className={cn(
          'z-40 transition-transform duration-300 ease-in-out',
          'md:translate-x-0', // On medium screens and up, sidebar is always visible and in its default position
          isOpen ? 'translate-x-0' : '-translate-x-full' // On smaller screens, slides based on isOpen state
        )}
        aria-hidden={!isOpen && 'true'} // Hide from accessibility tree when visually hidden on mobile
      >
        <SidebarNav />
      </div>

      {/* Overlay for mobile view when sidebar is open */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Sidebar;
