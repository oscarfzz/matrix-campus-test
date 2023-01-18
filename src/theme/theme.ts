import { alpha, createTheme } from "@mui/material/";

const paletteColors = {
  "primary-color": "#1F487E",
  "scrollbar-color": "#ffffff4d",
  "background-default": "#FFF",
  "background-paper": "#FFF",
};

export const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: paletteColors["scrollbar-color"],
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "transparent",
            width: 6,
            height: 6,
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 6,
            backgroundColor: paletteColors["scrollbar-color"],
            border: "1px solid transparent",
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
            {
              backgroundColor: paletteColors["scrollbar-color"],
            },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
            {
              backgroundColor: paletteColors["scrollbar-color"],
            },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
            {
              backgroundColor: paletteColors["scrollbar-color"],
            },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "transparent",
          },
        },
        "::selection": {
          color: "white",
          background: alpha(paletteColors["primary-color"], 0.5),
        },
      },
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: paletteColors["primary-color"],
    },
    background: {
      default: paletteColors["background-default"],
      paper: paletteColors["background-paper"],
    },
    text: {
      primary: "#000",
      secondary: "#a7a7a7",
    }
  },
  typography: {
    fontFamily: "Poppins; sans-serif",
  },
});
