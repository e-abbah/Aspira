import { Bell, Filter, CheckCheck } from 'lucide-react';

interface NotificationFilterBarProps {
  unreadCount: number;
  unreadOnly: boolean;
  onToggleUnreadOnly: () => void;
  onMarkAllRead: () => void;
}

export function NotificationFilterBar({
  unreadCount,
  unreadOnly,
  onToggleUnreadOnly,
  onMarkAllRead,
}: NotificationFilterBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1.5 rounded-full border border-[#E5E2DA] bg-white px-4 py-2 text-sm font-medium text-[#121D33]">
          <Bell className="h-4 w-4" />
          {unreadCount} Unread
        </span>
        <button
          type="button"
          onClick={onToggleUnreadOnly}
          aria-pressed={unreadOnly}
          className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            unreadOnly
              ? 'border-[#121D33] bg-[#121D33] text-white'
              : 'border-[#E5E2DA] bg-white text-[#121D33] hover:bg-[#F7F5F0]'
          }`}
        >
          <Filter className="h-4 w-4" />
          Unread only
        </button>
      </div>

      <button
        type="button"
        onClick={onMarkAllRead}
        disabled={unreadCount === 0}
        className="flex items-center gap-1.5 text-sm font-medium text-[#121D33] hover:text-[#E0A63C] disabled:cursor-not-allowed disabled:text-[#8A93A6]"
      >
        <CheckCheck className="h-4 w-4" />
        Mark all as read
      </button>
    </div>
  );
}