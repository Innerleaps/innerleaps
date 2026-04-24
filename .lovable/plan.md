

## Doel
De "Waarschuwingssysteem"-tag (toegevoegd aan Week 3 op `/duurzame-inzetbaarheid-training`) doortrekken naar dezelfde Week 3-sectie op de andere drie pagina's met het "6 weken breintraining"-blok.

## Wijzigingen

In de Week 3-kaart van het 6-weken-blok wordt naast de bestaande "Controlecentrum"-tag een tweede badge "Waarschuwingssysteem" toegevoegd, met dezelfde styling:

```tsx
<span className="bg-brand-purple text-white px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
  Waarschuwingssysteem
</span>
```

### Bestanden
1. `src/pages/Vitaliteitsprogramma.tsx` — Week 3 sectie
2. `src/pages/StressManagement.tsx` — Week 3 sectie
3. `src/pages/PrestatieProgramma.tsx` — Week 3 sectie

`src/pages/DuurzameInzetbaarheidTraining.tsx` is al bijgewerkt en wordt overgeslagen.

## Niet in scope
- Geen refactor naar een herbruikbaar `<SixWeekProgramSection />` component (kan later als aparte opschoning).
- Geen wijziging aan titels of beschrijvingen — alleen de extra tag.

