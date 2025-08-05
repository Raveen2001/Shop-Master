import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import { getTheme } from "./utils/theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

const ColorModeContext = React.createContext({
  toggleColorMode: () => {
    return;
  },
});

export const useColorMode = () => React.useContext(ColorModeContext);

interface IMyThemeProviderProps {
  children: React.ReactNode;
}

export const MyThemeProvider: React.FC<IMyThemeProviderProps> = ({
  children,
}) => {
  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const toggleColorMode = React.useCallback(() => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  }, []);

  const theme = React.useMemo(() => getTheme(mode), [mode]);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ColorModeContext.Provider
        value={{
          toggleColorMode,
        }}
      >
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ColorModeContext.Provider>
    </LocalizationProvider>
  );
};
