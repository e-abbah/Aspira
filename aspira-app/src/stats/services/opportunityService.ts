import { Opportunity, OpportunityFilters, OpportunityStats } from '../../types/opportunity';
import { mockOpportunities } from '../data/mockOpportunities';

// In-memory store standing in for a real backend/session.
// Replace the body of each function with a real `fetch`/API client call
// when the backend is ready — the function signatures should not need to change.
let opportunities: Opportunity[] = [...mockOpportunities];

const MOCK_DELAY = 250;
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getOpportunities(): Promise<Opportunity[]> {
  await delay(MOCK_DELAY);
  return [...opportunities];
}

export async function getOpportunityStats(): Promise<OpportunityStats> {
  await delay(MOCK_DELAY);
  return {
    total: opportunities.length,
    highMatchCount: opportunities.filter((o) => o.matchScore >= 80).length,
    savedCount: opportunities.filter((o) => o.isSaved).length,
    appliedCount: opportunities.filter((o) => o.isApplied).length,
  };
}

export async function toggleSaveOpportunity(id: string): Promise<Opportunity> {
  await delay(150);
  const target = opportunities.find((o) => o.id === id);
  if (!target) throw new Error(`Opportunity ${id} not found`);
  target.isSaved = !target.isSaved;
  opportunities = opportunities.map((o) => (o.id === id ? target : o));
  return target;
}

export async function applyToOpportunity(id: string): Promise<Opportunity> {
  await delay(150);
  const target = opportunities.find((o) => o.id === id);
  if (!target) throw new Error(`Opportunity ${id} not found`);
  target.isApplied = true;
  opportunities = opportunities.map((o) => (o.id === id ? target : o));
  return target;
}

export function filterOpportunities(list: Opportunity[], filters: OpportunityFilters): Opportunity[] {
  let result = [...list];

  if (filters.category !== 'All') {
    const typeMap: Record<string, Opportunity['type']> = {
      Scholarships: 'scholarship',
      Fellowships: 'fellowship',
      Competitions: 'competition',
      'Study Abroad': 'study-abroad',
    };
    result = result.filter((o) => o.type === typeMap[filters.category]);
  }

  if (filters.search.trim()) {
    const q = filters.search.trim().toLowerCase();
    result = result.filter(
      (o) => o.title.toLowerCase().includes(q) || o.organization.toLowerCase().includes(q)
    );
  }

  switch (filters.sort) {
    case 'bestMatch':
      result.sort((a, b) => b.matchScore - a.matchScore);
      break;
    case 'deadlineSoon':
      result.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
      break;
    case 'newest':
      // placeholder until backend provides createdAt; keeps insertion order
      break;
  }

  return result;
}