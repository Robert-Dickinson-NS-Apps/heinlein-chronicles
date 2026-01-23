import { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { allWorks } from '@/data/heinleinWorks';
import { seriesData } from '@/data/seriesData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { 
  ArrowLeft, 
  Calendar, 
  Filter, 
  Award, 
  BookOpen, 
  ChevronDown,
  ChevronUp,
  X,
  FileText,
  TrendingUp,
  Star,
  Sparkles
} from 'lucide-react';

// Award-winning works
const awardWinningWorks = [
  { id: 'double-star', award: 'Hugo Award 1956' },
  { id: 'starship-troopers', award: 'Hugo Award 1960' },
  { id: 'stranger-in-a-strange-land', award: 'Hugo Award 1962' },
  { id: 'the-moon-is-a-harsh-mistress', award: 'Hugo Award 1967' },
];

// Get all unique themes
const allThemes = Array.from(
  new Set(allWorks.flatMap(work => work.themes || []))
).sort();

// Get decade ranges
const decades = [
  { label: '1930s', start: 1930, end: 1939 },
  { label: '1940s', start: 1940, end: 1949 },
  { label: '1950s', start: 1950, end: 1959 },
  { label: '1960s', start: 1960, end: 1969 },
  { label: '1970s', start: 1970, end: 1979 },
  { label: '1980s', start: 1980, end: 1989 },
];

