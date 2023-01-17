/* eslint-disable jsx-a11y/alt-text */
import React, { useCallback } from "react";
import Image from "next/image";
import { Box } from "@mui/material";
import { Container } from "@src/components";
import { BaseLayout } from "@src/layout";
import { NextSeo } from "next-seo";
import { ITunesServices } from "@src/services";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { QUERYKEYS } from "@src/utils";
import { IMImage } from "@src/services/interfaces";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const service = new ITunesServices();
  const {
    data = [],
    isLoading,
    error,
  } = useQuery([QUERYKEYS.TOP], service.getTop100Podcasts, {
    refetchOnWindowFocus: false,
  });

  const getImageProps = (e: IMImage[]) => {
    const lastElement = e[e.length - 1];
    return {
      src: lastElement.label,
      alt: `podcast-image-${lastElement.label}`,
      height: lastElement.attributes.height,
      width: lastElement.attributes.height,
    }
  };

  const handleOnClick = (id: string) => {
    router.push(`podcast/${id}`);
  }

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
      <Box sx={{ width: "100%", height: "100%", overflow: "auto" }}>
        <br />
        <br />

        <Container>
          <h1>Top 100 Podcasts</h1>
          <hr />
          <br />
          {data.map((item) => (
            <div key={item.id.attributes["im:id"]} onClick={() => handleOnClick(item.id.attributes["im:id"])}>
              <Image
                {...getImageProps(item["im:image"])}
              />
              <h2>{item["im:name"].label}</h2>
              <h3>{item["im:artist"].label}</h3>
            </div>
          ))}
        </Container>
      </Box>
    </BaseLayout>
  );
}

export const getServerSideProps = async () => {
  const service = new ITunesServices();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([QUERYKEYS.TOP], service.getTop100Podcasts );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
