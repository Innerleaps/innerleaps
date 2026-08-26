import oliverWyman from "@/assets/Vitaliteitsprogramma_Oliver_Wyman.png";
import paConsulting from "@/assets/Vitaliteitsprogramma_PA_consulting-3.png";
import dhl from "@/assets/Vitaliteitsprogramma_DHL-2.png";
import rijkswaterstaat from "@/assets/Vitaliteitsprogramma_Rijkswaterstaat-3.png";
import justitie from "@/assets/Vitaliteitsprogramma_Ministerie_van_justitie_en_veiligheid-2.png";
import hollandColours from "@/assets/Vitaliteitsprogramma_Holland_Colours-3.png";
import youTalent from "@/assets/Vitaliteitsprogramma_You_Talent-3.png";
import nobel from "@/assets/Vitaliteitsprogramma_nobel_recruitment-3.png";
import politie from "@/assets/Vitaliteitsprogramma_Politite-4.png";
import leaseplan from "@/assets/Vitaliteitsprogramma_Leaseplan.png";

/**
 * De lopende band met klantlogo's, voor een lichte achtergrond.
 *
 * Let op welke bestanden hier staan. In `src/data/clientLogos.ts` staan de
 * lichte varianten met een doorzichtige achtergrond; die zijn gemaakt voor de
 * donkere hero-foto en zijn op wit letterlijk onzichtbaar. Hier staan dus de
 * donkere varianten, dezelfde die de teampagina op zijn witte kaarten gebruikt.
 *
 * De lijst staat twee keer achter elkaar in de band. Dat is geen slordigheid:
 * de animatie schuift precies de halve breedte op en springt dan terug, en
 * omdat de tweede helft identiek is aan de eerste zie je die sprong niet.
 *
 * Het masker aan de zijkanten laat de logo's vervagen in plaats van ze hard af
 * te knippen bij de rand.
 */
const logos = [
  { src: oliverWyman, alt: "Vitaliteitstraining Oliver Wyman" },
  { src: paConsulting, alt: "Vitaliteitstraining PA Consulting" },
  { src: dhl, alt: "Vitaliteitstraining DHL" },
  { src: rijkswaterstaat, alt: "Vitaliteitstraining Rijkswaterstaat" },
  { src: justitie, alt: "Vitaliteitstraining Ministerie van Justitie en Veiligheid" },
  { src: politie, alt: "Vitaliteitstraining Politie" },
  { src: hollandColours, alt: "Vitaliteitstraining Holland Colours" },
  { src: leaseplan, alt: "Vitaliteitstraining Leaseplan" },
  { src: youTalent, alt: "Vitaliteitstraining You Talent" },
  { src: nobel, alt: "Vitaliteitstraining Nobel Recruitment" },
];

const ClientLogoMarquee = () => (
  <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
    <div className="flex items-center gap-12 animate-marquee-tablet lg:animate-marquee">
      {[...logos, ...logos].map((logo, index) => (
        <img
          key={index}
          src={logo.src}
          alt={index < logos.length ? logo.alt : ""}
          aria-hidden={index >= logos.length}
          loading="lazy"
          decoding="async"
          className="h-10 flex-shrink-0 object-contain md:h-12"
        />
      ))}
    </div>
  </div>
);

export default ClientLogoMarquee;
