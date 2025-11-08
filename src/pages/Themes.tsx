import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { allWorks } from '@/data/heinleinWorks';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Lightbulb } from 'lucide-react';

const Themes = () => {
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  // Extract all unique themes
  const allThemes = useMemo(() => {
    const themeSet = new Set<string>();
    allWorks.forEach((work) => {
      work.themes?.forEach((theme) => themeSet.add(theme));
    });
    return Array.from(themeSet).sort();
  }, []);

  // Get works by theme
  const worksByTheme = useMemo(() => {
    const themeMap = new Map<string, typeof allWorks>();
    allWorks.forEach((work) => {
      work.themes?.forEach((theme) => {
        const existing = themeMap.get(theme) || [];
        themeMap.set(theme, [...existing, work]);
      });
    });
    return themeMap;
  }, []);

  const filteredWorks = selectedTheme
    ? worksByTheme.get(selectedTheme) || []
    : allWorks.filter((w) => w.themes && w.themes.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" onClick={() => navigate('/')} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Works
          </Button>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-2 flex items-center gap-3">
            <Lightbulb className="h-10 w-10" />
            Themes Explorer
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore Heinlein\'s works by recurring themes and concepts
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Theme Filter Pills */}
        <div className="mb-8">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
            Select a Theme
          </h2>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedTheme === null ? 'default' : 'outline'}
              onClick={() => setSelectedTheme(null)}
              size="sm"
            >
              All Themes ({allWorks.filter((w) => w.themes && w.themes.length > 0).length})
            </Button>
            {allThemes.map((theme) => (
              <Button
                key={theme}
                variant={selectedTheme === theme ? 'default' : 'outline'}
                onClick={() => setSelectedTheme(theme)}
                size="sm"
              >
                {theme} ({worksByTheme.get(theme)?.length || 0})
              </Button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredWorks.length} {filteredWorks.length === 1 ? 'work' : 'works'}
            {selectedTheme && ` exploring "${selectedTheme}"`}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorks.map((work) => (
            <Card
              key={work.id}
              className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/?work=${work.id}`)}
            >
              <div className="mb-3">
                <Badge variant="secondary" className="text-xs mb-2">
                  {work.type === 'short-story'
                    ? 'Short Story'
                    : work.type === 'novella'
                    ? 'Novella'
                    : 'Novel'}
                </Badge>
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                {work.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">{work.year}</p>
              <p className="text-sm text-foreground/80 mb-4 line-clamp-3">
                {work.summary}
              </p>
              {work.themes && work.themes.length > 0 && (
                <div className="border-t border-border pt-3">
                  <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                    Themes:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {work.themes.map((theme) => (
                      <Badge
                        key={theme}
                        variant={theme === selectedTheme ? 'default' : 'outline'}
                        className="text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTheme(theme);
                        }}
                      >
                        {theme}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        {filteredWorks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No works found for this theme.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Themes;
