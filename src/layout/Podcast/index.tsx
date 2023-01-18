import React from "react";
import { Box } from "@mui/material";

type Props = {
  information: React.ReactNode;
  children: React.ReactNode;
};

export const PodcastLayout = ({ information, children }: Props) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "400px 1fr",
        columnGap: 8,
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          pb: 3,
          backgroundColor: "background.default",
          width: 300,
          mx: 'auto',
        }}
      >
        {information}
      </Box>

      <Box
        sx={{
          width: "100%",
          pb: 3,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
