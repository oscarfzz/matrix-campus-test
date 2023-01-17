/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import Image from "next/image";

import { Box, Grid, Typography } from "@mui/material";
import { IMImage } from "@src/services/interfaces";
import { getImageProps } from "@src/utils";

type Props = {
  title: string;
  subtitle: string;
  image: IMImage[];
};

export const CardSmall = React.forwardRef<HTMLDivElement, Props>(
  ({ subtitle, title, image }, ref) => {
    return (
      <Grid
        container
        direction="column"
        ref={ref}
        rowGap={1.75}
        justifyContent="space-between"
        sx={{
          backgroundColor: "background.paper",
          boxShadow: 1,
          pt: 3,
          pb: 2,
          px: 2,
          borderRadius: 2,
          height: "100%",

          "&:hover": {
            backgroundColor: "#282828",
            boxShadow: 3,
          },
        }}
      >
        <Grid container justifyContent="center">
          <Image
            {...getImageProps(image)}
            objectFit="contain"
            objectPosition="center"
            style={{
              aspectRatio: "1/1",
            }}
          />
        </Grid>

        <Grid item xs flexGrow={1}>
          <Typography
            component="h2"
            variant="h5"
            fontWeight={600}
            color="text.primary"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {title}
          </Typography>
        </Grid>

        <Grid item xs flexGrow={1}>
          <Typography
            component="h3"
            variant="h6"
            fontWeight={500}
            color="text.secondary"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {subtitle}
          </Typography>
        </Grid>
      </Grid>
    );
  }
);

CardSmall.displayName = "PodcastCard";
