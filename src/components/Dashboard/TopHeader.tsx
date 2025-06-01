import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, ChevronDown, CalendarDays } from 'lucide-react';

interface TopHeaderProps {
  onToggleSidebar?: () => void; 
  className?: string;
}

const TopHeader: React.FC<TopHeaderProps> = ({ onToggleSidebar, className }) => {
  const [selectedTimeframe, setSelectedTimeframe] = React.useState<string>('last 6 months');

  return (
    <header className={cn(
      "fixed top-0 left-0 md:left-64 right-0 h-[70px] flex items-center justify-between px-6 bg-card border-b z-30",
      className
    )}>
      <div className="flex items-center">
        {/* Hamburger menu for mobile/tablet, if sidebar can be toggled */}
        <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="md:hidden mr-2">
          <Menu className="h-6 w-6" />
        </Button>
        {/* The large "Dashboard" title is part of the main content area, not this fixed header */}
      </div>

      <div className="flex items-center space-x-3 sm:space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="text-sm text-muted-foreground font-normal">
              <CalendarDays className="mr-1.5 h-4 w-4" />
              {selectedTimeframe}
              <ChevronDown className="ml-1.5 h-4 w-4 opacity-70" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSelectedTimeframe('last 30 days')}>Last 30 days</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedTimeframe('last 3 months')}>Last 3 months</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedTimeframe('last 6 months')}>Last 6 months</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedTimeframe('last 12 months')}>Last 12 months</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm">
              Create
              <ChevronDown className="ml-1.5 h-4 w-4 opacity-90" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>New Lead</DropdownMenuItem>
            <DropdownMenuItem>New Contact</DropdownMenuItem>
            <DropdownMenuItem>New Company</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopHeader;
