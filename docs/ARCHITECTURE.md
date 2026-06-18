# Kitob Market Enterprise Architecture

## Product Scope

Kitob Market Enterprise is a multilingual bookstore marketplace and SaaS-style operations platform. It supports customer browsing, protected dashboards, admin management, role-aware actions, analytics, settings, and future API/database integration.

## Frontend Architecture

The application uses a feature-based Vite + React + TypeScript architecture:

- `src/app` contains providers, routing, i18n wiring, and cross-app hooks.
- `src/entities` contains domain models, local data, and typed API functions.
- `src/features` contains user-facing business capabilities such as auth, cart, and settings.
- `src/widgets` contains larger reusable interface blocks such as app shell and book cards.
- `src/pages` contains route-level screens.
- `src/shared` contains design-system primitives, utilities, and API infrastructure.

## UI System

The UI uses Tailwind CSS tokens backed by CSS variables for light and dark themes. Components use accessible focus states, semantic HTML, reduced-motion safeguards, lazy image loading, skeleton states, empty states, error states, confirmation dialogs, and toast notifications.

## Internationalization

Translations are stored in `src/app/i18n/translations.ts`. The selected language is persisted with Zustand. The architecture already stores page direction separately, so RTL languages can be added without restructuring routing or components.

## Security

Implemented security-oriented patterns:

- Protected routes for dashboard/admin/settings.
- Role and permission model in auth store.
- Permission-gated admin actions.
- Zod validation in API boundaries.
- Input sanitization for search strings.
- Confirmation dialogs for destructive actions.
- Environment variable pattern documented in `.env.example`.

Recommended production additions:

- Server-issued HTTP-only session cookies.
- CSRF tokens for mutating requests.
- CSP, HSTS, X-Frame-Options, and Referrer-Policy headers at the edge.
- Central audit log storage.
- Supabase RLS or PostgreSQL row-level authorization policies.

## Performance

Implemented performance patterns:

- Vite production build.
- Route-based lazy loading with Suspense.
- Manual vendor chunk splitting for charts, router, motion, and query code.
- React Query smart caching.
- Lazy-loaded images.
- Memoized query keys and normalized API filters.

## Scalability

The current mock API layer can be replaced by REST endpoints without changing page contracts. Keep `entities/*/api.ts` as the boundary between UI and backend.
