#!/usr/bin/env node
/**
 * Maakt de business-case-PDF's opnieuw uit de HTML in docs/business-case/.
 *
 * Sinds 29 oktober 2026 staan daarin alleen cijfers die letterlijk in een
 * studie staan, met bron (keuze van Bas). Pas je een cijfer aan, doe dat dan
 * eerst in het claimregister (CLAIMS.md) en draai daarna dit script:
 *
 *   node scripts/maak-business-case-pdf.mjs
 *
 * Het Engelse bestand staat op het oude adres, zodat bestaande links naar de
 * nieuwe versie gaan. Draait niet tijdens de Netlify-build.
 */
import puppeteer from "puppeteer";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = new URL("..", import.meta.url).pathname;
const PAREN = [
  ["docs/business-case/business-case-en.html", "public/documents/business-case-awareness-interventions.pdf"],
  ["docs/business-case/business-case-nl.html", "public/documents/business-case-aandachttraining.pdf"],
];

const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
try {
  for (const [bron, doel] of PAREN) {
    const pagina = await browser.newPage();
    await pagina.goto(pathToFileURL(join(ROOT, bron)).href, { waitUntil: "load" });
    await pagina.pdf({ path: join(ROOT, doel), format: "A4", printBackground: true, preferCSSPageSize: true });
    await pagina.close();
    console.log(`${doel} gemaakt`);
  }
} finally {
  await browser.close();
}
