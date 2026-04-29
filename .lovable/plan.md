# Final polish — 5 fixes

## 1. Menu dropdown UX fix (yellow flash / disappearing items)

**Root cause:** Radix `NavigationMenuLink` applies a `data-[active]` state to the link matching the current route. The default shadcn styles for that state use `bg-accent` / `text-accent-foreground` tokens, which on this project resolve to a near-yellow / off-white background, so the active item visually merges with the menu background. The brief yellow flash is the same accent color appearing on hover/focus before the link disappears against the menu.

**Fix:** In `src/components/SimplifiedNavigation.tsx`, mark the currently-active page in the dropdown explicitly using `useLocation()`, and override the `data-active` / `data-state=open` styles on the dropdown links so they always use a readable color. Concretely:

- For each dropdown item, compute `isActive = pathname === subItem.href`.
- On the `Link`, replace the current className with one that:
  - Always renders `text-brand-gray-dark` for the title (never collapses to background color).
  - On hover/focus uses `bg-gray-100 text-brand-blue` (already there — keep).
  - On the active route adds a left accent bar + `bg-brand-off-white` and `text-brand-purple` for the title, so the user can see which page they're on without it ever turning yellow / invisible.
- Add `data-[active]:bg-brand-off-white data-[active]:text-brand-purple` overrides on the `Link` so any Radix-applied active class is neutralised.
- Also add a small "Current page" visual cue (e.g. a filled left border `border-l-4 border-brand-orange` when active).

This is the simpler, more standard UX choice the user asked for: keep the dropdown working, but show the active page clearly instead of fighting Radix's active styling.

Apply the same active-state styling in the **mobile menu** sublists too.

## 2. Rename CTA "Wat levert dit jullie op?" → "Bereken de ROI" / "Calculate your ROI"

Replace in:

- `src/i18n/locales/nl/training.json` lines 10 and 591: `"cta": "Wat levert dit jullie op?"` → `"cta": "Bereken de ROI"`.
- `src/i18n/locales/en/training.json` line 591: `"cta": "What does this deliver for you?"` → `"cta": "Calculate your ROI"`.
- Check `en/training.json` line ~10 (vitality hero cta) and update to `"Calculate your ROI"` if currently the deliver phrasing.
- Search the home page (`HeroSection.tsx`, `LandingPage.tsx`, `common.json`) for any remaining "Wat levert" / "deliver for you" copy used as the home hero ROI CTA and replace with the same strings. (Will grep at edit time and update wherever it appears.)

This covers home + both organisation pages (Vitality + Sustainable Employability + Performance org variant) in both languages.

## 3. Center the 4th card on Sustainable Employability — Challenges & Results

The challenges + results sections in `src/components/TrainingPageLayout.tsx` already center a 4th card when there are exactly **5** items (`challenges.length === 5 && i === 3`). Sustainable Employability has **4** items, so no offset triggers and the 4th card sits on the right.

**Fix:** generalise the offset rule: when the items count is `4`, render the grid as 3 columns of 2 spans each on the first row and center the 4th below.

Implementation in `TrainingPageLayout.tsx` (apply to both `challenges` and `results` blocks):

```tsx
const total = challenges.length;
const offset =
  total === 5 && i === 3 ? "md:col-start-2"
  : total === 4 && i === 3 ? "md:col-start-3"
  : "";
```

With the existing `md:grid-cols-6` + `md:col-span-2`, `md:col-start-3` places the 4th card centered (cols 3–4) on the second row. Same change for the `results` map.

No changes needed to translations — only layout logic.

## 4. Move "Discover the method" CTA to after the weeks block on Vitality + Sustainable Employability

`TrainingPageLayout.tsx` already supports this via the `showMethodCtaAfterWeeks` prop (currently used by Stress + Performance). Enable it on the two organisation pages:

- `src/pages/Vitaliteitsprogramma.tsx`: add `showMethodCtaAfterWeeks` to the `<TrainingPageLayout ... />` props.
- `src/pages/DuurzameInzetbaarheidTraining.tsx`: same.

Also remove the duplicate "Discover the method" CTA at the bottom of `ProgramOverviewSection` **only on these training pages** to avoid showing it twice. Two options:
- Add a `hideOutroCta` prop to `ProgramOverviewSection` and pass it from `TrainingPageLayout` whenever `showMethodCtaAfterWeeks` is true.
- Or keep `ProgramOverviewSection` as-is on the homepage (where it's also used) and gate via the prop.

Will go with the prop approach so the homepage is unaffected.

## 5. Rename FAQ exercise question

Update all 4 occurrences in each language file:

- `src/i18n/locales/nl/training.json` lines 177, 379, 573, 750: `"Wat voor soort oefeningen zijn het?"` → `"Wat zijn de oefeningen?"`
- `src/i18n/locales/en/training.json` lines 177, 379, 573, 750: `"What kind of exercises are they?"` → `"What are the exercises?"`

## Verification after changes

- Section background alternation rule still holds on Vitality + Sustainable Employability (Weeks `bg-white` → Masterclass purple → FAQ off-white). Adding the in-section CTA after weeks doesn't change section backgrounds. Confirm by viewing both pages in NL + EN.
- Click each dropdown item from its own page in dev preview to confirm no yellow flash and the active item is clearly highlighted.
- Confirm the 4-card grid on `/en/sustainable-employability-training` and `/duurzame-inzetbaarheid-training` shows the 4th card centered on desktop.
