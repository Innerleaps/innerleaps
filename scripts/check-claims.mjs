#!/usr/bin/env node
/**
 * Controleert het claimregister en zoekt cijfers en beloftewoorden die er niet
 * in staan. Draait vóór elke build (package.json). Zie CLAIMS.md.
 *
 * Wat het doet:
 *  1. Elke bron in src/content/claims.json heeft alle verplichte velden.
 *     Eigen meting: omschrijving, naam, n, methode, periode.
 *     Externe studie: auteur, jaar, studyType, sourceUrl, titel.
 *  2. Elke claim wijst naar een bestaande bron, en elke sleutel en elk bestand
 *     dat hij noemt, bestaat ook echt.
 *  3. Elk percentage, "x op de 10", "23x" en elk beloftewoord ("bewezen",
 *     "gegarandeerd", "aantoonbaar") in de vertaalbestanden en de code staat
 *     onder een geregistreerde claim of op de allowlist.
 *  4. Een cijfer in lopende tekst heeft zijn bron zichtbaar in de zin, gemarkeerd
 *     als <bron>...</bron> (of <1>...</1> in een tekst met opmaak). Zie Bron.tsx.
 *  5. Een controle ouder dan 12 maanden geeft een waarschuwing.
 *
 * Streng of mild:
 *  - Op Netlify in productie (CONTEXT=production) of met CLAIMS_STRIKT=1 falen
 *    plaatshouders, rode claims en niet-goedgekeurde uitzonderingen de build.
 *    Zo kan er niets live dat niet klopt.
 *  - Op een branch-deploy en lokaal zijn het waarschuwingen, zodat je een
 *    voorvertoning met [plaatshouders] kunt bekijken.
 *  - Een cijfer of beloftewoord dat nergens geregistreerd staat, faalt altijd.
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const STRIKT = process.env.CONTEXT === "production" || process.env.CLAIMS_STRIKT === "1";

const register = JSON.parse(readFileSync(join(ROOT, "src/content/claims.json"), "utf8"));
const allowlist = JSON.parse(readFileSync(join(ROOT, "src/content/claims-allowlist.json"), "utf8"));

const fouten = [];
const waarschuwingen = [];
const fout = (m) => fouten.push(m);
const waarschuw = (m) => waarschuwingen.push(m);
/** Fout in productie, waarschuwing op een branch. */
const blokkeert = (m) => (STRIKT ? fout(m) : waarschuw(m));

const TALEN = ["nl", "en"];
const PLAATSHOUDER = /\[[^\]]+\]/;
const isTekst = (v) => v && typeof v === "object" && TALEN.every((t) => typeof v[t] === "string" && v[t].trim());
const heeftPlaatshouder = (v) => PLAATSHOUDER.test(JSON.stringify(v ?? ""));

// ---------------------------------------------------------------- 1. bronnen

const VELDEN = {
  own: { omschrijving: isTekst, naam: (v) => typeof v === "string" && v, n: (v) => v !== null && v !== undefined, methode: isTekst, periode: isTekst },
  external: {
    auteur: isTekst,
    jaar: (v) => v !== null && v !== undefined,
    studyType: isTekst,
    sourceUrl: (v) => typeof v === "string" && /^https?:\/\//.test(v),
    titel: (v) => typeof v === "string" && v,
  },
};

