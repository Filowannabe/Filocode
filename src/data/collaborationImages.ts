import elephantImg from "../../public/images/collaborations/elephant-cpa-landing.webp";
import twomoonImg from "../../public/images/collaborations/two-moon-play-store.webp";
import copImg from "../../public/images/collaborations/canadian-orthodontic-partners-landing.webp";
import helloleenaImg from "../../public/images/collaborations/helloleena-landing.webp";
import omniconImg from "../../public/images/collaborations/omnicon-landing.webp";
import frutosalvajeImg from "../../public/images/collaborations/fruto-salvaje-landing.webp";
import { StaticImageData } from "next/image";

export const COLLABORATION_IMAGES: Record<string, StaticImageData> = {
  "elephant-cpa": elephantImg,
  "2moon-capital": twomoonImg,
  "canadian-orthodontic-partners": copImg,
  "hello-leena": helloleenaImg,
  "omnicon": omniconImg,
  "fruto-salvaje": frutosalvajeImg,
};
