declare module "@mui/material/styles" {
  interface Palette {
    contrast?: {
      main: string;
      contrastText: string;
    };
  }
  // allow configuration using `createTheme`
  interface PaletteOptions {
    contrast?: {
      main: string;
      contrastText: string;
    };
  }
}

export {};
