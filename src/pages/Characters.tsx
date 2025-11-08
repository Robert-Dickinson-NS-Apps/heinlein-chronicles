import { useState, useMemo } from 'react';
import { heinleinWorks, Character } from '@/data/heinleinWorks';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface CharacterWithWorks extends Character {
  works: Array<{ id: string; title: string; year: number }>;
}

const Characters = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const allCharacters = useMemo(() => {
    const characterMap = new Map<string, CharacterWithWorks>();

    heinleinWorks.forEach((work) => {
      work.characters.forEach((character) => {
        const existing = characterMap.get(character.name);
        if (existing) {
          existing.works.push({ id: work.id, title: work.title, year: work.year });
        } else {
          characterMap.set(character.name, {
            ...character,
            works: [{ id: work.id, title: work.title, year: work.year }],
          });
        }
      });
    });

    return Array.from(characterMap.values()).sort((a, b) => 
      a.name.localeCompare(b.name)
    );
  }, []);

  const filteredCharacters = useMemo(() => {
    return allCharacters.filter(
      (character) =>
        character.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        character.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        character.works.some((work) =>
          work.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
  }, [searchQuery, allCharacters]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Works
          </Button>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-2">
            Character Database
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore all characters from Heinlein's literary universe
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border pb-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search characters by name, description, or work..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            {filteredCharacters.length} {filteredCharacters.length === 1 ? 'character' : 'characters'} found
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCharacters.map((character, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                {character.name}
              </h3>
              <p className="text-sm text-foreground/80 mb-4 leading-relaxed">
                {character.description}
              </p>
              <div className="border-t border-border pt-4">
                <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                  Appears in:
                </p>
                <div className="flex flex-wrap gap-2">
                  {character.works
                    .sort((a, b) => a.year - b.year)
                    .map((work) => (
                      <Badge
                        key={work.id}
                        variant="secondary"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                        onClick={() => navigate(`/?work=${work.id}`)}
                      >
                        {work.title} ({work.year})
                      </Badge>
                    ))}
                </div>
                {character.works.length > 1 && (
                  <p className="text-xs text-muted-foreground mt-3 italic">
                    Recurring character across {character.works.length} works
                  </p>
                )}
              </div>
            </Card>
          ))}
        </div>

        {filteredCharacters.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No characters found matching your search.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Characters;
