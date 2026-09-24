/**
 * Dev-only "copy editor": klik een stuk tekst aan in de localhost-preview,
 * pas hem aan, en de andere taal wordt automatisch voorvertaald zodat je hem
 * alleen nog handmatig hoeft bij te schaven. Zie MEMORY / CLAUDE.md voor de
 * regel dat zichtbare tekst altijd eerst langs de gebruiker gaat: dit is dus
 * precies dat scherm, alleen in de pagina zelf in plaats van in de chat.
 *
 * Twee delen:
 *  1. Een `transform` die in `npm run dev` elke `{t('pad.naar.tekst')}` die
 *     los als JSX-kind staat vervangt door een variant die het element
 *     klikbaar maakt (zie src/dev/copyEditorRuntime.tsx). Draait nooit tijdens
 *     `npm run build` (apply: 'serve'), dus productie blijft ongemoeid.
 *  2. Twee dev-middlewares: één die een tekst voorvertaalt (MyMemory, gratis,
 *     geen API-key nodig) en corrigeert met de vertaalwoordenlijst en de
 *     Brits-Engelse spelling, en één die de uiteindelijke tekst wegschrijft
 *     naar de juiste plek in de juiste JSON-bestanden.
 */
import fs from "node:fs";
import path from "node:path";
import type { Plugin, ViteDevServer } from "vite";

const LOCALES_DIR = (root: string) => path.join(root, "src/i18n/locales");
const GLOSSARY_PATH = (root: string) => path.join(root, "docs/translation-glossary.md");

