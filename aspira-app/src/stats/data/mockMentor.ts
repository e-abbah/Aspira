import { Mentor, UpcomingSession } from '../../types/mentor';

// Single swap-out point for real data — mentorService.ts is the only
// file that should ever import from here.
export const mockMentors: Mentor[] = [
  {
    id: 'ngozi-peters',
    name: 'Dr. Ngozi Peters',
    title: 'Pharmacist & Researcher',
    affiliation: 'NAFDAC · Abuja',
    category: 'Medicine & Life Sciences',
    tags: ['Sciences & Research'],
    bio: 'Pharmacy graduate from UI with a PhD in Pharmacology. Helps students deciding between Medicine, Pharmacy, and related sciences understand each path clearly.',
    rating: 4.8,
    sessionCount: 41,
    availabilityLabel: 'Mon 6-8 PM',
    isPremium: false,
  },
  {
    id: 'fatima-al-hassan',
    name: 'Fatima Al-Hassan',
    title: 'Economist & Policy Analyst',
    affiliation: 'World Bank · Washington DC',
    category: 'Economics & Social Science',
    tags: ['Economics & Social Science'],
    bio: "ABU Economics graduate with a master's from LSE. Guides students interested in Economics, Social Sciences, and international organisations. Deep expertise in scholarship applications.",
    rating: 4.8,
    sessionCount: 41,
    availabilityLabel: 'Mon 6-8 PM',
    isPremium: true,
  },
  {
    id: 'amaka-osei',
    name: 'Dr. Amaka Osei',
    title: 'UNILAG Medicine admission strategy',
    affiliation: 'UNILAG · Lagos',
    category: 'Medicine & Life Sciences',
    tags: ['Admissions Strategy'],
    bio: 'Guides prospective medicine applicants through UNILAG admission requirements, screening exams, and interview prep.',
    rating: 4.9,
    sessionCount: 63,
    availabilityLabel: 'Tue 4-6 PM',
    isPremium: false,
  },
  {
    id: 'chidi-nwosu',
    name: 'Chidi Nwosu',
    title: 'Civil Engineer',
    affiliation: 'Julius Berger · Lagos',
    category: 'Engineering & Technology',
    tags: ['Engineering'],
    bio: 'Covenant University engineering graduate advising students on engineering degree choices and industry placement routes.',
    rating: 4.6,
    sessionCount: 22,
    availabilityLabel: 'Wed 5-7 PM',
    isPremium: false,
  },
  {
    id: 'amina-yusuf',
    name: 'Amina Yusuf',
    title: 'Human Rights Lawyer',
    affiliation: 'NHRC · Abuja',
    category: 'Law',
    tags: ['Law'],
    bio: 'Called to the Nigerian Bar with an LLM in Human Rights Law. Supports students exploring law school and legal career paths.',
    rating: 4.7,
    sessionCount: 35,
    availabilityLabel: 'Thu 6-8 PM',
    isPremium: true,
  },
];

export const mockUpcomingSession: UpcomingSession = {
  id: 'session-001',
  mentorId: 'amaka-osei',
  mentorName: 'Dr. Amaka Osei',
  mentorTitle: 'UNILAG Medicine admission strategy',
  scheduledFor: (() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(15, 0, 0, 0);
    return d.toISOString();
  })(),
  durationMinutes: 42,
};