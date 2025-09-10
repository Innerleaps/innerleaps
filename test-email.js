// Test script to trigger ROI analysis email
import { supabase } from './src/integrations/supabase/client.js';

const testData = {
  naam: "Bas ter Haar Romenij",
  email: "b.ter.haar.romenij@gmail.com", 
  bedrijfsnaam: "InnerLeaps Test",
  verzuimPercentage: "5.2",
  aantalDeelnemers: "15",
  brutoJaarsalaris: "39700",
  calculationResults: {
    totaleLoonkosten: 595500,
    verzuimkosten: 57287.10,
    programmakosten: 5925,
    minVerzuimbesparing: 8593.07,
    maxVerzuimbesparing: 12030.29,
    minTerugverdientijd: 5.91,
    maxTerugverdientijd: 8.27,
    minROI: 45.03,
    maxROI: 103.04,
    showROI: true
  }
};

const { data, error } = await supabase.functions.invoke('send-roi-analysis', {
  body: testData
});

console.log('Result:', { data, error });