import { useEffect, useRef, useState } from "react";
import { detectLanguageFromPath, type SupportedLanguage } from "@/i18n/config";
import i18n from "@/i18n/config";

/**
 * Alleen in `npm run dev` gemount (zie App.tsx). Zet edit-mode aan met de
 * knop rechtsonder, klik dan op tekst op de pagina: de Vite-plugin markeert
 * die al met `data-i18n-key` (zie vite-plugins/copy-editor.ts). Typ de tekst
 * in één taal, de andere wordt automatisch voorvertaald en blijft daarna zelf
 * aan te passen. Opslaan schrijft rechtstreeks naar de twee JSON-bestanden.
 */

type Target = {
  ns: string;
  key: string;
  el: HTMLElement;
};

const LANG_LABEL: Record<SupportedLanguage, string> = { nl: "Nederlands", en: "English" };

export function CopyEditorOverlay() {
  const [active, setActive] = useState(false);
  const [target, setTarget] = useState<Target | null>(null);
  const [nl, setNl] = useState("");
  const [en, setEn] = useState("");
  const [originalText, setOriginalText] = useState("");
  const [translating, setTranslating] = useState<SupportedLanguage | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [shared, setShared] = useState<string[]>([]);
  const sourceLangRef = useRef<SupportedLanguage>("nl");
  const popoverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!active) return;

    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest<HTMLElement>("[data-i18n-editable]");
      if (!el) return;
      if (popoverRef.current?.contains(e.target as Node)) return;
      e.preventDefault();
      e.stopPropagation();

      const ns = el.dataset.i18nNs ?? "common";
      const key = el.dataset.i18nKey ?? "";
      const currentLang = detectLanguageFromPath(window.location.pathname);
      sourceLangRef.current = currentLang;
      setStatus(null);
      setShared([]);
      setTarget({ ns, key, el });

      // De tekst staat al in de DOM (dat is precies wat je aanklikte), dus
      // die taal vul je meteen in, zonder op een netwerkrondje te wachten.
      const clicked = el.textContent ?? "";
      setOriginalText(clicked);
      if (currentLang === "nl") setNl(clicked);
      else setEn(clicked);

      fetch(`/__copy-editor/current?ns=${encodeURIComponent(ns)}&key=${encodeURIComponent(key)}`)
        .then((r) => r.json())
        .then((data: { nl: string; en: string }) => {
          setNl(data.nl ?? "");
          setEn(data.en ?? "");
        })
        .catch(() => setStatus("Kon de andere taal niet ophalen, vul die zelf aan."));
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [active]);

  const translate = async (from: SupportedLanguage, text: string) => {
    const to: SupportedLanguage = from === "nl" ? "en" : "nl";
    setTranslating(to);
    try {
      const r = await fetch("/__copy-editor/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, from, to }),
      });
      const data = (await r.json()) as { translation?: string; error?: string };
      if (data.translation !== undefined) {
        if (to === "en") setEn(data.translation);
        else setNl(data.translation);
      }
    } catch {
      setStatus("Voorvertalen is mislukt, vul de andere taal handmatig in.");
    } finally {
      setTranslating(null);
    }
  };

  const save = async () => {
    if (!target) return;
    setStatus("Opslaan...");
    try {
      const r = await fetch("/__copy-editor/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ns: target.ns, key: target.key, nl, en }),
      });
      const data = (await r.json()) as { ok: boolean; shared?: string[]; error?: string };
      if (!data.ok) {
        setStatus(`Mislukt: ${data.error}`);
        return;
      }
      const visible = sourceLangRef.current === "nl" ? nl : en;
      target.el.textContent = visible;
      i18n.addResourceBundle(
        detectLanguageFromPath(window.location.pathname),
        target.ns,
        pathToObject(target.key, sourceLangRef.current === "nl" ? nl : en),
        true,
        true,
      );
      setShared(data.shared ?? []);
      setStatus("Opgeslagen.");
    } catch (e) {
      setStatus(`Mislukt: ${String(e)}`);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setActive((a) => !a);
          setTarget(null);
        }}
        style={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 999998,
          padding: "10px 16px",
          borderRadius: 999,
          border: "none",
          background: active ? "#dc2626" : "#111827",
          color: "white",
          fontSize: 14,
          fontFamily: "system-ui, sans-serif",
          cursor: "pointer",
          boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
        }}
      >
        {active ? "✕ Copy editor uit" : "✏️ Copy editor"}
      </button>

      {active && (
        <style>{`
          [data-i18n-editable] { cursor: pointer; }
          [data-i18n-editable]:hover {
            outline: 2px dashed #f97316;
            outline-offset: 2px;
            background: rgba(249,115,22,0.10);
          }
        `}</style>
      )}

      {active && target && (
        <div
          ref={popoverRef}
          style={{
            position: "fixed",
            bottom: 76,
            right: 16,
            width: 380,
            maxWidth: "calc(100vw - 32px)",
            maxHeight: "70vh",
            overflowY: "auto",
            background: "white",
            color: "#111827",
            border: "1px solid #e5e7eb",
            borderRadius: 12,
            boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
            padding: 16,
            zIndex: 999999,
            fontFamily: "system-ui, sans-serif",
            fontSize: 13,
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: 4 }}>{target.ns}.{target.key}</div>

          <div style={{ marginBottom: 12 }}>
            <div style={{ color: "#6b7280", marginBottom: 4 }}>Je past deze tekst aan:</div>
            <div
              style={{
                background: "#f3f4f6",
                border: "1px solid #e5e7eb",
                borderRadius: 8,
                padding: 8,
                color: "#374151",
                fontStyle: "italic",
              }}
            >
              "{originalText}"
            </div>
          </div>

          {(["nl", "en"] as const).map((lang) => (
            <div key={lang} style={{ marginBottom: 12 }}>
              <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <span style={{ fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
                  {LANG_LABEL[lang]}
                  {sourceLangRef.current === lang && (
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: "#9a3412",
                        background: "#fff7ed",
                        border: "1px solid #fed7aa",
                        borderRadius: 999,
                        padding: "1px 6px",
                      }}
                    >
                      aangeklikt
                    </span>
                  )}
                </span>
                <button
                  type="button"
                  onClick={() => translate(lang, lang === "nl" ? nl : en)}
                  disabled={translating !== null}
                  style={{
                    fontSize: 12,
                    border: "1px solid #d1d5db",
                    borderRadius: 6,
                    background: "#f9fafb",
                    padding: "2px 8px",
                    cursor: "pointer",
                  }}
                >
                  {translating === (lang === "nl" ? "en" : "nl") ? "Bezig..." : `Vertaal naar ${LANG_LABEL[lang === "nl" ? "en" : "nl"]} →`}
                </button>
              </label>
              <textarea
                value={lang === "nl" ? nl : en}
                onChange={(e) => (lang === "nl" ? setNl(e.target.value) : setEn(e.target.value))}
                rows={3}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: 8,
                  borderRadius: 8,
                  border: "1px solid #d1d5db",
                  fontFamily: "inherit",
                  fontSize: 13,
                  resize: "vertical",
                }}
              />
            </div>
          ))}

          {shared.length > 0 && (
            <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 8, padding: 8, marginBottom: 8, color: "#9a3412" }}>
              {shared.map((s) => (
                <div key={s}>{s}</div>
              ))}
            </div>
          )}

          {status && <div style={{ marginBottom: 8, color: "#6b7280" }}>{status}</div>}

          <div style={{ display: "flex", gap: 8 }}>
            <button
              type="button"
              onClick={save}
              style={{
                flex: 1,
                padding: "8px 12px",
                borderRadius: 8,
                border: "none",
                background: "#f97316",
                color: "white",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Opslaan in beide talen
            </button>
            <button
              type="button"
              onClick={() => setTarget(null)}
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                border: "1px solid #d1d5db",
                background: "white",
                cursor: "pointer",
              }}
            >
              Sluiten
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function pathToObject(keyPath: string, value: string): Record<string, unknown> {
  const parts = keyPath.split(".");
  const root: Record<string, unknown> = {};
  let cur = root;
  for (let i = 0; i < parts.length - 1; i++) {
    const next: Record<string, unknown> = {};
    cur[parts[i]] = next;
    cur = next;
  }
  cur[parts[parts.length - 1]] = value;
  return root;
}
