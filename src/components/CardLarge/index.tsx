import React from "react";
import { Box, Grid, Typography, Divider, SxProps, Theme } from "@mui/material";
import Image from "next/image";

type Props = {
  title: string;
  subtitle: string;
  description?: string;
  image: string;
  sx?: SxProps<Theme>;
};

export const CardLarge = ({ title, subtitle, description, image, sx }: Props) => {
  return (
    <Grid
      container
      direction="column"
      flexWrap="nowrap"
      rowGap={3}
      sx={{
        py: 2,
        px: 1,
        boxShadow: 1,
        borderRadius: 1,
        bgcolor: "background.paper",
        
        ...sx,
      }}
    >
      <Grid container justifyContent="center">
        <Box
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            display: "flex",
            width: "auto",
          }}
        >
          <Image
            src={image || ''}
            alt={title}
            width={232}
            height={232}
            objectFit="contain"
            objectPosition="center"
          />
        </Box>
      </Grid>

      <Divider variant="fullWidth" sx={{ borderColor: "text.secondary" }} />

      <Grid
        item
        xs
        sx={{
          px: 2,
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          color="text.primary"
          fontWeight={700}
          mb={1}
        >
          {title}
        </Typography>

        <Typography component="h2" variant="h5" color="text.secondary">
          by {subtitle}
        </Typography>
      </Grid>

      <Divider variant="fullWidth" sx={{ borderColor: "text.secondary" }} />

      {description && (
        <Grid item xs sx={{ px: 1 }}>
          <Typography component="p" variant="h5" mb={2}>
            Description:
          </Typography>

          <Typography component="p" variant="h5" color="text.secondary">
            {description}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};
