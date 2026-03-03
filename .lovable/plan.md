

# Plan: Add Privacy Notice Page

Same approach as the Algemene Voorwaarden page:

1. **Create `src/pages/PrivacyNotice.tsx`** — Full privacy notice content rendered as structured HTML with Tailwind typography, Navigation, Footer, and Helmet SEO metadata. Route: `/privacy`.

2. **Register route in `App.tsx`** — Lazy-loaded at `/privacy`.

3. **Update `Footer.tsx`** — Add "Privacy" link next to the existing "Algemene voorwaarden" link in the legal links row.

