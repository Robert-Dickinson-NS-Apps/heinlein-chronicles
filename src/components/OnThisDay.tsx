import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { 
  Calendar, 
  BookOpen, 
  Award, 
  User, 
  Film,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { getEventsForDate, getNearbyEvents, HistoricalEvent } from '@/data/historicalEvents';

const eventTypeConfig = {
  publication: { icon: BookOpen, label: 'Publication', className: 'bg-blue-500/10 text-blue-600 border-blue-500/30' },
  award: { icon: Award, label: 'Award', className: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30' },
  life: { icon: User, label: 'Life Event', className: 'bg-purple-500/10 text-purple-600 border-purple-500/30' },
  adaptation: { icon: Film, label: 'Adaptation', className: 'bg-green-500/10 text-green-600 border-green-500/30' }
};

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];

function EventCard({ event, isToday }: { event: HistoricalEvent; isToday: boolean }) {
  const config = eventTypeConfig[event.type];
  const Icon = config.icon;
  
  return (
    <Card className={`min-w-[280px] max-w-[320px] shrink-0 transition-all ${isToday ? 'ring-2 ring-primary' : 'hover:border-primary/30'}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg shrink-0 ${config.className}`}>
            <Icon className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="text-xs shrink-0">
                {monthNames[event.month - 1]} {event.day}
              </Badge>
              <span className="text-xs text-muted-foreground">{event.year}</span>
              {isToday && (
                <Badge className="bg-primary text-primary-foreground text-xs">Today</Badge>
              )}
            </div>
            <h4 className="font-semibold text-sm mb-1 line-clamp-1">{event.title}</h4>
            <p className="text-xs text-muted-foreground line-clamp-2">{event.description}</p>
            {event.workId && (
              <Link 
                to={`/work/${event.workId}`}
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
              >
                View work <ChevronRight className="h-3 w-3" />
              </Link>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function OnThisDay() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  
  const { todayEvents, nearbyEvents } = useMemo(() => {
    const todayEvents = getEventsForDate(month, day);
    const nearby = getNearbyEvents(month, day, 14)
      .filter(e => !(e.month === month && e.day === day)); // Exclude today's events
    
    return { todayEvents, nearbyEvents: nearby.slice(0, 8) };
  }, [month, day]);
  
  const allEvents = [...todayEvents, ...nearbyEvents];
  
  if (allEvents.length === 0) {
    return null;
  }
  
  return (
    <Card className="mb-8 bg-gradient-to-r from-card to-muted/30">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calendar className="h-5 w-5 text-primary" />
          On This Day in Heinlein History
          {todayEvents.length > 0 && (
            <Badge variant="secondary" className="ml-2">
              <Sparkles className="h-3 w-3 mr-1" />
              {todayEvents.length} event{todayEvents.length !== 1 ? 's' : ''} today!
            </Badge>
          )}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {monthNames[month - 1]} {day} — Historical events from Heinlein's life and career
        </p>
      </CardHeader>
      <CardContent className="pt-0">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-3 pb-4">
            {todayEvents.map((event, idx) => (
              <EventCard key={`today-${idx}`} event={event} isToday={true} />
            ))}
            {nearbyEvents.map((event, idx) => (
              <EventCard key={`nearby-${idx}`} event={event} isToday={false} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
