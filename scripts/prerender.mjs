/**
 * Zet na de build van elke pagina een echt HTML-bestand neer.
 *
 * Waarom: de site is een single page app. Zonder dit stuurt de server voor
 * elke URL dezelfde lege index.html terug, en bouwt JavaScript de pagina pas
 * in de browser op. Crawlers die geen JavaScript draaien zien dan niets.
 * Gemeten op 21 augustus 2026: nul woorden voor GPTBot, PerplexityBot,
 * ClaudeBot en CCBot.
 *
 * Hoe: we starten een klein servertje op de gebouwde site, laten een echte
 * browser elke pagina bezoeken, en slaan op wat die browser uiteindelijk ziet.
 * Inclusief de titel en description die react-helmet-async per pagina zet.
 *
 * We doen dit met een echte browser en niet door de app in Node te renderen,
 * omdat de app daar niet op gebouwd is. Pagina's worden lazy geladen, de
 * router zit vast in App.tsx en er staat browsercode op moduleniveau. Een
 * echte browser heeft daar geen last van.
 *
 * Bezoekers merken er niets van. Zij krijgen dezelfde HTML, waarna React het
 * gewoon overneemt.
 */

import { createServer } from "node:http";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const PORT = 4321;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".pdf": "application/pdf",
};

/**
 * Leest de lijst met publieke pagina's uit src/i18n/config.ts. Dat bestand is
 * de enige plek waar alle NL- en EN-paden naast elkaar staan, dus dat houden
 * we aan. Zo hoeft niemand twee lijstjes bij te werken.
 */
async function collectRoutes() {
  const source = await readFile(join(ROOT, "src/i18n/config.ts"), "utf8");
  const block = source.match(/ROUTE_MAP[^=]*=\s*\[([\s\S]*?)\n\];/);
  if (!block) {
    throw new Error("ROUTE_MAP niet gevonden in src/i18n/config.ts");
  }

  const routes = new Set();
  for (const [, lang, path] of block[1].matchAll(
    /(nl|en)\s*:\s*"([^"]+)"/g,
  )) {
    void lang;
    routes.add(path);
  }

  if (routes.size === 0) {
    throw new Error("ROUTE_MAP gevonden maar er stonden geen paden in");
  }
  return [...routes].sort();
}

function startServer() {
  const server = createServer(async (req, res) => {
    const url = decodeURIComponent((req.url ?? "/").split("?")[0]);
    let file = join(DIST, url);

    if (!extname(file)) file = join(DIST, "index.html");
    if (!existsSync(file)) file = join(DIST, "index.html");

    try {
      const body = await readFile(file);
      res.writeHead(200, {
        "Content-Type": MIME[extname(file)] ?? "application/octet-stream",
      });
      res.end(body);
    } catch {
      res.writeHead(404).end("not found");
    }
  });
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

/**
 * Waar komt het bestand voor deze route terecht?
 *
 * Let op: `/vitaliteitstraining.html` en niet `/vitaliteitstraining/index.html`.
 * Bij die tweede vorm zet Netlify er een schuine streep achter en stuurt hij
 * `/vitaliteitstraining` met een 301 door naar `/vitaliteitstraining/`. Dat
 * botst met de canonical en de sitemap, die de versie zonder streep noemen,
 * en het kost elke bezoeker een extra omleiding. Met een plat .html-bestand
 * serveert Netlify de pagina direct met een 200.
 */
function targetFile(route) {
  return route === "/"
    ? join(DIST, "index.html")
    : join(DIST, `${route.replace(/^\//, "")}.html`);
}

async function main() {
  if (!existsSync(join(DIST, "index.html"))) {
    throw new Error("dist/index.html ontbreekt. Draai eerst 'vite build'.");
  }

  const routes = await collectRoutes();
  const server = await startServer();
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });

  const failures = [];
  let done = 0;

  try {
    for (const route of routes) {
      const page = await browser.newPage();
      try {
        await page.goto(`http://localhost:${PORT}${route}`, {
          waitUntil: "networkidle2",
          timeout: 45000,
        });

        // Wacht tot React echt iets heeft neergezet. Zonder deze check zou
        // een lege pagina er als een geslaagde prerender uitzien.
        await page.waitForFunction(
          () => {
            const root = document.getElementById("root");
            return root && root.innerText.trim().length > 200;
          },
          { timeout: 20000 },
        );

        const html = await page.evaluate(
          () => "<!DOCTYPE html>\n" + document.documentElement.outerHTML,
        );
        const words = await page.evaluate(
          () => document.body.innerText.trim().split(/\s+/).length,
        );
        const title = await page.title();

        const out = targetFile(route);
        await mkdir(dirname(out), { recursive: true });
        await writeFile(out, html, "utf8");

        done += 1;
        console.log(
          `  ${String(words).padStart(5)} woorden  ${route.padEnd(45)} ${title}`,
        );
      } catch (error) {
        failures.push({ route, message: error.message });
        console.error(`  MISLUKT  ${route}: ${error.message}`);
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
    server.close();
  }

  console.log(`\n${done} van ${routes.length} pagina's vastgelegd.`);

  if (failures.length > 0) {
    console.error("\nDeze pagina's zijn niet gelukt:");
    for (const f of failures) console.error(`  ${f.route}: ${f.message}`);
    // Laat de build klappen. Half geprerenderd is erger dan niet, want dan
    // denk je dat het werkt terwijl de helft leeg is.
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Prerender mislukt:", error);
  process.exit(1);
});
