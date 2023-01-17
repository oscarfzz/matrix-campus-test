import { Box, Button, IconButton, Typography } from "@mui/material";
import { CardLarge, Container } from "@src/components";
import { BaseLayout, PodcastLayout } from "@src/layout";
import { ITunesServices } from "@src/services";
import { QUERYKEYS, getLocaleDate, getHoursFromMilliseconds } from "@src/utils";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

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

  const { month, year } = getLocaleDate(data?.releaseDate || "");
  const { duration } = getHoursFromMilliseconds(data?.trackTimeMillis || 0);

  const [showTrack, setShowTrack] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>();

  return (
    <BaseLayout>
      <Container sx={{ pt: 3 }}>
        <PodcastLayout
          information={
            <CardLarge
              title={data?.trackName || ""}
              subtitle={data?.collectionName || ""}
              image={data?.artworkUrl600 || ""}
            />
          }
        >
          <Typography component="p" variant="h5" color="text.secondary">
            {month} {year}
            {" - "}
            <Typography component="span" variant="h5">
              {duration}
            </Typography>
          </Typography>

          <Box sx={{ my: 3 }}>
            {!showTrack && (
              <IconButton
                size="large"
                onClick={() => {
                  setShowTrack(true);
                  audioRef.current?.play();
                }}
                sx={{
                  color: "primary.main",
                  p: 0,
                  m: 0,
                  width: 80,
                  height: 80,
                  aspectRatio: "1/1",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8rem"
                  height="8rem"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zM9.5 14.67V9.33c0-.79.88-1.27 1.54-.84l4.15 2.67a1 1 0 0 1 0 1.68l-4.15 2.67c-.66.43-1.54-.05-1.54-.84z"
                  />
                </svg>
              </IconButton>
            )}

            <Box
              component="audio"
              ref={audioRef}
              src={data?.episodeUrl}
              controls
              sx={{ display: "none", ...(showTrack && { display: "block" }) }}
            />
          </Box>

          <Typography component="h1" variant="h2" mt={4}>
            Descripción del episodio
          </Typography>

          <Box sx={{ maxWidth: 700, width: "100%", my: 4 }}>
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

          <Link
            href={`/podcast/${query.podcastId}`}
            passHref
          >
            <Button
              variant="outlined"
              color="primary"
              size="large"
              sx={{ minHeight: 40 }}
            >
              Ver todos los episodios
            </Button>
          </Link>
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
