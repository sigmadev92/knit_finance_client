import { NavLink } from "react-router-dom";

const LoggedOut = () => {
  return (
    <ul className="flex gap-4 items-center">
      {[
        { label: "Home", to: "/" },
        { label: "Contact", to: "/contact" },
        { label: "About", to: "/about" },
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

export default LoggedOut;
