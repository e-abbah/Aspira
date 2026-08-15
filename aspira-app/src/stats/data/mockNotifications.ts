import { Notification } from '../../types/notification';

function daysAgo(days: number, hours = 0): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(d.getHours() - hours);
  return d.toISOString();
}

// Swap-out point: notificationService.ts is the only file that should import from here.
export const mockNotifications: Notification[] = [
  {
    id: 'n-streak-5',
    category: 'Achievement',
    title: '5-day streak! Keep it up',
    description: "You've studied 5 days in a row. Hit 7 to unlock a streak badge.",
    createdAt: daysAgo(0, 0),
    isRead: false,
  },
  {
    id: 'n-deadline-olympiad',
    category: 'Deadline',
    title: 'Nigeria Science Olympiad closes in 19 days',
    description: 'Your 76% match opportunity closes on 30 Jul 2025. Apply before the deadline.',
    createdAt: daysAgo(0, 2),
    isRead: false,
    action: { label: 'View Opportunity', target: '/opportunities/nigeria-science-olympiad' },
  },
  {
    id: 'n-session-confirmed',
    category: 'Mentor',
    title: 'Session confirmed with Dr. Adaeze Okafor',
    description: 'Your 45-minute session is confirmed for Saturday, 19 Jul at 10:00 AM.',
    createdAt: daysAgo(0, 5),
    isRead: false,
    action: { label: 'View Session', target: '/mentors/sessions/latest' },
  },
  {
    id: 'n-milestone-physics',
    category: 'Roadmap',
    title: 'Milestone task due soon',
    description: 'Complete Physics: Mechanics & Waves review this week to stay on track for your JAMB milestone.',
    createdAt: daysAgo(1),
    isRead: true,
    action: { label: 'Open Roadmap', target: '/journey' },
  },
  {
    id: 'n-mastercard-added',
    category: 'Opportunity',
    title: 'New high-match opportunity added',
    description: 'Mastercard Foundation Scholars Program — 81% match. Pan-African fellowship with full tuition and living stipend.',
    createdAt: daysAgo(1),
    isRead: true,
    action: { label: 'View Opportunity', target: '/opportunities/mastercard-scholars' },
  },
  {
    id: 'n-mtn-deadline',
    category: 'Deadline',
    title: 'MTN Foundation Scholarship closes in 35 days',
    description: '94% match. Deadline: 15 Aug 2025.',
    createdAt: daysAgo(2),
    isRead: true,
    action: { label: 'Apply Now', target: '/opportunities/mtn-sci-tech' },
  },
  {
    id: 'n-jamb-phase',
    category: 'Roadmap',
    title: 'JAMB Intensive phase started',
    description: "You've unlocked Phase 2: JAMB & University Choice. Your next milestone is due November 2025.",
    createdAt: daysAgo(1),
    isRead: true,
    action: { label: 'View Roadmap', target: '/journey' },
  },
  {
    id: 'n-welcome',
    category: 'System',
    title: 'Welcome to Aspiria!',
    description: 'Your Compass Assessment is complete and your personalised roadmap is ready. Start your first task today',
    createdAt: daysAgo(1),
    isRead: false,
    action: { label: 'Go to Dashboard', target: '/dashboard' },
  },
];