import { DefaultSeoProps } from "next-seo";
import dayjs from "dayjs";
import { IMImage } from "@src/services/interfaces";

export const SEOconfig: DefaultSeoProps = {
  themeColor: "#8947eb",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://itunes-nextjs.vercel.app/",
    siteName: "Itunes Nest",
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

export const getLocaleDate = (_date: string) => {
    const date = dayjs(_date).locale("es");
    const month = date.format("MMMM");
    const year = date.format("YYYY");

    return {
      month,
      year,
    }
};

export const getHoursFromMilliseconds = (milliseconds: number) => {
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));

  const minutes = Math.floor(
    (milliseconds % (1000 * 60 * 60)) / (1000 * 60)
  );

  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

  const duration = `${hours > 0 ? `${hours} h` : ""} ${
    minutes > 0 ? `${minutes} min` : ""
  } ${seconds} s`;

  return {
    hours,
    minutes,
    seconds,
    duration,
  };
}