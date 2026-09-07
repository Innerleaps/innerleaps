import { memo } from "react";
import { Helmet } from "react-helmet-async";
import SimplifiedNavigation from "@/components/SimplifiedNavigation";
import Footer from "@/components/Footer";

const PrivacyNotice = memo(() => {
  return (
    <>
      <Helmet>
        <title>Privacy Notice | Innerleaps</title>
        <meta name="description" content="Privacy notice van Innerleaps. Lees hoe wij omgaan met persoonsgegevens van bezoekers van de website en van deelnemers aan onze trainingen." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <SimplifiedNavigation />
      <main className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-purple mb-4 leading-tight">
            Privacy Notice
          </h1>
          <p className="text-brand-gray-medium text-xl mb-12">
            <strong>Innerleaps</strong>, Version 1.7 | September 2026
          </p>

          <div className="prose max-w-none space-y-8 text-brand-gray-dark leading-relaxed">
            {/* Who are we */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-4">Who are we?</h2>
              <p className="text-xl mb-6">
                Innerleaps is a training company specialising in brain training for professionals. We deliver training programs at companies, executed by qualified trainers.
              </p>
            </section>

            {/* Website visitors */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-4">Visiting innerleaps.nl</h2>
              <p className="text-xl mb-4">
                This section is about anyone who visits our website. The rest of this notice is about people who take part in a training programme, where your employer decides what happens with your data. For the website it works differently: there, Innerleaps decides, so Innerleaps is the data controller.
              </p>

              <h3 className="text-xl md:text-2xl font-semibold text-brand-purple mb-3">Cookies and your choice</h3>
              <p className="text-xl mb-4">
                We place no analytics or advertising cookies until you agree. When you first arrive, a bar at the bottom of the screen asks you to choose. Until you make that choice, the measurement tools on this site are switched off and store nothing on your device.
              </p>
              <p className="text-xl mb-4">
                Two things are stored regardless, because the site cannot work without them: your language choice and your cookie choice itself. They stay in your own browser, we never see them, and they are not used to follow you.
              </p>
              <p className="text-xl mb-4">
                You can change your mind whenever you like. At the bottom of every page there is a link called <strong>Cookie preferences</strong>. It reopens the same panel, and switching something off stops it straight away.
              </p>

              <h3 className="text-xl md:text-2xl font-semibold text-brand-purple mb-3">What we measure once you agree</h3>
              <ul className="list-disc ml-6 space-y-3 text-xl mb-4">
                <li>
                  <strong>Google Analytics 4:</strong> which pages get visited, how people move through the site and where they drop off. We use this to improve the site.
                </li>
                <li>
                  <strong>Google Ads:</strong> whether an advert brought you here and what you did afterwards, so we do not keep paying for adverts that lead nowhere.
                </li>
                <li>
                  <strong>Apollo:</strong> recognises which organisation a visit is likely to come from, based on your network address. This is for our own sales follow-up, and it only runs if you accept advertising cookies.
                </li>
              </ul>
              <p className="text-xl mb-4">
                If you fill in one of our forms and you have accepted advertising cookies, your email address is also sent to Google so it can match your enquiry to the advert you clicked. It is scrambled first, on your own device, using an irreversible calculation called SHA-256. Google receives that scrambled version and never the readable address.
              </p>
              <p className="text-xl mb-6">
                <strong>Legal basis:</strong> your consent (GDPR Article 6(1)(a)) for everything in this list. For the language and cookie choice stored in your browser: our legitimate interest in a site that works (GDPR Article 6(1)(f)).
              </p>

              <h3 className="text-xl md:text-2xl font-semibold text-brand-purple mb-3">Forms on the website</h3>
              <p className="text-xl mb-2">You can leave your details in four places. Each one is voluntary, and you always see beforehand what we ask for.</p>
              <ul className="list-disc ml-6 space-y-3 text-xl mb-4">
                <li>
                  <strong>The savings calculator:</strong> your name, work email address, organisation name and the figures you enter about absence, headcount and average salary. We email you the outcome and store your entry so we can follow up.
                </li>
                <li>
                  <strong>The scientific report:</strong> your name, work email address and organisation name. We email you the report and store your request.
                </li>
                <li>
                  <strong>The contact form:</strong> your name, email address and message. This is emailed to us and nothing is stored in a database.
                </li>
                <li>
                  <strong>Booking a call:</strong> handled by Calendly. You give your name, email address and a time. Calendly's own privacy statement applies to that booking.
                </li>
              </ul>
              <p className="text-xl mb-4">
                <strong>Purpose:</strong> answering you, sending what you asked for, and following up on your interest. We do not sell your details and we do not pass them to anyone outside the suppliers listed below.
              </p>
              <p className="text-xl mb-4">
                <strong>Legal basis:</strong> your consent (GDPR Article 6(1)(a)).
              </p>
              <p className="text-xl mb-6">
                <strong>How long:</strong> for as long as we are still in touch about your enquiry. Ask us to delete it and we will, at any time, at <strong>privacy@innerleaps.nl</strong>.
              </p>

              <h3 className="text-xl md:text-2xl font-semibold text-brand-purple mb-3">Suppliers behind the website</h3>
              <ul className="list-disc ml-6 space-y-3 text-xl mb-4">
                <li><strong>Netlify:</strong> hosts the website. Like any web server it keeps short-lived technical logs, including network addresses, to serve pages and block abuse.</li>
                <li><strong>Supabase:</strong> runs the database and the code that handles the forms.</li>
                <li><strong>Resend:</strong> sends the emails those forms trigger.</li>
                <li><strong>Google (Analytics and Ads):</strong> measurement, only after you agree.</li>
                <li><strong>Apollo:</strong> organisation recognition, only after you agree to advertising cookies.</li>
                <li><strong>Calendly:</strong> the appointment calendar on our contact page.</li>
              </ul>
              <p className="text-xl">
                Several of these are based in the United States. Where data reaches them, the transfer relies on the EU-US Data Privacy Framework and Standard Contractual Clauses, the same safeguards described further down under international data transfers.
              </p>
            </section>

            {/* Who is responsible */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-4">Who is responsible for your data?</h2>
              <p className="text-xl mb-4">
                Your employer is the data controller for the personal data collected in the context of the Innerleaps training program. Your employer has decided to offer this program to employees and has engaged Innerleaps to deliver it.
              </p>
              <p className="text-xl mb-4">
                Innerleaps is the data processor, processing your personal data on behalf of your employer in accordance with a data processing agreement.
              </p>
              <p className="text-xl mb-4">
                For questions about your privacy or to exercise your rights, you can contact:
              </p>
              <ul className="list-disc ml-6 space-y-1 text-xl mb-6">
                <li>Your employer (HR department), or</li>
                <li>Innerleaps: <strong>privacy@innerleaps.nl</strong></li>
              </ul>
              <div className="bg-brand-off-white p-6 rounded-xl text-xl space-y-1">
                <p className="!text-brand-gray-dark font-semibold">Innerleaps contact details:</p>
                <p className="!text-brand-gray-dark">Innerleaps</p>
                <p className="!text-brand-gray-dark">Bas ter Haar Romenij</p>
                <p className="!text-brand-gray-dark">Koningin Wilhelminaplein 454</p>
                <p className="!text-brand-gray-dark">1062KS Amsterdam, the Netherlands</p>
                <p className="!text-brand-gray-dark">Chamber of Commerce: 98136925</p>
                <p className="!text-brand-gray-dark">VAT: NL005312293B57</p>
                <p className="!text-brand-gray-dark">Email: privacy@innerleaps.nl</p>
              </div>
            </section>

            {/* What personal data */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-4">What personal data do we process and why?</h2>
              <p className="text-xl mb-6">We process personal data exclusively for the following purposes:</p>

              {/* 1. Sign-up */}
              <h3 className="text-xl md:text-2xl font-semibold text-brand-purple mb-3">1. Sign-up and recruitment</h3>
              <p className="text-xl mb-2">When you express interest in the training program via the sign-up form, we collect:</p>
              <ul className="list-disc ml-6 space-y-1 text-xl mb-3">
                <li>Name</li>
                <li>Email address</li>
              </ul>
              <p className="text-xl"><strong>Purpose:</strong> Following up on your interest in the program.</p>
              <p className="text-xl mb-6"><strong>Legal basis:</strong> Consent (GDPR Article 6(1)(a)).</p>

              {/* 2. Intake */}
              <h3 className="text-xl md:text-2xl font-semibold text-brand-purple mb-3">2. Participant intake and qualification</h3>
              <p className="text-xl mb-2">Via the intake form we collect:</p>
              <ul className="list-disc ml-6 space-y-1 text-xl mb-3">
                <li>Name, email address, phone number, job title and motivation</li>
                <li>Health data: information about mental health, medication use, trauma history and substance use</li>
              </ul>
              <p className="text-xl"><strong>Purpose:</strong> Assessing whether participation in the program is suitable and safe for you. Based on your answers, Innerleaps may determine that participation is not advisable for you at this time.</p>
              <p className="text-xl"><strong>Legal basis:</strong> Explicit consent (GDPR Article 6(1)(a) and Article 9(2)(a)).</p>
              <p className="text-xl mb-6"><strong>Please note:</strong> This concerns special category personal data within the meaning of the GDPR. We process this data with extra care and solely for the purpose stated above. The Innerleaps training program is a professional development and wellness intervention, not a form of healthcare or psychotherapy. It does not replace professional medical or psychological care.</p>

              {/* 3. Impact */}
              <h3 className="text-xl md:text-2xl font-semibold text-brand-purple mb-3">3. Impact measurement</h3>
              <p className="text-xl mb-2">Via the impact measurement survey we collect:</p>
              <ul className="list-disc ml-6 space-y-1 text-xl mb-3">
                <li>Name and email address</li>
                <li>Productivity</li>
                <li>Resilience</li>
                <li>Vitality</li>
                <li>Stress levels</li>
                <li>Training frequency and training barriers</li>
                <li>Job satisfaction</li>
                <li>Turnover intention</li>
              </ul>
              <p className="text-xl"><strong>Purpose:</strong> Measuring the impact of the training program on wellness, productivity and work performance.</p>
              <p className="text-xl"><strong>Legal basis:</strong> Legitimate interest of your employer (GDPR Article 6(1)(f)) and consent (GDPR Article 6(1)(a)).</p>
              <p className="text-xl mb-6"><strong>Important:</strong> Your individual responses are never shared with your employer. Management receives only anonymised, aggregated results. A management report is issued only when the training group contains a minimum of 8 persons; where a qualifying control group of at least 8 persons is also available, a full comparative report is issued. No salary data is collected from you individually; ROI figures are calculated using an organisational average provided by your employer.</p>

              {/* 4. Evaluation */}
              <h3 className="text-xl md:text-2xl font-semibold text-brand-purple mb-3">4. Course evaluation</h3>
              <p className="text-xl mb-2">Via the evaluation form we collect:</p>
              <ul className="list-disc ml-6 space-y-1 text-xl mb-3">
                <li>Trainer ratings</li>
                <li>Open feedback about the program</li>
              </ul>
              <p className="text-xl mb-2">The evaluation form does not collect your name or email address.</p>
              <p className="text-xl"><strong>Purpose:</strong> Evaluating and improving the training program.</p>
              <p className="text-xl"><strong>Legal basis:</strong> Legitimate interest (GDPR Article 6(1)(f)). Innerleaps has a legitimate interest in evaluating trainer performance and program quality. Your individual responses are seen only by Innerleaps and are never shared with your employer, trainers or any third party. Management receives only average scores.</p>
              <p className="text-xl mb-6"><strong>Please note:</strong> Anonymised and aggregated insights from evaluations may be used for marketing purposes.</p>
            </section>

            {/* Voluntary participation */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-4">Voluntary participation</h2>
              <p className="text-xl">Participation in the Innerleaps training program is entirely voluntary. Your employer offers the program, but you decide whether to participate. You can withdraw your consent at any time without consequences for your employment relationship.</p>
            </section>

            {/* Retention */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-4">How long do we retain your data?</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xl border-collapse">
                  <thead>
                    <tr className="border-b-2 border-brand-purple/20">
                      <th className="text-left py-3 pr-4 font-semibold text-brand-purple">Category</th>
                      <th className="text-left py-3 font-semibold text-brand-purple">Retention period</th>
                    </tr>
                  </thead>
                  <tbody className="text-brand-gray-dark">
                    <tr className="border-b border-gray-200">
                      <td className="py-3 pr-4">Sign-up data</td>
                      <td className="py-3">Until the end of the agreement between Innerleaps and your employer</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 pr-4">Intake data</td>
                      <td className="py-3">Until the end of the agreement between Innerleaps and your employer</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 pr-4">Impact measurement data</td>
                      <td className="py-3">Until the end of the agreement between Innerleaps and your employer</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 pr-4">Evaluation data</td>
                      <td className="py-3">Until the end of the agreement between Innerleaps and your employer</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Anonymised aggregates</td>
                      <td className="py-3">Indefinitely, provided all identifying information has been irreversibly removed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xl mt-4">After the agreement ends, all personal data is deleted. Your employer never receives personal data, only anonymised results.</p>
            </section>

            {/* Access */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-4">Who has access to your data?</h2>

              <h3 className="text-xl md:text-2xl font-semibold text-brand-purple mb-3">Innerleaps itself</h3>
              <p className="text-xl mb-4">Only Bas ter Haar Romenij (owner) has access to the full dataset. Freelance trainers engaged by Innerleaps receive only the data strictly necessary for the delivery of their sessions, limited to your name, telephone number and email address. This data is shared on the basis of the principle of data minimisation (GDPR Article 5(1)(c)) and is used solely to contact participants in the event of scheduling changes or session-related communications. All trainers are contractually bound to confidentiality and data protection obligations before being permitted to deliver any sessions.</p>

              <h3 className="text-xl md:text-2xl font-semibold text-brand-purple mb-3">Your employer</h3>
              <p className="text-xl mb-4">Your employer receives only anonymised, aggregated results. Individual data is never shared with your employer. No salary data is collected from you individually; ROI figures are calculated using an organisational average provided by your employer, which is never included in any report shared with management.</p>

              <h3 className="text-xl md:text-2xl font-semibold text-brand-purple mb-3">Sub-processors</h3>
              <p className="text-xl mb-3">We use the following sub-processors:</p>
              <ul className="list-disc ml-6 space-y-3 text-xl mb-4">
                <li><strong>Google Workspace (Google LLC):</strong> used to collect and store data via Google Forms, Google Sheets and Gmail. Google LLC is based in the United States. Data transfers to the US take place on the basis of the EU-US Data Privacy Framework and Standard Contractual Clauses (SCCs).</li>
                <li><strong>n8n:</strong> used for automated workflow processing of form data. n8n GmbH is based in Germany (EU) and is bound by a data processing agreement with Innerleaps.</li>
              </ul>
              <p className="text-xl">All sub-processors are required to process data in accordance with GDPR requirements and are bound by data processing agreements with Innerleaps.</p>
            </section>

            {/* International transfers */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-4">International data transfers</h2>
              <p className="text-xl">Innerleaps works with clients and participants inside and outside the European Union. Where personal data is transferred outside the EEA, Innerleaps ensures appropriate safeguards are in place, including Standard Contractual Clauses (SCCs) and adequacy decisions, in accordance with GDPR Chapter V.</p>
            </section>

            {/* Your rights */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-4">Your rights</h2>
              <p className="text-xl mb-4">Under the GDPR you have the following rights:</p>
              <ul className="space-y-3 text-xl">
                <li><strong>Right of access</strong> (Article 15): you can request which data we process about you.</li>
                <li><strong>Right to rectification</strong> (Article 16): you can request correction of inaccurate data.</li>
                <li><strong>Right to erasure</strong> (Article 17): you can request deletion of your data.</li>
                <li><strong>Right to restriction of processing</strong> (Article 18): you can request that processing be restricted.</li>
                <li><strong>Right to data portability</strong> (Article 20): you can request your data in a structured format.</li>
                <li><strong>Right to object</strong> (Article 21): you can object to processing based on legitimate interest.</li>
                <li><strong>Right to withdraw consent</strong>: you can withdraw your consent at any time, without giving reasons. Withdrawal does not have retroactive effect but may affect your ability to participate in the program.</li>
              </ul>
              <p className="text-xl mt-4">To submit a request, you can contact your employer's HR department or contact Innerleaps directly at <strong>privacy@innerleaps.nl</strong>. We will respond within 30 days.</p>
              <p className="text-xl mt-2">You also have the right to lodge a complaint with the Dutch Data Protection Authority (Autoriteit Persoonsgegevens) at autoriteitpersoonsgegevens.nl, or with the supervisory authority in your country of residence.</p>
            </section>

            {/* Security */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-4">Security</h2>
              <p className="text-xl">Innerleaps takes appropriate technical and organisational measures to protect your personal data against unauthorised access, loss or misuse. Data is stored exclusively in secure cloud environments. Access is restricted to persons who require it for the delivery of the program.</p>
            </section>

            {/* Changes */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-4">Changes to this privacy notice</h2>
              <p className="text-xl">Innerleaps reserves the right to amend this privacy notice. The most current version is always available on innerleaps.nl via the footer of the website. We recommend consulting this notice periodically.</p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-4">Contact</h2>
              <p className="text-xl mb-4">For questions about this privacy notice or the processing of your personal data, please contact us at:</p>
              <div className="bg-brand-off-white p-6 rounded-xl text-xl space-y-1">
                <p className="!text-brand-gray-dark font-semibold">privacy@innerleaps.nl</p>
                <p className="!text-brand-gray-dark">Innerleaps, Koningin Wilhelminaplein 454, 1062KS Amsterdam, the Netherlands</p>
              </div>
            </section>

            {/* Version info */}
            <div className="border-t border-gray-200 pt-8 mt-8 text-brand-gray-medium text-lg space-y-1">
              <p>Document Version: 1.7</p>
              <p>Date: September 2026</p>
              <p>Prepared by: Innerleaps</p>
              <p>Status: Published</p>
            </div>
          </div>
        </div>
      </main>
      <Footer showNavigation={false} />
    </>
  );
});

PrivacyNotice.displayName = "PrivacyNotice";

export default PrivacyNotice;
