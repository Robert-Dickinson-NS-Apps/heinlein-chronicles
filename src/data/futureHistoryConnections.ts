// Future History narrative connections - character crossovers, sequels, and thematic links

export interface NarrativeConnection {
  source: string; // work ID
  target: string; // work ID
  type: 'character' | 'sequel' | 'prequel' | 'reference' | 'spinoff';
  character?: string; // For character connections
  description: string;
}

export interface FutureHistoryEra {
  id: string;
  name: string;
  yearRange: string; // Fictional timeline year range
  description: string;
  works: string[]; // Work IDs in this era
  color: string;
}

// Eras in Heinlein's fictional Future History timeline
export const futureHistoryEras: FutureHistoryEra[] = [
  {
    id: 'early-space-age',
    name: 'Early Space Age',
    yearRange: '1950-2000',
    description: 'The dawn of space exploration, first Moon landings, and establishment of lunar colonies.',
    works: ['life-line', 'misfit', 'roads-must-roll', 'blowups-happen', 'man-who-sold-moon', 'requiem'],
    color: 'hsl(var(--chart-1))'
  },
  {
    id: 'lunar-colonization',
    name: 'Lunar Colonization',
    yearRange: '2000-2050',
    description: 'Permanent settlements on the Moon, emergence of lunar culture and economy.',
    works: ['delilah-space-rigger', 'space-jockey', 'long-watch', 'gentlemen-be-seated', 'black-pits-luna', 'its-great-to-be-back'],
    color: 'hsl(var(--chart-2))'
  },
  {
    id: 'interplanetary-expansion',
    name: 'Interplanetary Expansion',
    yearRange: '2050-2100',
    description: 'Humanity spreads across the Solar System. Venus and Mars are colonized.',
    works: ['we-also-walk-dogs', 'logic-of-empire', 'green-hills-earth'],
    color: 'hsl(var(--chart-3))'
  },
  {
    id: 'howard-era',
    name: 'The Howard Era',
    yearRange: '2100-2200',
    description: 'The Howard Families emerge. Long-lived humans face persecution and flee Earth.',
    works: ['methuselahs-children'],
    color: 'hsl(var(--chart-4))'
  },
  {
    id: 'far-future',
    name: 'Far Future',
    yearRange: '2200+',
    description: 'Interstellar colonization, time travel, and the multiverse. Lazarus Long\'s later adventures.',
    works: ['time-enough-love', 'number-of-the-beast', 'cat-who-walks-through-walls', 'to-sail-beyond-sunset'],
    color: 'hsl(var(--chart-5))'
  }
];

