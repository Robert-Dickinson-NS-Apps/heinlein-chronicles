// Edition cover data for notable works
// Shows how cover art evolved across different publishers and decades

export interface EditionCover {
  year: number;
  publisher: string;
  edition: string;
  description?: string;
  notes?: string;
}

export interface WorkEditions {
  workId: string;
  editions: EditionCover[];
}

// Edition history for major works
// Note: We use the existing cover as the "primary" and describe historical editions
export const editionData: WorkEditions[] = [
  {
    workId: 'stranger-in-a-strange-land',
    editions: [
      { year: 1961, publisher: "G.P. Putnam's Sons", edition: 'First Edition', description: 'Original hardcover with abstract geometric design', notes: 'Cut version, approximately 160,000 words' },
      { year: 1962, publisher: 'Avon Books', edition: 'First Paperback', description: 'Mass market paperback with painted cover art' },
      { year: 1968, publisher: 'Berkley Medallion', edition: 'Berkley Edition', description: 'Psychedelic cover reflecting 1960s counterculture', notes: 'Popular with the hippie movement' },
      { year: 1978, publisher: 'Berkley', edition: '15th Anniversary', description: 'Updated cover with Mars landscape imagery' },
      { year: 1991, publisher: "G.P. Putnam's Sons", edition: 'Uncut Edition', description: 'Restored original manuscript cover', notes: 'Full 220,000 word version restored by Virginia Heinlein' },
      { year: 2018, publisher: 'Ace Books', edition: 'Modern Reissue', description: 'Contemporary minimalist design with retro typography' }
    ]
  },
  {
    workId: 'starship-troopers',
    editions: [
      { year: 1959, publisher: "G.P. Putnam's Sons", edition: 'First Edition', description: 'Original hardcover with space marines illustration' },
      { year: 1960, publisher: 'Signet', edition: 'First Paperback', description: 'Classic painted cover with powered armor suit' },
      { year: 1968, publisher: 'Berkley', edition: 'Berkley Edition', description: 'Redesigned cover with bug aliens featured' },
      { year: 1987, publisher: 'Ace Books', edition: 'Ace Reissue', description: 'Michael Whelan cover art', notes: 'Iconic powered armor illustration' },
      { year: 1997, publisher: 'Ace Books', edition: 'Movie Tie-in', description: 'Film poster imagery', notes: 'Released alongside Verhoeven film' },
      { year: 2006, publisher: 'Ace Books', edition: 'Modern Edition', description: 'Contemporary military sci-fi aesthetic' }
    ]
  },
  {
    workId: 'the-moon-is-a-harsh-mistress',
    editions: [
      { year: 1966, publisher: "G.P. Putnam's Sons", edition: 'First Edition', description: 'Original hardcover with lunar colony artwork' },
      { year: 1968, publisher: 'Berkley', edition: 'First Paperback', description: 'Painted cover featuring Luna and Earth' },
      { year: 1975, publisher: 'Berkley', edition: 'Berkley Reissue', description: 'Updated science fiction imagery' },
      { year: 1997, publisher: 'Orb Books', edition: 'Trade Paperback', description: 'Clean modern cover design' },
      { year: 2018, publisher: 'Ace Books', edition: 'Modern Reissue', description: 'Minimalist moon and Earth design' }
    ]
  },
  {
    workId: 'the-puppet-masters',
    editions: [
      { year: 1951, publisher: 'Doubleday', edition: 'First Edition', description: 'Original hardcover with alien slug imagery' },
      { year: 1951, publisher: 'Galaxy Science Fiction', edition: 'Magazine Serial', description: 'Original magazine serialization covers', notes: 'Serialized in three parts' },
      { year: 1954, publisher: 'Signet', edition: 'First Paperback', description: 'Pulp-style cover with dramatic alien imagery' },
      { year: 1990, publisher: 'Baen Books', edition: 'Restored Edition', description: 'Uncut version with new cover art', notes: 'Restored to original manuscript length' },
      { year: 1994, publisher: 'Del Rey', edition: 'Movie Tie-in', description: 'Film imagery featuring Donald Sutherland' }
    ]
  },
  {
    workId: 'the-door-into-summer',
    editions: [
      { year: 1957, publisher: 'Doubleday', edition: 'First Edition', description: 'Original hardcover with cat and inventor imagery' },
      { year: 1957, publisher: 'F&SF', edition: 'Magazine Serial', description: 'Original serialization covers' },
      { year: 1959, publisher: 'Signet', edition: 'First Paperback', description: 'Painted cover with time travel theme' },
      { year: 1986, publisher: 'Del Rey', edition: 'Del Rey Edition', description: 'Darrell K. Sweet cover illustration' },
      { year: 2021, publisher: 'Various', edition: 'Japanese Film Tie-in', description: 'Cover featuring Japanese film adaptation' }
    ]
  },
  {
    workId: 'double-star',
    editions: [
      { year: 1956, publisher: 'Doubleday', edition: 'First Edition', description: 'Original hardcover with political drama theme' },
      { year: 1956, publisher: 'Astounding SF', edition: 'Magazine Serial', description: 'Original serialization' },
      { year: 1957, publisher: 'Signet', edition: 'First Paperback', description: 'Painted cover with actor and Martian imagery' },
      { year: 1986, publisher: 'Del Rey', edition: 'Del Rey Edition', description: 'Classic science fiction cover style' }
    ]
  },
  {
    workId: 'time-enough-love',
    editions: [
      { year: 1973, publisher: "G.P. Putnam's Sons", edition: 'First Edition', description: 'Original hardcover with Lazarus Long portrait' },
      { year: 1974, publisher: 'Berkley', edition: 'First Paperback', description: 'Painted cover with romantic science fiction theme' },
      { year: 1988, publisher: 'Ace Books', edition: 'Ace Reissue', description: 'Michael Whelan artwork' },
      { year: 2016, publisher: 'Ace Books', edition: 'Modern Reissue', description: 'Contemporary cover design' }
    ]
  },
  {
    workId: 'friday',
    editions: [
      { year: 1982, publisher: 'Holt, Rinehart and Winston', edition: 'First Edition', description: 'Original hardcover featuring Friday illustration' },
      { year: 1983, publisher: 'Fawcett', edition: 'First Paperback', description: 'Action-oriented painted cover' },
      { year: 1997, publisher: 'Del Rey', edition: 'Del Rey Edition', description: 'Updated science fiction imagery' }
    ]
  },
  {
    workId: 'have-space-suit-will-travel',
    editions: [
      { year: 1958, publisher: "Charles Scribner's Sons", edition: 'First Edition', description: 'Original juvenile hardcover with spacesuit illustration' },
      { year: 1959, publisher: 'Ballantine', edition: 'First Paperback', description: 'Classic painted cover with space adventure theme' },
      { year: 1977, publisher: 'Del Rey', edition: 'Del Rey Edition', description: 'Darrell K. Sweet cover' },
      { year: 2009, publisher: 'Tor Teen', edition: 'Modern YA Edition', description: 'Contemporary young adult cover design' }
    ]
  },
  {
    workId: 'citizen-of-the-galaxy',
    editions: [
      { year: 1957, publisher: "Charles Scribner's Sons", edition: 'First Edition', description: 'Original juvenile hardcover' },
      { year: 1959, publisher: 'Ballantine', edition: 'First Paperback', description: 'Painted cover with slave market scene' },
      { year: 1984, publisher: 'Del Rey', edition: 'Del Rey Edition', description: 'Updated science fiction cover' },
      { year: 2005, publisher: 'Tor Teen', edition: 'Modern YA Edition', description: 'Contemporary young adult styling' }
    ]
  },
  {
    workId: 'all-you-zombies',
    editions: [
      { year: 1959, publisher: 'F&SF Magazine', edition: 'Original Publication', description: 'Magazine publication with period illustration', notes: 'March 1959 issue' },
      { year: 1967, publisher: 'Various Anthologies', edition: 'Anthology Appearances', description: 'Featured in multiple SF collections' },
      { year: 2014, publisher: 'Various', edition: 'Predestination Tie-in', description: 'Film adaptation cover imagery' }
    ]
  },
  {
    workId: 'methuselahs-children',
    editions: [
      { year: 1941, publisher: 'Astounding SF', edition: 'Magazine Serial', description: 'Original serialization in Astounding', notes: 'First appearance of Lazarus Long' },
      { year: 1958, publisher: 'Gnome Press', edition: 'First Book Edition', description: 'Expanded novel version hardcover' },
      { year: 1960, publisher: 'Signet', edition: 'First Paperback', description: 'Mass market paperback with Future History branding' },
      { year: 1986, publisher: 'Baen Books', edition: 'Baen Edition', description: 'Updated cover with starship imagery' }
    ]
  }
];

// Helper to get editions for a specific work
export function getEditionsForWork(workId: string): EditionCover[] {
  const work = editionData.find(w => w.workId === workId);
  return work?.editions || [];
}

// Helper to check if a work has edition data
export function hasEditionData(workId: string): boolean {
  return editionData.some(w => w.workId === workId);
}
