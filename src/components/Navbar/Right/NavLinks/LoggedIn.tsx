import { NavLink } from "react-router-dom";

const LoggedIn = () => {
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
    </ul>
  );
};

export default LoggedIn;
