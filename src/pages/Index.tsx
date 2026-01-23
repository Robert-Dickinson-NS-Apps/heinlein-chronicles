import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { allWorks } from '@/data/heinleinWorks';
import { WorkCard } from '@/components/WorkCard';
import { FilterBar } from '@/components/FilterBar';
import { Button } from '@/components/ui/button';
import { Users, User, Lightbulb, BarChart3, FileCode } from 'lucide-react';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'novel' | 'short-story' | 'novella'>('all');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const workId = searchParams.get('work');
    if (workId) {
      navigate(`/work/${workId}`, { replace: true });
    }
  }, [searchParams, navigate]);

  const filteredWorks = useMemo(() => {
    return allWorks
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
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
            <div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-2">
                Robert A. Heinlein
              </h1>
              <p className="text-lg text-muted-foreground">
                Complete Works Archive • Novels & Short Stories
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => navigate('/biography')}
                variant="outline"
                size="sm"
              >
                <User className="mr-2 h-4 w-4" />
                Biography
              </Button>
              <Button
                onClick={() => navigate('/characters')}
                variant="outline"
                size="sm"
              >
                <Users className="mr-2 h-4 w-4" />
                Characters
              </Button>
              <Button
                onClick={() => navigate('/themes')}
                variant="outline"
                size="sm"
              >
                <Lightbulb className="mr-2 h-4 w-4" />
                Themes
              </Button>
              <Button
                onClick={() => navigate('/statistics')}
                variant="outline"
                size="sm"
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Statistics
              </Button>
              <Button
                onClick={() => navigate('/documentation')}
                variant="outline"
                size="sm"
              >
                <FileCode className="mr-2 h-4 w-4" />
                Docs
              </Button>
            </div>
          </div>
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
              onClick={() => navigate(`/work/${work.id}`)}
            />
          ))}
        </div>

        {filteredWorks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No works found matching your search.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
