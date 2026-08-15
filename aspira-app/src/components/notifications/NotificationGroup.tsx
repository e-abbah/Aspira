import { Notification } from '../../types/notification';
import { NotificationItem } from './NotificationItem';

interface NotificationGroupProps {
  label: string;
  notifications: Notification[];
  onOpen: (notification: Notification) => void;
  onToggleRead: (id: string, nextIsRead: boolean) => void;
}

export function NotificationGroup({ label, notifications, onOpen, onToggleRead }: NotificationGroupProps) {
  if (notifications.length === 0) return null;

  return (
    <div>
      <p className="mb-3 text-xs font-semibold tracking-wide text-[#8A93A6]">{label.toUpperCase()}</p>
      <div className="space-y-3">
        {notifications.map((n) => (
          <NotificationItem key={n.id} notification={n} onOpen={onOpen} onToggleRead={onToggleRead} />
        ))}
      </div>
    </div>
  );
}