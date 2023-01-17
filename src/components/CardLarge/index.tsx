import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";

type Props = {
  title: string;
  subtitle: string;
  description?: string;
  image: string;
};

export const CardLarge = ({ title, subtitle, description, image }: Props) => {
  return (
    <Grid container columnGap={2.5} flexWrap="nowrap">
      <Grid item>
        <Box sx={{ borderRadius: 5, overflow: "hidden", display: "flex" }}>
          <Image
            src={image}
            alt={title}
            width={232}
            height={232}
            objectFit="contain"
            objectPosition="center"
          />
        </Box>
      </Grid>

      <Grid item xs>
        <Grid
          container
          direction="column"
          justifyContent="flex-end"
          height="100%"
          rowGap={1.25}
        >
          <Grid item>
            <Typography
              component="h1"
              variant="h1"
              color="text.primary"
              fontWeight={700}
              my={1.25}
            >
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              component="h2"
              variant="h2"
              color="text.primary"
              fontWeight={600}
            >
              {subtitle}
            </Typography>
          </Grid>
          {description && (
            <Grid item>
              <Typography component="p" variant="h5" color="text.secondary">
                {description}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};
