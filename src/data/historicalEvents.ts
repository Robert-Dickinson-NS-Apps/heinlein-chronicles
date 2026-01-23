// Historical events for "On This Day" feature
// Includes publication dates, awards, and life milestones

export interface HistoricalEvent {
  month: number; // 1-12
  day: number;
  year: number;
  type: 'publication' | 'award' | 'life' | 'adaptation';
  title: string;
  description: string;
  workId?: string; // Link to work if applicable
}

export const historicalEvents: HistoricalEvent[] = [
  // Life milestones
  { month: 7, day: 7, year: 1907, type: 'life', title: 'Heinlein Born', description: 'Robert Anson Heinlein was born in Butler, Missouri, the third of seven children.' },
  { month: 6, day: 20, year: 1929, type: 'life', title: 'Graduated from Naval Academy', description: 'Heinlein graduated from the United States Naval Academy at Annapolis.' },
  { month: 10, day: 21, year: 1948, type: 'life', title: 'Married Virginia Gerstenfeld', description: 'Heinlein married his third wife, Virginia "Ginny" Gerstenfeld, who would be his lifelong partner and collaborator.' },
  { month: 5, day: 8, year: 1988, type: 'life', title: 'Heinlein Passes Away', description: 'Robert A. Heinlein died in his sleep in Carmel, California, at age 80.' },
  
  // Major publications
  { month: 8, day: 1, year: 1939, type: 'publication', title: '"Life-Line" Published', description: 'Heinlein\'s first published story appeared in Astounding Science Fiction, launching his legendary career.', workId: 'life-line' },
  { month: 5, day: 1, year: 1947, type: 'publication', title: 'Rocket Ship Galileo Released', description: 'Heinlein\'s first juvenile novel was published by Scribner\'s, beginning a 12-year partnership.', workId: 'rocket-ship-galileo' },
  { month: 12, day: 1, year: 1959, type: 'publication', title: 'Starship Troopers Published', description: 'The controversial military science fiction novel was published after being rejected by Scribner\'s.', workId: 'starship-troopers' },
  { month: 6, day: 1, year: 1961, type: 'publication', title: 'Stranger in a Strange Land Released', description: 'Heinlein\'s most famous novel was published, becoming a cultural phenomenon of the 1960s.', workId: 'stranger-in-a-strange-land' },
  { month: 6, day: 2, year: 1966, type: 'publication', title: 'The Moon is a Harsh Mistress Published', description: 'Considered one of Heinlein\'s masterpieces, the revolutionary lunar colony novel was released.', workId: 'the-moon-is-a-harsh-mistress' },
  { month: 1, day: 1, year: 1951, type: 'publication', title: 'The Puppet Masters Published', description: 'Heinlein\'s alien invasion thriller was serialized in Galaxy Science Fiction.', workId: 'the-puppet-masters' },
  { month: 10, day: 1, year: 1956, type: 'publication', title: 'Double Star Published', description: 'The political science fiction novel about an actor impersonating a politician was released.', workId: 'double-star' },
  { month: 3, day: 1, year: 1957, type: 'publication', title: 'The Door into Summer Released', description: 'Heinlein\'s time travel romance novel was published.', workId: 'the-door-into-summer' },
  { month: 7, day: 1, year: 1973, type: 'publication', title: 'Time Enough for Love Published', description: 'The longest Lazarus Long novel was released, exploring themes of immortality and love.', workId: 'time-enough-love' },
  { month: 2, day: 1, year: 1982, type: 'publication', title: 'Friday Published', description: 'The story of an artificial human secret agent returned Heinlein to the bestseller lists.', workId: 'friday' },
  { month: 8, day: 1, year: 1984, type: 'publication', title: 'Job: A Comedy of Justice Published', description: 'Heinlein\'s satirical take on religion and the afterlife was released.', workId: 'job-a-comedy-of-justice' },
  { month: 1, day: 1, year: 1958, type: 'publication', title: 'Have Space Suit—Will Travel Released', description: 'The last of Heinlein\'s Scribner\'s juveniles was published.', workId: 'have-space-suit-will-travel' },
  { month: 11, day: 1, year: 1941, type: 'publication', title: '"By His Bootstraps" Published', description: 'The pioneering time loop story appeared in Astounding under pseudonym Anson MacDonald.', workId: 'by-his-bootstraps' },
  { month: 3, day: 1, year: 1959, type: 'publication', title: '"All You Zombies—" Published', description: 'The most paradoxical time travel story ever written appeared in F&SF.', workId: 'all-you-zombies' },
  { month: 5, day: 1, year: 1940, type: 'publication', title: '"The Roads Must Roll" Published', description: 'Classic Future History story about a strike on the moving roads was published.', workId: 'roads-must-roll' },
  { month: 9, day: 1, year: 1940, type: 'publication', title: '"Blowups Happen" Published', description: 'Nuclear power plant story that predated the Manhattan Project was released.', workId: 'blowups-happen' },
  { month: 2, day: 1, year: 1950, type: 'publication', title: '"The Man Who Sold the Moon" Published', description: 'D.D. Harriman\'s quest to reach the Moon was serialized.', workId: 'man-who-sold-moon' },
  
  // Hugo Awards
  { month: 9, day: 5, year: 1956, type: 'award', title: 'Hugo Award for Double Star', description: 'Heinlein won his first Hugo Award for Best Novel at NyCon II.', workId: 'double-star' },
  { month: 9, day: 6, year: 1960, type: 'award', title: 'Hugo Award for Starship Troopers', description: 'Heinlein won his second Hugo at Pittcon, despite the novel\'s controversy.', workId: 'starship-troopers' },
  { month: 9, day: 3, year: 1962, type: 'award', title: 'Hugo Award for Stranger in a Strange Land', description: 'Heinlein won his third Hugo at Chicon III for his countercultural masterpiece.', workId: 'stranger-in-a-strange-land' },
  { month: 9, day: 4, year: 1967, type: 'award', title: 'Hugo Award for The Moon is a Harsh Mistress', description: 'Heinlein won his fourth and final Hugo at NyCon 3, cementing his legacy.', workId: 'the-moon-is-a-harsh-mistress' },
  { month: 3, day: 21, year: 1975, type: 'award', title: 'First Grand Master Award', description: 'Heinlein received the first-ever SFWA Grand Master Award for lifetime achievement.' },
  
  // Adaptations
  { month: 6, day: 27, year: 1950, type: 'adaptation', title: 'Destination Moon Premieres', description: 'The first major science fiction film based on Heinlein\'s work premiered, winning an Academy Award for special effects.', workId: 'destination-moon' },
  { month: 11, day: 7, year: 1997, type: 'adaptation', title: 'Starship Troopers Film Released', description: 'Paul Verhoeven\'s satirical film adaptation premiered to controversy and eventual cult status.', workId: 'starship-troopers' },
  { month: 10, day: 24, year: 1994, type: 'adaptation', title: 'The Puppet Masters Film Released', description: 'The film adaptation starring Donald Sutherland was released.', workId: 'the-puppet-masters' },
  { month: 8, day: 28, year: 2014, type: 'adaptation', title: 'Predestination Released', description: 'The acclaimed film adaptation of "All You Zombies—" premiered, starring Ethan Hawke.', workId: 'all-you-zombies' },
  
  // More publications to fill the calendar
  { month: 4, day: 1, year: 1949, type: 'publication', title: 'Red Planet Published', description: 'The juvenile novel about Martian colonization was released by Scribner\'s.', workId: 'red-planet' },
  { month: 11, day: 1, year: 1950, type: 'publication', title: 'Farmer in the Sky Published', description: 'The juvenile about homesteading on Ganymede was released.', workId: 'farmer-in-the-sky' },
  { month: 9, day: 1, year: 1953, type: 'publication', title: 'Starman Jones Published', description: 'The juvenile novel about a young astrogator was released.', workId: 'starman-jones' },
  { month: 4, day: 1, year: 1955, type: 'publication', title: 'Tunnel in the Sky Published', description: 'The survival juvenile about stranded students was released.', workId: 'tunnel-in-the-sky' },
  { month: 8, day: 1, year: 1956, type: 'publication', title: 'Time for the Stars Published', description: 'The juvenile about telepathic twins and relativity was released.', workId: 'time-for-the-stars' },
  { month: 12, day: 1, year: 1957, type: 'publication', title: 'Citizen of the Galaxy Published', description: 'The juvenile about a slave boy\'s journey to freedom was released.', workId: 'citizen-of-the-galaxy' },
  { month: 6, day: 1, year: 1963, type: 'publication', title: 'Glory Road Published', description: 'Heinlein\'s fantasy adventure novel was released.', workId: 'glory-road' },
  { month: 10, day: 1, year: 1964, type: 'publication', title: 'Farnham\'s Freehold Published', description: 'The controversial post-apocalyptic novel was released.', workId: 'farnhams-freehold' },
  { month: 3, day: 1, year: 1970, type: 'publication', title: 'I Will Fear No Evil Published', description: 'The body-swap novel exploring gender and consciousness was released.', workId: 'i-will-fear-no-evil' },
  { month: 10, day: 1, year: 1980, type: 'publication', title: 'The Number of the Beast Published', description: 'The multiverse adventure novel introducing the "World as Myth" concept was released.', workId: 'number-of-the-beast' },
  { month: 1, day: 1, year: 1985, type: 'publication', title: 'The Cat Who Walks Through Walls Published', description: 'The continuation of the World as Myth series was released.', workId: 'cat-who-walks-through-walls' },
  { month: 7, day: 1, year: 1987, type: 'publication', title: 'To Sail Beyond the Sunset Published', description: 'Heinlein\'s final novel, featuring Maureen Long, was released.', workId: 'to-sail-beyond-sunset' },
];

// Helper function to get events for a specific date
export function getEventsForDate(month: number, day: number): HistoricalEvent[] {
  return historicalEvents.filter(e => e.month === month && e.day === day);
}

// Helper function to get events for the current month (for nearby events)
export function getEventsForMonth(month: number): HistoricalEvent[] {
  return historicalEvents.filter(e => e.month === month).sort((a, b) => a.day - b.day);
}

// Get events happening "around" a date (within N days)
export function getNearbyEvents(month: number, day: number, withinDays: number = 7): HistoricalEvent[] {
  const today = new Date(2000, month - 1, day); // Use arbitrary year for date math
  
  return historicalEvents.filter(event => {
    const eventDate = new Date(2000, event.month - 1, event.day);
    const diffTime = Math.abs(eventDate.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= withinDays;
  }).sort((a, b) => {
    // Sort by proximity to today
    const aDate = new Date(2000, a.month - 1, a.day);
    const bDate = new Date(2000, b.month - 1, b.day);
    const aDiff = Math.abs(aDate.getTime() - today.getTime());
    const bDiff = Math.abs(bDate.getTime() - today.getTime());
    return aDiff - bDiff;
  });
}
