import type { JuridischePagina } from "./juridisch";

/** Privacy notice, English. De Nederlandse tekst staat in privacy-nl.ts en
 *  moet bij elke wijziging mee. */
export const privacyEn: JuridischePagina = {
  titel: "Privacy Notice",
  ondertitel: "**Innerleaps**, Version 1.7 | September 2026",
  metaTitel: "Privacy Notice | Innerleaps",
  metaBeschrijving:
    "Privacy notice of Innerleaps. How we handle the personal data of website visitors and of people taking part in our training programmes.",
  secties: [
    {
      kop: "Who are we?",
      blokken: [
        {
          soort: "tekst",
          tekst:
            "Innerleaps is a training company specialising in brain training for professionals. We deliver training programmes at companies, executed by qualified trainers.",
        },
      ],
    },
    {
      kop: "Visiting innerleaps.nl",
      blokken: [
        {
          soort: "tekst",
          tekst:
            "This section is about anyone who visits our website. The rest of this notice is about people who take part in a training programme, where your employer decides what happens with your data. For the website it works differently: there, Innerleaps decides, so Innerleaps is the data controller.",
        },
      ],
    },
    {
      kop: "Cookies and your choice",
      niveau: 3,
      blokken: [
        {
          soort: "tekst",
          tekst:
            "We place no analytics or advertising cookies until you agree. On your first visit a window asks you to choose, and until you have chosen, the measurement tools on this site are switched off and store nothing on your device.",
        },
        {
          soort: "tekst",
          tekst:
            "Two things are stored regardless, because the site cannot work without them: your language choice and your cookie choice itself. They stay in your own browser, we never see them, and they are not used to follow you.",
        },
        {
          soort: "tekst",
          tekst:
            "You can change your mind whenever you like. At the bottom of every page there is a link called **Cookie preferences**. It reopens the same panel, and switching something off stops it straight away. Our [cookie notice](/en/cookies) lists the categories in full.",
        },
      ],
    },
    {
      kop: "What we measure once you agree",
      niveau: 3,
      blokken: [
        {
          soort: "lijst",
          items: [
            "**Google Analytics 4:** which pages get visited, how people move through the site and where they drop off. We use this to improve the site.",
            "**Google Ads:** whether an advert brought you here and what you did afterwards, so we do not keep paying for adverts that lead nowhere.",
            "**Apollo:** recognises which organisation a visit is likely to come from, based on your network address. This is for our own sales follow-up, and it only runs if you accept advertising cookies.",
          ],
        },
        {
          soort: "tekst",
          tekst:
            "If you fill in one of our forms and you have accepted advertising cookies, your email address is also sent to Google so it can match your enquiry to the advert you clicked. It is scrambled first, on your own device, using an irreversible calculation called SHA-256. Google receives that scrambled version and never the readable address.",
        },
        {
          soort: "tekst",
          tekst:
            "**Legal basis:** your consent (GDPR Article 6(1)(a)) for everything in this list. For the language and cookie choice stored in your browser: our legitimate interest in a site that works (GDPR Article 6(1)(f)).",
        },
      ],
    },
    {
      kop: "Forms on the website",
      niveau: 3,
      blokken: [
        {
          soort: "tekst",
          tekst:
            "You can leave your details in four places. Each one is voluntary, and you always see beforehand what we ask for.",
        },
        {
          soort: "lijst",
          items: [
            "**The savings calculator:** your name, work email address, organisation name and the figures you enter about absence, headcount and average salary. We email you the outcome and store your entry so we can follow up.",
            "**The scientific report:** your name, work email address and organisation name. We email you the report and store your request.",
            "**The contact form:** your name, email address and message. This is emailed to us and nothing is stored in a database.",
            "**Booking a call:** handled by Calendly. You give your name, email address and a time. Calendly's own privacy statement applies to that booking.",
          ],
        },
        {
          soort: "tekst",
          tekst:
            "**Purpose:** answering you, sending what you asked for, and following up on your interest. We do not sell your details and we do not pass them to anyone outside the suppliers listed below.",
        },
        { soort: "tekst", tekst: "**Legal basis:** your consent (GDPR Article 6(1)(a))." },
        {
          soort: "tekst",
          tekst:
            "**How long:** for as long as we are still in touch about your enquiry. Ask us to delete it and we will, at any time, at **privacy@innerleaps.nl**.",
        },
      ],
    },
    {
      kop: "Suppliers behind the website",
      niveau: 3,
      blokken: [
        {
          soort: "lijst",
          items: [
            "**Netlify:** hosts the website. Like any web server it keeps short-lived technical logs, including network addresses, to serve pages and block abuse.",
            "**Supabase:** runs the database and the code that handles the forms.",
            "**Resend:** sends the emails those forms trigger.",
            "**Google (Analytics and Ads):** measurement, only after you agree.",
            "**Apollo:** organisation recognition, only after you agree to advertising cookies.",
            "**Calendly:** the appointment calendar on our contact page.",
          ],
        },
        {
          soort: "tekst",
          tekst:
            "Several of these are based in the United States. Where data reaches them, the transfer relies on the EU-US Data Privacy Framework and Standard Contractual Clauses, the same safeguards described further down under international data transfers.",
        },
      ],
    },
    {
      kop: "Who is responsible for your data?",
      blokken: [
        {
          soort: "tekst",
          tekst:
            "Your employer is the data controller for the personal data collected in the context of the Innerleaps training programme. Your employer has decided to offer this programme to employees and has engaged Innerleaps to deliver it.",
        },
        {
          soort: "tekst",
          tekst:
            "Innerleaps is the data processor, processing your personal data on behalf of your employer in accordance with a data processing agreement.",
        },
        {
          soort: "tekst",
          tekst: "For questions about your privacy or to exercise your rights, you can contact:",
        },
        {
          soort: "lijst",
          items: ["Your employer (HR department), or", "Innerleaps: **privacy@innerleaps.nl**"],
        },
        {
          soort: "kader",
          regels: [
            "Innerleaps contact details:",
            "Innerleaps",
            "Bas ter Haar Romenij",
            "Koningin Wilhelminaplein 454",
            "1062KS Amsterdam, the Netherlands",
            "Chamber of Commerce: 98136925",
            "VAT: NL005312293B57",
            "Email: privacy@innerleaps.nl",
          ],
        },
      ],
    },
    {
      kop: "What personal data do we process and why?",
      blokken: [
        { soort: "tekst", tekst: "We process personal data exclusively for the following purposes:" },
      ],
    },
    {
      kop: "1. Sign-up and recruitment",
      niveau: 3,
      blokken: [
        {
          soort: "tekst",
          tekst:
            "When you express interest in the training programme via the sign-up form, we collect:",
        },
        { soort: "lijst", items: ["Name", "Email address"] },
        { soort: "tekst", tekst: "**Purpose:** Following up on your interest in the programme." },
        { soort: "tekst", tekst: "**Legal basis:** Consent (GDPR Article 6(1)(a))." },
      ],
    },
    {
      kop: "2. Participant intake and qualification",
      niveau: 3,
      blokken: [
        { soort: "tekst", tekst: "Via the intake form we collect:" },
        {
          soort: "lijst",
          items: [
            "Name, email address, phone number, job title and motivation",
            "Health data: information about mental health, medication use, trauma history and substance use",
          ],
        },
        {
          soort: "tekst",
          tekst:
            "**Purpose:** Assessing whether participation in the programme is suitable and safe for you. Based on your answers, Innerleaps may determine that participation is not advisable for you at this time.",
        },
        {
          soort: "tekst",
          tekst:
            "**Legal basis:** Explicit consent (GDPR Article 6(1)(a) and Article 9(2)(a)).",
        },
        {
          soort: "tekst",
          tekst:
            "**Please note:** This concerns special category personal data within the meaning of the GDPR. We process this data with extra care and solely for the purpose stated above. The Innerleaps training programme is a professional development and wellness intervention, not a form of healthcare or psychotherapy. It does not replace professional medical or psychological care.",
        },
      ],
    },
    {
      kop: "3. Impact measurement",
      niveau: 3,
      blokken: [
        { soort: "tekst", tekst: "Via the impact measurement survey we collect:" },
        {
          soort: "lijst",
          items: [
            "Name and email address",
            "Productivity",
            "Resilience",
            "Vitality",
            "Stress levels",
            "Training frequency and training barriers",
            "Job satisfaction",
            "Turnover intention",
          ],
        },
        {
          soort: "tekst",
          tekst:
            "**Purpose:** Measuring the impact of the training programme on wellness, productivity and work performance.",
        },
        {
          soort: "tekst",
          tekst:
            "**Legal basis:** Legitimate interest of your employer (GDPR Article 6(1)(f)) and consent (GDPR Article 6(1)(a)).",
        },
        {
          soort: "tekst",
          tekst:
            "**Important:** Your individual responses are never shared with your employer. Management receives only anonymised, aggregated results. A management report is issued only when the training group contains a minimum of 8 persons; where a qualifying control group of at least 8 persons is also available, a full comparative report is issued. No salary data is collected from you individually; ROI figures are calculated using an organisational average provided by your employer.",
        },
      ],
    },
    {
      kop: "4. Course evaluation",
      niveau: 3,
      blokken: [
        { soort: "tekst", tekst: "Via the evaluation form we collect:" },
        { soort: "lijst", items: ["Trainer ratings", "Open feedback about the programme"] },
        { soort: "tekst", tekst: "The evaluation form does not collect your name or email address." },
        { soort: "tekst", tekst: "**Purpose:** Evaluating and improving the training programme." },
        {
          soort: "tekst",
          tekst:
            "**Legal basis:** Legitimate interest (GDPR Article 6(1)(f)). Innerleaps has a legitimate interest in evaluating trainer performance and programme quality. Your individual responses are seen only by Innerleaps and are never shared with your employer, trainers or any third party. Management receives only average scores.",
        },
        {
          soort: "tekst",
          tekst:
            "**Please note:** Anonymised and aggregated insights from evaluations may be used for marketing purposes.",
        },
      ],
    },
    {
      kop: "Voluntary participation",
      blokken: [
        {
          soort: "tekst",
          tekst:
            "Participation in the Innerleaps training programme is entirely voluntary. Your employer offers the programme, but you decide whether to participate. You can withdraw your consent at any time without consequences for your employment relationship.",
        },
      ],
    },
    {
      kop: "How long do we retain your data?",
      blokken: [
        {
          soort: "tabel",
          koppen: ["Category", "Retention period"],
          rijen: [
            ["Sign-up data", "Until the end of the agreement between Innerleaps and your employer"],
            ["Intake data", "Until the end of the agreement between Innerleaps and your employer"],
            ["Impact measurement data", "Until the end of the agreement between Innerleaps and your employer"],
            ["Evaluation data", "Until the end of the agreement between Innerleaps and your employer"],
            ["Anonymised aggregates", "Indefinitely, provided all identifying information has been irreversibly removed"],
          ],
        },
        {
          soort: "tekst",
          tekst:
            "After the agreement ends, all personal data is deleted. Your employer never receives personal data, only anonymised results.",
        },
      ],
    },
    {
      kop: "Who has access to your data?",
      blokken: [],
    },
    {
      kop: "Innerleaps itself",
      niveau: 3,
      blokken: [
        {
          soort: "tekst",
          tekst:
            "Only Bas ter Haar Romenij (owner) has access to the full dataset. Freelance trainers engaged by Innerleaps receive only the data strictly necessary for the delivery of their sessions, limited to your name, telephone number and email address. This data is shared on the basis of the principle of data minimisation (GDPR Article 5(1)(c)) and is used solely to contact participants in the event of scheduling changes or session-related communications. All trainers are contractually bound to confidentiality and data protection obligations before being permitted to deliver any sessions.",
        },
      ],
    },
    {
      kop: "Your employer",
      niveau: 3,
      blokken: [
        {
          soort: "tekst",
          tekst:
            "Your employer receives only anonymised, aggregated results. Individual data is never shared with your employer. No salary data is collected from you individually; ROI figures are calculated using an organisational average provided by your employer, which is never included in any report shared with management.",
        },
      ],
    },
    {
      kop: "Sub-processors",
      niveau: 3,
      blokken: [
        { soort: "tekst", tekst: "For the training programme we use the following sub-processors:" },
        {
          soort: "lijst",
          items: [
            "**Google Workspace (Google LLC):** used to collect and store data via Google Forms, Google Sheets and Gmail. Google LLC is based in the United States. Data transfers to the US take place on the basis of the EU-US Data Privacy Framework and Standard Contractual Clauses (SCCs).",
            "**n8n:** used for automated workflow processing of form data. n8n GmbH is based in Germany (EU) and is bound by a data processing agreement with Innerleaps.",
          ],
        },
        {
          soort: "tekst",
          tekst:
            "The suppliers behind the website are listed higher up, under Visiting innerleaps.nl. All sub-processors are required to process data in accordance with GDPR requirements and are bound by data processing agreements with Innerleaps.",
        },
      ],
    },
    {
      kop: "International data transfers",
      blokken: [
        {
          soort: "tekst",
          tekst:
            "Innerleaps works with clients and participants inside and outside the European Union. Where personal data is transferred outside the EEA, Innerleaps ensures appropriate safeguards are in place, including Standard Contractual Clauses (SCCs) and adequacy decisions, in accordance with GDPR Chapter V.",
        },
      ],
    },
    {
      kop: "Your rights",
      blokken: [
        { soort: "tekst", tekst: "Under the GDPR you have the following rights:" },
        {
          soort: "lijst",
          items: [
            "**Right of access** (Article 15): you can request which data we process about you.",
            "**Right to rectification** (Article 16): you can request correction of inaccurate data.",
            "**Right to erasure** (Article 17): you can request deletion of your data.",
            "**Right to restriction of processing** (Article 18): you can request that processing be restricted.",
            "**Right to data portability** (Article 20): you can request your data in a structured format.",
            "**Right to object** (Article 21): you can object to processing based on legitimate interest.",
            "**Right to withdraw consent**: you can withdraw your consent at any time, without giving reasons. Withdrawal does not have retroactive effect but may affect your ability to participate in the programme.",
          ],
        },
        {
          soort: "tekst",
          tekst:
            "To submit a request, you can contact your employer's HR department or contact Innerleaps directly at **privacy@innerleaps.nl**. We will respond within 30 days.",
        },
        {
          soort: "tekst",
          tekst:
            "You also have the right to lodge a complaint with the Dutch Data Protection Authority (Autoriteit Persoonsgegevens) at autoriteitpersoonsgegevens.nl, or with the supervisory authority in your country of residence.",
        },
      ],
    },
    {
      kop: "Security",
      blokken: [
        {
          soort: "tekst",
          tekst:
            "Innerleaps takes appropriate technical and organisational measures to protect your personal data against unauthorised access, loss or misuse. Data is stored exclusively in secure cloud environments. Access is restricted to persons who require it for the delivery of the programme.",
        },
      ],
    },
    {
      kop: "Changes to this privacy notice",
      blokken: [
        {
          soort: "tekst",
          tekst:
            "Innerleaps reserves the right to amend this privacy notice. The most current version is always available on innerleaps.nl via the footer of the website. We recommend consulting this notice periodically.",
        },
      ],
    },
    {
      kop: "Contact",
      blokken: [
        {
          soort: "tekst",
          tekst:
            "For questions about this privacy notice or the processing of your personal data, please contact us at:",
        },
        {
          soort: "kader",
          regels: [
            "privacy@innerleaps.nl",
            "Innerleaps, Koningin Wilhelminaplein 454, 1062KS Amsterdam, the Netherlands",
          ],
        },
      ],
    },
  ],
  voettekst: [
    "Document Version: 1.7",
    "Date: September 2026",
    "Prepared by: Innerleaps",
    "Status: Published",
  ],
};
