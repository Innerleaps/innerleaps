# Eén pagina voor medewerkers

Voorstel van 19 oktober 2026. De twee pagina's onder "Voor medewerkers"
(`/stressmanagement-training` en `/prestatie-training`, plus de Engelse) worden
één pagina, en het uitklapmenu verdwijnt. Basis: "(C) Employee and participant
insights" (Second Brain, 16-10-2026) en de segmentanalyse scale-ups.

Niets hieronder is gekozen. Alle tekst is een optie. Mijn aanbeveling staat er
steeds bij.

### Besloten door Bas, 19-10-2026

1. **De pagina helpt de medewerker zijn werkgever te overtuigen.** De knop opent
   een kant-en-klare mail aan HR of de leidinggevende. Daarnaast de gratis
   masterclass voor het team. Geen losse aanmelding.
2. **"Mindfulness" blijft verboden**, ook in de FAQ. Het insights-document raadt
   aan het woord niet meer te vermijden (§5.2), maar de lijst in Kernwoorden
   Nederlands blijft leidend. De FAQ-vraag wordt "Is het zweverig?".
3. **De werkgever ziet alleen groepscijfers**, nooit iets van een individuele
   deelnemer.
4. **De URL blijft `/stressmanagement-training`** (en
   `/en/stress-management-training`). De prestatiepagina krijgt een 301.

### Besloten door Bas, 20-10-2026 (gebouwd op branch `medewerkerspagina`)

