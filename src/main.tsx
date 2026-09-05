// Zet een veld dat focus krijgt in een pop-up zelf op de goede plek, nadat het
// toetsenbord staat. Zie src/lib/veldInBeeld.ts.
import './lib/veldInBeeld'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'
import './i18n/config'

/**
 * De voorgebakken pagina laten staan tot React echt klaar is.
 *
 * Wat er anders gebeurt, vastgelegd op een iPhone:
 *
 *   0,42s  de voorgebakken pagina staat er volledig
 *   0,70s  helemaal wit, met "Laden..." in het midden
 *   0,84s  de pagina is terug
 *
 * React maakt bij het opstarten #root leeg, en omdat elke pagina met lazy()
 * wordt geladen valt hij daarna terug op het laadscherm van Suspense. De
 * volledig opgemaakte pagina die er al stond gaat dus weg voordat de vervanger
 * klaar is. De bezoeker ziet zijn pagina, dan wit, dan zijn pagina.
 *
 * Daarom verhuizen we die inhoud eerst naar een eigen laag ernaast. Verhuizen,
 * niet kopiëren: de afbeeldingen blijven dezelfde elementen en hoeven dus niet
 * opnieuw ingelezen te worden. React krijgt een leeg #root en mag daar rustig
 * in opbouwen. Zodra de eerste pagina echt staat, haalt VoorvertoningWeg in
 * App.tsx die laag weg, nog voor het scherm opnieuw getekend wordt.
 */
const root = document.getElementById("root")!;
if (root.firstChild) {
  const voorvertoning = document.createElement("div");
  voorvertoning.id = "voorvertoning";
  while (root.firstChild) voorvertoning.appendChild(root.firstChild);
  root.before(voorvertoning);
}

createRoot(root).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
