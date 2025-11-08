import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filterType: 'all' | 'novel' | 'short-story' | 'novella';
  onFilterChange: (type: 'all' | 'novel' | 'short-story' | 'novella') => void;
}

export const FilterBar = ({ searchQuery, onSearchChange, filterType, onFilterChange }: FilterBarProps) => {
  return (
    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border pb-4 mb-8">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search works..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={filterType === 'all' ? 'default' : 'outline'}
            onClick={() => onFilterChange('all')}
            size="sm"
          >
            All
          </Button>
          <Button
            variant={filterType === 'novel' ? 'default' : 'outline'}
            onClick={() => onFilterChange('novel')}
            size="sm"
          >
            Novels
          </Button>
          <Button
            variant={filterType === 'short-story' ? 'default' : 'outline'}
            onClick={() => onFilterChange('short-story')}
            size="sm"
          >
            Short Stories
          </Button>
          <Button
            variant={filterType === 'novella' ? 'default' : 'outline'}
            onClick={() => onFilterChange('novella')}
            size="sm"
          >
            Novellas
          </Button>
        </div>
      </div>
    </div>
  );
};
