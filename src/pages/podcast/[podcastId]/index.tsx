import { ITunesServices } from "@src/services";
import { QUERYKEYS } from "@src/utils";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

export const Postcast = () => {
  const router = useRouter();
  const { podcastId } = router.query;
  const service = new ITunesServices();
  const {
    data,
    isLoading,
    error,
  } = useQuery([QUERYKEYS.PODCAST], () => service.getPodcastById(`${podcastId}`));


    return (
        <div>
        <h1>Postcast</h1>
        <hr />
        <br />
        {data && (
          <div>
            <h1>{data.collectionName}</h1>
            <h2>{data.artistName}</h2>
            <h3>{data.releaseDate}</h3>
            <h4>{data.primaryGenreName}</h4>
          </div>
        )}

        </div>
    );
}

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
    await queryClient.prefetchQuery([QUERYKEYS.PODCAST], () => service.getPodcastById(podcastId) );
  
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  };
  