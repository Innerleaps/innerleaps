import type { JuridischePagina } from "./juridisch";

/** Cookie notice, English. De Nederlandse tekst staat in cookies-nl.ts en moet
 *  bij elke wijziging mee. */
export const cookiesEn: JuridischePagina = {
  titel: "Cookie Notice",
  ondertitel: "**Innerleaps**, last updated: September 2026",
  metaTitel: "Cookie Notice | Innerleaps",
  metaBeschrijving:
    "Cookie notice of Innerleaps. Which cookies we use, what they are for, and how to change your choice.",
  secties: [
    {
      kop: "What are cookies?",
      blokken: [
        {
          soort: "tekst",
          tekst:
            "Cookies are small files a website leaves on your device. Some are needed to make the site work. Others are there to measure how the site is used. This page also covers the other ways a site can store something on your device, such as local storage, because the rules are the same.",
        },
      ],
    },
    {
      kop: "You choose first",
      blokken: [
        {
          soort: "tekst",
          tekst:
            "Nothing is measured until you say so. On your first visit a window appears with two buttons: accept everything, or decide per category yourself. Until you choose, the measurement tools are switched off.",
        },
      ],
    },
    {
      kop: "Which cookies do we use?",
      blokken: [
        {
          soort: "lijst",
          items: [
            "**Necessary.** Always on, and you cannot switch them off, because the site would stop working. This is your language choice and your cookie choice itself. They stay in your own browser and we never see them.",
            "**Analytics.** Google Analytics 4. Shows us which pages get visited and where people drop off, so we can improve the site.",
            "**Advertising.** Google Ads, to see which advert brought someone here and what they did next, and Apollo, which recognises the organisation a visit is likely to come from. Without this we would keep paying for adverts that lead nowhere.",
          ],
        },
      ],
    },
    {
      kop: "Changing your mind",
      blokken: [
        {
          soort: "tekst",
          tekst:
            "At the bottom of every page there is a link called **Cookie preferences**. It reopens the same window with the switches. Turn something off and it stops straight away. You can also clear cookies through your browser settings, although that will also remove your language choice.",
        },
      ],
    },
    {
      kop: "More information",
      blokken: [
        {
          soort: "tekst",
          tekst:
            "Our [privacy notice](/en/privacy) explains in more detail what we measure, who processes it and how long we keep it. Questions? Email [privacy@innerleaps.nl](mailto:privacy@innerleaps.nl).",
        },
      ],
    },
  ],
  voettekst: ["Document Version: 2.0", "Date: September 2026", "Prepared by: Innerleaps", "Status: Published"],
};