/** Per bron: ontbreekt er iets? Leeg betekent compleet. */
const onvolledig = {};
for (const [id, bron] of Object.entries(register.bronnen)) {
  if (!["own", "external", "unknown", "rood"].includes(bron.type)) {
    fout(`Bron "${id}": type moet own, external, unknown of rood zijn, niet "${bron.type}"`);
    continue;
  }
  const missend = [];
  for (const [veld, ok] of Object.entries(VELDEN[bron.type] ?? {})) {
    if (!ok(bron[veld])) missend.push(veld);
    else if (heeftPlaatshouder(bron[veld])) missend.push(`${veld} (plaatshouder)`);
  }
  if (bron.type === "unknown") missend.push("bron onbekend");
  if (bron.type === "rood") missend.push("rode claim");
  if (["own", "external"].includes(bron.type) && !bron.lastVerified) missend.push("lastVerified");
  onvolledig[id] = missend;

  if (bron.lastVerified) {
    const dagen = (Date.now() - new Date(bron.lastVerified).getTime()) / 86_400_000;
    if (Number.isNaN(dagen)) fout(`Bron "${id}": lastVerified "${bron.lastVerified}" is geen datum (JJJJ-MM-DD)`);
    else if (dagen > 365) waarschuw(`Bron "${id}" is voor het laatst gecontroleerd op ${bron.lastVerified}, meer dan 12 maanden geleden. Opnieuw controleren.`);
  }
}

// ---------------------------------------------------------------- 2. claims

const laadLocale = (taal, ns) => {
  const pad = join(ROOT, "src/i18n/locales", taal, `${ns}.json`);
  return existsSync(pad) ? JSON.parse(readFileSync(pad, "utf8")) : null;
};
const zoek = (obj, pad) => {
  let o = obj;
  for (const deel of pad.match(/[^.[\]]+|\[\d+\]/g) ?? []) {
    if (o === undefined || o === null) return undefined;
    o = deel.startsWith("[") ? o[Number(deel.slice(1, -1))] : o[deel];
  }
  return o;
};

const STATUSSEN = ["online", "placeholder", "keuze", "rood"];
const geregistreerdeSleutels = new Map(); // sleutel -> claim-ids
const geregistreerdeBestanden = new Map();

for (const [id, claim] of Object.entries(register.claims)) {
  if (!["A", "B", "C", "F"].includes(claim.soort)) fout(`Claim "${id}": soort moet A, B, C of F zijn`);
  if (!STATUSSEN.includes(claim.status)) fout(`Claim "${id}": status moet ${STATUSSEN.join(", ")} zijn`);

  if (["A", "B", "F"].includes(claim.soort)) {
    const bron = register.bronnen[claim.bron];
    if (!bron) fout(`Claim "${id}": bron "${claim.bron}" staat niet in het register`);
    else {
      if (claim.soort === "A" && bron.type !== "own") fout(`Claim "${id}" is soort A (eigen meting), maar de bron is ${bron.type}`);
      if (claim.soort === "B" && bron.type === "own") fout(`Claim "${id}" is soort B (extern), maar de bron is een eigen meting`);
      const missend = onvolledig[claim.bron] ?? [];
      if (missend.length && claim.status === "online")
        fout(`Claim "${id}" staat op online, maar bron "${claim.bron}" mist: ${missend.join(", ")}`);
    }
    if (claim.waarde && !isTekst(claim.waarde)) fout(`Claim "${id}": waarde moet een nl- en en-tekst hebben`);
  }

  const reden = (claim.ontbreekt ?? []).join("; ");
  if (claim.status === "placeholder") blokkeert(`Claim "${id}" heeft nog plaatshouders. ${reden}`);
  if (claim.status === "rood") blokkeert(`Claim "${id}" is rood en staat nog op de site. ${reden}`);
  if (claim.status === "keuze") waarschuw(`Claim "${id}" wacht op een keuze van Bas. ${reden}`);

  for (const sleutel of claim.sleutels ?? []) {
    const [ns, pad] = sleutel.split(":");
    for (const taal of TALEN) {
      const locale = laadLocale(taal, ns);
      if (!locale || zoek(locale, pad) === undefined) fout(`Claim "${id}": sleutel "${sleutel}" bestaat niet in ${taal}/${ns}.json`);
    }
    geregistreerdeSleutels.set(sleutel, [...(geregistreerdeSleutels.get(sleutel) ?? []), id]);
  }
  for (const bestand of claim.bestanden ?? []) {
    if (!existsSync(join(ROOT, bestand))) fout(`Claim "${id}": bestand "${bestand}" bestaat niet`);
    geregistreerdeBestanden.set(bestand, id);
  }
}

