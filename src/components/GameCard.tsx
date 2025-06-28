import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface GameCardProps {
  id: string;
  title: string;
  coverArt: string;
  description: string;
  releaseYear: number;
  genre: string;
  isFavorite?: boolean;
  onPlay?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
}

const GameCard = ({
  id = "game-1",
  title = "Super Mario Bros",
  coverArt = "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=400&q=80",
  description = "Jump and run through the Mushroom Kingdom in this classic platformer adventure.",
  releaseYear = 1985,
  genre = "Platformer",
  isFavorite = false,
  onPlay = () => {},
  onToggleFavorite = () => {},
}: GameCardProps) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      className="h-full w-full bg-background"
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="h-full overflow-hidden border-2 transition-all duration-300 hover:border-primary">
        <div className="relative h-full">
          {/* Cover Art */}
          <div className="relative h-[220px] overflow-hidden">
            <img
              src={coverArt}
              alt={`${title} cover`}
              className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
            />
            <div className="absolute right-2 top-2">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70"
                onClick={() => onToggleFavorite(id)}
              >
                <Heart
                  className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-white"}`}
                />
              </Button>
            </div>
          </div>

          {/* Game Info */}
          <CardContent className="flex h-[160px] flex-col p-4">
            <h3 className="mb-1 line-clamp-1 text-lg font-bold">{title}</h3>
            <div className="mb-2 flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {releaseYear}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {genre}
              </Badge>
            </div>
            <p className="line-clamp-3 flex-grow text-sm text-muted-foreground">
              {description}
            </p>
            <div className="mt-3">
              <Button className="w-full gap-2" onClick={() => onPlay(id)}>
                <Play className="h-4 w-4" /> Play Game
              </Button>
            </div>
          </CardContent>

          {/* Hover Overlay */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-black/70 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col items-center space-y-4 text-center">
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <p className="text-sm text-gray-200">{description}</p>
                <Button className="gap-2" onClick={() => onPlay(id)}>
                  <Play className="h-4 w-4" /> Play Now
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default GameCard;
