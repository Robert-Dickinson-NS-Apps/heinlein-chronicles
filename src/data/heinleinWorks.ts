import strangerCover from '@/assets/covers/stranger-in-strange-land.jpg';
import moonCover from '@/assets/covers/moon-harsh-mistress.jpg';
import starshipCover from '@/assets/covers/starship-troopers.jpg';
import doubleStarCover from '@/assets/covers/double-star.jpg';
import doorCover from '@/assets/covers/door-into-summer.jpg';
import timeCover from '@/assets/covers/time-enough-love.jpg';
import puppetCover from '@/assets/covers/puppet-masters.jpg';
import citizenCover from '@/assets/covers/citizen-galaxy.jpg';
import { additionalShortStories } from './heinleinShortStories';

export interface Character {
  name: string;
  description: string;
}

export interface Work {
  id: string;
  title: string;
  year: number;
  type: 'novel' | 'short-story' | 'novella';
  summary: string;
  characters: Character[];
  coverImage?: string;
  themes?: string[];
  wordCount?: number;
}

export const heinleinWorks: Work[] = [
  // Novels in chronological order
  {
    id: 'for-us-the-living',
    title: 'For Us, the Living: A Comedy of Customs',
    year: 1939,
    type: 'novel',
    summary: 'A man from 1939 wakes up in the year 2086 and explores a utopian society based on social credit economics. Published posthumously in 2003.',
    themes: ['Social Credit', 'Economics', 'Utopia', 'Time Travel'],
    wordCount: 90000,
    characters: [
      { name: 'Perry Nelson', description: 'Man from 1939 transported to future' },
      { name: 'Diana', description: 'Woman from 2086 who guides Perry' }
    ]
  },
  {
    id: 'rocket-ship-galileo',
    title: 'Rocket Ship Galileo',
    year: 1947,
    type: 'novel',
    summary: 'Three teenage boys and a scientist travel to the Moon in a privately built rocket ship, where they discover evidence of Nazi survivors plotting a new war.',
    themes: ['Space Exploration', 'Adventure', 'Youth Empowerment'],
    wordCount: 60000,
    characters: [
      { name: 'Ross Jenkins', description: 'Intelligent and determined teenager, natural leader of the group' },
      { name: 'Art Mueller', description: 'Ross\'s friend, skilled in engineering and practical matters' },
      { name: 'Morrie Abrams', description: 'The third member of the teenage trio, thoughtful and analytical' },
      { name: 'Dr. Donald Cargraves', description: 'Nuclear physicist and rocket scientist, uncle to Ross' }
    ]
  },
  {
    id: 'space-cadet',
    title: 'Space Cadet',
    year: 1948,
    type: 'novel',
    summary: 'Matt Dodson joins the Space Patrol Academy and undergoes rigorous training to become a guardian of peace in the Solar System, facing challenges that test his courage and principles.',
    characters: [
      { name: 'Matt Dodson', description: 'Idealistic young cadet from Iowa, protagonist of the story' },
      { name: 'Tex Jarman', description: 'Matt\'s roommate, a Texan with traditional values' },
      { name: 'Oscar Jensen', description: 'Another cadet friend, from Venus' },
      { name: 'Lieutenant Wong', description: 'Strict but fair training officer' }
    ]
  },
  {
    id: 'red-planet',
    title: 'Red Planet',
    year: 1949,
    type: 'novel',
    summary: 'Two boys attending boarding school on Mars discover a conspiracy that threatens the colony and must rely on their Martian friend, a native creature, to warn Earth.',
    characters: [
      { name: 'Jim Marlowe', description: 'Resourceful teenager living on Mars' },
      { name: 'Frank Sutton', description: 'Jim\'s best friend and fellow student' },
      { name: 'Willis', description: 'A native Martian creature with surprising intelligence and communication abilities' },
      { name: 'Dr. MacRae', description: 'Headmaster who becomes involved in the conspiracy' }
    ]
  },
  {
    id: 'beyond-this-horizon',
    title: 'Beyond This Horizon',
    year: 1948,
    type: 'novel',
    summary: 'In a genetically-engineered utopia, a man questions the purpose of perfection and explores themes of eugenics and individual freedom.',
    themes: ['Genetics', 'Eugenics', 'Utopia', 'Individual Freedom'],
    wordCount: 75000,
    characters: [
      { name: 'Hamilton Felix', description: 'Genetically superior man who questions society' },
      { name: 'Longcourt Phyllis', description: 'Hamilton\'s romantic interest' }
    ]
  },
  {
    id: 'between-planets',
    title: 'Between Planets',
    year: 1951,
    type: 'novel',
    summary: 'A young man caught between Earth and Venus when war breaks out must choose his allegiance while protecting a secret that could change the course of the conflict.',
    characters: [
      { name: 'Don Harvey', description: 'Teenager born in space, holds dual Earth-Venus citizenship' },
      { name: 'Sir Isaac', description: 'Don\'s pet dragon from Venus, highly intelligent and a Venerian native' },
      { name: 'Dr. Jefferson', description: 'Don\'s guardian and mentor' }
    ]
  },
  {
    id: 'the-puppet-masters',
    title: 'The Puppet Masters',
    year: 1951,
    type: 'novel',
    summary: 'Alien parasites that attach to human hosts and control their minds secretly invade Earth. A secret agent and his team race to stop the invasion before humanity loses its free will.',
    coverImage: puppetCover,
    themes: ['Alien Invasion', 'Mind Control', 'Paranoia', 'Freedom'],
    wordCount: 85000,
    characters: [
      { name: 'Sam Cavanaugh', description: 'Secret service agent, also known as Elihu Nivens, protagonist fighting the alien invasion' },
      { name: 'Andrew "The Old Man" Nivens', description: 'Sam\'s superior, head of a secret government agency' },
      { name: 'Mary Sperling', description: 'Beautiful agent who becomes Sam\'s partner and love interest' }
    ]
  },
  {
    id: 'the-rolling-stones',
    title: 'The Rolling Stones',
    year: 1952,
    type: 'novel',
    summary: 'The Stone family purchases a used spaceship and embarks on a tour of the Solar System, encountering adventures and business opportunities from the Moon to the asteroid belt.',
    themes: ['Family', 'Space Travel', 'Adventure', 'Entrepreneurship'],
    wordCount: 60000,
    characters: [
      { name: 'Roger Stone', description: 'Father and ship\'s pilot, former Mayor of Luna City' },
      { name: 'Dr. Edith Stone', description: 'Mother, ship\'s engineer and medical officer' },
      { name: 'Castor Stone', description: 'Twin son, mechanical genius' },
      { name: 'Pollux Stone', description: 'Twin son, Castor\'s identical twin and business partner' },
      { name: 'Hazel Stone', description: 'Grandmother, writer and sharp-tongued matriarch, also known as Gwendolyn Novak' },
      { name: 'Meade Stone', description: 'Teenage daughter' },
      { name: 'Lowell "Buster" Stone', description: 'Young son' }
    ]
  },
  {
    id: 'starman-jones',
    title: 'Starman Jones',
    year: 1953,
    type: 'novel',
    summary: 'A farm boy with an eidetic memory stows away on a starship and rises through the ranks to become navigator, eventually saving the ship when it becomes lost in uncharted space.',
    themes: ['Coming of Age', 'Space Travel', 'Meritocracy', 'Adventure'],
    wordCount: 65000,
    characters: [
      { name: 'Max Jones', description: 'Young protagonist with photographic memory, dreams of becoming an astrogator' },
      { name: 'Sam Anderson', description: 'Experienced spacer who befriends Max' },
      { name: 'Eldreth "Ellie" Coburn', description: 'Wealthy passenger who Max befriends' },
      { name: 'Captain Blaine', description: 'Commander of the starship' }
    ]
  },
  {
    id: 'the-star-beast',
    title: 'The Star Beast',
    year: 1954,
    type: 'novel',
    summary: 'A boy\'s pet "Lummox" turns out to be a highly intelligent alien, creating diplomatic complications.',
    themes: ['Alien Intelligence', 'Coming of Age', 'Diplomacy', 'Pets'],
    wordCount: 60000,
    characters: [
      { name: 'John Thomas Stuart XI', description: 'Teenager who owns Lummox' },
      { name: 'Lummox', description: 'Alien creature thought to be a pet' },
      { name: 'Mr. (Henry Gladstone) Kiku', description: 'Alien ambassador' }
    ]
  },
  {
    id: 'tunnel-in-the-sky',
    title: 'Tunnel in the Sky',
    year: 1955,
    type: 'novel',
    summary: 'Students taking a survival test on a distant planet are stranded when the portal back to Earth fails. They must build a new society while hoping for rescue.',
    themes: ['Survival', 'Leadership', 'Society Building', 'Coming of Age'],
    wordCount: 65000,
    characters: [
      { name: 'Rod Walker', description: 'Protagonist, mature and capable survival student' },
      { name: 'Jacqueline "Jack" Daudet', description: 'Rod\'s friend and fellow student' },
      { name: 'Caroline Mshiyeni', description: 'Capable female student who becomes Rod\'s partner' },
      { name: 'Grant Cowper', description: 'Student who tries to establish himself as leader' }
    ]
  },
  {
    id: 'double-star',
    title: 'Double Star',
    year: 1956,
    type: 'novel',
    summary: 'An out-of-work actor is hired to impersonate a kidnapped politician. The role becomes permanent, forcing him to become the leader he only pretended to be.',
    coverImage: doubleStarCover,
    characters: [
      { name: 'Lorenzo Smythe', description: 'Unemployed actor known as The Great Lorenzo who must impersonate a political leader' },
      { name: 'Joseph Bonforte', description: 'Prominent politician who is kidnapped' },
      { name: 'Penny', description: 'Bonforte\'s secretary and confidante' },
      { name: 'Dak Broadbent', description: 'Spaceship pilot and loyal member of Bonforte\'s team' }
    ]
  },
  {
    id: 'time-for-the-stars',
    title: 'Time for the Stars',
    year: 1956,
    type: 'novel',
    summary: 'Twin brothers with telepathic connection are separated when one joins a relativistic space mission, exploring time dilation.',
    themes: ['Time Dilation', 'Telepathy', 'Space Exploration', 'Family'],
    wordCount: 65000,
    characters: [
      { name: 'Thomas "Tom" Bartlett', description: 'Twin who goes on space mission' },
      { name: 'Patrick "Pat" Bartlett', description: 'Twin who stays on Earth' }
    ]
  },
  {
    id: 'the-door-into-summer',
    title: 'The Door into Summer',
    year: 1957,
    type: 'novel',
    summary: 'An engineer betrayed by his business partner and fiancée uses suspended animation to travel to the future, then discovers time travel, allowing him to change his past.',
    coverImage: doorCover,
    characters: [
      { name: 'Daniel Boone Davis', description: 'Inventor and engineer who travels through time' },
      { name: 'Miles Gentry', description: 'Dan\'s treacherous business partner' },
      { name: 'Belle S. Darkin', description: 'Dan\'s former fiancée who betrays him' },
      { name: 'Frederica "Ricky" Gentry', description: 'Miles\' stepdaughter, becomes central to Dan\'s life' },
      { name: 'Petronius "Pete" the Arbiter', description: 'Dan\'s cat, always looking for "the door into summer"' }
    ]
  },
  {
    id: 'citizen-of-the-galaxy',
    title: 'Citizen of the Galaxy',
    year: 1957,
    type: 'novel',
    summary: 'A slave boy is freed by a beggar who is secretly a powerful agent. After his mentor\'s death, he discovers his true identity and must confront an interstellar slave trade.',
    coverImage: citizenCover,
    characters: [
      { name: 'Thorby', description: 'Former slave who discovers he is Thor B. Rudbek, heir to a powerful corporation' },
      { name: 'Baslim the Cripple', description: 'Beggar who is actually a secret agent, adopts Thorby' },
      { name: 'Captain Krausa', description: 'Captain of the free trader ship Sisu' },
      { name: 'Margaret', description: 'Member of Sisu\'s crew who befriends Thorby' }
    ]
  },
  {
    id: 'have-space-suit-will-travel',
    title: 'Have Space Suit—Will Travel',
    year: 1958,
    type: 'novel',
    summary: 'A high school student wins a space suit in a contest, gets kidnapped by aliens, and finds himself defending humanity\'s right to survive before an intergalactic tribunal.',
    characters: [
      { name: 'Clifford "Kip" Russell', description: 'Resourceful teenager who wins a space suit and adventures beyond Earth' },
      { name: 'Patricia "Peewee"', description: 'Precocious young genius, daughter of a famous scientist' },
      { name: 'The Mother Thing', description: 'Benevolent alien who befriends the humans' },
      { name: 'Wormface', description: 'Antagonistic alien who captures the protagonists' }
    ]
  },
  {
    id: 'methuselahs-children',
    title: 'Methuselah\'s Children',
    year: 1958,
    type: 'novel',
    summary: 'Members of a long-lived human bloodline flee Earth in a stolen starship when the secret of their longevity is exposed and they face persecution from normal humans.',
    characters: [
      { name: 'Lazarus Long', description: 'Oldest member of the Howard Families, resourceful and cunning survivor' },
      { name: 'Andrew Jackson "Slipstick" Libby', description: 'Mathematical genius who developed the Libby Drive' },
      { name: 'Mary Sperling', description: 'Member of the Howard Families\' council' },
      { name: 'Ira Weatheral', description: 'Administrator who becomes involved with the Howard Families' }
    ]
  },
  {
    id: 'starship-troopers',
    title: 'Starship Troopers',
    year: 1959,
    type: 'novel',
    summary: 'In a future where citizenship is earned through military service, a young soldier rises through the ranks of the Mobile Infantry while humanity wages war against insectoid aliens.',
    coverImage: starshipCover,
    characters: [
      { name: 'Juan "Johnny" Rico', description: 'Filipino soldier who joins Mobile Infantry and rises to command' },
      { name: 'Sergeant Charles Zim', description: 'Tough training instructor who later serves under Rico' },
      { name: 'Lieutenant Rasczak', description: 'Rico\'s commanding officer and role model' },
      { name: 'Carmen Ibanez', description: 'Rico\'s high school crush who becomes a starship pilot' },
      { name: 'Carl Jenkins', description: 'Rico\'s friend with powerful psychic abilities' },
      { name: 'Mr. (Jean) V. Dubois', description: 'Rico\'s high school teacher of History and Moral Philosophy' },
      { name: 'Captain Krausa', description: 'Commanding officer' }
    ]
  },
  {
    id: 'stranger-in-a-strange-land',
    title: 'Stranger in a Strange Land',
    year: 1961,
    type: 'novel',
    summary: 'A human raised by Martians returns to Earth as an adult, bringing Martian philosophy and abilities. His presence catalyzes a cultural revolution questioning sexuality, religion, and society.',
    coverImage: strangerCover,
    characters: [
      { name: 'Valentine Michael Smith', description: 'Human raised on Mars with supernatural abilities and alien perspective' },
      { name: 'Jubal Harshaw', description: 'Cynical but wise writer and doctor who becomes Mike\'s mentor' },
      { name: 'Jillian "Jill" Boardman', description: 'Nurse who helps Mike escape government custody' },
      { name: 'Ben Caxton', description: 'Journalist investigating Mike\'s situation' },
      { name: 'Anne', description: 'Fair Witness and member of Jubal\'s household staff' },
      { name: 'Miriam', description: 'Member of Jubal\'s household' },
      { name: 'Dorcas', description: 'Member of Jubal\'s household' },
      { name: 'Duke', description: 'Member of Jubal\'s household' },
      { name: 'Larry', description: 'Member of Jubal\'s household' },
      { name: 'Dr. "Stinky" Mahmoud', description: 'Martian language expert' },
      { name: 'Patty Paiwonski', description: 'Showgirl who joins the church' },
      { name: 'Secretary-General Joseph Douglas', description: 'Head of government' },
      { name: 'Alice Douglas', description: 'Wife of the Secretary-General' },
      { name: 'Foster', description: 'Archangel Foster, founder of the Fosterite religion' },
      { name: 'Digby', description: 'Bishop Digby of the Fosterite church' }
    ]
  },
  {
    id: 'podkayne-of-mars',
    title: 'Podkayne of Mars',
    year: 1963,
    type: 'novel',
    summary: 'A teenage girl from Mars travels to Earth and Venus, documenting her adventures and dreams of becoming a starship captain.',
    themes: ['Coming of Age', 'Adventure', 'Gender Roles', 'Space Travel'],
    wordCount: 55000,
    characters: [
      { name: 'Podkayne Fries', description: 'Ambitious teenage girl from Mars' },
      { name: 'Clark Fries', description: 'Podkayne\'s genius younger brother' }
    ]
  },
  {
    id: 'glory-road',
    title: 'Glory Road',
    year: 1963,
    type: 'novel',
    summary: 'A Vietnam veteran is recruited for a quest through alternate universes to recover a magical artifact.',
    themes: ['Adventure', 'Fantasy', 'Heroism', 'Parallel Universes'],
    wordCount: 85000,
    characters: [
      { name: 'Evelyn Cyril "E.C." Gordon (Oscar)', description: 'Veteran recruited for quest' },
      { name: 'Star', description: 'Beautiful warrior woman and empress' },
      { name: 'Rufo', description: 'Star\'s companion and mentor' }
    ]
  },
  {
    id: 'orphans-of-the-sky',
    title: 'Orphans of the Sky',
    year: 1963,
    type: 'novel',
    summary: 'Inhabitants of a generation ship have forgotten their mission. A young man discovers the truth about their vessel. Fix-up of "Universe" and "Common Sense" novellas.',
    themes: ['Generation Ships', 'Lost Knowledge', 'Exploration', 'Religion'],
    wordCount: 45000,
    characters: [
      { name: 'Hugh Hoyland', description: 'Crew member who discovers the truth about the ship' },
      { name: 'Joe-Jim Gregory', description: 'Two-headed mutant who helps Hugh' }
    ]
  },
  {
    id: 'farnhams-freehold',
    title: 'Farnham\'s Freehold',
    year: 1964,
    type: 'novel',
    summary: 'A family survives nuclear war only to be transported to a future where racial roles are reversed.',
    themes: ['Nuclear War', 'Survival', 'Racism', 'Time Travel'],
    wordCount: 95000,
    characters: [
      { name: 'Hugh Farnham', description: 'Patriarch preparing for nuclear war' },
      { name: 'Barbara Farnham', description: 'Hugh\'s wife' }
    ]
  },
  {
    id: 'podkayne-of-mars',
    title: 'Podkayne of Mars',
    year: 1963,
    type: 'novel',
    summary: 'A teenage Martian girl keeps a diary of her first trip to Earth and Venus, which becomes increasingly serious as her family becomes entangled in interplanetary politics.',
    characters: [
      { name: 'Podkayne "Poddy" Fries', description: 'Enthusiastic teenage Martian girl who dreams of becoming a starship pilot' },
      { name: 'Clark Fries', description: 'Poddy\'s brilliant but amoral younger brother' },
      { name: 'Uncle Tom', description: 'Senator Tom Fries, Poddy and Clark\'s uncle' },
      { name: 'Duncan', description: 'Senator\'s aide who accompanies the family' }
    ]
  },
  {
    id: 'glory-road',
    title: 'Glory Road',
    year: 1963,
    type: 'novel',
    summary: 'A Vietnam veteran answers a mysterious ad and finds himself on a quest through multiple dimensions to recover a magical artifact, guided by a beautiful woman who is more than she seems.',
    characters: [
      { name: 'E.C. "Oscar" Gordon', description: 'Former soldier who becomes a hero in another dimension' },
      { name: 'Star', description: 'Her Wisdom, powerful ruler seeking the Egg of the Phoenix' },
      { name: 'Rufo', description: 'Star\'s loyal companion and swordmaster' }
    ]
  },
  {
    id: 'farnhams-freehold',
    title: 'Farnham\'s Freehold',
    year: 1964,
    type: 'novel',
    summary: 'A family survives a nuclear attack in their bomb shelter, only to find themselves thrown into a future where racial power dynamics are inverted and survival requires difficult choices.',
    characters: [
      { name: 'Hugh Farnham', description: 'Survivalist patriarch trying to protect his family' },
      { name: 'Grace Farnham', description: 'Hugh\'s wife, struggling with their situation' },
      { name: 'Barbara', description: 'Hugh\'s capable daughter' },
      { name: 'Duke', description: 'Hugh\'s friend who shelters with them' },
      { name: 'Joe', description: 'Family servant who becomes more important in the new world' }
    ]
  },
  {
    id: 'the-moon-is-a-harsh-mistress',
    title: 'The Moon Is a Harsh Mistress',
    year: 1966,
    type: 'novel',
    summary: 'A supercomputer, a one-armed computer technician, a political activist, and a revolutionary professor lead a rebellion to free the Moon from Earth\'s colonial rule.',
    coverImage: moonCover,
    characters: [
      { name: 'Manuel "Mannie" Garcia O\'Kelly-Davis', description: 'Computer technician and first friend of Mike the AI' },
      { name: 'Mycroft "Mike" Holmes', description: 'Self-aware supercomputer who joins the revolution' },
      { name: 'Wyoming "Wyoh" Knott', description: 'Political agitator and revolutionary' },
      { name: 'Prof. Bernardo de la Paz', description: 'Rational anarchist who provides philosophical guidance' }
    ]
  },
  {
    id: 'i-will-fear-no-evil',
    title: 'I Will Fear No Evil',
    year: 1970,
    type: 'novel',
    summary: 'A dying elderly billionaire has his brain transplanted into a young woman\'s body, leading to explorations of identity, gender, sexuality, and consciousness.',
    characters: [
      { name: 'Johann Sebastian Bach Smith', description: 'Elderly billionaire whose brain is transplanted' },
      { name: 'Joan Eunice Smith', description: 'New identity after brain transplant into Eunice\'s body' },
      { name: 'Eunice Branca', description: 'Young secretary whose body receives Johann\'s brain' },
      { name: 'Jake Salomon', description: 'Johann\'s lawyer and friend' },
      { name: 'Joe Branca', description: 'Eunice\'s widower' }
    ]
  },
  {
    id: 'time-enough-for-love',
    title: 'Time Enough for Love',
    year: 1973,
    type: 'novel',
    summary: 'Lazarus Long, the oldest living human, recounts his life experiences across centuries and planets, exploring themes of love, family, and the meaning of life.',
    coverImage: timeCover,
    characters: [
      { name: 'Lazarus Long', description: 'Immortal protagonist, born Woodrow Wilson Smith in 1912' },
      { name: 'Maureen Johnson', description: 'Lazarus\'s mother, whom he meets through time travel' },
      { name: 'Dora', description: 'Ship computer who becomes Lazarus\'s companion' },
      { name: 'Galahad', description: 'One of Lazarus\'s clones' },
      { name: 'Ira Howard', description: 'Administrator and Lazarus\'s descendant' },
      { name: 'Minerva', description: 'Sentient computer who becomes human' }
    ]
  },
  {
    id: 'the-number-of-the-beast',
    title: 'The Number of the Beast',
    year: 1980,
    type: 'novel',
    summary: 'Two couples travel through parallel universes in a modified car, visiting fictional worlds and meeting characters from other stories while evading mysterious "Black Hats."',
    characters: [
      { name: 'Zebadiah John Carter', description: 'Captain Zeb Carter, owns the space-time car' },
      { name: 'Dejah Thoris "Deety" Burroughs Carter', description: 'Mathematician and Zeb\'s wife' },
      { name: 'Hilda "Sharpie" Burroughs', description: 'Deety\'s vivacious mother' },
      { name: 'Jacob Burroughs', description: 'Scientist who invented the space-time device' }
    ]
  },
  {
    id: 'friday',
    title: 'Friday',
    year: 1982,
    type: 'novel',
    summary: 'A genetically engineered woman works as a secret courier in a balkanized future Earth, searching for a place to belong while questioning what it means to be human.',
    characters: [
      { name: 'Friday Jones', description: 'Artificial human courier with enhanced abilities' },
      { name: 'Dr. Hartley "Kettle Belly" Baldwin', description: 'Boss at courier service' },
      { name: 'Pug', description: 'Friend and fellow courier' }
    ]
  },
  {
    id: 'job-a-comedy-of-justice',
    title: 'Job: A Comedy of Justice',
    year: 1984,
    type: 'novel',
    summary: 'A fundamentalist Christian minister repeatedly shifts between alternate realities, losing everything. With his pagan lover, he discovers the truth about gods, devils, and the nature of existence.',
    characters: [
      { name: 'Alex Hergensheimer', description: 'Minister who loses his faith and finds true love' },
      { name: 'Alec Graham', description: 'Alex\'s name in another reality' },
      { name: 'Margrethe', description: 'Danish woman and Alex\'s love interest' }
    ]
  },
  {
    id: 'the-cat-who-walks-through-walls',
    title: 'The Cat Who Walks Through Walls',
    year: 1985,
    type: 'novel',
    summary: 'A retired military officer living on a space station is drawn into a complex conspiracy involving time travel, artificial intelligence, and characters from other Heinlein novels.',
    characters: [
      { name: 'Richard Ames', description: 'Retired colonel and writer, also known as Colin Campbell' },
      { name: 'Gwendolyn Novak', description: 'Mysterious woman, revealed to be Hazel Meade Stone' },
      { name: 'Pixel', description: 'The eponymous cat with unusual abilities' }
    ]
  },
  {
    id: 'to-sail-beyond-the-sunset',
    title: 'To Sail Beyond the Sunset',
    year: 1987,
    type: 'novel',
    summary: 'The autobiography of Maureen Johnson, mother of Lazarus Long, exploring her life, loves, and adventures across time and space in Heinlein\'s multiverse.',
    characters: [
      { name: 'Maureen Johnson Smith Long', description: 'Matriarch of the Long family, mother of Lazarus Long' },
      { name: 'Brian Smith', description: 'Maureen\'s husband' },
      { name: 'Lazarus Long', description: 'Maureen\'s son and eventually her lover across time' },
      { name: 'Ted', description: 'Maureen\'s father, who has an unusual relationship with her' }
    ]
  }
];

// Merge additional short stories with main works
export const allWorks = [...heinleinWorks, ...additionalShortStories].sort((a, b) => a.year - b.year);

