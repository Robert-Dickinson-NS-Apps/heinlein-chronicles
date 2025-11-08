import { Work } from '@/data/heinleinWorks';
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
                <h3 className="font-serif text-xl font-semibold mb-2 text-foreground">Summary</h3>
                <p className="text-foreground/80 leading-relaxed">{work.summary}</p>
              </div>

              <Separator />

              <div>
                <h3 className="font-serif text-xl font-semibold mb-4 text-foreground">Characters</h3>
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
};
