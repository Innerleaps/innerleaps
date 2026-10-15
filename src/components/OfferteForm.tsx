import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/integrations/supabase/client";
import { isGeldigEmail } from "@/lib/email";
import { bewaarOfferteOverdracht, hashEmail, nieuweId, offerteBedanktPad } from "@/lib/bedankt";
import { detectLanguageFromPath } from "@/i18n/config";
import type { OfferteHerkomst } from "@/lib/offerte";

/**
 * Het offerteformulier.
 *
 * Precies de drie dingen die Bas nodig heeft om een prijs te noemen: online of
 * op locatie, hoeveel deelnemers, en hoe groot de organisatie is. Daarmee kan
 * hij altijd een bedrag geven als iemand daarom vraagt, en hoeft niemand eerst
 * een gesprek te voeren om een prijs te krijgen. Plus de gegevens om terug te
 * bellen. Meer niet: elk extra veld kost invullers.
 *
 * Het loopt via dezelfde Edge Function als het berichtformulier op /contact.
 * Die mailt alles naar Bas en slaat niets op. De offertegegevens gaan als
 * tekst in het bericht, met OFFERTEAANVRAAG bovenaan. De velden `soort` en
 * `organisatie` geven de mail de onderwerpregel "Innerleaps - offerte
 * aanvraag". Staat die versie van de functie nog niet in Supabase, dan gooit
 * de oude die twee velden weg en komt de mail toch aan, als gewoon bericht.
 *
 * Na verzenden naar de bedanktpagina, niet een melding in het formulier. Die
 * pagina is een eigen URL, dus Google Ads kan er de conversie op meten, en de
 * agenda staat er voor wie niet wil wachten tot Bas belt.
 */

/** Het honeypot-veld. Mensen zien dit niet, invulrobots wel. */
const HONEYPOT = "website";

const VORMEN = ["online", "location", "unsure"] as const;
type Vorm = (typeof VORMEN)[number];

/** Zo staat de vorm in de mail aan Bas. Altijd Nederlands, hij leest hem. */
const VORM_IN_MAIL: Record<Vorm, string> = {
  online: "Online",
  location: "Op locatie",
  unsure: "Weet ik nog niet",
};

const VORM_SLEUTEL: Record<Vorm, string> = {
  online: "settingOnline",
  location: "settingLocation",
  unsure: "settingUnsure",
};

/** De verplichte velden, in de volgorde waarin ze op het scherm staan. */
const VERPLICHT = ["naam", "organisatie", "email", "telefoon", "vorm", "deelnemers", "medewerkers"] as const;

/** Zelfde maat als de lopende tekst ernaast, zie CLAUDE.md, kopje Lettergroottes. */
const VELD = "mt-1 h-12 border border-input text-lg placeholder:text-lg focus-visible:border-input focus-visible:ring-ring md:text-lg";
const LABEL = "text-lg font-semibold text-brand-gray-dark";

