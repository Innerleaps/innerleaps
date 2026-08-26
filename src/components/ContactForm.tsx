import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

/**
 * Het berichtformulier onderaan de contactpagina.
 *
 * Bewust klein gehouden: naam, e-mail, bericht, onder elkaar. Elk extra veld
 * kost invullers, en alles wat we verder willen weten komt in het gesprek wel.
 * De sectiekop erboven zegt al waar dit voor is, dus het formulier heeft zelf
 * geen kop.
 *
 * Het staat onder de contactgegevens en ver onder de agenda. Een ingepland
 * gesprek is meer waard dan een mailtje, dus dit mag daar niet mee concurreren.
 *
 * Bij een geslaagde verzending gaat er een gebeurtenis naar de dataLayer, net
 * als bij een afgeronde boeking. Er staat nog geen Google Tag Manager op de
 * site, maar dataLayer is een gewone array, dus dit is zonder container
 * onschadelijk en werkt zodra de container er wel staat.
 */

/** Het honeypot-veld. Mensen zien dit niet, invulrobots wel. */
const HONEYPOT = "website";

interface ContactFormProps {
  className?: string;
}

const ContactForm = ({ className = "" }: ContactFormProps) => {
  const { t, i18n } = useTranslation("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Ingevuld honeypot-veld betekent een robot. We doen alsof het gelukt is,
    // want een foutmelding vertelt hem alleen maar hoe hij het moet omzeilen.
    if ((data.get(HONEYPOT) as string)?.trim()) {
      setStatus("sent");
      return;
    }

    const naam = (data.get("naam") as string)?.trim();
    const email = (data.get("email") as string)?.trim();
    const bericht = (data.get("bericht") as string)?.trim();

    if (!naam || !email || !bericht) {
      setStatus("error");
      setMessage(t("form.required"));
      return;
    }

    setStatus("sending");
    setMessage("");

    try {
      const { error } = await supabase.functions.invoke("submit-contact-message", {
        body: {
          naam,
          email,
          bericht,
          taal: i18n.language?.startsWith("en") ? "en" : "nl",
          // De herkomst meesturen, zodat een bericht uit een campagne
          // herkenbaar is zonder dat je in de statistieken hoeft te zoeken.
          herkomst: typeof window === "undefined" ? "" : window.location.href,
        },
      });
      if (error) throw error;

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "contact_message_sent" });

      setStatus("sent");
      setMessage(t("form.success"));
      form.reset();
    } catch {
      setStatus("error");
      setMessage(t("form.error"));
    }
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <Label htmlFor="contact-naam" className="text-lg font-semibold text-brand-gray-dark">{t("form.nameLabel")}</Label>
          <Input
            id="contact-naam"
            name="naam"
            autoComplete="name"
            maxLength={100}
            placeholder={t("form.namePlaceholder")}
            className="mt-1 h-12 border border-input text-lg placeholder:text-lg focus-visible:border-input focus-visible:ring-ring md:text-lg"
          />
        </div>

        <div>
          <Label htmlFor="contact-email" className="text-lg font-semibold text-brand-gray-dark">{t("form.emailLabel")}</Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={255}
            placeholder={t("form.emailPlaceholder")}
            className="mt-1 h-12 border border-input text-lg placeholder:text-lg focus-visible:border-input focus-visible:ring-ring md:text-lg"
          />
        </div>

        <div>
          <Label htmlFor="contact-bericht" className="text-lg font-semibold text-brand-gray-dark">{t("form.messageLabel")}</Label>
          <Textarea
            id="contact-bericht"
            name="bericht"
            rows={4}
            maxLength={2000}
            placeholder={t("form.messagePlaceholder")}
            className="mt-1 text-lg placeholder:text-lg"
          />
        </div>

        {/* Buiten beeld en buiten de tabvolgorde, dus alleen robots vullen dit in. */}
        <div className="absolute left-[-9999px]" aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input id="contact-website" name={HONEYPOT} type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Button
            type="submit"
            variant="secondary"
            disabled={status === "sending"}
            className="text-lg font-semibold"
          >
            {status === "sending" ? t("form.sending") : t("form.submit")}
          </Button>

          {message && (
            <p
              role="status"
              className={`text-base ${status === "error" ? "text-red-600" : "text-brand-gray-medium"}`}
            >
              {message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
