export type NotificationCategory =
  | 'Roadmap'
  | 'Deadline'
  | 'Mentor'
  | 'Opportunity'
  | 'Achievement'
  | 'System';

// Tabs shown in the UI — a subset/superset of categories, kept separate
// from NotificationCategory so the tab list can diverge from the data model
// (e.g. "System" notifications exist but currently have no dedicated tab).
export type NotificationTab =
  | 'All Resources'
  | 'Roadmaps'
  | 'Deadlines'
  | 'Mentors'
  | 'Opportunities'
  | 'Achievements';

export const TAB_TO_CATEGORY: Record<Exclude<NotificationTab, 'All Resources'>, NotificationCategory> = {
  Roadmaps: 'Roadmap',
  Deadlines: 'Deadline',
  Mentors: 'Mentor',
  Opportunities: 'Opportunity',
  Achievements: 'Achievement',
};

export interface NotificationAction {
  label: string; // e.g. "View Opportunity", "Apply Now"
  target: string; // route or id the action resolves to, e.g. "/opportunities/mtn-sci-tech"
}

export interface Notification {
  id: string;
  category: NotificationCategory;
  title: string;
  description: string;
  createdAt: string; // ISO datetime
  isRead: boolean;
  action?: NotificationAction;
}

export interface NotificationFilters {
  tab: NotificationTab;
  unreadOnly: boolean;
}