
export interface CalculationFormData {
  name: string;
  phone: string;
  functie: string;
  company: string;
  employees: string;
  avgEmployeeCosts: string;
  currentAbsenteeism: string;
  currentTurnover: string;
}

export interface CalculationResults {
  verzuimBesparing: number;
  retentieBesparing: number;
  totalSaving: number;
  grossSaving: number;
  investment: number;
  roi: number;
  numberOfGroups: number;
  constants: {
    VK: number;
    MV: number;
    RV: number;
    VKP: number;
  };
}

export const calculateSavings = (formData: CalculationFormData): CalculationResults => {
  const AD = parseInt(formData.employees) || 0; // Aantal deelnemers
  const GWS = parseInt(formData.avgEmployeeCosts) || 0; // Gemiddelde werkgeverskosten per deelnemer per jaar
  const HZ = parseFloat(formData.currentAbsenteeism) || 0; // Huidig verzuimpercentage
  const HV = parseFloat(formData.currentTurnover) || 0; // Huidig verlooppercentage

  // Constanten
  const VK = 2; // Verzuimkosten multiplier (Johns, 2010)
  const MV = 0.24; // 24% minder verzuim door MBSR (gemiddelde 19-29% uit verschillende onderzoeken)
  const RV = 0.24; // 24% retentieverbetering door MBSR (gemiddelde 17-31% uit verschillende onderzoeken)
  const VKP = 1.5; // Vervangingskosten personeel (O'Connell & Kung, 2007)
  const G = 15; // Aantal deelnemers per groep
  const I = 8625; // Indicatieve investering per groep

  // Berekeningen volgens de juiste formules
  const verzuimBesparing = (HZ / 100) * AD * GWS * VK * MV;
  const retentieBesparing = (HV / 100) * AD * GWS * RV * VKP;
  const totaleBesparing = verzuimBesparing + retentieBesparing;
  
  const numberOfGroups = Math.ceil(AD / G);
  const totalInvestment = numberOfGroups * I;
  const netBesparing = totaleBesparing - totalInvestment;
  
  // ROI berekening - gebruik totale besparing, niet netto besparing
  const roi = totalInvestment > 0 ? (totaleBesparing / totalInvestment) * 100 : 0;

  return {
    verzuimBesparing: Math.round(verzuimBesparing),
    retentieBesparing: Math.round(retentieBesparing),
    totalSaving: Math.round(netBesparing),
    grossSaving: Math.round(totaleBesparing),
    investment: totalInvestment,
    roi: Math.round(roi),
    numberOfGroups: numberOfGroups,
    constants: {
      VK: VK,
      MV: MV * 100,
      RV: RV * 100,
      VKP: VKP
    }
  };
};