for (const lijst of [allowlist.sleutels, allowlist.bestanden]) {
  for (const regel of lijst) {
    if (!regel.reden) fout(`Allowlist: "${regel.sleutel ?? regel.bestand}" heeft geen reden`);
    if (!regel.goedgekeurdDoor)
      blokkeert(`Allowlist: "${regel.sleutel ?? regel.bestand}" is nog niet goedgekeurd door Bas (${regel.reden})`);
  }
}

// ---------------------------------------------------------------- 3. zoeken

const PATRONEN = [
  [/(?<![\w.,[-])\d+(?:[.,]\d+)?\s?%(?![\]_\w])/, "percentage"],
  [/\b\d+\s?op de\s?\d+\b/i, "x op de 10"],
  [/\b\d+ in \d+\b/, "x in 10"],
  [/\b\d+(?:[.,]\d+)?x\b/, "x keer"],
  [/garande|gegarandeerd|garantie|guarante|bewezen|\bproven\b|aantoonba|demonstrab/i, "beloftewoord"],
];
const vind = (tekst) => PATRONEN.filter(([re]) => re.test(tekst)).map(([, naam]) => naam);

const valtOnder = (sleutel, lijst) =>
  [...lijst].some((s) => sleutel === s || sleutel.startsWith(`${s}.`) || sleutel.startsWith(`${s}[`));
const toegestaneSleutels = allowlist.sleutels.map((r) => r.sleutel);

const loop = (o, pad, cb) => {
  if (typeof o === "string") cb(pad, o);
  else if (Array.isArray(o)) o.forEach((v, i) => loop(v, `${pad}[${i}]`, cb));
  else if (o && typeof o === "object") for (const [k, v] of Object.entries(o)) loop(v, pad ? `${pad}.${k}` : k, cb);
};

for (const bestand of readdirSync(join(ROOT, "src/i18n/locales/nl"))) {
  const ns = bestand.replace(/\.json$/, "");
  for (const taal of TALEN) {
    const locale = laadLocale(taal, ns);
    if (!locale) continue;
    loop(locale, "", (pad, tekst) => {
      const gevonden = vind(tekst);
      if (!gevonden.length) return;
      const sleutel = `${ns}:${pad}`;
      if (valtOnder(sleutel, toegestaneSleutels)) return;
      // Een cijfer moet onder een claim met bron vallen (A, B of F). Een
      // beloftewoord mag ook onder een geregistreerde belofte (C) vallen.
      const claims = [...geregistreerdeSleutels].filter(([s]) => valtOnder(sleutel, [s])).flatMap(([, ids]) => ids.map((id) => register.claims[id]));
      const metBron = claims.some((c) => c.soort !== "C");
      const cijfers = gevonden.filter((g) => g !== "beloftewoord");
      if (cijfers.length && !metBron) fout(`${taal}/${ns}.json ${pad}: ${cijfers.join(", ")} zonder claim met bron: "${tekst.slice(0, 90)}"`);
      // Een cijfer in lopende tekst krijgt zijn bron zichtbaar in de zin:
      // "<bron>Bij TheyDo</bron> deed 42% mee" of "... stress <bron></bron>."
      // Niet nodig in meta-teksten (daar kan geen opmaak in), in citaten (naam
      // en bedrijf staan eronder) en bij korte labels (daar zet de code de bron
      // eronder, zie StatClaim).
      const lopendeTekst = tekst.split(/\s+/).length >= 6;
      // De methodepagina is zelf de verantwoording; daar hoeft geen bron.
      const uitgezonderd = ns === "meten" || /(^|\.)(meta|seo)(\.|$)|quote$/.test(pad);
      const rood = claims.every((c) => c.status === "rood");
      if (cijfers.length && metBron && /\d%?\*/.test(tekst))
        fout(`${taal}/${ns}.json ${pad}: sterretje achter een cijfer. Sinds 31-10-2026 staat de bron in de zin: <bron>...</bron>. "${tekst.slice(0, 90)}"`);
      else if (cijfers.length && metBron && lopendeTekst && !uitgezonderd && !rood && !/<bron|<1>/.test(tekst))
        fout(`${taal}/${ns}.json ${pad}: cijfer zonder zichtbare bron. Markeer de bron in de zin met <bron>...</bron>, of laat hem leeg voor "(Auteur, jaar)": "${tekst.slice(0, 90)}"`);
      else if (!cijfers.length && !claims.length) fout(`${taal}/${ns}.json ${pad}: beloftewoord zonder claim in het register: "${tekst.slice(0, 90)}"`);
    });
  }
}

