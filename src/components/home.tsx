import React from "react";
import { motion } from "framer-motion";
import { Search, User, Heart, Clock, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import ConsoleGrid from "./ConsoleGrid";
import GameLibrary from "./GameLibrary";

const Home = () => {
  // Mock state for active section
  const [activeSection, setActiveSection] = React.useState("consoles");
  const [activeConsole, setActiveConsole] = React.useState<string | null>(null);

  const handleConsoleSelect = (console: string) => {
    setActiveConsole(console);
    setActiveSection("library");
  };

  const handleBackToConsoles = () => {
    setActiveConsole(null);
    setActiveSection("consoles");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold">R</span>
              </div>
            </motion.div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              RetroPlay
            </h1>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <div className="relative w-64">
              <Input
                type="text"
                placeholder="Search games..."
                className="bg-gray-800 border-gray-700 focus:border-purple-500 pl-10"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            <nav className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-white"
              >
                <Heart className="h-5 w-5 mr-1" />
                <span>Favorites</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-white"
              >
                <Clock className="h-5 w-5 mr-1" />
                <span>History</span>
              </Button>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5 text-gray-300" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-gray-800 border-gray-700"
              >
                <User className="h-4 w-4 mr-2" />
                <span>Sign In</span>
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {activeSection === "consoles" ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12 text-center"
            >
              <h2 className="text-4xl font-bold mb-4">
                Play Classic Games in Your Browser
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Experience the nostalgia of retro gaming with our collection of
                classic console games. No downloads required, just select a
                console and start playing instantly.
              </p>
            </motion.div>

            <ConsoleGrid onConsoleSelect={handleConsoleSelect} />
          </>
        ) : (
          <GameLibrary
            console={activeConsole || "nintendo"}
            onBack={handleBackToConsoles}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} RetroPlay. All rights
                reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm">
                About
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">
                Terms
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
