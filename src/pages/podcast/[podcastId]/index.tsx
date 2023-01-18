import {
  Box,
  Link as MuiLink,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { CardLarge, Container, TitleSection } from "@src/components";
import { BaseLayout, PodcastLayout } from "@src/layout";
import { ITunesServices } from "@src/services";
import { getHoursFromMilliseconds, getLocaleDate, QUERYKEYS } from "@src/utils";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useRouter } from "next/router";
import { Typography } from "@mui/material";

export const PostcastPage = () => {
  const router = useRouter();
  const { podcastId } = router.query;
  const service = new ITunesServices();

  const { data: podcast } = useQuery(
    [QUERYKEYS.PODCAST],
    () => service.getPodcastById(`${podcastId}`),
    {
      enabled: !!podcastId,
      refetchOnWindowFocus: false,
    }
  );

  const { data: episodes = [] } = useQuery(
    [QUERYKEYS.EPISODES],
    () => service.getEpisodesByPodcastId(`${podcastId}`),
    {
      enabled: !!podcastId,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <BaseLayout>
      <NextSeo
        title={`${podcast?.collectionName || 'PODCAST'} - iTunes NextJS`}
        description={`Artist: ${podcast?.artistName || ''}`}
      />
      <Container>
        <PodcastLayout
          information={
            podcast && (
              <CardLarge
                sx={{
                  position: "sticky",
                  top: 74,
                }}
                title={podcast.collectionName}
                subtitle={podcast.artistName}
                image={podcast.artworkUrl600}
                description="A podcast where musicians take apart their songs, and piece, tell the story of how they were made."
              />
            )
          }
        >
          <br />
          <TitleSection variant="h3" sx={{ p: 2, boxShadow: 3 }}>
            TOTAL EPISODES: {episodes.length}
          </TitleSection>
          <br />
          <br />

          <Box sx={{ p: 2, boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    <Typography component="span" variant="h4" fontWeight={600}>
                      Title
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography component="span" variant="h4" fontWeight={600}>
                      Date
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography component="span" variant="h4" fontWeight={600}>
                      Duration
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {episodes.map((episode) => (
                  <TableRow
                    key={episode.trackId}
                    sx={{
                      "&:nth-of-type(odd)": {
                        backgroundColor: (theme) => theme.palette.grey[200],
                      },

                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                  >
                    <TableCell align="left">
                      <Link
                        key={episode.trackId}
                        href={`/podcast/${podcastId}/episode/${episode.episodeGuid}`}
                        passHref
                      >
                        <MuiLink underline="none" color="primary.main">
                          <Typography
                            component="span"
                            variant="h5"
                            fontWeight={700}
                          >
                            {episode.trackName}
                          </Typography>
                        </MuiLink>
                      </Link>
                    </TableCell>

                    <TableCell align="left">
                      <Typography component="span" variant="h5">
                        {getLocaleDate(episode.releaseDate).fullDate}
                      </Typography>
                    </TableCell>

                    <TableCell align="left">
                      <Typography component="span" variant="h5">
                        {
                          getHoursFromMilliseconds(episode.trackTimeMillis)
                            .duration
                        }
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
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
