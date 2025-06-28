import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Console {
  id: string;
  name: string;
  logo: string;
  gradient: string;
  route: string;
}

interface ConsoleGridProps {
  consoles?: Console[];
}

const ConsoleGrid = ({ consoles = defaultConsoles }: ConsoleGridProps) => {
  const navigate = useNavigate();

  const handleConsoleClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-background">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Choose Your Console
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {consoles.map((console) => (
          <motion.div
            key={console.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card
              className="cursor-pointer overflow-hidden h-64 border-0 shadow-lg"
              style={{ background: console.gradient }}
              onClick={() => handleConsoleClick(console.route)}
            >
              <CardContent className="flex flex-col items-center justify-center h-full p-6 relative">
                <img
                  src={console.logo}
                  alt={`${console.name} logo`}
                  className="h-24 mb-4 object-contain"
                />
                <h3 className="text-2xl font-bold text-white mb-2">
                  {console.name}
                </h3>
                <div className="flex items-center mt-4 text-white/80">
                  <span className="mr-1">Browse Games</span>
                  <ChevronRight size={18} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const defaultConsoles: Console[] = [
  {
    id: "wii",
    name: "Nintendo Wii",
    logo: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80",
    gradient: "linear-gradient(135deg, #3b82f6, #2563eb)",
    route: "/library/wii",
  },
  {
    id: "nintendo",
    name: "Nintendo NES",
    logo: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80",
    gradient: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
    route: "/library/nintendo",
  },
  {
    id: "sega",
    name: "Sega Genesis",
    logo: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80",
    gradient: "linear-gradient(135deg, #10b981, #059669)",
    route: "/library/sega",
  },
];

export default ConsoleGrid;
