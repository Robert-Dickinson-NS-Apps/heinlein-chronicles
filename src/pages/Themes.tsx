import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { allWorks } from '@/data/heinleinWorks';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Lightbulb, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis } from 'recharts';
import themesHero from '@/assets/themes-hero.jpg';

const Themes = () => {
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  // Extract all unique themes with counts
  const themeStats = useMemo(() => {
    const themeMap = new Map<string, number>();
    allWorks.forEach((work) => {
      work.themes?.forEach((theme) => {
        themeMap.set(theme, (themeMap.get(theme) || 0) + 1);
      });
    });
    return Array.from(themeMap.entries())
      .map(([theme, count]) => ({ theme, count }))
      .sort((a, b) => b.count - a.count);
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

  // Theme frequency by decade
  const themesByDecade = useMemo(() => {
    const decades = new Map<number, Map<string, number>>();
    allWorks.forEach((work) => {
      const decade = Math.floor(work.year / 10) * 10;
      if (!decades.has(decade)) {
        decades.set(decade, new Map());
      }
      const decadeMap = decades.get(decade)!;
      work.themes?.forEach((theme) => {
        decadeMap.set(theme, (decadeMap.get(theme) || 0) + 1);
      });
    });

    // Convert to chart data
    const topThemes = themeStats.slice(0, 5).map((t) => t.theme);
    return Array.from(decades.entries())
      .map(([decade, themeMap]) => {
        const data: any = { decade: `${decade}s` };
        topThemes.forEach((theme) => {
          data[theme] = themeMap.get(theme) || 0;
        });
        return data;
      })
      .sort((a, b) => parseInt(a.decade) - parseInt(b.decade));
  }, [themeStats]);

  // Theme distribution by work type
  const themesByWorkType = useMemo(() => {
    const types = new Map<string, Map<string, number>>();
    allWorks.forEach((work) => {
      if (!types.has(work.type)) {
        types.set(work.type, new Map());
      }
      const typeMap = types.get(work.type)!;
      work.themes?.forEach((theme) => {
        typeMap.set(theme, (typeMap.get(theme) || 0) + 1);
      });
    });

    const topThemes = themeStats.slice(0, 8).map((t) => t.theme);
    return topThemes.map((theme) => {
      return {
        theme: theme.length > 20 ? theme.substring(0, 20) + '...' : theme,
        fullTheme: theme,
        novels: types.get('novel')?.get(theme) || 0,
        novellas: types.get('novella')?.get(theme) || 0,
        shortStories: types.get('short-story')?.get(theme) || 0,
      };
    });
  }, [themeStats]);

  // Theme co-occurrence (which themes appear together)
  const themeCoOccurrence = useMemo(() => {
    const coOccur = new Map<string, Map<string, number>>();
    allWorks.forEach((work) => {
      const themes = work.themes || [];
      themes.forEach((theme1) => {
        if (!coOccur.has(theme1)) {
          coOccur.set(theme1, new Map());
        }
        const theme1Map = coOccur.get(theme1)!;
        themes.forEach((theme2) => {
          if (theme1 !== theme2) {
            theme1Map.set(theme2, (theme1Map.get(theme2) || 0) + 1);
          }
        });
      });
    });

    // Get top co-occurrences
    const pairs: Array<{ theme1: string; theme2: string; count: number }> = [];
    coOccur.forEach((theme2Map, theme1) => {
      theme2Map.forEach((count, theme2) => {
        // Only add each pair once (avoid duplicates)
        if (theme1 < theme2) {
          pairs.push({ theme1, theme2, count });
        }
      });
    });

    return pairs.sort((a, b) => b.count - a.count).slice(0, 15);
  }, []);

  const topThemes = themeStats.slice(0, 10);
  const colors = [
    'hsl(var(--primary))',
    'hsl(var(--secondary))',
    'hsl(var(--accent))',
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))',
  ];

  const filteredWorks = selectedTheme
    ? worksByTheme.get(selectedTheme) || []
    : allWorks.filter((w) => w.themes && w.themes.length > 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div
        className="relative h-64 bg-cover bg-center"
        style={{ backgroundImage: `url(${themesHero})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/70" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <Button variant="ghost" onClick={() => navigate('/')} className="mb-4 w-fit">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Works
          </Button>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Lightbulb className="h-10 w-10 text-primary" />
            Themes Analysis
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore recurring themes across Heinlein's literary universe
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <TrendingUp className="h-10 w-10 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Themes</p>
                <p className="text-3xl font-bold text-foreground">{themeStats.length}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <Lightbulb className="h-10 w-10 text-secondary" />
              <div>
                <p className="text-sm text-muted-foreground">Most Common</p>
                <p className="text-xl font-bold text-foreground">{topThemes[0]?.theme}</p>
                <p className="text-xs text-muted-foreground">{topThemes[0]?.count} works</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold">
                %
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Themes/Work</p>
                <p className="text-3xl font-bold text-foreground">
                  {(allWorks.reduce((sum, w) => sum + (w.themes?.length || 0), 0) / allWorks.length).toFixed(1)}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Top Themes Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
              Top 10 Themes
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topThemes} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--foreground))" />
                <YAxis
                  dataKey="theme"
                  type="category"
                  stroke="hsl(var(--foreground))"
                  width={150}
                  tick={{ fontSize: 11 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
              Theme Distribution
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={topThemes}
                  dataKey="count"
                  nameKey="theme"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ theme, percent }: any) => {
                    const themeStr = String(theme);
                    const percentNum = Number(percent);
                    return `${themeStr.substring(0, 15)}: ${(percentNum * 100).toFixed(0)}%`;
                  }}
                  labelLine={false}
                >
                  {topThemes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Themes by Decade */}
        <Card className="p-6">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
            Top Themes Evolution by Decade
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={themesByDecade}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="decade" stroke="hsl(var(--foreground))" />
              <YAxis stroke="hsl(var(--foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              {topThemes.slice(0, 5).map((theme, index) => (
                <Bar
                  key={theme.theme}
                  dataKey={theme.theme}
                  stackId="a"
                  fill={colors[index % colors.length]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Themes by Work Type */}
        <Card className="p-6">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
            Themes by Work Type
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={themesByWorkType}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="theme"
                stroke="hsl(var(--foreground))"
                angle={-45}
                textAnchor="end"
                height={100}
                tick={{ fontSize: 10 }}
              />
              <YAxis stroke="hsl(var(--foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="novels" fill="hsl(var(--primary))" name="Novels" />
              <Bar dataKey="novellas" fill="hsl(var(--secondary))" name="Novellas" />
              <Bar dataKey="shortStories" fill="hsl(var(--accent))" name="Short Stories" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Theme Co-occurrence */}
        <Card className="p-6">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
            Most Common Theme Combinations
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Themes that frequently appear together in the same work
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {themeCoOccurrence.map((pair, index) => (
              <div
                key={index}
                className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {pair.count} works
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-primary">{pair.theme1}</p>
                  <p className="text-xs text-muted-foreground">+</p>
                  <p className="text-sm font-semibold text-secondary">{pair.theme2}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Theme Filter Section */}
        <div>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
            Browse Works by Theme
          </h2>
          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              variant={selectedTheme === null ? 'default' : 'outline'}
              onClick={() => setSelectedTheme(null)}
              size="sm"
            >
              All Themes ({allWorks.filter((w) => w.themes && w.themes.length > 0).length})
            </Button>
            {themeStats.map(({ theme, count }) => (
              <Button
                key={theme}
                variant={selectedTheme === theme ? 'default' : 'outline'}
                onClick={() => setSelectedTheme(theme)}
                size="sm"
              >
                {theme} ({count})
              </Button>
            ))}
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            Showing {filteredWorks.length} {filteredWorks.length === 1 ? 'work' : 'works'}
            {selectedTheme && ` exploring "${selectedTheme}"`}
          </p>

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
                          className="text-xs cursor-pointer"
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
        </div>
      </main>
    </div>
  );
};

export default Themes;
