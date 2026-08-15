import { useCallback, useEffect, useMemo, useState } from 'react';
import { Notification, NotificationFilters, NotificationTab, TAB_TO_CATEGORY } from '../../types/notification';
import { getNotifications, markAsRead, markAsUnread, markAllAsRead } from '../services/notificationService';

const DEFAULT_FILTERS: NotificationFilters = {
  tab: 'All Resources',
  unreadOnly: false,
};

export function useNotifications() {
  const [allNotifications, setAllNotifications] = useState<Notification[]>([]);
  const [filters, setFilters] = useState<NotificationFilters>(DEFAULT_FILTERS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      setAllNotifications(await getNotifications());
    } catch {
      setError('Could not load notifications. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Unfiltered so tab counts and unread count stay stable while a filter is active.
  const unreadCount = useMemo(() => allNotifications.filter((n) => !n.isRead).length, [allNotifications]);

  const filteredNotifications = useMemo(() => {
    let result = [...allNotifications];
    if (filters.tab !== 'All Resources') {
      const category = TAB_TO_CATEGORY[filters.tab];
      result = result.filter((n) => n.category === category);
    }
    if (filters.unreadOnly) {
      result = result.filter((n) => !n.isRead);
    }
    return result;
  }, [allNotifications, filters]);

  const toggleRead = useCallback(async (id: string, nextIsRead: boolean) => {
    setAllNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: nextIsRead } : n)));
    try {
      await (nextIsRead ? markAsRead(id) : markAsUnread(id));
    } catch {
      setAllNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: !nextIsRead } : n)));
    }
  }, []);

  const markAllRead = useCallback(async () => {
    setAllNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    try {
      await markAllAsRead();
    } catch {
      load(); // fall back to a fresh fetch if the bulk update fails
    }
  }, [load]);

  return {
    notifications: filteredNotifications,
    allNotifications,
    unreadCount,
    filters,
    isLoading,
    error,
    setTab: (tab: NotificationTab) => setFilters((f: NotificationFilters) => ({ ...f, tab })),
    setUnreadOnly: (unreadOnly: boolean) => setFilters((f: NotificationFilters) => ({ ...f, unreadOnly })),
    toggleRead,
    markAllRead,
    refetch: load,
  };
}