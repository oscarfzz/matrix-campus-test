import { Box, Typography, Divider } from '@mui/material';
import { CardLarge, Container } from "@src/components";
import { BaseLayout, PodcastLayout } from "@src/layout";
import { ITunesServices } from "@src/services";
import { QUERYKEYS } from "@src/utils";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

export const EpisodePage = () => {
  const service = new ITunesServices();
  const { query } = useRouter();

  const { data } = useQuery(
    [QUERYKEYS.EPISODE, query.podcastId, query.episodeId],
    () => service.getEpisode(`${query.podcastId}`, `${query.episodeId}`),
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <BaseLayout>
      <NextSeo
        title={`${data?.trackName || 'EPISODE'} - iTunes NextJS`}
        description={`Artist: ${data?.artistName || ''}`}
      />
      <Container sx={{ pt: 3 }}>
        <PodcastLayout
          information={
            <CardLarge
              title={data?.collectionName || ""}
              subtitle={data?.collectionName || ""}
              image={data?.artworkUrl600 || ""}
              description="A podcast where musicians take apart their songs, and piece, tell the story of how they were made."
            />
          }
        >
          <Box sx={{ boxShadow: 3, p: 3 }}>
            <Typography component="h1" variant="h2">
              {data?.trackName}
            </Typography>

            <Box sx={{ width: "100%", my: 4 }}>
              <Typography
                component="p"
                variant="h5"
                color="text.secondary"
                lineHeight={1.5}
                letterSpacing={0.5}
              >
                {data?.description || ""}
              </Typography>
            </Box>

            <Divider variant="fullWidth" sx={{ my: 2, borderColor: 'text.primary' }} />

            <Box sx={{ mt: 3, width: "100%" }}>
              <Box
                component="audio"
                src={data?.episodeUrl}
                controls
                sx={{ width: "100%", display: "block" }}
              />
            </Box>
          </Box>
        </PodcastLayout>
      </Container>
    </BaseLayout>
  );
};

export default EpisodePage;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { podcastId, episodeId } = context.query;

  if (
    !podcastId ||
    Array.isArray(podcastId) ||
    !episodeId ||
    Array.isArray(episodeId)
  ) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const service = new ITunesServices();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([QUERYKEYS.EPISODE], () =>
    service.getEpisode(podcastId, episodeId)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
