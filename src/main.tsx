// Als eerste, nog voor React begint: onthouden wat de voorgebakken HTML is.
// Zie src/lib/eersteScherm.ts.
import './lib/eersteScherm'
// Zet een veld dat focus krijgt in een pop-up zelf op de goede plek, nadat het
// toetsenbord staat. Zie src/lib/veldInBeeld.ts.
import './lib/veldInBeeld'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'
import './i18n/config'

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
