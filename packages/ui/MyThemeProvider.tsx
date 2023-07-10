import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import { getTheme } from "./utils/theme";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export const useColorMode = () => React.useContext(ColorModeContext);

interface IMyThemeProviderProps {
  children: React.ReactNode;
}

export const MyThemeProvider: React.FC<IMyThemeProviderProps> = ({
  children,
}) => {
  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    [],
  );

  const theme = React.useMemo(() => getTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};
