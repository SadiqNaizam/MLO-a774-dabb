import React from 'react';
import TopHeader from '../Dashboard/TopHeader';
// Removed cn import as it's not used in this simplified version
// import { cn } from '@/lib/utils';

interface HeaderProps {
  onToggleSidebar: () => void;
  // The TopHeader component itself handles its 'left' offset responsively
  // (e.g., left-0 for mobile, md:left-64 for desktop when sidebar is present).
  // So, no additional props like `isSidebarVisibleAndStatic` are strictly needed here if TopHeader is self-contained for this.
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  // The TopHeader component from context already includes styling for fixed positioning,
  // height, background, z-index, and responsive left-margin (left-0 md:left-64).
  // We just pass down the toggle handler.
  return <TopHeader onToggleSidebar={onToggleSidebar} />;
};

export default Header;
