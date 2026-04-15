# Legacy Marketing Pages — DO NOT USE

These files are **superseded** by the true 2-frontend architecture.

They were the original single-SPA marketing pages that used the old
`MarketingLayout` (shared `Navbar` + `Footer`) and were selected at
runtime via `getSiteMode()` hostname detection.

## Replacement:

| Legacy File     | Replaced By                           |
| --------------- | ------------------------------------- |
| `Home.tsx`      | `pages/management/Home.tsx` + `pages/school/Home.tsx` |
| `About.tsx`     | `pages/management/About.tsx` + `pages/school/About.tsx` |
| `Features.tsx`  | `pages/management/Features.tsx` + `pages/school/Features.tsx` |
| `Pricing.tsx`   | `pages/management/Pricing.tsx` + `pages/school/Pricing.tsx` |
| `Contact.tsx`   | `pages/management/Contact.tsx` + `pages/school/Contact.tsx` |

## Why kept (not deleted):

- Retained for reference only during the transition period.
- These files have **NO active routes** and **NO active imports**.
- Safe to delete entirely once the 2-frontend architecture is confirmed
  stable in production.

## Safe to delete after:

- Both `client/management/` and `client/school/` builds are deployed
- All routes verified working on both domains
- This folder can then be completely removed
