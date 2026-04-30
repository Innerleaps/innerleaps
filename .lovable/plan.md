
## Goal

Make the ROI Calculator (inline `ROICalculator` + popup `CalculatorModal`) and the Scientific Report popup (`LeadMagnetModal`) appear in English on all English pages (`/en/...`), and have the matching confirmation emails sent to those leads be in English. Dutch behavior stays unchanged.

## Where these components appear

ROI Calculator (inline `<ROICalculator />`):
- `LandingPage` (NL `/`, EN `/en`)
- `Wetenschap` (NL + EN science page)
- `Contact` (NL + EN)
- `Vitaliteitsprogramma`, `DuurzameInzetbaarheidTraining` (NL only)

ROI Calculator popup (`<CalculatorModal />`):
- Triggered from `Navigation`, `HeroSection`, `StickyCtaButtons`, `ProcessSection`, plus `LandingPage`, `Vitaliteitsprogramma`, `DuurzameInzetbaarheidTraining`. Available on EN pages via the EN landing page + EN navigation.

Scientific Report popup (`<LeadMagnetModal />`):
- Triggered from `Wetenschap` ("Get the report" CTA) and `DeMethode` (NL + EN method page).

All three components are currently 100% Dutch hard-coded strings. They do NOT use `useTranslation`.

## Approach: i18n via react-i18next

The project already uses `react-i18next` with `path` detection (`/en` → `en`). All three components will be refactored to read strings via `useTranslation`. No prop changes — language is detected automatically from the URL.

### Step 1 — Add translation keys

Add a new namespace `calculator` (NL + EN) used by both `ROICalculator` and `CalculatorModal` (they share copy 1:1). Keys cover:
- Header: badge label, title, subtitle
- Two column headers: Contact details / Organisation details
- Field labels + placeholders: name, email, company, phone, absenteeism %, turnover %, employees, average gross annual salary
- Helper text + submit button states ("Calculate savings" / "Calculating...")
- Validation toast: "Fill in all required fields", "All fields marked * are required"
- Success toast: "Calculation sent! / We've emailed your ROI analysis."
- Error toast
- Results screen: "Discover the impact for your organisation", "Based on 40 years of scientific research", "Your organisation", row labels (Employees, Avg salary, Absenteeism, Turnover), "Conservative Scenario / Minimum impact", "Positive Scenario / Full impact", line items (Absenteeism saving 15%, Retention saving 5%, Productivity gain 5%, etc.), "Total saving", "Investment", "NET PROFIT", "ROI", "Scientific basis" block (3 bullets), "Want to realise these gains?", "Meet Bas" CTA, "New calculation"
- Currency: keep `€` formatting; switch locale to `en-US` when language is `en` (still EUR currency)

Add a new namespace `leadMagnet` (NL + EN) for `LeadMagnetModal`:
- Title: "Request the Scientific Report"
- Intro paragraph
- Field labels + placeholders (Name, Email, Phone optional, Company name, Job title)
- Submit button states
- Privacy line at bottom
- Success state: "Thanks for your request!" + body referencing the email address

Register both new namespaces in `src/i18n/config.ts`.

### Step 2 — Refactor the three components

For each of `ROICalculator.tsx`, `CalculatorModal.tsx`, `LeadMagnetModal.tsx`:
- Add `const { t, i18n } = useTranslation(['calculator' | 'leadMagnet']);`
- Replace every Dutch literal with `t('key')`
- Replace `Intl.NumberFormat('nl-NL', ...)` with locale-aware: `i18n.language === 'en' ? 'en-US' : 'nl-NL'`
- Pass `language: i18n.language` in the body of the `supabase.functions.invoke('submit-calculator' | 'submit-scientific-report', ...)` call so the edge function can pick the email language.
- Keep all existing logic, validation, calculation, layout, styling identical.

### Step 3 — Localise the lead-confirmation emails

Both edge functions currently hardcode Dutch HTML. Update them to render English when `language === 'en'`:

`supabase/functions/submit-calculator/index.ts`
- Add `language: z.enum(['nl', 'en']).optional().default('nl')` to the Zod schema.
- Extract HTML strings (subject, headings, labels, CTA, scientific-basis bullets, footer) into a small `copy` object keyed by language; build the existing template using that object instead of inline Dutch.
- Localise currency formatter (`en-US` for `en`, `nl-NL` for `nl`), and the date in the admin email footer.
- Subject lines, e.g.:
  - NL: `Ontdek de besparing voor {company} met Innerleaps training`
  - EN: `Discover the savings for {company} with Innerleaps training`
- Admin notification email stays in Dutch (Bas reads it).

`supabase/functions/submit-scientific-report/index.ts`
- Same pattern: add `language` to schema, build localised user-facing email + subject. Admin email remains Dutch.
- EN subject: `Report: Discover the effectiveness of our method`
- EN intro: "Thanks for your interest, {name}!", title "Scientific report on Awareness Training", bullets, CTA "Schedule a call".

### Step 4 — Tone & translation rules (per project memory)

- Brand name "Innerleaps" (lowercase l) — replace any "InnerLeaps" in the new English copy.
- No em-dashes / en-dashes in any new copy.
- No Oxford comma in EN lists.
- Keep claim numbers (15-21% etc.) — these are claims with numbers and may stay.

### Step 5 — Verification

- Visit `/en` → open ROI Calculator popup from hero/nav → confirm fully English.
- Visit `/en/breintraining-methode` → open "Get the report" → confirm English modal.
- Visit `/en/wetenschap` (English science page) → inline `ROICalculator` + LeadMagnet popup both English.
- Submit each form with a test email, confirm received email is English.
- Visit NL pages and verify Dutch is unchanged.

## Files to change

Frontend
- `src/i18n/config.ts` — register `calculator` + `leadMagnet` namespaces
- `src/i18n/locales/nl/calculator.json` (new)
- `src/i18n/locales/en/calculator.json` (new)
- `src/i18n/locales/nl/leadMagnet.json` (new)
- `src/i18n/locales/en/leadMagnet.json` (new)
- `src/components/ROICalculator.tsx`
- `src/components/CalculatorModal.tsx`
- `src/components/LeadMagnetModal.tsx`

Backend (edge functions, auto-deployed)
- `supabase/functions/submit-calculator/index.ts`
- `supabase/functions/submit-scientific-report/index.ts`

No DB migrations, no new secrets, no schema changes.
