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
}

export const heinleinWorks: Work[] = [
  {
    id: 'life-line',
    title: 'Life-Line',
    year: 1939,
    type: 'short-story',
    summary: 'A scientist invents a device that can predict the exact moment of a person\'s death, threatening the insurance industry and leading to dangerous consequences.',
    characters: [
      { name: 'Dr. Pinero', description: 'Brilliant but eccentric scientist who invents the life-prediction device' },
      { name: 'Weems', description: 'Insurance company executive who sees Pinero as a threat' }
    ]
  },
  {
    id: 'misfit',
    title: 'Misfit',
    year: 1939,
    type: 'short-story',
    summary: 'A young man with extraordinary mathematical abilities joins the Cosmic Construction Corps and proves his worth during a dangerous asteroid engineering mission.',
    characters: [
      { name: 'Andrew Jackson Libby', description: 'Mathematical genius with an intuitive understanding of physics and ballistics' },
      { name: 'Captain Doyle', description: 'Commander of the construction crew' }
    ]
  },
  {
    id: 'requiem',
    title: 'Requiem',
    year: 1940,
    type: 'short-story',
    summary: 'An aging tycoon who funded the first Moon landing is denied the chance to go himself. In his final days, he makes one last desperate attempt to reach the Moon.',
    characters: [
      { name: 'D.D. Harriman', description: 'Wealthy entrepreneur and visionary who dreams of reaching the Moon' },
      { name: 'The Salesman', description: 'Opportunistic individual who helps Harriman achieve his dream' }
    ]
  },
  {
    id: 'if-this-goes-on',
    title: 'If This Goes On—',
    year: 1940,
    type: 'novella',
    summary: 'In a theocratic America ruled by a fundamentalist Prophet, a young officer in the elite guard joins a rebellion after falling in love with one of the Prophet\'s Virgins.',
    characters: [
      { name: 'John Lyle', description: 'Lieutenant in the Prophet\'s elite Angels of the Lord, becomes a revolutionary' },
      { name: 'Sister Judith', description: 'One of the Prophet\'s Virgin attendants who inspires John\'s awakening' },
      { name: 'Zebadiah', description: 'Leader of the underground revolutionary movement' }
    ]
  },
  {
    id: 'rocket-ship-galileo',
    title: 'Rocket Ship Galileo',
    year: 1947,
    type: 'novel',
    summary: 'Three teenage boys and a scientist travel to the Moon in a privately built rocket ship, where they discover evidence of Nazi survivors plotting a new war.',
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
    id: 'sixth-column',
    title: 'Sixth Column',
    year: 1949,
    type: 'novel',
    summary: 'After America falls to an Asian invasion, a small group of scientists develops a revolutionary weapon and forms a fake religion as cover for their resistance movement.',
    characters: [
      { name: 'Major Ardmore', description: 'Leader of the secret resistance group' },
      { name: 'Colonel Whitey Calhoun', description: 'Second in command, practical military strategist' },
      { name: 'Dr. Brooks', description: 'Scientist who helped develop the secret weapon' },
      { name: 'Thomas', description: 'Member of the team who poses as a religious leader' }
    ]
  },
  {
    id: 'farmer-in-the-sky',
    title: 'Farmer in the Sky',
    year: 1950,
    type: 'novel',
    summary: 'A teenage boy and his family emigrate from Earth to Ganymede, where they face the harsh realities of terraforming and pioneering on Jupiter\'s moon.',
    characters: [
      { name: 'Bill Lermer', description: 'Teenage protagonist who dreams of farming on Ganymede' },
      { name: 'George Lermer', description: 'Bill\'s father, an engineer' },
      { name: 'Molly', description: 'Bill\'s stepmother' },
      { name: 'Peggy', description: 'Bill\'s stepsister' },
      { name: 'Johann Schultz', description: 'A fellow colonist and mentor to Bill' }
    ]
  },
  {
    id: 'waldo',
    title: 'Waldo',
    year: 1950,
    type: 'novella',
    summary: 'A brilliant but physically weak inventor lives in isolation in space, developing remote manipulator devices. When Earth\'s power grid fails mysteriously, only he can solve the crisis.',
    characters: [
      { name: 'Waldo Farthingwaite-Jones', description: 'Genius inventor with severe myasthenia gravis, creator of remote manipulators' },
      { name: 'Dr. Rambeau', description: 'Physicist who has theories about the power failures' },
      { name: 'Grimes Schneider', description: 'Controversial scientist with unorthodox ideas about energy' }
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
      { name: 'Sir Isaac Newton', description: 'Don\'s pet dragon from Venus, highly intelligent' },
      { name: 'Dr. Jefferson', description: 'Don\'s guardian and mentor' },
      { name: 'Isobel', description: 'A young woman Don meets during his journey' }
    ]
  },
  {
    id: 'the-puppet-masters',
    title: 'The Puppet Masters',
    year: 1951,
    type: 'novel',
    summary: 'Alien parasites that attach to human hosts and control their minds secretly invade Earth. A secret agent and his team race to stop the invasion before humanity loses its free will.',
    characters: [
      { name: 'Sam Cavanaugh', description: 'Secret service agent, protagonist fighting the alien invasion' },
      { name: 'The Old Man', description: 'Sam\'s superior, head of a secret government agency' },
      { name: 'Mary', description: 'Beautiful agent who becomes Sam\'s partner and love interest' },
      { name: 'The Titans', description: 'Slug-like alien parasites that attach to human spinal columns' }
    ]
  },
  {
    id: 'the-rolling-stones',
    title: 'The Rolling Stones',
    year: 1952,
    type: 'novel',
    summary: 'The Stone family purchases a used spaceship and embarks on a tour of the Solar System, encountering adventures and business opportunities from the Moon to the asteroid belt.',
    characters: [
      { name: 'Roger Stone', description: 'Father and ship\'s pilot, former Mayor of Luna City' },
      { name: 'Edith Stone', description: 'Mother, ship\'s engineer and medical officer' },
      { name: 'Castor Stone', description: 'Twin son, mechanical genius' },
      { name: 'Pollux Stone', description: 'Twin son, Castor\'s identical twin and business partner' },
      { name: 'Hazel Stone', description: 'Grandmother, writer and sharp-tongued matriarch' },
      { name: 'Meade Stone', description: 'Teenage daughter' },
      { name: 'Buster Stone', description: 'Young son' }
    ]
  },
  {
    id: 'starman-jones',
    title: 'Starman Jones',
    year: 1953,
    type: 'novel',
    summary: 'A farm boy with an eidetic memory stows away on a starship and rises through the ranks to become navigator, eventually saving the ship when it becomes lost in uncharted space.',
    characters: [
      { name: 'Max Jones', description: 'Young protagonist with photographic memory, dreams of becoming an astrogator' },
      { name: 'Sam Anderson', description: 'Experienced spacer who befriends Max' },
      { name: 'Eldreth Coburn', description: 'Wealthy passenger who Max befriends' },
      { name: 'Captain Blaine', description: 'Commander of the starship' }
    ]
  },
  {
    id: 'tunnel-in-the-sky',
    title: 'Tunnel in the Sky',
    year: 1955,
    type: 'novel',
    summary: 'Students taking a survival test on a distant planet are stranded when the portal back to Earth fails. They must build a new society while hoping for rescue.',
    characters: [
      { name: 'Rod Walker', description: 'Protagonist, mature and capable survival student' },
      { name: 'Jack Daudet', description: 'Rod\'s friend and fellow student' },
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
    characters: [
      { name: 'Lawrence Smith (Lorenzo Smythe)', description: 'Unemployed actor who must impersonate a political leader' },
      { name: 'John Joseph Bonforte', description: 'Prominent politician who is kidnapped' },
      { name: 'Penny Russell', description: 'Bonforte\'s assistant and confidante' },
      { name: 'Dak Broadbent', description: 'Spaceship pilot and loyal member of Bonforte\'s team' }
    ]
  },
  {
    id: 'the-door-into-summer',
    title: 'The Door into Summer',
    year: 1957,
    type: 'novel',
    summary: 'An engineer betrayed by his business partner and fiancée uses suspended animation to travel to the future, then discovers time travel, allowing him to change his past.',
    characters: [
      { name: 'Daniel Boone Davis', description: 'Inventor and engineer who travels through time' },
      { name: 'Miles Gentry', description: 'Dan\'s treacherous business partner' },
      { name: 'Belle Darkin', description: 'Dan\'s former fiancée who betrays him' },
      { name: 'Frederica "Ricky" Gentry', description: 'Miles\' stepdaughter, becomes central to Dan\'s life' },
      { name: 'Pete', description: 'Dan\'s cat, always looking for "the door into summer"' }
    ]
  },
  {
    id: 'citizen-of-the-galaxy',
    title: 'Citizen of the Galaxy',
    year: 1957,
    type: 'novel',
    summary: 'A slave boy is freed by a beggar who is secretly a powerful agent. After his mentor\'s death, he discovers his true identity and must confront an interstellar slave trade.',
    characters: [
      { name: 'Thorby Baslim', description: 'Former slave who discovers he is heir to a powerful corporation' },
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
      { name: 'Peewee', description: 'Precocious young genius, daughter of a famous scientist' },
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
      { name: 'Libby', description: 'Mathematical genius who developed the Libby Drive' },
      { name: 'Mary Sperling', description: 'Member of the Howard Families\' council' },
      { name: 'Ford', description: 'Administrator who becomes dictator of Earth' }
    ]
  },
  {
    id: 'starship-troopers',
    title: 'Starship Troopers',
    year: 1959,
    type: 'novel',
    summary: 'In a future where citizenship is earned through military service, a young soldier rises through the ranks of the Mobile Infantry while humanity wages war against insectoid aliens.',
    characters: [
      { name: 'Juan "Johnnie" Rico', description: 'Filipino soldier who joins Mobile Infantry and rises to command' },
      { name: 'Sergeant Zim', description: 'Tough training instructor who later serves under Rico' },
      { name: 'Lieutenant Rasczak', description: 'Rico\'s commanding officer and role model' },
      { name: 'Carmen Ibanez', description: 'Rico\'s high school crush who becomes a starship pilot' },
      { name: 'Carl', description: 'Rico\'s friend with powerful psychic abilities' }
    ]
  },
  {
    id: 'stranger-in-a-strange-land',
    title: 'Stranger in a Strange Land',
    year: 1961,
    type: 'novel',
    summary: 'A human raised by Martians returns to Earth as an adult, bringing Martian philosophy and abilities. His presence catalyzes a cultural revolution questioning sexuality, religion, and society.',
    characters: [
      { name: 'Valentine Michael Smith', description: 'Human raised on Mars with supernatural abilities and alien perspective' },
      { name: 'Jubal Harshaw', description: 'Cynical but wise writer and doctor who becomes Mike\'s mentor' },
      { name: 'Jill Boardman', description: 'Nurse who helps Mike escape government custody' },
      { name: 'Ben Caxton', description: 'Journalist investigating Mike\'s situation' },
      { name: 'Anne', description: 'Member of Jubal\'s household staff' }
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
      { name: 'Oscar Gordon (Evelyn Cyril Gordon)', description: 'Former soldier who becomes a hero in another dimension' },
      { name: 'Star (Empress of Twenty Universes)', description: 'Powerful ruler seeking the Egg of the Phoenix' },
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
    characters: [
      { name: 'Manuel Garcia "Mannie" O\'Kelly-Davis', description: 'Computer technician and first friend of Mike the AI' },
      { name: 'Mike (Mycroft)', description: 'Self-aware supercomputer who joins the revolution' },
      { name: 'Wyoming Knott', description: 'Political agitator and revolutionary' },
      { name: 'Professor Bernardo de la Paz', description: 'Rational anarchist who provides philosophical guidance' }
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
      { name: 'Eunice Branca', description: 'Young secretary whose body receives Johann\'s brain' },
      { name: 'Jake Salomon', description: 'Johann\'s lawyer and friend' },
      { name: 'Dr. Garcia', description: 'Surgeon who performs the transplant' }
    ]
  },
  {
    id: 'time-enough-for-love',
    title: 'Time Enough for Love',
    year: 1973,
    type: 'novel',
    summary: 'Lazarus Long, the oldest living human, recounts his life experiences across centuries and planets, exploring themes of love, family, and the meaning of life.',
    characters: [
      { name: 'Lazarus Long', description: 'Immortal protagonist, born Woodrow Wilson Smith in 1912' },
      { name: 'Dora Brandon Long', description: 'One of Lazarus\'s wives' },
      { name: 'Lapis Lazuli Long', description: 'One of Lazarus\'s clone daughters' },
      { name: 'Lorelei Lee Long', description: 'One of Lazarus\'s clone daughters' },
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
      { name: 'Deety', description: 'Mathematician and Zeb\'s wife' },
      { name: 'Hilda', description: 'Deety\'s vivacious mother' },
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
      { name: 'Friday Baldwin', description: 'Artificial human courier with enhanced abilities' },
      { name: 'Boss', description: 'Friday\'s employer in the courier service' },
      { name: 'Georges Perreault', description: 'Friday\'s husband in one of her marriages' }
    ]
  },
  {
    id: 'job-a-comedy-of-justice',
    title: 'Job: A Comedy of Justice',
    year: 1984,
    type: 'novel',
    summary: 'A fundamentalist Christian minister repeatedly shifts between alternate realities, losing everything. With his pagan lover, he discovers the truth about gods, devils, and the nature of existence.',
    characters: [
      { name: 'Alexander Hergensheimer', description: 'Minister who loses his faith and finds true love' },
      { name: 'Margrethe', description: 'Danish woman and Alex\'s love interest' },
      { name: 'Satan', description: 'The Devil, who is more reasonable than expected' },
      { name: 'Yahweh', description: 'God, portrayed as tyrannical' }
    ]
  },
  {
    id: 'the-cat-who-walks-through-walls',
    title: 'The Cat Who Walks Through Walls',
    year: 1985,
    type: 'novel',
    summary: 'A retired military officer living on a space station is drawn into a complex conspiracy involving time travel, artificial intelligence, and characters from other Heinlein novels.',
    characters: [
      { name: 'Colin Campbell', description: 'Retired colonel and writer' },
      { name: 'Gwendolyn Novak', description: 'Mysterious woman who involves Colin in her mission' },
      { name: 'Dr. Richard Ames', description: 'Colin\'s true identity' },
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
