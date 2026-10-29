import { useLocation } from "react-router-dom";
import { detectLanguageFromPath } from "@/i18n/config";
import type { Taal } from "@/lib/claims";

/** De taal van de pagina, afgeleid van het pad. Werkt ook tijdens het prerenderen. */
export const useTaal = (): Taal => detectLanguageFromPath(useLocation().pathname);
