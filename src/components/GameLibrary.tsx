import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Search, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import GameCard from "./GameCard";
import {
  checkGameExists,
  getGameROMUrl,
  parseGameTitle,
} from "@/utils/gameLoader";

interface Game {
  id: string;
  title: string;
  coverArt: string;
  description: string;
  releaseYear: number;
  genre: string;
  isFavorite: boolean;
  console: string;
}

interface GameLibraryProps {
  selectedConsole?: string;
  games?: Game[];
}

const GameLibrary = ({
  selectedConsole = "Nintendo",
  games = [],
}: GameLibraryProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  // Default games if none provided
  const defaultGames: Game[] = [
    {
      id: "1",
      title: "Super Mario Bros",
      coverArt:
        "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=300&q=80",
      description:
        "Jump and run through the Mushroom Kingdom to save Princess Peach from Bowser.",
      releaseYear: 1985,
      genre: "Platformer",
      isFavorite: true,
      console: "Nintendo",
    },
    {
      id: "2",
      title: "The Legend of Zelda",
      coverArt:
        "https://images.unsplash.com/photo-1642068221395-c8d57196e30a?w=300&q=80",
      description:
        "Embark on an epic adventure to save Princess Zelda and defeat Ganon.",
      releaseYear: 1986,
      genre: "Action-Adventure",
      isFavorite: false,
      console: "Nintendo",
    },
    {
      id: "3",
      title: "Sonic the Hedgehog",
      coverArt:
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&q=80",
      description:
        "Speed through levels as Sonic to defeat Dr. Robotnik and save the animals.",
      releaseYear: 1991,
      genre: "Platformer",
      isFavorite: true,
      console: "Sega",
    },
    {
      id: "4",
      title: "Donkey Kong Country",
      coverArt:
        "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=300&q=80",
      description:
        "Help Donkey Kong and Diddy Kong recover their stolen banana hoard from King K. Rool.",
      releaseYear: 1994,
      genre: "Platformer",
      isFavorite: false,
      console: "Nintendo",
    },
    {
      id: "5",
      title: "Super Mario Galaxy",
      coverArt:
        "https://images.unsplash.com/photo-1614469723922-c043ad9fd036?w=300&q=80",
      description:
        "Explore galaxies and collect Power Stars to rescue Princess Peach from Bowser.",
      releaseYear: 2007,
      genre: "3D Platformer",
      isFavorite: true,
      console: "Wii",
    },
    {
      id: "6",
      title: "Metroid Prime",
      coverArt:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&q=80",
      description:
        "Explore the planet Tallon IV as Samus Aran and stop the Space Pirates.",
      releaseYear: 2002,
      genre: "Action-Adventure",
      isFavorite: false,
      console: "Nintendo",
    },
  ];

  const displayGames = games.length > 0 ? games : defaultGames;

  // Filter games based on search, genre, console, and active tab
  const filteredGames = displayGames.filter((game) => {
    const matchesSearch =
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre =
      selectedGenre === "all" || game.genre === selectedGenre;
    const matchesConsole = game.console === selectedConsole;
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "favorites" && game.isFavorite) ||
      (activeTab === "recent" && true); // Assuming all games are recent for demo

    return matchesSearch && matchesGenre && matchesConsole && matchesTab;
  });

  // Extract unique genres for the filter dropdown
  const genres = ["all", ...new Set(displayGames.map((game) => game.genre))];

  const handleToggleFavorite = (gameId: string) => {
    // This would be implemented with state management in a real app
    console.log(`Toggle favorite for game ${gameId}`);
  };

  const handlePlayGame = async (gameId: string) => {
    const game = filteredGames.find((g) => g.id === gameId);
    if (!game) return;

    // Check if ROM file exists
    const romFilename = `${game.title.toLowerCase().replace(/\s+/g, "-")}.${getFileExtension(selectedConsole)}`;
    const romExists = await checkGameExists(
      selectedConsole.toLowerCase(),
      romFilename,
    );

    if (romExists) {
      const romUrl = getGameROMUrl(selectedConsole.toLowerCase(), romFilename);
      console.log(`Loading game ROM: ${romUrl}`);
      // This would navigate to the game emulator with the ROM URL
    } else {
      console.log(
        `ROM file not found for ${game.title}. Please add the ROM file to public/games/${selectedConsole.toLowerCase()}/`,
      );
      alert(
        `ROM file not found for ${game.title}. Please add the ROM file to the games directory.`,
      );
    }
  };

  const getFileExtension = (console: string): string => {
    switch (console.toLowerCase()) {
      case "nintendo":
        return "nes";
      case "sega":
        return "smd";
      case "wii":
        return "wbfs";
      default:
        return "rom";
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-background">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold">{selectedConsole} Games</h1>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => {
                alert(
                  `To add games:\n1. Place ROM files in public/games/${selectedConsole.toLowerCase()}/\n2. Supported formats: ${getFileExtension(selectedConsole).toUpperCase()}\n3. Refresh the page`,
                );
              }}
            >
              <Upload className="h-4 w-4" />
              Add Games
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>

            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre.charAt(0).toUpperCase() + genre.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs
          defaultValue="all"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="all">All Games</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="recent">Recently Played</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGames.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onToggleFavorite={() => handleToggleFavorite(game.id)}
                  onPlay={() => handlePlayGame(game.id)}
                />
              ))}
            </div>
            {filteredGames.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No games found. Try adjusting your filters.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="favorites" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGames.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onToggleFavorite={() => handleToggleFavorite(game.id)}
                  onPlay={() => handlePlayGame(game.id)}
                />
              ))}
            </div>
            {filteredGames.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No favorite games found.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="recent" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGames.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onToggleFavorite={() => handleToggleFavorite(game.id)}
                  onPlay={() => handlePlayGame(game.id)}
                />
              ))}
            </div>
            {filteredGames.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No recently played games.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GameLibrary;
