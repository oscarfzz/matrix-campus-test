import { Link as MuiLink } from "@mui/material";
import {
  CardLarge,
  CardMedium,
  Container,
  TitleSection,
} from "@src/components";
import { BaseLayout, PodcastLayout } from "@src/layout";
import { ITunesServices } from "@src/services";
import { getHoursFromMilliseconds, getLocaleDate, QUERYKEYS } from "@src/utils";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { GetServerSidePropsContext } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useRouter } from "next/router";

export const PostcastPage = () => {
  const router = useRouter();
  const { podcastId } = router.query;
  const service = new ITunesServices();

  const { data: podcast } = useQuery(
    [QUERYKEYS.PODCAST, podcastId],
    () => service.getPodcastById(`${podcastId}`),
    {
      enabled: !!podcastId,
      refetchOnWindowFocus: false,
    }
  );

  const { data: episodes = [] } = useQuery(
    [QUERYKEYS.EPISODES, podcastId],
    () => service.getEpisodesByPodcastId(`${podcastId}`),
    {
      enabled: !!podcastId,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <BaseLayout>
      <NextSeo
        title={`${podcast?.collectionName} - iTunes NextJS`}
        description={`Artist: ${podcast?.artistName}`}
      />
      <Container>
        <PodcastLayout
          information={
            podcast && (
              <CardLarge
                title={podcast.collectionName}
                subtitle={podcast.artistName}
                image={podcast.artworkUrl600}
                description={dayjs(podcast.releaseDate).format("DD MMMM YYYY")}
              />
            )
          }
        >
          <br />
          <TitleSection variant="h3">
            TOTAL EPISODES: {episodes.length}
          </TitleSection>
          <br />
          <br />

          <div>
            {episodes.map((episode) => (
              <Link
                key={episode.trackId}
                href={`/podcast/${podcastId}/episode/${episode.episodeGuid}`}
                passHref
              >
                <MuiLink underline="none" color="text.primary">
                  <CardMedium
                    title={episode.trackName}
                    image={episode.artworkUrl160}
                    description={episode.description}
                    year={getLocaleDate(episode.releaseDate).year}
                    month={getLocaleDate(episode.releaseDate).month}
                    duration={
                      getHoursFromMilliseconds(episode.trackTimeMillis).duration
                    }
                  />
                </MuiLink>
              </Link>
            ))}
          </div>
        </PodcastLayout>
      </Container>
    </BaseLayout>
  );
};

export default PostcastPage;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { podcastId } = context.query;

  if (!podcastId || Array.isArray(podcastId)) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const service = new ITunesServices();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([QUERYKEYS.PODCAST], () =>
    service.getPodcastById(podcastId)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
