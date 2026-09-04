// Als eerste, nog voor React begint: onthouden wat de voorgebakken HTML is.
// Zie src/lib/eersteScherm.ts.
import './lib/eersteScherm'
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
