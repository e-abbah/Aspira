import { useMemo } from 'react';
import { useNotifications } from '../stats/hooks/useNotification';
import { NotificationFilterBar } from '../components/notifications/NotificationFilterBar';
import { NotificationGroup } from '../components/notifications/NotificationGroup';
import { TabFilter } from '../components/common/TabFilter';
import { Notification, NotificationTab, TAB_TO_CATEGORY } from '../types/notification';
import { groupLabelForDate } from '../stats/utils/date';

const TABS: NotificationTab[] = ['All Resources', 'Roadmaps', 'Deadlines', 'Mentors', 'Opportunities', 'Achievements'];

export default function Notifications() {
  const {
    notifications,
    allNotifications,
    unreadCount,
    filters,
    isLoading,
    error,
    setTab,
    setUnreadOnly,
    toggleRead,
    markAllRead,
    refetch,
  } = useNotifications();

  const tabOptions = TABS.map((label) => ({
    label,
    count:
      label === 'All Resources'
        ? allNotifications.length
        : allNotifications.filter((n) => n.category === TAB_TO_CATEGORY[label]).length,
  }));

  const grouped = useMemo(() => {
    const groups: Record<'Today' | 'Yesterday' | 'Earlier', Notification[]> = {
      Today: [],
      Yesterday: [],
      Earlier: [],
    };
    for (const n of notifications) {
      groups[groupLabelForDate(n.createdAt)].push(n);
    }
    return groups;
  }, [notifications]);

  const handleOpen = (notification: Notification) => {
    if (!notification.isRead) toggleRead(notification.id, true);
    // TODO: route to notification.action.target once app routing is wired up here
    console.log('Navigate to', notification.action?.target);
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] p-6 md:p-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-[#121D33]">Notifications</h1>
        <p className="mt-1 text-sm text-[#8A93A6]">Stay on top of your roadmap, deadlines, and opportunities</p>
      </header>

      <section className="mb-6">
        <NotificationFilterBar
          unreadCount={unreadCount}
          unreadOnly={filters.unreadOnly}
          onToggleUnreadOnly={() => setUnreadOnly(!filters.unreadOnly)}
          onMarkAllRead={markAllRead}
        />
      </section>

      <section className="mb-6">
        <TabFilter options={tabOptions} active={filters.tab} onChange={setTab} />
      </section>

      <section className="space-y-8">
        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-xl border border-[#E5E2DA] bg-white" />
          ))}

        {!isLoading && error && (
          <div className="rounded-xl border border-[#E5E2DA] bg-white p-8 text-center">
            <p className="text-sm text-[#8A93A6]">{error}</p>
            <button
              type="button"
              onClick={refetch}
              className="mt-3 rounded-lg bg-[#121D33] px-4 py-2 text-sm font-medium text-white hover:bg-[#1c2b4d]"
            >
              Try again
            </button>
          </div>
        )}

        {!isLoading && !error && notifications.length === 0 && (
          <div className="rounded-xl border border-[#E5E2DA] bg-white p-8 text-center">
            <p className="text-sm text-[#8A93A6]">
              {filters.unreadOnly ? "You're all caught up." : 'No notifications yet.'}
            </p>
          </div>
        )}

        {!isLoading && !error && notifications.length > 0 && (
          <>
            <NotificationGroup label="Today" notifications={grouped.Today} onOpen={handleOpen} onToggleRead={toggleRead} />
            <NotificationGroup label="Yesterday" notifications={grouped.Yesterday} onOpen={handleOpen} onToggleRead={toggleRead} />
            <NotificationGroup label="Earlier" notifications={grouped.Earlier} onOpen={handleOpen} onToggleRead={toggleRead} />
          </>
        )}
      </section>
    </div>
  );
}