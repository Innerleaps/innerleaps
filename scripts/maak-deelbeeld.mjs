#!/usr/bin/env node
/**
 * Maakt de deelplaatjes van de klantcase opnieuw uit de HTML in docs/deelbeeld/.
 * Dat zijn de voorbeeldjes die LinkedIn en WhatsApp tonen bij een gedeelde link
 * (1200 bij 630, PNG; zie CLAUDE.md over afbeeldingen).
 *
 * Staat er een cijfer op, dan staat de bron er klein onder: een sterretje kun
 * je in een plaatje niet aanklikken. Zie CLAIMS.md.
 *
 *   node scripts/maak-deelbeeld.mjs
 */
import puppeteer from "puppeteer";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = new URL("..", import.meta.url).pathname;
const PAREN = [
  ["docs/deelbeeld/klantcase-theydo-nl.html", "public/social/klantcase-theydo-nl.png"],
  ["docs/deelbeeld/klantcase-theydo-en.html", "public/social/klantcase-theydo-en.png"],
];

const browser = await puppeteer.launch({ args: ["--no-sandbox", "--allow-file-access-from-files"] });
try {
  for (const [bron, doel] of PAREN) {
    const pagina = await browser.newPage();
    await pagina.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
    await pagina.goto(pathToFileURL(join(ROOT, bron)).href, { waitUntil: "networkidle0" });
    await pagina.evaluate(() => document.fonts.ready);
    await pagina.screenshot({ path: join(ROOT, doel), clip: { x: 0, y: 0, width: 1200, height: 630 } });
    await pagina.close();
    console.log(`${doel} gemaakt`);
  }
} finally {
  await browser.close();
}
