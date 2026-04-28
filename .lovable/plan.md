## Wijzigingen op `src/pages/OverOns.tsx`

### 1. Sectie "Waarom wij dit werk doen" — oranje blok verwijderen + body vervangen

- Verwijder het oranje missie-blok (`bg-brand-orange ...` met de tekst over "ruimte voor innerlijke sprongen").
- De afbeelding rechts (`waaromWijAfbeelding`) blijft staan.
- Vervang de drie body-paragrafen links door één nieuwe paragraaf:

  > Bij Innerleaps geloven we in het duurzame succes van bewuste aandacht. Met die aandacht leven deelnemers met meer rust, focus en lef. Ze worden er niet alleen een mooier mens van, ze zullen ook hun ware potentieel benutten. Hierdoor krijgen organisaties een team dat niet alleen inzetbaar is, maar ook nog eens met plezier maximaal presteert. Dat is de innerlijke sprong waar wij in geloven.

- Layout blijft een 2-koloms grid (body links, afbeelding rechts). Body krijgt verticale centrering zodat hij netjes naast de afbeelding uitlijnt.

### 2. Sectie "Waarom Bas InnerLeaps is begonnen" — titel + body herschrijven

- Nieuwe titel (oranje accent op "InnerLeaps"):

  > Het verhaal achter <span class="text-brand-orange">InnerLeaps</span>

- Vervang de body-paragrafen door:

  > Bas richtte InnerLeaps op na zijn herstel van een hersenschudding. Met een master Design for Interaction aan de TU Delft en ervaring in consultancy en als productmanager bij een SaaS-bedrijf, was hij gewend om onder druk te presteren. Tot een snowboardongeval hem tot stilstand dwong.
  >
  > Tijdens zijn herstel verdiepte hij zich in de werking van de hersenen en stuitte op veertig jaar wetenschappelijk onderzoek: aandacht is trainbaar. Terug op werk merkte hij het verschil. Minder stress, scherpere focus, meer controle over zijn gedachten en een productiviteit die hij niet eerder kende.
  >
  > "Die ervaring wil ik delen. Daarom ben ik InnerLeaps begonnen."

- De laatste regel (de quote) wordt licht benadrukt (italic) zodat het herkenbaar als citaat oogt.
- De rechterkolom (foto Bas + naamlabel + "Plan gesprek met Bas"-knop) blijft ongewijzigd.

### 3. "Stel je vragen aan Bas"-blok verwijderen

- Verwijder `<ContactSection />` (regel 322) en de bijbehorende import (regel 4) uit `OverOns.tsx`.
- Het `ContactSection`-component zelf blijft bestaan; het wordt nog elders gebruikt (o.a. op de contactpagina), dus dat raken we niet aan.

### Niet aangeraakt

- TrustSection, Footer, navigatie, trainerssectie, alle assets en overige pagina's.
