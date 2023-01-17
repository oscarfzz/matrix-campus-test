import { DefaultSeoProps } from "next-seo";
import { IMImage } from '@src/services/interfaces';

export const SEOconfig: DefaultSeoProps = {
  themeColor: "#8947eb",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://itunes-nextjs.vercel.app/",
    siteName: "Itunes Next",
  },
  twitter: {
    handle: "@itunes-nextjs",
    site: "@itunes-nextjs",
    cardType: "summary_large_image",
  },
};

export const QUERYKEYS = {
  TOP: "top_100",
  PODCAST: "podcast",
  EPISODES: "episodes",
  EPISODE: "episode",
};

export const getImageProps = (e: IMImage[]) => {
  const lastElement = e[e.length - 1];
  return {
    src: lastElement.label,
    alt: `podcast-image-${lastElement.label}`,
    height: lastElement.attributes.height,
    width: lastElement.attributes.height,
  };
};