const NS_RE = /useTranslation\(\s*(?:(['"])([a-zA-Z]+)\1)?\s*\)/;
// Matcht een los-staande `{t(...)}` JSX-expressie met precies één argument
// (een string- of template-literal, geen komma erin), en niet wanneer hij
// direct na een `=` staat (dat is een attribuut zoals alt={t('x')}).
const T_CHILD_RE = /(?<!=)\{t\((`[^`]*`|'[^']*'|"[^"]*")\)\}/g;

function setAtPath(obj: Record<string, unknown>, keyPath: string, value: string) {
  const parts = keyPath.split(".");
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const next = cur[parts[i]];
    if (typeof next !== "object" || next === null) {
      throw new Error(`Onbekend pad "${keyPath}" (stopt bij "${parts[i]}")`);
    }
    cur = next as Record<string, unknown>;
  }
  const last = parts[parts.length - 1];
  if (!(last in cur)) {
    throw new Error(`Onbekende sleutel "${keyPath}"`);
  }
  cur[last] = value;
}

function writeLocaleValue(root: string, lang: "nl" | "en", ns: string, keyPath: string, value: string) {
  const file = path.join(LOCALES_DIR(root), lang, `${ns}.json`);
  const raw = fs.readFileSync(file, "utf-8");
  const json = JSON.parse(raw);
  setAtPath(json, keyPath, value);
  fs.writeFileSync(file, JSON.stringify(json, null, 2) + "\n");
}

function readLocaleValue(root: string, lang: "nl" | "en", ns: string, keyPath: string): string | undefined {
  const file = path.join(LOCALES_DIR(root), lang, `${ns}.json`);
  const json = JSON.parse(fs.readFileSync(file, "utf-8"));
  const parts = keyPath.split(".");
  let cur: unknown = json;
  for (const part of parts) {
    if (typeof cur !== "object" || cur === null) return undefined;
    cur = (cur as Record<string, unknown>)[part];
  }
  return typeof cur === "string" ? cur : undefined;
}

const NAMESPACES = ["common", "methode", "overons", "contact", "training", "calculator", "leadMagnet", "bedankt"];

function collectStringPaths(obj: unknown, prefix: string, out: Map<string, string>) {
  if (typeof obj === "string") {
    out.set(prefix, obj);
    return;
  }
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => collectStringPaths(v, `${prefix}[${i}]`, out));
    return;
  }
  if (obj && typeof obj === "object") {
    for (const [k, v] of Object.entries(obj)) {
      collectStringPaths(v, prefix ? `${prefix}.${k}` : k, out);
    }
  }
}

/**
 * Zoekt of de OUDE tekst (voor het opslaan) letterlijk ergens anders ook al
 * stond, in dezelfde of een ander JSON-bestand. Dat dekt zowel de blokken die
 * bewust op meerdere pagina's hetzelfde JSON-pad gebruiken (menu, "Brein-
 * training voor échte gedragsverandering", de masterclass-kaarten) als de
 * "weken van het kernprogramma"-tekst, die per pagina een eigen sleutel heeft
 * maar deels letterlijk gedupliceerd is. Zie de tabel in CLAUDE.md.
 */
function findSharedOccurrences(root: string, lang: "nl" | "en", ns: string, keyPath: string, oldValue: string): string[] {
  const trimmed = oldValue.trim();
  if (trimmed.length < 12) return []; // te kort, te veel valse treffers ("Ja", "Lees meer")
  const hits: string[] = [];
  for (const otherNs of NAMESPACES) {
    const file = path.join(LOCALES_DIR(root), lang, `${otherNs}.json`);
    if (!fs.existsSync(file)) continue;
    const json = JSON.parse(fs.readFileSync(file, "utf-8"));
    const paths = new Map<string, string>();
    collectStringPaths(json, "", paths);
    for (const [p, v] of paths) {
      if (otherNs === ns && p === keyPath) continue;
      if (v.trim() === trimmed) hits.push(`${otherNs}.json: ${p}`);
    }
  }
  if (hits.length === 0) return [];
  return [
    `Deze tekst staat (voor het opslaan) letterlijk ook nog op: ${hits.join(", ")}. Check CLAUDE.md of dat blok ook moet meeveranderen.`,
  ];
}

let glossaryCache: { nlToEn: Map<string, string>; enToNl: Map<string, string> } | null = null;

function loadGlossary(root: string) {
  if (glossaryCache) return glossaryCache;
  const nlToEn = new Map<string, string>();
  const enToNl = new Map<string, string>();
  try {
    const text = fs.readFileSync(GLOSSARY_PATH(root), "utf-8");
    const rowRe = /^\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*$/gm;
    let match: RegExpExecArray | null;
    while ((match = rowRe.exec(text))) {
      const nl = match[1].replace(/\*\*/g, "").trim();
      const en = match[2].replace(/\*\*/g, "").trim();
      if (!nl || !en) continue;
      if (nl.toLowerCase() === "nederlands" || nl.startsWith("#") || nl.startsWith("-")) continue;
      if (nl.includes("(") && nl.length > 60) continue; // sla toelichtende rijen over
      nlToEn.set(nl.toLowerCase(), en);
      enToNl.set(en.toLowerCase(), nl);
    }
  } catch {
    // Geen glossary gevonden: gewoon zonder correcties verder.
  }
  glossaryCache = { nlToEn, enToNl };
  return glossaryCache;
}

function applyGlossary(text: string, direction: "nl-to-en" | "en-to-nl", root: string): string {
  const { nlToEn, enToNl } = loadGlossary(root);
  const map = direction === "nl-to-en" ? nlToEn : enToNl;
  let out = text;
  for (const [from, to] of map) {
    if (from.split(" ").length < 2 && from.length < 4) continue; // te kort, te veel valse treffers
    const re = new RegExp(`\\b${from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi");
    out = out.replace(re, to);
  }
  return out;
}

// Amerikaans -> Brits, zie de grep-controle in CLAUDE.md. "practice"/"practise"
// blijft bewust buiten deze lijst: dat onderscheid is zelfstandig
// naamwoord/werkwoord en niet blind te vervangen.
function britishize(text: string): string {
  let out = text;
  out = out.replace(/\borganiz/gi, (m) => (m[0] === "O" ? "Organis" : "organis"));
  out = out.replace(/\brecogniz/gi, (m) => (m[0] === "R" ? "Recognis" : "recognis"));
  out = out.replace(/\banalyz/gi, (m) => (m[0] === "A" ? "Analys" : "analys"));
  out = out.replace(/\bprogram(s)?\b/gi, (m) => {
    const cap = m[0] === "P";
    const plural = /s$/i.test(m);
    const base = cap ? "Programme" : "programme";
    return plural ? base + "s" : base;
  });
  out = out.replace(/\bcenter(s)?\b/gi, (m) => {
    const cap = m[0] === "C";
    const plural = /s$/i.test(m);
    const base = cap ? "Centre" : "centre";
    return plural ? base + "s" : base;
  });
  out = out.replace(/\bbehavior(s|al)?\b/gi, (m: string) => {
    const cap = m[0] === "B";
    const rest = m.slice(8); // na "behavior"
    const base = cap ? "Behaviour" : "behaviour";
    return base + rest;
  });
  out = out.replace(/\bcolor(s|ful|ed|ing)?\b/gi, (m: string) => {
    const cap = m[0] === "C";
    const rest = m.slice(5);
    const base = cap ? "Colour" : "colour";
    return base + rest;
  });
  return out;
}

function stripEmDash(text: string): string {
  return text.replace(/\s*—\s*/g, ", ");
}

export function copyEditorPlugin(): Plugin {
  const root = process.cwd();

  return {
    name: "copy-editor",
    apply: "serve", // nooit tijdens `npm run build`
    enforce: "pre", // vóór @vitejs/plugin-react-swc, anders is de JSX al gecompileerd

    transform(code, id) {
      if (!id.endsWith(".tsx") || id.includes("node_modules")) return null;
      if (!code.includes("useTranslation") || !code.includes("{t(")) return null;

      const nsMatch = code.match(NS_RE);
      const ns = nsMatch?.[2] || "common";

      let changed = false;
      const out = code.replace(T_CHILD_RE, (_m, argExpr: string) => {
        changed = true;
        return `{__copyEditorWrap(${JSON.stringify(ns)}, ${argExpr}, t(${argExpr}))}`;
      });
      if (!changed) return null;

      const withImport =
        `import { __copyEditorWrap } from "/src/dev/copyEditorRuntime.tsx";\n` + out;
      return { code: withImport, map: null };
    },

    configureServer(server: ViteDevServer) {
      server.middlewares.use("/__copy-editor/translate", async (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.end();
          return;
        }
        let body = "";
        req.on("data", (chunk) => (body += chunk));
        req.on("end", async () => {
          try {
            const { text, from, to } = JSON.parse(body) as { text: string; from: "nl" | "en"; to: "nl" | "en" };
            if (!text?.trim()) {
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ translation: "" }));
              return;
            }
            const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`;
            const r = await fetch(url);
            const data = (await r.json()) as { responseData?: { translatedText?: string } };
            let translation = data?.responseData?.translatedText ?? "";
            translation = applyGlossary(translation, from === "nl" ? "nl-to-en" : "en-to-nl", root);
            if (to === "en") translation = britishize(translation);
            translation = stripEmDash(translation);
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ translation }));
          } catch (e) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: String(e) }));
          }
        });
      });

      server.middlewares.use("/__copy-editor/save", (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.end();
          return;
        }
        let body = "";
        req.on("data", (chunk) => (body += chunk));
        req.on("end", () => {
          try {
            const { ns, key, nl, en } = JSON.parse(body) as {
              ns: string;
              key: string;
              nl: string;
              en: string;
            };
            const oldNl = readLocaleValue(root, "nl", ns, key) ?? "";
            const oldEn = readLocaleValue(root, "en", ns, key) ?? "";
            writeLocaleValue(root, "nl", ns, key, stripEmDash(nl));
            writeLocaleValue(root, "en", ns, key, stripEmDash(en));
            const shared = [
              ...new Set([
                ...findSharedOccurrences(root, "nl", ns, key, oldNl),
                ...findSharedOccurrences(root, "en", ns, key, oldEn),
              ]),
            ];
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ ok: true, shared }));
          } catch (e) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ ok: false, error: String(e) }));
          }
        });
      });

      server.middlewares.use("/__copy-editor/current", (req, res) => {
        try {
          const u = new URL(req.url ?? "", "http://localhost");
          const ns = u.searchParams.get("ns") ?? "";
          const key = u.searchParams.get("key") ?? "";
          const nl = readLocaleValue(root, "nl", ns, key) ?? "";
          const en = readLocaleValue(root, "en", ns, key) ?? "";
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ nl, en }));
        } catch (e) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: String(e) }));
        }
      });
    },
  };
}
