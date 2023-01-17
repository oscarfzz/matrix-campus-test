import { BaseLayout } from "@src/layout";
import { ITunesServices } from "@src/services";
import { QUERYKEYS } from "@src/utils";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

export const Postcast = () => {
  const router = useRouter();
  const { podcastId } = router.query;
  const service = new ITunesServices();
  const { enqueueSnackbar } = useSnackbar();

  const { data: podcast, isLoading: isLoadingPodcast } = useQuery([QUERYKEYS.PODCAST], () =>
    service.getPodcastById(`${podcastId}`), {
      refetchOnWindowFocus: false,
    }
  );

  const { data: episodes = [], isLoading: isLoadingEpisodes } = useQuery(
    [QUERYKEYS.EPISODES, podcastId],
    () => service.getEpisodesByPodcastId(`${podcastId}`),
    {
      enabled: !!podcastId,
      refetchOnWindowFocus: false,
    }
  );

  const redirectToEpisode = (id: string | undefined) => {
    if (!id) {
      enqueueSnackbar("No episode found", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      return;
    };
      router.push(`/podcast/${podcastId}/episode/${id}`)
  }

  return (
    <BaseLayout>
      {podcast && (
        <div>
          <h3>{podcast.collectionName}</h3>
          <h3>{podcast.artistName}</h3>
          <h3>{podcast.releaseDate}</h3>
          <h4>{podcast.primaryGenreName}</h4>
        </div>
      )}

      <h2>EPISODES</h2>
      <hr />
      {
        episodes.map((episode) => (
          <div key={episode.trackId} onClick={() => redirectToEpisode(episode.episodeGuid)}>
            <h3>{episode.trackName}</h3>
            <h3>{episode.artistName}</h3>
            <h3>{episode.releaseDate}</h3>
          </div>
        ))
      }

    </BaseLayout>
  );
};

export default Postcast;

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
