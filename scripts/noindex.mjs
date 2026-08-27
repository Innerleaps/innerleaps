// Zet een branch-deploy of deploy preview op slot voor zoekmachines.
//
// Waarom dit bestaat: Netlify voegt zelf een `X-Robots-Tag: noindex` toe aan
// deploy previews, maar NIET aan branch-deploys. CLAUDE.md stuurt je juist naar
// een branch-deploy als je iets wilt bekijken voordat het live gaat, omdat die
// nul credits kost. Zonder dit script staat zo'n voorvertoning open voor Google,
// met dezelfde teksten als de echte site. Dat is dubbele content op een domein
// dat je niet wilt laten ranken.
//
// Twee sloten, want ze doen elk iets anders:
// - robots.txt houdt de crawler van de pagina af
// - X-Robots-Tag houdt de URL uit de index, ook als iemand ernaar linkt
//
// Draait ná de gewone build, en raakt productie nooit aan: netlify.toml roept
// dit alleen aan in de contexten branch-deploy en deploy-preview.
import { writeFileSync, appendFileSync, existsSync } from "node:fs";

const DIST = "dist";

writeFileSync(`${DIST}/robots.txt`, "User-agent: *\nDisallow: /\n");

const headers = "\n/*\n  X-Robots-Tag: noindex\n";
if (existsSync(`${DIST}/_headers`)) {
  appendFileSync(`${DIST}/_headers`, headers);
} else {
  writeFileSync(`${DIST}/_headers`, headers.trimStart());
}

console.log("noindex: robots.txt en _headers gezet, deze deploy blijft uit Google.");
