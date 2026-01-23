import { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { allWorks } from '@/data/heinleinWorks';
import { useReadingList, ReadingStatus } from '@/hooks/useReadingList';
import { ReadingStatusButton } from '@/components/ReadingStatusButton';
import { StarRating } from '@/components/StarRating';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  ArrowLeft,
  BookMarked,
  BookOpen,
  CheckCircle2,
  Library as LibraryIcon,
  Trophy,
  Sparkles
} from 'lucide-react';

const Library = () => {
  const navigate = useNavigate();
  const { readingList, getListByStatus, getStats, setStatus, setRating, getItem, isLoaded } = useReadingList();
  const [activeTab, setActiveTab] = useState<string>('all');

  const stats = useMemo(() => getStats(), [getStats]);
  
  const totalWorks = allWorks.length;
  const completionPercentage = Math.round((stats.finished / totalWorks) * 100);

  const getWorksForTab = (tab: string) => {
    if (tab === 'all') {
      return readingList.map(item => ({
        ...item,
        work: allWorks.find(w => w.id === item.workId)!
      })).filter(item => item.work);
    }
    
    const statusMap: Record<string, ReadingStatus> = {
      'want-to-read': 'want-to-read',
      'currently-reading': 'currently-reading',
      'finished': 'finished'
    };
    
    return getListByStatus(statusMap[tab] || null)
      .map(item => ({
        ...item,
        work: allWorks.find(w => w.id === item.workId)!
      })).filter(item => item.work);
  };

  const worksInTab = getWorksForTab(activeTab);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading your library...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Archive
            </Button>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary flex items-center gap-3">
                <LibraryIcon className="h-8 w-8" />
                My Reading List
              </h1>
              <p className="text-muted-foreground mt-1">
                Track your journey through Heinlein's universe
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <BookMarked className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.wantToRead}</p>
                <p className="text-xs text-muted-foreground">Want to Read</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <BookOpen className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.currentlyReading}</p>
                <p className="text-xs text-muted-foreground">Reading Now</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.finished}</p>
                <p className="text-xs text-muted-foreground">Finished</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Trophy className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{completionPercentage}%</p>
                <p className="text-xs text-muted-foreground">Complete</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Progress Bar */}
        <Card className="p-4 mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Heinlein Completionist Progress</span>
            <span className="text-sm text-muted-foreground">{stats.finished} of {totalWorks} works</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
          {completionPercentage === 100 && (
            <div className="flex items-center gap-2 mt-3 text-sm text-primary">
              <Sparkles className="h-4 w-4" />
              Congratulations! You've read all of Heinlein's works!
            </div>
          )}
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="all" className="gap-2">
              All <Badge variant="secondary" className="ml-1">{stats.total}</Badge>
            </TabsTrigger>
            <TabsTrigger value="want-to-read" className="gap-2">
              Want to Read <Badge variant="secondary" className="ml-1">{stats.wantToRead}</Badge>
            </TabsTrigger>
            <TabsTrigger value="currently-reading" className="gap-2">
              Reading <Badge variant="secondary" className="ml-1">{stats.currentlyReading}</Badge>
            </TabsTrigger>
            <TabsTrigger value="finished" className="gap-2">
              Finished <Badge variant="secondary" className="ml-1">{stats.finished}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            {worksInTab.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground mb-4">
                  {activeTab === 'all' 
                    ? "Your reading list is empty. Start adding works from the archive!"
                    : `No works in this category yet.`}
                </p>
                <Button onClick={() => navigate('/')}>
                  Browse Archive
                </Button>
              </Card>
            ) : (
              <div className="space-y-3">
                {worksInTab.map(({ work, ...item }) => (
                  <Card key={work.id} className="overflow-hidden hover:border-primary/30 transition-colors">
                    <CardContent className="p-0">
                      <div className="flex gap-4">
                        <Link to={`/work/${work.id}`} className="shrink-0">
                          <div className="w-20 h-28 bg-muted overflow-hidden">
                            {work.coverImage ? (
                              <img 
                                src={work.coverImage} 
                                alt={work.title}
                                className="w-full h-full object-cover hover:scale-105 transition-transform"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                <BookOpen className="h-8 w-8" />
                              </div>
                            )}
                          </div>
                        </Link>
                        <div className="flex-1 py-3 pr-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                              <Link 
                                to={`/work/${work.id}`}
                                className="font-semibold hover:text-primary transition-colors line-clamp-1"
                              >
                                {work.title}
                              </Link>
                              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                                <span>{work.year}</span>
                                <span>•</span>
                                <Badge variant="outline" className="text-xs">
                                  {work.type === 'short-story' ? 'Short Story' : work.type === 'novella' ? 'Novella' : 'Novel'}
                                </Badge>
                              </div>
                              {item.status === 'finished' && (
                                <div className="mt-2">
                                  <StarRating 
                                    rating={item.rating} 
                                    onRatingChange={(r) => setRating(work.id, r || undefined)}
                                    size="sm"
                                  />
                                </div>
                              )}
                            </div>
                            <ReadingStatusButton
                              currentStatus={item.status}
                              onStatusChange={(s) => setStatus(work.id, s)}
                              variant="compact"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Library;
