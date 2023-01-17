import React from "react";
import { Box } from "@mui/material";

type Props = {
  information: React.ReactNode;
  children: React.ReactNode;
};

export const PodcastLayout = ({ information, children }: Props) => {
  return (
    <>
      <Box
        sx={{
          position: "sticky",
          top: 64,
          pb: 3,
          zIndex: 1,
          backgroundColor: "background.default",
        }}
      >
        {information}
      </Box>

      <Box
        sx={{
          width: "100%",
          pb: 3
        }}
      >
        {children}
      </Box>
    </>
  );
};
