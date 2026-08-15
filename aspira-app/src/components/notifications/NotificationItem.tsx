import { ArrowRight, Award, Calendar, Users, Globe, BookOpen, Info } from 'lucide-react';
import { Notification, NotificationCategory } from '../../types/notification';
import { relativeTimeLabel } from '../../stats/utils/date';

interface NotificationItemProps {
  notification: Notification;
  onOpen: (notification: Notification) => void;
  onToggleRead: (id: string, nextIsRead: boolean) => void;
}

const CATEGORY_ICON: Record<NotificationCategory, typeof Award> = {
  Achievement: Award,
  Deadline: Calendar,
  Mentor: Users,
  Opportunity: Globe,
  Roadmap: BookOpen,
  System: Info,
};

export function NotificationItem({ notification, onOpen, onToggleRead }: NotificationItemProps) {
  const { id, category, title, description, createdAt, isRead, action } = notification;
  const Icon = CATEGORY_ICON[category];

  return (
    <div
      className={`flex gap-4 rounded-xl border p-5 ${
        isRead ? 'border-[#E5E2DA] bg-white' : 'border-[#E0A63C]/40 bg-white'
      }`}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F7F5F0]">
        <Icon className="h-4 w-4 text-[#121D33]" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <span className="w-fit rounded-full bg-[#F7F5F0] px-3 py-1 text-xs font-medium text-[#121D33]">
            {category}
          </span>
          {!isRead && (
            <button
              type="button"
              onClick={() => onToggleRead(id, true)}
              aria-label="Mark as read"
              className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#E0A63C]"
            />
          )}
        </div>

        <h3 className="mt-2 text-sm font-semibold text-[#121D33]">{title}</h3>
        <p className="mt-1 text-sm text-[#8A93A6]">{description}</p>

        <div className="mt-2 flex items-center gap-4 text-xs text-[#8A93A6]">
          <span>{relativeTimeLabel(createdAt)}</span>
          {action && (
            <button
              type="button"
              onClick={() => onOpen(notification)}
              className="flex items-center gap-1 font-medium text-[#121D33] hover:text-[#E0A63C]"
            >
              {action.label}
              <ArrowRight className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}