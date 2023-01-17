import { createTheme } from "@mui/material/";

export const paletteColors = {
  "primary-color": "#8947eb",
  "white-color": "#ffffff",
  "background-body": "#fff",
  "background-appBar": "#18181b",
  "background-sideBar": "#1f1f23",
};

export const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#2E2E31",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "transparent",
            width: 6,
            height: 6,
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 6,
            backgroundColor: "#2E2E31",
            border: "1px solid transparent",
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
            {
              backgroundColor: "#2E2E31",
            },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
            {
              backgroundColor: "#2E2E31",
            },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
            {
              backgroundColor: "#2E2E31",
            },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "transparent",
          },
        },
        "::selection": {
          color: "white",
          background: `${paletteColors["primary-color"]}`,
        },
      },
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: "#8947eb",
    },
  },
  typography: {
    fontFamily: "Poppins; sans-serif",
  },
});

export const hintedColors = {
  "color-hinted-grey-1": "#0e0e10",
  "color-hinted-grey-2": "#18181b",
  "color-hinted-grey-3": "#1f1f23",
  "color-hinted-grey-4": "#26262c",
  "color-hinted-grey-5": "#323239",
  "color-hinted-grey-6": "#3b3b44",
  "color-hinted-grey-7": "#53535f",
  "color-hinted-grey-8": "#848494",
  "color-hinted-grey-9": "#adadb8",
  "color-hinted-grey-10": "#c8c8d0",
  "color-hinted-grey-11": "#d3d3d9",
  "color-hinted-grey-12": "#dedee3",
  "color-hinted-grey-13": "#e6e6ea",
  "color-hinted-grey-14": "#efeff1",
  "color-hinted-grey-15": "#f7f7f8",
};

export const opacityColors = {
  "color-opac-b-1": "rgba(0,0,0,0.05)",
  "color-opac-b-2": "rgba(0,0,0,0.08)",
  "color-opac-b-3": "rgba(0,0,0,0.13)",
  "color-opac-b-4": "rgba(0,0,0,0.16)",
  "color-opac-b-5": "rgba(0,0,0,0.22)",
  "color-opac-b-6": "rgba(0,0,0,0.28)",
  "color-opac-b-7": "rgba(0,0,0,0.4)",
  "color-opac-b-8": "rgba(0,0,0,0.5)",
  "color-opac-b-9": "rgba(0,0,0,0.6)",
  "color-opac-b-10": "rgba(0,0,0,0.7)",
  "color-opac-b-11": "rgba(0,0,0,0.75)",
  "color-opac-b-12": "rgba(0,0,0,0.8)",
  "color-opac-b-13": "rgba(0,0,0,0.85)",
  "color-opac-b-14": "rgba(0,0,0,0.9)",
  "color-opac-b-15": "rgba(0,0,0,0.95)",
};

export const shadowElevations = {
  "shadow-elevation-umbra": 0.34,
  "shadow-elevation-penumbra": 0.26,
  "shadow-elevation-ambient": 0.28,

  "shadow-elevation-1": `0px 1px 2px  ${opacityColors["color-opac-b-14"]} , 0 0px 2px  ${opacityColors["color-opac-b-14"]}`,
  "shadow-elevation-2": `0px 4px 8px  ${opacityColors["color-opac-b-7"]} , 0 0px 4px  ${opacityColors["color-opac-b-7"]}`,
  "shadow-elevation-3": `0px 6px 16px  ${opacityColors["color-opac-b-8"]} , 0 0px 4px  ${opacityColors["color-opac-b-7"]}`,
  "shadow-elevation-4": `0px 12px 32px  ${opacityColors["color-opac-b-8"]} , 0 0px 8px  ${opacityColors["color-opac-b-7"]}`,
  "shadow-elevation-5": `0px 32px 64px  ${opacityColors["color-opac-b-9"]} , 0 0px 16px  ${opacityColors["color-opac-b-7"]}`,
};

export const fontSizes = {
  "font-size-1": "5.4rem",
  "font-size-2": "3.6rem",
  "font-size-3": "2.4rem",
  "font-size-4": "1.8rem",
  "font-size-5": "1.4rem",
  "font-size-6": "1.3rem",
  "font-size-7": "1.2rem",
  "font-size-8": "1.2rem",
};

export const lineHeights = {
  "line-height-body": 1.5,
  "line-height-heading": 1.2,
};
