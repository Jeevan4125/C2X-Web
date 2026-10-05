# C2X — Official Website (Phase 1)

The Next Generation AI-Powered Collaborative Cloud IDE — marketing website, Phase 1.

## Scope delivered

- Enterprise-grade project architecture (`src/app`, `components`, `layouts`, `pages`, `hooks`, `animations`, `styles`, `types`, `utils`)
- React Router with the Home route fully implemented and all Phase 2 routes wired to a placeholder page (`/features`, `/ai-assistant`, `/collaboration`, `/extensions`, `/themes`, `/download`, `/pricing`, `/enterprise`, `/docs`, `/blog`, `/support`, `/about`, `/careers`, `/privacy`, `/terms`)
- Main layout with sticky Navbar, animated route transitions, and Footer
- Complete homepage: Hero (with animated VS Code–style editor showcase), AI Assistant chat demo, Features grid, Collaboration panel, Performance counters, Language Support grid, Screenshot carousel (SwiperJS), Pricing preview, FAQ accordion

## Tech stack

React 19 · TypeScript · Vite · React Router 6 · Tailwind CSS · SCSS Modules · Framer Motion · GSAP (+ ScrollTrigger) · Lenis · Lucide React · SwiperJS

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (default `http://localhost:5173`).

### Build

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  app/            router.tsx, providers.tsx (Lenis + BrowserRouter)
  components/
    common/       Button, Container, SectionTitle
    navbar/       Navbar
    footer/       Footer
    editor/       CodeEditor, EditorTabs, Sidebar, Terminal, StatusBar
    home/         Hero, AIShowcase, Features, Collaboration, Performance,
                   LanguageSupport, Screenshots, PricingPreview, FAQPreview
  layouts/        MainLayout
  pages/
    Home/         Home.tsx
    ComingSoon.tsx  (Phase 2 route placeholder)
  hooks/          useTypingEffect, useScrollAnimation
  animations/     motion.ts (Framer Motion variants), gsap.ts (counter/reveal helpers)
  styles/         globals.scss, variables.scss, typography.scss
  types/          index.ts
  utils/          helpers.ts
```

## Design system

| Token       | Value     |
|-------------|-----------|
| Background  | `#09090B` |
| Surface     | `#111111` |
| Panel       | `#181818` |
| Border      | `#2A2A2A` |
| Text        | `#FFFFFF` |
| Text (dim)  | `#A1A1AA` |
| Accent      | `#007ACC` |

No glow effects, no neon gradients, no heavy glassmorphism — a restrained, VS Code–inspired dark professional UI.

## Notes

- All content is realistic (no lorem ipsum placeholders).
- Phase 2 pages are intentionally not built — routes render a lightweight "coming soon" placeholder that reuses the Phase 1 layout.
- Dependencies could not be installed or build-verified in the sandbox this project was authored in (no network/registry access). Please run `npm install` locally before `npm run dev`.
