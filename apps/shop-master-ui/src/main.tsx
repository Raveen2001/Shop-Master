import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { CssBaseline, MyThemeProvider } from "ui";
import App from "./App";
import { router } from "./routes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <MyThemeProvider>
      <CssBaseline />

      <App />
    </MyThemeProvider>
  </StrictMode>
);
