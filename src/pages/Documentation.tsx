import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, Code, FileCode, Database, Layout } from 'lucide-react';

const Documentation = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState('app');

  const sourceFiles = {
    app: {
      title: 'App.tsx',
      category: 'Core',
      icon: Layout,
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;`
    },
    workCard: {
      title: 'WorkCard.tsx',
      category: 'Components',
      icon: FileCode,
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
      className="overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]"
      onClick={onClick}
    >
      {work.coverImage && (
        <div className="aspect-[2/3] overflow-hidden bg-muted">
          <img
            src={work.coverImage}
            alt={\`Cover of \${work.title}\`}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <div className="mb-2">
          <Badge variant={
            work.type === 'novel' ? 'default' :
            work.type === 'novella' ? 'secondary' :
            'outline'
          }>
            {work.type === 'novel' ? 'Novel' :
             work.type === 'novella' ? 'Novella' :
             'Short Story'}
          </Badge>
          <Badge variant="outline" className="ml-2">
            {work.year}
          </Badge>
        </div>
        <h3 className="font-serif text-lg font-semibold text-foreground line-clamp-2 mb-2">
          {work.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {work.summary}
        </p>
      </div>
    </Card>
  );
};`
    },
    networkGraph: {
      title: 'NetworkGraph.tsx',
      category: 'Components',
      icon: Code,
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
}

export const NetworkGraph = () => {
  const graphRef = useRef<any>();

  const graphData = useMemo(() => {
    const nodes: GraphNode[] = [];
    const links: any[] = [];
    const characterSet = new Set<string>();
    const themeSet = new Set<string>();

    allWorks.forEach((work: Work) => {
      nodes.push({
        id: work.id,
        name: work.title,
        type: 'work',
        group: work.type === 'novel' ? 1 : 2,
        val: work.type === 'novel' ? 20 : 12,
      });

      work.characters.forEach((char) => {
        characterSet.add(char.name);
        links.push({
          source: work.id,
          target: \`char-\${char.name}\`,
          type: 'has-character',
        });
      });

      work.themes?.forEach((theme) => {
        themeSet.add(theme);
        links.push({
          source: work.id,
          target: \`theme-\${theme}\`,
          type: 'has-theme',
        });
      });
    });

    characterSet.forEach((charName) => {
      nodes.push({
        id: \`char-\${charName}\`,
        name: charName,
        type: 'character',
        group: 4,
        val: 10,
      });
    });

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

  return (
    <Card className="p-6 w-full">
      <h2 className="font-serif text-2xl font-bold mb-4">
        Literary Universe Network
      </h2>
      <div className="w-full h-[600px] bg-card border rounded-lg overflow-hidden">
        <ForceGraph2D
          ref={graphRef}
          graphData={graphData}
          nodeLabel={(node: any) => node.name}
          nodeVal={(node: any) => node.val}
          cooldownTicks={100}
        />
      </div>
    </Card>
  );
};`
    },
    dataStructure: {
      title: 'heinleinWorks.ts',
      category: 'Data',
      icon: Database,
      code: `export interface Character {
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

export const heinleinWorks: Work[] = [
  {
    id: 'stranger-in-a-strange-land',
    title: 'Stranger in a Strange Land',
    year: 1961,
    type: 'novel',
    summary: 'A human raised by Martians returns to Earth...',
    themes: ['Religion & Philosophy', 'Alien Contact'],
    wordCount: 160000,
    characters: [
      {
        name: 'Valentine Michael Smith',
        description: 'Human raised on Mars with supernatural abilities'
      },
      {
        name: 'Jubal Harshaw',
        description: 'Cynical but wise writer and doctor'
      }
    ]
  },
  // ... more works
];

// Merge with short stories
export const allWorks = [
  ...heinleinWorks,
  ...additionalShortStories
].sort((a, b) => a.year - b.year);`
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate('/')}
              variant="ghost"
              size="sm"
            >
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
        <div className="grid gap-6 mb-8">
          <Card className="p-6">
            <h2 className="font-serif text-2xl font-bold mb-4">About This Project</h2>
            <div className="prose prose-sm max-w-none text-muted-foreground">
              <p className="mb-4">
                This is a comprehensive digital archive of Robert A. Heinlein's literary works, 
                built with modern web technologies. The application features:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Complete catalog of 32 novels and 47 short stories/novellas</li>
                <li>AI-generated vintage sci-fi cover artwork for all works</li>
                <li>Interactive network visualization of works, characters, and themes</li>
                <li>Statistical analysis and data visualizations</li>
                <li>Searchable and filterable interface</li>
              </ul>
              <p>
                <strong>Tech Stack:</strong> React + TypeScript, Vite, Tailwind CSS, 
                shadcn/ui, Recharts, React Force Graph, React Router
              </p>
            </div>
          </Card>
        </div>

        <Tabs value={selectedFile} onValueChange={setSelectedFile} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            {Object.entries(sourceFiles).map(([key, file]) => (
              <TabsTrigger key={key} value={key} className="flex items-center gap-2">
                <file.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{file.category}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(sourceFiles).map(([key, file]) => (
            <TabsContent key={key} value={key}>
              <Card>
                <div className="border-b border-border bg-muted/50 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <file.icon className="h-5 w-5 text-primary" />
                    <h3 className="font-mono text-sm font-semibold">{file.title}</h3>
                    <Badge variant="outline" className="ml-auto">
                      {file.category}
                    </Badge>
                  </div>
                </div>
                <ScrollArea className="h-[600px]">
                  <pre className="p-6 text-sm">
                    <code className="language-typescript">{file.code}</code>
                  </pre>
                </ScrollArea>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="font-serif text-xl font-bold mb-4 flex items-center gap-2">
              <Code className="h-5 w-5" />
              Architecture
            </h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div>
                <strong className="text-foreground">Pages:</strong> Index, Characters, Biography, 
                Themes, Statistics, Documentation
              </div>
              <div>
                <strong className="text-foreground">Components:</strong> WorkCard, WorkDetail, 
                FilterBar, NetworkGraph, NavLink
              </div>
              <div>
                <strong className="text-foreground">Data:</strong> TypeScript interfaces for works 
                and characters, comprehensive data files
              </div>
              <div>
                <strong className="text-foreground">Styling:</strong> Tailwind CSS with custom 
                design tokens, shadcn/ui components
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-serif text-xl font-bold mb-4 flex items-center gap-2">
              <Database className="h-5 w-5" />
              Data Statistics
            </h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div>
                <strong className="text-foreground">Total Works:</strong> 79 (32 novels, 
                12 novellas, 35 short stories)
              </div>
              <div>
                <strong className="text-foreground">Cover Images:</strong> 75 AI-generated 
                vintage sci-fi artworks
              </div>
              <div>
                <strong className="text-foreground">Characters:</strong> 200+ unique characters 
                across all works
              </div>
              <div>
                <strong className="text-foreground">Themes:</strong> 30+ distinct thematic 
                categories
              </div>
              <div>
                <strong className="text-foreground">Time Span:</strong> 1939-1987 (48 years 
                of publishing)
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Documentation;
