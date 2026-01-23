import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Award, BookOpen, Star, Compass, Lightbulb, BookMarked, Rocket, Users, Brain, Swords, Heart } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { allWorks } from '@/data/heinleinWorks';

const Biography = () => {
  const navigate = useNavigate();

  const timelineEvents = [
    { year: 1907, event: 'Born in Butler, Missouri on July 7' },
    { year: 1925, event: 'Entered U.S. Naval Academy at Annapolis' },
    { year: 1929, event: 'Graduated from Naval Academy' },
    { year: 1934, event: 'Discharged from Navy due to tuberculosis' },
    { year: 1939, event: 'First published story "Life-Line" in Astounding Science Fiction' },
    { year: 1947, event: 'Began writing juvenile science fiction novels' },
    { year: 1956, event: 'Won first Hugo Award for Double Star' },
    { year: 1959, event: 'Starship Troopers published, won Hugo Award' },
    { year: 1961, event: 'Stranger in a Strange Land published, became cultural phenomenon' },
    { year: 1966, event: 'The Moon Is a Harsh Mistress published, won Hugo Award' },
    { year: 1973, event: 'Time Enough for Love published' },
    { year: 1975, event: 'Named the first Science Fiction Grand Master by SFWA' },
    { year: 1988, event: 'Passed away on May 8 in Carmel, California' },
  ];

  const awards = [
    { name: 'Hugo Award for Best Novel', year: 1956, work: 'Double Star' },
    { name: 'Hugo Award for Best Novel', year: 1960, work: 'Starship Troopers' },
    { name: 'Hugo Award for Best Novel', year: 1962, work: 'Stranger in a Strange Land' },
    { name: 'Hugo Award for Best Novel', year: 1967, work: 'The Moon Is a Harsh Mistress' },
    { name: 'Science Fiction Grand Master', year: 1975, work: 'Lifetime Achievement' },
  ];

  const influence = [
    {
      title: 'The Big Three of Science Fiction',
      description: 'Along with Isaac Asimov and Arthur C. Clarke, Heinlein formed the "Big Three" of science fiction writers who dominated the genre\'s Golden Age.',
    },
    {
      title: 'Military Science Fiction Pioneer',
      description: 'Starship Troopers established the military science fiction subgenre, influencing countless works including films, games, and novels.',
    },
    {
      title: 'Counterculture Icon',
      description: 'Stranger in a Strange Land became a bible for the 1960s counterculture movement, introducing concepts like "grok" into popular vocabulary.',
    },
    {
      title: 'Libertarian Philosophy',
      description: 'The Moon Is a Harsh Mistress popularized libertarian and anarchist political philosophy in science fiction.',
    },
    {
      title: 'Hard Science Fiction',
      description: 'Pioneered scientifically accurate space travel stories, inspiring real scientists and engineers.',
    },
    {
      title: 'Genre Innovation',
      description: 'Experimented with narrative structures, themes, and controversial social commentary that expanded what science fiction could explore.',
    },
  ];

  const readingPathways = [
    {
      id: 'newcomers',
      title: 'Best Starting Points',
      icon: Compass,
      description: 'New to Heinlein? Start here with his most accessible and acclaimed works.',
      works: ['the-moon-is-a-harsh-mistress', 'the-door-into-summer', 'double-star', 'have-space-suit-will-travel'],
      color: 'text-emerald-500'
    },
    {
      id: 'young-adult',
      title: 'Young Adult Adventures',
      icon: Rocket,
      description: 'The "Heinlein Juveniles" - thrilling space adventures with teenage protagonists.',
      works: ['have-space-suit-will-travel', 'citizen-of-the-galaxy', 'tunnel-in-the-sky', 'starman-jones'],
      color: 'text-blue-500'
    },
    {
      id: 'philosophy',
      title: 'Philosophical Deep Dives',
      icon: Brain,
      description: 'Explore complex ideas about society, religion, freedom, and human nature.',
      works: ['stranger-in-a-strange-land', 'the-moon-is-a-harsh-mistress', 'time-enough-love', 'job-a-comedy-of-justice'],
      color: 'text-purple-500'
    },
    {
      id: 'military',
      title: 'Military & Action',
      icon: Swords,
      description: 'Combat, duty, and honor in humanity\'s expansion across the stars.',
      works: ['starship-troopers', 'the-puppet-masters', 'between-planets', 'space-cadet'],
      color: 'text-red-500'
    },
    {
      id: 'time-travel',
      title: 'Time Travel Tales',
      icon: BookMarked,
      description: 'Mind-bending temporal paradoxes and journeys through time.',
      works: ['the-door-into-summer', 'all-you-zombies', 'by-his-bootstraps', 'time-enough-love'],
      color: 'text-amber-500'
    },
    {
      id: 'romance',
      title: 'Romance & Relationships',
      icon: Heart,
      description: 'Love stories set against extraordinary circumstances.',
      works: ['the-door-into-summer', 'friday', 'glory-road', 'i-will-fear-no-evil'],
      color: 'text-pink-500'
    }
  ];

  const majorThemes = [
    {
      theme: 'Individual Freedom',
      description: 'The paramount importance of personal liberty and self-determination against societal constraints.',
      icon: '🗽'
    },
    {
      theme: 'Competent Person',
      description: '"A human being should be able to change a diaper, plan an invasion, butcher a hog, conn a ship..." - the ideal of human versatility.',
      icon: '🛠️'
    },
    {
      theme: 'Social Responsibility',
      description: 'The tension between individual rights and duties to society, explored especially in military contexts.',
      icon: '⚖️'
    },
    {
      theme: 'Sexual Liberation',
      description: 'Challenging conventional attitudes toward sex, marriage, and family structures.',
      icon: '💫'
    },
    {
      theme: 'Revolution & Reform',
      description: 'When and how to resist unjust authority, from peaceful protest to armed rebellion.',
      icon: '🔥'
    },
    {
      theme: 'Human Potential',
      description: 'Longevity, psychic powers, and the evolution of human capabilities beyond current limits.',
      icon: '🧬'
    }
  ];
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" onClick={() => navigate('/')} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Works
          </Button>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-2">
            Robert A. Heinlein
          </h1>
          <p className="text-lg text-muted-foreground">
            1907-1988 • American Science Fiction Writer • Grand Master
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Biography Section */}
        <section>
          <h2 className="font-serif text-3xl font-bold text-foreground mb-6 flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-primary" />
            Life & Career
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-foreground/80 leading-relaxed mb-4">
              Robert Anson Heinlein was one of the most influential and controversial authors in the science fiction genre. Often called the "dean of science fiction writers," he was a prolific author who pushed the boundaries of the genre and explored complex political, social, and philosophical themes.
            </p>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Born in Butler, Missouri in 1907, Heinlein graduated from the U.S. Naval Academy in 1929. His naval career was cut short by tuberculosis in 1934, leading him to pursue various occupations before turning to writing in 1939.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              His first story, "Life-Line," was published in Astounding Science Fiction in 1939, beginning a career that would span nearly 50 years and produce dozens of novels and short stories. Heinlein\'s work ranged from juvenile adventures to adult novels exploring sexuality, religion, and politics. He died in 1988, leaving behind a legacy that continues to influence science fiction writers and readers today.
            </p>
          </div>
        </section>

        {/* Timeline Section */}
        <section>
          <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
            Life Timeline
          </h2>
          <div className="relative border-l-2 border-primary/30 ml-4">
            {timelineEvents.map((event, index) => (
              <div key={index} className="mb-8 ml-8 relative">
                <div className="absolute -left-[2.65rem] w-5 h-5 bg-primary rounded-full border-4 border-background"></div>
                <div className="flex items-baseline gap-4 mb-2">
                  <Badge variant="secondary" className="text-sm font-bold">
                    {event.year}
                  </Badge>
                </div>
                <p className="text-foreground/80">{event.event}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Awards Section */}
        <section>
          <h2 className="font-serif text-3xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Award className="h-8 w-8 text-primary" />
            Major Awards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {awards.map((award, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <Star className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-serif text-xl font-bold text-foreground mb-1">
                      {award.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">{award.year}</p>
                    <p className="text-foreground/80 italic">{award.work}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Influence Section */}
        <section>
          <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
            Influence on Science Fiction
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {influence.map((item, index) => (
              <Card key={index} className="p-6">
                <h3 className="font-serif text-lg font-bold text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Major Themes Section */}
        <section>
          <h2 className="font-serif text-3xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Lightbulb className="h-8 w-8 text-primary" />
            Major Themes in His Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {majorThemes.map((item, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-foreground mb-2">
                      {item.theme}
                    </h3>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Reading Pathways Section */}
        <section>
          <h2 className="font-serif text-3xl font-bold text-foreground mb-3 flex items-center gap-2">
            <Compass className="h-8 w-8 text-primary" />
            Reading Pathways for Newcomers
          </h2>
          <p className="text-muted-foreground mb-8 max-w-3xl">
            Not sure where to start? Choose a pathway based on your interests. Each path offers a curated selection of works that showcase different aspects of Heinlein's genius.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {readingPathways.map((pathway) => {
              const PathwayIcon = pathway.icon;
              const pathwayWorks = pathway.works
                .map(id => allWorks.find(w => w.id === id))
                .filter(Boolean);
              
              return (
                <Card key={pathway.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                      <PathwayIcon className={`h-5 w-5 ${pathway.color}`} />
                      {pathway.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{pathway.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {pathwayWorks.map((work, idx) => work && (
                        <Link 
                          key={work.id} 
                          to={`/work/${work.id}`}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors group"
                        >
                          <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                            {idx + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors truncate">
                              {work.title}
                            </p>
                            <p className="text-xs text-muted-foreground">{work.year}</p>
                          </div>
                          {work.coverImage && (
                            <div className="w-8 h-12 rounded overflow-hidden flex-shrink-0">
                              <img 
                                src={work.coverImage} 
                                alt={work.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Essential Reading Section */}
        <section className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-8">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-6 flex items-center gap-2">
            <BookMarked className="h-8 w-8 text-primary" />
            The Essential Five
          </h2>
          <p className="text-muted-foreground mb-8 max-w-3xl">
            If you only read five Heinlein books, these represent the breadth and depth of his work. Each won or was nominated for major awards and remains influential today.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {['the-moon-is-a-harsh-mistress', 'stranger-in-a-strange-land', 'starship-troopers', 'the-door-into-summer', 'double-star'].map((id, idx) => {
              const work = allWorks.find(w => w.id === id);
              if (!work) return null;
              return (
                <Link 
                  key={id} 
                  to={`/work/${id}`}
                  className="group text-center"
                >
                  <div className="aspect-[2/3] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg overflow-hidden mb-3 shadow-lg group-hover:shadow-xl transition-all group-hover:scale-105">
                    {work.coverImage ? (
                      <img 
                        src={work.coverImage} 
                        alt={work.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center p-4">
                        <span className="font-serif text-sm text-foreground/60 text-center">
                          {work.title}
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {work.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{work.year}</p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Legacy Section */}
        <section className="bg-muted/30 rounded-lg p-8">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
            Legacy
          </h2>
          <p className="text-foreground/80 leading-relaxed mb-4">
            Heinlein's influence on science fiction cannot be overstated. He helped elevate the genre from pulp entertainment to serious literature, introducing complex themes and sophisticated storytelling. His works anticipated technological developments including water beds, mobile phones, and the internet.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            Beyond his technical predictions, Heinlein challenged readers to think critically about politics, religion, sexuality, and social structures. While some of his views were controversial even in his time, his willingness to explore difficult topics opened doors for future science fiction writers to tackle complex social issues.
          </p>
        </section>
      </main>
    </div>
  );
};

export default Biography;
