In `src/components/MasterclassSection.tsx`, alleen de kaart-mapping aanpassen:

- Container: `bg-white/10 backdrop-blur-sm border border-white/20` → `bg-white border border-border shadow-lg`
- Icoon-vlak: `bg-brand-orange/20` → `bg-brand-orange`
- Icoon: `text-brand-orange` → `text-white`
- Titel: witte tekst + `TEXT_SHADOW_STRONG` → `text-foreground`, geen shadow
- Beschrijving: `text-white/95` + `TEXT_SHADOW_STRONG` → `text-muted-foreground`, geen shadow

Alle andere elementen (titel boven kaarten, subcopy, review, CTA, foto-achtergrond met paarse overlay) blijven ongewijzigd. Wijziging geldt automatisch voor alle 6 pagina's.