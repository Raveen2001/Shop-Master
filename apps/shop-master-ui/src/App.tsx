import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useMemo } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import "ui/styles.css";

const queryClient = new QueryClient();

const AUTH_URLS = ["/login", "/register"];

function App() {
  // get the logged in status from local storage
  const isLoggedIn = useMemo(() => !!localStorage.getItem("token"), []);

  // redirect to login page if not logged in
  useEffect(() => {
    const location = window.location.pathname;

    console.log("location", location);

    if (location === "/config") {
      return;
    }

    if (!isLoggedIn) {
      router.navigate("/login");
      return;
    }
    if (AUTH_URLS.includes(location)) {
      router.navigate("/");
      return;
    }
  }, [isLoggedIn]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} position={"bottom"} />
    </QueryClientProvider>
  );
}

export default App;
