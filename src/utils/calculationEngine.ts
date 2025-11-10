// Old interface for existing features (Calculator, CalculatorModal, ROICalculator)
export interface CalculationInputs {
  employees: number;
  avgEmployeeCosts: number;
  currentAbsenteeism: number;
  currentTurnover: number;
}

// New interface for Business Case Calculator (LeadMagnetModal)
export interface BusinessCaseInputs {
  employees: number;
  avgSalary: number;
  currentAbsenteeism: number;
  sector: string;
}

// ROI Calculator Interface (nieuwe berekening voor LandingPage)
export interface ROIInputs {
  currentAbsenteeism: number;      // percentage (bijv. 5 voor 5%)
  employeeTurnover: number;        // percentage (bijv. 10 voor 10%)
  numberOfEmployees: number;
  avgGrossAnnualSalary: number;    // per werknemer
}

// Old interface for existing features
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

// New interface for Business Case Calculator
export interface BusinessCaseScenarioResults {
  name: string;
  description: string;
  verzuimBesparing: number;
  uitvalReductie: number;
  productiviteitBesparing: number;
  totaleBesparing: number;
  netBesparing: number;
  roi: number;
}

// ROI Calculator Scenario Interface
export interface ROIScenario {
  verzuimBesparing: number;
  retentieBesparing: number;
  productiviteitBesparing: number;
  totaleBesparing: number;
  netBesparing: number;
  roi: number;
}

// Old constants
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

// New constants for Business Case Calculator
export interface BusinessCaseConstants {
  VK: number;
  VKP: number;
  G: number;
  I_PER_PARTICIPANT: number;
  CONSERVATIVE_VERZUIM_REDUCTIE: number;
  CONSERVATIVE_UITVAL_REDUCTIE: number;
  CONSERVATIVE_PRODUCTIVITEIT: number;
  POSITIVE_VERZUIM_REDUCTIE: number;
  POSITIVE_UITVAL_REDUCTIE: number;
  POSITIVE_PRODUCTIVITEIT: number;
}

// Old results interface
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

// New results interface for Business Case Calculator
export interface BusinessCaseResults {
  totaleLoonkosten: number;
  huidigeVerzuimkosten: number;
  numberOfGroups: number;
  investment: number;
  scenarios: {
    conservative: BusinessCaseScenarioResults;
    positive: BusinessCaseScenarioResults;
  };
}

// ROI Calculator Results Interface
export interface ROIResults {
  totaleLoonkosten: number;
  investment: number;
  scenarios: {
    conservative: ROIScenario;
    positive: ROIScenario;
  };
}

