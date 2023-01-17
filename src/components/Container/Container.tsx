import { Box, useTheme } from "@mui/material";
import { ContainerProps } from "./Container.types";

const Container = ({ component, sx, ...props }: ContainerProps) => {
  const { breakpoints } = useTheme();

  return (
    <Box
      component={component || "section"}
      sx={{
        width: "100%",
        margin: "0 auto",
        maxWidth: "200rem",
        paddingLeft: "3rem",
        paddingRight: "3rem",
        ...sx,
      }}
      {...props}
    />
  );
};

export default Container;
