# Plan: Automatische taaldetectie op basis van browsertaal

## Huidige situatie

De gewenste logica bestaat al grotendeels in `src/i18n/InitialLanguageRedirect.tsx`:

- Bij eerste bezoek (geen opgeslagen voorkeur in localStorage) wordt `navigator.language` gecontroleerd.
- Begint deze met `nl` → bezoeker blijft op de Nederlandse (default) versie.
- Begint deze met iets anders → bezoeker wordt doorgestuurd naar de Engelse equivalent (`/en/...`).
- De keuze wordt onthouden in `localStorage` zodat hij niet bij elke navigatie opnieuw wordt geforceerd.
- De handmatige taalswitcher (`LanguageSwitcher.tsx`) overschrijft deze voorkeur.

Dit dekt jouw verzoek al: NL-browsers krijgen NL als default, niet-NL-browsers krijgen EN.

## Wat ik wil verbeteren

Er zijn drie kleine zwakke plekken die ik wil aanpakken zodat het gedrag betrouwbaar werkt op álle pagina's en bij álle browsers:

1. **Werkt nu alleen op pagina's die in `ROUTE_MAP` staan.** Bezoek je een NL-pagina zonder mapping (bv. `/calendar`, `/signup`, een blog-detailpagina die nog niet in de map staat), dan gebeurt er niets. Ik laat de redirect óók werken voor de root `/` als fallback wanneer de huidige pagina geen NL→EN-mapping heeft, zodat een Engelstalige bezoeker tenminste op de Engelse homepagina landt.
2. **`navigator.languages` (lijst) wordt genegeerd.** Sommige browsers (vooral Chrome) zetten `navigator.language` op een primaire taal terwijl `navigator.languages` een uitgebreidere voorkeurslijst bevat. Ik check beide: als `nl` érgens in de voorkeurslijst staat → NL tonen; anders → EN.
3. **`<html lang>` en i18next worden pas na de redirect gesynchroniseerd.** `LanguageSync.tsx` doet dit al correct na navigatie, dus geen extra werk nodig — alleen verifiëren.

## Concrete wijzigingen

**`src/i18n/InitialLanguageRedirect.tsx`**

- Bouw een lijst `[navigator.language, ...navigator.languages]` (gededupliceerd, lowercase).
- `prefersDutch = list.some(l => l.startsWith("nl"))`.
- Als `prefersDutch` → niets doen (NL is default).
- Als niet en bezoeker is op een NL-pad:
  - Probeer eerst de exacte EN-equivalent via `ROUTE_MAP`.
  - Lukt dat niet → val terug op `/en` (Engelse homepagina).
  - Sla `"en"` op in `localStorage` en navigeer met `replace: true`.
- Als bezoeker al op `/en/...` staat → niets doen.

**Niets anders hoeft te wijzigen.** De bestaande `LanguageSwitcher` blijft de gebruikersvoorkeur overschrijven en `LanguageSync` blijft i18next + `<html lang>` syncen.

## Te bewerken bestanden

- `src/i18n/InitialLanguageRedirect.tsx`

## Edge cases die gedekt blijven

- Gebruiker heeft eerder handmatig NL of EN gekozen → keuze wordt gerespecteerd (localStorage).
- Gebruiker landt direct op `/en/...` → blijft op EN, voorkeur wordt niet overschreven.
- SSR/no-window → guard blijft staan.
- Browsers zonder `navigator.languages` → fallback op `navigator.language`.