// Old constants for existing features
const CALCULATION_CONSTANTS: CalculationConstants = {
  VK: 1.85,
  VKP: 1.5,
  G: 15,
  I_PER_PARTICIPANT: 450,
  
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

// New constants for Business Case Calculator
const BUSINESS_CASE_CONSTANTS: BusinessCaseConstants = {
  VK: 1.85,
  VKP: 1.5,
  G: 15,
  I_PER_PARTICIPANT: 450,
  CONSERVATIVE_VERZUIM_REDUCTIE: 0.15,
  CONSERVATIVE_UITVAL_REDUCTIE: 0.70,
  CONSERVATIVE_PRODUCTIVITEIT: 0.06,
  POSITIVE_VERZUIM_REDUCTIE: 0.21,
  POSITIVE_UITVAL_REDUCTIE: 0.70,
  POSITIVE_PRODUCTIVITEIT: 0.06,
};

// ROI Calculator Constants (nieuwe berekening voor LandingPage)
const ROI_CONSTANTS = {
  ABSENTEEISM_COST_FACTOR: 1.85,           // 185%
  EMPLOYEE_REPLACEMENT_COSTS_FACTOR: 1.5,  // 150%
  INVESTMENT_PER_PARTICIPANT: 575,         // €575
  
  // Conservative bounds (minimaal)
  LOW_BOUND_TURNOVER_IMPACT: 0.05,         // 5%
  LOW_BOUND_PRODUCTIVITY_GAIN: 0.05,       // 5%
  LOWER_BOUND_ABSENTEEISM: 0.15,           // 15%
  
  // Positive bounds (maximaal)
  HIGH_BOUND_TURNOVER_IMPACT: 0.08,        // 8%
  HIGH_BOUND_PRODUCTIVITY_GAIN: 0.08,      // 8%
  HIGHER_BOUND_ABSENTEEISM: 0.21,          // 21%
};

// Old calculation function for existing features
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

// New calculation function for Business Case Calculator (LeadMagnetModal)
export const calculateBusinessCase = (inputs: BusinessCaseInputs): BusinessCaseResults => {
  const { employees, avgSalary, currentAbsenteeism } = inputs;
  const { VK, G, I_PER_PARTICIPANT } = BUSINESS_CASE_CONSTANTS;

  // STAP 1: Basis berekeningen
  const totaleLoonkosten = employees * avgSalary;
  const huidigeVerzuimkosten = (currentAbsenteeism / 100) * totaleLoonkosten * VK;
  
  // STAP 2: Investering
  const numberOfGroups = Math.ceil(employees / G);
  const investment = numberOfGroups * G * I_PER_PARTICIPANT;
  
  // STAP 3: Conservative Scenario (15%)
  const cons_verzuimBesparing = huidigeVerzuimkosten * BUSINESS_CASE_CONSTANTS.CONSERVATIVE_VERZUIM_REDUCTIE;
  const cons_uitvalReductie = huidigeVerzuimkosten * BUSINESS_CASE_CONSTANTS.CONSERVATIVE_UITVAL_REDUCTIE * 0.1;
  const cons_productiviteitBesparing = totaleLoonkosten * BUSINESS_CASE_CONSTANTS.CONSERVATIVE_PRODUCTIVITEIT;
  const cons_totaleBesparing = cons_verzuimBesparing + cons_uitvalReductie + cons_productiviteitBesparing;
  const cons_netBesparing = cons_totaleBesparing - investment;
  const cons_roi = investment > 0 ? (cons_netBesparing / investment) * 100 : 0;
  
  // STAP 4: Positive Scenario (21%)
  const pos_verzuimBesparing = huidigeVerzuimkosten * BUSINESS_CASE_CONSTANTS.POSITIVE_VERZUIM_REDUCTIE;
  const pos_uitvalReductie = huidigeVerzuimkosten * BUSINESS_CASE_CONSTANTS.POSITIVE_UITVAL_REDUCTIE * 0.1;
  const pos_productiviteitBesparing = totaleLoonkosten * BUSINESS_CASE_CONSTANTS.POSITIVE_PRODUCTIVITEIT;
  const pos_totaleBesparing = pos_verzuimBesparing + pos_uitvalReductie + pos_productiviteitBesparing;
  const pos_netBesparing = pos_totaleBesparing - investment;
  const pos_roi = investment > 0 ? (pos_netBesparing / investment) * 100 : 0;

  return {
    totaleLoonkosten: Math.round(totaleLoonkosten),
    huidigeVerzuimkosten: Math.round(huidigeVerzuimkosten),
    numberOfGroups,
    investment: Math.round(investment),
    scenarios: {
      conservative: {
        name: "Conservative Scenario",
        description: "15% verzuimreductie met minimale effecten",
        verzuimBesparing: Math.round(cons_verzuimBesparing),
        uitvalReductie: Math.round(cons_uitvalReductie),
        productiviteitBesparing: Math.round(cons_productiviteitBesparing),
        totaleBesparing: Math.round(cons_totaleBesparing),
        netBesparing: Math.round(cons_netBesparing),
        roi: Math.round(cons_roi),
      },
      positive: {
        name: "Positive Scenario",
        description: "21% verzuimreductie met volledige effecten",
        verzuimBesparing: Math.round(pos_verzuimBesparing),
        uitvalReductie: Math.round(pos_uitvalReductie),
        productiviteitBesparing: Math.round(pos_productiviteitBesparing),
        totaleBesparing: Math.round(pos_totaleBesparing),
        netBesparing: Math.round(pos_netBesparing),
        roi: Math.round(pos_roi),
      },
    },
  };
};

// ROI Calculator Function (nieuwe berekening voor LandingPage)
export const calculateROI = (inputs: ROIInputs): ROIResults => {
  const { currentAbsenteeism, employeeTurnover, numberOfEmployees, avgGrossAnnualSalary } = inputs;
  
  // Basis berekeningen
  const totaleLoonkosten = numberOfEmployees * avgGrossAnnualSalary;
  const investment = numberOfEmployees * ROI_CONSTANTS.INVESTMENT_PER_PARTICIPANT;
  
  // Conservative Scenario (Minimale Impact)
  const conservativeRetentie = (employeeTurnover / 100) * totaleLoonkosten * 
    ROI_CONSTANTS.EMPLOYEE_REPLACEMENT_COSTS_FACTOR * ROI_CONSTANTS.LOW_BOUND_TURNOVER_IMPACT;
  
  const conservativeProductiviteit = totaleLoonkosten * ROI_CONSTANTS.LOW_BOUND_PRODUCTIVITY_GAIN;
  
  const conservativeVerzuim = (currentAbsenteeism / 100) * totaleLoonkosten * 
    ROI_CONSTANTS.ABSENTEEISM_COST_FACTOR * ROI_CONSTANTS.LOWER_BOUND_ABSENTEEISM;
  
  const conservativeTotaal = conservativeRetentie + conservativeProductiviteit + conservativeVerzuim;
  const conservativeNet = conservativeTotaal - investment;
  const conservativeROI = (conservativeTotaal / investment) * 100;
  
  // Positive Scenario (Volledige Impact)
  const positiveRetentie = (employeeTurnover / 100) * totaleLoonkosten * 
    ROI_CONSTANTS.EMPLOYEE_REPLACEMENT_COSTS_FACTOR * ROI_CONSTANTS.HIGH_BOUND_TURNOVER_IMPACT;
  
  const positiveProductiviteit = totaleLoonkosten * ROI_CONSTANTS.HIGH_BOUND_PRODUCTIVITY_GAIN;
  
  const positiveVerzuim = (currentAbsenteeism / 100) * totaleLoonkosten * 
    ROI_CONSTANTS.ABSENTEEISM_COST_FACTOR * ROI_CONSTANTS.HIGHER_BOUND_ABSENTEEISM;
  
  const positiveTotaal = positiveRetentie + positiveProductiviteit + positiveVerzuim;
  const positiveNet = positiveTotaal - investment;
  const positiveROI = (positiveTotaal / investment) * 100;
  
  return {
    totaleLoonkosten,
    investment,
    scenarios: {
      conservative: {
        verzuimBesparing: conservativeVerzuim,
        retentieBesparing: conservativeRetentie,
        productiviteitBesparing: conservativeProductiviteit,
        totaleBesparing: conservativeTotaal,
        netBesparing: conservativeNet,
        roi: conservativeROI,
      },
      positive: {
        verzuimBesparing: positiveVerzuim,
        retentieBesparing: positiveRetentie,
        productiviteitBesparing: positiveProductiviteit,
        totaleBesparing: positiveTotaal,
        netBesparing: positiveNet,
        roi: positiveROI,
      },
    },
  };
};