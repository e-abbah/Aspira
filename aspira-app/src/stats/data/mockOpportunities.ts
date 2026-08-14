import { Opportunity } from '../../types/opportunity';

// This file is the single swap-out point for real data.
// When the backend is ready, opportunityService.ts stops importing
// from here and calls the API instead — nothing else in the app changes.
export const mockOpportunities: Opportunity[] = [
  {
    id: 'mtn-sci-tech',
    type: 'scholarship',
    title: 'MTN Foundation Science & Technology Scholarship',
    organization: 'MTN Nigeria Foundation',
    description:
      'For Nigerian undergraduate students studying STEM disciplines at accredited Nigerian universities. Covers tuition and stipend.',
    tags: ['WAEC min. 5 credits', 'JAMB score 240+', 'STEM course', 'Nigerian citizen'],
    fundingLabel: '₦300,000',
    deadline: '2025-08-15',
    matchScore: 94,
    isSaved: false,
    isApplied: false,
  },
  {
    id: 'mastercard-scholars',
    type: 'fellowship',
    title: 'Mastercard Foundation Scholars Program',
    organization: 'Mastercard Foundation',
    organizationRegion: 'Pan-Africa',
    description:
      'Comprehensive scholarship for academically talented yet economically disadvantaged young Africans to study at leading universities.',
    tags: ['Strong academic record', 'Demonstrated leadership', 'Financial need', 'African citizen'],
    fundingLabel: 'Full tuition + living stipend',
    deadline: '2025-09-01',
    matchScore: 81,
    isSaved: true,
    isApplied: false,
  },
  {
    id: 'chevening-uk',
    type: 'scholarship',
    title: 'Chevening Scholarship — United Kingdom',
    organization: 'UK Government',
    organizationRegion: 'United Kingdom',
    description:
      "Fully-funded scholarships for future leaders to study a one-year master's degree at any UK university.",
    tags: ['Nigerian citizen', '2+ years work experience', 'Undergraduate degree', 'Leadership potential'],
    fundingLabel: 'Full postgraduate funding',
    deadline: '2025-08-15',
    matchScore: 94,
    isSaved: false,
    isApplied: false,
  },
  {
    id: 'daad-germany',
    type: 'scholarship',
    title: 'DAAD Scholarship — Germany',
    organization: 'German Academic Exchange Service',
    organizationRegion: 'Germany',
    description:
      'For outstanding students from developing countries to study or conduct research at German higher education institutions.',
    tags: ["Bachelor's with distinction", 'Academic excellence', 'Language proficiency'],
    fundingLabel: 'Full scholarship + €861/month',
    deadline: '2025-08-15',
    matchScore: 94,
    isSaved: true,
    isApplied: false,
  },
];