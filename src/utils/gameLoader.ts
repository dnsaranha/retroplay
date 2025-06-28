// Game loader utility for handling ROM files

export interface GameROM {
  id: string;
  title: string;
  console: string;
  filename: string;
  path: string;
  size?: number;
}

// Game file extensions by console
export const SUPPORTED_EXTENSIONS = {
  nintendo: [".nes"],
  sega: [".smd", ".bin"],
  wii: [".wbfs", ".iso"],
} as const;

// Load game ROM from the games directory
export const loadGameROM = async (
  console: string,
  filename: string,
): Promise<ArrayBuffer | null> => {
  try {
    const gamePath = `/games/${console}/${filename}`;
    const response = await fetch(gamePath);

    if (!response.ok) {
      console.error(`Failed to load game ROM: ${gamePath}`);
      return null;
    }

    return await response.arrayBuffer();
  } catch (error) {
    console.error("Error loading game ROM:", error);
    return null;
  }
};

// Check if a game ROM exists
export const checkGameExists = async (
  console: string,
  filename: string,
): Promise<boolean> => {
  try {
    const gamePath = `/games/${console}/${filename}`;
    const response = await fetch(gamePath, { method: "HEAD" });
    return response.ok;
  } catch {
    return false;
  }
};

// Get game ROM URL for direct access
export const getGameROMUrl = (console: string, filename: string): string => {
  return `/games/${console}/${filename}`;
};

// Validate file extension for console
export const isValidGameFile = (console: string, filename: string): boolean => {
  const extensions =
    SUPPORTED_EXTENSIONS[console as keyof typeof SUPPORTED_EXTENSIONS];
  if (!extensions) return false;

  const fileExt = filename.toLowerCase().substring(filename.lastIndexOf("."));
  return extensions.includes(fileExt as any);
};

// Parse game filename to extract title
export const parseGameTitle = (filename: string): string => {
  // Remove extension and replace hyphens/underscores with spaces
  const nameWithoutExt = filename.substring(0, filename.lastIndexOf("."));
  return nameWithoutExt
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
};
