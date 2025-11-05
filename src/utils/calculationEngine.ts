
export interface CalculationInputs {
  employees: number;
  avgEmployeeCosts: number;
  currentAbsenteeism: number;
  currentTurnover: number;
}

export interface ScenarioResults {
  name: string;
  description: string;
  verzuimBesparing: number;
  retentieBesparing: number;
  productiviteitBesparing: number;
  totaleBesparing: number;
  netBesparing: number;
  roi: number;
}

export interface CalculationConstants {
  VK: number; // Verzuimkosten multiplier (1.85x)
  VKP: number; // Vervangingskosten percentage (1.5x)
  G: number; // Groepsgrootte (15 deelnemers)
  I_PER_PARTICIPANT: number; // Investering per deelnemer (€450)
  
  // Scenario 1: Extreem Conservatief
  S1_VERZUIM_REDUCTIE: number; // 15% verzuimreductie
  
  // Scenario 2: Realistisch Conservatief
  S2_VERZUIM_REDUCTIE: number; // 15% verzuimreductie
  S2_RETENTIE_IMPACT: number; // 5% retentie verbetering
  S2_PRODUCTIVITEIT_WINST: number; // 5% productiviteitswinst
  
  // Scenario 3: Realistisch Positief
  S3_VERZUIM_REDUCTIE: number; // 21% verzuimreductie
  S3_RETENTIE_IMPACT: number; // 8% retentie verbetering
  S3_PRODUCTIVITEIT_WINST: number; // 8% productiviteitswinst
}

export interface CalculationResults {
  totaleLoonkosten: number;
  numberOfGroups: number;
  investment: number;
  scenarios: {
    scenario1: ScenarioResults;
    scenario2: ScenarioResults;
    scenario3: ScenarioResults;
  };
  constants: {
    VK: number;
    VKP: number;
  };
}

const CALCULATION_CONSTANTS: CalculationConstants = {
  VK: 1.85,  // Verzuimkosten multiplier
  VKP: 1.5,  // Vervangingskosten zijn 150% van jaarsalaris
  G: 15,     // Maximaal 15 deelnemers per groep
  I_PER_PARTICIPANT: 450, // Investering per deelnemer
  
  // Scenario 1: Extreem Conservatief
  S1_VERZUIM_REDUCTIE: 0.15,
  
  // Scenario 2: Realistisch Conservatief (aanbevolen)
  S2_VERZUIM_REDUCTIE: 0.15,
  S2_RETENTIE_IMPACT: 0.05,
  S2_PRODUCTIVITEIT_WINST: 0.05,
  
  // Scenario 3: Realistisch Positief
  S3_VERZUIM_REDUCTIE: 0.21,
  S3_RETENTIE_IMPACT: 0.08,
  S3_PRODUCTIVITEIT_WINST: 0.08,
};

export const calculateMBSRSavings = (inputs: CalculationInputs): CalculationResults => {
  const { employees, avgEmployeeCosts, currentAbsenteeism, currentTurnover } = inputs;
  const { VK, VKP, G, I_PER_PARTICIPANT } = CALCULATION_CONSTANTS;

  // STAP 1: Totale Loonkosten
  const totaleLoonkosten = employees * avgEmployeeCosts;

  // STAP 2: Investering
  const numberOfGroups = Math.ceil(employees / G);
  const investeringPerGroep = G * I_PER_PARTICIPANT;
  const investment = numberOfGroups * investeringPerGroep;

  // STAP 3: Scenario 1 - Extreem Conservatief
  const s1_verzuim = (currentAbsenteeism / 100) * totaleLoonkosten * VK * CALCULATION_CONSTANTS.S1_VERZUIM_REDUCTIE;
  const s1_totaal = s1_verzuim;
  const s1_netto = s1_totaal - investment;
  const s1_roi = investment > 0 ? (s1_totaal / investment) * 100 : 0;

  // STAP 3: Scenario 2 - Realistisch Conservatief (aanbevolen)
  const s2_verzuim = (currentAbsenteeism / 100) * totaleLoonkosten * VK * CALCULATION_CONSTANTS.S2_VERZUIM_REDUCTIE;
  const s2_retentie = (currentTurnover / 100) * totaleLoonkosten * VKP * CALCULATION_CONSTANTS.S2_RETENTIE_IMPACT;
  const s2_productiviteit = totaleLoonkosten * CALCULATION_CONSTANTS.S2_PRODUCTIVITEIT_WINST;
  const s2_totaal = s2_verzuim + s2_retentie + s2_productiviteit;
  const s2_netto = s2_totaal - investment;
  const s2_roi = investment > 0 ? (s2_totaal / investment) * 100 : 0;

  // STAP 3: Scenario 3 - Realistisch Positief
  const s3_verzuim = (currentAbsenteeism / 100) * totaleLoonkosten * VK * CALCULATION_CONSTANTS.S3_VERZUIM_REDUCTIE;
  const s3_retentie = (currentTurnover / 100) * totaleLoonkosten * VKP * CALCULATION_CONSTANTS.S3_RETENTIE_IMPACT;
  const s3_productiviteit = totaleLoonkosten * CALCULATION_CONSTANTS.S3_PRODUCTIVITEIT_WINST;
  const s3_totaal = s3_verzuim + s3_retentie + s3_productiviteit;
  const s3_netto = s3_totaal - investment;
  const s3_roi = investment > 0 ? (s3_totaal / investment) * 100 : 0;

  return {
    totaleLoonkosten: Math.round(totaleLoonkosten),
    numberOfGroups,
    investment,
    scenarios: {
      scenario1: {
        name: "Extreem Conservatief",
        description: "Alleen minimale verzuimbesparing",
        verzuimBesparing: Math.round(s1_verzuim),
        retentieBesparing: 0,
        productiviteitBesparing: 0,
        totaleBesparing: Math.round(s1_totaal),
        netBesparing: Math.round(s1_netto),
        roi: Math.round(s1_roi),
      },
      scenario2: {
        name: "Realistisch Conservatief",
        description: "Alle minimale impacts",
        verzuimBesparing: Math.round(s2_verzuim),
        retentieBesparing: Math.round(s2_retentie),
        productiviteitBesparing: Math.round(s2_productiviteit),
        totaleBesparing: Math.round(s2_totaal),
        netBesparing: Math.round(s2_netto),
        roi: Math.round(s2_roi),
      },
      scenario3: {
        name: "Realistisch Positief",
        description: "Alle maximale impacts",
        verzuimBesparing: Math.round(s3_verzuim),
        retentieBesparing: Math.round(s3_retentie),
        productiviteitBesparing: Math.round(s3_productiviteit),
        totaleBesparing: Math.round(s3_totaal),
        netBesparing: Math.round(s3_netto),
        roi: Math.round(s3_roi),
      },
    },
    constants: {
      VK,
      VKP,
    }
  };
};
