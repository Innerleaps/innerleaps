import { memo } from "react";
import { useTranslation } from "react-i18next";
import cohortPhoto from "@/assets/innerleaps-cohort-room.jpg";

const CohortPhotoSection = memo(() => {
  const { t } = useTranslation();

  return (
    <figure>
      <img
        src={cohortPhoto}
        alt={t("cohortPhoto.alt")}
        width={2000}
        height={799}
        loading="lazy"
        decoding="async"
        className="block w-full object-cover object-[center_42%] h-[210px] sm:h-[clamp(230px,32vw,400px)]"
      />
    </figure>
  );
});

CohortPhotoSection.displayName = "CohortPhotoSection";

export default CohortPhotoSection;
