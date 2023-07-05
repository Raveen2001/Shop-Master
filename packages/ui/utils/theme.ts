import { createTheme } from "@mui/material/styles";

const darkTheme = {
  palette: {
    background: {
      default: "#161C24",
      paper: "#212B36",
    },

    contrast: {
      main: "#ffffff",
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
        fontSize: "64px",
        lineHeight: "80px",
        fontStyle: "normal",
        fontWeight: 800,
      },
      h2: {
        fontSize: "48px",
        lineHeight: "64px",
        fontStyle: "normal",
        fontWeight: 800,
      },
      h3: {
        fontSize: "32px",
        lineHeight: "48px",
        fontStyle: "normal",
        fontWeight: 700,
      },
      h4: {
        fontSize: "24px",
        lineHeight: "36px",
        fontStyle: "normal",
        fontWeight: 700,
      },
      h5: {
        fontSize: "20px",
        lineHeight: "30px",
        fontStyle: "normal",
        fontWeight: 700,
      },
      h6: {
        fontSize: "18px",
        lineHeight: "28px",
        fontStyle: "normal",
        fontWeight: 700,
      },

      subtitle1: {
        fontSize: "16px",
        lineHeight: "24px",
        fontStyle: "normal",
        fontWeight: 600,
      },

      subtitle2: {
        fontSize: "14px",
        lineHeight: "22px",
        fontStyle: "normal",
        fontWeight: 600,
      },
      body1: {
        fontSize: "16px",
        lineHeight: "24px",
        fontStyle: "normal",
        fontWeight: 400,
      },
      body2: {
        fontSize: "14px",
        lineHeight: "22px",
        fontStyle: "normal",
        fontWeight: 400,
      },

      caption: {
        fontSize: "12px",
        lineHeight: "18px",
        fontStyle: "normal",
        fontWeight: 400,
      },

      overline: {
        fontSize: "12px",
        lineHeight: "18px",
        fontStyle: "normal",
        fontWeight: 700,
      },
    },

    palette: {
      mode: mode,
      primary: {
        light: "#C8FACD",
        main: "#00AB55",
        dark: "#005249",
        contrastText: "#FFFFFF",
      },
      secondary: {
        light: "#FFF5CC",
        main: "#b66e00",
        dark: "#ffab00",
        contrastText: "#212b36",
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

      contrast: {
        main: "#212b36",
        contrastText: "#ffffff",
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
        active: "#637381",
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

      text: {
        primary: "#212B36",
        secondary: "#637381",
        disabled: "#919EAB",
      },

      divider: "rgba(145, 158, 171, 0.24)",

      ...(mode === "dark" ? darkTheme.palette : {}),
    },
  });