- **Overal optie A**, met deze uitzonderingen:
  - Hero: **geen tweede link.** De klantcase is geschreven voor de koper.
  - 3.3 Nederlands: "Al eens een app geprobeerd? Nu <0>houd je het wel vol</0>."
  - 3.5 eigen tekst van Bas. EN: "Not for people who can't cope, but for people
    who <0>carry a lot</0>." NL: "Niet voor mensen die te gespannen zijn, maar
    voor wie een hoop <0>ballen in de lucht</0> houdt."
  - Mail: **optie C** (persoonlijk begin, uitkomst, masterclass, "ons volgende
    gezamenlijke moment"). Zie `stress.mail` in `training.json`.
- **Week 5:** het kernprogramma (luisteren) is voor scale-ups, het
  vitaliteitsprogramma (milder zijn voor jezelf) voor de publieke sector. De
  pagina toont luisteren, met een regel eronder voor onderwijs, zorg en overheid.
- **Citaten:** "deelnemer bij een uitgeverij", nooit NRC. Wineke blijft met naam
  (ze staat op `/over-ons`). Het TheyDo-citaat over de pauze staat vertaald op de
  Nederlandse pagina.
- **FAQ "Waar is het op gebaseerd?"** gebruikt de bestaande, eerder gekozen
  tekst van de oude pagina, ongewijzigd.

### Feedback van Bas, 20-10-2026 (ronde 3)

- **Getallen als cijfer**: "6 weken", niet "zes weken". In beide talen doorgevoerd.
- **Logo's in kleur**, met Holie Pizza erbij.
- **App-blok** met de eigen tekst van Bas: "Al eens een app geprobeerd die nu
  <0>ongebruikt</0> op je wacht?" plus zijn intro. Het derde punt heet nu
  "Spanning herkennen" (optie A: "Je leert meer dan oefeningen...").
- **Effectkaarten**: de teksten van kaart 1 tot en met 4 zijn door Bas herschreven.
- **Wie doet mee**: geen TheyDo-aantallen meer, wel rollen. Optie C: "Developers,
  accountmanagers, HR-adviseurs, marketeers, journalisten, docenten, leerkrachten
  en directieleden. Verschillende banen, hetzelfde volle hoofd."
- **Citaat groep**: "Fijn om in een vrij compact groepje te zitten en te horen hoe
  anderen er in staan."
- **Wat je precies doet**, ingekort naar de kern van Bas: workshops met nieuwe
  oefeningen en tools, een kwartiertje per dag, deels in je vrije tijd en deels
  tijdens het tandenpoetsen of de was.
- **Masterclass en "Wil je dit ook op jouw werk?" samengevoegd** tot "Gratis
  masterclass <0>bij jou op kantoor</0>" (optie A), met 3 stappen: kennismaken bij
  leidinggevende of HR, gratis masterclass, meedoen vanuit het eigen leerbudget.
  Knoppen: "Stel het voor aan je werkgever" en "Vraag een gratis masterclass aan".

---

## 1. Positionering

### Wie leest deze pagina?

De pagina krijgt vrijwel geen bezoekers uit Google. Search Console, laatste 16
maanden: `/prestatie-training` nul vertoningen, `/stressmanagement-training` twee.
Wie hier komt, komt via een link of via het menu. Dat zijn twee mensen:

1. **De uitgenodigde medewerker.** De werkgever biedt de training aan, HR of de
   CEO stuurt een link, en deze persoon beslist of hij zich aanmeldt. Bij Epi
   ging dat mis: 1 aanmelding op 21, na het antwoord "it will make you happy" en
   de vraag "What exactly do we do in those six weeks?". Bij TheyDo deden er 39
   mee.
2. **De medewerker die het zelf wil.** Iemand als Amanbir bij Epi of Dirk bij
   SnappCar: hij wil het voor zichzelf of zijn team, en moet het langs HR of zijn
   leerbudget krijgen.

Beide stellen dezelfde twee vragen: *wat levert het mij op* en *wat moet ik er
precies voor doen*. Daar is de pagina voor.

### Wat ze willen, en wat ze krijgen

| | Wat het document laat zien |
|---|---|
| Waarom ze zich aanmelden | **Focus en concentratie, 51%** (n=45). Stress 33%, productiviteit 20%. |
| Hoe de brede markt het zegt | **"Druk leven, alle ballen hoog houden", 38,5%** (panel, n=122). |
| Wat ze na afloop merken | **Minder stress en spanning, 68%.** Minder automatische piloot 55%, minder mentaal moe 55%, concentratie 41% (TheyDo, n=22). |
| Het effect dat het vaakst terugkomt | **Spanning eerder zien aankomen, en er iets mee doen.** Bij TheyDo én bij NRC. |
| Waar ze niet aan beginnen | Weet niet hoe (33%), te zweverig (31%), kost te veel tijd (27%). |
| Grootste groep | **Al eens geprobeerd en gestopt, 31%.** Niet omdat het niet werkte, maar omdat er niets was dat ze eraan herinnerde. |

Daaruit volgt de kern: **binnenkomen op focus, waarmaken op rust.** Het document
zegt het letterlijk: "lead acquisition copy on focus, deliver on stress".

### Wat de pagina níet doet

- **Geen "stressmanagement" als label.** In het panel kiest 0% van de
  focusgroep die naam. En het voedt de grootste twijfel van kopers: dat het
  aanbod zegt "er is iets mis met jou".
- **Geen "prestaties verbeteren" richting medewerkers.** Natalie (HR, Epi): "dan
  denken ze ik moet op een pip". Deelnemers zelf vinken prestatie maar bij 9% aan
  als iets wat verbeterde. Ze merken het als rust, niet als prestatie.
- **Geen "happy", geen welzijn als doel.** Zie Epi.
- **Wetenschap niet in de kop.** "Niet wetenschappelijk genoeg" is het kleinste
  bezwaar (5,7%). Vier deelnemers werden juist sceptisch van de nadruk erop. Het
  bewijs blijft, maar als antwoord in de FAQ en via de methodepagina.

Eerlijke afweging: het panel laat zien dat de drukke groep rust wil en de
focusgroep prestatie, en dat één boodschap die twee niet allebei draagt. Door
samen te voegen kies je. Mijn keuze: spreek de drukke medewerker aan, met focus
als ingang. Wie op prestatie zoekt, is meestal de koper, en die heeft de
scale-up-pagina al.

### Waarom deze training en niet een app

Dat is het verschil dat de medewerker zelf kan navertellen. Van de mensen die
iets vergelijkbaars probeerden, stopte de grootste groep. Een deelnemer bij TheyDo
zei het zo: "the value is in the consistency of meeting up and in creating that
safe community." Een vast uur per week, een trainer en een groep maken er een
gewoonte van.

### Positionering in één zin (intern, geen sitetekst)

Voor medewerkers met een vol hoofd en een volle agenda is de aandachttraining
van Innerleaps de manier om je focus terug te halen en spanning eerder te zien
aankomen. Zes weken, een vast uur per week binnen werktijd, in een kleine live
groep met een trainer. Anders dan met een app houd je het vol, omdat je het samen
doet.

---

## 2. Opbouw van de pagina

| # | Blok | Wat het oplost |
|---|---|---|
| 1 | Hero | Focus en rust, in hun woorden. De vorm meteen eerlijk: 6 weken, groep, kwartier per dag. |
| 2 | Herken je dit? | Vijf situaties uit de aanmeldformulieren. |
| 3 | **Nieuw:** waarom het nu wel blijft hangen | Het bezwaar "al eens geprobeerd en gestopt" (31%). |
| 4 | Wat deelnemers merken | 68 / 55 / 55% en citaten. |
| 5 | **Nieuw:** wie er meedoet | Het stigma. Meer dan de helft bij TheyDo had een senior- of leidinggevende rol. |
| 6 | De groep en de trainer | Angst om te moeten delen. Trainer 9,3. |
| 7 | Wat je precies doet + de zes weken | De vorm eerlijk benoemen. Heidi: "would have been good to have a heads up that a good portion of this is meditative". |
| 8 | Masterclass (bestaand gedeeld blok) | Ongewijzigd. |
| 9 | **Nieuw:** zo krijg je het op je werk | Voor de medewerker die het zelf wil. |
| 10 | FAQ | De bezwaren één voor één. Wetenschap als antwoord, niet als kop. |

Opmaak: de lichte opbouw van home en de scale-up-pagina, niet de donkere hero
van de twee huidige pagina's.

---

## 3. Teksten, per blok

Steeds eerst Engels (de brontaal), dan Nederlands. Oranje woorden staan tussen
`<0>` en `</0>`.

### 3.1 Hero

**Kop**

| | Engels | Nederlands |
|---|---|---|
| **A (aanbevolen)** | More <0>focus</0>. Less <0>noise</0> in your head. | Meer <0>focus</0>. Minder <0>ruis</0> in je hoofd. |
| B | <0>Focus</0>, even on your busiest days | <0>Focus</0>, ook op je drukste dagen |
| C | A <0>calmer</0> head when everything comes at once | <0>Rust</0> in je hoofd als alles tegelijk komt |

A noemt allebei: focus (waarom ze komen) en rust (wat ze merken), zonder het
woord stress. B is het scherpst op focus. C spreekt de grootste groep in het panel
aan, maar mist de focus waarop mensen zich aanmelden.

**Subkop**

| | Engels | Nederlands |
|---|---|---|
| **A (aanbevolen)** | Six weeks of attention training in a small live group. You learn to bring your focus back, and to notice tension before it takes over. | Zes weken aandachttraining in een kleine live groep. Je leert je focus terug te halen en spanning te zien aankomen voordat die je overneemt. |
| B | One hour a week with a trainer, and about fifteen minutes of practice a day. Enough to make it a habit. | Een uur per week met een trainer, en zo'n kwartier oefenen per dag. Genoeg om er een gewoonte van te maken. |

**Badge boven de kop** (nu: "Wetenschappelijk bewezen training")

| | Engels | Nederlands |
|---|---|---|
| **A (aanbevolen)** | 6 weeks · live group · 15 minutes a day | 6 weken · live groep · een kwartier per dag |
| B | For employees | Voor medewerkers |
| C | Evidence-based method | Bewezen methode |

C is de badge van home. Voor deze lezer doet het bewijs weinig (zie hierboven),
de vorm wel.

**Cijferband** (vervangt de vier cijfers die er nu staan)

| Engels | Nederlands |
|---|---|
| 68% noticed less stress and tension | 68% merkte minder stress en spanning |
| 55% spent less time on autopilot | 55% leefde minder op de automatische piloot |
| 55% felt less mentally drained | 55% voelde zich minder mentaal moe |
| 9.3 for the trainer | 9,3 voor de trainer |
| *Evaluation by 22 participants at TheyDo, 2026* | *Evaluatie door 22 deelnemers bij TheyDo, 2026* |

Belangrijk: de cijfers die er nu staan (−50% spanning, +24% focus, +15% tevreden,
+10% prestatie, +28% slaap, "40+ jaar") hebben geen bekende bron. Ze zijn van de
andere pagina's al gehaald en gaan dus niet mee.

**Knop** (opent een mail, zie 3.12 voor de tekst)

| | Engels | Nederlands |
|---|---|---|
| **A (aanbevolen)** | Suggest it to your employer | Stel het voor aan je werkgever |
| B | Send this to HR | Stuur dit naar HR |
| C | Ask your employer | Vraag het je werkgever |

A laat in het midden wie het besluit. Bij TheyDo was dat de CEO, bij Epi HR, bij
SnappCar een salesmanager. B is concreter, maar niet elke organisatie heeft HR.

**Tweede link** naast de knop

| | Engels | Nederlands |
|---|---|---|
| **A (aanbevolen)** | What participants at TheyDo noticed | Wat deelnemers bij TheyDo merkten |
| B | Read the TheyDo case | Lees de klantcase van TheyDo |

### 3.2 Herken je dit?

**Kop**

| | Engels | Nederlands |
|---|---|---|
| **A (aanbevolen)** | Keeping <0>all the balls</0> in the air | <0>Alle ballen</0> hoog houden |
| B | Your head is <0>full</0> before the day is over | Je hoofd zit al <0>vol</0> voordat de dag om is |

A is letterlijk de zin die 38,5% van het panel kiest.

**Vijf kaarten** (allemaal uit de aanmeldformulieren van TheyDo en NRC)

| Engels | Nederlands |
|---|---|
| **Always switching.** You jump from task to task. Every message pulls you out, and getting back into your work takes longer each time. | **Steeds schakelen.** Je springt van taak naar taak. Elk berichtje haalt je eruit, en terugkomen in je werk duurt steeds langer. |
| **On autopilot.** Your days fly by. You get through your list, but you're rarely fully there. | **Op de automatische piloot.** Je dagen vliegen voorbij. Je werkt je lijst af, maar je bent er zelden helemaal bij. |
| **Tension you notice too late.** Only afterwards do you realise how tense you were. Tight shoulders, a short fuse, shallow breathing. | **Spanning die je te laat ziet.** Pas achteraf merk je hoe gespannen je was. Strakke schouders, een kort lontje, een hoge ademhaling. |
| **Work comes home with you.** The laptop is shut, but your head is still at work. In the evening, and sometimes at night. | **Je werk gaat mee naar huis.** De laptop is dicht, maar je hoofd is nog aan het werk. 's Avonds, en soms ook 's nachts. |
| **Empty by four o'clock.** Your head is full by mid-afternoon. Decisions take more effort, and there's little left for the evening. | **Leeg om vier uur.** Halverwege de middag zit je hoofd vol. Beslissen kost meer moeite, en voor de avond blijft weinig over. |

### 3.3 Nieuw: waarom het nu wel blijft hangen

**Kop**

| | Engels | Nederlands |
|---|---|---|
| **A (aanbevolen)** | Tried an app before? This time it <0>sticks</0>. | Al eens een app geprobeerd? Nu <0>houd je het vol</0>. |
| B | Knowing it helps is easy. <0>Keeping it up</0> is the hard part. | Weten dat het helpt is makkelijk. <0>Volhouden</0> is het lastige. |

**Tekst**

| Engels | Nederlands |
|---|---|
| Most people who try something like this stop after a while. Not because it didn't work, but because nothing reminded them to keep going. So this training is built on three things. | De meeste mensen die zoiets proberen, stoppen er na een tijdje mee. Niet omdat het niet werkte. Er was gewoon niets dat ze eraan herinnerde. Daarom draait deze training om drie dingen. |
| **A fixed hour every week.** Six live sessions with the same group and the same trainer, during working hours. | **Een vast uur per week.** Zes live sessies met dezelfde groep en dezelfde trainer, binnen werktijd. |
| **Someone who shows you how.** You don't need to know where to start. The trainer takes you through it step by step. | **Iemand die het je voordoet.** Je hoeft niet te weten waar je begint. De trainer neemt je stap voor stap mee. |
| **Practice when you need it.** You learn to treat tension as your cue. A three-minute exercise between two meetings, or just before a difficult conversation. | **Oefenen als je het nodig hebt.** Je leert spanning te zien als seintje. Een oefening van drie minuten tussen twee meetings, of vlak voor een lastig gesprek. |

Bewijs erachter: 31% geprobeerd en gestopt (panel); wat deelnemers wél aan het
oefenen hield was een signaal in hun lijf, een vast moment en een herinnering
(§5.3). De oefening van drie minuten staat al in week 3.

### 3.4 Wat deelnemers merken

**Kop**

| | Engels | Nederlands |
|---|---|---|
| **A (aanbevolen)** | What participants <0>notice</0> after six weeks | Wat deelnemers na zes weken <0>merken</0> |
| B | <0>Calm</0> in your head, <0>focus</0> in your work | <0>Rust</0> in je hoofd, <0>focus</0> in je werk |

**Vijf kaarten**, met per kaart één citaat. Op de Nederlandse pagina citaten van
NRC (Nederlands), op de Engelse van TheyDo (Engels). Citaten zijn letterlijk.

| Engels | Nederlands |
|---|---|
| **You see tension coming.** You feel it in your shoulders or your breathing before it takes over, and you know what to do. *"Learning to recognize the signs of stress before they become too much"* | **Je ziet spanning aankomen.** Je voelt het in je schouders of je adem voordat het je overneemt, en je weet wat je dan doet. *"Herken sneller spanning en doe er sneller wat mee."* |
| **Back to your work faster.** Your mind still wanders. You just notice sooner and bring it back. That's exactly what you train. *"Short exercises can increase my focus and wellbeing"* | **Sneller terug bij je werk.** Je gedachten dwalen nog steeds af. Je merkt het alleen eerder en haalt ze terug. Dat is precies wat je traint. *"Meer rust in het hoofd ... hoofd- van bijzaken te scheiden. En dat werkt!"* |
| **Energy left at the end of the day.** A short pause isn't lost time. You come back sharper. *"Taking a break is not wasting time. That was the biggest shift for me."* | **Energie over aan het eind van de dag.** Een korte pauze is geen verloren tijd. Je komt scherper terug. *(geen Nederlands citaat hierover, zie §6)* |
| **Off autopilot.** You're more present. In a meeting, in a conversation, at home. *"Stop being on autopilot and observe what you're doing"* | **Minder op de automatische piloot.** Je bent er meer bij. In een meeting, in een gesprek, thuis. *"Meer ingecheckt bij mezelf, bewuster van hoe ik me voel"* |
| **Less going round in circles.** You notice when you're overthinking, and you can step out of it. *"More control of my thoughts"* | **Minder malen.** Je merkt wanneer je blijft piekeren, en je kunt eruit stappen. *"Voor de training was ik denk ik meer gaan piekeren en overdenken over deze situatie. Nu kon ik het loslaten."* |

Cijfers alleen in de band bovenaan (68 / 55 / 55), niet op de kaarten. Op een
kaart ziet "41% betere concentratie" er zwak uit, terwijl het een eerlijk en
goed resultaat is.

### 3.5 Nieuw: wie er meedoet

**Kop**

| | Engels | Nederlands |
|---|---|---|
| **A (aanbevolen)** | Not for people who can't cope. For people who <0>carry a lot</0>. | Niet voor wie het niet redt. Voor wie <0>veel draagt</0>. |
| B | Who <0>joins</0> | Wie er <0>meedoet</0> |

A pakt de twijfel bij de kop. Het risico: je zet de gedachte "dit is voor wie het
niet redt" wel in iemands hoofd. B is veiliger en zwakker.

**Tekst**

| Engels | Nederlands |
|---|---|
| At TheyDo, 39 people signed up. Developers, account executives, customer success managers, and people from the leadership team. More than half had a senior or lead role. | Bij TheyDo meldden 39 mensen zich aan. Developers, accountmanagers, customer success managers en mensen uit de directie. Meer dan de helft had een senior- of leidinggevende rol. |

Bewust niet "de CRO deed mee": dat is één herkenbaar persoon, en meedoen aan een
mentale training is iets wat je niet zomaar over iemand vertelt.

### 3.6 De groep en de trainer

**Kop**

| | Engels | Nederlands |
|---|---|---|
| **A (aanbevolen)** | You don't have to <0>share</0> anything you don't want to | Je hoeft niets te <0>delen</0> wat je niet wilt |
| B | A small group and a trainer who <0>knows the way</0> | Een kleine groep en een trainer die <0>de weg kent</0> |

**Tekst**

| Engels | Nederlands |
|---|---|
| One live hour a week, online, in a group of fifteen at most. The trainer asks questions, and what you say about yourself is up to you. Participants at TheyDo gave their trainer a 9.3. | Eén live uur per week, online, in een groep van hooguit vijftien mensen. De trainer stelt vragen. Wat je over jezelf vertelt, bepaal je zelf. Deelnemers bij TheyDo gaven hun trainer een 9,3. |
| *"I'm not someone who finds it easy to share in a group setting, but Wineke made the space feel safe enough to do that."* | *"Fijn om in een vrij compact groepje te zitten, te horen hoe anderen er in staan."* |

### 3.7 Wat je precies doet

**Kop**

| | Engels | Nederlands |
|---|---|---|
| **A (aanbevolen)** | What you'll <0>actually do</0> | Wat je <0>precies doet</0> |
| B | No incense. Just <0>practice</0>. | Geen wierook. Wel <0>oefenen</0>. |

B is speels en gaat recht op "te zweverig" af (45% in de focusgroep). Het kan
ook net te grappig zijn voor een pagina die HR doorstuurt.

**Tekst**

| Engels | Nederlands |
|---|---|
| Most days you do an exercise of about twelve minutes, with an audio recording. You'll need a quiet spot, and usually your eyes are closed. You rest your attention on your breathing or your body. Each time your mind wanders, you bring it back. That bringing back is the training. | De meeste dagen doe je een oefening van zo'n twaalf minuten, met een audio-opname. Je hebt een rustige plek nodig, en meestal zijn je ogen dicht. Je richt je aandacht op je adem of je lichaam. Elke keer dat je afdwaalt, haal je hem terug. Dat terughalen is de training. |
| On top of that come short exercises you do while brushing your teeth, over your coffee, or right before a meeting. They take no extra time. | Daarnaast zijn er korte oefeningen die je doet tijdens het tandenpoetsen, bij je koffie of vlak voor een meeting. Die kosten geen extra tijd. |

Daaronder de zes weken, met de bestaande weekteksten (zie §6 over week 5).

### 3.8 Nieuw: zo krijg je het op je werk

**Kop**

| | Engels | Nederlands |
|---|---|---|
| **A (aanbevolen)** | Want this at <0>your</0> work? | Wil je dit ook op <0>jouw</0> werk? |
| B | Bring it to your <0>team</0> | Neem het mee naar je <0>team</0> |

**Tekst**

Twee knoppen eronder: dezelfde mailknop als in de hero, en "Vraag een gratis
masterclass aan" (bestaande tekst uit het masterclassblok).

| Engels | Nederlands |
|---|---|
| Innerleaps works with organisations. Many pay for it from the learning budget, sometimes half from the company and half from your personal budget. The easiest first step is a free masterclass for your team. One hour, and afterwards everyone decides for themselves. | Innerleaps werkt met organisaties. Vaak betaalt het bedrijf uit het leerbudget, soms de helft, en de andere helft gaat van je persoonlijke budget. De makkelijkste eerste stap is een gratis masterclass voor je team. Een uur, en daarna beslist iedereen zelf. |

### 3.9 FAQ

De oude FAQ ging deels over organisaties ("Wat levert een traject op?") en had
een prestatievraag met het 24%-cijfer. Die vallen weg. Wat overblijft, beantwoordt
de bezwaren uit het document.

| Engels | Nederlands |
|---|---|
| **Is this woolly?** No. You do short exercises with your attention and your breathing, in a quiet spot. You don't have to believe in anything. | **Is het zweverig?** Nee. Je doet korte oefeningen met je aandacht en je adem, op een rustige plek. Je hoeft nergens in te geloven. |
| **Do I have to talk about myself in the group?** No. The trainer asks questions and you can respond. What you share is up to you. | **Moet ik in de groep over mezelf praten?** Nee. De trainer stelt vragen en je kunt reageren. Wat je deelt, bepaal je zelf. |
| **Does my employer see how I'm doing?** No. If we measure the effect, your employer only sees the results for the whole group. *(Optie B begint met: "What you say in the group stays in the group.")* | **Ziet mijn werkgever hoe het met mij gaat?** Nee. Als we het effect meten, ziet je werkgever alleen de cijfers van de hele groep. *(Optie B begint met: "Wat je in de groep vertelt, blijft in de groep.")* |
| **How much time does it really take?** One hour a week for the live session, and about fifteen minutes of practice, five days a week. Some of it you do during things you already do, like making coffee. | **Hoeveel tijd kost het echt?** Een uur per week voor de live sessie, en zo'n kwartier oefenen, vijf dagen per week. Een deel doe je tijdens dingen die je toch al doet, zoals koffie zetten. |
| **I tried an app and stopped. Why would this be different?** Almost everyone stops using an app. After a month, about 4 in 100 still use it. Here you practise for six weeks with a fixed group and a trainer, and you learn to practise when you feel tension. That's what turns it into a habit. | **Ik heb een app geprobeerd en ben gestopt. Waarom zou dit anders zijn?** Bijna iedereen stopt met een app. Na een maand gebruiken nog zo'n 4 op de 100 mensen hem. Hier oefen je zes weken met een vaste groep en een trainer, en leer je oefenen op het moment dat je spanning voelt. Zo wordt het een gewoonte. |
| **What if I miss a week?** Call or email the trainer and you'll hear what you missed. Everything is in the workbook too. Try not to miss more than one session. | **Wat als ik een week mis?** Bel of mail de trainer, dan hoor je wat je gemist hebt. Alles staat ook in het werkboek. Mis liever niet meer dan één sessie. |
| **Is it online?** Usually, yes. No travel time, and you can join from home or the office. On location is possible too. | **Is het online?** Meestal wel. Geen reistijd, en je doet mee vanuit huis of kantoor. Op locatie kan ook. |
| **How do I get it paid for?** Ask your manager or HR. Many companies pay from the learning budget. Send them this page, or request a free masterclass together. | **Hoe krijg ik het vergoed?** Vraag het aan je leidinggevende of HR. Veel bedrijven betalen het uit het leerbudget. Stuur ze deze pagina, of vraag samen een gratis masterclass aan. |
| **What is it based on?** *(de gecorrigeerde tekst van branch `onderzoeksclaims`, ingekort)* | **Waar is het op gebaseerd?** *(idem)* |

De app-vraag gebruikt het 4%-cijfer van home (Baumel et al., 2019). "Op locatie
kan ook" staat erin omdat het offerteformulier die keuze geeft. De huidige FAQ
zegt dat alles online is.

### 3.10 Meta

**Title** (Google toont er zo'n 60 tekens van)

| | Engels | Nederlands |
|---|---|---|
| **A (aanbevolen)** | Attention training for employees: focus and calm \| Innerleaps | Aandachttraining voor medewerkers: focus en rust \| Innerleaps |
| B | More focus, less noise in your head \| Innerleaps | Meer focus, minder ruis in je hoofd \| Innerleaps |
| C | Stress management training for employees \| Innerleaps | Stressmanagement training voor medewerkers \| Innerleaps |

C houdt de zoekterm in de URL vast. Die term is nooit gemeten, dus er valt niets
over het volume te zeggen.

**Description**

| | Engels | Nederlands |
|---|---|---|
| **A (aanbevolen)** | Six weeks of attention training in a small live group. Notice tension sooner and get your focus back faster. About fifteen minutes a day. | Zes weken aandachttraining in een kleine live groep. Zie spanning eerder aankomen en haal je focus sneller terug. Zo'n kwartier per dag. |
| B | 68% of participants at TheyDo noticed less stress and tension. Six weeks, a small live group, fifteen minutes of practice a day. | 68% van de deelnemers bij TheyDo merkte minder stress en spanning. Zes weken, een kleine live groep, een kwartier oefenen per dag. |

### 3.11 Menu en footer

- Menu: "Voor Medewerkers" wordt een gewone link, zonder uitklap. Tekst blijft.
- Footer: de twee links "Stressmanagement" en "Focus & prestaties" worden één
  link. Voorstel: "Voor medewerkers" / "For employees", gelijk aan het menu.

### 3.12 De mail achter de knop

De knop opent het mailprogramma van de bezoeker, met onderwerp en tekst al
ingevuld. De ontvanger vult hij zelf in. Er gaat niets via Innerleaps, dus ook
geen testmail bij het proberen. De link in de mail wijst naar deze pagina.

**Onderwerp**

| | Engels | Nederlands |
|---|---|---|
| **A (aanbevolen)** | An idea for our team: attention training | Idee voor ons team: aandachttraining |
| B | Could we do this training? | Kunnen we deze training doen? |

**Tekst**

Optie A (aanbevolen), zakelijk en compleet:

| Engels | Nederlands |
|---|---|
| Hi,<br><br>I came across this training and I think our team would get something out of it. Six weeks, one hour a week during working hours, in a small group. It's about keeping your focus and noticing tension sooner.<br><br>Would you take a look? There's a free one-hour masterclass to try it first.<br><br>[link] | Hoi,<br><br>Ik kwam deze training tegen en denk dat ons team er iets aan heeft. Zes weken, een uur per week binnen werktijd, in een kleine groep. Het gaat over focus houden en spanning eerder zien aankomen.<br><br>Wil je ernaar kijken? Er is een gratis masterclass van een uur om het eerst te proberen.<br><br>[link] |

Optie B, kort en persoonlijk:

| Engels | Nederlands |
|---|---|
| Hi,<br><br>I'd like to do this training, and I think some colleagues would too. Could we look at whether it fits the learning budget?<br><br>This is what it is: [link] | Hoi,<br><br>Ik zou deze training graag doen, en ik denk dat een paar collega's ook willen. Kunnen we kijken of het uit het leerbudget kan?<br><br>Hier staat wat het is: [link] |

A geeft de ontvanger alles om te kunnen antwoorden, zonder dat de afzender iets
over zichzelf hoeft te zeggen. B is eerlijker over de vraag, maar legt meer bij
de afzender neer.

---

## 4. Techniek (mag ik zelf, ter informatie)

- `/stressmanagement-training` en `/en/stress-management-training` blijven.
  `/prestatie-training` en `/en/performance-training` krijgen een 301 daarheen.
  Ook `/prestatie-programma` wijst dan rechtstreeks naar het nieuwe doel, anders
  ontstaat er een keten.
- Een klik op de mailknop gaat als `employer_mail_click` naar de dataLayer, net
  als de offerteknop. Zodra GTM er staat, is dat te meten.
- **Gevonden:** `/stressmanagement-programma` geeft live een 404. Die had 135
  vertoningen in Search Console. Hij krijgt een 301 naar de nieuwe pagina.
- Sitemap, `ROUTE_MAP`, `App.tsx`, menu en footer worden bijgewerkt.
- De zwevende balk "Offerte aanvragen" staat op deze pagina's uit. Voorstel: uit
  laten, want een offerte is voor een medewerker een stap te ver.

## 5. Twee dingen buiten de pagina

- De pagina belooft een trainer die je meeneemt. Vier deelnemers noemden juist de
  ingesproken oefeningen het zwakste deel ("klonken erg corporate en monotoon").
  Hoe beter de pagina de verwachting zet, hoe meer dat gaat opvallen.
- De lage scores (5 en 6) komen van mensen met veel ervaring met zulke
  oefeningen. De pagina spreekt bewust beginners aan ("je hoeft niet te weten waar
  je begint"). Dat is een keuze, geen bijzaak.

## 6. Nog open

1. **Week 5.** De stresspagina heeft "Stressherstel door vriendelijkheid", de
   prestatiepagina "Beter samenwerken door bewust luisteren". Welke zit er in
   het programma?
2. **Citaten.** Mogen de Nederlandse citaten met "deelnemer bij NRC" erbij, of
   anoniem ("deelnemer bij een mediaorganisatie")? En mag Wineke met naam in het
   citaat over de groep blijven staan?
3. **Kaart "Energie over".** Daar is geen Nederlands citaat voor. Kiezen tussen
   het Engelse citaat van TheyDo laten staan, het vertalen met "(vertaald)"
   erbij, of die kaart zonder citaat.
4. **Per blok een optie kiezen** in §3, of zelf iets typen.

## 7. Feedback van Bas, 20-10-2026 (ronde 4)

- **App-blok**: kop optie D, "Weten is makkelijk. <0>Volhouden</0> niet." Intro
  van Bas, met Headspace en Insight Timer en de workshop erbij.
- **Kaarten**: nieuwe teksten van Bas voor focus, pauze en aanwezigheid. De
  koppen staan per rij gelijk (korte koppen boven, lange onder, en de opmaak
  houdt ze ook op andere breedtes gelijk).
- **Wie doet mee**: plus "Ze hebben allemaal al meegedaan aan onze trainingen."
- **Groep**: TheyDo en de 9,3 uit de tekst. Tweede quote erbij, op de
  Nederlandse pagina vertaald: "Ze heeft het heel goed gedaan. Ik was erg blij
  met de training en de inhoud." (TheyDo).
- **Mailknop**: venster met de mail en vier knoppen (Gmail, Outlook,
  mailprogramma, kopiëren; na kopiëren "Gekopieerd"). De mailto-link alleen
  werkte niet bij webmail.
- **Masterclassknop** weg op deze pagina; alleen de mailknop blijft.
- **"Is het zweverig?"**: optie A, "Nee, het is juist heel concreet. Je leert
  korte oefeningen die je meteen op je werk gebruikt, en je hoeft nergens in te
  geloven." Niet "100% wetenschappelijk onderbouwd": dat kan niemand hard maken,
  en de nadruk op wetenschap maakte deelnemers juist sceptisch.

## 8. Feedback van Bas, 20-10-2026 (ronde 5)

- **Kop**: "Voor wie een hoop <0>ballen in de lucht</0> houdt" (EN "For people who
  <0>carry a lot</0>"). Het stuk "Niet voor mensen die te gespannen zijn" is eruit.
- **Mail** in de woorden van Bas, onderwerp "Iets voor ons?". Rechtgezet:
  "aandachttraining" zonder s (de vaste naam), "stressmanagement" aan elkaar,
  "masterclass" met kleine letter, "team- of bedrijfsmoment".
- **Link in de mail** wijst naar de homepage, de pagina voor organisaties. Een
  klikbaar woord kan niet in een mail die via een link wordt aangemaakt; het
  adres staat daarom tussen haakjes achter "Innerleaps".

