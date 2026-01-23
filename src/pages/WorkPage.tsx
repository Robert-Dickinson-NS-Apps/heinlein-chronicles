import { useParams, useNavigate, Link } from 'react-router-dom';
import { useMemo } from 'react';
import { allWorks, Work } from '@/data/heinleinWorks';
import { seriesData, publicationHistory, getSeriesForWork } from '@/data/seriesData';
import { hasEditionData } from '@/data/editionCovers';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CoverGallery } from '@/components/CoverGallery';
import { ReadingStatusButton } from '@/components/ReadingStatusButton';
import { useReadingList } from '@/hooks/useReadingList';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { 
  ArrowLeft, 
  Calendar, 
  BookOpen, 
  Users, 
  Lightbulb, 
  Award, 
  Film, 
  ChevronLeft, 
  ChevronRight,
  BookMarked,
  ExternalLink
} from 'lucide-react';

const WorkPage = () => {
  const { workId } = useParams<{ workId: string }>();
  const navigate = useNavigate();
  const { getStatus, setStatus } = useReadingList();

  const work = useMemo(() => 
    allWorks.find(w => w.id === workId),
    [workId]
  );
  
  const readingStatus = work ? getStatus(work.id) : null;

  const relatedByTheme = useMemo(() => {
    if (!work?.themes?.length) return [];
    return allWorks
      .filter(w => w.id !== work.id && w.themes?.some(t => work.themes?.includes(t)))
      .sort((a, b) => {
        const aMatches = a.themes?.filter(t => work.themes?.includes(t)).length || 0;
        const bMatches = b.themes?.filter(t => work.themes?.includes(t)).length || 0;
        return bMatches - aMatches;
      })
      .slice(0, 6);
  }, [work]);

  const relatedByCharacter = useMemo(() => {
    if (!work?.characters?.length) return [];
    const characterNames = work.characters.map(c => c.name.toLowerCase());
    return allWorks
      .filter(w => 
        w.id !== work.id && 
        w.characters.some(c => 
          characterNames.some(name => 
            c.name.toLowerCase().includes(name.split(' ')[0]) ||
            name.includes(c.name.toLowerCase().split(' ')[0])
          )
        )
      )
      .slice(0, 6);
  }, [work]);

  const series = useMemo(() => 
    work ? getSeriesForWork(work.id) : [],
    [work]
  );

  const pubHistory = work ? publicationHistory[work.id] : undefined;

  if (!work) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-4">Work Not Found</h1>
          <p className="text-muted-foreground mb-6">The requested work could not be found.</p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Archive
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Archive</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={`/?type=${work.type}`}>
                    {work.type === 'novel' ? 'Novels' : work.type === 'novella' ? 'Novellas' : 'Short Stories'}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{work.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Cover Image */}
          <div className="lg:col-span-1">
            <div className="aspect-[2/3] bg-gradient-to-br from-primary to-secondary rounded-lg overflow-hidden shadow-xl">
              {work.coverImage ? (
                <img 
                  src={work.coverImage} 
                  alt={work.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-8">
                  <h3 className="font-serif text-2xl font-bold text-primary-foreground text-center">
                    {work.title}
                  </h3>
                </div>
              )}
            </div>
          </div>

          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="secondary" className="text-sm">
                  {work.type === 'short-story' ? 'Short Story' : work.type === 'novella' ? 'Novella' : 'Novel'}
                </Badge>
                {series.map(s => (
                  <Badge key={s.id} variant="outline" className="text-sm">
                    {s.name}
                  </Badge>
                ))}
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
                {work.title}
              </h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {work.year}
                </span>
                {work.wordCount && (
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    {work.wordCount.toLocaleString()} words
                  </span>
                )}
              </div>
              
              {/* Reading Status Button */}
              <div className="pt-2">
                <ReadingStatusButton
                  currentStatus={readingStatus}
                  onStatusChange={(status) => setStatus(work.id, status)}
                />
              </div>
            </div>

            <Separator />

            {/* Summary */}
            <div>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                <BookMarked className="h-5 w-5" />
                Summary
              </h2>
              <p className="text-foreground/80 leading-relaxed text-lg">
                {work.summary}
              </p>
            </div>

            {/* Themes */}
            {work.themes && work.themes.length > 0 && (
              <div>
                <h2 className="font-serif text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Themes
                </h2>
                <div className="flex flex-wrap gap-2">
                  {work.themes.map(theme => (
                    <Link 
                      key={theme} 
                      to={`/themes?theme=${encodeURIComponent(theme)}`}
                      className="inline-block"
                    >
                      <Badge 
                        variant="secondary" 
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        {theme}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Awards & Adaptations */}
            {pubHistory && (pubHistory.awards || pubHistory.adaptations) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pubHistory.awards && pubHistory.awards.length > 0 && (
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Award className="h-4 w-4 text-yellow-500" />
                        Awards
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm text-foreground/80 space-y-1">
                        {pubHistory.awards.map((award, i) => (
                          <li key={i}>{award}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
                {pubHistory.adaptations && pubHistory.adaptations.length > 0 && (
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Film className="h-4 w-4 text-blue-500" />
                        Adaptations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm text-foreground/80 space-y-1">
                        {pubHistory.adaptations.map((adaptation, i) => (
                          <li key={i}>{adaptation}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Characters */}
        {work.characters.length > 0 && (
          <section className="mb-12">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Users className="h-6 w-6" />
              Characters
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {work.characters.map((character, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{character.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/70">{character.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Publication History */}
        {pubHistory && (
          <section className="mb-12">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Calendar className="h-6 w-6" />
              Publication History
            </h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">First Publication</h3>
                    <div className="text-foreground/80">
                      <p><strong>Year:</strong> {pubHistory.firstPublication.year}</p>
                      {pubHistory.firstPublication.publisher && (
                        <p><strong>Publisher:</strong> {pubHistory.firstPublication.publisher}</p>
                      )}
                      {pubHistory.firstPublication.magazine && (
                        <p><strong>Magazine:</strong> {pubHistory.firstPublication.magazine}</p>
                      )}
                      {pubHistory.firstPublication.notes && (
                        <p className="mt-2 text-sm italic">{pubHistory.firstPublication.notes}</p>
                      )}
                    </div>
                  </div>
                  {pubHistory.alternateEditions && pubHistory.alternateEditions.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Alternate Editions</h3>
                      <ul className="text-foreground/80 list-disc list-inside">
                        {pubHistory.alternateEditions.map((edition, i) => (
                          <li key={i}>{edition}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Cover Gallery / Edition History */}
        {hasEditionData(work.id) && (
          <section className="mb-12">
            <CoverGallery work={work} />
          </section>
        )}

        {/* Series Reading Order */}
        {series.length > 0 && (
          <section className="mb-12">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              Series & Reading Order
            </h2>
            <div className="space-y-6">
              {series.map(s => {
                const currentIndex = s.works.indexOf(work.id);
                const prevWork = currentIndex > 0 ? allWorks.find(w => w.id === s.works[currentIndex - 1]) : null;
                const nextWork = currentIndex < s.works.length - 1 ? allWorks.find(w => w.id === s.works[currentIndex + 1]) : null;
                
                return (
                  <Card key={s.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{s.name}</span>
                        <Badge variant="outline">{s.type}</Badge>
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{s.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-muted-foreground">
                          Book {currentIndex + 1} of {s.works.length}
                        </span>
                      </div>
                      <div className="flex gap-4">
                        {prevWork ? (
                          <Link 
                            to={`/work/${prevWork.id}`}
                            className="flex-1 p-4 border rounded-lg hover:bg-muted/50 transition-colors group"
                          >
                            <div className="flex items-center gap-2 text-muted-foreground mb-1">
                              <ChevronLeft className="h-4 w-4" />
                              <span className="text-xs">Previous</span>
                            </div>
                            <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                              {prevWork.title}
                            </p>
                          </Link>
                        ) : (
                          <div className="flex-1" />
                        )}
                        {nextWork ? (
                          <Link 
                            to={`/work/${nextWork.id}`}
                            className="flex-1 p-4 border rounded-lg hover:bg-muted/50 transition-colors group text-right"
                          >
                            <div className="flex items-center justify-end gap-2 text-muted-foreground mb-1">
                              <span className="text-xs">Next</span>
                              <ChevronRight className="h-4 w-4" />
                            </div>
                            <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                              {nextWork.title}
                            </p>
                          </Link>
                        ) : (
                          <div className="flex-1" />
                        )}
                      </div>
                      
                      {/* Full series list */}
                      <Separator className="my-4" />
                      <details className="cursor-pointer">
                        <summary className="text-sm font-medium text-muted-foreground hover:text-foreground">
                          View full reading order ({s.works.length} works)
                        </summary>
                        <ScrollArea className="h-[200px] mt-3">
                          <ol className="space-y-2 pr-4">
                            {s.works.map((wId, idx) => {
                              const seriesWork = allWorks.find(w => w.id === wId);
                              if (!seriesWork) return null;
                              const isCurrent = wId === work.id;
                              return (
                                <li key={wId} className="flex items-center gap-3">
                                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                                    isCurrent 
                                      ? 'bg-primary text-primary-foreground' 
                                      : 'bg-muted text-muted-foreground'
                                  }`}>
                                    {idx + 1}
                                  </span>
                                  {isCurrent ? (
                                    <span className="font-medium text-primary">{seriesWork.title} (current)</span>
                                  ) : (
                                    <Link 
                                      to={`/work/${wId}`}
                                      className="text-foreground/80 hover:text-primary transition-colors"
                                    >
                                      {seriesWork.title}
                                    </Link>
                                  )}
                                  <span className="text-xs text-muted-foreground">({seriesWork.year})</span>
                                </li>
                              );
                            })}
                          </ol>
                        </ScrollArea>
                      </details>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        {/* Related Works */}
        {(relatedByTheme.length > 0 || relatedByCharacter.length > 0) && (
          <section className="mb-12">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <ExternalLink className="h-6 w-6" />
              Related Works
            </h2>
            
            <div className="space-y-8">
              {/* By Theme */}
              {relatedByTheme.length > 0 && (
                <div>
                  <h3 className="font-semibold text-foreground mb-4">Similar Themes</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {relatedByTheme.map(relWork => (
                      <Link 
                        key={relWork.id} 
                        to={`/work/${relWork.id}`}
                        className="group"
                      >
                        <div className="aspect-[2/3] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg overflow-hidden mb-2 shadow-md group-hover:shadow-xl transition-shadow">
                          {relWork.coverImage ? (
                            <img 
                              src={relWork.coverImage} 
                              alt={relWork.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center p-2">
                              <span className="font-serif text-xs text-center text-foreground/60">
                                {relWork.title}
                              </span>
                            </div>
                          )}
                        </div>
                        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {relWork.title}
                        </p>
                        <p className="text-xs text-muted-foreground">{relWork.year}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* By Character */}
              {relatedByCharacter.length > 0 && (
                <div>
                  <h3 className="font-semibold text-foreground mb-4">Shared Characters</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {relatedByCharacter.map(relWork => (
                      <Link 
                        key={relWork.id} 
                        to={`/work/${relWork.id}`}
                        className="group"
                      >
                        <div className="aspect-[2/3] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg overflow-hidden mb-2 shadow-md group-hover:shadow-xl transition-shadow">
                          {relWork.coverImage ? (
                            <img 
                              src={relWork.coverImage} 
                              alt={relWork.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center p-2">
                              <span className="font-serif text-xs text-center text-foreground/60">
                                {relWork.title}
                              </span>
                            </div>
                          )}
                        </div>
                        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {relWork.title}
                        </p>
                        <p className="text-xs text-muted-foreground">{relWork.year}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Back Button */}
        <div className="text-center">
          <Button onClick={() => navigate('/')} variant="outline" size="lg">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Archive
          </Button>
        </div>
      </main>
    </div>
  );
};

export default WorkPage;
