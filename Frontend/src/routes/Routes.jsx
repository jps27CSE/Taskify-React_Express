import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LandingPage from "../components/LandingPage";
import RegisterPage from "../components/RegisterPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
]);

export default router;
