export type OpportunityType = 'scholarship' | 'fellowship' | 'competition' | 'study-abroad';

export type OpportunityCategory = 'All' | 'Scholarships' | 'Fellowships' | 'Competitions' | 'Study Abroad';

export const CATEGORY_TO_TYPE: Record<Exclude<OpportunityCategory, 'All'>, OpportunityType> = {
  Scholarships: 'scholarship',
  Fellowships: 'fellowship',
  Competitions: 'competition',
  'Study Abroad': 'study-abroad',
};

export interface Opportunity {
  id: string;
  type: OpportunityType;
  title: string;
  organization: string;
  organizationRegion?: string;
  description: string;
  tags: string[];
  fundingLabel: string; // e.g. "N300,000" or "Full tuition + living stipend"
  deadline: string; // ISO date string, e.g. "2025-08-15"
  matchScore: number; // 0-100
  isSaved: boolean;
  isApplied: boolean;
}

export interface OpportunityStats {
  total: number;
  highMatchCount: number; // matchScore >= 80
  savedCount: number;
  appliedCount: number;
}

export interface OpportunityFilters {
  search: string;
  category: OpportunityCategory;
  sort: 'bestMatch' | 'deadlineSoon' | 'newest';
}