import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, Code, FileCode, Database, Layout, Search, FolderOpen, BarChart3, Palette, Filter, Layers } from 'lucide-react';

interface SourceFile {
  title: string;
  path: string;
  category: 'Core' | 'Pages' | 'Components' | 'Data' | 'Hooks' | 'Styles';
  icon: React.ElementType;
  description: string;
  code: string;
}

const sourceFiles: Record<string, SourceFile> = {
  app: {
    title: 'App.tsx',
    path: 'src/App.tsx',
    category: 'Core',
    icon: Layout,
    description: 'Main application entry point with routing configuration',
    code: `import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Characters from "./pages/Characters";
import Biography from "./pages/Biography";
import Themes from "./pages/Themes";
import Statistics from "./pages/Statistics";
import Documentation from "./pages/Documentation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/biography" element={<Biography />} />
          <Route path="/themes" element={<Themes />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;`
  },
  statistics: {
    title: 'Statistics.tsx',
    path: 'src/pages/Statistics.tsx',
    category: 'Pages',
    icon: BarChart3,
    description: 'Statistical analysis page with charts and visualizations',
    code: `import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { allWorks } from '@/data/heinleinWorks';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { NetworkGraph } from '@/components/NetworkGraph';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
         ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { ArrowLeft, BookOpen, Users, Calendar, TrendingUp } from 'lucide-react';

const Statistics = () => {
  const navigate = useNavigate();

  const stats = useMemo(() => {
    const novels = allWorks.filter(w => w.type === 'novel');
    const novellas = allWorks.filter(w => w.type === 'novella');
    const shortStories = allWorks.filter(w => w.type === 'short-story');
    const totalCharacters = allWorks.reduce((acc, w) => acc + w.characters.length, 0);
    const totalWordCount = allWorks.reduce((acc, w) => acc + (w.wordCount || 0), 0);
    
    return {
      totalWorks: allWorks.length,
      novels: novels.length,
      novellas: novellas.length,
      shortStories: shortStories.length,
      totalCharacters,
      avgCharactersPerWork: (totalCharacters / allWorks.length).toFixed(1),
      totalWordCount,
    };
  }, []);

  // Prepare data for charts
  const worksByDecade = useMemo(() => {
    const decades: Record<string, number> = {};
    allWorks.forEach(work => {
      const decade = Math.floor(work.year / 10) * 10;
      decades[decade] = (decades[decade] || 0) + 1;
    });
    return Object.entries(decades)
      .map(([decade, count]) => ({ decade: \`\${decade}s\`, count }))
      .sort((a, b) => parseInt(a.decade) - parseInt(b.decade));
  }, []);

  const typeDistribution = useMemo(() => [
    { name: 'Novels', value: stats.novels, color: 'hsl(var(--primary))' },
    { name: 'Novellas', value: stats.novellas, color: 'hsl(var(--secondary))' },
    { name: 'Short Stories', value: stats.shortStories, color: 'hsl(var(--accent))' },
  ], [stats]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <Button onClick={() => navigate('/')} variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Works
          </Button>
          <h1 className="font-serif text-3xl font-bold text-primary mt-4">
            Statistics & Analytics
          </h1>
        </div>
      </header>

      {/* Stats Cards */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card className="p-6">
            <BookOpen className="h-8 w-8 text-primary mb-2" />
            <p className="text-2xl font-bold">{stats.totalWorks}</p>
            <p className="text-muted-foreground">Total Works</p>
          </Card>
          {/* More stat cards... */}
        </div>

        {/* Charts */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card className="p-6">
            <h3 className="font-serif text-xl font-bold mb-4">Works by Decade</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={worksByDecade}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="decade" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h3 className="font-serif text-xl font-bold mb-4">Work Types</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={typeDistribution} dataKey="value" nameKey="name">
                  {typeDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Network Graph */}
        <NetworkGraph />
      </main>
    </div>
  );
};

export default Statistics;`
  },
  themes: {
    title: 'Themes.tsx',
    path: 'src/pages/Themes.tsx',
    category: 'Pages',
    icon: Palette,
    description: 'Theme analysis page with filtering and visualization',
    code: `import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { allWorks } from '@/data/heinleinWorks';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowLeft, Lightbulb, TrendingUp, Filter } from 'lucide-react';

const Themes = () => {
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  // Calculate theme statistics
  const themeStats = useMemo(() => {
    const themeCounts: Record<string, number> = {};
    allWorks.forEach(work => {
      work.themes?.forEach(theme => {
        themeCounts[theme] = (themeCounts[theme] || 0) + 1;
      });
    });
    return Object.entries(themeCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, []);

  // Get works for selected theme
  const worksByTheme = useMemo(() => {
    const map: Record<string, typeof allWorks> = {};
    allWorks.forEach(work => {
      work.themes?.forEach(theme => {
        if (!map[theme]) map[theme] = [];
        map[theme].push(work);
      });
    });
    return map;
  }, []);

  // Theme co-occurrence analysis
  const themeCoOccurrence = useMemo(() => {
    const pairs: Record<string, number> = {};
    allWorks.forEach(work => {
      const themes = work.themes || [];
      for (let i = 0; i < themes.length; i++) {
        for (let j = i + 1; j < themes.length; j++) {
          const pair = [themes[i], themes[j]].sort().join(' + ');
          pairs[pair] = (pairs[pair] || 0) + 1;
        }
      }
    });
    return Object.entries(pairs)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 15);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <Button onClick={() => navigate('/')} variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Works
          </Button>
          <h1 className="font-serif text-3xl font-bold text-primary mt-4">
            Thematic Analysis
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Top Themes Chart */}
        <Card className="p-6 mb-8">
          <h3 className="font-serif text-xl font-bold mb-4">Top Themes</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={themeStats.slice(0, 15)} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={150} />
              <Tooltip />
              <Bar dataKey="count" fill="hsl(var(--primary))" 
                   onClick={(data) => setSelectedTheme(data.name)} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Theme Filter */}
        {selectedTheme && (
          <Card className="p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-xl font-bold">
                Works featuring "{selectedTheme}"
              </h3>
              <Button variant="ghost" onClick={() => setSelectedTheme(null)}>
                Clear filter
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {worksByTheme[selectedTheme]?.map(work => (
                <Card key={work.id} className="p-4">
                  <h4 className="font-semibold">{work.title}</h4>
                  <p className="text-sm text-muted-foreground">{work.year}</p>
                </Card>
              ))}
            </div>
          </Card>
        )}

        {/* Theme Co-occurrence */}
        <Card className="p-6">
          <h3 className="font-serif text-xl font-bold mb-4">Theme Combinations</h3>
          <div className="flex flex-wrap gap-2">
            {themeCoOccurrence.map(([pair, count]) => (
              <Badge key={pair} variant="secondary">
                {pair} ({count})
              </Badge>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Themes;`
  },
  filterBar: {
    title: 'FilterBar.tsx',
    path: 'src/components/FilterBar.tsx',
    category: 'Components',
    icon: Filter,
    description: 'Search and filter controls for the works catalog',
    code: `import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filterType: 'all' | 'novel' | 'short-story' | 'novella';
  onFilterChange: (type: 'all' | 'novel' | 'short-story' | 'novella') => void;
}

export const FilterBar = ({ 
  searchQuery, 
  onSearchChange, 
  filterType, 
  onFilterChange 
}: FilterBarProps) => {
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
};`
  },
  workCard: {
    title: 'WorkCard.tsx',
    path: 'src/components/WorkCard.tsx',
    category: 'Components',
    icon: FileCode,
    description: 'Card component for displaying individual works',
    code: `import { Work } from '@/data/heinleinWorks';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface WorkCardProps {
  work: Work;
  onClick: () => void;
}

export const WorkCard = ({ work, onClick }: WorkCardProps) => {
  return (
    <Card 
      className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] bg-card border-border"
      onClick={onClick}
    >
      <div className="aspect-[2/3] bg-muted relative overflow-hidden">
        {work.coverImage ? (
          <img 
            src={work.coverImage} 
            alt={work.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-secondary p-6">
            <div className="text-center">
              <h3 className="font-serif text-lg font-bold text-primary-foreground mb-2">{work.title}</h3>
              <p className="text-sm text-primary-foreground/80">{work.year}</p>
            </div>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="text-xs">
            {work.type === 'short-story' ? 'Short Story' : work.type === 'novella' ? 'Novella' : 'Novel'}
          </Badge>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-serif text-lg font-bold mb-1 text-foreground group-hover:text-primary transition-colors">
          {work.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-2">{work.year}</p>
        <p className="text-sm text-foreground/80 line-clamp-3">{work.summary}</p>
      </div>
    </Card>
  );
};`
  },
  workDetail: {
    title: 'WorkDetail.tsx',
    path: 'src/components/WorkDetail.tsx',
    category: 'Components',
    icon: Layers,
    description: 'Modal dialog for detailed work information',
    code: `import { Work } from '@/data/heinleinWorks';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface WorkDetailProps {
  work: Work | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const WorkDetail = ({ work, open, onOpenChange }: WorkDetailProps) => {
  if (!work) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <ScrollArea className="max-h-[90vh]">
          <div className="p-6">
            <DialogHeader>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-32 h-48 flex-shrink-0 bg-gradient-to-br from-primary to-secondary rounded-lg overflow-hidden">
                  {work.coverImage ? (
                    <img 
                      src={work.coverImage} 
                      alt={work.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center p-4">
                      <h3 className="font-serif text-sm font-bold text-primary-foreground text-center">
                        {work.title}
                      </h3>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <DialogTitle className="font-serif text-3xl mb-2">{work.title}</DialogTitle>
                  <div className="flex gap-2 items-center mb-3">
                    <Badge variant="secondary">
                      {work.type === 'short-story' ? 'Short Story' : work.type === 'novella' ? 'Novella' : 'Novel'}
                    </Badge>
                    <span className="text-muted-foreground">{work.year}</span>
                  </div>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-xl font-semibold mb-2">Summary</h3>
                <p className="text-foreground/80 leading-relaxed">{work.summary}</p>
              </div>

              <Separator />

              <div>
                <h3 className="font-serif text-xl font-semibold mb-4">Characters</h3>
                <div className="space-y-4">
                  {work.characters.map((character, index) => (
                    <div key={index} className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-semibold text-foreground mb-1">{character.name}</h4>
                      <p className="text-sm text-foreground/70">{character.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};`
  },
  networkGraph: {
    title: 'NetworkGraph.tsx',
    path: 'src/components/NetworkGraph.tsx',
    category: 'Components',
    icon: Code,
    description: 'Force-directed graph visualization of works and characters',
    code: `import { useMemo, useCallback, useRef, useEffect } from 'react';
import { allWorks, Work } from '@/data/heinleinWorks';
import ForceGraph2D from 'react-force-graph-2d';
import { Card } from '@/components/ui/card';

interface GraphNode {
  id: string;
  name: string;
  type: 'work' | 'character' | 'theme';
  group: number;
  val: number;
  year?: number;
  workType?: string;
}

interface GraphLink {
  source: string;
  target: string;
  type: 'has-character' | 'has-theme';
}

export const NetworkGraph = () => {
  const graphRef = useRef<any>();

  const graphData = useMemo(() => {
    const nodes: GraphNode[] = [];
    const links: GraphLink[] = [];
    const characterSet = new Set<string>();
    const themeSet = new Set<string>();

    // Add work nodes
    allWorks.forEach((work: Work) => {
      nodes.push({
        id: work.id,
        name: work.title,
        type: 'work',
        group: work.type === 'novel' ? 1 : work.type === 'novella' ? 2 : 3,
        val: work.type === 'novel' ? 20 : work.type === 'novella' ? 12 : 8,
        year: work.year,
        workType: work.type,
      });

      // Add character links
      work.characters.forEach((char) => {
        characterSet.add(char.name);
        links.push({
          source: work.id,
          target: \`char-\${char.name}\`,
          type: 'has-character',
        });
      });

      // Add theme links
      work.themes?.forEach((theme) => {
        themeSet.add(theme);
        links.push({
          source: work.id,
          target: \`theme-\${theme}\`,
          type: 'has-theme',
        });
      });
    });

    // Add character nodes
    characterSet.forEach((charName) => {
      nodes.push({
        id: \`char-\${charName}\`,
        name: charName,
        type: 'character',
        group: 4,
        val: 10,
      });
    });

    // Add theme nodes
    themeSet.forEach((theme) => {
      nodes.push({
        id: \`theme-\${theme}\`,
        name: theme,
        type: 'theme',
        group: 5,
        val: 8,
      });
    });

    return { nodes, links };
  }, []);

  const getNodeColor = useCallback((node: GraphNode) => {
    switch (node.type) {
      case 'work':
        return node.workType === 'novel' ? 'hsl(var(--primary))' : 'hsl(var(--secondary))';
      case 'character':
        return 'hsl(var(--chart-1))';
      case 'theme':
        return 'hsl(var(--chart-2))';
      default:
        return 'hsl(var(--muted))';
    }
  }, []);

  return (
    <Card className="p-6 w-full">
      <h2 className="font-serif text-2xl font-bold mb-4">Literary Universe Network</h2>
      <div className="w-full h-[600px] bg-card border rounded-lg overflow-hidden">
        <ForceGraph2D
          ref={graphRef}
          graphData={graphData}
          nodeLabel={(node: any) => node.name}
          nodeColor={getNodeColor as any}
          nodeVal={(node: any) => node.val}
          cooldownTicks={100}
          onEngineStop={() => graphRef.current?.zoomToFit(400)}
        />
      </div>
    </Card>
  );
};`
  },
  dataStructure: {
    title: 'heinleinWorks.ts',
    path: 'src/data/heinleinWorks.ts',
    category: 'Data',
    icon: Database,
    description: 'TypeScript interfaces and data for all literary works',
    code: `// Cover image imports
import strangerCover from '@/assets/covers/stranger-in-strange-land.jpg';
import moonCover from '@/assets/covers/moon-harsh-mistress.jpg';
// ... more imports

export interface Character {
  name: string;
  description: string;
}

export interface Work {
  id: string;
  title: string;
  year: number;
  type: 'novel' | 'short-story' | 'novella';
  summary: string;
  characters: Character[];
  coverImage?: string;
  themes?: string[];
  wordCount?: number;
}

// Novel covers mapping
const novelCovers: Record<string, string> = {
  'stranger-in-a-strange-land': strangerCover,
  'the-moon-is-a-harsh-mistress': moonCover,
  // ... more mappings
};

export const heinleinWorks: Work[] = [
  {
    id: 'stranger-in-a-strange-land',
    title: 'Stranger in a Strange Land',
    year: 1961,
    type: 'novel',
    summary: 'Valentine Michael Smith, a human raised by Martians, returns to Earth and struggles to understand human culture while founding a new religion based on Martian philosophy.',
    themes: ['Religion & Philosophy', 'Alien Contact', 'Social Criticism', 'Free Love'],
    wordCount: 160000,
    characters: [
      {
        name: 'Valentine Michael Smith',
        description: 'Human raised on Mars with supernatural psychic abilities'
      },
      {
        name: 'Jubal Harshaw',
        description: 'Cynical but wise writer, doctor, and lawyer who becomes Mike\\'s mentor'
      }
    ]
  },
  // ... 31 more novels
];

// Short stories data
import { heinleinShortStories } from './heinleinShortStories';

// Merge all works and sort by year
export const allWorks = [
  ...heinleinWorks.map(work => ({
    ...work,
    coverImage: novelCovers[work.id] || work.coverImage
  })),
  ...heinleinShortStories
].sort((a, b) => a.year - b.year);`
  },
  shortStories: {
    title: 'heinleinShortStories.ts',
    path: 'src/data/heinleinShortStories.ts',
    category: 'Data',
    icon: Database,
    description: 'Short stories and novellas data with cover mappings',
    code: `// Short story cover imports
import lifeLineCover from '@/assets/covers/life-line.jpg';
import misfitCover from '@/assets/covers/misfit.jpg';
import requiemCover from '@/assets/covers/requiem.jpg';
// ... more imports

// Short story covers mapping
const shortStoryCovers: Record<string, string> = {
  'life-line': lifeLineCover,
  'misfit': misfitCover,
  'requiem': requiemCover,
  // ... more mappings
};

export const heinleinShortStories: Work[] = [
  {
    id: 'life-line',
    title: 'Life-Line',
    year: 1939,
    type: 'short-story',
    summary: 'Dr. Hugo Pinero invents a machine that can predict the exact moment of a person\\'s death, causing upheaval in the insurance industry.',
    themes: ['Technology & Society', 'Prediction'],
    wordCount: 8000,
    characters: [
      {
        name: 'Dr. Hugo Pinero',
        description: 'Inventor of the life-prediction machine'
      }
    ],
    coverImage: shortStoryCovers['life-line']
  },
  // ... 46 more short stories and novellas
];`
  },
  indexCss: {
    title: 'index.css',
    path: 'src/index.css',
    category: 'Styles',
    icon: Palette,
    description: 'Global CSS with Tailwind and custom design tokens',
    code: `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    /* ... dark mode tokens */
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}`
  }
};

