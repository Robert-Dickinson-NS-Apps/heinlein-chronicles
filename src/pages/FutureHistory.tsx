import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FutureHistoryTimeline } from '@/components/FutureHistoryTimeline';
import { ArrowLeft, BookOpen, Rocket } from 'lucide-react';
import { seriesData } from '@/data/seriesData';

const FutureHistory = () => {
  const navigate = useNavigate();
  const futureHistorySeries = seriesData.find(s => s.id === 'future-history');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Archive
            </Button>
            <div className="flex items-center gap-2">
              <Rocket className="h-5 w-5 text-primary" />
              <span className="font-serif font-semibold">Future History</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 border-b border-border bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
              <BookOpen className="h-4 w-4" />
              Interconnected Universe
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
              The Future History
            </h1>
            <p className="text-lg text-muted-foreground">
              {futureHistorySeries?.description}
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">19</span> stories
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">1939–1987</span> published
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">2000+</span> years of narrative
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <main className="container mx-auto px-4 py-12">
        <FutureHistoryTimeline />
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            The Future History was conceived by Heinlein in 1941 and expanded throughout his career,
            creating one of science fiction's most ambitious shared universes.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default FutureHistory;
