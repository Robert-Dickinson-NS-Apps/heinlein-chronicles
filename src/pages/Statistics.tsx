import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { allWorks } from '@/data/heinleinWorks';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, BarChart3, BookOpen, Users, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { NetworkGraph } from '@/components/NetworkGraph';

const Statistics = () => {
  const navigate = useNavigate();

  const stats = useMemo(() => {
    const totalWorks = allWorks.length;
    const novels = allWorks.filter((w) => w.type === 'novel').length;
    const novellas = allWorks.filter((w) => w.type === 'novella').length;
    const shortStories = allWorks.filter((w) => w.type === 'short-story').length;
    const totalCharacters = allWorks.reduce((sum, w) => sum + w.characters.length, 0);
    const avgCharactersPerWork = Math.round(totalCharacters / totalWorks);
    const totalWordCount = allWorks.reduce((sum, w) => sum + (w.wordCount || 0), 0);
    
    return {
      totalWorks,
      novels,
      novellas,
      shortStories,
      totalCharacters,
      avgCharactersPerWork,
      totalWordCount,
    };
  }, []);

  // Works by decade
  const worksByDecade = useMemo(() => {
    const decades: { [key: string]: number } = {};
    allWorks.forEach((work) => {
      const decade = Math.floor(work.year / 10) * 10;
      decades[decade] = (decades[decade] || 0) + 1;
    });
    return Object.entries(decades)
      .map(([decade, count]) => ({
        decade: `${decade}s`,
        count,
      }))
      .sort((a, b) => parseInt(a.decade) - parseInt(b.decade));
  }, []);

  // Work type distribution
  const typeDistribution = useMemo(() => {
    return [
      { name: 'Novels', value: stats.novels, color: 'hsl(var(--primary))' },
      { name: 'Novellas', value: stats.novellas, color: 'hsl(var(--secondary))' },
      { name: 'Short Stories', value: stats.shortStories, color: 'hsl(var(--accent))' },
    ];
  }, [stats]);

  // Publication timeline (cumulative)
  const publicationTimeline = useMemo(() => {
    const sorted = [...allWorks].sort((a, b) => a.year - b.year);
    let cumulative = 0;
    return sorted.map((work) => {
      cumulative++;
      return { year: work.year, count: cumulative, title: work.title };
    });
  }, []);

  // Top works by character count
  const topWorksByCharacters = useMemo(() => {
    return [...allWorks]
      .sort((a, b) => b.characters.length - a.characters.length)
      .slice(0, 10)
      .map((work) => ({
        name: work.title.length > 20 ? work.title.substring(0, 20) + '...' : work.title,
        characters: work.characters.length,
      }));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" onClick={() => navigate('/')} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Works
          </Button>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-2 flex items-center gap-3">
            <BarChart3 className="h-10 w-10" />
            Reading Statistics
          </h1>
          <p className="text-lg text-muted-foreground">
            Comprehensive analysis of Heinlein\'s literary output
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <BookOpen className="h-10 w-10 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Works</p>
                <p className="text-3xl font-bold text-foreground">{stats.totalWorks}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <Users className="h-10 w-10 text-secondary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Characters</p>
                <p className="text-3xl font-bold text-foreground">{stats.totalCharacters}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <BarChart3 className="h-10 w-10 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Characters/Work</p>
                <p className="text-3xl font-bold text-foreground">{stats.avgCharactersPerWork}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <Calendar className="h-10 w-10 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Career Span</p>
                <p className="text-3xl font-bold text-foreground">49 years</p>
                <p className="text-xs text-muted-foreground">1939-1988</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Works by Decade */}
          <Card className="p-6">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
              Works by Decade
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={worksByDecade}>
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
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Work Type Distribution */}
          <Card className="p-6">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
              Work Type Distribution
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={typeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {typeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
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
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Novels:</span>
                <span className="font-semibold">{stats.novels}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Novellas:</span>
                <span className="font-semibold">{stats.novellas}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Short Stories:</span>
                <span className="font-semibold">{stats.shortStories}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cumulative Publications Timeline */}
          <Card className="p-6">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
              Cumulative Publications Over Time
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={publicationTimeline}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="year"
                  stroke="hsl(var(--foreground))"
                  tick={{ fontSize: 12 }}
                />
                <YAxis stroke="hsl(var(--foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: any, name: string, props: any) => [
                    `${value} works`,
                    props.payload.title,
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Top Works by Character Count */}
          <Card className="p-6">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
              Top Works by Character Count
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topWorksByCharacters} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--foreground))" />
                <YAxis
                  dataKey="name"
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
                <Bar dataKey="characters" fill="hsl(var(--accent))" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Network Graph Visualization */}
        <NetworkGraph />

        {/* Additional Stats */}
        <Card className="p-6">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
            Additional Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">
                {Math.round(stats.totalWordCount / 1000)}K+
              </p>
              <p className="text-sm text-muted-foreground">Estimated Total Words</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-secondary mb-2">4</p>
              <p className="text-sm text-muted-foreground">Hugo Awards Won</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-accent mb-2">1975</p>
              <p className="text-sm text-muted-foreground">Named Grand Master</p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Statistics;
