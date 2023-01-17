import React from "react";
import { Box } from "@mui/material";

import { BaseLayoutProps } from "./Base.types";

const BaseLayout = ({ children }: BaseLayoutProps) => {

  return (
    <Box
      component="section"
      sx={{
        display: "grid",
        gridTemplateRows: "auto 1fr",
        width: "100%",
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Box
        component="main"
        sx={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          width: "100%",
          height: "100%",
          overflow: "auto",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default BaseLayout;
