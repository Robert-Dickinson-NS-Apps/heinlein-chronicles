import { Work } from '@/data/heinleinWorks';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useReadingList } from '@/hooks/useReadingList';
import { ReadingStatusButton } from '@/components/ReadingStatusButton';

interface WorkCardProps {
  work: Work;
  onClick: () => void;
}

export const WorkCard = ({ work, onClick }: WorkCardProps) => {
  const { getStatus, setStatus } = useReadingList();
  const currentStatus = getStatus(work.id);

  return (
    <Card 
      className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] bg-card border-border"
    >
      <div 
        className="aspect-[2/3] bg-muted relative overflow-hidden"
        onClick={onClick}
      >
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
        <h3 
          className="font-serif text-lg font-bold mb-1 text-foreground group-hover:text-primary transition-colors cursor-pointer"
          onClick={onClick}
        >
          {work.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-2">{work.year}</p>
        <p className="text-sm text-foreground/80 line-clamp-2 mb-3">{work.summary}</p>
        <div onClick={(e) => e.stopPropagation()}>
          <ReadingStatusButton
            currentStatus={currentStatus}
            onStatusChange={(status) => setStatus(work.id, status)}
            variant="compact"
          />
        </div>
      </div>
    </Card>
  );
};
