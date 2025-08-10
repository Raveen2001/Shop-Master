import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, MyThemeProvider, ToastContainer } from "ui";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <MyThemeProvider>
      <CssBaseline />
      <App />
    </MyThemeProvider>
    <ToastContainer />
  </StrictMode>
);
