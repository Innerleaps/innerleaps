import type { JuridischePagina } from "./juridisch";

/** Privacy notice, English. De Nederlandse tekst staat in privacy-nl.ts en
 *  moet bij elke wijziging mee. */
export const privacyEn: JuridischePagina = {
  titel: "Privacy Notice",
  ondertitel: "**Innerleaps**, Version 2.0 | 11 September 2026",
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
      kop: "How do you take part?",
      blokken: [
        {
          soort: "tekst",
          tekst:
            "Depending on what your employer has arranged, you either register for the programme via an Innerleaps registration form, or your employer provides Innerleaps with the email addresses of participating employees so that Innerleaps can group participants and send programme materials. In both cases you are made aware of this privacy notice and you accept a short voluntary-participation statement before taking part. That statement confirms only that you take part voluntarily and on your own responsibility; it records no health information.",
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
      kop: "1. Enrolment and programme administration",
      niveau: 3,
      blokken: [
        { soort: "tekst", tekst: "When you take part in the programme, we process:" },
        {
          soort: "lijst",
          items: [
            "Name",
            "Work email address",
            "Your stated training goal (the challenge or goal you hope to address, chosen from a fixed list, with an optional free-text field in which we ask you not to enter sensitive information)",
          ],
        },
        {
          soort: "tekst",
          tekst:
            "**Purpose:** enrolling you in the programme, grouping participants, sending you programme materials and communications, and allowing your trainer to tailor the training to the group's needs. Your individual training goal is used only for delivering and tailoring the training. Innerleaps may use aggregated, anonymised insight from these goals (for example the most common reasons for joining) for its own service improvement and marketing; such aggregated insight does not identify you.",
        },
        {
          soort: "tekst",
          tekst:
            "**Legal basis:** consent (GDPR Article 6(1)(a)) where you register via an Innerleaps form; where your employer provides your details, the processing is carried out on your employer's instruction and your employer informs you beforehand.",
        },
      ],
    },
    {
      kop: "2. Impact measurement",
      niveau: 3,
      blokken: [
        {
          soort: "tekst",
          tekst:
            "Via the impact measurement surveys (before the programme, T0, and after the programme, T1) we collect:",
        },
        {
          soort: "lijst",
          items: [
            "Name and work email address",
            "Work performance information, including expected and actual work hours and days absent due to a physical or mental health problem",
            "Life satisfaction, and (where your employer has selected these optional questions) job satisfaction and turnover intention",
            "Wellbeing measures: vitality, resilience and stress",
            "Training practice frequency and barriers to practising",
          ],
        },
        {
          soort: "tekst",
          tekst:
            "**Purpose:** measuring the impact of the training programme on your wellbeing, productivity and work performance, and comparing your results before and after the programme.",
        },
        {
          soort: "tekst",
          tekst:
            "**Please note:** some of this information relates to your health and wellbeing (such as stress, vitality, resilience and health-related absence) and is special category health data within the meaning of the GDPR. We process it only for the purpose stated above and with extra care.",
        },
        {
          soort: "tekst",
          tekst:
            "**Legal basis:** consent (GDPR Article 6(1)(a)) and, for the health-related data, your explicit consent (GDPR Article 9(2)(a)), both given via the consent statement on the survey.",
        },
        {
          soort: "tekst",
          tekst:
            "**Important:** your individual responses are never shared with your employer. Management receives only anonymised, aggregated results, and only where the training group contains a minimum of 8 persons. We do not collect any salary data from you; where a return-on-investment figure is reported, it is calculated using an organisational salary average provided by your employer, which is never included in any report shared with management.",
        },
      ],
    },
    {
      kop: "3. Course evaluation",
      niveau: 3,
      blokken: [
        { soort: "tekst", tekst: "Via the evaluation form we collect trainer ratings and open feedback about the programme." },
        { soort: "tekst", tekst: "The evaluation form does not collect your name or email address." },
        { soort: "tekst", tekst: "**Purpose:** evaluating and improving the training programme." },
        {
          soort: "tekst",
          tekst:
            "**Legal basis:** legitimate interest (GDPR Article 6(1)(f)). Your individual responses are seen only by Innerleaps and are never shared with trainers or any third party. The Client receives only aggregated average scores.",
        },
        {
          soort: "tekst",
          tekst:
            "**Please note:** anonymised and aggregated insights from evaluations may be used for marketing purposes.",
        },
      ],
    },
    {
      kop: "Voluntary participation",
      blokken: [
        {
          soort: "tekst",
          tekst:
            "Participation in the Innerleaps training programme is entirely voluntary. Your employer offers the programme, but you decide whether to participate. You can withdraw your consent at any time without consequences for your employment relationship. The training programme is a professional development and wellbeing intervention and is not a form of healthcare. If you have health concerns that could make participation unwise, we ask you to consult your general practitioner first.",
        },
      ],
    },
    {
      kop: "Optional practice tool (Oefenbuddy)",
      blokken: [
        {
          soort: "tekst",
          tekst:
            "During the programme, usually in the first workshop, you may be offered the option to use Oefenbuddy, a voluntary practice-reminder coach over a messaging app (WhatsApp or Signal) that helps you stay motivated to do the exercises. Using it is entirely your own choice. You sign up directly with Oefenbuddy, which operates as an independent provider under its own terms and privacy policy. Innerleaps shares none of your data with Oefenbuddy and receives none of your data back. Oefenbuddy does not ask for identifying information such as your name and cannot link your use of the tool to you as an Innerleaps participant.",
        },
      ],
    },
    {
      kop: "How long do we retain your data?",
      blokken: [
        {
          soort: "tekst",
          tekst:
            "We keep your personal data only as long as we need it. Once we have produced the aggregated impact report for your employer and delivered your personal report to you, we no longer need your underlying personal data and we delete it. In any event, all personal data is deleted no later than the end of the agreement between Innerleaps and your employer (a maximum of 12 months). Only anonymised aggregates, from which you cannot be identified, are kept longer. Your employer never receives personal data, only anonymised results.",
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
            "Only Bas ter Haar Romenij (owner) has access to the full dataset. Freelance trainers engaged by Innerleaps receive only the data strictly necessary to deliver their sessions, limited to your name, work email address and your stated training goal. This data is shared on the basis of data minimisation (GDPR Article 5(1)(c)) and is used solely to contact participants about session-related matters and to tailor the training. Trainers do not receive your survey responses or any health-related data. All trainers are contractually bound to confidentiality and data protection obligations before being permitted to deliver any sessions.",
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
            "Your employer receives only anonymised, aggregated results. Individual data is never shared with your employer. No salary data is collected from you; any ROI figure is calculated using an organisational average provided by your employer, which is never included in any report shared with management.",
        },
      ],
    },
    {
      kop: "Sub-processors",
      niveau: 3,
      blokken: [
        {
          soort: "tekst",
          tekst:
            "We use Google (Google Workspace and Google Cloud) to collect, store and process data via Google Forms, Google Sheets, Google Slides, Google Drive, Gmail and Google Calendar, and to run our report automation. We have set the Google data region to Europe, so that covered data is stored at rest within the European Union. Google is a global provider, and for support and certain background processing some limited data handling may take place outside the European Economic Area; where that occurs it is governed by Standard Contractual Clauses and Google's certification under the EU-US Data Privacy Framework.",
        },
        {
          soort: "tekst",
          tekst:
            "The suppliers behind the website are listed higher up, under Visiting innerleaps.nl. All sub-processors are bound by data processing agreements with Innerleaps.",
        },
      ],
    },
    {
      kop: "International data transfers",
      blokken: [
        {
          soort: "tekst",
          tekst:
            "Innerleaps stores personal data at rest within the European Union. Where any personal data is transferred outside the European Economic Area, Innerleaps ensures appropriate safeguards are in place, including Standard Contractual Clauses and adequacy decisions, in accordance with GDPR Chapter V.",
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
            "**Right to withdraw consent**: you can withdraw your consent at any time, without giving reasons, including your explicit consent for the processing of health-related data. Withdrawal does not have retroactive effect but may affect your ability to participate in the programme.",
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
            "Innerleaps takes appropriate technical and organisational measures to protect your personal data against unauthorised access, loss or misuse. Data is stored exclusively in secure cloud environments with the data region set to Europe, protected by two-factor authentication and encryption. Access is restricted to persons who require it for the delivery of the programme.",
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
    "Document Version: 2.0",
    "Date: 11 September 2026",
    "Prepared by: Innerleaps",
    "Status: Published",
  ],
};
