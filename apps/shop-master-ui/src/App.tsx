import { useEffect, useMemo } from "react";
import { redirect, RouterProvider } from "react-router-dom";
import "./App.scss";
import { router } from "./routes";

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

  return <RouterProvider router={router} />;
}

export default App;
