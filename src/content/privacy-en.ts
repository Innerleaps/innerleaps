import type { JuridischePagina } from "./juridisch";

/** Privacy notice, English. De Nederlandse tekst staat in privacy-nl.ts en
 *  moet bij elke wijziging mee.
 *
 *  Het deel over deelnemers is vertaald uit versie 3.2 van Bas (29 oktober
 *  2026), die alleen in het Nederlands bestaat. Bij een juridische tekst is
 *  het Nederlands hier dus de bron, niet het Engels. */
export const privacyEn: JuridischePagina = {
  titel: "Privacy Notice",
  ondertitel: "**Innerleaps**, Version 3.2 | 29 October 2026",
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
            "Innerleaps is a sole trader business run by Bas ter Haar Romenij. We offer training for working professionals in attention, focus and vitality. The training is delivered by qualified trainers.",
        },
        {
          soort: "lijst",
          items: [
            "**Name:** Innerleaps (Bas ter Haar Romenij)",
            "**Address:** Koningin Wilhelminaplein 454, 1062KS Amsterdam, the Netherlands",
            "**Chamber of Commerce (KvK):** 98136925",
            "**VAT:** NL005312293B57",
            "**Email for privacy questions:** [privacy@innerleaps.nl](mailto:privacy@innerleaps.nl)",
          ],
        },
      ],
    },
    {
      kop: "Visiting innerleaps.nl",
      blokken: [
        {
          soort: "tekst",
          tekst:
            "This section is about anyone who visits our website. Here too, Innerleaps is the data controller. The rest of this notice is about people who take part in a training programme.",
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
            "Several of these are based in the United States. Where data reaches them, the transfer relies on the EU-US Data Privacy Framework and Standard Contractual Clauses, the same safeguards described further down under transfers outside the EEA.",
        },
      ],
    },
    {
      kop: "Who is responsible for your data?",
      blokken: [
        {
          soort: "tekst",
          tekst:
            "Innerleaps is the data controller within the meaning of the GDPR for the personal data we process for the training programme. That covers registration and organisation, the impact measurement, your personal report and the evaluation.",
        },
        {
          soort: "tekst",
          tekst:
            "Your employer announces the programme (and, if you register through our form, sends you the registration link). If your employer has registered you and placed you in a group, for example through the platform or the session schedule, your employer gives us your name, work email address, group, format (online or on site) and the day, time and dates of the sessions. Your employer is responsible for passing on that data. If you register through our registration form, you give us those details directly, and we pass your name, work email address and group on to your employer as a participant. We send you the links to the surveys ourselves; your employer is not involved in that. Your employer never sees your individual answers or your personal report, and does not know whether you fill in the survey.",
        },
      ],
    },
    {
      kop: "How do you end up with us?",
      blokken: [
        {
          soort: "tekst",
          tekst:
            "Your employer announces the programme, asks who is interested and invites you. Your employer registers you and places you in a group, or you register through the Innerleaps registration form. Anything your employer asks you beforehand, such as your interest or preferences, stays with your employer and we do not see it. Once you have registered or been placed in a group, we send you a first email with your group, what that means and the next steps. This privacy notice is included in that email. Later we email you the link to the survey ourselves, and a reminder if needed. Your employer is not involved in that and does not see who fills it in. Taking part is voluntary.",
        },
      ],
    },
    {
      kop: "What data do we process and why?",
      blokken: [],
    },
    {
      kop: "1. Registration and organisation of the programme",
      niveau: 3,
      blokken: [
        {
          soort: "lijst",
          items: [
            "**Data:** your name, your work email address, the group you are in, and the format, day, time and dates of the sessions.",
            "**Source:** your employer (if your employer registers you and places you in a group) or you (if you register through our registration form).",
            "**Recipients:** your employer knows that you are taking part. If you register through our form, we pass your name, work email address and group on to your employer as a participant. Your employer has bought the programme, gives you time for it during working hours and pays per participant.",
            "**Purpose:** informing you about your group (and placing you in one if you register through our form), the sessions and the next steps, and sending you programme materials.",
            '**Legal basis:** legitimate interest (GDPR Article 6(1)(f)). We deliver the programme you signed up for and pass your participation on to your employer, who bought the programme. You can object to this (see "Your rights").',
          ],
        },
      ],
    },
    {
      kop: "2. Impact measurement (before and after the programme)",
      niveau: 3,
      blokken: [
        {
          soort: "lijst",
          items: [
            "**Data:** your name and work email address (to link your answers from before and after), your reason for taking part, work performance (expected and actual hours worked, days absent due to a physical or mental health problem), life satisfaction and, if your employer has chosen that section, job satisfaction and intention to leave (those questions are optional), wellbeing (vitality, resilience and stress), how often you practise and what gets in the way.",
            "**Please note:** data about stress, vitality, resilience and health-related absence is data concerning your health (special category personal data). For that data we ask for your explicit consent.",
            "**Purpose:** measuring what the programme does for your wellbeing, productivity and work performance, producing your personal report, reporting anonymous, aggregated results to your employer and preparing an anonymous summary for your trainer.",
            "**Legal basis:** your consent (GDPR Article 6(1)(a)) and, for the health data, your explicit consent (GDPR Article 9(2)(a)).",
            "**Voluntary:** you can take part in the training without filling in the survey. If you do not give consent, you do not fill in the survey. This has no consequences for your participation in the training or for your employment relationship.",
          ],
        },
        {
          soort: "tekst",
          tekst:
            "**Your personal report.** After the programme you receive a report with your own results from before and after. If your group has at least 8 people, the report also compares your stress score with your group's average. You never see anyone else's results.",
        },
        {
          soort: "tekst",
          tekst:
            "**Anonymous results for your employer.** Your employer receives only percentages for the group as a whole, and only if at least 8 people have filled in the survey. You cannot be identified from them. We do not ask you about your salary. For a return-on-investment calculation we use an organisation-wide average salary provided by your employer.",
        },
        {
          soort: "tekst",
          tekst:
            "**Anonymous summary for your trainer.** Your trainer receives a summary of the themes in participants' reasons for taking part, so the trainer can pick up on them in the first session. This only happens if at least 8 participants have filled in the survey, without verbatim answers and without names. Your trainer cannot identify you from it.",
        },
        {
          soort: "tekst",
          tekst:
            "**Optional use for research and marketing.** If you tick the separate consent box for this, we also use your answers, once they have been anonymised and combined with those of other participants, for our own research, product development and marketing (for example results on our website). That box is optional and does not affect your participation.",
        },
      ],
    },
    {
      kop: "3. Evaluation of the training",
      niveau: 3,
      blokken: [
        {
          soort: "lijst",
          items: [
            "**Data:** your rating of the trainer and the programme, and open feedback. The form does not ask for your name or email address. Please do not enter names or health information in the open fields.",
            "**Purpose:** evaluating and improving the programme.",
            "**Legal basis:** legitimate interest (GDPR Article 6(1)(f)).",
            "**Who sees it:** only Innerleaps. Your employer receives only average scores and trainers do not see individual answers. We may also use anonymised and aggregated insights from the evaluations for marketing.",
          ],
        },
      ],
    },
    {
      kop: "Voluntary participation",
      blokken: [
        {
          soort: "tekst",
          tekst:
            "Taking part in the programme is voluntary. Your employer offers it, but you decide. The training is about personal development and wellbeing and is not a form of healthcare. If you have health problems that might make taking part unwise, please talk to your GP first.",
        },
        {
          soort: "tekst",
          tekst:
            "You can withdraw your consent at any time, without consequences for your employment relationship. We will then delete your data from the impact measurement within 5 working days. Anonymous results that your data has already become part of can no longer be traced back to you and will remain. Without consent we can no longer produce a personal report.",
        },
      ],
    },
    {
      kop: "Optional practice tool (Oefenbuddy)",
      blokken: [
        {
          soort: "tekst",
          tekst:
            "During the programme, usually in the first workshop, you can choose to use Oefenbuddy. It is a voluntary practice coach on a messaging app (WhatsApp or Signal) that helps you keep up the exercises. Using it is entirely your choice. You sign up directly with Oefenbuddy, which operates as an independent provider under its own terms and privacy policy. Innerleaps does not share any data with Oefenbuddy and receives none back. Oefenbuddy does not ask for details such as your name and cannot link your use to you as an Innerleaps participant.",
        },
      ],
    },
    {
      kop: "How long do we keep your data?",
      blokken: [
        {
          soort: "tekst",
          tekst:
            "We do not keep your personal data longer than necessary. Once we have delivered the report for your employer and your personal report, we delete the data that could identify you. In any case we delete it no later than 12 months after the programme ends. If your group does not go ahead, we delete your data within 30 days of that being confirmed. Only anonymised results, from which you cannot be identified, are kept longer. Your employer never receives personal data from the impact measurement, only anonymous results.",
        },
      ],
    },
    {
      kop: "Who sees your data?",
      blokken: [
        {
          soort: "lijst",
          items: [
            "**Innerleaps:** only Bas ter Haar Romenij has access to all the data.",
            "**Trainers:** freelance trainers do not receive a list of participant details from us. In the sessions they see the email addresses of participants who log in. If you contact your trainer yourself, for example to cancel, the trainer sees your phone number or email address. They do not see individual answers or health data, only the anonymous summary described above. They are bound by confidentiality and do not use anything outside the training.",
            "**Your employer:** knows that you are taking part in the training. If you register through our form, your employer receives your name, work email address and group from us as a participant. Beyond that, your employer sees only the anonymous, aggregated report. Your employer never receives individual answers and does not know who fills in the survey.",
            '**Google:** we use Google Workspace (Forms, Sheets, Slides, Drive, Gmail and Calendar) to collect and store data. Google is our processor. See "Transfers outside the EEA" below.',
            "**Report automation:** your reports are produced with software that runs locally on Innerleaps' encrypted computer. The software is not online, no other party is involved, and no copies of your data remain on the computer once your report has been produced.",
          ],
        },
        { soort: "tekst", tekst: "We do not share your data with anyone else." },
      ],
    },
    {
      kop: "Transfers outside the EEA",
      blokken: [
        {
          soort: "tekst",
          tekst:
            "Google may also process personal data outside the European Economic Area (EEA), for example for support and background processing. In that case we put appropriate safeguards in place in line with Chapter V of the GDPR: Standard Contractual Clauses and Google's certification under the EU-US Data Privacy Framework. You can request a copy of these safeguards at [privacy@innerleaps.nl](mailto:privacy@innerleaps.nl).",
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
            "**Access** (Article 15): you can ask which data we process about you.",
            "**Rectification** (Article 16): you can have incorrect data corrected.",
            "**Erasure** (Article 17): you can ask us to delete your data.",
            "**Restriction** (Article 18): you can ask us to restrict the processing.",
            "**Data portability** (Article 20): you can request your data in a structured format.",
            "**Objection** (Article 21): you can object to processing based on legitimate interest.",
            "**Withdrawing consent:** you can withdraw your consent at any time, without giving a reason, including your explicit consent for health data. Withdrawal does not apply retroactively, but we will then delete your data from the impact measurement within 5 working days.",
          ],
        },
        {
          soort: "tekst",
          tekst:
            "Send your request to [privacy@innerleaps.nl](mailto:privacy@innerleaps.nl). If you send it to your employer, they will pass it on to us. We respond within one month.",
        },
        {
          soort: "tekst",
          tekst:
            "You also have the right to lodge a complaint with the Dutch Data Protection Authority, the Autoriteit Persoonsgegevens ([autoriteitpersoonsgegevens.nl](https://autoriteitpersoonsgegevens.nl)), or with the supervisory authority in your country of residence.",
        },
      ],
    },
    {
      kop: "Security",
      blokken: [
        {
          soort: "tekst",
          tekst:
            "Innerleaps takes appropriate technical and organisational measures to protect your data against unauthorised access, loss or misuse. Data is stored in Google Workspace, secured with two-step verification and encryption. Reports are produced on Innerleaps' encrypted computer, which keeps no copies of your data afterwards. Only those who need it to deliver the programme have access.",
        },
      ],
    },
    {
      kop: "Changes",
      blokken: [
        {
          soort: "tekst",
          tekst:
            "Innerleaps may amend this privacy notice. The latest version is always available at [innerleaps.nl/en/privacy](/en/privacy). We recommend that you read this notice regularly.",
        },
      ],
    },
    {
      kop: "Contact",
      blokken: [
        {
          soort: "tekst",
          tekst:
            "For questions about this privacy notice or the processing of your personal data, you can reach us at [privacy@innerleaps.nl](mailto:privacy@innerleaps.nl). Innerleaps, Koningin Wilhelminaplein 454, 1062KS Amsterdam, the Netherlands.",
        },
      ],
    },
  ],
  voettekst: ["Document Version: 3.2", "Date: 29 October 2026", "Prepared by: Innerleaps", "Status: Published"],
};
