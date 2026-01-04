import { Outlet } from "react-router-dom";
import { useUser } from "../contextAPI/contexts/user";
import { Navigate } from "react-router-dom";

const PreventExposed = () => {
  const { user } = useUser();
  if (!user) return <Outlet />;

  return <Navigate to={"/in/dashboard"} />;
};

export default PreventExposed;
