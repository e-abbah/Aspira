import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar, { type MenuItemId } from './Sidebar';
import DashboardTopbar from './DashboardTopbar';

export interface DashboardLayoutProps {
  children: React.ReactNode;
  onLogout?: () => void;
}

const pathToMenuItem: Record<string, MenuItemId> = {
  '/dashboard': 'dashboard',
  '/journey': 'journey',
  '/workspace': 'workspace',
  '/learning-hub': 'learning',
  '/opportunities': 'opportunities',
  '/mentors': 'mentors',
  '/subscription': 'subscription',
  '/notifications': 'notifications',
  '/settings': 'settings',
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const location = useLocation();
  const activeItem = pathToMenuItem[location.pathname] ?? undefined;

  return (
    <div className="h-screen flex bg-[#F7F5F0] overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeItem={activeItem}
        onLogout={onLogout}
      />
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <DashboardTopbar onMenuClick={() => setSidebarOpen((prev) => !prev)} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;