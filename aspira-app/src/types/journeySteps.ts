import type { JourneyStep } from '../types/journey';

export const journeySteps: JourneyStep[] = [

    {
    id: 'assessment',
    stepNumber: 1,
    title: 'Complete Compass™ Assessment',
    description: 'Discover your personalized academic roadmap.',
    status: 'completed',
    tasks: [
      { id: 'take-assessment', label: 'Take the Aspiria Compass™ Assessment', done: true },
      { id: 'review-roadmap', label: 'Review your personalized roadmap', done: true },
    ],
  },
  {
    id: 'documents',
    stepNumber: 2,
    title: 'Prepare Documents',
    description: 'Gather the core documents your applications will need.',
    status: 'completed',
    tasks: [{ id: 'passport', label: 'Upload passport copy', done: true }],
    ctaLabel: 'Go to Workspace',
    ctaHref: '/workspace',
  },
  {
    id: 'ielts',
    stepNumber: 3,
    title: 'Prepare IELTS / TOEFL',
    description: 'Meet English language requirements for your target universities',
    status: 'active',
    tasks: [
      { id: 'register', label: 'Register for IELTS', done: true },
      { id: 'prep', label: 'Study with IELTS prep resources', done: false },
      { id: 'score', label: 'Achieve target band score (6.5+)', done: false },
      { id: 'upload', label: 'Upload results to Workspace', done: false },
    ],
    ctaLabel: 'IELTS Resources',
    ctaHref: '/learning/ielts',
  },
  {
    id: 'scholarships',
    stepNumber: 4,
    title: 'Find Scholarships',
    description: 'Research and shortlist funded opportunities that match your profile.',
    status: 'upcoming',
    tasks: [
      { id: 'browse', label: 'Browse matched scholarships', done: false },
      { id: 'shortlist', label: 'Save top 5 opportunities', done: false },
      { id: 'deadlines', label: 'Note all deadlines', done: false },
    ],
  },
  {
    id: 'apply',
    stepNumber: 5,
    title: 'Apply',
    description: 'Submit applications to your shortlisted universities.',
    status: 'upcoming',
    tasks: [
      { id: 'forms', label: 'Complete application forms', done: false },
      { id: 'sop', label: 'Submit statement of purpose', done: false },
      { id: 'submit', label: 'Submit all applications', done: false },
    ],
  },
  {
    id: 'offer',
    stepNumber: 6,
    title: 'Receive Offer',
    description: 'Review and compare admission offers.',
    status: 'upcoming',
    tasks: [
      { id: 'review', label: 'Review offer letters', done: false },
      { id: 'compare', label: 'Compare funding packages', done: false },
      { id: 'accept', label: 'Accept your offer', done: false },
    ],
  },
  {
    id: 'visa',
    stepNumber: 7,
    title: 'Visa Application',
    description: 'Apply for your student visa',
    status: 'upcoming',
    tasks: [
      { id: 'docs', label: 'Prepare visa documents', done: false },
      { id: 'interview', label: 'Attend visa interview', done: false },
      { id: 'submit-visa', label: 'Submit visa application', done: false },
    ],
  },
  {
    id: 'success',
    stepNumber: 7,
    title: 'Success!',
    description: 'You made it! Prepare for your journey abroad.',
    status: 'upcoming',
    tasks: [
      { id: 'flights', label: 'Book flights', done: false },
      { id: 'housing', label: 'Arrange housing', done: false },
      { id: 'orientation', label: 'Attend orientation', done: false },
    ],
  },
];