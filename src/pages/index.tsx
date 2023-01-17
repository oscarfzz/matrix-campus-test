/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Container, PodcastCard, TitleSection } from "@src/components";
import { BaseLayout } from "@src/layout";
import { NextSeo } from "next-seo";
import { ITunesServices } from "@src/services";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { QUERYKEYS } from "@src/utils";
import { useRouter } from "next/router";
import Link from "next/link";
import { Box, Divider, Grid, Link as MuiLink, TextField } from "@mui/material";

export default function Home() {
  const router = useRouter();
  const service = new ITunesServices();
  const { data = [] } = useQuery([QUERYKEYS.TOP], service.getTop100Podcasts, {
    refetchOnWindowFocus: false,
  });

  return (
    <BaseLayout>
      <NextSeo
        title="ITunes NextJS"
        description="Clon de la página de ITunes con NextJS con el fin de resolver prueba técnica"
        canonical="https://itunes-nextjs.vercel.app"
        openGraph={{
          url: "https://itunes-nextjs.vercel.app",
          title: "ITunes NextJS Clone",
          images: [],
          siteName: "itunes-nextjs.vercel.app",
        }}
        twitter={{
          handle: "@itunes-nextjs",
          site: "@itunes-nextjs",
          cardType: "summary_large_image",
        }}
      />
      <Box
        component="section"
        sx={{ width: "100%", height: "100%", overflow: "auto" }}
      >
        <Container>
          <Grid container justifyContent="space-between" alignItems="center">
            <TitleSection variant="h4">Top 100 Podcasts</TitleSection>

            <TextField
              variant="outlined"
              size="medium"
              placeholder="Buscar"
              sx={{ minWidth: 250 }}
            />
          </Grid>

          <Divider variant="fullWidth" sx={{ my: 3, borderColor: 'text.primary' }} />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              columnGap: 3,
              rowGap: 4,
              width: "100%",
              pb: 3
            }}
          >
            {data.map((item) => (
              <Link
                key={item.id.attributes["im:id"]}
                href={`podcast/${item.id.attributes["im:id"]}`}
                passHref
              >
                <MuiLink underline="none" color="text.primary">
                  <PodcastCard
                    title={item["im:name"].label}
                    artist={item["im:artist"].label}
                    image={item["im:image"]}
                  />
                </MuiLink>
              </Link>
            ))}
          </Box>
        </Container>
      </Box>
    </BaseLayout>
  );
}

export const getServerSideProps = async () => {
  const service = new ITunesServices();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([QUERYKEYS.TOP], service.getTop100Podcasts);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
