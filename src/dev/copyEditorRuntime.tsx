/**
 * Alleen actief in `npm run dev`. De Vite-plugin in vite.config.ts vervangt
 * daar elke `{t('pad.naar.tekst')}` die los als JSX-kind staat door
 * `{__copyEditorWrap(ns, 'pad.naar.tekst', t('pad.naar.tekst'))}`, zodat elk
 * stukje zichtbare tekst een klikbaar element wordt voor de copy-editor. Deze
 * transform draait nooit tijdens `npm run build`, dus er komt niets van in de
 * productiebundel terecht.
 */
export function __copyEditorWrap(ns: string, key: string, value: unknown) {
  if (typeof value !== "string") return value;
  return (
    <span data-i18n-ns={ns} data-i18n-key={key} data-i18n-editable="true">
      {value}
    </span>
  );
}
