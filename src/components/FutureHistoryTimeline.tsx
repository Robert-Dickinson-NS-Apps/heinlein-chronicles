import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { allWorks } from '@/data/heinleinWorks';
import { 
  futureHistoryEras, 
  narrativeConnections, 
  recurringCharacters,
  getConnectionsForWork,
  type NarrativeConnection 
} from '@/data/futureHistoryConnections';
import { seriesData } from '@/data/seriesData';
import { Rocket, Users, ArrowRight, Sparkles, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

interface TimelineNode {
  workId: string;
  title: string;
  year: number;
  eraId: string;
  connections: NarrativeConnection[];
}

export const FutureHistoryTimeline = () => {
  const [selectedWork, setSelectedWork] = useState<string | null>(null);
  const [expandedCharacter, setExpandedCharacter] = useState<string | null>(null);
  const [showAllConnections, setShowAllConnections] = useState(false);

  // Get Future History series data
  const futureHistorySeries = seriesData.find(s => s.id === 'future-history');
  const futureHistoryWorkIds = futureHistorySeries?.works || [];

  // Build timeline nodes
  const timelineNodes = useMemo<TimelineNode[]>(() => {
    return futureHistoryWorkIds
      .map(workId => {
        const work = allWorks.find(w => w.id === workId);
        if (!work) return null;
        
        const era = futureHistoryEras.find(e => e.works.includes(workId));
        
        return {
          workId: work.id,
          title: work.title,
          year: work.year,
          eraId: era?.id || 'unknown',
          connections: getConnectionsForWork(workId)
        };
      })
      .filter((n): n is TimelineNode => n !== null);
  }, [futureHistoryWorkIds]);

  // Get active connections based on selection
  const activeConnections = useMemo(() => {
    if (showAllConnections) return narrativeConnections;
    if (!selectedWork) return [];
    return getConnectionsForWork(selectedWork);
  }, [selectedWork, showAllConnections]);

  const getWorkByEra = (eraId: string) => {
    return timelineNodes.filter(node => node.eraId === eraId);
  };

  const getConnectionTypeColor = (type: NarrativeConnection['type']) => {
    switch (type) {
      case 'character': return 'bg-chart-1/20 text-chart-1 border-chart-1';
      case 'sequel': return 'bg-chart-2/20 text-chart-2 border-chart-2';
      case 'prequel': return 'bg-chart-3/20 text-chart-3 border-chart-3';
      case 'spinoff': return 'bg-chart-4/20 text-chart-4 border-chart-4';
      case 'reference': return 'bg-chart-5/20 text-chart-5 border-chart-5';
      default: return 'bg-muted text-muted-foreground border-muted';
    }
  };

  const getWorkTitle = (workId: string) => {
    return allWorks.find(w => w.id === workId)?.title || workId;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Rocket className="h-8 w-8 text-primary" />
          <h2 className="font-serif text-3xl font-bold text-foreground">
            Future History Timeline
          </h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore the interconnected stories spanning from humanity's first steps into space 
          to the far future of interstellar travel and the multiverse.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button
          variant={showAllConnections ? "default" : "outline"}
          size="sm"
          onClick={() => {
            setShowAllConnections(!showAllConnections);
            setSelectedWork(null);
          }}
        >
          <Sparkles className="h-4 w-4 mr-2" />
          {showAllConnections ? 'Hide All Connections' : 'Show All Connections'}
        </Button>
        {selectedWork && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedWork(null)}
          >
            Clear Selection
          </Button>
        )}
      </div>

      {/* Era Timeline */}
      <ScrollArea className="w-full">
        <div className="min-w-[900px] px-4 pb-4">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-chart-1 via-chart-3 to-chart-5 rounded-full" />
            
            {/* Eras */}
            <div className="flex justify-between relative">
              {futureHistoryEras.map((era, index) => {
                const eraWorks = getWorkByEra(era.id);
                const isFirst = index === 0;
                const isLast = index === futureHistoryEras.length - 1;
                
                return (
                  <div 
                    key={era.id} 
                    className={`flex-1 ${isFirst ? '' : 'pl-2'} ${isLast ? '' : 'pr-2'}`}
                  >
                    {/* Era marker */}
                    <div className="flex flex-col items-center mb-4">
                      <div 
                        className="w-4 h-4 rounded-full border-4 border-background z-10"
                        style={{ backgroundColor: era.color }}
                      />
                      <div className="mt-3 text-center">
                        <h3 className="font-semibold text-sm text-foreground">{era.name}</h3>
                        <p className="text-xs text-muted-foreground">{era.yearRange}</p>
                      </div>
                    </div>
                    
                    {/* Works in this era */}
                    <div className="space-y-2 mt-4">
                      {eraWorks.map(node => {
                        const isSelected = selectedWork === node.workId;
                        const hasActiveConnection = activeConnections.some(
                          c => c.source === node.workId || c.target === node.workId
                        );
                        const work = allWorks.find(w => w.id === node.workId);
                        
                        return (
                          <Tooltip key={node.workId}>
                            <TooltipTrigger asChild>
                              <button
                                onClick={() => setSelectedWork(isSelected ? null : node.workId)}
                                className={`w-full text-left p-2 rounded-lg border transition-all duration-200 ${
                                  isSelected 
                                    ? 'border-primary bg-primary/10 ring-2 ring-primary/50' 
                                    : hasActiveConnection
                                    ? 'border-primary/50 bg-primary/5'
                                    : 'border-border bg-card hover:border-primary/30 hover:bg-accent/50'
                                }`}
                              >
                                <div className="flex items-start gap-2">
                                  {work?.coverImage && (
                                    <img 
                                      src={work.coverImage} 
                                      alt={node.title}
                                      className="w-8 h-12 object-cover rounded shadow-sm flex-shrink-0"
                                    />
                                  )}
                                  <div className="min-w-0 flex-1">
                                    <p className="text-xs font-medium text-foreground truncate">
                                      {node.title}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      {node.year}
                                    </p>
                                    {node.connections.length > 0 && (
                                      <Badge variant="secondary" className="text-[10px] mt-1 px-1 py-0">
                                        {node.connections.length} link{node.connections.length !== 1 ? 's' : ''}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="font-medium">{node.title}</p>
                              <p className="text-xs text-muted-foreground">
                                Published {node.year} • Click to see connections
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* Connection Details Panel */}
      {activeConnections.length > 0 && (
        <Card className="p-6 bg-card/50 backdrop-blur">
          <h3 className="font-serif text-xl font-semibold mb-4 flex items-center gap-2">
            <ArrowRight className="h-5 w-5 text-primary" />
            {showAllConnections ? 'All Narrative Connections' : `Connections for "${getWorkTitle(selectedWork!)}"`}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {activeConnections.map((conn, index) => (
              <div 
                key={index}
                className={`p-3 rounded-lg border ${getConnectionTypeColor(conn.type)}`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Badge variant="outline" className="text-[10px] capitalize">
                    {conn.type}
                  </Badge>
                  {conn.character && (
                    <Badge variant="secondary" className="text-[10px]">
                      <Users className="h-3 w-3 mr-1" />
                      {conn.character}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Link 
                    to={`/work/${conn.source}`}
                    className="font-medium hover:text-primary transition-colors truncate"
                  >
                    {getWorkTitle(conn.source)}
                  </Link>
                  <ArrowRight className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                  <Link 
                    to={`/work/${conn.target}`}
                    className="font-medium hover:text-primary transition-colors truncate"
                  >
                    {getWorkTitle(conn.target)}
                  </Link>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {conn.description}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Recurring Characters Section */}
      <Card className="p-6">
        <h3 className="font-serif text-xl font-semibold mb-4 flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Key Recurring Characters
        </h3>
        <div className="space-y-3">
          {recurringCharacters.map(character => {
            const isExpanded = expandedCharacter === character.name;
            
            return (
              <div 
                key={character.name}
                className="border border-border rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setExpandedCharacter(isExpanded ? null : character.name)}
                  className="w-full p-4 flex items-center justify-between hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-serif font-bold text-primary">
                        {character.name.charAt(0)}
                      </span>
                    </div>
                    <div className="text-left">
                      <h4 className="font-medium text-foreground">{character.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Appears in {character.works.length} works
                      </p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
                
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-border bg-muted/30">
                    <p className="text-sm text-muted-foreground mt-3 mb-3">
                      {character.description}
                    </p>
                    <p className="text-sm mb-3">
                      <strong className="text-foreground">Significance:</strong>{' '}
                      <span className="text-muted-foreground">{character.significance}</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {character.works.map(workId => {
                        const work = allWorks.find(w => w.id === workId);
                        return work ? (
                          <Link
                            key={workId}
                            to={`/work/${workId}`}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-background border border-border text-xs hover:border-primary hover:text-primary transition-colors"
                          >
                            <BookOpen className="h-3 w-3" />
                            {work.title}
                          </Link>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-chart-2" />
          <span>Sequel</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-chart-1" />
          <span>Character Crossover</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-chart-4" />
          <span>Spinoff</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-chart-5" />
          <span>Reference</span>
        </div>
      </div>
    </div>
  );
};
