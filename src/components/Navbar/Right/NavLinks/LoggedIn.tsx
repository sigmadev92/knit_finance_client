import { NavLink, useNavigate } from "react-router-dom";
import CustomButton from "../../../ui/CustomButton";
import { useUser } from "../../../../contextAPI/contexts/user";
import { useState } from "react";
import toast from "react-hot-toast";
import { usersURL } from "../../../../constants/urls/backend";

const LoggedIn = () => {
  const { user, setUser } = useUser();
  const [isClicked, setIsclicked] = useState<boolean>();
  const navigate = useNavigate();
  const logoutUser = async () => {
    try {
      await fetch(`${usersURL}/logout`, {
        method: "GET",
        credentials: "include",
      });
      setUser(null);
      setIsclicked(false);
      navigate("/out/login");
    } catch (error) {
      console.log(error);
      toast.error("Error in logging out");
    }
  };
  return (
    <ul className="flex gap-4 items-center">
      {[
        { label: "Home", to: "/" },
        { label: "Dashboard", to: "/in/dashboard" },
      ].map(({ label, to }, idx) => (
        <li key={idx}>
          <NavLink
            to={to}
            style={({ isActive }) =>
              isActive ? { textDecoration: "underline" } : undefined
            }
          >
            {label}
          </NavLink>
        </li>
      ))}
      <li className="relative">
        <CustomButton
          onClick={() => setIsclicked((prev) => !prev)}
          className="center border bg-amber-400 w-6 h-6"
          variant="rounded-full"
        >
          <span className="font-bold text-[blue]">
            {user?.fullName.charAt(0)}
          </span>
        </CustomButton>

        {isClicked && (
          <div className="rounded theme p-4 absolute right-0 top-6 flex flex-col gap-2 border">
            <h3>{user!.fullName}</h3>
            <h3>{user!.email}</h3>
            <CustomButton variant="regular-dark" onClick={logoutUser}>
              <span>Logout</span>
            </CustomButton>
          </div>
        )}
      </li>
    </ul>
  );
};

export default LoggedIn;
