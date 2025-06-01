import React from 'react';
import { cn } from '@/lib/utils';
import {
  LayoutGrid,
  Users,
  FileText,
  Receipt,
  ShoppingCart,
  Mail,
  Archive,
  CalendarDays,
  HelpCircle,
  Settings,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  badgeCount?: number;
  id: string; // For unique key and active item tracking
}

const mainNavItemsData: NavItem[] = [
  { id: 'dashboard', icon: LayoutGrid, label: 'Dashboard', href: '#' },
  { id: 'leads', icon: Users, label: 'Leads', href: '#', badgeCount: 8 },
  { id: 'customers', icon: Users, label: 'Customers', href: '#' },
  { id: 'proposals', icon: FileText, label: 'Proposals', href: '#' },
  { id: 'invoices', icon: Receipt, label: 'Invoices', href: '#' },
  { id: 'items', icon: ShoppingCart, label: 'Items', href: '#' },
  { id: 'mail', icon: Mail, label: 'Mail', href: '#' },
  { id: 'shoebox', icon: Archive, label: 'Shoebox', href: '#' },
  { id: 'calendar', icon: CalendarDays, label: 'Calendar', href: '#' },
];

const bottomNavItemsData: NavItem[] = [
  { id: 'help1', icon: HelpCircle, label: 'Help', href: '#' },
  { id: 'settings', icon: Settings, label: 'Settings', href: '#' },
  { id: 'help2', icon: HelpCircle, label: 'Help', href: '#' }, // As per image showing two help links
];

interface SidebarNavItemProps extends NavItem {
  isActive: boolean;
  onClick: (id: string) => void;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ icon: Icon, label, href, badgeCount, isActive, onClick, id }) => (
  <a
    href={href}
    onClick={(e) => { e.preventDefault(); onClick(id); }}
    className={cn(
      'flex items-center px-4 py-2.5 text-sm font-medium rounded-md hover:bg-primary/5 hover:text-primary transition-colors',
      isActive ? 'bg-primary/10 text-primary font-semibold' : 'text-sidebar-foreground'
    )}
  >
    <Icon className={cn('mr-3 h-5 w-5', isActive ? 'text-primary' : 'text-sidebar-foreground/80')} />
    <span>{label}</span>
    {badgeCount && badgeCount > 0 && (
      <Badge variant="secondary" className="ml-auto bg-primary/20 text-primary px-1.5 py-0.5 text-xs font-semibold">
        {badgeCount}
      </Badge>
    )}
  </a>
);

const SidebarNav: React.FC = () => {
  const [activeItemId, setActiveItemId] = React.useState<string>('dashboard');

  const handleNavItemClick = React.useCallback((id: string) => {
    setActiveItemId(id);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-sidebar text-sidebar-foreground w-64 fixed top-0 left-0 py-4 border-r border-sidebar-border">
      <div className="px-6 mb-6 flex items-center h-[38px]">
        <div className="bg-gray-800 text-white rounded-md h-8 w-8 flex items-center justify-center font-bold text-lg mr-2">
          BO
        </div>
        {/* Optional: Add app name if needed */}
      </div>

      <nav className="flex-grow px-3 space-y-1 overflow-y-auto">
        {mainNavItemsData.map((item) => (
          <SidebarNavItem 
            key={item.id} 
            {...item} 
            isActive={activeItemId === item.id} 
            onClick={handleNavItemClick} 
          />
        ))}
      </nav>

      <div className="px-3 space-y-1 mt-auto pt-4 border-t border-sidebar-border/60">
        {bottomNavItemsData.map((item) => (
          <SidebarNavItem 
            key={item.id} 
            {...item} 
            isActive={activeItemId === item.id} 
            onClick={handleNavItemClick} 
          />
        ))}
      </div>
    </div>
  );
};

export default SidebarNav;
