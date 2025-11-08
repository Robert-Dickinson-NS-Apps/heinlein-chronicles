import { useMemo, useCallback, useRef, useEffect } from 'react';
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

interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

export const NetworkGraph = () => {
  const graphRef = useRef<any>();

  const graphData = useMemo<GraphData>(() => {
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

      // Collect unique characters
      work.characters.forEach((char) => {
        characterSet.add(char.name);
        links.push({
          source: work.id,
          target: `char-${char.name}`,
          type: 'has-character',
        });
      });

      // Collect unique themes
      work.themes?.forEach((theme) => {
        themeSet.add(theme);
        links.push({
          source: work.id,
          target: `theme-${theme}`,
          type: 'has-theme',
        });
      });
    });

    // Add character nodes
    characterSet.forEach((charName) => {
      const appearances = allWorks.filter((w) =>
        w.characters.some((c) => c.name === charName)
      ).length;
      nodes.push({
        id: `char-${charName}`,
        name: charName,
        type: 'character',
        group: 4,
        val: Math.min(appearances * 3, 15),
      });
    });

    // Add theme nodes
    themeSet.forEach((theme) => {
      const occurrences = allWorks.filter((w) => w.themes?.includes(theme)).length;
      nodes.push({
        id: `theme-${theme}`,
        name: theme,
        type: 'theme',
        group: 5,
        val: Math.min(occurrences * 2, 12),
      });
    });

    return { nodes, links };
  }, []);

  const getNodeColor = useCallback((node: GraphNode) => {
    switch (node.type) {
      case 'work':
        return node.workType === 'novel'
          ? 'hsl(var(--primary))'
          : node.workType === 'novella'
          ? 'hsl(var(--secondary))'
          : 'hsl(var(--accent))';
      case 'character':
        return 'hsl(var(--chart-1))';
      case 'theme':
        return 'hsl(var(--chart-2))';
      default:
        return 'hsl(var(--muted))';
    }
  }, []);

  const getLinkColor = useCallback((link: GraphLink) => {
    return link.type === 'has-character'
      ? 'rgba(100, 149, 237, 0.2)'
      : 'rgba(255, 140, 0, 0.2)';
  }, []);

  const handleNodeClick = useCallback((node: GraphNode) => {
    if (node.type === 'work') {
      // Could navigate to work detail
      console.log('Clicked work:', node.name);
    }
  }, []);

  useEffect(() => {
    // Auto-zoom to fit graph on mount
    if (graphRef.current) {
      graphRef.current.zoomToFit(400);
    }
  }, []);

  return (
    <Card className="p-6 w-full">
      <div className="mb-6">
        <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
          Literary Universe Network
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Interactive visualization showing connections between works, characters, and themes
        </p>
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: 'hsl(var(--primary))' }}
            />
            <span className="text-muted-foreground">Novels</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: 'hsl(var(--secondary))' }}
            />
            <span className="text-muted-foreground">Novellas</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: 'hsl(var(--accent))' }}
            />
            <span className="text-muted-foreground">Short Stories</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: 'hsl(var(--chart-1))' }}
            />
            <span className="text-muted-foreground">Characters</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: 'hsl(var(--chart-2))' }}
            />
            <span className="text-muted-foreground">Themes</span>
          </div>
        </div>
      </div>

      <div className="w-full h-[600px] bg-card border border-border rounded-lg overflow-hidden">
        <ForceGraph2D
          ref={graphRef}
          graphData={graphData}
          nodeLabel={(node: any) => node.name}
          nodeColor={getNodeColor as any}
          nodeVal={(node: any) => node.val}
          linkColor={getLinkColor as any}
          linkWidth={1}
          onNodeClick={handleNodeClick as any}
          cooldownTicks={100}
          onEngineStop={() => graphRef.current?.zoomToFit(400)}
          nodeCanvasObjectMode={() => 'after'}
          nodeCanvasObject={(node: any, ctx, globalScale) => {
            const label = node.name;
            const fontSize = Math.max(3, 12 / globalScale);
            ctx.font = `${fontSize}px Sans-Serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            
            if (globalScale > 1.5 || node.val > 12) {
              ctx.fillText(label, node.x, node.y + node.val + fontSize / 2);
            }
          }}
          d3VelocityDecay={0.3}
        />
      </div>

      <div className="mt-4 text-xs text-muted-foreground">
        <p>
          • Larger nodes indicate more connections or appearances
          <br />
          • Hover over nodes to see names
          <br />
          • Click and drag to explore • Scroll to zoom
        </p>
      </div>
    </Card>
  );
};
