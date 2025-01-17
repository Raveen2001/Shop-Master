import { Theme, createTheme } from "@mui/material/styles";

const darkTheme = {
  palette: {
    background: {
      default: "#161C24",
      paper: "#212B36",
    },

    primary: {
      main: "#ffffff",
      light: "#ffffff",
      dark: "#ffffff",
      contrastText: "#212b36",
    },

    text: {
      primary: "#FFFFFF",
      secondary: "#919EAB",
      disabled: "#637381",
    },

    action: {
      active: "#919EAB",
      hover: "rgba(145, 158, 171)",
      selected: "rgba(145, 158, 171)",
      disabled: "rgba(145, 158, 171)",
      disabledBackground: "rgba(145, 158, 171, 0.24)",
      focus: "rgba(145, 158, 171)",
      focusOpacity: 0.24,
      activatedOpacity: 1,
      disabledOpacity: 0.8,
      selectedOpacity: 0.16,
      hoverOpacity: 0.08,
    },
  },
};

export const getTheme = (mode: "dark" | "light") =>
  createTheme({
    spacing: 8,
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            minHeight: "48px",
            fontSize: "15px",
            fontWeight: "700",
            textTransform: "none",
          },
        },
      },

      // MuiAlert: {
      //   styleOverrides: {
      //     standardError: {
      //       backgroundColor: "#FFE9D5",
      //     },

      //     standardInfo: {
      //       backgroundColor: "#CAFDF5",
      //     },

      //     standardSuccess: {
      //       backgroundColor: "#D8FBDE",
      //     },

      //     standardWarning: {
      //       backgroundColor: "#FFF5CC",
      //     },
      //   },
      // },
    },

    typography: {
      fontFamily: ["public-sans", "sans-serif"].join(","),

      h1: {
        fontSize: "3rem",
        fontStyle: "normal",
        fontWeight: 800,
      },
      h2: {
        fontSize: "2.25rem",
        fontStyle: "normal",
        fontWeight: 800,
      },
      h3: {
        fontSize: "1.875rem",
        fontStyle: "normal",
        fontWeight: 700,
      },
      h4: {
        fontSize: "1.5rem",
        fontStyle: "normal",
        fontWeight: 700,
      },
      h5: {
        fontSize: "1.25rem",
        fontStyle: "normal",
        fontWeight: 700,
      },
      h6: {
        fontSize: "1.125rem",
        fontStyle: "normal",
        fontWeight: 700,
      },

      subtitle1: {
        fontSize: "1rem",
        fontStyle: "normal",
        fontWeight: 600,
      },

      subtitle2: {
        fontSize: "0.875rem",
        fontStyle: "normal",
        fontWeight: 600,
      },
      body1: {
        fontSize: "1rem",
        fontStyle: "normal",
        fontWeight: 400,
      },
      body2: {
        fontSize: "0.875rem",
        fontStyle: "normal",
        fontWeight: 400,
      },

      caption: {
        fontSize: "0.75rem",
        fontStyle: "normal",
        fontWeight: 400,
      },

      overline: {
        fontSize: "0.75rem",
        lineHeight: "1rem",
        fontStyle: "normal",
        fontWeight: 700,
      },
    },

    palette: {
      mode: mode,
      primary: {
        main: "#212b36",
        light: "#d7d8d9",
        dark: "#080d12",
        contrastText: "#ffffff",
      },
      secondary: {
        light: "#C8FACD",
        main: "#00AB55",
        dark: "#005249",
        contrastText: "#FFFFFF",
      },

      info: {
        light: "#F9FAFB",
        main: "#00B8D9",
        dark: "#003768",
      },

      warning: {
        light: "#F9FAFB",
        main: "#FFAB00",
        dark: "#7A4100",
      },

      success: {
        light: "#D8FBDE",
        main: "#36B37E",
        dark: "#0A5554",
      },

      error: { light: "#FFE9D5", main: "#FF5630", dark: "#7A0916" },

      grey: {
        "100": "#F9FAFB",
        "200": "#F4F6F8",
        "300": "#DFE3E8",
        "400": "#C4CDD5",
        "500": "#919EAB",
        "600": "#637381",
        "700": "#454F5B",
        "800": "#212B36",
        "900": "#161C24",
      },

      background: {
        default: "#FFFFFF",
        paper: "#FFFFFF",
      },

      common: {
        black: "#000000",
        white: "#FFFFFF",
      },

      action: {
        active: "rgba(145, 158, 171)",
        hover: "rgba(145, 158, 171, 0.18)",
        selected: "rgba(145, 158, 171, 0.36)",
        disabled: "rgba(145, 158, 171, 0.8)",
        disabledBackground: "rgba(145, 158, 171, 0.24)",
        focus: "rgba(145, 158, 171, 0.24)",
      },

      text: {
        primary: "#212B36",
        secondary: "#637381",
        disabled: "#919EAB",
      },

      divider: "rgba(145, 158, 171, 0.5)",

      ...(mode === "dark" ? darkTheme.palette : {}),
    } as Theme["palette"],
  });