/** Bestanden die als geheel op de allowlist of in het register staan. */
const bestandOk = (pad) =>
  geregistreerdeBestanden.has(pad) ||
  allowlist.bestanden.some(
    (r) => !r.bevat && (r.bestand.endsWith("/*") ? pad.startsWith(r.bestand.slice(0, -1)) : r.bestand === pad),
  );

const codebestanden = (map) =>
  readdirSync(map).flatMap((naam) => {
    const pad = join(map, naam);
    if (statSync(pad).isDirectory()) return naam === "ui" || naam === "locales" ? [] : codebestanden(pad);
    return /\.(tsx?|mjs)$/.test(naam) ? [pad] : [];
  });

/**
 * Teksten in de code: strings en JSX-tekst, zonder commentaar en zonder
 * opmaak. Over het hele bestand, want JSX-tekst staat vaak op een eigen regel
 * tussen twee tags.
 */
const teksten = (bron) => {
  const schoon = bron
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1")
    // Opmaak is geen tekst: Tailwind-klassen en stijlen bevatten ook procenten.
    .replace(/\b(className|objectPosition|style|sizes|srcSet|viewBox|d)=("[^"]*"|\{`[^`]*`\}|\{\{[^}]*\}\}|\{"[^"]*"\})/g, "");
  const uit = [];
  for (const m of schoon.matchAll(/"((?:[^"\\\n]|\\.)*)"|'((?:[^'\\\n]|\\.)*)'|`((?:[^`\\]|\\.)*)`|>([^<>{}=;()]+)</g))
    uit.push(m[1] ?? m[2] ?? m[3] ?? m[4]);
  return uit;
};

/** Een vondst in de code mag als het bestand, of dat ene stukje tekst, op de allowlist staat. */
const tekstOk = (pad, tekst) =>
  allowlist.bestanden.some((r) => r.bevat && r.bestand === pad && tekst.includes(r.bevat));

for (const pad of codebestanden(join(ROOT, "src"))) {
  const rel = relative(ROOT, pad);
  if (rel === "src/lib/claims.ts" || bestandOk(rel)) continue;
  for (const tekst of teksten(readFileSync(pad, "utf8"))) {
    const gevonden = vind(tekst);
    if (gevonden.length && !tekstOk(rel, tekst)) fout(`${rel}: ${gevonden.join(", ")} zonder claim in het register: "${tekst.trim().slice(0, 90)}"`);
  }
}

// ---------------------------------------------------------------- uitslag

const kop = STRIKT ? "streng (productie)" : "mild (branch of lokaal)";
console.log(`\nClaimcontrole, ${kop}: ${Object.keys(register.claims).length} claims, ${Object.keys(register.bronnen).length} bronnen`);
if (waarschuwingen.length) {
  console.log(`\n${waarschuwingen.length} waarschuwing(en):`);
  for (const w of waarschuwingen) console.log(`  - ${w}`);
}
if (fouten.length) {
  console.error(`\n${fouten.length} fout(en). Zie CLAIMS.md voor hoe je een cijfer registreert:`);
  for (const f of fouten) console.error(`  x ${f}`);
  process.exit(1);
}
console.log("\nGeen fouten.\n");
