

# Plan: Add General Terms and Conditions Page

## What will be built

1. **New page** at `/algemene-voorwaarden` containing the full terms and conditions text, styled consistently with the rest of the site (Navigation, Footer, proper headings/typography).

2. **Footer update** — Add a "Algemene voorwaarden" link in every footer, placed below the copyright line as is common practice for legal links.

3. **Route registration** in `App.tsx` for the new page.

## Technical details

- Create `src/pages/AlgemeneVoorwaarden.tsx` with the full markdown content rendered as structured HTML using existing Tailwind typography classes.
- Add lazy-loaded route `/algemene-voorwaarden` in `App.tsx`.
- Add a footer legal links row in `Footer.tsx` (centered, below the copyright line) with a `Link` to `/algemene-voorwaarden`.

