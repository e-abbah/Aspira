// import { useLearningHubData } from '../data/useLearningHubData';
import { useLearningHubData } from '../stats/hooks/useLearningHubData';
import { useLearningHubFilters } from '../stats/hooks/useLearningHubFilters';
import { HubStatCard } from '../components/learningHub/HubStatCard';
import { SearchBar } from '../components/learningHub/SearchBar';
import { TypeFilterPills } from '../components/learningHub/TypeFilterPills';
import { CategoryFilterPills } from '../components/learningHub/CategoryFilterPills';
import { ResourceCard } from '../components/learningHub/ResourceCard';
import DashboardLayout from '../components/dashboard/DashboardLayout';

export function LearningHubPage() {
  const { resources, stats, categories, isLoading, error, advanceResourceStatus } =
    useLearningHubData();

  const {
    searchQuery,
    setSearchQuery,
    typeFilter,
    setTypeFilter,
    categoryFilter,
    setCategoryFilter,
    filteredResources,
  } = useLearningHubFilters(resources);

  if (isLoading) {
    return <div className="p-8 text-sm text-[#8A93A6]">Loading learning hub...</div>;
  }

  if (error) {
    return <div className="p-8 text-sm text-red-600">{error}</div>;
  }

  return (
    <DashboardLayout>
        <div className="p-8">
      <div>
        <h1 className="text-2xl font-bold text-[#121D33]">Learning Hub</h1>
        <p className="mt-1 text-sm text-[#8A93A6]">Your curated study resources</p>
      </div>

      {stats && (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <HubStatCard
            value={String(stats.totalResources)}
            label="Total Resources"
            sublabel="Available to you"
          />
          <HubStatCard
            value={String(stats.completed)}
            label="Completed"
            sublabel="Keep it up!"
          />
          <HubStatCard
            value={String(stats.inProgress)}
            label="In Progress"
            sublabel="Resume anytime"
          />
          <HubStatCard
            value={`${stats.studyStreakDays} days`}
            label="Study Streak"
            sublabel={`Personal best: ${stats.personalBestDays}`}
          />
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <TypeFilterPills active={typeFilter} onChange={setTypeFilter} />
      </div>

      <div className="mt-4">
        <CategoryFilterPills
          categories={categories}
          active={categoryFilter}
          onChange={setCategoryFilter}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {filteredResources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} onAction={advanceResourceStatus} />
        ))}
      </div>

      {filteredResources.length === 0 && (
        <p className="mt-12 text-center text-sm text-[#8A93A6]">
          No resources match your filters.
        </p>
      )}
    </div>
    </DashboardLayout>
  );
}