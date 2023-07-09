import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, MyThemeProvider } from "ui";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <MyThemeProvider>
      <CssBaseline />
      <App />
    </MyThemeProvider>
  </StrictMode>
);
