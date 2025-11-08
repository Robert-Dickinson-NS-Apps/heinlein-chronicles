import { useState, useMemo } from 'react';
import { heinleinWorks, Work } from '@/data/heinleinWorks';
import { WorkCard } from '@/components/WorkCard';
import { WorkDetail } from '@/components/WorkDetail';
import { FilterBar } from '@/components/FilterBar';

const Index = () => {
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'novel' | 'short-story' | 'novella'>('all');

  const filteredWorks = useMemo(() => {
    return heinleinWorks
      .filter(work => {
        const matchesSearch = work.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            work.summary.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = filterType === 'all' || work.type === filterType;
        return matchesSearch && matchesType;
      })
      .sort((a, b) => a.year - b.year);
  }, [searchQuery, filterType]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-2">
            Robert A. Heinlein
          </h1>
          <p className="text-lg text-muted-foreground">
            Complete Works Archive • Novels & Short Stories
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filterType={filterType}
          onFilterChange={setFilterType}
        />

        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredWorks.length} {filteredWorks.length === 1 ? 'work' : 'works'}
            {filterType !== 'all' && ` • ${filterType === 'short-story' ? 'Short Stories' : filterType === 'novella' ? 'Novellas' : 'Novels'}`}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredWorks.map((work) => (
            <WorkCard
              key={work.id}
              work={work}
              onClick={() => setSelectedWork(work)}
            />
          ))}
        </div>

        {filteredWorks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No works found matching your search.</p>
          </div>
        )}
      </main>

      <WorkDetail
        work={selectedWork}
        open={!!selectedWork}
        onOpenChange={(open) => !open && setSelectedWork(null)}
      />
    </div>
  );
};

export default Index;
