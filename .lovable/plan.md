# Fix: browser-language auto-redirect doesn't work

## What's broken

When a visitor with an English browser opens `innerleaps.nl/`, they should be redirected to `/en`. They aren't. Root cause:

1. `src/i18n/config.ts` initialises `i18next-browser-languagedetector` with:
   ```
   caches: ["localStorage"],
   lookupLocalStorage: "innerleaps-lang",
   ```
   On first visit, i18next detects the browser language, sets `i18n.language`, and **immediately writes that value to `localStorage["innerleaps-lang"]`**. This happens at module-load time, before any React component mounts.

2. `InitialLanguageRedirect.tsx` then runs, reads `localStorage["innerleaps-lang"]`, sees it's already set, treats it as "user already has a preference", and returns without redirecting.

3. Net effect: the redirect logic is dead code on every fresh visit.

A secondary issue: people who have visited the site before this fix already have a stale value in `localStorage` (often `"nl"` because the URL is NL). They'll continue to never get redirected unless we invalidate that old key.

## Fix

### 1. Stop i18next from writing to our redirect-decision key

In `src/i18n/config.ts`, change the detector config so it does not cache to (or even read from) the same key our redirect logic owns:

- Remove `caches: ["localStorage"]` (set to `caches: []`) so i18next never auto-writes the key.
- Remove `"localStorage"` from the `order` array — language is already driven by the URL (`LanguageSync` syncs i18n to the path on every navigation), so i18next doesn't need its own persistence.
- Keep `lookupLocalStorage` removed/irrelevant since we no longer cache.

This makes `localStorage["innerleaps-lang"]` exclusively owned by our two components:
- `InitialLanguageRedirect` writes it once on first visit.
- `LanguageSwitcher` writes it when the user explicitly switches.

### 2. Invalidate stale values from before the fix

In `InitialLanguageRedirect.tsx`, bump the storage key to a new name (e.g. `innerleaps-lang-v2`). Anyone with the old `innerleaps-lang` key will be treated as a fresh visitor exactly once and get the correct redirect. Update `LanguageSwitcher.tsx` to use the same new key.

(Alternative considered: a one-shot migration that deletes the old key. Bumping the key name is simpler and equally effective.)

### 3. Verify the redirect actually fires

After the change, test in the browser tool with a fresh session (no localStorage):
- Navigate to `/` with default (English) browser language → should land on `/en`.
- Navigate to `/breintraining-methode` → should land on `/en/method`.
- Reload `/en` → should stay on `/en` (no loop).
- Manually switch to NL via the switcher, reload `/en` → should redirect to `/` (no, actually: switcher sets storage to `nl` and navigates; reload of `/en` should keep them on `/en` because URL is authoritative and storage is set, so no auto-redirect runs — confirm this is the desired behaviour, it matches current logic).

## Files to edit

- `src/i18n/config.ts` — remove localStorage from detector `order` and `caches`.
- `src/i18n/InitialLanguageRedirect.tsx` — bump `STORAGE_KEY` to `innerleaps-lang-v2`.
- `src/components/LanguageSwitcher.tsx` — bump `STORAGE_KEY` to `innerleaps-lang-v2`.

## Out of scope

- No changes to `ROUTE_MAP` or `LanguageSync`.
- No changes to UI or copy.
