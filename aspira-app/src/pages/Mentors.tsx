import { useMentors } from '../stats/hooks/useMentors';
import { useUpcomingSession } from '../stats/hooks/useUpcomingSession';
import { useUserAccess } from '../stats/hooks/useUserAccess';
import { UpcomingSessionBanner } from '../components/mentors/UpcomingSessionBanner';
import { MentorCard } from '../components/mentors/MentorCard';
import { SearchAndSortBar } from '../components/common/SearchAndSortBar';
import { TabFilter } from '../components/common/TabFilter';
import { MentorCategory, MentorSort } from '../types/mentor';
import DashboardLayout from '../components/dashboard/DashboardLayout';

const SORT_OPTIONS: { value: MentorSort; label: string }[] = [
  { value: 'bestMatch', label: 'Best Match' },
  { value: 'topRated', label: 'Top Rated' },
  { value: 'availableSoon', label: 'Available Soon' },
];

const CATEGORIES: MentorCategory[] = [
  'All',
  'Medicine & Life Sciences',
  'Engineering & Technology',
  'Law',
  'Economics & Social Science',
];

export default function Mentors() {
  const { mentors, allMentors, filters, isLoading, error, setSearch, setCategory, setSort, bookSession, refetch } =
    useMentors();
  const { session, join } = useUpcomingSession();
  const { isPremium } = useUserAccess();

  const tabOptions = CATEGORIES.map((label) => ({
    label,
    count: label === 'All' ? allMentors.length : allMentors.filter((m) => m.category === label).length,
  }));

  const handleViewProfile = (id: string) => {
    // TODO: navigate to /mentors/:id once a profile route exists
    console.log('View profile', id);
  };

  return (
    <DashboardLayout>
        <div className="min-h-screen bg-[#F7F5F0] p-6 md:p-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-[#121D33]">Mentors</h1>
        <p className="mt-1 text-sm text-[#8A93A6]">Connect with verified graduates and professionals</p>
      </header>

      {session && (
        <section className="mb-6">
          <UpcomingSessionBanner session={session} onJoin={join} />
        </section>
      )}

      <section className="mb-4">
        <SearchAndSortBar
          search={filters.search}
          sort={filters.sort}
          sortOptions={SORT_OPTIONS}
          placeholder="Search by title or subject..."
          onSearchChange={setSearch}
          onSortChange={setSort}
        />
      </section>

      <section className="mb-6">
        <TabFilter options={tabOptions} active={filters.category} onChange={setCategory} />
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {isLoading &&
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-xl border border-[#E5E2DA] bg-white" />
          ))}

        {!isLoading && error && (
          <div className="col-span-full rounded-xl border border-[#E5E2DA] bg-white p-8 text-center">
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

        {!isLoading && !error && mentors.length === 0 && (
          <div className="col-span-full rounded-xl border border-[#E5E2DA] bg-white p-8 text-center">
            <p className="text-sm text-[#8A93A6]">No mentors match your search or filters.</p>
          </div>
        )}

        {!isLoading &&
          !error &&
          mentors.map((mentor) => (
            <MentorCard
              key={mentor.id}
              mentor={mentor}
              isUserPremium={isPremium}
              onViewProfile={handleViewProfile}
              onBookSession={bookSession}
            />
          ))}
      </section>
    </div>
    </DashboardLayout>
  );
}