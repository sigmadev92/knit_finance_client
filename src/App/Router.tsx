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
import ProtectedRoute from "../layouts/ProtectedRoute";
import PreventExposed from "../layouts/PreventExposed";
import { useUser } from "../contextAPI/contexts/user";
import AdminDashboard from "../pages/Admin_dashboard";

const CustomRouter = () => {
  const { user } = useUser();
  const router = createBrowserRouter([
    {
      path: "",
      element: <RootLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "in",
          element: <ProtectedRoute />,

          children: [
            {
              path: "dashboard",
              element:
                user?.role === "admin" ? <AdminDashboard /> : <Dashboard />,
            },
          ],
        },
        {
          path: "out",
          element: <PreventExposed />,
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
