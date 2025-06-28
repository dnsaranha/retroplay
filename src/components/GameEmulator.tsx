import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Heart,
  Settings,
  X,
  Pause,
  Play,
  Volume2,
  VolumeX,
  Fullscreen,
  Minimize,
} from "lucide-react";
import { loadGameROM } from "@/utils/gameLoader";

interface GameEmulatorProps {
  gameTitle?: string;
  gameConsole?: string;
  gameRomUrl?: string;
  gameRomFilename?: string;
  gameCoverArt?: string;
  onExit?: () => void;
}

const GameEmulator = ({
  gameTitle = "Super Mario Bros",
  gameConsole = "Nintendo",
  gameRomUrl = "",
  gameRomFilename = "super-mario-bros.nes",
  gameCoverArt = "https://images.unsplash.com/photo-1612404730960-5c71577fca11?w=800&q=80",
  onExit = () => {},
}: GameEmulatorProps) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [volume, setVolume] = useState([50]);
  const [showSettings, setShowSettings] = useState(false);
  const [gameROM, setGameROM] = useState<ArrayBuffer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load game ROM on component mount
  React.useEffect(() => {
    const loadROM = async () => {
      if (gameRomUrl) {
        try {
          const response = await fetch(gameRomUrl);
          const romData = await response.arrayBuffer();
          setGameROM(romData);
        } catch (error) {
          console.error("Failed to load ROM from URL:", error);
        }
      } else if (gameRomFilename) {
        const romData = await loadGameROM(
          gameConsole.toLowerCase(),
          gameRomFilename,
        );
        setGameROM(romData);
      }
      setIsLoading(false);
    };

    loadROM();
  }, [gameRomUrl, gameRomFilename, gameConsole]);

  const togglePause = () => setIsPaused(!isPaused);
  const toggleMute = () => setIsMuted(!isMuted);
  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);
  const toggleFavorite = () => setIsFavorite(!isFavorite);

  return (
    <div className="w-full h-full flex flex-col bg-gray-900">
      {/* Top Menu Bar */}
      <div className="flex justify-between items-center p-3 bg-gray-800 text-white z-10">
        <div className="flex items-center space-x-2">
          <span className="font-bold">{gameTitle}</span>
          <span className="text-xs text-gray-400">({gameConsole})</span>
        </div>

        <div className="flex items-center space-x-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleFavorite}
                  className={isFavorite ? "text-red-500" : "text-gray-400"}
                >
                  <Heart
                    className={isFavorite ? "fill-red-500" : ""}
                    size={20}
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {isFavorite ? "Remove from favorites" : "Add to favorites"}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSettings(true)}
                >
                  <Settings size={20} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={onExit}>
                  <X size={20} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Exit game</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Game Canvas */}
      <div className="relative flex-grow flex items-center justify-center bg-black">
        {isPaused && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-20">
            <div className="text-white text-center">
              <h2 className="text-2xl font-bold mb-4">Game Paused</h2>
              <Button onClick={togglePause}>Resume</Button>
            </div>
          </div>
        )}

        {/* This would be replaced with the actual emulator canvas */}
        <div className="relative w-full h-full max-w-4xl max-h-[70vh] flex items-center justify-center">
          <img
            src={gameCoverArt}
            alt={gameTitle}
            className="w-full h-full object-contain opacity-20"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            {isLoading ? (
              <p className="text-white text-xl">Loading ROM...</p>
            ) : gameROM ? (
              <div className="text-center">
                <p className="text-white text-xl mb-2">
                  ROM Loaded ({Math.round(gameROM.byteLength / 1024)} KB)
                </p>
                <p className="text-gray-400">
                  Emulator core would initialize here
                </p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-red-400 text-xl mb-2">ROM not found</p>
                <p className="text-gray-400 text-sm">
                  Add {gameRomFilename} to public/games/
                  {gameConsole.toLowerCase()}/
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="p-3 bg-gray-800 text-white flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" onClick={togglePause}>
            {isPaused ? <Play size={20} /> : <Pause size={20} />}
          </Button>

          <Button variant="ghost" size="icon" onClick={toggleMute}>
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </Button>

          <div className="w-32 hidden sm:block">
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              step={1}
              disabled={isMuted}
            />
          </div>
        </div>

        <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
          {isFullscreen ? <Minimize size={20} /> : <Fullscreen size={20} />}
        </Button>
      </div>

      {/* Virtual Controls - Responsive for mobile/touch */}
      <div className="fixed bottom-20 left-0 right-0 flex justify-center md:hidden z-10 opacity-70 hover:opacity-100 transition-opacity">
        <div className="grid grid-cols-3 gap-4">
          {/* D-Pad */}
          <div className="col-span-1 grid grid-cols-3 grid-rows-3 gap-1">
            <div className="col-start-2 row-start-1">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-gray-700 w-12 h-12"
              >
                ↑
              </Button>
            </div>
            <div className="col-start-1 row-start-2">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-gray-700 w-12 h-12"
              >
                ←
              </Button>
            </div>
            <div className="col-start-3 row-start-2">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-gray-700 w-12 h-12"
              >
                →
              </Button>
            </div>
            <div className="col-start-2 row-start-3">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-gray-700 w-12 h-12"
              >
                ↓
              </Button>
            </div>
          </div>

          {/* Center buttons */}
          <div className="col-span-1 flex items-center justify-center space-x-2">
            <Button variant="outline" size="sm" className="bg-gray-700">
              SELECT
            </Button>
            <Button variant="outline" size="sm" className="bg-gray-700">
              START
            </Button>
          </div>

          {/* Action buttons */}
          <div className="col-span-1 grid grid-cols-2 grid-rows-2 gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-blue-600 w-12 h-12"
            >
              B
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-green-600 w-12 h-12"
            >
              A
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-yellow-600 w-12 h-12"
            >
              Y
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-red-600 w-12 h-12"
            >
              X
            </Button>
          </div>
        </div>
      </div>

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Game Settings</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <span>Sound Volume</span>
              <div className="w-48">
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Display Options</h3>
              <Card className="p-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Filter Mode</span>
                    <select className="bg-gray-800 rounded p-1">
                      <option>Nearest</option>
                      <option>Linear</option>
                      <option>CRT Effect</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Aspect Ratio</span>
                    <select className="bg-gray-800 rounded p-1">
                      <option>Original</option>
                      <option>16:9</option>
                      <option>4:3</option>
                      <option>Stretch</option>
                    </select>
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Controller Settings</h3>
              <Card className="p-3">
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full">
                    Configure Keyboard
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    Configure Gamepad
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GameEmulator;
