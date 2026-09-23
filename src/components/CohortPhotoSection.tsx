import { memo } from "react";
import { useTranslation } from "react-i18next";
import cohortPhoto from "@/assets/innerleaps-cohort-room.jpg";

interface CohortPhotoSectionProps {
  /** Een andere foto dan de groep op home. Zonder dit staat die er. */
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  /** Welk deel van de foto in beeld blijft, als Tailwind-klasse. */
  objectPosition?: string;
}

/** Een foto over de volle breedte, als adempauze tussen twee secties. */
const CohortPhotoSection = memo(
  ({
    src = cohortPhoto,
    alt,
    width = 2000,
    height = 799,
    objectPosition = "object-[center_42%]",
  }: CohortPhotoSectionProps) => {
    const { t } = useTranslation();

    return (
      <figure>
        <img
          src={src}
          alt={alt ?? t("cohortPhoto.alt")}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          className={`block w-full object-cover ${objectPosition} h-[210px] sm:h-[clamp(230px,32vw,400px)]`}
        />
      </figure>
    );
  },
);

CohortPhotoSection.displayName = "CohortPhotoSection";

export default CohortPhotoSection;
