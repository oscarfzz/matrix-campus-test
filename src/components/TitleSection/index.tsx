import { Typography, TypographyProps } from "@mui/material";

type Props = {
  children: React.ReactNode;
  variant?: TypographyProps["variant"];
  sx?: TypographyProps["sx"];
};

export const TitleSection = ({ children, variant, sx }: Props) => {
  return (
    <Typography component="h1" variant={variant} sx={sx}>
      {children}
    </Typography>
  );
};
