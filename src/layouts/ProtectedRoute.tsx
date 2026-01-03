import { Outlet } from "react-router-dom";
import { useUser } from "../contextAPI/contexts/user";
import { Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { user } = useUser();
  if (user) return <Outlet />;

  return <Navigate to={"/out/login"} />;
};

export default ProtectedRoute;
