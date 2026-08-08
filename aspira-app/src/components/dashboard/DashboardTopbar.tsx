import React from 'react';
import { Menu, Compass, Bell } from 'lucide-react';

export interface TopbarUser {
  initials: string;
}

export interface DashboardTopbarProps {
  onMenuClick: () => void;
  user?: TopbarUser;
}

const DashboardTopbar: React.FC<DashboardTopbarProps> = ({
  onMenuClick,
  user = { initials: 'AN' },
}) => {
  return (
    <header className="flex items-center justify-between px-4 lg:px-6 py-4 bg-[#121D33]">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="text-white/70 hover:text-white transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
            <Compass className="w-4 h-4 text-white" strokeWidth={2} />
          </div>
          <span className="text-white font-serif font-bold text-base">
            Aspiria
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <button
          type="button"
          className="text-white/70 hover:text-white transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" strokeWidth={2} />
        </button>
        <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white text-xs font-semibold">
          {user.initials}
        </div>
      </div>
    </header>
  );
};

export default DashboardTopbar;