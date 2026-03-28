# Clock App

Modern, modular clock suite built with Next.js App Router, TypeScript, and Tailwind CSS.

## Features

- Full-screen digital clock with:
  - 12h/24h toggle
  - Show/hide seconds
  - Show/hide date
  - Animated blinking colon
  - Multiple visual styles (classic, split, segmented, thin)
- SVG analog clock with configurable dial, numerals, ticks, and second hand
- Flip clock style module with animated cards
- World clock:
  - Add/remove cities
  - Search timezone list
  - Interactive map panel with selected-country time/offset details
- Timer module:
  - HH:MM:SS input
  - Start/Pause/Reset
  - Progress ring
  - Countdown-to-target datetime
- Stopwatch module:
  - Millisecond precision
  - Lap tracking
- Floating settings drawer:
  - Theme selector
  - Clock style selector
  - Time format and visibility toggles
  - Analog-specific controls
- Keyboard shortcuts:
  - T → Timer
  - S → Stopwatch
  - W → World Clock
- Fullscreen toggle
- PWA basics:
  - Manifest
  - Service worker registration
  - Offline-first cache strategy

## Routes

- /clock
- /world
- /timer
- /stopwatch
- /settings

## Development

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Production build

```bash
npm run build
npm run start
```
