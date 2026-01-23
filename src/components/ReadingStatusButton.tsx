import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BookMarked, BookOpen, CheckCircle2, ChevronDown, X, Plus } from 'lucide-react';
import { ReadingStatus } from '@/hooks/useReadingList';
import { cn } from '@/lib/utils';

interface ReadingStatusButtonProps {
  currentStatus: ReadingStatus;
  onStatusChange: (status: ReadingStatus) => void;
  variant?: 'default' | 'compact';
}

const statusConfig = {
  'want-to-read': {
    label: 'Want to Read',
    shortLabel: 'Want',
    icon: BookMarked,
    className: 'bg-blue-500/10 text-blue-600 border-blue-500/30 hover:bg-blue-500/20'
  },
  'currently-reading': {
    label: 'Currently Reading',
    shortLabel: 'Reading',
    icon: BookOpen,
    className: 'bg-amber-500/10 text-amber-600 border-amber-500/30 hover:bg-amber-500/20'
  },
  'finished': {
    label: 'Finished',
    shortLabel: 'Finished',
    icon: CheckCircle2,
    className: 'bg-green-500/10 text-green-600 border-green-500/30 hover:bg-green-500/20'
  }
};

export function ReadingStatusButton({ currentStatus, onStatusChange, variant = 'default' }: ReadingStatusButtonProps) {
  const [open, setOpen] = useState(false);
  
  const config = currentStatus ? statusConfig[currentStatus] : null;
  const Icon = config?.icon || Plus;
  
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size={variant === 'compact' ? 'sm' : 'default'}
          className={cn(
            'gap-2 transition-colors',
            config?.className
          )}
        >
          <Icon className="h-4 w-4" />
          {variant === 'compact' ? (config?.shortLabel || 'Add') : (config?.label || 'Add to List')}
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {Object.entries(statusConfig).map(([status, conf]) => {
          const StatusIcon = conf.icon;
          const isSelected = currentStatus === status;
          return (
            <DropdownMenuItem
              key={status}
              onClick={() => {
                onStatusChange(status as ReadingStatus);
                setOpen(false);
              }}
              className={cn(
                'gap-2 cursor-pointer',
                isSelected && 'bg-accent'
              )}
            >
              <StatusIcon className="h-4 w-4" />
              {conf.label}
              {isSelected && <CheckCircle2 className="h-3 w-3 ml-auto text-primary" />}
            </DropdownMenuItem>
          );
        })}
        {currentStatus && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                onStatusChange(null);
                setOpen(false);
              }}
              className="gap-2 cursor-pointer text-destructive focus:text-destructive"
            >
              <X className="h-4 w-4" />
              Remove from List
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
