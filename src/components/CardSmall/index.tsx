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
        justifyContent="center"
        sx={{
          minHeight: 200,
        }}
      >
        <Grid
          container
          justifyContent="center"
          sx={{
            position: "relative",
            width: "100%",
            height: 85,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              bottom: -90,
            }}
          >
            <Box
              sx={{
                display: "flex",
                borderRadius: "100%",
                overflow: "hidden",
              }}
            >
              <Image
                {...getImageProps(image)}
                objectFit="contain"
                objectPosition="center"
                style={{
                  aspectRatio: "1/1",
                }}
              />
            </Box>
          </Box>
        </Grid>

        <Grid
          container
          direction="column"
          justifyContent="flex-end"
          flexGrow={1}
          sx={{
            height: 200,
            boxShadow: 1,
            borderRadius: 3,

            "&:hover": {
              boxShadow: 3,
            },
          }}
        >
          <Grid
            container
            direction="column"
            justifyContent="space-between"
            sx={{
              height: 100,
              p: 2,
            }}
          >
            <Typography
              component="h2"
              variant="h5"
              fontWeight={600}
              color="text.primary"
              textAlign="center"
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

            <Typography
              component="h3"
              variant="h6"
              fontWeight={500}
              textAlign="center"
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
      </Grid>
    );
  }
);

CardSmall.displayName = "PodcastCard";