const categories = ['All', 'Core', 'Pages', 'Components', 'Data', 'Styles'] as const;
type Category = typeof categories[number];

const Documentation = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<string>('app');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');

  const filteredFiles = useMemo(() => {
    return Object.entries(sourceFiles).filter(([key, file]) => {
      const matchesSearch = searchQuery === '' || 
        file.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        file.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        file.code.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || file.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const filesByCategory = useMemo(() => {
    const grouped: Record<string, [string, SourceFile][]> = {};
    filteredFiles.forEach(([key, file]) => {
      if (!grouped[file.category]) grouped[file.category] = [];
      grouped[file.category].push([key, file]);
    });
    return grouped;
  }, [filteredFiles]);

  const currentFile = sourceFiles[selectedFile];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button onClick={() => navigate('/')} variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Works
            </Button>
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary">
                Documentation
              </h1>
              <p className="text-muted-foreground mt-1">
                Source code and architecture of the Heinlein Archive
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* About Section */}
        <Card className="p-6 mb-8">
          <h2 className="font-serif text-2xl font-bold mb-4">About This Project</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p className="mb-4">
              A comprehensive digital archive of Robert A. Heinlein's literary works, 
              built with modern web technologies featuring 32 novels, 47 short stories/novellas,
              AI-generated vintage sci-fi artwork, and interactive visualizations.
            </p>
            <p>
              <strong className="text-foreground">Tech Stack:</strong> React + TypeScript, Vite, Tailwind CSS, 
              shadcn/ui, Recharts, React Force Graph, React Router
            </p>
          </div>
        </Card>

        <div className="grid lg:grid-cols-[320px_1fr] gap-6">
          {/* Sidebar - File Browser */}
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* File List */}
            <Card className="p-2">
              <ScrollArea className="h-[500px]">
                <div className="space-y-1">
                  {Object.entries(filesByCategory).map(([category, files]) => (
                    <div key={category} className="mb-4">
                      <div className="flex items-center gap-2 px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        <FolderOpen className="h-3 w-3" />
                        {category}
                      </div>
                      {files.map(([key, file]) => (
                        <button
                          key={key}
                          onClick={() => setSelectedFile(key)}
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-left transition-colors ${
                            selectedFile === key
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-muted text-foreground'
                          }`}
                        >
                          <file.icon className="h-4 w-4 flex-shrink-0" />
                          <span className="truncate font-mono text-xs">{file.title}</span>
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          </div>

          {/* Code Viewer */}
          <Card className="overflow-hidden">
            <div className="border-b border-border bg-muted/50 px-4 py-3">
              <div className="flex items-center gap-3">
                <currentFile.icon className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-mono text-sm font-semibold">{currentFile.title}</h3>
                  <p className="text-xs text-muted-foreground">{currentFile.path}</p>
                </div>
                <Badge variant="outline" className="ml-auto">
                  {currentFile.category}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{currentFile.description}</p>
            </div>
            <ScrollArea className="h-[600px]">
              <pre className="p-6 text-sm leading-relaxed">
                <code className="language-typescript text-foreground/90">{currentFile.code}</code>
              </pre>
            </ScrollArea>
          </Card>
        </div>

        {/* Architecture Overview */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="font-serif text-xl font-bold mb-4 flex items-center gap-2">
              <Code className="h-5 w-5" />
              Project Structure
            </h3>
            <div className="font-mono text-sm text-muted-foreground space-y-1">
              <div>src/</div>
              <div className="pl-4">├── pages/ (6 page components)</div>
              <div className="pl-4">├── components/ (5 feature components)</div>
              <div className="pl-4">├── components/ui/ (30+ shadcn components)</div>
              <div className="pl-4">├── data/ (2 data files)</div>
              <div className="pl-4">├── assets/covers/ (79 cover images)</div>
              <div className="pl-4">├── hooks/ (2 custom hooks)</div>
              <div className="pl-4">└── lib/ (utility functions)</div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-serif text-xl font-bold mb-4 flex items-center gap-2">
              <Database className="h-5 w-5" />
              Data Statistics
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div><strong className="text-foreground">Total Works:</strong> 79 (32 novels, 12 novellas, 35 short stories)</div>
              <div><strong className="text-foreground">Cover Images:</strong> 79 AI-generated vintage artworks</div>
              <div><strong className="text-foreground">Characters:</strong> 200+ unique characters</div>
              <div><strong className="text-foreground">Themes:</strong> 30+ distinct categories</div>
              <div><strong className="text-foreground">Time Span:</strong> 1939-1987 (48 years)</div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Documentation;
