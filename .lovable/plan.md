

# Plan: Make Life Questionnaire Fully Frontend-Only + Save Score UX

## 1. Strip backend from `LifeQuestionnaireResult.tsx`

Remove all server-side code:
- Remove imports: `supabase`, `Input`, `toast`
- Remove state: `email`, `isSubmitting`, `emailSent`
- Remove `answers` from location state (no longer needed)
- Remove the entire email form UI and `handleEmailSubmit` function

## 2. Replace email form with "Save your score" prompt

After the score display and level badge, add a clear call-to-action block encouraging users to note down their score:

- A highlighted box with a notebook/pencil icon (from Lucide) with the heading **"Save your score for the masterclass"**
- Supporting copy: **"Write down or screenshot your score — we'll discuss what it means during the masterclass."**
- Styled as a subtle card with `bg-brand-off-white` or similar neutral background, visually distinct from the score box but not competing with it

## 3. Clean up `LifeQuestionnaire.tsx`

- Remove `answers` from the `navigate()` state since the result page no longer needs individual answers — only pass `score`

## Result

Zero data leaves the browser. No Supabase calls, no database writes. Score lives only in ephemeral React state and the user's own notes.