const Timeline = () => {
  const navigate = useNavigate();
  const [selectedSeries, setSelectedSeries] = useState<string[]>([]);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [showAwardsOnly, setShowAwardsOnly] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [filtersOpen, setFiltersOpen] = useState(true);

  const filteredWorks = useMemo(() => {
    return allWorks.filter(work => {
      // Type filter
      if (selectedType !== 'all' && work.type !== selectedType) return false;

      // Series filter
      if (selectedSeries.length > 0) {
        const workSeries = seriesData.filter(s => s.works.includes(work.id));
        if (!workSeries.some(s => selectedSeries.includes(s.id))) return false;
      }

      // Theme filter
      if (selectedThemes.length > 0) {
        if (!work.themes?.some(t => selectedThemes.includes(t))) return false;
      }

      // Awards filter
      if (showAwardsOnly) {
        if (!awardWinningWorks.some(a => a.id === work.id)) return false;
      }

      return true;
    });
  }, [selectedSeries, selectedThemes, showAwardsOnly, selectedType]);

  const worksByDecade = useMemo(() => {
    const grouped: Record<string, typeof filteredWorks> = {};
    decades.forEach(decade => {
      const works = filteredWorks.filter(
        w => w.year >= decade.start && w.year <= decade.end
      );
      if (works.length > 0) {
        grouped[decade.label] = works;
      }
    });
    return grouped;
  }, [filteredWorks]);

  // Calculate decade statistics (based on all works, not filtered)
  const decadeStats = useMemo(() => {
    return decades.map(decade => {
      const works = allWorks.filter(w => w.year >= decade.start && w.year <= decade.end);
      const novels = works.filter(w => w.type === 'novel');
      const shortStories = works.filter(w => w.type === 'short-story');
      const novellas = works.filter(w => w.type === 'novella');
      const totalWords = works.reduce((sum, w) => sum + (w.wordCount || 0), 0);
      const awards = awardWinningWorks.filter(a => works.some(w => w.id === a.id));
      
      // Notable achievements per decade
      let achievement = '';
      if (decade.label === '1930s') achievement = 'Career begins';
      else if (decade.label === '1940s') achievement = 'Golden Age peak';
      else if (decade.label === '1950s') achievement = 'Juvenile classics';
      else if (decade.label === '1960s') achievement = '3 Hugo Awards';
      else if (decade.label === '1970s') achievement = 'Experimental era';
      else if (decade.label === '1980s') achievement = 'Final masterworks';

      return {
        decade: decade.label,
        totalWorks: works.length,
        novels: novels.length,
        shortStories: shortStories.length,
        novellas: novellas.length,
        wordCount: totalWords,
        awards: awards.length,
        achievement
      };
    }).filter(stat => stat.totalWorks > 0);
  }, []);

  const clearFilters = () => {
    setSelectedSeries([]);
    setSelectedThemes([]);
    setShowAwardsOnly(false);
    setSelectedType('all');
  };

  const hasActiveFilters = selectedSeries.length > 0 || selectedThemes.length > 0 || showAwardsOnly || selectedType !== 'all';

  const getWorkAward = (workId: string) => {
    return awardWinningWorks.find(a => a.id === workId);
  };

  const toggleSeries = (seriesId: string) => {
    setSelectedSeries(prev => 
      prev.includes(seriesId) 
        ? prev.filter(s => s !== seriesId)
        : [...prev, seriesId]
    );
  };

  const toggleTheme = (theme: string) => {
    setSelectedThemes(prev => 
      prev.includes(theme) 
        ? prev.filter(t => t !== theme)
        : [...prev, theme]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate('/')} size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <div>
                <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary flex items-center gap-2">
                  <Calendar className="h-6 w-6" />
                  Works Timeline
                </h1>
                <p className="text-sm text-muted-foreground">
                  {filteredWorks.length} works • 1939-1987
                </p>
              </div>
            </div>
            {hasActiveFilters && (
              <Button variant="outline" size="sm" onClick={clearFilters}>
                <X className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <Card className="p-4 sticky top-24">
              <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
                <CollapsibleTrigger className="flex items-center justify-between w-full mb-4">
                  <h2 className="font-semibold text-foreground flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </h2>
                  {filtersOpen ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-6">
                  {/* Type Filter */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Work Type
                    </label>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="novel">Novels</SelectItem>
                        <SelectItem value="novella">Novellas</SelectItem>
                        <SelectItem value="short-story">Short Stories</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Awards Filter */}
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="awards" 
                      checked={showAwardsOnly}
                      onCheckedChange={(checked) => setShowAwardsOnly(checked === true)}
                    />
                    <label 
                      htmlFor="awards" 
                      className="text-sm font-medium flex items-center gap-2 cursor-pointer"
                    >
                      <Award className="h-4 w-4 text-yellow-500" />
                      Hugo Award Winners Only
                    </label>
                  </div>

                  <Separator />

                  {/* Series Filter */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-3 block">
                      Series
                    </label>
                    <ScrollArea className="h-[140px]">
                      <div className="space-y-2 pr-4">
                        {seriesData.map(series => (
                          <div key={series.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={series.id}
                              checked={selectedSeries.includes(series.id)}
                              onCheckedChange={() => toggleSeries(series.id)}
                            />
                            <label 
                              htmlFor={series.id} 
                              className="text-sm cursor-pointer"
                            >
                              {series.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>

                  <Separator />

                  {/* Themes Filter */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-3 block">
                      Themes
                    </label>
                    <ScrollArea className="h-[200px]">
                      <div className="space-y-2 pr-4">
                        {allThemes.map(theme => (
                          <div key={theme} className="flex items-center space-x-2">
                            <Checkbox 
                              id={theme}
                              checked={selectedThemes.includes(theme)}
                              onCheckedChange={() => toggleTheme(theme)}
                            />
                            <label 
                              htmlFor={theme} 
                              className="text-sm cursor-pointer"
                            >
                              {theme}
                            </label>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          </aside>

          {/* Timeline */}
          <main className="lg:col-span-3">
            {/* Decade Statistics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 mb-8">
              {decadeStats.map((stat, idx) => (
                <Card 
                  key={stat.decade} 
                  className="p-4 bg-gradient-to-br from-card to-muted/30 border-border/50 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold text-primary">{stat.decade}</span>
                    {stat.awards > 0 && (
                      <Award className="h-4 w-4 text-yellow-500" />
                    )}
                  </div>
                  
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-foreground font-medium">{stat.totalWorks}</span>
                      <span className="text-muted-foreground text-xs">works</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-foreground font-medium">
                        {stat.wordCount > 0 ? `${(stat.wordCount / 1000000).toFixed(1)}M` : '—'}
                      </span>
                      <span className="text-muted-foreground text-xs">words</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1 border-t border-border/50">
                      <Sparkles className="h-3 w-3" />
                      <span className="truncate">{stat.achievement}</span>
                    </div>
                  </div>
                  
                  {/* Work type breakdown */}
                  <div className="flex gap-1 mt-3">
                    {stat.novels > 0 && (
                      <div className="flex-1 bg-primary/20 rounded-sm h-1.5" title={`${stat.novels} novels`} />
                    )}
                    {stat.novellas > 0 && (
                      <div className="flex-1 bg-secondary/40 rounded-sm h-1.5" title={`${stat.novellas} novellas`} />
                    )}
                    {stat.shortStories > 0 && (
                      <div className="flex-1 bg-muted-foreground/30 rounded-sm h-1.5" title={`${stat.shortStories} short stories`} />
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {Object.keys(worksByDecade).length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No works match the selected filters.</p>
                <Button variant="link" onClick={clearFilters}>Clear filters</Button>
              </div>
            ) : (
              <div className="space-y-12">
                {Object.entries(worksByDecade).map(([decade, works]) => (
                  <section key={decade}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-bold text-xl">
                        {decade}
                      </div>
                      <div className="flex-1 h-px bg-border" />
                      <Badge variant="secondary">{works.length} works</Badge>
                    </div>

                    <div className="relative ml-4 border-l-2 border-primary/30 pl-8 space-y-6">
                      {works.map((work, idx) => {
                        const award = getWorkAward(work.id);
                        const workSeries = seriesData.filter(s => s.works.includes(work.id));
                        
                        return (
                          <div key={work.id} className="relative">
                            {/* Timeline dot */}
                            <div className={`absolute -left-[2.55rem] w-4 h-4 rounded-full border-4 border-background ${
                              award ? 'bg-yellow-500' : 'bg-primary'
                            }`} />
                            
                            {/* Year marker */}
                            <div className="absolute -left-[5.5rem] text-sm font-medium text-muted-foreground w-12 text-right">
                              {work.year}
                            </div>

                            <Link to={`/work/${work.id}`}>
                              <Card className="p-4 hover:shadow-lg transition-all hover:border-primary/50 group">
                                <div className="flex gap-4">
                                  {/* Cover thumbnail */}
                                  <div className="w-16 h-24 flex-shrink-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded overflow-hidden">
                                    {work.coverImage ? (
                                      <img 
                                        src={work.coverImage} 
                                        alt={work.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                      />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center p-1">
                                        <BookOpen className="h-6 w-6 text-muted-foreground" />
                                      </div>
                                    )}
                                  </div>

                                  {/* Content */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2 mb-1">
                                      <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                        {work.title}
                                      </h3>
                                      {award && (
                                        <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/30 flex-shrink-0">
                                          <Award className="h-3 w-3 mr-1" />
                                          Hugo
                                        </Badge>
                                      )}
                                    </div>

                                    <div className="flex items-center gap-2 mb-2">
                                      <Badge variant="outline" className="text-xs">
                                        {work.type === 'short-story' ? 'Short Story' : work.type === 'novella' ? 'Novella' : 'Novel'}
                                      </Badge>
                                      {work.wordCount && (
                                        <span className="text-xs text-muted-foreground">
                                          {(work.wordCount / 1000).toFixed(0)}k words
                                        </span>
                                      )}
                                    </div>

                                    <p className="text-sm text-foreground/70 line-clamp-2 mb-2">
                                      {work.summary}
                                    </p>

                                    {/* Series & Themes */}
                                    <div className="flex flex-wrap gap-1">
                                      {workSeries.map(s => (
                                        <Badge key={s.id} variant="secondary" className="text-xs">
                                          {s.name}
                                        </Badge>
                                      ))}
                                      {work.themes?.slice(0, 2).map(theme => (
                                        <Badge key={theme} variant="outline" className="text-xs">
                                          {theme}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </Card>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
