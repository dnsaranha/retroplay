# Games Directory

This directory is for storing game ROM files that the emulator can read.

## Structure

```
games/
├── nintendo/
│   ├── super-mario-bros.nes
│   ├── zelda.nes
│   └── ...
├── sega/
│   ├── sonic.smd
│   ├── streets-of-rage.smd
│   └── ...
├── wii/
│   ├── mario-galaxy.wbfs
│   ├── metroid-prime.wbfs
│   └── ...
└── README.md
```

## Supported Formats

- **Nintendo NES**: .nes files
- **Sega Genesis**: .smd, .bin files
- **Nintendo Wii**: .wbfs, .iso files

## Adding Games

1. Place ROM files in the appropriate console folder
2. Use descriptive filenames (e.g., `super-mario-bros.nes`)
3. Ensure files are legally obtained

## Important Notes

- This directory is ignored by Git to prevent large ROM files from being committed
- Only add games you legally own
- ROM files can be large, so consider storage space