// Character crossovers and narrative connections
export const narrativeConnections: NarrativeConnection[] = [
  // Lazarus Long appears across multiple works
  {
    source: 'methuselahs-children',
    target: 'time-enough-love',
    type: 'sequel',
    character: 'Lazarus Long',
    description: 'Lazarus Long\'s adventures continue 2000+ years later'
  },
  {
    source: 'time-enough-love',
    target: 'number-of-the-beast',
    type: 'sequel',
    character: 'Lazarus Long',
    description: 'Lazarus appears as the multiverse opens'
  },
  {
    source: 'number-of-the-beast',
    target: 'cat-who-walks-through-walls',
    type: 'sequel',
    character: 'Lazarus Long',
    description: 'The World as Myth expands'
  },
  {
    source: 'cat-who-walks-through-walls',
    target: 'to-sail-beyond-sunset',
    type: 'sequel',
    character: 'Lazarus Long',
    description: 'Maureen\'s perspective on the Long family saga'
  },
  
  // Maureen Johnson Long connections
  {
    source: 'time-enough-love',
    target: 'to-sail-beyond-sunset',
    type: 'spinoff',
    character: 'Maureen Johnson',
    description: 'Maureen\'s own story, first introduced via time travel'
  },
  
  // Andrew Jackson "Slipstick" Libby
  {
    source: 'misfit',
    target: 'methuselahs-children',
    type: 'character',
    character: 'Andrew Jackson Libby',
    description: 'Libby grows from young genius to inventor of FTL drive'
  },
  
  // Hazel Stone / Gwendolyn Novak connection
  {
    source: 'rolling-stones',
    target: 'cat-who-walks-through-walls',
    type: 'character',
    character: 'Hazel Stone',
    description: 'Hazel Stone revealed as Gwendolyn Novak'
  },
  {
    source: 'moon-harsh-mistress',
    target: 'rolling-stones',
    type: 'character',
    character: 'Hazel Stone',
    description: 'Young Hazel from the Lunar Revolution becomes family matriarch'
  },
  {
    source: 'moon-harsh-mistress',
    target: 'cat-who-walks-through-walls',
    type: 'character',
    character: 'Hazel Stone',
    description: 'Hazel\'s story spans from revolution to multiverse'
  },
  
  // D.D. Harriman connections
  {
    source: 'man-who-sold-moon',
    target: 'requiem',
    type: 'sequel',
    character: 'D.D. Harriman',
    description: 'Harriman finally reaches the Moon he helped humanity conquer'
  },
  
  // Rhysling connections  
  {
    source: 'green-hills-earth',
    target: 'logic-of-empire',
    type: 'reference',
    description: 'Both set during the interplanetary expansion era'
  },
  
  // Road/Infrastructure stories
  {
    source: 'roads-must-roll',
    target: 'blowups-happen',
    type: 'reference',
    description: 'Both explore critical infrastructure that makes civilization possible'
  },
  
  // Generation ship stories (Universe/Common Sense -> Orphans)
  {
    source: 'universe',
    target: 'common-sense',
    type: 'sequel',
    character: 'Hugh Hoyland',
    description: 'Direct sequel continuing Hugh\'s discovery'
  },
  
  // Time travel connections
  {
    source: 'by-his-bootstraps',
    target: 'all-you-zombies',
    type: 'reference',
    description: 'Both explore paradoxical time loops'
  }
];

// Key characters who appear across multiple works
export interface RecurringCharacter {
  name: string;
  description: string;
  works: string[];
  significance: string;
}

export const recurringCharacters: RecurringCharacter[] = [
  {
    name: 'Lazarus Long',
    description: 'The oldest living human, born Woodrow Wilson Smith in 1912',
    works: ['methuselahs-children', 'time-enough-love', 'number-of-the-beast', 'cat-who-walks-through-walls', 'to-sail-beyond-sunset'],
    significance: 'Central figure of the Future History, appears across 2000+ years of narrative'
  },
  {
    name: 'Maureen Johnson Long',
    description: 'Lazarus\'s mother and eventual time-traveling companion',
    works: ['time-enough-love', 'to-sail-beyond-sunset', 'cat-who-walks-through-walls'],
    significance: 'Key to understanding Lazarus\'s origins and the Long family legacy'
  },
  {
    name: 'Andrew Jackson "Slipstick" Libby',
    description: 'Mathematical genius who invented the Libby Drive for FTL travel',
    works: ['misfit', 'methuselahs-children', 'time-enough-love'],
    significance: 'Enables interstellar travel, connecting early and far future eras'
  },
  {
    name: 'Hazel Stone',
    description: 'Revolutionary, family matriarch, revealed as Gwendolyn Novak',
    works: ['moon-harsh-mistress', 'rolling-stones', 'cat-who-walks-through-walls'],
    significance: 'Links the Lunar Revolution to the multiverse era'
  },
  {
    name: 'D.D. Harriman',
    description: 'The Man Who Sold the Moon, visionary entrepreneur',
    works: ['man-who-sold-moon', 'requiem'],
    significance: 'Founder of space colonization, his dream launches the Future History'
  }
];

// Helper to get connections for a specific work
export function getConnectionsForWork(workId: string): NarrativeConnection[] {
  return narrativeConnections.filter(
    conn => conn.source === workId || conn.target === workId
  );
}

// Helper to get the era for a specific work
export function getEraForWork(workId: string): FutureHistoryEra | undefined {
  return futureHistoryEras.find(era => era.works.includes(workId));
}
