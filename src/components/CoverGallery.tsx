import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  BookOpen, 
  Calendar, 
  Building2,
  Info,
  ImageIcon,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { getEditionsForWork, EditionCover } from '@/data/editionCovers';
import { Work } from '@/data/heinleinWorks';

interface CoverGalleryProps {
  work: Work;
}

export function CoverGallery({ work }: CoverGalleryProps) {
  const [selectedEdition, setSelectedEdition] = useState<EditionCover | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  
  const editions = getEditionsForWork(work.id);
  
  if (editions.length === 0) {
    return null;
  }
  
  const handlePrevious = () => {
    if (!selectedEdition) return;
    const currentIndex = editions.findIndex(e => e.year === selectedEdition.year && e.edition === selectedEdition.edition);
    if (currentIndex > 0) {
      setSelectedEdition(editions[currentIndex - 1]);
    }
  };
  
  const handleNext = () => {
    if (!selectedEdition) return;
    const currentIndex = editions.findIndex(e => e.year === selectedEdition.year && e.edition === selectedEdition.edition);
    if (currentIndex < editions.length - 1) {
      setSelectedEdition(editions[currentIndex + 1]);
    }
  };
  
  const currentIndex = selectedEdition 
    ? editions.findIndex(e => e.year === selectedEdition.year && e.edition === selectedEdition.edition)
    : -1;
  
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <ImageIcon className="h-5 w-5 text-primary" />
            Edition History
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Cover art evolution across {editions.length} editions from {editions[0].year} to {editions[editions.length - 1].year}
          </p>
        </CardHeader>
        <CardContent>
          {/* Timeline visualization */}
          <div className="relative mb-6">
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-border" />
            <div className="flex justify-between relative">
              {editions.map((edition, idx) => (
                <button
                  key={`${edition.year}-${idx}`}
                  onClick={() => {
                    setSelectedEdition(edition);
                    setShowDialog(true);
                  }}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <div className="w-3 h-3 rounded-full bg-primary border-2 border-background shadow-sm group-hover:scale-125 transition-transform z-10" />
                  <span className="text-xs font-medium mt-2 group-hover:text-primary transition-colors">
                    {edition.year}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Edition cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {editions.map((edition, idx) => (
              <button
                key={`card-${edition.year}-${idx}`}
                onClick={() => {
                  setSelectedEdition(edition);
                  setShowDialog(true);
                }}
                className="text-left"
              >
                <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-muted shrink-0">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">{edition.year}</Badge>
                        </div>
                        <h4 className="font-medium text-sm line-clamp-1">{edition.edition}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-1">{edition.publisher}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Detail Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              {selectedEdition?.edition}
            </DialogTitle>
            <DialogDescription>
              Edition details for {work.title}
            </DialogDescription>
          </DialogHeader>
          
          {selectedEdition && (
            <div className="space-y-4">
              {/* Current cover display */}
              <div className="relative aspect-[2/3] bg-muted rounded-lg overflow-hidden max-w-[200px] mx-auto">
                {work.coverImage ? (
                  <img 
                    src={work.coverImage} 
                    alt={`${work.title} - ${selectedEdition.edition}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
                <div className="absolute bottom-2 left-2 right-2">
                  <Badge className="w-full justify-center">{selectedEdition.year}</Badge>
                </div>
              </div>
              
              {/* Edition details */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="font-medium">Year:</span>
                  <span>{selectedEdition.year}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Building2 className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="font-medium">Publisher:</span>
                  <span>{selectedEdition.publisher}</span>
                </div>
                {selectedEdition.description && (
                  <div className="flex items-start gap-3 text-sm">
                    <Info className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                    <span className="font-medium shrink-0">Description:</span>
                    <span className="text-muted-foreground">{selectedEdition.description}</span>
                  </div>
                )}
                {selectedEdition.notes && (
                  <div className="p-3 bg-muted/50 rounded-lg text-sm">
                    <span className="font-medium">Note: </span>
                    <span className="text-muted-foreground">{selectedEdition.notes}</span>
                  </div>
                )}
              </div>
              
              {/* Navigation */}
              <div className="flex items-center justify-between pt-4 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevious}
                  disabled={currentIndex <= 0}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  {currentIndex + 1} of {editions.length}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNext}
                  disabled={currentIndex >= editions.length - 1}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
