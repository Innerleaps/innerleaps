
export interface CalculationInputs {
  employees: number;
  avgEmployeeCosts: number;
  currentAbsenteeism: number;
  currentTurnover: number;
}

export interface CalculationConstants {
  VK: number; // Verzuimkosten multiplier
  MV: number; // MBSR verzuimreductie percentage (decimal)
  RV: number; // MBSR retentieverbetering percentage (decimal)
  VKP: number; // Vervangingskosten percentage
  G: number; // Groepsgrootte
  I: number; // Investering per groep
}

export interface CalculationResults {
  verzuimBesparing: number;
  retentieBesparing: number;
  grossSaving: number;
  totalSaving: number;
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

const CALCULATION_CONSTANTS: CalculationConstants = {
  VK: 2,     // Verzuimkosten zijn 2x het basissalaris
  MV: 0.24,  // 24% verzuimreductie door MBSR
  RV: 0.24,  // 24% retentieverbetering door MBSR
  VKP: 1.5,  // Vervangingskosten zijn 150% van jaarsalaris
  G: 15,     // Maximaal 15 deelnemers per groep
  I: 8625    // Investering per groep
};

export const calculateMBSRSavings = (inputs: CalculationInputs): CalculationResults => {
  const { employees, avgEmployeeCosts, currentAbsenteeism, currentTurnover } = inputs;
  const { VK, MV, RV, VKP, G, I } = CALCULATION_CONSTANTS;

  // Berekening verzuimbesparing: HZ% × AD × GWS × VK × MV%
  const verzuimBesparing = (currentAbsenteeism / 100) * employees * avgEmployeeCosts * VK * MV;

  // Berekening retentiebesparing: HV% × AD × GWS × RV% × VKP
  const retentieBesparing = (currentTurnover / 100) * employees * avgEmployeeCosts * RV * VKP;

  // Totale bruto besparing
  const grossSaving = verzuimBesparing + retentieBesparing;

  // Aantal benodigde groepen
  const numberOfGroups = Math.ceil(employees / G);

  // Totale investering
  const investment = numberOfGroups * I;

  // Netto besparing
  const totalSaving = grossSaving - investment;

  // ROI berekening
  const roi = investment > 0 ? (grossSaving / investment) * 100 : 0;

  return {
    verzuimBesparing: Math.round(verzuimBesparing),
    retentieBesparing: Math.round(retentieBesparing),
    grossSaving: Math.round(grossSaving),
    totalSaving: Math.round(totalSaving),
    investment,
    roi: Math.round(roi),
    numberOfGroups,
    constants: {
      VK,
      MV: MV * 100, // Convert to percentage for display
      RV: RV * 100, // Convert to percentage for display
      VKP
    }
  };
};
