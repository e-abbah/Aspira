import { Notification } from '../../types/notification';
import { mockNotifications } from '../data/mockNotifications';

let notifications: Notification[] = [...mockNotifications];

const MOCK_DELAY = 250;
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getNotifications(): Promise<Notification[]> {
  await delay(MOCK_DELAY);
  return [...notifications].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function markAsRead(id: string): Promise<void> {
  await delay(100);
  notifications = notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n));
}

export async function markAsUnread(id: string): Promise<void> {
  await delay(100);
  notifications = notifications.map((n) => (n.id === id ? { ...n, isRead: false } : n));
}

export async function markAllAsRead(): Promise<void> {
  await delay(150);
  notifications = notifications.map((n) => ({ ...n, isRead: true }));
}