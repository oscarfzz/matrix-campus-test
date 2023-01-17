import React from "react";
import { Box } from "@mui/material";
import { Navbar } from "@src/components";

import { BaseLayoutProps } from "./Base.types";

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <Box component="section">
      <Navbar />

      <Box
        component="main"
        sx={{
          width: "100%",
          height: "100%",
          backgroundImage: '#060606',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default BaseLayout;
