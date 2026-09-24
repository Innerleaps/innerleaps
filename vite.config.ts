import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { visualizer } from "rollup-plugin-visualizer";
import { copyEditorPlugin } from "./vite-plugins/copy-editor";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    mode === 'development' && copyEditorPlugin(),
    mode === 'production' && visualizer({
      // Buiten dist, anders wordt deze bundelanalyse meegepubliceerd en is
      // hij openbaar te bekijken op innerleaps.nl/stats.html.
      filename: './build-stats/bundle.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React core libraries
          'vendor-react': [
            'react',
            'react-dom',
            'react-router-dom',
          ],
          // Radix UI components (largest UI dependency group)
          'vendor-ui': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-label',
            '@radix-ui/react-slot',
            '@radix-ui/react-toast',
            '@radix-ui/react-tabs',
            '@radix-ui/react-select',
            '@radix-ui/react-accordion',
            '@radix-ui/react-navigation-menu',
            '@radix-ui/react-popover',
            '@radix-ui/react-avatar',
            '@radix-ui/react-separator',
          ],
          // Form handling libraries
          'vendor-forms': [
            'react-hook-form',
            '@hookform/resolvers',
            'zod',
          ],
          // Date utilities
          'vendor-date': [
            'date-fns',
            'react-day-picker',
          ],
          // Supabase
          'vendor-supabase': [
            '@supabase/supabase-js',
            '@tanstack/react-query',
          ],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    // Geen source maps in productie. Ze stonden aan, en dat betekende 66
    // .map-bestanden en 3,7 MB extra op de server, waarmee je hele broncode
    // publiek leesbaar was op innerleaps.nl. Ze worden alleen opgehaald als
    // iemand de ontwikkelaarsconsole opent, dus voor bezoekers kostte het geen
    // laadtijd, maar het levert ook niets op. Lokaal `npm run dev` geeft je
    // altijd nog volledige source maps.
    sourcemap: false,
  },
}));
