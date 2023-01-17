import { DefaultSeoProps } from "next-seo";

export const SEOconfig: DefaultSeoProps = {
  themeColor: "#8947eb",
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://itunes-nextjs.vercel.app/',
    siteName: 'Itunes Nest',
  },
  twitter: {
    handle: '@itunes-nextjs',
    site: '@itunes-nextjs',
    cardType: 'summary_large_image',
  },
}

export const QUERYKEYS = {
  TOP: 'top_100',
  PODCAST: 'podcast',
  EPISODES: 'episodes',
  EPISODE: 'episode',
}