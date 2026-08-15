import { Zap } from 'lucide-react';
import { useOpportunities } from '../stats/hooks/useOpportunities';
import { useOpportunityStats } from '../stats/hooks/useOpportunityStats';
import { StatsGrid } from '../components/opportunities/StatsGrid';
import { FeaturedMatchCard } from '../components/opportunities/FeaturedMatchedCard';
import { OpportunityListItem } from '../components/opportunities/OpportunityListItem';
import { CategoryTabs } from '../components/opportunities/CategoryTabs';
import { SearchAndSortBar } from '../components/opportunities/SearchAndSortBar';

export default function OpportunitiesHub() {
  const {
    opportunities,
    topMatches,
    filters,
    isLoading,
    error,
    setSearch,
    setCategory,
    setSort,
    toggleSave,
    applyTo,
    refetch,
  } = useOpportunities();

  // Refetches stats whenever the opportunities list identity changes (save/apply actions),
  // so the counts stay in sync without a manual refresh call from this component.
  const stats = useOpportunityStats(opportunities);

  return (
    <div className="min-h-screen bg-[#F7F5F0] p-6 md:p-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-[#121D33]">Opportunities Hub</h1>
        <p className="mt-1 text-sm text-[#8A93A6]">
          Scholarships, fellowships & more matched to your profile
        </p>
      </header>

      <section className="mb-8">
        <StatsGrid stats={stats} />
      </section>

      {topMatches.length > 0 && (
        <section className="mb-8">
          <div className="mb-3 flex items-center gap-2">
            <Zap className="h-4 w-4 text-[#E0A63C]" />
            <h2 className="text-sm font-semibold text-[#121D33]">Top matches for your profile</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {topMatches.map((opportunity) => (
              <FeaturedMatchCard
                key={opportunity.id}
                opportunity={opportunity}
                onToggleSave={toggleSave}
                onApply={applyTo}
              />
            ))}
          </div>
        </section>
      )}

      <section className="mb-4">
        <SearchAndSortBar
          search={filters.search}
          sort={filters.sort}
          onSearchChange={setSearch}
          onSortChange={setSort}
        />
      </section>

      <section className="mb-6">
        <CategoryTabs
          opportunities={opportunities}
          activeCategory={filters.category}
          onChange={setCategory}
        />
      </section>

      <section className="space-y-4">
        {isLoading && (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-40 animate-pulse rounded-xl border border-[#E5E2DA] bg-white" />
            ))}
          </div>
        )}

        {!isLoading && error && (
          <div className="rounded-xl border border-[#E5E2DA] bg-white p-8 text-center">
            <p className="text-sm text-[#8A93A6]">{error}</p>
            <button
              type="button"
              onClick={refetch}
              className="mt-3 rounded-lg bg-[#121D33] px-4 py-2 text-sm font-medium text-white hover:bg-[#1c2b4d]"
            >
              Try again
            </button>
          </div>
        )}

        {!isLoading && !error && opportunities.length === 0 && (
          <div className="rounded-xl border border-[#E5E2DA] bg-white p-8 text-center">
            <p className="text-sm text-[#8A93A6]">No opportunities match your search or filters.</p>
          </div>
        )}

        {!isLoading &&
          !error &&
          opportunities.map((opportunity) => (
            <OpportunityListItem
              key={opportunity.id}
              opportunity={opportunity}
              onToggleSave={toggleSave}
              onApply={applyTo}
            />
          ))}
      </section>
    </div>
  );
}