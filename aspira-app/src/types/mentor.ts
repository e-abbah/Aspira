export type MentorCategory =
  | 'All'
  | 'Medicine & Life Sciences'
  | 'Engineering & Technology'
  | 'Law'
  | 'Economics & Social Science';

export type MentorSort = 'bestMatch' | 'topRated' | 'availableSoon';

export interface Mentor {
  id: string;
  name: string;
  title: string; // e.g. "Pharmacist & Researcher"
  affiliation: string; // e.g. "NAFDAC · Abuja"
  category: MentorCategory;
  tags: string[]; // specialty pills, e.g. ["Sciences & Research"]
  bio: string;
  rating: number;
  sessionCount: number;
  availabilityLabel: string; // e.g. "Mon 6-8 PM"
  isPremium: boolean;
  avatarUrl?: string;
}

export interface UpcomingSession {
  id: string;
  mentorId: string;
  mentorName: string;
  mentorTitle: string;
  scheduledFor: string; // ISO datetime
  durationMinutes: number;
  meetingUrl?: string;
}

export interface MentorFilters {
  search: string;
  category: MentorCategory;
  sort: MentorSort;
}