# Legacy Single-SPA Architecture Files — DO NOT USE

These files implemented the **transitional** single-SPA hostname-switching
architecture where one frontend pretended to be two by detecting the domain
at runtime and selecting different marketing pages.

This has been replaced by the **true 2-frontend architecture**:

| Legacy File           | Replaced By                                      |
| --------------------- | ------------------------------------------------ |
| `index.html`          | `client/management/index.html` + `client/school/index.html` |
| `main.tsx`            | `client/management/src/main.tsx` + `client/school/src/main.tsx` |
| `App.tsx`             | `client/management/src/ManagementApp.tsx` + `client/school/src/SchoolApp.tsx` |
| `useSiteContext.ts`   | Not needed — each frontend IS a specific site |

## Server routing:

The server (`server/_core/vite.ts`) now routes requests by hostname:
- `equiprofile.online` → serves `dist/public/management/index.html`
- `school.equiprofile.online` → serves `dist/public/school/index.html`

## Safe to delete after:

- Both frontends are deployed and verified in production.
- This folder can then be completely removed.
