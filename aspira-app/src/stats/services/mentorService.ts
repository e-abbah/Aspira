import { Mentor, UpcomingSession } from '../../types/mentor';
import { mockMentors, mockUpcomingSession } from '../data/mockMentor';

let mentors: Mentor[] = [...mockMentors];
let upcomingSession: UpcomingSession | null = { ...mockUpcomingSession };

const MOCK_DELAY = 250;
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getMentors(): Promise<Mentor[]> {
  await delay(MOCK_DELAY);
  return [...mentors];
}

export async function getUpcomingSession(): Promise<UpcomingSession | null> {
  await delay(MOCK_DELAY);
  return upcomingSession ? { ...upcomingSession } : null;
}

export async function bookSession(mentorId: string): Promise<void> {
  await delay(200);
  const mentor = mentors.find((m) => m.id === mentorId);
  if (!mentor) throw new Error(`Mentor ${mentorId} not found`);
  // Real implementation will hit a booking endpoint and likely return
  // a new UpcomingSession — this is the seam where that response gets stored.
}

export async function joinSession(sessionId: string): Promise<{ meetingUrl: string }> {
  await delay(200);
  if (!upcomingSession || upcomingSession.id !== sessionId) {
    throw new Error(`Session ${sessionId} not found`);
  }
  return { meetingUrl: upcomingSession.meetingUrl ?? 'https://meet.aspiria.app/placeholder' };
}