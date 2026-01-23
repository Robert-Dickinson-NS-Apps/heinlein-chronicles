import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating?: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md';
}

export function StarRating({ rating = 0, onRatingChange, readonly = false, size = 'md' }: StarRatingProps) {
  const stars = [1, 2, 3, 4, 5];
  const iconSize = size === 'sm' ? 'h-3.5 w-3.5' : 'h-5 w-5';
  
  return (
    <div className="flex gap-0.5">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onRatingChange?.(star === rating ? 0 : star)}
          className={cn(
            'transition-colors',
            readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'
          )}
        >
          <Star
            className={cn(
              iconSize,
              'transition-colors',
              star <= rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-muted-foreground/30'
            )}
          />
        </button>
      ))}
    </div>
  );
}
