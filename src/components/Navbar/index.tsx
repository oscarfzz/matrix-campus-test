import React, { useContext } from "react";
import { AppContext } from "@src/context";
import { CircularProgress, Grid, Typography } from "@mui/material";
import Link from "next/link";

export const Navbar = () => {
  const { routerStatus } = useContext(AppContext);

  return (
    <Grid
      component="header"
      container
      justifyContent="space-between"
      alignItems="center"
      px={4}
      sx={{
        height: 64,
        position: "sticky",
        top: 0,
        backgroundColor: "background.default",
        zIndex: ({ zIndex }) => zIndex.appBar,
      }}
    >
      <Link href="/" passHref>
        <Typography
          component="a"
          variant="h3"
          color="text.primary"
          sx={{ cursor: "pointer", textDecoration: "none" }}
        >
          Podcaster
        </Typography>
      </Link>
      {routerStatus === "loading" && (
        <CircularProgress color="primary" size={24} />
      )}
    </Grid>
  );
};
