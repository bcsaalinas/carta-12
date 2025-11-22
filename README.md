# Carta 12 — sitio experimental

Experiencia web para el concepto gastronómico mensual de Carta 12. Incluye landing animada, menú dinámico y concierge asistido por Gemini para dudas y reservas.

## Stack
- React + TypeScript (Vite)
- GSAP para animaciones
- Tailwind (CDN) para estilos utilitarios

## Requisitos
- Node.js 18+
- Llave de API de Gemini (`GEMINI_API_KEY`)

## Cómo correrlo
1) Instala dependencias: `npm install`  
2) Crea `.env.local` con `GEMINI_API_KEY=tu_token`  
3) Arranca en modo dev: `npm run dev`  
4) Build de producción (salida en `dist/`): `npm run build`

## Estructura rápida
- `constants.ts`: datos del volumen actual y menú.
- `components/`: hero, concepto, menú, concierge, loader, navbar y footer.
- `services/geminiService.ts`: llamada al modelo para el concierge.
- `types.ts`: tipos compartidos para platillos, conceptos y mensajes.

## Notas
- Animaciones basadas en GSAP y ScrollTrigger; muchas dependen de breakpoints desktop.
- El concierge requiere la variable `GEMINI_API_KEY` para responder. Sin ella, solo se verá el saludo inicial.
