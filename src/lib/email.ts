/**
 * Of een e-mailadres er plausibel uitziet.
 *
 * Bewust geen poging tot de volledige RFC-regel: die is berucht lang en laat
 * dingen toe die niemand ooit intikt. Wat hier telt is de vergissing die
 * mensen echt maken, en dat is een adres zonder apenstaartje, zonder punt in
 * het domein, of met een spatie erin.
 *
 * Waarom dit ertoe doet: bij de rekentool en het rapport is het e-mailadres het
 * enige waarmee je iemand nog kunt bereiken. Een typefout betekent geen mail,
 * geen opvolging, en een lead die je wel betaald hebt maar nooit spreekt.
 *
 * Streng genoeg om "jan@bedrijf" en "jan.bedrijf.nl" tegen te houden, ruim
 * genoeg om alles door te laten wat echt bestaat.
 */
export const isGeldigEmail = (waarde: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@.]{2,}$/.test(waarde.trim());
