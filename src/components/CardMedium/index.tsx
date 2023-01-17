import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import Image from "next/image";

type Props = {
  title: string;
  image?: string;
  description?: string;
  year?: number;
  month?: string;
  duration?: string;
};

export const CardMedium = ({
  title,
  image,
  description,
  year,
  month,
  duration,
}: Props) => {
  return (
    <Grid
      container
      flexWrap="nowrap"
      columnGap={3}
      sx={{
        borderTop: "1px solid",
        p: 2,
      }}
    >
      <Grid item>
        <Box
          sx={{
            backgroundColor: "background.paper",
          }}
        >
          {image && (
            <Image
              src={image}
              alt={title}
              width={115}
              height={115}
              objectFit="contain"
              objectPosition="center"
            />
          )}
        </Box>
      </Grid>

      <Grid item xs>
        <Grid container direction="column">
          <Grid item>
            <Typography component="p" variant="h4" fontWeight={600}>
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              component="p"
              variant="h6"
              color="text.secondary"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                mt: 1,
                mb: 2,
              }}
            >
              {description}
            </Typography>
          </Grid>
          <Grid item>
            <Typography component="p" variant="h6" color="text.secondary">
              {month} {year}{" - "}
              <Typography component="span" variant="h6" color="primary.main">{duration}</Typography>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
