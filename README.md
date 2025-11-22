# Carta 12 — experimental site

Animated landing for the monthly Carta 12 food concept. Includes hero/concept sections, a live menu, and a Gemini-powered concierge for questions and bookings.

## Stack
- React + TypeScript (Vite)
- GSAP for animation
- Tailwind (CDN) utilities

## Requirements
- Node.js 18+
- Gemini API key (`GEMINI_API_KEY`)

## Run it
1) Install deps: `npm install`  
2) Create `.env.local` with `GEMINI_API_KEY=your_token`  
3) Start dev server: `npm run dev`  
4) Build for prod (`dist/`): `npm run build`

## Quick map
- `constants.ts`: current volume data and menu.
- `components/`: hero, concept, menu, concierge, loader, navbar, footer.
- `services/geminiService.ts`: concierge call to the model.
- `types.ts`: shared types for dishes, concepts, and messages.

## Notes
- GSAP + ScrollTrigger drive most motion; some effects are desktop-only.
- Concierge replies need `GEMINI_API_KEY`. Without it, you only see the initial greeting.
