import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Award, BookOpen, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

        {/* Legacy Section */}
        <section className="bg-muted/30 rounded-lg p-8">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
            Legacy
          </h2>
          <p className="text-foreground/80 leading-relaxed mb-4">
            Heinlein\'s influence on science fiction cannot be overstated. He helped elevate the genre from pulp entertainment to serious literature, introducing complex themes and sophisticated storytelling. His works anticipated technological developments including water beds, mobile phones, and the internet.
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
