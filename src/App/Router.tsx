import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import About from "../pages/About";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Dashboard from "../pages/Dashboard";

const CustomRouter = () => {
  const router = createBrowserRouter([
    {
      path: "",
      element: <RootLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "in",
          children: [
            {
              path: "dashboard",
              element: <Dashboard />,
            },
          ],
        },
        {
          path: "out",
          children: [
            {
              path: "register",
              element: <Register />,
            },
            {
              path: "login",
              element: <Login />,
            },
            {
              path: "password/forgot",
              element: <ForgotPassword />,
            },
          ],
        },
        { path: "contact", element: <Contact /> },
        { path: "about", element: <About /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default CustomRouter;
