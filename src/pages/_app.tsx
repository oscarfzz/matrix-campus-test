import React from "react";
import { AppProps } from "next/app";
import { ThemeProvider, CssBaseline } from "@mui/material/";
import createCache from "@emotion/cache";
import { CacheProvider, EmotionCache } from "@emotion/react";

// React-Query
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// Services
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { theme } from "../theme";
import { AppProvider } from "../context";
import { DefaultSeo } from "next-seo";
import { SEOconfig } from "@src/utils";

const isBrowser = typeof document !== "undefined";

function createEmotionCache() {
  let insertionPoint;

  if (isBrowser) {
    const emotionInsertionPoint = document.querySelector<HTMLMetaElement>(
      'meta[name="emotion-insertion-point"]'
    );
    insertionPoint = emotionInsertionPoint ?? undefined;
  }

  return createCache({ key: "css", insertionPoint });
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  const {
    Component: BaseComponent,
    emotionCache = clientSideEmotionCache,
    pageProps,
    router,
  } = props;

  const Component = BaseComponent as unknown as React.FC<typeof pageProps>;
  const { dehydratedState } = pageProps as { dehydratedState: unknown };

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>
        <CacheProvider value={emotionCache}>
          <AppProvider>
            <DefaultSeo {...SEOconfig}/>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Component key={router.route} {...pageProps} />
            </ThemeProvider>
          </AppProvider>
        </CacheProvider>

        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  );
}
