import { BaseLayout } from "@src/layout";
import { ITunesServices } from "@src/services";
import { QUERYKEYS } from "@src/utils";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";
import { useRouter } from 'next/router';

export const Episode = () => {
    const service = new ITunesServices();
    const { query } = useRouter();
    console.log(query)

    const {
        data,
        isLoading,
        error,
      } = useQuery([QUERYKEYS.EPISODE], () => service.getEpisode(
        `${query.podcastId}`, 
        `${query.episodeId}`
      ), {
        refetchOnWindowFocus: false,
      });
    

    return (
        <BaseLayout>
            <h1>Episode</h1>
            <hr />
            <br />
            {data && (
                <div>
                    <h3>{data.collectionName}</h3>
                    <h3>{data.artistName}</h3>
                    <h3>{data.releaseDate}</h3>
                    <h4>{data.primaryGenreName}</h4>
                </div>
            )}
        </BaseLayout>
    );
}

export default Episode;


export const getServerSideProps = async (
    context: GetServerSidePropsContext
  ) => {
    const { podcastId, episodeId } = context.query;
  
    if (!podcastId || Array.isArray(podcastId) || !episodeId || Array.isArray(episodeId)) {
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
  