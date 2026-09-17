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
      <figcaption className="container-custom pt-4 pb-8 md:pb-10 lg:pb-12">
        <span className="tracking-widest text-base text-brand-gray-medium">
          {t("cohortPhoto.caption")}
        </span>
      </figcaption>
    </figure>
  );
});

CohortPhotoSection.displayName = "CohortPhotoSection";

export default CohortPhotoSection;
