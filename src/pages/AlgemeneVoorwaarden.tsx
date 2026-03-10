import { memo } from "react";
import { Helmet } from "react-helmet-async";
import SimplifiedNavigation from "@/components/SimplifiedNavigation";
import Footer from "@/components/Footer";

const AlgemeneVoorwaarden = memo(() => {
  return (
    <>
      <Helmet>
        <title>Algemene Voorwaarden | Innerleaps</title>
        <meta name="description" content="Algemene voorwaarden van Innerleaps. Lees onze voorwaarden voor trainingen, dienstverlening en samenwerking." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <SimplifiedNavigation />
      <main className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-purple mb-4 leading-tight">
            General Terms and Conditions
          </h1>
          <p className="text-brand-gray-medium text-xl mb-12">
            <strong>Innerleaps</strong> — Version 1.7 | 10 March 2026
          </p>

          <div className="prose max-w-none space-y-8 text-brand-gray-dark leading-relaxed">
            {/* Contact block */}
            <div className="bg-brand-off-white p-6 rounded-xl text-xl space-y-1">
              <p className="!text-brand-gray-dark">Innerleaps</p>
              <p className="!text-brand-gray-dark">Bas ter Haar Romenij</p>
              <p className="!text-brand-gray-dark">Koningin Wilhelminaplein 454</p>
              <p className="!text-brand-gray-dark">1062KS Amsterdam, Netherlands</p>
              <p className="!text-brand-gray-dark">Chamber of Commerce: 98136925</p>
              <p className="!text-brand-gray-dark">VAT: NL005312293B57</p>
              <p className="!text-brand-gray-dark">Email: info@innerleaps.nl</p>
            </div>

            {/* Article 1 */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-4">Article 1: Definitions</h2>
              <ul className="space-y-3 text-xl">
                <li><strong>1.1 Innerleaps:</strong> the private company Innerleaps, registered with the Dutch Chamber of Commerce under number 98136925, acting as the service provider under these Terms.</li>
                <li><strong>1.2 Client:</strong> the legal entity that enters into an Agreement with Innerleaps for the delivery of training services.</li>
                <li><strong>1.3 Participant:</strong> the individual employee of the Client who takes part in the training program.</li>
                <li><strong>1.4 Agreement:</strong> the written agreement between Innerleaps and the Client governing the delivery of services, of which these Terms form an integral part.</li>
                <li><strong>1.5 Masterclass:</strong> the introductory session delivered by Innerleaps to introduce the training program to prospective Participants, during and after which Participants may register for the training.</li>
                <li><strong>1.6 Training:</strong> the full Innerleaps brain training program delivered to Participants following the Masterclass.</li>
                <li><strong>1.7 Terms:</strong> these General Terms and Conditions.</li>
                <li><strong>1.8 Data Processing Agreement:</strong> the separate written agreement between Innerleaps and the Client governing the processing of personal data of Participants, concluded alongside these Terms.</li>
              </ul>
            </section>

            {/* Article 2 */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-4">Article 2: Applicability</h2>
              <ul className="space-y-3 text-xl">
                <li><strong>2.1</strong> These Terms apply to all offers, quotations, Agreements and services provided by Innerleaps to the Client.</li>
                <li><strong>2.2</strong> Any deviating conditions of the Client are explicitly rejected unless Innerleaps has accepted them in writing.</li>
                <li><strong>2.3</strong> These Terms also apply to any follow-up agreements with the Client.</li>
                <li><strong>2.4</strong> If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions remain in full force and effect.</li>
                <li><strong>2.5</strong> These Terms are provided to the Client before or at the moment of signing the Agreement and are available at all times on the Innerleaps website under General Terms and Conditions.</li>
              </ul>
            </section>

            {/* Article 3 */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-4">Article 3: Offers and Agreements</h2>
              <ul className="space-y-3 text-xl">
                <li><strong>3.1</strong> All offers made by Innerleaps are without obligation unless explicitly stated otherwise in writing.</li>
                <li><strong>3.2</strong> An Agreement is concluded at the moment the Client signs the Agreement or confirms acceptance in writing, including by email.</li>
                <li><strong>3.3</strong> By signing or accepting the Agreement, the Client agrees to the price and scope of the services as described in the Agreement and to these Terms.</li>
                <li><strong>3.4</strong> Innerleaps reserves the right to refuse an assignment without stating reasons.</li>
              </ul>
            </section>

            {/* Article 4 */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-4">Article 4: Services</h2>
              <ul className="space-y-3 text-xl">
                <li><strong>4.1</strong> Innerleaps delivers the training program as described in the Agreement. This includes the Masterclass and, where applicable, the full training program.</li>
                <li><strong>4.2</strong> The Masterclass is provided free of charge provided the training program subsequently takes place with a sufficient number of registered Participants, subject to Article 6.</li>
                <li><strong>4.3</strong> Innerleaps delivers services either in person or online, depending on what has been agreed with the Client. Innerleaps may engage qualified freelance trainers to deliver sessions on its behalf. The specific trainer may vary per assignment. Innerleaps remains fully responsible for the quality and delivery of all services regardless of who delivers them. All freelance trainers engaged by Innerleaps are contractually bound to confidentiality and data protection obligations equivalent to those applicable to Innerleaps under these Terms and the Data Processing Agreement, before being permitted to deliver any sessions. In the event that a scheduled trainer is unexpectedly unavailable, Innerleaps will arrange an alternative trainer or schedule an additional session to ensure the full program is delivered as agreed. No financial compensation will be provided in such cases.</li>
                <li><strong>4.4</strong> Innerleaps will make every effort to deliver the services with due care and in accordance with the standards that may reasonably be expected of a professional in this field.</li>
                <li><strong>4.5</strong> The Client is responsible for creating the conditions necessary for the successful delivery of the training, including communicating the program to employees, facilitating Participant registration, and ensuring employees can attend scheduled sessions. If the Client's failure to meet these obligations results in one or more sessions not being delivered as planned, Innerleaps' delivery obligation is considered fulfilled for those sessions and no refund applies.</li>
                <li><strong>4.6</strong> The training program is not a form of healthcare or psychotherapy and Innerleaps is not a healthcare provider. The program is designed as a professional development and wellness intervention. If during the intake assessment or the training program a Participant discloses or displays signs of acute mental health distress, Innerleaps may refer that Participant to appropriate professional support. Such referral does not constitute a breach of contract and may result in exclusion from the program in accordance with Article 5.4. Innerleaps is not liable for the mental health outcomes of Participants. Innerleaps' obligation with respect to participant safety is fulfilled through the intake assessment process. Innerleaps does not assume any ongoing duty of care with respect to the physical or mental health of Participants beyond what is required to deliver the program with reasonable professional skill.</li>
                <li><strong>4.7</strong> The Client agrees not to directly engage, hire, or contract any trainer introduced by Innerleaps in the context of an Agreement, whether as an employee, contractor, or in any other capacity, for a period of 12 months following the end of the Agreement in which that trainer was introduced. A breach of this clause entitles Innerleaps to claim a fixed compensation of €30,000 per trainer engaged in breach of this clause, without prejudice to Innerleaps' right to claim additional damages where actual loss exceeds this amount.</li>
              </ul>
            </section>

            {/* Article 5 */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-4">Article 5: Participant Registration and Program Scope</h2>
              <ul className="space-y-3 text-xl">
                <li><strong>5.1</strong> The definitive number of Participants, and therefore the final scope and price of the Agreement, is determined following the Masterclass. Participants may register during the Masterclass and up to 5 working days thereafter.</li>
                <li><strong>5.2</strong> The price stated in the Agreement is based on the expected number of Participants. The final invoice will reflect the confirmed number of registered Participants unless a fixed price has been agreed.</li>
                <li><strong>5.3</strong> Innerleaps reserves the right to set a minimum number of Participants required for the training to proceed. This minimum will be stated in the Agreement.</li>
                <li><strong>5.4</strong> Innerleaps reserves the right to exclude a Participant from the training program following the intake assessment if contraindications are identified that make participation inadvisable. The Client will be informed of any exclusion without details of the underlying health information being disclosed. The payment obligation in such cases is governed by Article 6.5.</li>
              </ul>
            </section>

            {/* Article 6 */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-4">Article 6: Cancellation and Masterclass Fee</h2>
              <ul className="space-y-3 text-xl">
                <li><strong>6.1</strong> The Client may cancel a scheduled Masterclass free of charge provided cancellation is communicated to Innerleaps in writing at least 3 calendar days before the scheduled Masterclass date. If the Client cancels within 3 calendar days of the scheduled date, or if the Masterclass cannot take place as planned due to circumstances attributable to the Client, including but not limited to insufficient time being allocated to Innerleaps to deliver the Masterclass due to overrun in the Client's own program, the Client owes Innerleaps a cancellation fee of €950. Cancellation of the Agreement itself prior to any Masterclass being scheduled remains free of charge.</li>
                <li><strong>6.2</strong> If the Masterclass has taken place but the minimum number of Participants required for the training to proceed, as stated in the Agreement in accordance with Article 5.3, has not been reached, the following applies:
                  <ul className="mt-2 ml-4 space-y-2">
                    <li><strong>a)</strong> Innerleaps and the Client will work together in good faith to plan a second Masterclass within 1 month of establishing that registration numbers are insufficient.</li>
                    <li><strong>b)</strong> A maximum of 2 Masterclasses will be delivered under a single Agreement. If after the second Masterclass the minimum number of Participants has still not been reached, the Client owes Innerleaps a Masterclass fee of €950, unless the Client and Innerleaps mutually agree in writing to extend the Agreement.</li>
                  </ul>
                </li>
                <li><strong>6.3</strong> If the training proceeds following the Masterclass, no Masterclass fee is charged. The full agreed price for the training program is then due as specified in the Agreement.</li>
                <li><strong>6.4</strong> The Client's payment obligation for a Participant arises at the moment Innerleaps has reviewed the Participant's intake information and has communicated written approval of the Participant's admission to the training program. From that moment, the agreed fee for that Participant is due in full, regardless of whether the Participant subsequently completes the training, withdraws, or is unable to attend sessions. No refunds will be provided in any of these circumstances. Participants who are not approved by Innerleaps following the intake assessment are not charged.</li>
                <li><strong>6.5</strong> If Innerleaps is required to cancel or reschedule a Masterclass, Innerleaps will notify the Client as soon as possible and will offer at least one alternative date within 30 days. No compensation is due in such cases.</li>
                <li><strong>6.6</strong> Cancellation must always be communicated in writing to info@innerleaps.nl.</li>
              </ul>
            </section>

            {/* Article 7 */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-4">Article 7: Payment</h2>
              <ul className="space-y-3 text-xl">
                <li><strong>7.1</strong> Payment of the full agreed amount is due prior to the commencement of the training program, unless otherwise agreed in writing. Innerleaps will issue the final invoice within 5 working days of all Participant approvals being communicated. Payment is due within 14 days of the invoice date and in all cases before the first training session commences.</li>
                <li><strong>7.2</strong> Innerleaps reserves the right to issue a separate invoice for the Masterclass fee referred to in Article 6, where applicable. Such invoice is subject to the same payment terms as set out in Article 7.1.</li>
                <li><strong>7.3</strong> If payment is not received within the agreed term, the Client is in default without further notice being required. From the date of default, statutory commercial interest (wettelijke handelsrente) as referred to in Article 6:119a of the Dutch Civil Code applies automatically on the outstanding amount. Innerleaps reserves the right to suspend delivery of services until payment has been received in full.</li>
                <li><strong>7.4</strong> All prices are exclusive of VAT unless stated otherwise.</li>
                <li><strong>7.5</strong> Innerleaps reserves the right to adjust prices for future Agreements. Prices agreed in a signed Agreement will not be amended during the term of that Agreement.</li>
              </ul>
            </section>

            {/* Article 8 */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-4">Article 8: Intellectual Property</h2>
              <ul className="space-y-3 text-xl">
                <li><strong>8.1</strong> All training materials, methodologies, tools, exercises and content developed or used by Innerleaps remain the intellectual property of Innerleaps at all times.</li>
                <li><strong>8.2</strong> Participants may use training materials for personal application and may share them internally within the Client organisation.</li>
                <li><strong>8.3</strong> Training materials may not be reproduced, published, sold, licensed or otherwise used for commercial purposes outside the Client organisation without the prior written consent of Innerleaps.</li>
                <li><strong>8.4</strong> Nothing in this Article limits Innerleaps from freely using knowledge, insights and experience gained during the delivery of services, provided no confidential information of the Client is disclosed.</li>
              </ul>
            </section>

            {/* Article 9 */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-4">Article 9: Confidentiality</h2>
              <ul className="space-y-3 text-xl">
                <li><strong>9.1</strong> Innerleaps treats all information shared by the Client and its employees in the context of the training program as confidential. This includes organisational information, internal challenges, team dynamics and any other information that is reasonably understood to be confidential in nature. This obligation applies to all persons acting on behalf of Innerleaps, including its owner, any employees, freelance trainers, and other subcontractors engaged in the delivery of services.</li>
                <li><strong>9.2</strong> Innerleaps will not disclose such information to third parties without the prior written consent of the Client, except where required by law or court order.</li>
                <li><strong>9.3</strong> Innerleaps may publicly reference the Client by name as a customer and may state aggregated, anonymised impact results from the training program for marketing and professional purposes, including percentage-based changes in wellness and productivity metrics and ROI figures, provided such results are based on a minimum of 10 persons in the training group and 10 persons in the control group. Underlying salary data, absolute figures and individual information will never be disclosed publicly. This right is subject to any specific arrangements agreed in the Data Processing Agreement between the parties.</li>
                <li><strong>9.4</strong> The Client agrees to treat information about Innerleaps' methodology and pricing as confidential and will not share this with third parties without Innerleaps' prior written consent. Working practices may be shared freely.</li>
                <li><strong>9.5</strong> Confidentiality obligations survive termination of the Agreement for a period of 5 years.</li>
              </ul>
            </section>

            {/* Article 10 */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-4">Article 10: Data Processing and Privacy</h2>
              <ul className="space-y-3 text-xl">
                <li><strong>10.1</strong> In the context of delivering the training program, Innerleaps processes personal data of the Client's employees, including special category health data collected via the intake assessment. A Data Processing Agreement is always concluded between the parties alongside these Terms. These Terms do not take effect without a signed Data Processing Agreement being in place.</li>
                <li><strong>10.2</strong> Innerleaps processes personal data in accordance with the General Data Protection Regulation (GDPR) and applicable Dutch data protection legislation.</li>
                <li><strong>10.3</strong> Innerleaps' privacy notice, which describes how personal data is collected, processed and protected, is available on the Innerleaps website. A link to the privacy notice can be found in the footer of the website. By entering into an Agreement with Innerleaps, the Client confirms that it has read and understood the privacy notice.</li>
                <li><strong>10.4</strong> The Client is responsible for informing its employees about the data collection and processing that takes place in the context of the training program, in accordance with the obligations set out in the Data Processing Agreement.</li>
              </ul>
            </section>

            {/* Article 11 */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-4">Article 11: Liability</h2>
              <ul className="space-y-3 text-xl">
                <li><strong>11.1</strong> Innerleaps is liable for direct damages suffered by the Client that are the direct result of a demonstrable shortcoming attributable to Innerleaps, subject to the limitations set out in this Article.</li>
                <li><strong>11.2</strong> Innerleaps' total liability for direct damages is limited to the amount paid out under its professional liability insurance policy for the relevant claim. Where the insurance does not provide coverage for a specific claim, liability is limited to the total fee paid by the Client under the Agreement to which the claim relates.</li>
                <li><strong>11.3</strong> Innerleaps holds professional liability insurance through Hiscox with coverage of up to €250,000 per claim and per year for professional liability and up to €100,000 for cyber and data incidents. Policy details are available upon request.</li>
                <li><strong>11.4</strong> Innerleaps is not liable for indirect or consequential damages, including but not limited to loss of profits, loss of data, reputational damage or business interruption.</li>
                <li><strong>11.5</strong> Innerleaps is not liable for damages resulting from inaccurate or incomplete information provided by the Client or its employees, including information provided via the intake form.</li>
                <li><strong>11.6</strong> Innerleaps is not liable for the outcome of any participation decision made on the basis of the intake assessment. Recommendations and decisions regarding participant suitability are made with due professional care but do not constitute medical advice.</li>
                <li><strong>11.7</strong> Any claim for damages must be submitted to Innerleaps in writing within 6 months of the Client becoming aware of the damage, failing which the right to compensation lapses.</li>
                <li><strong>11.8</strong> Innerleaps accepts no liability for any physical, psychological, professional or other personal outcomes experienced by Participants in connection with the training program, including but not limited to stress-related illness, burnout, reexperiencing of trauma, or aggravation of pre-existing physical or mental health conditions. The training program is a professional development and wellness intervention, not a form of healthcare or medical treatment, and does not replace professional medical or psychological care. The Client is responsible for the occupational health and wellbeing of its employees and for ensuring that Participants are in a suitable condition to participate in a voluntary professional development program. The Client is further responsible for ensuring that Participants are made aware of the nature of the program and that individual outcomes may vary, prior to their participation. Any claim by a Participant arising from their participation in the program is a matter between the Participant and their employer.</li>
              </ul>
            </section>

            {/* Article 12 */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-4">Article 12: Force Majeure</h2>
              <ul className="space-y-3 text-xl">
                <li><strong>12.1</strong> Innerleaps is not liable for any failure to perform its obligations where such failure is the result of circumstances beyond its reasonable control, including but not limited to illness, natural disasters, government measures or disruption of essential infrastructure.</li>
                <li><strong>12.2</strong> In the event of force majeure, Innerleaps will inform the Client as soon as possible and will make every effort to reschedule affected sessions within a reasonable timeframe.</li>
                <li><strong>12.3</strong> If force majeure continues for more than 60 days, either party may terminate the Agreement in writing without owing compensation to the other party. In such case, Innerleaps will refund any amounts paid for services not yet delivered, calculated pro rata based on the number of sessions delivered relative to the total number of sessions agreed.</li>
              </ul>
            </section>

            {/* Article 13 */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-4">Article 13: Complaints</h2>
              <ul className="space-y-3 text-xl">
                <li><strong>13.1</strong> The Client must report any complaints regarding the services provided by Innerleaps in writing to info@innerleaps.nl within the duration of the training program and up to 14 days after the final session of the program has been delivered, failing which the right to complain lapses.</li>
                <li><strong>13.2</strong> Innerleaps will acknowledge receipt of the complaint within 5 working days and will invite the Client for a telephone consultation to discuss the complaint and work towards a resolution.</li>
                <li><strong>13.3</strong> Innerleaps will aim to resolve complaints within 30 days of receipt. Where this is not possible, the Client will be informed of the expected timeline.</li>
                <li><strong>13.4</strong> Submitting a complaint does not suspend the Client's payment obligations.</li>
              </ul>
            </section>

            {/* Article 14 */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-4">Article 14: Term and Duration</h2>
              <ul className="space-y-3 text-xl">
                <li><strong>14.1</strong> Each Agreement specifies its own term. These Terms remain applicable for the full duration of the Agreement and for any follow-up agreements concluded between the parties.</li>
                <li><strong>14.2</strong> Obligations that by their nature survive termination, including confidentiality, intellectual property, liability and data protection obligations, remain in full force after the Agreement ends.</li>
              </ul>
            </section>

            {/* Article 15 */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-4">Article 15: Amendments</h2>
              <ul className="space-y-3 text-xl">
                <li><strong>15.1</strong> Innerleaps reserves the right to amend these Terms. The Client will be informed of any amendments at least 30 days before they take effect.</li>
                <li><strong>15.2</strong> If the Client does not accept the amended Terms, the Client may terminate the Agreement in writing before the amended Terms take effect. Continued use of Innerleaps' services after the effective date constitutes acceptance of the amended Terms.</li>
              </ul>
            </section>

            {/* Article 16 */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-4">Article 16: Governing Law and Disputes</h2>
              <ul className="space-y-3 text-xl">
                <li><strong>16.1</strong> These Terms and all Agreements concluded with Innerleaps are governed by Dutch law.</li>
                <li><strong>16.2</strong> Any disputes arising from or in connection with these Terms or an Agreement will be submitted exclusively to the competent court in Amsterdam, the Netherlands.</li>
                <li><strong>16.3</strong> Before submitting a dispute to court, parties will make every effort to resolve the matter amicably, including through the complaints procedure set out in Article 13.</li>
              </ul>
            </section>

            {/* Footer */}
            <div className="border-t border-border pt-8 mt-12 text-brand-gray-medium text-lg">
              <p><strong>Document Version:</strong> 1.6</p>
              <p><strong>Date:</strong> 5 March 2026</p>
              <p><strong>Prepared by:</strong> Innerleaps</p>
              <p><strong>Status:</strong> Published</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
});

AlgemeneVoorwaarden.displayName = "AlgemeneVoorwaarden";

export default AlgemeneVoorwaarden;