const OfferteForm = () => {
  const { t, i18n } = useTranslation("contact");
  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  const taal = detectLanguageFromPath(pathname);
  const van = (state as OfferteHerkomst | null)?.van;

  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [message, setMessage] = useState("");
  const [vorm, setVorm] = useState<Vorm | "">("");
  const [leeg, setLeeg] = useState<string[]>([]);
  // Zie ContactForm: het adres apart bijhouden om het te kunnen controleren.
  const [email, setEmail] = useState("");
  const [emailAangeraakt, setEmailAangeraakt] = useState(false);
  const emailOngeldig = email.trim() !== "" && !isGeldigEmail(email);

  const isLeeg = (veld: string) => leeg.includes(veld);
  /** Een veld dat iemand invult is niet meer leeg, dus de rode rand gaat eraf. */
  const vulIn = (veld: string) => {
    if (leeg.includes(veld)) setLeeg(leeg.filter((v) => v !== veld));
  };
  const foutProps = (veld: string) => ({
    "aria-invalid": isLeeg(veld) || undefined,
    className: `${VELD} ${isLeeg(veld) ? "border-red-600" : ""}`,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const lees = (veld: string) => ((data.get(veld) as string) ?? "").trim();

    // Ingevuld honeypot-veld betekent een robot. Doen alsof het gelukt is.
    if (lees(HONEYPOT)) {
      navigate(offerteBedanktPad(taal));
      return;
    }

    const waarden = {
      naam: lees("naam"),
      organisatie: lees("organisatie"),
      email: lees("email"),
      telefoon: lees("telefoon"),
      vorm,
      deelnemers: lees("deelnemers"),
      medewerkers: lees("medewerkers"),
      toelichting: lees("toelichting"),
    };

    const ontbreekt = VERPLICHT.filter((veld) => !waarden[veld]);
    setLeeg(ontbreekt);
    if (ontbreekt.length > 0) {
      setStatus("error");
      setMessage(t("quote.form.required"));
      // De keuzerondjes zelf zijn niet te focussen, het eerste rondje wel.
      const eerste = ontbreekt[0] === "vorm" ? "vorm-online" : ontbreekt[0];
      document.getElementById(`offerte-${eerste}`)?.focus();
      return;
    }

    if (!isGeldigEmail(waarden.email)) {
      setEmailAangeraakt(true);
      setStatus("error");
      setMessage(t("form.emailInvalid"));
      document.getElementById("offerte-email")?.focus();
      return;
    }

    setStatus("sending");
    setMessage("");

    const bericht = [
      "OFFERTEAANVRAAG",
      "",
      `Organisatie: ${waarden.organisatie}`,
      `Telefoon: ${waarden.telefoon}`,
      `Vorm: ${VORM_IN_MAIL[waarden.vorm as Vorm]}`,
      `Deelnemers: ${waarden.deelnemers}`,
      `Medewerkers totaal: ${waarden.medewerkers}`,
      ...(waarden.toelichting ? ["", "Toelichting:", waarden.toelichting] : []),
    ].join("\n");

    const hier = typeof window === "undefined" ? "" : window.location.href;

    try {
      const { error } = await supabase.functions.invoke("submit-contact-message", {
        body: {
          // soort en organisatie geven de mail de onderwerpregel "Innerleaps -
          // offerte aanvraag". Een functie zonder die velden negeert ze en
          // stuurt de gewone berichtmail, met alles nog steeds in de tekst.
          soort: "offerte",
          organisatie: waarden.organisatie,
          naam: waarden.naam,
          email: waarden.email,
          bericht,
          taal: i18n.language?.startsWith("en") ? "en" : "nl",
          herkomst: (van ? `${hier} (knop op ${van})` : hier).slice(0, 500),
        },
      });
      if (error) throw error;

      // Alleen het gehashte adres gaat mee naar de bedanktpagina. Die meldt de
      // conversie, zodat Google Ads hem ook op die URL kan meten.
      bewaarOfferteOverdracht({ id: nieuweId(), emailHash: await hashEmail(waarden.email) });
      navigate(offerteBedanktPad(taal));
    } catch {
      setStatus("error");
      setMessage(t("form.error"));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      onChange={(e) => vulIn((e.target as HTMLInputElement).name)}
      className="space-y-5"
      noValidate
    >
      <div>
        <Label htmlFor="offerte-naam" className={LABEL}>{t("quote.form.name")}</Label>
        <Input id="offerte-naam" name="naam" autoComplete="name" maxLength={100} {...foutProps("naam")} />
      </div>

      <div>
        <Label htmlFor="offerte-organisatie" className={LABEL}>{t("quote.form.organisation")}</Label>
        <Input
          id="offerte-organisatie"
          name="organisatie"
          autoComplete="organization"
          maxLength={150}
          {...foutProps("organisatie")}
        />
      </div>

      <div>
        <Label htmlFor="offerte-email" className={LABEL}>{t("quote.form.email")}</Label>
        <Input
          id="offerte-email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={255}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setEmailAangeraakt(true)}
          aria-invalid={isLeeg("email") || (emailAangeraakt && emailOngeldig) || undefined}
          aria-describedby={emailAangeraakt && emailOngeldig ? "offerte-email-fout" : undefined}
          className={`${VELD} ${isLeeg("email") || (emailAangeraakt && emailOngeldig) ? "border-red-600" : ""}`}
        />
        {emailAangeraakt && emailOngeldig && (
          <p id="offerte-email-fout" className="mt-1 text-lg font-medium text-red-600">
            {t("form.emailInvalid")}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="offerte-telefoon" className={LABEL}>{t("quote.form.phone")}</Label>
        <Input
          id="offerte-telefoon"
          name="telefoon"
          type="tel"
          autoComplete="tel"
          maxLength={30}
          {...foutProps("telefoon")}
        />
      </div>

      <fieldset>
        <legend className={LABEL}>{t("quote.form.setting")}</legend>
        <RadioGroup
          id="offerte-vorm"
          value={vorm}
          onValueChange={(waarde) => {
            setVorm(waarde as Vorm);
            vulIn("vorm");
          }}
          aria-invalid={isLeeg("vorm") || undefined}
          className={`mt-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-6 ${
            isLeeg("vorm") ? "rounded-md outline outline-1 outline-offset-4 outline-red-600" : ""
          }`}
        >
          {VORMEN.map((v) => (
            <div key={v} className="flex items-center gap-3">
              <RadioGroupItem value={v} id={`offerte-vorm-${v}`} className="h-5 w-5" />
              <Label htmlFor={`offerte-vorm-${v}`} className="cursor-pointer text-lg font-normal text-brand-gray-dark">
                {t(`quote.form.${VORM_SLEUTEL[v]}`)}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </fieldset>

      {/* Onder elkaar en niet naast elkaar: de vragen zijn te lang voor een
          halve kolom en braken dan op verschillende plekken af, waardoor de
          twee velden niet meer op één lijn stonden. */}
      <div>
        <Label htmlFor="offerte-deelnemers" className={LABEL}>{t("quote.form.participants")}</Label>
        <Input
          id="offerte-deelnemers"
          name="deelnemers"
          type="number"
          inputMode="numeric"
          min={1}
          {...foutProps("deelnemers")}
        />
      </div>

      <div>
        <Label htmlFor="offerte-medewerkers" className={LABEL}>{t("quote.form.staff")}</Label>
        <Input
          id="offerte-medewerkers"
          name="medewerkers"
          type="number"
          inputMode="numeric"
          min={1}
          {...foutProps("medewerkers")}
        />
      </div>

      <div>
        <Label htmlFor="offerte-toelichting" className={LABEL}>{t("quote.form.note")}</Label>
        <Textarea
          id="offerte-toelichting"
          name="toelichting"
          rows={3}
          maxLength={1500}
          className="mt-1 text-lg placeholder:text-lg md:text-lg"
        />
      </div>

      {/* Buiten beeld en buiten de tabvolgorde, dus alleen robots vullen dit in. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="offerte-website">Website</label>
        <input id="offerte-website" name={HONEYPOT} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="space-y-3">
        <Button
          type="submit"
          disabled={status === "sending"}
          className="w-full sm:w-auto min-h-[44px] px-8 text-lg font-semibold"
        >
          {status === "sending" ? t("form.sending") : t("quote.form.submit")}
        </Button>

        {message && (
          <p role="status" className="text-lg text-red-600">
            {message}
          </p>
        )}
      </div>
    </form>
  );
};

export default OfferteForm;
