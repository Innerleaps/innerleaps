import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import CalculatorModal from './CalculatorModal';
const HeroSection = () => {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  return <>
      <section id="home" className="bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white section-padding overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-brand-green-light">30% minder</span> ziekteverzuim<br />
                  <span className="text-brand-green-light">31% hogere</span> medewerkerretentie
                </h1>
                <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
                  Wetenschappelijk bewezen stressreductieprogramma dat meetbare bedrijfsresultaten oplevert binnen 8 weken
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-brand-green hover:bg-brand-green-light text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1" onClick={() => setIsCalculatorOpen(true)}>
                  Bereken mijn besparing
                </Button>
                <Button variant="outline" size="lg" onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1wwDnoAHyFrV0M1FxwmbcMa9ewkDxTDdwQObwPKF-WX-wZV9DssZKtb1haoeP5qXDLenQlZt_R', '_blank')} className="border-2 border-white hover:bg-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-[Make_the_following_adjustments._Before_you_say_your_done_check_5_times_if_each_change_as_requested_is_actually_implemented._1)_Pas_de_hover_animatie_van_\"bereken_mijn_besparing\"_ook_toe_op_\"vrijblijvend_gesprek_plannen\"_wijzig_text_naar_\"kennis_maken\"._Wijzig_door_de_hover_niet_de_kleur_van_de_text,_deze_wordt_nu_wit._2)_Wijzig_de_hover_state_van_alle_butons_met_de_animatie_dat_de_knop_ligt_omhoog_komt.__Nu_wordt_de_knop_\"Lees_meer_over_de_wetenschap_geel_bij_hover,_dat_wil_ik_niet._3)_wijzig_\"Week_Oefendag\"_naar_\"Oefendag_tussen_week_5_en_7\"._4)_Maak_de_5_blokken_bij_\"Zo_Werken_We_Samen\"_minder_breed._De_body_text_is_nu_echt_te_lang.__5)_Maak_de_twee_sticky_CTA's,_rechtsonderin_het_scherm,_iets_groter_6)_Voeg_op_elke_pagina_die_niet_de_home_is_de_knop_\"Terug_naar_home\"_toe,_zoals_bij_de_pagina_over_ons_7)_Ik_wil_in_alle_velden_van_de_module_\"bereken_besparing\"_,_prefilled_texten_zien_in_het_grijs._Dus_bijvoorbeeld_bij_naam_Jan_Jansen._Deze_text_moet_verdwijnen_als_de_gebruiker_begint_te_typen_8)_Voeg_bij_bereken_besparing_een_voltooi_knop_toe._Als_de_gegevens_gedeeld_worden_dient_de_gebruiker_op_een_bedankt_pagina_te_komen._9)_Voeg_bij_bereken_besparing_een_quote_toe_voor__extra_vertrouwen_10)_bij_besparing_berekenen_verwijder_1_kruisje_om_de_module_te_sluiten,_er_staan_er_nu_twee.] text-[#253b92]">
                  Kennis maken
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-brand-green-light">8 weken</div>
                  <div className="text-blue-200">Programma duur</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-brand-green-light">100%</div>
                  <div className="text-blue-200">Wetenschappelijk onderbouwd</div>
                </div>
              </div>
            </div>

            <div className="relative animate-scale-in">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold mb-6">Direct meetbare resultaten:</h3>
                  <div className="space-y-4 max-w-sm mx-auto">
                    <div className="flex items-center justify-between p-3 bg-white/20 rounded-lg">
                      <span className="font-medium text-sm">Ziekteverzuim reductie</span>
                      <span className="text-white font-bold text-lg">30%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/20 rounded-lg">
                      <span className="font-medium text-sm">Medewerkerretentie</span>
                      <span className="text-white font-bold text-lg">+31%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/20 rounded-lg">
                      <span className="font-medium text-sm">Werkstress reductie</span>
                      <span className="text-white font-bold text-lg">40-58%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/20 rounded-lg">
                      <span className="font-medium text-sm">Werktevredenheid</span>
                      <span className="text-white font-bold text-lg">+26%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-16">
            <ArrowDown className="h-8 w-8 text-brand-green-light animate-bounce" />
          </div>
        </div>
      </section>

      <CalculatorModal isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} />
    </>;
};
export default HeroSection;