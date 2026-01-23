// Series and reading order data for Heinlein's interconnected works

export interface Series {
  id: string;
  name: string;
  description: string;
  works: string[]; // Work IDs in reading order
  type: 'series' | 'future-history' | 'multiverse';
}

export const seriesData: Series[] = [
  {
    id: 'future-history',
    name: 'Future History',
    description: 'A chronological timeline of humanity\'s expansion into space, from the first Moon landing to interstellar travel. These stories share a common universe and timeline.',
    type: 'future-history',
    works: [
      'life-line',
      'misfit',
      'roads-must-roll',
      'blowups-happen',
      'man-who-sold-moon',
      'delilah-space-rigger',
      'space-jockey',
      'requiem',
      'long-watch',
      'gentlemen-be-seated',
      'black-pits-luna',
      'its-great-to-be-back',
      'we-also-walk-dogs',
      'logic-of-empire',
      'green-hills-earth',
      'methuselahs-children',
      'time-enough-love',
      'number-of-the-beast',
      'cat-who-walks-through-walls',
      'to-sail-beyond-sunset'
    ]
  },
  {
    id: 'lazarus-long',
    name: 'Lazarus Long Chronicles',
    description: 'Following the adventures of the nearly immortal Woodrow Wilson "Lazarus Long" Smith, the oldest living human in the known universe.',
    type: 'series',
    works: [
      'methuselahs-children',
      'time-enough-love',
      'number-of-the-beast',
      'cat-who-walks-through-walls',
      'to-sail-beyond-sunset'
    ]
  },
  {
    id: 'juveniles',
    name: 'Heinlein Juveniles',
    description: 'Young adult novels published by Scribner\'s between 1947-1958, featuring teenage protagonists in space adventures.',
    type: 'series',
    works: [
      'rocket-ship-galileo',
      'space-cadet',
      'red-planet',
      'between-planets',
      'rolling-stones',
      'starman-jones',
      'star-beast',
      'tunnel-in-the-sky',
      'time-for-the-stars',
      'citizen-of-the-galaxy',
      'have-space-suit-will-travel'
    ]
  },
  {
    id: 'world-as-myth',
    name: 'World as Myth',
    description: 'Heinlein\'s multiverse concept where all fictional worlds are real parallel universes, interconnecting many of his earlier works.',
    type: 'multiverse',
    works: [
      'number-of-the-beast',
      'cat-who-walks-through-walls',
      'to-sail-beyond-sunset'
    ]
  }
];

// Publication history data
export interface PublicationInfo {
  firstPublication: {
    year: number;
    publisher?: string;
    magazine?: string;
    notes?: string;
  };
  awards?: string[];
  adaptations?: string[];
  alternateEditions?: string[];
}

export const publicationHistory: Record<string, PublicationInfo> = {
  'stranger-in-a-strange-land': {
    firstPublication: {
      year: 1961,
      publisher: 'G.P. Putnam\'s Sons',
      notes: 'Originally cut by 60,000 words; uncut edition published in 1991'
    },
    awards: ['Hugo Award for Best Novel (1962)'],
    adaptations: ['Numerous stage adaptations', 'Referenced in countless works of popular culture'],
    alternateEditions: ['1991 Uncut Edition (220,000 words)']
  },
  'starship-troopers': {
    firstPublication: {
      year: 1959,
      publisher: 'G.P. Putnam\'s Sons',
      notes: 'Originally rejected by Scribner\'s as too controversial for their juvenile line'
    },
    awards: ['Hugo Award for Best Novel (1960)'],
    adaptations: ['1997 Film directed by Paul Verhoeven', 'Multiple anime and CGI adaptations', 'Miniature wargame']
  },
  'the-moon-is-a-harsh-mistress': {
    firstPublication: {
      year: 1966,
      publisher: 'G.P. Putnam\'s Sons',
      magazine: 'Serialized in If magazine (1965-1966)',
      notes: 'Considered one of Heinlein\'s masterpieces'
    },
    awards: ['Hugo Award for Best Novel (1967)'],
    adaptations: ['Film adaptation in development for decades']
  },
  'double-star': {
    firstPublication: {
      year: 1956,
      publisher: 'Doubleday',
      magazine: 'Serialized in Astounding Science Fiction (1956)'
    },
    awards: ['Hugo Award for Best Novel (1956)']
  },
  'the-puppet-masters': {
    firstPublication: {
      year: 1951,
      publisher: 'Doubleday',
      magazine: 'Serialized in Galaxy Science Fiction (1951)',
      notes: 'Restored to original length in 1990 edition'
    },
    adaptations: ['1994 Film starring Donald Sutherland']
  },
  'the-door-into-summer': {
    firstPublication: {
      year: 1957,
      publisher: 'Doubleday',
      magazine: 'Serialized in The Magazine of Fantasy and Science Fiction (1956)'
    },
    adaptations: ['2021 Japanese film adaptation']
  },
  'time-enough-love': {
    firstPublication: {
      year: 1973,
      publisher: 'G.P. Putnam\'s Sons',
      notes: 'Longest of the Lazarus Long novels'
    }
  },
  'friday': {
    firstPublication: {
      year: 1982,
      publisher: 'Holt, Rinehart and Winston',
      notes: 'Returns to future history timeline'
    }
  },
  'job-a-comedy-of-justice': {
    firstPublication: {
      year: 1984,
      publisher: 'Ballantine Books',
      notes: 'Satirical take on religion and afterlife'
    },
    awards: ['Locus Award for Best Science Fiction Novel (1985)']
  },
  'all-you-zombies': {
    firstPublication: {
      year: 1959,
      magazine: 'The Magazine of Fantasy and Science Fiction',
      notes: 'Considered the most paradoxical time travel story ever written'
    },
    adaptations: ['2014 Film "Predestination" starring Ethan Hawke']
  },
  'by-his-bootstraps': {
    firstPublication: {
      year: 1941,
      magazine: 'Astounding Science Fiction (as Anson MacDonald)',
      notes: 'Pioneering time loop story'
    }
  }
};

// Helper function to find series for a work
export function getSeriesForWork(workId: string): Series[] {
  return seriesData.filter(series => series.works.includes(workId));
}

// Helper function to get reading order position
export function getReadingOrderPosition(workId: string, seriesId: string): number {
  const series = seriesData.find(s => s.id === seriesId);
  if (!series) return -1;
  return series.works.indexOf(workId);
}

// Helper function to get next/prev works in series
export function getAdjacentWorks(workId: string, seriesId: string): { prev?: string; next?: string } {
  const series = seriesData.find(s => s.id === seriesId);
  if (!series) return {};
  
  const position = series.works.indexOf(workId);
  if (position === -1) return {};
  
  return {
    prev: position > 0 ? series.works[position - 1] : undefined,
    next: position < series.works.length - 1 ? series.works[position + 1] : undefined
  };
}
