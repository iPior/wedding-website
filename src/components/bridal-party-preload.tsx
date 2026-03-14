import { getImageProps } from "next/image";
import { weddingConfig } from "../../wedding.config";

/**
 * Preloads the first 4 bridal party images (above the fold) so they're
 * cached by the time the user navigates to /bridal-party.
 * Renders only <link rel="preload"> tags — no visible output, no client JS.
 */
export function BridalPartyPreload() {
  const members = weddingConfig.bridalParty
    .filter((m) => m.image)
    .slice(0, 4);

  return (
    <>
      {members.map((member) => {
        const {
          props: { srcSet, sizes },
        } = getImageProps({
          src: member.image,
          alt: "",
          width: 300,
          height: 400,
          sizes: "(max-width: 768px) 45vw, 300px",
        });

        return (
          <link
            key={member.name}
            rel="preload"
            as="image"
            imageSrcSet={srcSet}
            imageSizes={sizes}
            fetchPriority="low"
          />
        );
      })}
    </>
  );
}
