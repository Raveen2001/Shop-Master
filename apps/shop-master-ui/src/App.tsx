import { useEffect, useMemo } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./routes";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  // get the logged in status from local storage
  const isLoggedIn = useMemo(() => !!localStorage.getItem("token"), []);

  // redirect to login page if not logged in
  useEffect(() => {
    console.log(isLoggedIn);
    if (!isLoggedIn) {
      // router.navigate("/login");
    }
  }, [isLoggedIn]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools
        initialIsOpen={false}
        position="bottom-right"
        panelPosition="right"
      />
    </QueryClientProvider>
  );
}

export default App;
