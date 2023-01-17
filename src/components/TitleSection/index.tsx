import { Typography, TypographyProps } from "@mui/material";

type Props = {
  children: React.ReactNode;
  variant?: TypographyProps["variant"];
};

export const TitleSection = ({ children, variant }: Props) => {
  return (
    <Typography component="h1" variant={variant}>
      {children}
    </Typography>
  );
};
