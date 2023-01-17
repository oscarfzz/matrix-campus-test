import React from "react";
import { Box } from "@mui/material";
import { Container } from "@src/components";
import { BaseLayout } from "@src/layout";
import { NextSeo } from "next-seo";

export default function Home() {

  return (
    <BaseLayout>
      <NextSeo
        title="Itunes NextJS"
        description="Clon de la pagina de Itunes con NextJS con el fin de resolver prueba técnica"
        canonical="https://itunes-nextjs.vercel.app"
        openGraph={{
          url: "https://itunes-nextjs.vercel.app",
          title: "Itunes NextJS Clone",
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
        <br />

        <Container>

        </Container>
      </Box>
    </BaseLayout>
  );
}
